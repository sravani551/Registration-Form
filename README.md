# Registration App

[![CI](https://github.com/sravani551/Registration-Form/actions/workflows/ci.yml/badge.svg)](https://github.com/sravani551/Registration-Form/actions/workflows/ci.yml)
![Angular](https://img.shields.io/badge/Angular-19-DD0031)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F)
![Java](https://img.shields.io/badge/Java-17-orange)

A full-stack registration app: an **Angular 19** reactive form with client- and server-side
validation and an optional file upload, backed by a **Spring Boot** REST API with Spring Security,
JPA and MySQL (H2 for local development and tests).

```
frontend/   Angular 19 (standalone components, signals, reactive forms, Bootstrap 5)
backend/    Spring Boot 3.5 API (port 9080)
```

## Features

- Registration form: name, email, password, gender, date of birth, optional PDF/PNG/JPEG attachment
- Inline validation in the browser, mirrored by Bean Validation on the server; server field errors
  (e.g. "email is already registered") are shown next to the matching input
- Registrations list with delete

## API

| Method | Path | Body | Success |
|---|---|---|---|
| `POST` | `/api/registrations` | `multipart/form-data`: `firstName, lastName, email, password, gender, dob, file?` | 201 |
| `GET` | `/api/registrations` | | 200 |
| `GET` | `/api/registrations/{id}` | | 200 |
| `PUT` | `/api/registrations/{id}` | same as POST; `password` optional (unchanged if omitted) | 200 |
| `DELETE` | `/api/registrations/{id}` | | 204 |

Errors are [RFC 9457 problem details](https://www.rfc-editor.org/rfc/rfc9457). Validation and
conflict errors include an `errors` map keyed by field name, which the form uses directly.
Statuses: 400 validation, 404 not found, 409 duplicate email, 413 file too large.

## Design notes

- **Passwords** are hashed with BCrypt and never returned; responses are DTOs, not entities.
- **Uploads** are stored under a random key, never under the user's file name (no path
  traversal); the content type is allow-listed and size-limited (5 MB).
- **Unique email** is enforced case-insensitively in the service and by a database constraint.
- **No secrets in the repository**: database settings come from `DB_URL`, `DB_USER` and
  `DB_PASSWORD`, with in-memory H2 as the zero-setup default.
- **Security**: stateless API, CORS limited to configured origins (`CORS_ALLOWED_ORIGINS`), every
  route outside `/api/**` and the health check denied.

## Run locally

```bash
# backend: http://localhost:9080 (in-memory H2)
cd backend && ./mvnw spring-boot:run

# frontend: http://localhost:4200 (proxies /api to the backend)
cd frontend && npm ci && npm start
```

To use MySQL: `docker compose up -d`, then start the backend with
`DB_URL=jdbc:mysql://localhost:3306/registrations DB_USER=app DB_PASSWORD=app`.

## Tests

```bash
cd backend && ./mvnw verify                                       # API tests (MockMvc + H2)
cd frontend && npx ng test --watch=false --browsers=ChromeHeadless  # component and service tests
```

CI runs both suites and the production frontend build on every push and pull request.

## Roadmap

- Login and JWT-protected endpoints for viewing and managing registrations
- Edit form in the UI (the API already supports updates)
- Object storage (S3/Azure Blob) for uploads
