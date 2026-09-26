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
- **Live**: https://www.byhadara.com is the Vercel primary domain; `byhadara.com` 308-redirects
  to it (DNS on Wix nameservers pointing to Vercel). Also https://byhadara.vercel.app. Vercel project `byhadara`
  (`prj_bVxa8wH2w0Lo9KKyaRzgMvzFXIza`) in team `hadara1` (`team_QsY1Po5NrdwjnNTD0wqYTrNc`). The
  session's Vercel connector gets 403 on this team (it only sees `hadarahospitality`), so env vars
  and deployments of `byhadara` are handled by the owner in the Vercel dashboard. Every PR gets a
  preview at `byhadara-git-<branch>-hadara1.vercel.app`.
- **Locales**: `en`, `ar` (RTL), `tr`; 17 routes × 3 = 51 pages, all static. `/` 308-redirects to
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

- Legal entity (provided by the owner): **Hadara Investment İnşaat Sanayi ve Ticaret Anonim
  Şirketi**, Istanbul (`site.legalName`): data controller in the privacy notice, operator in the
  terms, `legalName` in the Organization JSON-LD.
- Arabic names: group «مجموعة باي حضارة», companies «حضارة العقارية» and «حضارة للضيافة».
- Brand: parent is navy `#14283d` with the text wordmark "BYHADARA. GROUP" (no official logo yet);
  owner's rule (2026-09-26): the wordmark (`components/Brand.tsx`) is never translated, always in
  Inter, reads left to right, and sits at the far left of the header and footer in every locale,
  Arabic included; only the rest of the header/footer mirrors in RTL (a browser test checks it);
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
  email (required, added 2026-09-25 for HubSpot and campaigns), country code beside the phone
  number, company name and website (optional), the request, and an unticked, optional box to agree
  to email updates (consent is needed for marketing emails under KVKK/İYS and GDPR).
- An accepted request sends the visitor to `/{locale}/contact/thank-you` (owner asked for a
  professional thank-you page instead of the inline message): check mark, thanks, the two company
  panels, then other request forms, direct contact and company websites. It is `noindex`.
- Requests are emailed through Resend to `CONTACT_TO_EMAIL` (default `info@byhadara.com`) with
  tel: and WhatsApp links; reply-to is the visitor's email. Without `RESEND_API_KEY` the forms are disabled and show the email and
  phone, and the API returns 503. Pages are static, so env changes need a redeploy.
- 2026-09-25: the owner added `RESEND_API_KEY` (Secret) and
  `CONTACT_FROM_EMAIL=BYHADARA Website <website@byhadara.com>` to Production in the `byhadara`
  Vercel project; a test request reached info@byhadara.com, so delivery works. If sending ever
  fails, Resend → Emails/Logs shows why.
- **HubSpot** (owner's CRM, chosen 2026-09-25): with `HUBSPOT_ACCESS_TOKEN` set, `lib/hubspot.ts`
  saves each accepted request after the response (`after`): contact matched by email (new ones as
  `lead`), a note with the request, and custom properties in the group "BYHADARA website"
  (`byhadara_request_types`, `byhadara_language`, `byhadara_email_consent`,
  `byhadara_email_consent_date`), created automatically. Consent is only ever set to Yes from the
  site. Failures are logged without personal data and never affect the visitor. The HubSpot API is
  blocked in this sandbox (details and scopes in `docs/INQUIRY-INTEGRATION.md`). **Live since
  2026-09-25**: legacy private app "BYHADARA Website" in HubSpot portal 149408503 (EU1), token in
  the `byhadara` Vercel project; a test request created the contact with all properties and the
  note. The session's HubSpot connector (read tools such as `search_crm_objects`,
  `search_properties`) can verify records directly. Vercel logs show `HubSpot sync saved contact
<id>.` / `HubSpot sync failed. …` / `HubSpot custom properties unavailable. …`.
- HubSpot companies (2026-09-25): 372 records imported by the owner, 370 of them HADARA
  Hospitality research (343 hotel suppliers/distributors and hotels in the GCC, Georgia and the
  Balkans; 27 Turkish textile manufacturers). Their research notes were moved from the description
  into company properties (Arabic label + English): `hadara_group_company`,
  `hadara_relationship_stage`, `hadara_priority`, `hadara_sample_status`, `hadara_next_follow_up`,
  `hadara_last_contact`, `hadara_last_verified`, `hadara_business_type`, `hadara_hotel_brand`,
  `hadara_cooperation_model`, `hadara_general_email`, `hadara_product_groups`, `hadara_next_step`,
  `hadara_last_quotation`, `hadara_source_id`, `hadara_source_url`, `hadara_source_notes`. The
  description itself was kept. Portal is on the free plan (no email sending domain, no campaigns);
  the owner emails from Gmail (info@byhadara.com). Lifecycle stage: the 27 suppliers are `other`,
  the other 345 companies `lead`. The owner has no HubSpot tasks for now. Still on offer: contacts
  from the general emails, a deal pipeline.
- The owner's Vercel team also has `kinci-byhadara` (the İkinci BYHADARA real estate site); make
  sure instructions and env vars target the `byhadara` project.
- The project still has old env vars from an earlier version: `INQUIRIES_ENABLED`,
  `PRIVACY_REVIEWED`, `INQUIRY_WEBHOOK_URL` (unused, safe to delete) and `CONTACT_EMAIL`,
  `CONTACT_PHONE`, `REAL_ESTATE_URL` (these override the defaults in `content/site.ts`; values
  unknown to us, so check the live contact page if the email, phone or link looks wrong).
- In RTL, never wrap option text in Unicode isolate characters: Chromium then renders "+966" as
  "966+" in a closed `<select>`. Plain `"+966 name"` renders correctly.

## SEO

- Titles ≤65 characters and descriptions 110–165, unique across all 51 pages (enforced by
  `tests/content.test.ts`); Arabic titles use «مجموعة باي حضارة».
- JSON-LD on every page: Organization (with both companies as `subOrganization`), WebSite, typed
  WebPage, BreadcrumbList, Article. Localized share images `public/og/byhadara-{en,ar,tr}.jpg` were
  rendered with Playwright from an HTML file opened via `file://` (so local fonts and the photo
  load); re-render them the same way if the brand changes.
- The empty insights index is `noindex` and outside the sitemap (45 URLs) until an article exists;
  the thank-you page is always `noindex` and outside it.
- Canonical origin is `https://www.byhadara.com` (default in `content/site.ts`, `SITE_URL`
  overrides), matching Vercel where the apex redirects to `www`. Keep the two in sync.
- Google Search Console: Domain property verified by a DNS TXT record
  (`google-site-verification=…`) that the owner added in Wix DNS on 2026-09-25, and
  `https://www.byhadara.com/sitemap.xml` submitted (owner-reported). No meta tag is needed;
  `GOOGLE_SITE_VERIFICATION` stays unset. Never remove that TXT record when editing DNS.

## Images

- Next's image optimizer cache cannot be invalidated: when an image's content changes, give it a
  new file name (why `istanbul.jpg` became `istanbul-bosphorus.jpg`).
- The hero photo is cropped to remove third-party developer signage (EMLAK KONUT). Check stock
  photos for other companies' branding before using them.
- Project photos load from `static.wixstatic.com` (allowed in `next.config.ts`), as on the real
  estate site. That host is blocked in this sandbox, so they 403 locally but work on Vercel. If
  the owner allows the host, self-host them (Wix may be cancelled later).

## Validation and sandbox notes

- Checks: `pnpm typecheck`, `pnpm test` (21 tests), `pnpm build`, then `pnpm start` +
  `node scripts/check-routes.mjs` (51 pages, links, SEO assertions, 503 while the form is
  unconfigured) and the Playwright suite (16 tests incl. axe). Prettier:
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
- A WhatsApp button on the contact page.
- Self-hosting the project photos (needs `static.wixstatic.com` allowed in the environment).

## History

- PR #1: hero crop, hidden empty insights, larger text and AA contrast, correct breadcrumbs.
- PR #2: contact email `info@byhadara.com` and phone `+90 531 930 92 14`.
- PR #3: SEO across all pages (titles, descriptions, share images, JSON-LD, manifest, icons).
- PR #4: group presentation on the homepage and dedicated company pages.
- PR #5: Success Partners section (logos from İkinci BYHADARA).
- PR #6: unified contact form emailed via Resend, country codes for all countries.
- PR #7: this context file. PR #8: canonical origin switched to `https://www.byhadara.com`.
- PR #9: Search Console notes. PR #10: thank-you page after a sent request.
- PR #11: email field, email-updates consent, HubSpot sync, legal entity in privacy/terms.
- PRs #12–#15: context file updates (HubSpot live, company properties, supplier lifecycle).
- PR #16: wordmark fixed in English at the far left in all locales (header and footer).
