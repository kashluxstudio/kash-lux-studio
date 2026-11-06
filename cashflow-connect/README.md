# CashFlow Connect — MVP prototype

A separate, mobile-responsive business dashboard prototype for Ka$h Lux Studio. It is intentionally isolated under `/cashflow-connect/` and does not replace or modify the existing website homepage.

## Included in this MVP

- Overview dashboard with clearly labeled illustrative sample metrics
- Lead pipeline with add and search/filter
- Customer directory with add and search
- Appointment list with add
- Invoice register with add and paid/outstanding totals
- Follow-up task list with add and completion toggles
- JSON export of demo records
- Workspace settings and indicative subscription tiers
- Responsive purple, black, and gold interface

## Important limitations

This is a front-end demonstration, not a production SaaS yet.

- Demo records are stored in the current browser's local storage only.
- Sample records and revenue figures are fictional.
- There is no authentication, tenant isolation, hosted database, server API, or backup.
- PayPal, Stripe, Airtable, email, SMS, and n8n are not connected.
- Invoice records do not collect money and do not confirm payments.
- Do not enter real customer, personal, or payment information.

## Preview

After this branch is reviewed and the hosting configuration is confirmed, the folder can be deployed to a preview URL. Do not publish to the production domain until security, persistence, authentication, and integration work is complete.

## Next production milestones

1. Confirm hosting target and preview deployment path.
2. Add a server-side API and managed database.
3. Implement secure sign-in and business-level data isolation.
4. Add server-side validation, authorization, audit logging, and backups.
5. Connect payment provider checkout and verified webhooks.
6. Connect Airtable/n8n only after credentials and data mappings are reviewed.
7. Test accessibility, mobile behavior, security, and payment lifecycle before launch.
