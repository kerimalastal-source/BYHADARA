/** Languages and main navigation, kept small because the header runs in the browser. */
/** Every language the copy is written in; dictionaries and articles keep all of them. */
export const allLocales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof allLocales)[number];
/**
 * Languages published on the site. Turkish was switched off from 2026-10-10 to 2026-11-22 and is
 * back at the owner's request; leaving a language out here keeps its copy and sends `/xx/…` to
 * English.
 */
export const locales: readonly Locale[] = ['en', 'ar', 'tr'];
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
export const navPaths = ['', 'about', 'businesses', 'markets', 'partnerships', 'insights'];
