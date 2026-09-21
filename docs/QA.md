# Validation record — 2026-09-22

## Passed

- Next.js production build with strict TypeScript; 48 localized corporate routes, plus root redirect, robots, sitemap and inquiry API.
- 13 automated tests covering translated metadata, dictionary structure, unpublished editorial records, shared inquiry schema, consent, URL protocols, file MIME/signature/size restrictions, unavailable backend, origin protection, spam trap, shared rate limiting, challenge validation, durable acknowledgment and attachment quarantine contract.
- HTTP crawl: 48/48 pages returned 200, every internal destination returned 200, each page has one H1, correct lang/dir, canonical and x-default alternate.
- Sitemap contains 48 URLs; robots excludes the API. Unknown pages/locales and unpublished articles return 404. Unconfigured inquiry API returns 503.
- `pnpm audit --prod`: no known vulnerabilities reported.
- Visual inspection of English and Arabic desktop homepages and Turkish business detail; images load from local assets and optimized image routes.
- Arabic mobile navigation opens, focuses its first link, closes with Escape and returns focus to its button.
- Language switching on the hospitality page preserves the equivalent route and changes document language/direction.
- Responsive iframe checks use actual local rendered document widths (320, 390, 768, 1024, 1440 CSS pixel frames, less scrollbars). Identified and corrected off-screen honeypot overflow in Arabic. Final rendered browser sweep of all 48 pages in a 390px frame: 48 passed, zero horizontal overflow.

## Limits and remaining production checks

- Tests simulate external receiving services. Production storage, email, HubSpot writes, malware scanning and real Turnstile credentials are not configured or tested. Forms remain explicitly unavailable.
- Automated accessibility conformance and field Core Web Vitals are not certified. Semantic headings, labels, contrast colors, visible focus, skip link, reduced-motion, keyboard menu and layout behavior were reviewed. No Lighthouse score is claimed.
- Current environment blocks a standalone Chrome test process; browser checks use the in-app browser. The local responsive harness is outside the repository and not deployed. Its proxy removes framing headers only for localhost test frames; production retains DENY/frame-ancestors none.
- Vercel's connected deploy tool returned unavailable. Browser-based deployment requires the owner to sign in. No custom-domain/DNS change is claimed.
- Hospitality official URL was verified against its live site. Real estate URL remains unset pending owner confirmation.
