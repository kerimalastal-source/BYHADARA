'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { isLocale } from '@/content/locales';
import { notFoundCopy } from '@/content/not-found';
export default function NotFound() {
  const p = useParams();
  const l = typeof p.locale === 'string' && isLocale(p.locale) ? p.locale : 'en';
  const d = notFoundCopy[l];
  return (
    <section className="container section">
      <p>404</p>
      <h1>{d.notFound}</h1>
      <p>{d.notFoundText}</p>
      <Link className="text-link" href={`/${l}`}>
        {d.returnHome}
      </Link>
    </section>
  );
}
