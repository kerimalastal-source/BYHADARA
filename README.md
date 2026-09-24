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
- `content/forms.ts`: localized contact-form labels and validation feedback.
- `content/countries.ts`: calling codes for all 245 countries and territories, with localized names.
- `components/ContactForm.tsx`: the one contact form used on the contact page and both inquiry pages.
- `lib/inquiry-*`: shared Zod validation, configuration and the email delivery adapter (Resend).
- `app/api/inquiries`: bounded JSON processing, same-origin check, honeypot and timing checks, optional shared rate limiting, and email delivery.
- `styles/globals.css`: custom responsive CSS and locally hosted font imports.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `lib/seo.ts`: canonical URLs, language alternates, metadata, share images and structured data.
- `content/seo.ts`: EN/AR/TR search titles and descriptions for every route.
- `content/partners.ts`: success partner logos shown on the homepage, mirrored from the HADARA Real Estate website.
- `content/companies.ts`: links to the group companies' own websites and the selected projects/products shown on their pages (sourced from hadararealestate.com and hadarahospitality.com; keep in sync with those sites).

## Editorial publishing

Add an `Article` in `content/articles.ts` with a stable slug, category, ISO publication date, complete EN/AR/TR title, description and paragraph body. Use licensed local images under `public/images` with translated alt text. Keep `status: 'draft'` and `approved: false` until approved. Set both to published/true and rebuild only after approval. Article pages, search, category filtering, latest three homepage items (the homepage section stays hidden until the first article is published), related articles, metadata and sitemap update automatically. Text is rendered as React text, never raw HTML. There is no administrative login or external CMS in this version.

## Contact form

The contact page and the investment and partnership pages share one form: full name, company name (optional), phone number with a country-code list covering all 245 countries and territories, company website (optional) and the request. Each request is emailed to `info@byhadara.com` (override with `CONTACT_TO_EMAIL`), with the page it came from, call and WhatsApp links and the site language.

Delivery uses [Resend](https://resend.com), the same service as the HADARA Real Estate website. Until `RESEND_API_KEY` is set, the forms are disabled, show the email address and phone number instead, and the API returns 503; nothing is stored or sent, and no success is ever shown without the provider accepting the email.

To turn it on in the Vercel project `byhadara`:

1. Add `RESEND_API_KEY` (the key used by the real estate site works).
2. Set `CONTACT_FROM_EMAIL` to an address on a domain verified in Resend, for example `BYHADARA Website <website@byhadara.com>` after verifying `byhadara.com`. Resend's default `onboarding@resend.dev` sender only delivers to the Resend account owner's own address.
3. Redeploy and send a test request from `/en/contact`.

Protection: same-origin requests only, a 16 KB body limit, validation on both client and server, a hidden honeypot field, a minimum completion time, and an optional shared rate limit (5 requests per IP per 15 minutes) when Upstash Redis credentials and `RATE_LIMIT_SALT` are set. See `docs/INQUIRY-INTEGRATION.md`.

## Search engine optimization

- Every route has a hand-written search title (≤65 characters) and description (110–165 characters) per language in `content/seo.ts`; Arabic entries use the Arabic brand name «مجموعة باي حضارة». Unit tests enforce length and uniqueness.
- Each page publishes a self-referencing canonical, `hreflang` alternates for EN/AR/TR plus `x-default` (English), Open Graph and Twitter tags with a localized 1200×630 share image (`public/og/`), and `max-image-preview:large` for Google.
- JSON-LD on every page: `Organization` (contact email/phone, Istanbul address, languages), `WebSite`, a typed `WebPage` (`AboutPage`, `ContactPage`, `CollectionPage`), a `BreadcrumbList` built from the same trail as the visible breadcrumbs, and `Article` for published insights.
- `/` redirects permanently (308) to `/en`. The insights index is `noindex, follow` and left out of the sitemap until the first article is published; unknown routes return 404 with `noindex`.
- Optional environment variables: `SITE_URL` if the primary domain ever changes (for example to `www`), and `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `YANDEX_VERIFICATION` for the meta-tag ownership method. After deployment, submit `https://byhadara.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Canonicals must point at the address that serves pages directly. If `byhadara.com` redirects to `www.byhadara.com` in Vercel, either make the apex the primary domain there or set `SITE_URL=https://www.byhadara.com`.

## Deployment on Vercel

Import `kerimalastal-source/BYHADARA`, choose Next.js, repository root, `pnpm build`; use the checked-in lockfile. The code does not need secrets for corporate pages. Set `RESEND_API_KEY` to turn on the contact form (see below). Vercel preview environments are noindex. Canonicals refer to the supplied intended domain `https://byhadara.com`.

Verify domain ownership, existing DNS and production assignment in Vercel before changing them. The repository does not automatically modify DNS. Inspect the production deployment, all locales and API availability after deployment. Do not describe the custom domain as live until it resolves to the verified production build.

## Content that needs owner confirmation

- Company websites: `https://www.hadararealestate.com` (override with `REAL_ESTATE_URL`) and `https://www.hadarahospitality.com`, as used by those sites' own canonical URLs.
- Group contact email (info@byhadara.com) and phone (+90 531 930 92 14): confirmed by the owner; defaults in `content/site.ts`, overridable with `CONTACT_EMAIL`/`CONTACT_PHONE`.
- Responsible legal entity: unset, never invented.
- Official logo: temporary replaceable typographic BYHADARA GROUP wordmark.
- Approved articles: no articles published yet.
- Contact form delivery: needs `RESEND_API_KEY` (and a verified sender domain) in the Vercel project; responsible legal entity for the privacy notice: pending.

No fund status, holding-company registration, regulated service, returns, directors, office network or performance statistics are claimed. Company facts, projects and products shown on the company pages come from the group companies' own websites. Market descriptions distinguish existing Türkiye activities from regional objectives.

See `docs/ASSETS.md` for photography and font licenses and `docs/QA.md` for validation evidence and remaining checks.

## Additional QA commands

With a production preview on port 3000: `node scripts/check-routes.mjs` crawls all routes and internal links. For a machine with browser launch support, run `pnpm exec playwright install chromium`, then `pnpm test:e2e`. The checked-in browser suite covers desktop/mobile routes, language switching, menu focus, unavailable forms and axe checks. See the QA record for what was actually executed in the authoring environment.
