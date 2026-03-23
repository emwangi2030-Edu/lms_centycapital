-- Supabase Migration 003
-- Purpose:
-- 1) Borrower <-> auth profile linkage constraints
-- 2) Repayment allocation ledger and trigger
-- 3) Reconciliation views (ERPNext link health + outbox status)
-- Depends on migration 001 and 002

begin;

-- =====================================
-- 1) Borrower-to-Auth Profile Link Model
-- =====================================

create table if not exists public.borrower_profile_links (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  borrower_id uuid not null references public.borrowers(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  relationship text not null default 'self' check (relationship in ('self','guardian','delegate')),
  is_primary boolean not null default true,
  created_at timestamptz not null default now(),
  unique(tenant_id, borrower_id, profile_id)
);

-- Ensure one primary profile per borrower per tenant.
create unique index if not exists uq_borrower_profile_primary
  on public.borrower_profile_links(tenant_id, borrower_id)
  where is_primary = true;

-- Enforce tenant consistency on link rows.
create or replace function public.enforce_borrower_profile_link_tenant()
returns trigger
language plpgsql
as $$
declare
  borrower_tenant uuid;
  profile_has_tenant boolean;
begin
  select b.tenant_id into borrower_tenant
  from public.borrowers b
  where b.id = new.borrower_id;

  if borrower_tenant is null then
    raise exception 'Borrower % not found for tenant validation', new.borrower_id;
  end if;

  if borrower_tenant <> new.tenant_id then
    raise exception 'Tenant mismatch: borrower tenant (%) != link tenant (%)', borrower_tenant, new.tenant_id;
  end if;

  -- The profile must have an active role on this tenant.
  select exists (
    select 1
    from public.user_tenant_roles utr
    where utr.user_id = new.profile_id
      and utr.tenant_id = new.tenant_id
      and utr.is_active = true
  ) into profile_has_tenant;

  if not profile_has_tenant then
    raise exception 'Profile % does not belong to tenant %', new.profile_id, new.tenant_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_borrower_profile_link_tenant on public.borrower_profile_links;
create trigger trg_borrower_profile_link_tenant
before insert or update on public.borrower_profile_links
for each row execute function public.enforce_borrower_profile_link_tenant();

-- ===============================
-- 2) Repayment Allocation Tracking
-- ===============================

create table if not exists public.repayment_allocations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  repayment_id uuid not null references public.repayments(id) on delete cascade,
  loan_id uuid not null references public.loans(id) on delete cascade,
  loan_schedule_id uuid references public.loan_schedules(id) on delete set null,
  allocated_principal numeric(18,2) not null default 0,
  allocated_interest numeric(18,2) not null default 0,
  allocated_fees numeric(18,2) not null default 0,
  allocated_total numeric(18,2) generated always as (allocated_principal + allocated_interest + allocated_fees) stored,
  allocation_order integer not null default 1,
  created_at timestamptz not null default now(),
  check (allocated_principal >= 0 and allocated_interest >= 0 and allocated_fees >= 0)
);

create index if not exists idx_repayment_allocations_repayment
  on public.repayment_allocations(repayment_id, allocation_order);

create index if not exists idx_repayment_allocations_schedule
  on public.repayment_allocations(loan_schedule_id);

-- Allocation trigger:
-- 1) applies amount to oldest pending schedule rows (fees -> interest -> principal)
-- 2) if schedules are absent, allocates to principal only for the loan
create or replace function public.allocate_repayment_to_schedule()
returns trigger
language plpgsql
as $$
declare
  v_remaining numeric(18,2);
  s record;
  v_fee_outstanding numeric(18,2);
  v_int_outstanding numeric(18,2);
  v_prn_outstanding numeric(18,2);
  v_fee_alloc numeric(18,2);
  v_int_alloc numeric(18,2);
  v_prn_alloc numeric(18,2);
  v_order integer := 1;
begin
  if new.status <> 'completed' then
    return new;
  end if;

  v_remaining := new.amount;

  for s in
    select ls.*
    from public.loan_schedules ls
    where ls.loan_id = new.loan_id
      and ls.tenant_id = new.tenant_id
      and ls.status in ('pending','partial','overdue')
    order by ls.due_date asc, ls.installment_no asc
  loop
    exit when v_remaining <= 0;

    v_fee_outstanding := greatest(0, s.fees_due - s.fees_paid);
    v_int_outstanding := greatest(0, s.interest_due - s.interest_paid);
    v_prn_outstanding := greatest(0, s.principal_due - s.principal_paid);

    v_fee_alloc := least(v_remaining, v_fee_outstanding);
    v_remaining := v_remaining - v_fee_alloc;

    v_int_alloc := least(v_remaining, v_int_outstanding);
    v_remaining := v_remaining - v_int_alloc;

    v_prn_alloc := least(v_remaining, v_prn_outstanding);
    v_remaining := v_remaining - v_prn_alloc;

    if (v_fee_alloc + v_int_alloc + v_prn_alloc) > 0 then
      insert into public.repayment_allocations (
        tenant_id, repayment_id, loan_id, loan_schedule_id,
        allocated_principal, allocated_interest, allocated_fees, allocation_order
      ) values (
        new.tenant_id, new.id, new.loan_id, s.id,
        v_prn_alloc, v_int_alloc, v_fee_alloc, v_order
      );

      update public.loan_schedules
      set
        fees_paid = fees_paid + v_fee_alloc,
        interest_paid = interest_paid + v_int_alloc,
        principal_paid = principal_paid + v_prn_alloc,
        status = case
          when (principal_paid + v_prn_alloc) >= principal_due
           and (interest_paid + v_int_alloc) >= interest_due
           and (fees_paid + v_fee_alloc) >= fees_due
            then 'paid'
          else 'partial'
        end
      where id = s.id;

      v_order := v_order + 1;
    end if;
  end loop;

  -- Fallback path when no schedule exists or amount remains:
  if v_remaining > 0 then
    insert into public.repayment_allocations (
      tenant_id, repayment_id, loan_id, loan_schedule_id,
      allocated_principal, allocated_interest, allocated_fees, allocation_order
    ) values (
      new.tenant_id, new.id, new.loan_id, null,
      v_remaining, 0, 0, v_order
    );
  end if;

  -- Update loan outstanding based on total allocated to this repayment.
  update public.loans l
  set outstanding_amount = greatest(
    0,
    l.outstanding_amount - (
      select coalesce(sum(ra.allocated_total), 0)
      from public.repayment_allocations ra
      where ra.repayment_id = new.id
    )
  )
  where l.id = new.loan_id;

  return new;
end;
$$;

drop trigger if exists trg_allocate_repayment on public.repayments;
create trigger trg_allocate_repayment
after insert on public.repayments
for each row execute function public.allocate_repayment_to_schedule();

-- ===============================
-- 3) Reconciliation and Ops Views
-- ===============================

-- Shows local records missing ERPNext links.
create or replace view public.v_recon_missing_erpnext_links as
select
  t.code as tenant_code,
  'borrower'::text as entity_type,
  b.id as local_entity_id,
  b.borrower_ref as local_ref,
  b.created_at
from public.borrowers b
join public.tenants t on t.id = b.tenant_id
left join public.erpnext_links el
  on el.tenant_id = b.tenant_id
 and el.local_entity_type = 'borrower'
 and el.local_entity_id = b.id
where el.id is null
union all
select
  t.code as tenant_code,
  'application'::text as entity_type,
  a.id as local_entity_id,
  a.application_ref as local_ref,
  a.submitted_at as created_at
from public.loan_applications a
join public.tenants t on t.id = a.tenant_id
left join public.erpnext_links el
  on el.tenant_id = a.tenant_id
 and el.local_entity_type = 'application'
 and el.local_entity_id = a.id
where el.id is null
union all
select
  t.code as tenant_code,
  'loan'::text as entity_type,
  l.id as local_entity_id,
  l.loan_ref as local_ref,
  l.created_at
from public.loans l
join public.tenants t on t.id = l.tenant_id
left join public.erpnext_links el
  on el.tenant_id = l.tenant_id
 and el.local_entity_type = 'loan'
 and el.local_entity_id = l.id
where el.id is null;

-- Outbox health for operations dashboarding.
create or replace view public.v_integration_queue_health as
select
  t.code as tenant_code,
  e.event_type,
  e.status,
  count(*) as event_count,
  min(e.created_at) as oldest_created_at,
  max(e.created_at) as newest_created_at
from public.integration_events e
join public.tenants t on t.id = e.tenant_id
group by t.code, e.event_type, e.status;

-- =====================
-- Enable RLS + Policies
-- =====================

alter table public.borrower_profile_links enable row level security;
alter table public.repayment_allocations enable row level security;

drop policy if exists "borrower_profile_links_tenant_access" on public.borrower_profile_links;
create policy "borrower_profile_links_tenant_access" on public.borrower_profile_links
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "repayment_allocations_tenant_access" on public.repayment_allocations;
create policy "repayment_allocations_tenant_access" on public.repayment_allocations
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

commit;
