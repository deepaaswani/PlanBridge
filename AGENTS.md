# PlanBridge conventions

- Preserve `Docs/`, existing files and Git configuration. Do not commit or push unless requested.
- Use npm 10 with Node.js 22; keep one `package-lock.json`. Pin direct dependencies and verify peers.
- Keep one TypeScript Next.js App Router application. Use `src/` and the `@/*` alias.
- Default to Server Components; add client boundaries only for browser interaction.
- Create folders and abstractions when needed. Initial scope is a placeholder, not feature screens.
- Use Tailwind and semantic tokens in `src/app/globals.css`: ivory, plum, muted rose and gold;
  system serif headings, system sans-serif body text. Preserve contrast and visible focus.
- Use strict TypeScript, ESLint flat config and Prettier. Do not reformat the existing `Docs/` files.
- Run `npm run check` and `npm run build` before handing off changes. Report failures honestly.
- Add meaningful tests with behaviour; do not add placeholder tests for static scaffold markup.
- No cloud credentials are required for the scaffold. Add service SDKs and validated configuration
  with their features. Never log secrets or expose them through `NEXT_PUBLIC_*`.
- Future REST endpoints belong under `src/app/api/v1`, using the Node.js runtime. Routes validate
  and authorize; module services own rules/transactions; repositories scope queries by wedding.
- Wedding is the tenant. Enforce current membership on the server. Roles are ADMIN and MANAGER;
  ownership is a separate responsibility. Never add simulated authentication.
- Keep the agreed Atlas/R2/Resend/Vercel direction. Discuss additional infrastructure first.
- Use Mongoose for MongoDB models and persistence. Add Mongoose and Zod with the first database
  feature; do not connect Atlas or create speculative models in the scaffold.
- Read `Docs/` before feature work. PRD owns product behaviour; System Design explicitly overrides
  earlier technology suggestions; Database/API designs refine contracts. Do not silently override
  unresolved product requirements. Approval permits task completion but does not complete tasks.

The following block is maintained by Next.js. Keep it alongside the project conventions above.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
