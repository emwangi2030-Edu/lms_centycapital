# Supabase Migration Runbook

Project: `cxabhucaixwfyxvwlgdn`

This runbook applies:
- `SUPABASE_MIGRATION_001.sql`
- `SUPABASE_MIGRATION_002.sql`
- `SUPABASE_MIGRATION_003.sql`

## 1) Pre-checks

- Confirm you are in the correct project dashboard:
  - https://supabase.com/dashboard/project/cxabhucaixwfyxvwlgdn
- Confirm no active schema changes are running in parallel.
- Take a database backup/snapshot if this is not a fresh environment.

## 2) Apply Migration 001

1. Open SQL Editor in Supabase.
2. Paste and run `SUPABASE_MIGRATION_001.sql`.
3. Verify success (no errors).

### Verification queries (Migration 001)

```sql
select tablename
from pg_tables
where schemaname = 'public'
  and tablename in (
    'tenants','profiles','user_tenant_roles',
    'borrowers','loan_applications','loans','repayments',
    'kyc_documents','audit_events','erpnext_links'
  )
order by tablename;
```

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'user_tenant_roles','borrowers','loan_applications','loans',
    'repayments','kyc_documents','audit_events','erpnext_links'
  )
order by tablename;
```

```sql
select proname
from pg_proc
where proname in ('current_user_tenant_ids')
order by proname;
```

## 3) Apply Migration 002

1. Open SQL Editor in Supabase.
2. Paste and run `SUPABASE_MIGRATION_002.sql`.
3. Verify success (no errors).

### Verification queries (Migration 002)

```sql
select tablename
from pg_tables
where schemaname = 'public'
  and tablename in (
    'permissions','role_permissions',
    'loan_schedules','loan_charges',
    'integration_events','integration_event_attempts','integration_dead_letters'
  )
order by tablename;
```

```sql
select count(*) as permissions_count from public.permissions;
select role, count(*) as permission_count
from public.role_permissions
group by role
order by role;
```

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'permissions','role_permissions','loan_schedules','loan_charges',
    'integration_events','integration_event_attempts','integration_dead_letters'
  )
order by tablename;
```

```sql
select proname
from pg_proc
where proname in ('has_permission')
order by proname;
```

## 4) Seed tenant codes (if needed)

If tenants are not yet present:

```sql
insert into public.tenants (code, name)
values
  ('centycapital-ke', 'CentyCapital Kenya'),
  ('upeo-co-ke', 'Upeo Kenya')
on conflict (code) do nothing;
```

## 5) Apply Migration 003

1. Open SQL Editor in Supabase.
2. Paste and run `SUPABASE_MIGRATION_003.sql`.
3. Verify success (no errors).

### Verification queries (Migration 003)

```sql
select tablename
from pg_tables
where schemaname = 'public'
  and tablename in (
    'borrower_profile_links',
    'repayment_allocations'
  )
order by tablename;
```

```sql
select viewname
from pg_views
where schemaname = 'public'
  and viewname in (
    'v_recon_missing_erpnext_links',
    'v_integration_queue_health'
  )
order by viewname;
```

```sql
select proname
from pg_proc
where proname in (
  'enforce_borrower_profile_link_tenant',
  'allocate_repayment_to_schedule'
)
order by proname;
```

## 6) Post-run smoke checks

- Authenticated test user in tenant A can only read tenant A borrower rows.
- Authenticated test user in tenant B cannot read tenant A rows.
- `integration_events` accepts unique idempotency keys per tenant.
- Inserting a completed repayment creates rows in `repayment_allocations`.
- `v_recon_missing_erpnext_links` lists entities not yet linked to ERPNext.

## 7) Rollback guidance

These migrations are additive and create tables/policies/functions.
If rollback is required:
- Prefer restoring from backup/snapshot.
- For selective rollback, drop newly created objects in reverse dependency order.
- Do not drop auth-linked tables (`profiles`) without verifying downstream dependencies.

