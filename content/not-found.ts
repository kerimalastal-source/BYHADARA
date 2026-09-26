import type { Locale } from './locales';
/** Page-not-found copy, kept apart from the dictionaries because the 404 page runs in the browser. */
export const notFoundCopy: Record<
  Locale,
  { notFound: string; notFoundText: string; returnHome: string }
> = {
  en: {
    notFound: 'Page not found',
    notFoundText: 'The page you are looking for is not available in this language.',
    returnHome: 'Return to homepage',
  },
  ar: {
    notFound: 'الصفحة غير موجودة',
    notFoundText: 'الصفحة المطلوبة غير متاحة بهذه اللغة.',
    returnHome: 'العودة إلى الرئيسية',
  },
  tr: {
    notFound: 'Sayfa bulunamadı',
    notFoundText: 'Aradığınız sayfa bu dilde mevcut değil.',
    returnHome: 'Ana sayfaya dön',
  },
};
