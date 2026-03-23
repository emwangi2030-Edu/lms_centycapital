-- Supabase Migration 002
-- Purpose: role-permission matrix, loan schedule model, ERPNext sync queue + DLQ
-- Depends on: SUPABASE_MIGRATION_001.sql

begin;

-- =========================
-- Role Permission Catalogue
-- =========================

create table if not exists public.permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('admin','credit_manager','credit_officer','client')),
  permission_code text not null references public.permissions(code) on delete cascade,
  created_at timestamptz not null default now(),
  unique(role, permission_code)
);

insert into public.permissions (code, description) values
  ('view_dashboard', 'View dashboard and KPIs'),
  ('view_reports', 'View reports screens'),
  ('create_application', 'Create loan application'),
  ('approve_application', 'Approve loan application'),
  ('reject_application', 'Reject loan application'),
  ('disburse_loan', 'Disburse approved loan'),
  ('record_repayment', 'Record repayment transaction'),
  ('writeoff_loan', 'Create loan write-off'),
  ('manage_products', 'Create/update lending products'),
  ('manage_kyc', 'Manage KYC document definitions'),
  ('manage_users', 'Manage tenant user roles'),
  ('view_profile', 'View own borrower profile'),
  ('upload_kyc', 'Upload own KYC documents')
on conflict (code) do nothing;

insert into public.role_permissions (role, permission_code) values
  -- admin
  ('admin','view_dashboard'),
  ('admin','view_reports'),
  ('admin','create_application'),
  ('admin','approve_application'),
  ('admin','reject_application'),
  ('admin','disburse_loan'),
  ('admin','record_repayment'),
  ('admin','writeoff_loan'),
  ('admin','manage_products'),
  ('admin','manage_kyc'),
  ('admin','manage_users'),
  ('admin','view_profile'),
  ('admin','upload_kyc'),
  -- credit_manager
  ('credit_manager','view_dashboard'),
  ('credit_manager','view_reports'),
  ('credit_manager','create_application'),
  ('credit_manager','approve_application'),
  ('credit_manager','reject_application'),
  ('credit_manager','disburse_loan'),
  ('credit_manager','record_repayment'),
  ('credit_manager','view_profile'),
  -- credit_officer
  ('credit_officer','view_dashboard'),
  ('credit_officer','create_application'),
  ('credit_officer','record_repayment'),
  ('credit_officer','view_profile'),
  -- client
  ('client','view_profile'),
  ('client','upload_kyc')
on conflict (role, permission_code) do nothing;

-- =====================
-- Loan Schedule/Charges
-- =====================

create table if not exists public.loan_schedules (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  loan_id uuid not null references public.loans(id) on delete cascade,
  installment_no integer not null,
  due_date date not null,
  principal_due numeric(18,2) not null default 0,
  interest_due numeric(18,2) not null default 0,
  fees_due numeric(18,2) not null default 0,
  total_due numeric(18,2) generated always as (principal_due + interest_due + fees_due) stored,
  principal_paid numeric(18,2) not null default 0,
  interest_paid numeric(18,2) not null default 0,
  fees_paid numeric(18,2) not null default 0,
  status text not null default 'pending' check (status in ('pending','partial','paid','overdue','waived')),
  created_at timestamptz not null default now(),
  unique(loan_id, installment_no)
);

create index if not exists idx_loan_schedules_tenant_loan_due
  on public.loan_schedules (tenant_id, loan_id, due_date);

create table if not exists public.loan_charges (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  loan_id uuid not null references public.loans(id) on delete cascade,
  charge_type text not null, -- processing_fee, penalty, insurance, etc.
  amount numeric(18,2) not null check (amount >= 0),
  currency text not null default 'KES',
  applied_at timestamptz not null default now(),
  status text not null default 'applied' check (status in ('applied','waived','reversed')),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists idx_loan_charges_tenant_loan
  on public.loan_charges (tenant_id, loan_id, charge_type);

-- ============================
-- ERPNext Integration Outbox
-- ============================

create table if not exists public.integration_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  event_type text not null,
  entity_type text not null,
  entity_id uuid,
  business_ref text,
  payload jsonb not null default '{}'::jsonb,
  idempotency_key text not null,
  status text not null default 'queued' check (status in ('queued','processing','sent','failed','dead_letter')),
  attempts integer not null default 0,
  last_error text,
  next_attempt_at timestamptz,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique(tenant_id, idempotency_key)
);

create index if not exists idx_integration_events_status_next_attempt
  on public.integration_events (status, next_attempt_at, created_at);

create table if not exists public.integration_event_attempts (
  id uuid primary key default gen_random_uuid(),
  integration_event_id uuid not null references public.integration_events(id) on delete cascade,
  attempt_no integer not null,
  attempted_at timestamptz not null default now(),
  success boolean not null,
  error_message text,
  response_snapshot jsonb not null default '{}'::jsonb
);

create table if not exists public.integration_dead_letters (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  event_type text not null,
  idempotency_key text not null,
  payload jsonb not null default '{}'::jsonb,
  final_error text,
  failed_at timestamptz not null default now(),
  resolved boolean not null default false,
  resolved_at timestamptz
);

create index if not exists idx_integration_dead_letters_open
  on public.integration_dead_letters (resolved, failed_at);

-- ======================
-- Helper RPC (optional)
-- ======================

create or replace function public.has_permission(p_code text)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.user_tenant_roles utr
    join public.role_permissions rp on rp.role = utr.role
    where utr.user_id = auth.uid()
      and utr.is_active = true
      and rp.permission_code = p_code
  )
$$;

-- ==========
-- RLS
-- ==========

alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.loan_schedules enable row level security;
alter table public.loan_charges enable row level security;
alter table public.integration_events enable row level security;
alter table public.integration_event_attempts enable row level security;
alter table public.integration_dead_letters enable row level security;

drop policy if exists "permissions_read_all_auth" on public.permissions;
create policy "permissions_read_all_auth" on public.permissions
for select using (auth.uid() is not null);

drop policy if exists "role_permissions_read_all_auth" on public.role_permissions;
create policy "role_permissions_read_all_auth" on public.role_permissions
for select using (auth.uid() is not null);

drop policy if exists "loan_schedules_tenant_access" on public.loan_schedules;
create policy "loan_schedules_tenant_access" on public.loan_schedules
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "loan_charges_tenant_access" on public.loan_charges;
create policy "loan_charges_tenant_access" on public.loan_charges
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "integration_events_tenant_access" on public.integration_events;
create policy "integration_events_tenant_access" on public.integration_events
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "integration_attempts_tenant_access" on public.integration_event_attempts;
create policy "integration_attempts_tenant_access" on public.integration_event_attempts
for select using (
  exists (
    select 1
    from public.integration_events e
    where e.id = integration_event_id
      and e.tenant_id in (select public.current_user_tenant_ids())
  )
);

drop policy if exists "integration_dead_letters_tenant_access" on public.integration_dead_letters;
create policy "integration_dead_letters_tenant_access" on public.integration_dead_letters
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

commit;
