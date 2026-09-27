import { inquiriesEnabled, rateLimitConfigured } from '@/lib/inquiry-config';
import { hubspotConfigured, saveToHubspot } from '@/lib/hubspot';
import { afterResponse, allowedOrigin, readBody } from '@/lib/http';
import { inquirySchema, MAX_BODY_BYTES } from '@/lib/inquiry-schema';
import { rateLimit, sendInquiry } from '@/lib/inquiry-service';
export const runtime = 'nodejs';
export const maxDuration = 30;
const reply = (status: number, code: string, extra: Record<string, unknown> = {}) =>
  Response.json(
    { code, ...extra },
    {
      status,
      headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '900' } : {}) },
    },
  );
export async function POST(request: Request) {
  if (!inquiriesEnabled()) return reply(503, 'unavailable');
  if (!allowedOrigin(request)) return reply(403, 'origin');
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return reply(415, 'content_type');
  if (Number(request.headers.get('content-length')) > MAX_BODY_BYTES)
    return reply(413, 'too_large');
  const raw = await readBody(request, MAX_BODY_BYTES);
  if (raw === null) return reply(413, 'too_large');
  let values: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error();
    values = parsed;
  } catch {
    return reply(400, 'body');
  }
  // Hidden field that people never fill in: report success to bots without sending anything.
  if (typeof values.websiteTrap === 'string' && values.websiteTrap.trim())
    return reply(200, 'accepted', { accepted: true });
  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success)
    return reply(422, 'validation', {
      fields: [...new Set(parsed.error.issues.map((x) => String(x.path[0])))],
    });
  const age = Date.now() - parsed.data.startedAt;
  if (age < 3000 || age > 24 * 60 * 60 * 1000) return reply(422, 'timing');
  try {
    if (rateLimitConfigured()) {
      // Vercel overwrites x-vercel-forwarded-for. Do not trust arbitrary x-forwarded-for from clients.
      const ip =
        process.env.VERCEL === '1'
          ? (request.headers.get('x-vercel-forwarded-for') || 'unknown').split(',')[0].trim()
          : 'local';
      if (!(await rateLimit(ip))) return reply(429, 'rate_limited');
    }
    await sendInquiry(parsed.data);
    const inquiry = parsed.data;
    if (hubspotConfigured())
      afterResponse(
        async () => console.info(`HubSpot sync saved contact ${await saveToHubspot(inquiry)}.`),
        'HubSpot sync failed.',
      );
    return reply(200, 'accepted', { accepted: true });
  } catch {
    return reply(502, 'send_failed');
  }
}
