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

## Next steps

- Point to real APIs (ERPNext/lending) when backend is ready.
- Add auth and wire `erp_customer_id` for customer-facing flows if this app hosts any.
- Deploy to lms.centycapital.com (e.g. Nginx static or same host as Centyapp).
