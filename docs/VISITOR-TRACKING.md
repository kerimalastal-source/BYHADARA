# Anonymous visitor tracking

What the website records, how the Telegram alert works, and how to set both up in the Vercel project
`byhadara` (team `hadara1`), never `kinci-byhadara` or `hadarahospitality`.

## What is recorded

- `components/VisitTracker.tsx` runs on every page of `app/[locale]/layout.tsx`, but only when the
  build found a database on the production deployment. On each page (including client-side
  navigation) it posts `{ sessionId, path, locale, referrer }` to `/api/visit` with `keepalive`.
- `sessionId` is `crypto.randomUUID()` kept in `sessionStorage` under `byhadara_visit_session`: no
  cookie, one per tab, gone when the tab closes.
- `referrer` is sent only for the landing page and the server keeps only its origin
  (`https://www.google.com`, never the path or query).
- `app/api/visit/route.ts` accepts same-origin JSON beacons of at most 2 KB, ignores crawlers and
  automated browsers, and counts only public pages of this website (`publicPageLocale` in
  `lib/visits.ts`): API, `_next`, admin and portal paths, unknown pages and unpublished articles
  return 204 without being saved. Country (ISO code) and city come from `x-vercel-ip-country` and
  `x-vercel-ip-city` (the city is URL-decoded). The IP address and user agent are never stored.
- One statement saves the event and reads its session: how many pages came before, when it
  started, whether this path was already viewed, its first page and its Telegram alert.
- Telegram, always with `after()` once the response is on its way (`notifyTeam` in
  `lib/visits.ts`, owner's choice of 2026-09-28):
  - the first event of a session sends the alert (`🌐 BYHADARA — زائر جديد`, place, page,
    language, source) and stores its message id in `visitor_alerts`;
  - every later page **edits that same message** (no new notification): number of pages and
    visit length, then `🧭 مسار الزيارة`, every page of the visit in order with the time spent on
    it (`40 ث`, `2 د`; the current page has none), then `👣 آخر صفحة`, which is where the visit
    ended once the updates stop (owner's request, 2026-09-28, to analyse visitors' interests).
    Long visits list their latest 30 pages under `… و12 صفحة قبلها`; the query reads back at
    most the latest 60 views;
  - the first opening in a visit of `/contact`, `/inquiries/investment` or
    `/inquiries/partnership` sends one extra message as a reply to the alert:
    `🔥 الزائر فتح صفحة التواصل` (or الاستثمار / الشراكة), with place and page;
  - **likely automated visits send nothing** (owner's request, 2026-09-29, same method as HADARA
    Hospitality's PR #137): Meta and other platforms open a shared link in a normal-looking
    browser from their data centers, so the user agent does not reveal them. `botReason()` treats
    a visit as automated when its landing city is in `DATA_CENTER_TOWNS` (small data-center towns
    such as Clonee, Boardman or Luleå, matched as `city|country` without accents; real cities
    that also host data centers, such as Fort Worth or Sterling, are left out) or when other
    sessions opened the same landing page within 10 seconds of this one's start (`burstFor()`,
    and `burst` in the session statement for later pages). Such a visit gets no alert, no update
    and no 🔥, but its events are saved. A new session waits `alertSettle.ms` (8 s) before
    deciding, so the first visit of a burst is caught too; `maxDuration` is 30 s to cover that
    wait. When the alert does go out, it reads the session back (`sessionTrail()`), so pages
    viewed during the wait are in it. A session that already has its alert keeps its updates if
    a burst comes later;
  - paths start with U+200E so `/tr` does not read `tr/` in the Arabic text. An alert the owner
    deleted cannot be edited: that is logged and never stops the request-page message.
- About 1% of requests also delete events and alert references older than 30 days, also after
  the response; a failed cleanup is only logged.

## Tables

The code creates the tables and indexes by itself when one is missing (`visitorEventsSchema` in
`lib/visits.ts`), so no manual migration is needed. The same statements, to run by hand only in
the database connected to the `byhadara` project (`neon-coquelicot-lighthouse`):

```sql
CREATE TABLE IF NOT EXISTS visitor_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  session_id text NOT NULL,
  path text NOT NULL,
  locale text,
  referrer text,
  country text,
  city text,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS visitor_events_session_id_idx ON visitor_events USING btree (session_id);
CREATE INDEX IF NOT EXISTS visitor_events_created_at_idx ON visitor_events USING btree (created_at);
CREATE TABLE IF NOT EXISTS visitor_alerts (
  session_id text PRIMARY KEY NOT NULL,
  message_id bigint NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);
```

## Setup

1. Vercel → project `byhadara` → Storage → Create Database → Neon (Postgres), connected to the
   `byhadara` project for Production. Done on 2026-09-28: database **`neon-coquelicot-lighthouse`**
   (Frankfurt, free plan), connected with the prefix `STORAGE_URL`, so the connection string is
   `STORAGE_URL_DATABASE_URL` (`lib/db.ts` also accepts `DATABASE_URL` and `POSTGRES_URL`). The
   `hadara-portal-*` databases belong to the HADARA Hospitality portals: never use them here.
2. Create the Telegram bot "BYHADARA Alerts" with @BotFather (`/newbot`), open the bot and press
   Start. `TELEGRAM_CHAT_ID` is the owner's own chat id, the same value as in the
   `hadarahospitality` project.
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to the `byhadara` project (Production,
   Sensitive).
4. Redeploy production: pages are static, so the beacon only appears after a build that sees the
   database.

## Checking it

- Vercel → `byhadara` → Logs, filtered on `/api/visit`: requests answer 204. Log lines:
  `Visitor alert sent.`, `Visitor request-page alert sent.`,
  `Visitor alert update failed. …` (the alert was deleted in Telegram),
  `Visitor alert skipped, likely automated: data-center town.` / `… same-page burst.`, `Visitor alert failed. Telegram error 400: Bad Request: chat not found`
  (Start was not pressed in the bot, or the chat id is wrong), `Visitor tracking failed. …`
  (database), `Visitor cleanup failed. …`. None of them contains visit details or secrets.
- Neon → SQL editor on the `byhadara` database:
  `SELECT path, locale, referrer, country, city, created_at FROM visitor_events ORDER BY created_at DESC LIMIT 20;`
- Preview deployments never count visits, so testing happens on https://www.byhadara.com in a new
  tab or private window (each new tab is a new session).
