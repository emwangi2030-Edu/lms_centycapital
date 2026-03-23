# ERPNext Lending Event Contract (SoR)

This contract defines how LMS actions map to ERPNext Lending writes.
ERPNext is authoritative for lending finance records.

## Principles

- ERPNext Lending is the Source of Record (SoR) for:
  - application decisions
  - disbursement
  - repayment postings
  - delinquency state
  - write-offs
- Supabase stores operational mirrors for fast UI and tenant filtering.
- Every write event includes an idempotency key to avoid duplicate posting.

## Transport Contract

- `event_id`: UUID
- `event_type`: string (see below)
- `tenant_code`: string (e.g. `centycapital-ke`)
- `occurred_at`: ISO8601 timestamp
- `actor_user_id`: UUID or null
- `idempotency_key`: deterministic unique key
- `payload`: event-specific JSON

## Event Types

### 1) `application_submitted`

**Source:** LMS  
**Target:** ERPNext Lead/Loan Application doc creation  
**Payload:**
- `application_ref`
- `borrower_ref`
- `borrower_national_id`
- `principal_amount`
- `product_code`
- `partner_code` (optional)

### 2) `application_approved`

**Source:** LMS decision workflow  
**Target:** ERPNext application status update  
**Payload:**
- `application_ref`
- `approved_amount`
- `approved_by`
- `decision_notes`

### 3) `application_rejected`

**Source:** LMS decision workflow  
**Target:** ERPNext application status update  
**Payload:**
- `application_ref`
- `rejection_reason`
- `rejected_by`

### 4) `loan_disbursed`

**Source:** LMS disbursement action  
**Target:** ERPNext loan + accounting posting  
**Payload:**
- `loan_ref`
- `application_ref`
- `borrower_ref`
- `disbursed_amount`
- `disbursed_at`
- `channel` (`mpesa`, `bank_transfer`, etc.)

### 5) `repayment_received`

**Source:** payment ingestion/manual posting  
**Target:** ERPNext repayment posting + outstanding recalculation  
**Payload:**
- `payment_ref`
- `loan_ref`
- `amount`
- `channel`
- `paid_at`

### 6) `loan_written_off`

**Source:** authorized write-off action  
**Target:** ERPNext write-off transaction and status updates  
**Payload:**
- `loan_ref`
- `writeoff_amount`
- `reason`
- `approved_by`
- `effective_date`

## Idempotency Rules

- Suggested key format:
  - `tenant_code:event_type:business_ref`
- Examples:
  - `centycapital-ke:application_submitted:CNTAPP023`
  - `centycapital-ke:repayment_received:RA4X9KL2MT`
- Duplicate key must be accepted as success (no re-post).

## Sync-back (ERPNext -> Supabase)

After successful ERPNext write:
- Upsert `erpnext_links` with `(tenant_id, local_entity_type, local_entity_id, erpnext_doctype, erpnext_name)`
- Update mirror table status and canonical fields:
  - `loan_applications.status`
  - `loans.status`, `loans.outstanding_amount`
  - `repayments.status`
- Append `audit_events` row.

## Failure Handling

- Retries: exponential backoff (e.g. 1m, 5m, 15m, 60m)
- Max retries: 5
- After max retries: dead-letter queue and alert operations
- Never drop failed finance events silently

## Reconciliation Jobs

- Daily job compares ERPNext canonical docs with Supabase mirrors:
  - missing links
  - amount mismatches
  - status mismatches
- Reconciliation result is stored in `audit_events` and surfaced in ops dashboard.
