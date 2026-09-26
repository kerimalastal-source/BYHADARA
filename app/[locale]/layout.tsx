import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, dictionary } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Site';
import '@/styles/globals.css';
export const viewport: Viewport = { themeColor: '#14283d' };
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = dictionary(locale);
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <a className="skip-link" href="#main">
          {d.skip}
        </a>
        <Header
          locale={locale}
          labels={{
            nav: d.nav,
            contact: d.contact,
            menu: d.menu,
            close: d.close,
            language: d.language,
          }}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
