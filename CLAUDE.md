@AGENTS.md

# BYHADARA Group — project context

Corporate website of BYHADARA Group (Istanbul), the parent group of HADARA Real Estate and
HADARA Hospitality. The owner communicates in Arabic; reply to them in Arabic and keep this
file's prose in English so it stays easy to scan. Last updated 2026-09-25.

## Standing instructions from the owner

- **Always merge and deploy yourself** (asked explicitly: «ادمج وانشر انت دايما»). Flow: commit on
  the session branch → push → open a PR to `main` → wait for the `validate` check to pass → merge
  with a merge commit → Vercel deploys `main` automatically. Then fast-forward the branch to
  `origin/main` and push it so the branch is not left behind. Tell the owner in Arabic what
  changed and anything they must do.
- The site should feel like a **calm, restrained holding-group site**: little text, clear
  gestures, details left to the subsidiary websites. The two companies must stay prominent on the
  homepage.
- Never invent facts. Company facts, projects, products and partners come from the group
  companies' own websites/repos (see "Sister sites"). Ask the owner for anything else.

## Where things live

- **Repo**: `kerimalastal-source/BYHADARA` (public). Next.js 16.3.5 App Router, React 19.3,
  TypeScript, custom CSS (`styles/globals.css`), zod, pnpm 11.19. Read
  `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md).
- **Live**: https://byhadara.com (domain verified in the Vercel team, DNS on Wix nameservers
  pointing to Vercel) and https://byhadara.vercel.app. Vercel project `byhadara`
  (`prj_bVxa8wH2w0Lo9KKyaRzgMvzFXIza`) in team `hadara1` (`team_QsY1Po5NrdwjnNTD0wqYTrNc`). The
  session's Vercel connector has so far only seen the `hadarahospitality` project, so env vars and
  deployments of `byhadara` must be handled by the owner in the Vercel dashboard. Every PR gets a
  preview at `byhadara-git-<branch>-hadara1.vercel.app`.
- **Locales**: `en`, `ar` (RTL), `tr`; 16 routes × 3 = 48 pages, all static. `/` 308-redirects to
  `/en`.
- **Key files**
  - `content/site.ts`: all EN/AR/TR copy (one dictionary per locale; unit tests require identical
    keys), `site` (origin, company URLs, contact email/phone).
  - `content/seo.ts`: search title/description per route and locale.
  - `content/companies.ts`: company website URLs and the showcased projects/products.
  - `content/partners.ts`: success partner logos (homepage).
  - `content/countries.ts`: calling codes for all 245 countries/territories (contact form).
  - `content/forms.ts`: contact form labels and messages.
  - `components/Site.tsx` (home, company panels, partners, breadcrumb, hero…),
    `components/Pages.tsx` (all other pages), `components/ContactForm.tsx`.
  - `lib/seo.ts`: metadata, breadcrumbs (shared by the visible trail and JSON-LD), structured
    data. `lib/inquiry-*` + `app/api/inquiries/route.ts`: contact form delivery.
  - `docs/ASSETS.md`: provenance of every image; update it whenever an image is added.

## Group, brand and sister sites

- Arabic names: group «مجموعة باي حضارة», companies «حضارة العقارية» and «حضارة للضيافة».
- Brand: parent is navy `#14283d` with the text wordmark "BYHADARA. GROUP" (no official logo yet);
  both companies share the gold H monogram (`public/images/hadara-mark.png`, gold `#c5a35d`,
  gold text on light backgrounds `#80632a` for contrast).
- **HADARA Real Estate**: https://www.hadararealestate.com (repo
  `kerimalastal-source/hadararealestate`, Next.js; pages `/{en|ar|tr}/projects/{slug}`). Founded
  2014, luxury villas and residential projects in Istanbul (Beylikdüzü). Projects shown here:
  Marmara Haven Villa, Lotus Yaşam, Lotus Koru. Its contact form uses Resend.
- **İkinci BYHADARA** (`kerimalastal-source/-kinci_BYHADARA`, Vite): the real estate site being
  built. Source of the six success partner logos (`public/partners/`), copied byte-identical.
- **HADARA Hospitality**: https://www.hadarahospitality.com (repo
  `kerimalastal-source/hadarahospitality`, Astro). Locales en (unprefixed), ar, fr, ru — no
  Turkish, so Turkish visitors are linked to English. Supplies hotel textiles to 3★–5★ hotels in
  the GCC and Europe. Its product photos are Unsplash stand-ins (IDs in its CLAUDE.md).
- Sister repos are public: clone read-only into `/home/user/kerimalastal-source/` when needed.

## Homepage and company pages

- Home: hero (Bosphorus) → group section ("One group. Two specialized companies." with the
  BYHADARA GROUP node and gold branch lines to two large company panels) → Success Partners →
  compact markets → vision → final CTA. The insights section appears only once an article is
  published.
- `/businesses/{real-estate|hospitality}`: badge "A BYHADARA Group company", intro, image, about
  with three facts, areas of work, selected projects/products (each linking to its page on the
  company site in the visitor's language), a navy band leading to the company website, and a link
  to the sibling company.

## Contact form (all forms on the site)

- One `ContactForm` on `/contact`, `/inquiries/investment` and `/inquiries/partnership` (topic
  recorded as `general`/`investment`/`partnership`). Fields, as specified by the owner: full name,
  company name (optional), country code beside the phone number, company website (optional), the
  request. No email field (owner's spec; offered to add it on request).
- Requests are emailed through Resend to `CONTACT_TO_EMAIL` (default `info@byhadara.com`) with
  tel: and WhatsApp links. Without `RESEND_API_KEY` the forms are disabled and show the email and
  phone, and the API returns 503. Pages are static, so env changes need a redeploy.
- **Pending (owner)**: add `RESEND_API_KEY` (same key as the real estate site) and
  `CONTACT_FROM_EMAIL` on a Resend-verified domain (e.g. `BYHADARA Website <website@byhadara.com>`)
  to the `byhadara` Vercel project, redeploy, send a test request. Resend's default
  `onboarding@resend.dev` only delivers to the Resend account owner.
- In RTL, never wrap option text in Unicode isolate characters: Chromium then renders "+966" as
  "966+" in a closed `<select>`. Plain `"+966 name"` renders correctly.

## SEO

- Titles ≤65 characters and descriptions 110–165, unique across all 48 pages (enforced by
  `tests/content.test.ts`); Arabic titles use «مجموعة باي حضارة».
- JSON-LD on every page: Organization (with both companies as `subOrganization`), WebSite, typed
  WebPage, BreadcrumbList, Article. Localized share images `public/og/byhadara-{en,ar,tr}.jpg` were
  rendered with Playwright from an HTML file opened via `file://` (so local fonts and the photo
  load); re-render them the same way if the brand changes.
- The empty insights index is `noindex` and outside the sitemap (45 URLs) until an article exists.
- **Pending (owner)**: submit `https://byhadara.com/sitemap.xml` in Google Search Console
  (`GOOGLE_SITE_VERIFICATION` supported); confirm `byhadara.com` does not redirect to `www`
  (canonicals use the apex; otherwise set `SITE_URL` or make the apex primary in Vercel).

## Images

- Next's image optimizer cache cannot be invalidated: when an image's content changes, give it a
  new file name (why `istanbul.jpg` became `istanbul-bosphorus.jpg`).
- The hero photo is cropped to remove third-party developer signage (EMLAK KONUT). Check stock
  photos for other companies' branding before using them.
- Project photos load from `static.wixstatic.com` (allowed in `next.config.ts`), as on the real
  estate site. That host is blocked in this sandbox, so they 403 locally but work on Vercel. If
  the owner allows the host, self-host them (Wix may be cancelled later).

## Validation and sandbox notes

- Checks: `pnpm typecheck`, `pnpm test` (16 tests), `pnpm build`, then `pnpm start` +
  `node scripts/check-routes.mjs` (48 pages, links, SEO assertions, 503 while the form is
  unconfigured) and the Playwright suite (14 tests incl. axe). Prettier:
  `pnpm exec prettier --check components content lib app styles tests scripts docs *.md`.
- The installed `@playwright/test` expects a newer browser than the sandbox has: run with a
  temporary config that sets `launchOptions.executablePath: '/opt/pw-browsers/chromium'` and
  delete it afterwards. AxeBuilder needs pages from `browser.newContext()`. Scroll before
  screenshotting lazily loaded images.
- `pnpm build` rewrites quotes in `next-env.d.ts`; revert it with `git checkout -- next-env.d.ts`.
- Stop the server by process name, because `pkill -f next-server` kills the invoking shell too:
  `ps -eo pid,comm | awk '$2 ~ /next-server/ {print $1}' | xargs -r kill`.
- The sandbox cannot reach byhadara.com, byhadara.vercel.app, static.wixstatic.com or the Resend
  API; verify live behaviour through the owner or the Vercel preview.

## Open items to offer the owner

- Real product photography for HADARA Hospitality; an official BYHADARA logo.
- The responsible legal entity for the privacy notice.
- A WhatsApp button on the contact page; an email field in the form.
- Self-hosting the project photos (needs `static.wixstatic.com` allowed in the environment).

## History

- PR #1: hero crop, hidden empty insights, larger text and AA contrast, correct breadcrumbs.
- PR #2: contact email `info@byhadara.com` and phone `+90 531 930 92 14`.
- PR #3: SEO across all pages (titles, descriptions, share images, JSON-LD, manifest, icons).
- PR #4: group presentation on the homepage and dedicated company pages.
- PR #5: Success Partners section (logos from İkinci BYHADARA).
- PR #6: unified contact form emailed via Resend, country codes for all countries.
