import { afterResponse, allowedOrigin, readBody } from '@/lib/http';
import { sendTelegramMessage, telegramConfigured } from '@/lib/telegram';
import {
  isBot,
  newVisitorMessage,
  parseVisit,
  recordVisit,
  removeOldVisits,
  visitTrackingEnabled,
} from '@/lib/visits';
export const runtime = 'nodejs';
export const maxDuration = 15;
const MAX_BODY_BYTES = 2048;
const reply = (status: number) =>
  new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
/**
 * Anonymous page-view beacon sent by `VisitTracker` on every page. Saves the view and, for the
 * first view of a session, alerts the team on Telegram after the response.
 */
export async function POST(request: Request) {
  if (!visitTrackingEnabled()) return reply(503);
  if (!allowedOrigin(request)) return reply(403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415);
  // Accepted without being counted.
  if (isBot(request.headers.get('user-agent'))) return reply(204);
  const raw = await readBody(request, MAX_BODY_BYTES);
  if (raw === null) return reply(413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400);
  }
  const visit = parseVisit(body, request.headers);
  if (visit === undefined) return reply(400);
  if (visit === null) return reply(204);
  let first: boolean;
  try {
    first = await recordVisit(visit);
  } catch (error) {
    console.error(`Visitor tracking failed. ${error instanceof Error ? error.message : ''}`);
    return reply(500);
  }
  if (first && telegramConfigured())
    afterResponse(async () => {
      await sendTelegramMessage(newVisitorMessage(visit));
      console.info('Visitor alert sent.');
    }, 'Visitor alert failed.');
  // Occasional housekeeping instead of a scheduled job.
  if (Math.random() < 0.01) afterResponse(removeOldVisits, 'Visitor cleanup failed.');
  return reply(204);
}
