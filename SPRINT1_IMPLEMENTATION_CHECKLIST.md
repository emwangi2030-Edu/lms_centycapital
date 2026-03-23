# Sprint 1 Implementation Checklist

This checklist turns the architecture decision into executable work for:
- ERPNext Lending as Source of Record (SoR)
- Supabase as tenant/auth/read-model layer
- LMS frontend as system of entry (UI)

## 1) GitHub Bootstrap

- [ ] Initialize git in this project and connect remote:
  - Repo: https://github.com/emwangi2030-Edu/lms_centycapital
- [ ] Add standard structure:
  - `docs/`
  - `supabase/migrations/`
  - `integration/contracts/`
- [ ] Commit current LMS frontend baseline (`index.html`, `app.js`, `styles.css`, `centycred.html`)
- [ ] Add branch protections for `main` (PR required)
- [ ] Add CI check for JS syntax (`node --check`) and lint (if configured)

## 2) Supabase Setup (Project: cxabhucaixwfyxvwlgdn)

- [ ] Apply migration `SUPABASE_MIGRATION_001.sql`
- [ ] Confirm tables exist:
  - `tenants`
  - `profiles`
  - `user_tenant_roles`
  - `borrowers`
  - `loan_applications`
  - `loans`
  - `repayments`
  - `kyc_documents`
  - `audit_events`
  - `erpnext_links`
- [ ] Enable RLS on all tenant-scoped business tables
- [ ] Create initial tenants:
  - `centycapital-ke`
  - `upeo-co-ke`
- [ ] Seed roles:
  - `admin`, `credit_manager`, `credit_officer`, `client`

## 3) Identity and Role Mapping

- [ ] Map existing demo users into Supabase Auth
- [ ] Ensure `profiles.id = auth.users.id`
- [ ] Assign role per tenant in `user_tenant_roles`
- [ ] Add one borrower profile per client with national ID uniqueness per tenant

## 4) ERPNext SoR Contract Readiness

- [ ] Adopt `ERPNext_EVENT_CONTRACT.md` as authoritative integration contract
- [ ] Confirm ERPNext API credentials and endpoint base URL
- [ ] Implement idempotency key strategy for write events
- [ ] Define retry policy and dead-letter handling for failed ERPNext writes

## 5) Frontend Refactor (first pass)

- [ ] Replace hardcoded `AUTH_USERS` lookup with Supabase Auth session
- [ ] Replace local arrays with Supabase reads for:
  - Borrowers
  - Applications
  - Loans
  - Repayments
  - KYC docs
- [ ] Keep current client redirect behavior:
  - client -> `profile`
  - staff -> `dashboard`
- [ ] Preserve tenant-scope and role-guard behavior in UI, backed by DB + RLS

## 6) Verification Matrix

- [ ] `client` user can only view profile/repayment views
- [ ] `credit_officer` cannot approve/disburse/write-off
- [ ] `credit_manager` can approve/disburse, cannot do admin-only actions
- [ ] `admin` can access all views/actions
- [ ] Cross-tenant isolation test:
  - tenant A cannot see any data from tenant B

## 7) Deliverables for Sprint 1 Exit

- [ ] Migration executed in Supabase
- [ ] Role/tenant model active with RLS
- [ ] ERPNext event contract finalized
- [ ] Frontend reading from Supabase for at least `borrowers` + `loan_applications`
- [ ] Go/no-go report with risks and open gaps

