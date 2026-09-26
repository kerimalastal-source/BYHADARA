import { z } from 'zod';
import { dialCode } from '@/content/countries';
import { clean, isEmail, isPhone, isText, normalizeWebsite } from './inquiry-rules';
export { normalizeWebsite };
/** Where a request was sent from: the contact page or one of the two inquiry pages. */
export const topics = ['general', 'investment', 'partnership'] as const;
export type Topic = (typeof topics)[number];
export const MAX_BODY_BYTES = 16_000;
const text = (min: number, max: number) =>
  z
    .string()
    .trim()
    .refine((v) => isText(v, min, max));
export const inquirySchema = z.object({
  topic: z.enum(topics),
  locale: z.enum(['en', 'ar', 'tr']),
  name: text(2, 120),
  email: z.string().trim().toLowerCase().refine(isEmail),
  company: z.string().trim().max(180).refine(clean),
  country: z.string().refine((v) => dialCode(v) !== undefined),
  phone: z.string().trim().refine(isPhone),
  website: z
    .string()
    .trim()
    .max(300)
    .refine((v) => normalizeWebsite(v) !== null)
    .transform((v) => normalizeWebsite(v) as string),
  message: text(10, 3000),
  // Optional opt-in to email updates: the checkbox sends "yes" only when ticked.
  marketing: z
    .literal('yes')
    .optional()
    .transform((v) => v === 'yes'),
  startedAt: z.coerce.number().int().positive(),
});
export type Inquiry = z.infer<typeof inquirySchema>;
