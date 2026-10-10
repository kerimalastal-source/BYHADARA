/** Languages and main navigation, kept small because the header runs in the browser. */
/** Every language the copy is written in; dictionaries and articles keep all of them. */
export const allLocales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof allLocales)[number];
/**
 * Languages published on the site. Turkish is switched off but kept (owner, 2026-10-10): its
 * pages are not built and `/tr/…` redirects to English. Add 'tr' back here to re-enable it.
 */
export const locales: readonly Locale[] = ['en', 'ar'];
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
export const navPaths = ['', 'about', 'businesses', 'markets', 'partnerships', 'insights'];
