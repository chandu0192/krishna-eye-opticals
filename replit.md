# Krishna Eye Optical

A premium, responsive one-page website for Krishna Eye Optical, an optical retail store in Yelahanka, Bengaluru.

## Run & Operate

- `npm run typecheck --prefix artifacts/krishna-eye-optical` — check the website
- `PORT=4173 BASE_PATH=/ npm run build --prefix artifacts/krishna-eye-optical` — create the production build
- `pnpm --filter @workspace/api-server run dev` — run the shared API server when backend work is needed
- `pnpm run typecheck` — full workspace typecheck
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/krishna-eye-optical/src/App.tsx` — single-page website and interaction logic
- `artifacts/krishna-eye-optical/src/index.css` — visual system, responsive layout, and motion rules
- `artifacts/krishna-eye-optical/public/` — generic editorial imagery and SEO assets
- `attached_assets/` — original client brief

## Architecture decisions

- This is frontend-only because verified contact recipients are not available yet; the enquiry form validates locally and clearly avoids claiming delivery.
- Business data is centralized in `App.tsx`; unverified phone, WhatsApp, email, hours, social URLs, reviews, brands, and pricing are shown as explicit placeholders or omitted.
- Generic editorial imagery is labeled as not representing the store so the site never implies stock images are real business photography.
- Google Maps uses an encoded search URL from the verified business name and address, avoiding fake coordinates or an API key.

## Product

The site introduces the store, presents eyewear categories and retail assistance, supports directions and copy-address actions, offers an authenticity-safe Google listing link, includes an accessible gallery lightbox, and provides validated enquiry capture with mobile quick actions.

## User preferences

- Use npm commands for the Krishna Eye Optical website work; do not use pnpm for its local validation or build commands.

## Gotchas

- Replace `[PRODUCTION_DOMAIN]` in the SEO files once the final published domain is known.
- Add verified phone, WhatsApp number, email, business hours, and social URLs before activating those conversion actions.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
