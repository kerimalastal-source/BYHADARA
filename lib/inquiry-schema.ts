import { z } from 'zod';
export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const sectors = ['real-estate', 'hospitality', 'business-development', 'other'] as const;
export const opportunities = [
  'joint-venture',
  'project-development',
  'strategic-investment',
  'business-partnership',
  'other',
] as const;
export const partnerTypes = [
  'real-estate-development',
  'hospitality-supply',
  'manufacturing',
  'distribution',
  'regional-business-development',
  'corporate-collaboration',
  'other',
] as const;
const text = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((v) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v));
const base = {
  name: text(2, 120),
  company: text(2, 180),
  email: z.email().max(254),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d() .-]{6,30}$/),
  country: text(2, 80),
  description: text(30, 5000),
  consent: z.literal('yes'),
  locale: z.enum(['en', 'ar', 'tr']),
  websiteTrap: z.string().max(0),
  startedAt: z.coerce.number().int().positive(),
  requestId: z.uuid(),
  token: z.string().min(1).max(2048),
};
export const inquirySchema = z.discriminatedUnion('kind', [
  z.object({
    ...base,
    kind: z.literal('investment'),
    sector: z.enum(sectors),
    opportunity: z.enum(opportunities),
  }),
  z.object({
    ...base,
    kind: z.literal('partnership'),
    website: z
      .url()
      .max(300)
      .refine((v) => /^https?:\/\//.test(v)),
    industry: text(2, 100),
    partnership: z.enum(partnerTypes),
  }),
]);
export type Inquiry = z.infer<typeof inquirySchema>;
export async function checkPdf(file: File): Promise<boolean> {
  if (
    !file.size ||
    file.size > MAX_FILE_BYTES ||
    file.type !== 'application/pdf' ||
    !file.name.toLowerCase().endsWith('.pdf')
  )
    return false;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const start = new TextDecoder().decode(bytes.slice(0, 8));
  const end = new TextDecoder().decode(bytes.slice(-1024));
  return /^%PDF-1\.[0-9]|^%PDF-2\.0/.test(start) && end.includes('%%EOF');
}
