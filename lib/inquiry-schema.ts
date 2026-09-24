import { z } from 'zod';
import { dialCode } from '@/content/countries';
/** Where a request was sent from: the contact page or one of the two inquiry pages. */
export const topics = ['general', 'investment', 'partnership'] as const;
export type Topic = (typeof topics)[number];
export const MAX_BODY_BYTES = 16_000;
const clean = (v: string) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v);
const text = (min: number, max: number) => z.string().trim().min(min).max(max).refine(clean);
const digits = (v: string) => v.replace(/\D/g, '').length;
/**
 * Accepts "company.com", "www.company.com" or a full http(s) address and returns it with a
 * scheme; returns "" for an empty value and null when it is not a usable website address.
 */
export function normalizeWebsite(value: string): string | null {
  const v = value.trim();
  if (!v) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    if (url.username || url.password || !/^[^.\s]+(\.[^.\s]+)+$/.test(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}
export const inquirySchema = z.object({
  topic: z.enum(topics),
  locale: z.enum(['en', 'ar', 'tr']),
  name: text(2, 120),
  company: z.string().trim().max(180).refine(clean),
  country: z.string().refine((v) => dialCode(v) !== undefined),
  // National number without the country code: digits, spaces and common separators only.
  phone: z
    .string()
    .trim()
    .max(24)
    .refine((v) => /^[\d\s().-]+$/.test(v) && digits(v) >= 4 && digits(v) <= 14),
  website: z
    .string()
    .trim()
    .max(300)
    .refine((v) => normalizeWebsite(v) !== null)
    .transform((v) => normalizeWebsite(v) as string),
  message: text(10, 3000),
  startedAt: z.coerce.number().int().positive(),
});
export type Inquiry = z.infer<typeof inquirySchema>;
