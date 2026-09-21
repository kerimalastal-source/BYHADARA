import { notFound } from 'next/navigation';
import { isLocale, dictionary } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Site';
import '@/styles/globals.css';
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <a className="skip-link" href="#main">
          {dictionary(locale).skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
