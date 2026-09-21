import { inquiriesEnabled } from '@/lib/inquiry-config';
import { checkPdf, inquirySchema, MAX_FILE_BYTES } from '@/lib/inquiry-schema';
import { deliverInquiry, rateLimit, verifyChallenge, type Attachment } from '@/lib/inquiry-service';
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
  const allowed = (process.env.INQUIRY_ALLOWED_ORIGINS || 'https://byhadara.com')
    .split(',')
    .map((x) => x.trim());
  if (!allowed.includes(request.headers.get('origin') || '')) return reply(403, 'origin');
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data'))
    return reply(415, 'content_type');
  const length = Number(request.headers.get('content-length'));
  if (length > MAX_FILE_BYTES + 64000) return reply(413, 'too_large');
  try {
    // Vercel overwrites x-vercel-forwarded-for. Do not trust arbitrary x-forwarded-for from clients.
    const ip =
      process.env.VERCEL === '1'
        ? (request.headers.get('x-vercel-forwarded-for') || 'unknown').split(',')[0].trim()
        : 'local';
    if (!(await rateLimit(ip))) return reply(429, 'rate_limited');
    // Bound streaming input even when Content-Length is absent or false.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, 'body');
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_FILE_BYTES + 64000) {
        await reader.cancel();
        return reply(413, 'too_large');
      }
      chunks.push(part.value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.length;
    }
    const form = await new Request(request.url, {
      method: 'POST',
      headers: { 'content-type': request.headers.get('content-type')! },
      body: bytes,
    }).formData();
    const values = Object.fromEntries(form);
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success)
      return reply(422, 'validation', {
        fields: [...new Set(parsed.error.issues.map((x) => String(x.path[0])))],
      });
    const age = Date.now() - parsed.data.startedAt;
    if (age < 3000 || age > 24 * 60 * 60 * 1000) return reply(422, 'timing');
    if (!(await verifyChallenge(parsed.data.token))) return reply(403, 'challenge');
    const file = form.get('attachment');
    let attachment: Attachment | undefined;
    if (file instanceof File && file.size) {
      if (!(await checkPdf(file))) return reply(422, 'attachment', { fields: ['attachment'] });
      attachment = {
        name: 'company-proposal.pdf',
        contentType: 'application/pdf',
        base64: Buffer.from(await file.arrayBuffer()).toString('base64'),
        quarantine: true,
      };
    }
    const id = await deliverInquiry(parsed.data, attachment);
    return reply(201, 'accepted', { accepted: true, id });
  } catch {
    return reply(503, 'unavailable');
  }
}
