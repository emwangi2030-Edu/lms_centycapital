-- Supabase Migration 001
-- Purpose: tenant model, RBAC, core lending entities, RLS baseline
-- Project: cxabhucaixwfyxvwlgdn

begin;

-- Extensions
create extension if not exists pgcrypto;

-- ===============
-- Reference Tables
-- ===============

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,              -- e.g. centycapital-ke, upeo-co-ke
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_tenant_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  role text not null check (role in ('admin','credit_manager','credit_officer','client')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(user_id, tenant_id, role)
);

-- ===================
-- Lending Core Tables
-- ===================

create table if not exists public.borrowers (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  borrower_ref text not null,
  national_id text not null,
  full_name text not null,
  phone text,
  email text,
  status text not null default 'active',
  kyc_status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique(tenant_id, borrower_ref),
  unique(tenant_id, national_id)
);

create table if not exists public.loan_applications (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  borrower_id uuid not null references public.borrowers(id) on delete restrict,
  application_ref text not null,
  principal_amount numeric(18,2) not null check (principal_amount > 0),
  product_code text,
  status text not null default 'pending', -- pending, approved, rejected, disbursed
  decision_reason text,
  submitted_at timestamptz not null default now(),
  decided_at timestamptz,
  created_by uuid references auth.users(id),
  unique(tenant_id, application_ref)
);

create table if not exists public.loans (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  borrower_id uuid not null references public.borrowers(id) on delete restrict,
  loan_ref text not null,
  application_id uuid references public.loan_applications(id) on delete set null,
  principal_amount numeric(18,2) not null check (principal_amount > 0),
  disbursed_amount numeric(18,2) not null default 0,
  outstanding_amount numeric(18,2) not null default 0,
  status text not null default 'active', -- active, due, overdue, repaid, written_off, frozen
  disbursed_at timestamptz,
  due_at timestamptz,
  created_at timestamptz not null default now(),
  unique(tenant_id, loan_ref)
);

create table if not exists public.repayments (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  loan_id uuid not null references public.loans(id) on delete restrict,
  payment_ref text not null,
  channel text not null default 'mpesa', -- mpesa, bank_offline, other
  amount numeric(18,2) not null check (amount > 0),
  paid_at timestamptz not null default now(),
  status text not null default 'completed', -- completed, pending, failed
  created_at timestamptz not null default now(),
  unique(tenant_id, payment_ref)
);

create table if not exists public.kyc_documents (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  borrower_id uuid not null references public.borrowers(id) on delete cascade,
  doc_type text not null,
  doc_code text,
  file_url text,
  status text not null default 'pending', -- pending, submitted, verified, rejected
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete set null,
  actor_user_id uuid references auth.users(id) on delete set null,
  entity_type text not null,      -- loan, application, borrower, repayment, kyc
  entity_id text not null,
  action text not null,           -- approved, disbursed, updated, etc.
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.erpnext_links (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete restrict,
  local_entity_type text not null,   -- borrower, application, loan, repayment
  local_entity_id uuid not null,
  erpnext_doctype text not null,
  erpnext_name text not null,
  created_at timestamptz not null default now(),
  unique(tenant_id, local_entity_type, local_entity_id),
  unique(tenant_id, erpnext_doctype, erpnext_name)
);

-- ==========
-- RLS Helpers
-- ==========

create or replace function public.current_user_tenant_ids()
returns setof uuid
language sql
stable
as $$
  select utr.tenant_id
  from public.user_tenant_roles utr
  where utr.user_id = auth.uid()
    and utr.is_active = true
$$;

-- ==================
-- Enable RLS + Policy
-- ==================

alter table public.user_tenant_roles enable row level security;
alter table public.borrowers enable row level security;
alter table public.loan_applications enable row level security;
alter table public.loans enable row level security;
alter table public.repayments enable row level security;
alter table public.kyc_documents enable row level security;
alter table public.audit_events enable row level security;
alter table public.erpnext_links enable row level security;

drop policy if exists "utr_self_read" on public.user_tenant_roles;
create policy "utr_self_read" on public.user_tenant_roles
for select using (user_id = auth.uid());

drop policy if exists "borrowers_tenant_access" on public.borrowers;
create policy "borrowers_tenant_access" on public.borrowers
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "applications_tenant_access" on public.loan_applications;
create policy "applications_tenant_access" on public.loan_applications
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "loans_tenant_access" on public.loans;
create policy "loans_tenant_access" on public.loans
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "repayments_tenant_access" on public.repayments;
create policy "repayments_tenant_access" on public.repayments
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "kyc_tenant_access" on public.kyc_documents;
create policy "kyc_tenant_access" on public.kyc_documents
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "audit_tenant_access" on public.audit_events;
create policy "audit_tenant_access" on public.audit_events
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

drop policy if exists "erpnext_links_tenant_access" on public.erpnext_links;
create policy "erpnext_links_tenant_access" on public.erpnext_links
for all using (tenant_id in (select public.current_user_tenant_ids()))
with check (tenant_id in (select public.current_user_tenant_ids()));

commit;
