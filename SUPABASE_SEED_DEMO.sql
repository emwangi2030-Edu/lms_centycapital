-- Supabase Demo Seed
-- Purpose: bootstrap UAT data after migrations 001-003.
-- Safe to re-run (uses upserts/guards where possible).
--
-- Prerequisites:
-- 1) Run migrations 001, 002, 003 first.
-- 2) Ensure these users exist in Supabase Auth and have matching rows in public.profiles.email:
--    - admin@centycapital.com
--    - manager@centycapital.com
--    - officer@centycapital.com
--    - grace@client.centycapital.com
--    - edwin@upeo.co.ke

begin;

-- -------------------------
-- 1) Tenants
-- -------------------------
insert into public.tenants (code, name, status)
values
  ('centycapital-ke', 'CentyCapital Kenya', 'active'),
  ('upeo-co-ke', 'Upeo Kenya', 'active')
on conflict (code) do update
set name = excluded.name,
    status = excluded.status;

-- -------------------------
-- 2) User role mappings
-- -------------------------
with t as (
  select id, code from public.tenants where code in ('centycapital-ke','upeo-co-ke')
),
p as (
  select id, lower(email) as email
  from public.profiles
  where lower(email) in (
    'admin@centycapital.com',
    'manager@centycapital.com',
    'officer@centycapital.com',
    'grace@client.centycapital.com',
    'edwin@upeo.co.ke'
  )
)
insert into public.user_tenant_roles (user_id, tenant_id, role, is_active)
select p.id, t.id, m.role, true
from (
  values
    ('admin@centycapital.com','centycapital-ke','admin'),
    ('manager@centycapital.com','centycapital-ke','credit_manager'),
    ('officer@centycapital.com','centycapital-ke','credit_officer'),
    ('grace@client.centycapital.com','centycapital-ke','client'),
    ('edwin@upeo.co.ke','upeo-co-ke','client')
) as m(email, tenant_code, role)
join p on p.email = m.email
join t on t.code = m.tenant_code
on conflict (user_id, tenant_id, role) do update
set is_active = excluded.is_active;

-- -------------------------
-- 3) Borrowers
-- -------------------------
insert into public.borrowers (
  tenant_id, borrower_ref, national_id, full_name, phone, email, status, kyc_status
)
select t.id, x.borrower_ref, x.national_id, x.full_name, x.phone, x.email, x.status, x.kyc_status
from (
  values
    ('centycapital-ke','BWR-0001','12345679','Grace Wanjiku','0712345678','grace@client.centycapital.com','active','submitted'),
    ('centycapital-ke','BWR-0003','34567890','Faith Njeri','0734567890','faith@client.centycapital.com','active','pending'),
    ('upeo-co-ke','BWR-0013','12345678','Edwin Upeo','0700123456','edwin@upeo.co.ke','active','submitted')
) as x(tenant_code, borrower_ref, national_id, full_name, phone, email, status, kyc_status)
join public.tenants t on t.code = x.tenant_code
on conflict (tenant_id, borrower_ref) do update
set national_id = excluded.national_id,
    full_name = excluded.full_name,
    phone = excluded.phone,
    email = excluded.email,
    status = excluded.status,
    kyc_status = excluded.kyc_status;

-- -------------------------
-- 4) Client profile links
-- -------------------------
insert into public.borrower_profile_links (tenant_id, borrower_id, profile_id, relationship, is_primary)
select
  b.tenant_id,
  b.id as borrower_id,
  p.id as profile_id,
  'self',
  true
from public.borrowers b
join public.profiles p on lower(p.email) = lower(b.email)
where b.email is not null
on conflict (tenant_id, borrower_id, profile_id) do update
set relationship = excluded.relationship,
    is_primary = excluded.is_primary;

-- -------------------------
-- 5) Loan applications
-- -------------------------
insert into public.loan_applications (
  tenant_id, borrower_id, application_ref, principal_amount, product_code,
  status, decision_reason, submitted_at
)
select
  b.tenant_id,
  b.id,
  a.application_ref,
  a.principal_amount,
  a.product_code,
  a.status,
  a.decision_reason,
  now() - a.days_ago * interval '1 day'
from (
  values
    ('centycapital-ke','BWR-0001','CNTAPP001',30000::numeric,'CentyFlex30','approved',null,5),
    ('centycapital-ke','BWR-0003','CNTAPP003',20000::numeric,'CentyFlex30','pending',null,2),
    ('upeo-co-ke','BWR-0013','UPEOAPP001',50000::numeric,'CentyGrowth60','approved',null,4)
) as a(tenant_code, borrower_ref, application_ref, principal_amount, product_code, status, decision_reason, days_ago)
join public.tenants t on t.code = a.tenant_code
join public.borrowers b on b.tenant_id = t.id and b.borrower_ref = a.borrower_ref
on conflict (tenant_id, application_ref) do update
set principal_amount = excluded.principal_amount,
    product_code = excluded.product_code,
    status = excluded.status,
    decision_reason = excluded.decision_reason;

-- -------------------------
-- 6) Loans
-- -------------------------
insert into public.loans (
  tenant_id, borrower_id, application_id, loan_ref,
  principal_amount, disbursed_amount, outstanding_amount,
  status, disbursed_at, due_at
)
select
  b.tenant_id,
  b.id,
  la.id,
  l.loan_ref,
  l.principal_amount,
  l.disbursed_amount,
  l.outstanding_amount,
  l.status,
  now() - l.disbursed_days_ago * interval '1 day',
  now() + l.due_in_days * interval '1 day'
from (
  values
    ('centycapital-ke','BWR-0001','CNTAPP001','CNTLOAN001',30000::numeric,30000::numeric,12000::numeric,'active',20,10),
    ('upeo-co-ke','BWR-0013','UPEOAPP001','UPEOLOAN001',50000::numeric,50000::numeric,42000::numeric,'active',15,20)
) as l(tenant_code, borrower_ref, application_ref, loan_ref, principal_amount, disbursed_amount, outstanding_amount, status, disbursed_days_ago, due_in_days)
join public.tenants t on t.code = l.tenant_code
join public.borrowers b on b.tenant_id = t.id and b.borrower_ref = l.borrower_ref
join public.loan_applications la on la.tenant_id = t.id and la.application_ref = l.application_ref
on conflict (tenant_id, loan_ref) do update
set principal_amount = excluded.principal_amount,
    disbursed_amount = excluded.disbursed_amount,
    outstanding_amount = excluded.outstanding_amount,
    status = excluded.status,
    due_at = excluded.due_at;

-- -------------------------
-- 7) Repayments
-- -------------------------
insert into public.repayments (
  tenant_id, loan_id, payment_ref, channel, amount, paid_at, status
)
select
  l.tenant_id,
  l.id as loan_id,
  r.payment_ref,
  r.channel,
  r.amount,
  now() - r.days_ago * interval '1 day',
  r.status
from (
  values
    ('centycapital-ke','CNTLOAN001','RA4X9KL2MT','mpesa',5000::numeric,3,'completed'),
    ('upeo-co-ke','UPEOLOAN001','UPEO-PAY-001','mpesa',8000::numeric,2,'completed')
) as r(tenant_code, loan_ref, payment_ref, channel, amount, days_ago, status)
join public.tenants t on t.code = r.tenant_code
join public.loans l on l.tenant_id = t.id and l.loan_ref = r.loan_ref
on conflict (tenant_id, payment_ref) do update
set channel = excluded.channel,
    amount = excluded.amount,
    paid_at = excluded.paid_at,
    status = excluded.status;

-- -------------------------
-- 8) ERPNext link placeholders
-- -------------------------
insert into public.erpnext_links (
  tenant_id, local_entity_type, local_entity_id, erpnext_doctype, erpnext_name
)
select
  l.tenant_id,
  'loan',
  l.id,
  'Loan',
  l.loan_ref
from public.loans l
on conflict (tenant_id, local_entity_type, local_entity_id) do nothing;

commit;

-- -------------
-- Quick checks
-- -------------
-- select t.code, count(*) from public.borrowers b join public.tenants t on t.id=b.tenant_id group by t.code;
-- select t.code, count(*) from public.loans l join public.tenants t on t.id=l.tenant_id group by t.code;
-- select t.code, count(*) from public.repayments r join public.tenants t on t.id=r.tenant_id group by t.code;
