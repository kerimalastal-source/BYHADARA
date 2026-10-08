import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Project photography published by HADARA Real Estate on its own website.
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wixstatic.com', pathname: '/media/**' },
    ],
  },
  // Addresses of the old Wix site that Google still crawls (Search Console, 2026-10-08), sent
  // permanently to the closest page here, or to the project's page on the real estate website.
  async redirects() {
    const guide = (slug: string) => `/en/insights/${slug}`;
    const realEstate = 'https://www.hadararealestate.com';
    const villa = `${realEstate}/projects/marmara-haven-villa`;
    const to = (source: string, destination: string) => ({ source, destination, permanent: true });
    return [
      to('/post/why-invest-in-real-estate-in-turkey', guide('buying-property-in-turkiye')),
      to('/post/property-taxes-and-fees-in-turkey', guide('buying-property-in-turkiye')),
      to(
        '/post/common-mistakes-foreigners-make-when-buying-property-in-turkey',
        guide('buying-property-in-turkiye'),
      ),
      to(
        '/post/turkish-citizenship-by-real-estate-investmenta-complete-guide-for-foreign-investorsintroduction',
        guide('turkish-citizenship-through-real-estate'),
      ),
      to(
        '/post/best-areas-to-buy-property-in-istanbul',
        guide('western-istanbul-beylikduzu-buyukcekmece'),
      ),
      to(
        '/en-us/post/best-areas-to-buy-property-in-istanbul',
        guide('western-istanbul-beylikduzu-buyukcekmece'),
      ),
      to('/post/real-estate-market-in-turkey', '/en/markets/turkiye'),
      to('/post/cost-of-living-in-turkey', '/en/markets/turkiye'),
      to('/post/living-in-istanbul', '/en/markets/turkiye'),
      to('/post/:slug*', '/en/insights'),
      to('/blog/:slug*', '/en/insights'),
      to('/projects/marmara-haven-villa', villa),
      to('/projects-1/Marmarahavenvilla', villa),
      to('/ru-ru/marmarahaven', villa),
      to('/projects/lotus-koru-2', `${realEstate}/projects/lotus-koru-1`),
      to('/projects/:slug*', '/en/businesses/real-estate'),
      to('/projects-1/:slug*', '/en/businesses/real-estate'),
      to('/ru-ru/turkishcitizenship', guide('turkish-citizenship-through-real-estate')),
      to('/ru-ru/:path*', '/en'),
      to('/en-us/:path*', '/en'),
      to('/ar-sa/:path*', '/ar'),
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};
export default config;
