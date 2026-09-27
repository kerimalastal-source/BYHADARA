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
- One statement saves the event and reports whether the session already had one. For the first
  event of a session the Telegram alert is sent with `after()`, once the response is on its way.
- About 1% of requests also delete events older than 30 days, also after the response; a failed
  cleanup is only logged.

## Table

The code creates the table and its indexes by itself the first time a visit is saved in a new
database (`visitorEventsSchema` in `lib/visits.ts`), so no manual migration is needed. The same
statements, to run by hand only in the database connected to the `byhadara` project:

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
```

## Setup

1. Vercel → project `byhadara` → Storage → Create Database → Neon (Postgres), connected to the
   `byhadara` project for Production. This adds `DATABASE_URL` (and `POSTGRES_URL`). It must be a
   new database: `hadara-portal-db` belongs to the HADARA Hospitality Partner Portal.
2. Create the Telegram bot "BYHADARA Alerts" with @BotFather (`/newbot`), open the bot and press
   Start. `TELEGRAM_CHAT_ID` is the owner's own chat id, the same value as in the
   `hadarahospitality` project.
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to the `byhadara` project (Production,
   Sensitive).
4. Redeploy production: pages are static, so the beacon only appears after a build that sees the
   database.

## Checking it

- Vercel → `byhadara` → Logs, filtered on `/api/visit`: requests answer 204. Log lines:
  `Visitor alert sent.`, `Visitor alert failed. Telegram error 400: Bad Request: chat not found`
  (Start was not pressed in the bot, or the chat id is wrong), `Visitor tracking failed. …`
  (database), `Visitor cleanup failed. …`. None of them contains visit details or secrets.
- Neon → SQL editor on the `byhadara` database:
  `SELECT path, locale, referrer, country, city, created_at FROM visitor_events ORDER BY created_at DESC LIMIT 20;`
- Preview deployments never count visits, so testing happens on https://www.byhadara.com in a new
  tab or private window (each new tab is a new session).
