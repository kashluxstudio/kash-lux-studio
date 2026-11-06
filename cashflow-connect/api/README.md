# CashFlow Connect API — secure foundation

This Cloudflare Worker + D1 backend is committed as an un-deployed foundation. It is not yet connected to the front-end.

## Security model
- Cloudflare Access authenticates users; the Worker independently verifies the JWT signature using the Access JWKS and checks RS256, issuer, audience, expiry, not-before, and email.
- User-supplied email, role, and tenant claims are never accepted as authorization.
- Each business-data request requires `X-Workspace-Id`; the Worker verifies the authenticated email's active membership for that exact workspace.
- Every data SELECT, UPDATE, and DELETE includes the authorized workspace ID in its SQL predicate.
- SQL values use prepared statements. Table names and writable fields use fixed server-side allowlists.
- Roles: owner/admin manage invoices and delete records; staff create/update permitted operational records; read_only can only read.
- CORS permits only the configured exact app origin. API responses are non-cacheable.

## Deployment is NOT complete
No Cloudflare account configuration, D1 database, Access application, secret, migration, or deployment has been created by this commit. Do not enter real customer information until the setup, integration, tests, and security review are complete.

## Setup
1. Create a Cloudflare D1 database named `cashflow-connect`.
2. Replace `database_id` in `wrangler.toml` with the actual D1 ID.
3. Set `ACCESS_ISSUER` to the exact issuer URL shown by Cloudflare Access.
4. Set `ACCESS_AUD` to the exact Access Application Audience (AUD) tag.
5. Set `APP_ORIGIN` to the exact HTTPS app origin, without a trailing slash.
6. In Cloudflare Zero Trust, create a self-hosted Access application for the CashFlow Connect hostname and allow invited users only. Do not use a public allow policy.
7. Protect the API path as well as the frontend. Prefer same-origin routing of `/api/*` to this Worker.
8. From this directory, after confirming the target account/database, run `npx wrangler d1 migrations apply cashflow-connect --remote`, then `npx wrangler deploy`.
9. Configure Cloudflare rate limits, monitoring, backups, and alerts.

## First workspace bootstrap
Workspace creation is intentionally not a public endpoint. After the owner has authenticated through Access, use the Cloudflare D1 console to add the first workspace and owner membership. Replace the placeholders with the exact verified Access email and one generated UUID (use the same UUID in both statements).

```sql
INSERT INTO users(email,identity_subject,created_at) VALUES('OWNER_EMAIL_FROM_ACCESS','cloudflare-access',datetime('now'));
INSERT INTO tenants(id,name,status,created_at) VALUES('GENERATE-ONE-UUID','Your Business Name','active',datetime('now'));
INSERT INTO workspace_memberships(workspace_id,email,role,created_at) VALUES('GENERATE-ONE-UUID','OWNER_EMAIL_FROM_ACCESS','owner',datetime('now'));
```

For each invited staff user, ensure their email is allowed by Access, add a users row, then add a membership with the least-privilege role.

## Routes
All routes except `GET /api/health` require a valid Access JWT. Business routes also require `X-Workspace-Id`.
- `GET /api/me` — identity and memberships
- `GET /api/workspaces` — memberships
- CRUD for `leads`, `customers`, `appointments`, `invoices`, and `tasks`
List responses are capped at 100 rows; request bodies at 32 KB.

## Remaining before production
Frontend sign-in/workspace selector and API adapter; invitation/onboarding workflow; cross-resource customer ownership validation; automated tests; audit-log viewing; retention/export/deletion; backup restore test; security review and penetration testing; subscription billing and verified payment webhooks.
