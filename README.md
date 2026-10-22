# PlanBridge

PlanBridge is a wedding planning application for couples and their families. This initial milestone
contains a runnable Next.js foundation and a placeholder homepage. Accounts, planning features and
cloud integrations will arrive in later milestones.

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
It does not deploy or use cloud credentials. No test framework is installed yet; add focused tests
with the first meaningful behaviour.

## Structure

```text
Docs/                     Existing product and technical specifications
src/app/layout.tsx        Root HTML layout and page metadata
src/app/page.tsx          Placeholder homepage
src/app/globals.css       Tailwind integration and shared visual tokens
.github/workflows/        Automated verification
AGENTS.md                 Project conventions for coding agents
```

Root configuration files set up Next.js, TypeScript, ESLint, Prettier and PostCSS.
Add shared UI components, feature modules, provider clients and jobs when they contain real code.
Do not create empty feature folders in anticipation of later work.

## Visual foundations

Warm ivory backgrounds, white surfaces, deep plum text/actions, muted rose and restrained gold accents
are defined as semantic CSS variables in `globals.css`. Headings use system serif fonts; body text uses
system sans-serif fonts. No external font download is needed. Keep normal text readable and preserve
visible keyboard focus when adding controls.

## Configuration and architecture

No environment variables or service accounts are required for installation, development, checks or
builds. There is no `.env.example` because the scaffold consumes no configuration. Add one with empty,
documented placeholders when a feature introduces configuration. Local `.env*` files are ignored;
`.env.example` is explicitly allowed. Never expose provider credentials through `NEXT_PUBLIC_*`.

The agreed direction is one modular Next.js application with TypeScript and App Router. Future REST
APIs use `/api/v1` Route Handlers on Node.js. Services own business rules and tenant authorization;
repositories own scoped persistence. Server-rendered pages may call authorized services directly.
Future integrations are MongoDB Atlas, private Cloudflare R2 and Resend, with Vercel hosting.
Use **Mongoose** for MongoDB models and database access, with Zod for runtime input validation.
Install both with the first database feature, alongside focused tests for its behaviour. Mongoose
models and database connections belong in server-side code; tenant authorization remains a service
responsibility. No standalone MongoDB driver dependency is needed in the scaffold.
None is connected by this scaffold. Authentication is deferred, with no simulated account access.

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
