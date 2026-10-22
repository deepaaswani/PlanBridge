# PlanBridge

PlanBridge is a wedding planning application for couples and their families. This initial milestone
contains the Stitch-based homepage and real email/password accounts: sign-up,
login, logout and password recovery. Wedding setup and planning workflows are the next milestone.

## Installation

Use Node.js 22.x and npm 10.x. The scaffold was prepared with Node.js 22.14.0 and npm 10.9.2.
Run commands from this repository root, the directory containing `package.json` and `.git`.
If your VS Code workspace is the enclosing directory, run `cd PlanBridge` first.
For everyday development, open this Git root directly in VS Code with **File > Open Folder** and
select the folder containing `package.json`. From the enclosing workspace terminal, `code -r .\PlanBridge`
opens that folder in the current window.

`.nvmrc` records Node.js 22. With an nvm implementation that supports `.nvmrc`, run `nvm use`;
with nvm-windows, install/select a specific Node.js 22 version using `nvm install <version>` and
`nvm use <version>`. A version manager is optional if Node.js 22 is already installed.

```powershell
npm ci
npm run dev
```

Open <http://localhost:3000>. Stop the server with Ctrl+C.
Use npm consistently and keep `package-lock.json` with dependency changes.

## Verification

```powershell
npm run check
npm test
npm run build
npm run start
```

`check` runs type-checking, linting and formatting verification. `build` creates the production
application; `start` serves that build at <http://localhost:3000>. Stop the development server before
starting production on the same port.

Individual commands:

| Command                | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Local development with automatic updates                   |
| `npm run typecheck`    | Generate Next.js route types, then check strict TypeScript |
| `npm run lint`         | Check Next.js, React and TypeScript rules; warnings fail   |
| `npm run format:check` | Check formatting without changing files                    |
| `npm run format`       | Apply formatting, excluding the existing `Docs/` documents |
| `npm run build`        | Create a production build                                  |
| `npm run start`        | Serve the existing production build                        |

GitHub Actions runs installation, the same checks and a production build on pushes and pull requests.
It does not deploy or use cloud credentials. Account integration tests use Node's test runner and
an isolated MongoDB replica set supplied by `mongodb-memory-server`; the first test run downloads
a MongoDB binary. Tests inject an email sender and never send real email or connect to Atlas.

## Structure

```text
Docs/                     Existing product and technical specifications
src/app/layout.tsx        Root HTML layout and page metadata
src/app/page.tsx          Responsive marketing homepage
src/app/(auth)/           Account pages and authenticated account summary
src/app/api/v1/           Account REST endpoints and protected mail-job runner
src/modules/auth/         Account services, repositories, models and security
src/lib/                  Validated server configuration and database connection
tests/auth.test.ts        Transactional authentication integration tests
src/app/globals.css       Tailwind integration and shared visual tokens
.github/workflows/        Automated verification
AGENTS.md                 Project conventions for coding agents
```

Root configuration files set up Next.js, TypeScript, ESLint, Prettier and PostCSS.
Add shared UI components, feature modules, provider clients and jobs when they contain real code.
Do not create empty feature folders in anticipation of later work.

## Visual foundations

Warm ivory backgrounds, white surfaces, deep plum text/actions, muted rose and restrained gold accents
are defined as semantic CSS variables in `globals.css`. The Stitch design uses locally hosted
Playfair Display and Plus Jakarta Sans fonts, with serif/sans-serif fallbacks. Keep normal text readable and preserve
visible keyboard focus when adding controls.

## Configuration and architecture

Installation, checks, tests and production builds do not require cloud credentials. Copy `.env.example`
to `.env.local` to run account flows. Local `.env*` files are ignored; `.env.example` is explicitly
allowed. Never expose provider credentials through `NEXT_PUBLIC_*`. Missing or invalid configuration
returns a controlled 503 from account APIs; it does not create a simulated session or email link.

The agreed direction is one modular Next.js application with TypeScript and App Router. Future REST
APIs use `/api/v1` Route Handlers on Node.js. Services own business rules and tenant authorization;
repositories own scoped persistence. Server-rendered pages may call authorized services directly.
Future integrations are MongoDB Atlas, private Cloudflare R2 and Resend, with Vercel hosting.
Use **Mongoose** for MongoDB models and database access, with Zod for runtime input validation.
Install both with the first database feature, alongside focused tests for its behaviour. Mongoose
models and database connections belong in server-side code; tenant authorization remains a service
responsibility. No standalone MongoDB driver dependency is needed in the scaffold.
Accounts now use Mongoose, Zod, Argon2id, secure opaque sessions and Resend. No wedding collections,
R2 integration, managed identity provider or simulated account access are introduced.

## Running account flows

1. Set `MONGODB_URI` to an Atlas application database connection string. Transactions require a replica
   set; standalone MongoDB is not supported. The database user needs collection/index creation and
   read/write access for this application's database. The first account request initializes only the
   account collections and their unique/query/TTL indexes.
2. Set `RESEND_API_KEY` and `RESEND_FROM` to a sender on your verified Resend domain. Set `APP_URL` to the
   exact HTTPS origin used by the browser and email links, including the local port when applicable.
3. Generate separate random values for `AUTH_SECRET`, `AUTH_EMAIL_ENCRYPTION_KEY` and `CRON_SECRET`.
   The encryption key must be 64 hexadecimal characters; the other secrets need at least 32 characters.
   A generation command is included in `.env.example`. Do not rotate the email encryption key while
   pending email batches still require it.
4. For local account testing run `npm run dev:https`, then open `https://localhost:3000`. Next.js may
   prompt to install/trust its development certificate. Use a locally trusted certificate; session
   and CSRF cookies always retain Secure, HttpOnly, SameSite=Lax, Path=/ and the `__Host-` prefix.
   Plain `npm run dev` remains useful for homepage work, but is not the account-testing setup.
5. Email requests are accepted into a durable database outbox. **A running dispatcher is required for
   delivery.** Locally run `npm run email:dispatch` after password
   recovery; each run processes up to five due messages and reports only counts. It does not print
   addresses, links or credentials.

On Vercel, configure a recurring job to GET `/api/v1/internal/jobs/run` with
`Authorization: Bearer <CRON_SECRET>`. Choose a schedule supported by your Vercel plan and shorter than
the configured reset-link lifetime. A one-minute schedule is suitable where supported; no paid-plan
assumption or deployment configuration is added here. Without the dispatcher, queued emails remain
durable but are not sent. Resend calls time out after ten seconds, and retries reuse the exact frozen
payload and provider key. Provider acceptance is recorded separately from delivery; this milestone
does not claim delivery/read tracking or implement Resend webhooks.

Account routes are `/signup`, `/login`, `/forgot-password`, `/check-email`, `/reset-password`
and `/account`. Email verification is deferred for v1: registration sends no email and redirects to
login; existing accounts can also log in immediately. Email addresses are not marked verified.
The legacy verification page redirects to login, verification APIs return 410, and queued legacy
verification emails are cancelled by the dispatcher. No wedding access or roles are fabricated.
Password reset still emails a one-use link, revokes all sessions and requires a new login.

Email links carry the token in a URL fragment. The form removes it from the visible URL and holds it
only in memory. Opening a link never consumes it: the user must submit the password reset form.
Refreshing that page after the fragment has been removed requires opening the original email link
again. Auth pages use `no-referrer`, and no tokens are placed in localStorage, API JSON or logs.

The proposed defaults in `.env.example` are validated server-side: passwords 15–128 characters,
sessions seven days and reset links 30 minutes. Passwords are never
trimmed or truncated. Registration returns the same login instruction for new and existing emails;
recovery returns a generic response. Failed login does not
distinguish an unknown email from a wrong password. Anonymous CSRF contexts are signed and bound to
the session after login; every browser mutation checks the exact configured Origin and CSRF header.
Shared MongoDB counters enforce account and IP limits. IP headers are trusted only on Vercel;
local/non-Vercel requests conservatively share one bucket.

The implementation uses the [OWASP Argon2id baseline](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
of 19 MiB, two iterations and one lane. Benchmark and tune on the production runtime before launch.
Email retry handling respects [Resend's 24-hour idempotency window](https://resend.com/docs/dashboard/emails/idempotency-keys)
with a conservative 23-hour replay limit; uncertain outcomes after that become UNKNOWN for operator
reconciliation, rather than being sent again with a new key.

`AGENTS.md` keeps project conventions first, followed by the framework guidance maintained by
`next dev`. Preserve both when updating instructions.

## Known tooling limitations

Rechecked on 22 October 2026: `npm audit` reports five high-severity findings in the development-only lint dependency
chain (`eslint-config-next` → Next's ESLint plugin → `fast-glob` → `micromatch` → `braces`). The
production-only audit reports zero findings. npm's suggested fix downgrades the Next.js lint config
to a different major; do not apply `npm audit fix --force` blindly. Recheck for a compatible upstream
fix during dependency updates.

ESLint 9 is deprecated, but the React lint plugin used by the selected Next.js config does not yet
declare ESLint 10 compatibility. Keep the compatible pinned version until the plugin supports an
upgrade. These limitations do not prevent local verification or production builds.

Read the four files in `Docs/` before implementing features. The PRD defines product behaviour;
System Design supplies explicit technology overrides; Database and API designs refine persistence
and contracts. Unresolved product conflicts, including ownership acceptance and event archive versus
cancellation, must be resolved with the affected feature rather than silently dropping requirements.
