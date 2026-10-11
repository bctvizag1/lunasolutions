# Move counselling enquiries to MySQL on PHP hosting

## What will change
- Replace the browser's Cloud-database submission with a same-site PHP endpoint so the form can save enquiries to MySQL on the Linux host.
- Add PHP CRUD handlers: public, validated enquiry creation; administrator-only listing, updating and deleting protected by a server-side bearer token.
- Add the MySQL table-creation script and a short hosting/configuration guide. Keep database credentials and the admin token out of the public folder and source control.
- Keep the shared contact form and its existing fields on both the home and contact pages.
- Update the project guidance and roadmap to reflect the PHP/MySQL hosting setup.

## Technical details
- Deliver PHP source and SQL in the project so Vite copies the PHP endpoint into `dist` for upload alongside the static site. PHP execution and MySQL access must be enabled by the hosting provider; they cannot run in this preview.
- Use PDO prepared statements, JSON responses, server-side input validation and environment-based secrets. Do not expose read/update/delete operations without the admin bearer token.
- Do not configure CORS for the public write endpoint; the form will call its own site's API path.

## Verification
- Check the frontend compiles and the contact form sends the expected JSON to the PHP endpoint.
- Inspect the SQL and PHP for the matching table/fields and protected CRUD operations; note that live database verification awaits hosting credentials and deployment.
