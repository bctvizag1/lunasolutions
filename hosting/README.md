# PHP and MySQL hosting

The contact form posts to `api/counselling.php`. The endpoint saves enquiries using PDO and supports authenticated read, update, and delete operations. No live database credentials are included in this project.

## 1. Create the MySQL table

In your hosting provider's MySQL tool, select the database created for this website and run [`mysql-schema.sql`](./mysql-schema.sql). The table is named `counselling_enquiries`.

## 2. Set up private PHP configuration

This site expects its web files to be uploaded into your hosting web root, commonly named `public_html`. Create a `private` directory **beside** that web root, not inside it. Copy [`counselling-config.example.php`](./counselling-config.example.php) to:

```text
<directory above the web root>/private/counselling-config.php
```

Replace each placeholder with the database host, database name, database username and database password provided by your host. Do not upload real passwords to this project or put the private file inside the public website directory.

Replace `admin_token` with a long, random secret used only for managing enquiries. You can generate one with:

```sh
php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
```

Keep the token private. Do not put it in the contact form, website JavaScript, or a public webpage.

## 3. Upload the website

Build the website and upload the **contents** of `dist/` to your web root. That folder includes the website and `api/counselling.php`. Use PHP 8.1 or newer with PDO MySQL enabled, and make sure the host runs PHP files under `/api/` rather than serving them as downloads. The private configuration file must remain at the path described above.

If your provider's web root is not named `public_html`, the private configuration file still needs to be in a `private` directory two levels above `api/counselling.php`'s deployed location. Ask your hosting provider how to store a PHP configuration file outside the public web root if needed.

## 4. CRUD API

All requests use the same URL: `https://your-site.example/api/counselling.php`. Only creating an enquiry is public. Every read, update, and delete request needs this header:

```text
Authorization: Bearer YOUR_PRIVATE_ADMIN_TOKEN
```

Do not include the real token in a browser-based admin page or public code. Make administrative requests from a trusted server or command-line environment.

| Operation | Request | Access |
| --- | --- | --- |
| Create | `POST` JSON with `name`, `phone`, `email`; optional `whatsapp`, `qualification`, `course` | Public form |
| List | `GET ?limit=100` (maximum 500) | Admin token |
| Read one | `GET ?id=123` | Admin token |
| Update | `PATCH ?id=123` with one or more allowed JSON fields | Admin token |
| Replace fields | `PUT ?id=123` with `name`, `phone`, `email` | Admin token |
| Delete | `DELETE ?id=123` | Admin token |

Courses accepted by the API are Networking & CCNA, Microsoft Azure Cloud, Cyber Security, Generative AI, and AI Agents. All responses are JSON. The API validates fields and uses prepared database queries.

## 5. Check the installation

After upload and configuration, submit one test enquiry through the website. The form will show its confirmation only when PHP reports a successful database save. If the request fails, check the hosting provider's PHP error log and confirm PHP 8.1, PDO MySQL, the MySQL credentials, and the private configuration file path.