# Weekday blog writer

Owner's request (2026-11-22): an automatic blog writer like the HADARA Real Estate site's, five
articles a week, Monday to Friday, alternating between the group's two fields. A scheduled task
fires into the main BYHADARA session every weekday at 10:07 Istanbul time; that session writes
**one article in English, Arabic and Turkish**, publishes it the usual way (PR, `validate`, merge,
Vercel) and tells the owner in Arabic. As on the real estate site, articles go live **without
waiting for approval**; the owner is told after each one and can say stop at any time.

## Which topic

- Monday, Wednesday, Friday: the first `real-estate` topic in `topics.json` whose `slug` is not
  yet in `content/articles/`. Tuesday, Thursday: the first `hospitality` one.
- If that company's list is used up, take the other company's next topic. If both are, write
  nothing and tell the owner in Arabic: «انتهت قائمة مواضيع المدونة — بدي قائمة جديدة».
- Never write two articles on the same day, and never repeat a topic or a project.

## Steps

1. `git fetch origin main` and start from `origin/main` on the session branch (merge it in; never
   rewrite history). Run `pnpm install --frozen-lockfile` if `node_modules` is missing.
2. Clone or pull the source repository read-only into `/home/user/kerimalastal-source/`
   (`-kinci_BYHADARA` for real estate, `hadarahospitality` for hospitality). Never change them.
3. Research only the topic's `sources` (see "Facts" below). Read two existing articles of the
   same company in `content/articles/` to match the tone and shape.
4. Add the article to `content/articles/real-estate.ts` or `content/articles/hospitality.ts`
   (end of the array), with `status: 'published'`, `approved: true`, `publishedAt` = today
   (Istanbul date), `category` (`real-estate`, `investment`, `turkiye`, `hospitality`, `gcc` or
   `trade`) and `company`.
   - `en`, `ar`, `tr`, each with `title`, `seoTitle` (only if the title is too long: tests limit
     the search title to 65 characters with the group suffix), `description` (110–165
     characters), `body`, `image`, `imageAlt`, `imageCredit`, `facts` (three), `gallery` (two
     images) and `cta`.
   - **500–800 English words.** `body` = 7–11 entries; the first is the lead; 2–3 later entries
     are subheadings written as `"## Subheading"`. Every language has the same entries in the
     same order: a real translation, natural in each language (Arabic: formal MSA with the
     group's names «مجموعة باي حضارة», «حضارة العقارية», «حضارة للضيافة»; Turkish: formal).
   - The title starts with what people type into Google: the project's name for a project
     profile, the product or question for a hospitality guide.
   - End with one short paragraph that points to the company website. No links, HTML or emoji
     inside the text.
   - **`related`: always three slugs** (owner's rule, 2026-11-22: readers must be able to click
     through to the project or product page). Real estate: the profiled project first, then two
     available projects that fit (same district or same kind of home; never `soldOut`).
     Hospitality: three products the guide is about, from the hospitality site's
     `src/data/products.ts`. Each slug must exist in `content/related.ts`; add a missing one there
     with its name (projects: the same name in every language; products: English and Arabic from
     `products.ts` / `products.i18n.ts`, Turkish translated) and one image copied unchanged into
     `public/images/related/<slug>.jpg` (the project's cover or the product's `main` image, after
     checking it shows no third-party branding). A test checks that every article has two or three
     known items with existing images.
5. Images: copy them **unchanged** from the source repository into `public/images/insights/`
   with a new descriptive name (`<project>-<view>.jpg`), never reusing a name with different
   content. Look at each one first: no third-party branding or watermarks. Add a row to
   `docs/ASSETS.md` (local file, source path and commit, credit shown).
6. `pnpm exec prettier --write content docs`, `pnpm typecheck`, `pnpm test`, `pnpm build`
   (then `git checkout -- next-env.d.ts`), `pnpm start` + `node scripts/check-routes.mjs`, and a
   phone screenshot (390 px) of the article in Arabic and English. Fix anything that fails; if
   it cannot be fixed, publish nothing and tell the owner why.
7. Commit (`Article: <English title>`), push, PR to `main`, wait for `validate`, merge with a
   merge commit, fast-forward the branch, check the `Vercel` status of the merge commit.
8. Tell the owner in Arabic, in three or four lines: the title, the link
   (`https://www.byhadara.com/ar/insights/<slug>`), and what tomorrow's topic is.
9. Add one line to the "Weekday blog writer" list in CLAUDE.md only when something changes
   (not for every article: the git history lists them).

## Facts (never invent anything)

- **Real estate project profiles**: only `src/data/projects.ts` (the project's entry: district,
  developer, status, timeline, stats, residences, amenities) and `src/i18n/en.json` / `ar.json`
  (`projectsData.<slug>`: tagline, descriptions, highlights, nearby) in İkinci BYHADARA. Use the
  English and Arabic text there as the source; translate to Turkish yourself.
- HADARA Real Estate **developed only Marmara Haven Villa**; for every other project it is the
  **marketing partner** and the developer is named as such ("developed by Lotus Yapı Proje").
  Never call HADARA the developer of a partner project.
- No prices, yields, fees, percentages or distances that are not in the source. No promise of
  buying from a distance: the video tour helps choose, buying happens on a visit to Istanbul.
  Citizenship: say a project "may be eligible under the programme's conditions" only if the
  source says so, and never quote the threshold.
- Sold-out projects (`soldOut: true`) are not profiled.
- Call to action: the project's page on hadararealestate.com
  (`https://www.hadararealestate.com/projects/<slug>`, Arabic `/ar/projects/<slug>`; English for
  Turkish readers, which has no Turkish edition).
- **Hospitality guides**: only the hospitality repository's guide in `src/data/blog.ts` named in
  the topic, its collection copy (`src/data/collections.ts`) and products (`src/data/products.ts`).
  **Rewrite, never copy**: a different structure and wording, same facts. Thread counts, GSM and
  sizes are general market guidance, never HADARA product claims; specifications, samples and
  delivery are "confirmed in the quotation". No supplier, factory or customer names.
- Call to action: the topic's `cta` path on hadarahospitality.com (English without a prefix,
  `/ar/…` in Arabic, English for Turkish readers).
- Events: HADARA teams attend fairs as visitors, never exhibitors.

## Topics

`topics.json` lists the queue in order. Each entry has `slug` (the article's slug on this site),
`company`, `category`, `source` (what to read) and `cta`. Real estate topics are profiles of the
projects HADARA Real Estate markets that have no article here yet (project names are what people
search for: the Lotus Yaşam and Diamond Marin articles bring most of the site's clicks). Hospitality
topics are the hospitality site's guides this site has not covered yet.
