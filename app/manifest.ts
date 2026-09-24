import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { seo } from '@/content/seo';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'BYHADARA',
    description: seo.en[''].description,
    start_url: '/en',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#14283d',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
