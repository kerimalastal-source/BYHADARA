# BYHADARA Group

Corporate website for BYHADARA Group, Istanbul. Next.js App Router, React, TypeScript and custom CSS. English, Arabic (full RTL), Turkish. Maintained separately from the two specialist business websites.

## Run

Node.js 22+ (tested on 24), pnpm 11.19.0.

```sh
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

If a sandbox limits file watching, use `WATCHPACK_POLLING=true pnpm dev --webpack`. Production preview uses `pnpm build && pnpm start` and does not require a watcher.

## Architecture

- `app/[locale]/[[...slug]]`: server-rendered localized pages; 16 routes × 3 languages.
- `components/`: reusable corporate layouts and narrowly scoped interactive controls.
- `content/site.ts`: complete EN/AR/TR copy, businesses and markets.
- `content/articles.ts`: typed editorial records. Only approved, published, non-future records appear; all three translations are required. No starter news is published.
- `content/forms.ts`: localized forms and validation feedback.
- `lib/inquiry-*`: shared Zod validation, server configuration and delivery adapter.
- `app/api/inquiries`: bounded multipart processing, origin validation, shared rate limiting, Turnstile and receiver acknowledgment.
- `styles/globals.css`: custom responsive CSS and locally hosted font imports.
- `app/sitemap.ts`, `app/robots.ts`, `lib/seo.ts`: canonical URLs, language alternates, metadata and structured data.

## Editorial publishing

Add an `Article` in `content/articles.ts` with a stable slug, category, ISO publication date, complete EN/AR/TR title, description and paragraph body. Use licensed local images under `public/images` with translated alt text. Keep `status: 'draft'` and `approved: false` until approved. Set both to published/true and rebuild only after approval. Article pages, search, category filtering, latest three homepage items, related articles, metadata and sitemap update automatically. Text is rendered as React text, never raw HTML. There is no administrative login or external CMS in this version.

## Inquiry activation — deliberately disabled by default

The deployed corporate site can run without credentials. Both inquiry forms display an accurate unavailable notice and disable their fields/submission. The API returns 503; no data is stored or sent. No fake success responses or browser-local storage are used.

Before enabling:

1. Confirm the responsible legal company, privacy contact, exact retention period, receiving providers and any international processing arrangements. Update all three privacy notices in `content/site.ts`. Set a verified `CONTACT_EMAIL` and only then `PRIVACY_REVIEWED=true`.
2. Provision a private receiving endpoint (`INQUIRY_WEBHOOK_URL`) with bearer secret. Implement the contract in `docs/INQUIRY-INTEGRATION.md`, including durable storage, idempotency, private attachment quarantine and malware scanning. This repo implements the adapter, not the external service.
3. Configure Upstash Redis REST credentials and a random `RATE_LIMIT_SALT`. Rate limiting is atomic and shared across server instances; failures block submissions. No in-memory fallback in production.
4. Configure a Cloudflare Turnstile site for the actual domain, its public site key and server secret, with explicit `TURNSTILE_HOSTNAMES`.
5. Set `INQUIRY_ALLOWED_ORIGINS` to exact trusted origins. Do not use a wildcard. Configure preview environments separately, if needed.
6. Set `INQUIRIES_ENABLED=true`, rebuild/redeploy, and verify a synthetic inquiry through the real receiver and private attachment lifecycle. Only then accept personal data.

HubSpot assessment: the connected account can support operator-side CRM work, but a chat connector is not a deployed server credential. No contacts, pipelines or forms were created in HubSpot. The authenticated receiving adapter is intentionally CRM-neutral; a receiver can create HubSpot records with its own server-side authorization after approval.

## Deployment on Vercel

Import `kerimalastal-source/BYHADARA`, choose Next.js, repository root, `pnpm build`; use the checked-in lockfile. The code does not need secrets for corporate pages. Keep inquiry activation flags false until configured. Vercel preview environments are noindex. Canonicals refer to the supplied intended domain `https://byhadara.com`.

Verify domain ownership, existing DNS and production assignment in Vercel before changing them. The repository does not automatically modify DNS. Inspect the production deployment, all locales and API availability after deployment. Do not describe the custom domain as live until it resolves to the verified production build.

## Content that needs owner confirmation

- Official HADARA Real Estate URL: unset, never guessed.
- Group contact email/phone and responsible legal entity: unset, never invented.
- Official logo: temporary replaceable typographic BYHADARA GROUP wordmark.
- Approved articles: no articles published yet.
- Inquiry receiver, private storage/scanning, CRM credentials and privacy details: pending configuration.

No fund status, holding-company registration, regulated service, returns, directors, projects, office network or performance statistics are claimed. Market descriptions distinguish existing Türkiye activities from regional objectives.

See `docs/ASSETS.md` for photography and font licenses and `docs/QA.md` for validation evidence and remaining checks.

## Additional QA commands

With a production preview on port 3000: `node scripts/check-routes.mjs` crawls all routes and internal links. For a machine with browser launch support, run `pnpm exec playwright install chromium`, then `pnpm test:e2e`. The checked-in browser suite covers desktop/mobile routes, language switching, menu focus, unavailable forms and axe checks. See the QA record for what was actually executed in the authoring environment.
