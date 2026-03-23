# CentyCapital LMS Console

Internal LMS console UI for lms.centycapital.com. Static front end (HTML + CSS + JS) with mock data. Design: DM Sans, Fraunces, green/teal/amber/rose palette.

## Run locally

**Option 1 — open file**
- Open `index.html` in a browser (some features may be limited without a server).

**Option 2 — static server**
```bash
# With Node (npx)
npx serve -l 3001

# With Python 3
python3 -m http.server 3001
```
Then open http://localhost:3001

## Structure

- `index.html` — Shell, sidebar, topbar, all views (dashboard, leads, applications, loans, borrowers, M-Pesa, products, KYC, profiles, SMS, DMS), drawers, modals, toast container.
- `styles.css` — Design tokens, layout, components (cards, tables, tabs, badges, buttons, drawer, modal, form, dashboard charts).
- `app.js` — Mock data (LEADS, APPS, LOANS, BORROWERS, MPESA, PRODUCTS, KYC_DOCS, SMS_*, DMS_HISTORY), view switching, render functions, drawer/modal/toast helpers, dashboard charts.
- `SUPABASE_MIGRATION_001.sql` / `002` / `003` — Core schema, RLS, permissions, allocations, reconciliation.
- `SUPABASE_SEED_DEMO.sql` — Idempotent UAT demo seed.
- `SUPABASE_BOOTSTRAP_ALL.sql` — One-click psql wrapper to run all migrations and seed.
- `deploy_lms.sh` — SSH/rsync deploy script for `lms.centycapital.com`.

## Next steps

- Point to real APIs (ERPNext/lending) when backend is ready.
- Add auth and wire `erp_customer_id` for customer-facing flows if this app hosts any.
- Deploy to lms.centycapital.com (e.g. Nginx static or same host as Centyapp).

## Deploy (server over SSH)

```bash
./deploy_lms.sh
```

Optional env overrides:

```bash
TARGET_HOST=linode-2 TARGET_PATH=/home/lms.centycapital.com/public_html ./deploy_lms.sh
```
