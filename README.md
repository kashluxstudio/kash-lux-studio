# Ka$h Lux Studio Website v11

This package contains the animated Ka$h Lux Studio website with larger responsive logos, its verified PayPal deposit link, client policies, legal pages, and the official Facebook Page connection.

## Upload these files to GitHub

- index.html
- pricing.html
- consultation.html
- deposit-policy.html
- privacy-policy.html
- terms.html
- styles.css
- script.js
- kash-lux-logo.png

## How to update the live site

1. Open the `kash-lux-studio` GitHub repository.
2. Select **Add file → Upload files**.
3. Upload all files from this folder.
4. Allow GitHub to replace the existing files.
5. Commit directly to the `main` branch.
6. Wait about one minute.
7. Refresh your GitHub Pages website.

## Contact forms

The homepage contact form (`index.html`) and consultation form
(`consultation.html`) submit directly by HTTP POST to:

`https://hooks.kashluxstudio.org/webhook/kash-lux-lead`

Each submission includes a `form_source` value identifying the originating
form and a `company_website` field intended for spam screening.

The website forms do not use FormSubmit, so FormSubmit activation is not
required. Processing, storage, notifications, and the response displayed
after submission are determined by the webhook backend. This repository
does not establish delivery to a particular email inbox.
