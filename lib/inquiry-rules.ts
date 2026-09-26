/**
 * Field rules for the contact form, without any library, so the browser can check a request
 * before sending it. The server applies the same rules through `inquiry-schema.ts` (zod) and
 * remains the authority.
 */
export const clean = (v: string) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(v);
const digits = (v: string) => v.replace(/\D/g, '').length;
/** The pattern zod uses for `z.email()`, kept identical so both sides agree. */
const EMAIL =
  /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
export const isText = (v: string, min: number, max: number) =>
  v.length >= min && v.length <= max && clean(v);
/** Expects the address already trimmed and lowercased. */
export const isEmail = (v: string) => v.length <= 254 && EMAIL.test(v);
/** National number without the country code: digits, spaces and common separators only. */
export const isPhone = (v: string) =>
  v.length <= 24 && /^[\d\s().-]+$/.test(v) && digits(v) >= 4 && digits(v) <= 14;
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
/**
 * The fields a visitor has to correct, in form order. The country is only checked for presence
 * here (the list offers valid codes only); the server also checks it against the calling codes.
 */
export function invalidFields(form: Record<string, unknown>): string[] {
  const v = (k: string) => (typeof form[k] === 'string' ? (form[k] as string).trim() : '');
  const checks: [string, boolean][] = [
    ['name', isText(v('name'), 2, 120)],
    ['email', isEmail(v('email').toLowerCase())],
    ['country', v('country') !== ''],
    ['phone', isPhone(v('phone'))],
    ['company', v('company').length <= 180 && clean(v('company'))],
    ['website', v('website').length <= 300 && normalizeWebsite(v('website')) !== null],
    ['message', isText(v('message'), 10, 3000)],
  ];
  return checks.filter(([, ok]) => !ok).map(([field]) => field);
}
