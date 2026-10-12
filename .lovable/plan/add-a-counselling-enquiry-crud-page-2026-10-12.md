# Add a counselling enquiry CRUD page

## What will change
- Add a private-by-token `/admin/counselling` page to list, create, edit, and delete counselling enquiries through the existing PHP API.
- Keep the administrator token in page memory only; every list, update, and delete request is authorized by the PHP server.
- Provide loading, empty, success, validation, network, and unauthorized states, with the same set of fields and course options as the public form.
- Register page-specific metadata and add a roadmap item; do not add a public navigation link to the management page.

## Technical details
- The page uses the existing API endpoint and MySQL schema: POST to create, GET to list, PATCH to update, and DELETE to remove.
- A page refresh clears the token; administrators enter it again. The server remains responsible for granting access.
- Live table operations depend on PHP/MySQL hosting being configured; verify public page rendering and frontend request behavior in preview.

## Verification
- Check the automatic build and exercise route rendering, access-token prompt, and UI interactions.
- Confirm protected methods pass the token in the Authorization header and that token/data are not persisted in browser storage.
