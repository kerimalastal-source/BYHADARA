import { createHmac } from 'node:crypto';
import { dialCode } from '@/content/countries';
import { escapeHtml } from './html';
import { inquiryRecipient, inquirySender } from './inquiry-config';
import type { Inquiry } from './inquiry-schema';
export { escapeHtml };
export function safeEndpoint(value: string) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password)
    throw new Error('HTTPS configuration required');
  return url.toString();
}
/** Shared, atomic limiter: 5 requests per IP per 15 minutes. IPs are HMACed; no raw IP is stored. */
export async function rateLimit(ip: string) {
  const digest = createHmac('sha256', process.env.RATE_LIMIT_SALT!).update(ip).digest('hex');
  const response = await fetch(safeEndpoint(process.env.UPSTASH_REDIS_REST_URL!), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      'EVAL',
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",
      '1',
      `byhadara:inquiry:${digest}`,
    ]),
    signal: AbortSignal.timeout(5000),
    cache: 'no-store',
    redirect: 'error',
  });
  if (!response.ok) throw new Error('Limiter unavailable');
  const result = await response.json();
  if (typeof result.result !== 'number') throw new Error('Invalid limiter response');
  return result.result <= 5;
}
export const topicLabels = {
  general: 'General inquiry',
  investment: 'Investment opportunity',
  partnership: 'Strategic partnership',
} as const;
/**
 * Dialable international number without "+": the national trunk prefix 0 is dropped (Italian
 * numbering keeps it).
 */
export function internationalNumber(inquiry: Pick<Inquiry, 'country' | 'phone'>) {
  const code = dialCode(inquiry.country)!;
  const digits = inquiry.phone.replace(/\D/g, '');
  return `${code.slice(1)}${code === '+39' ? digits : digits.replace(/^0/, '')}`;
}
/** The email the team receives for one request, as a subject with HTML and plain-text bodies. */
export function composeEmail(inquiry: Inquiry) {
  const code = dialCode(inquiry.country)!;
  const country = new Intl.DisplayNames(['en'], { type: 'region' }).of(inquiry.country);
  const phone = `${code} ${inquiry.phone}`;
  const international = internationalNumber(inquiry);
  const whatsapp = `https://wa.me/${international}`;
  const rows: [string, string, string?][] = [
    ['Full name', inquiry.name],
    ['Email', inquiry.email, `mailto:${inquiry.email}`],
    ['Company', inquiry.company || '—'],
    ['Phone', `${phone} (${country})`, `tel:+${international}`],
    ['WhatsApp', whatsapp.slice(8), whatsapp],
    ['Company website', inquiry.website || '—', inquiry.website || undefined],
    ['Topic', topicLabels[inquiry.topic]],
    ['Site language', inquiry.locale.toUpperCase()],
    ['Email updates', inquiry.marketing ? 'Agreed to receive them' : 'Not requested'],
  ];
  const subject = `New request: ${topicLabels[inquiry.topic]} from ${inquiry.name}${
    inquiry.company ? ` (${inquiry.company})` : ''
  }`;
  const html = `<h2 style="font-family:Arial,sans-serif;color:#14283d">${escapeHtml(subject)}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([label, value, href]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#566579;vertical-align:top">${label}</td><td style="padding:6px 0">${
          href ? `<a href="${escapeHtml(href)}">${escapeHtml(value)}</a>` : escapeHtml(value)
        }</td></tr>`,
    )
    .join('')}</table>
<h3 style="font-family:Arial,sans-serif;color:#14283d;margin-top:24px">Request</h3>
<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`;
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nRequest:\n${inquiry.message}`;
  return { subject, html, text };
}
const topicLabelsAr = {
  general: 'استفسار عام',
  investment: 'فرصة استثمار',
  partnership: 'شراكة استراتيجية',
} as const;
const languagesAr = { en: 'الإنجليزية', ar: 'العربية', tr: 'التركية' } as const;
/** Keeps a left-to-right value (phone, email, address) whole inside an Arabic line. */
const ltr = (value: string) => `\u2066${escapeHtml(value)}\u2069`;
/**
 * The Telegram alert the team receives for one request (Arabic, parse_mode HTML). Telegram links
 * only http(s) addresses, so the phone and email stay plain text, which its apps make tappable.
 */
export function composeTelegram(inquiry: Inquiry) {
  const code = dialCode(inquiry.country)!;
  const country = new Intl.DisplayNames(['ar'], { type: 'region' }).of(inquiry.country);
  const request =
    inquiry.message.length > 1500 ? `${inquiry.message.slice(0, 1500)}…` : inquiry.message;
  const details = [
    `📩 <b>طلب جديد من الموقع: ${topicLabelsAr[inquiry.topic]}</b>`,
    `👤 ${escapeHtml(inquiry.name)}`,
    inquiry.company ? `🏢 ${escapeHtml(inquiry.company)}` : '',
    `📧 ${ltr(inquiry.email)}`,
    `📞 ${ltr(`${code} ${inquiry.phone}`)} (${escapeHtml(country ?? inquiry.country)})`,
    `💬 <a href="https://wa.me/${internationalNumber(inquiry)}">مراسلة عبر واتساب</a>`,
    inquiry.website ? `🔗 ${ltr(inquiry.website)}` : '',
    `🗣️ لغة الموقع: ${languagesAr[inquiry.locale]}`,
    `✉️ رسائل التسويق: ${inquiry.marketing ? 'وافق على استلامها' : 'لم يطلبها'}`,
  ].filter(Boolean);
  return `${details.join('\n')}\n\n📝 ${escapeHtml(request)}`;
}
/** Sends one request by email through the Resend API and returns the provider's message ID. */
export async function sendInquiry(inquiry: Inquiry) {
  const { subject, html, text } = composeEmail(inquiry);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    // Replying to the notification answers the visitor directly.
    body: JSON.stringify({
      from: inquirySender(),
      to: [inquiryRecipient()],
      reply_to: inquiry.email,
      subject,
      html,
      text,
    }),
    cache: 'no-store',
    redirect: 'error',
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Email provider responded ${response.status}`);
  const result = await response.json();
  if (typeof result.id !== 'string') throw new Error('Email provider did not confirm the message');
  return result.id as string;
}
