/** Languages and main navigation, kept small because the header runs in the browser. */
export const locales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
export const navPaths = ['', 'about', 'businesses', 'markets', 'partnerships', 'insights'];
