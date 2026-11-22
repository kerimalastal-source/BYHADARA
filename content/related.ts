import type { CompanyId } from './companies';
import type { Locale } from './site';
import { site } from './site';
/**
 * Projects and products that articles link to under their text ("Related projects / products"),
 * so readers continue to the page on the company website. Names and slugs come from the
 * companies' own sites: projects from İkinci BYHADARA (`src/data/projects.ts`), products from
 * HADARA Hospitality (`src/data/products.ts`, `products.i18n.ts`; Turkish names translated here,
 * as that site has no Turkish edition). Images are self-hosted copies (see docs/ASSETS.md).
 */
export type RelatedItem = { name: Record<Locale, string>; image: string };
const same = (name: string) => ({ en: name, ar: name, tr: name });
export const relatedItems: Record<CompanyId, Record<string, RelatedItem>> = {
  'real-estate': {
    'marmara-haven-villa': {
      name: same('Marmara Haven Villa'),
      image: 'real-estate/marmara-haven-evening.jpg',
    },
    'beylikduzu-living': { name: same('Lotus Yaşam'), image: 'insights/lotus-yasam-street.jpg' },
    'diamond-marin': { name: same('Diamond Marin'), image: 'insights/diamond-marin-facade.jpg' },
    'lotus-koru-2': { name: same('Lotus Koru 2'), image: 'real-estate/lotus-koru-2.jpg' },
  },
  hospitality: {
    'hotel-bath-towel': {
      name: { en: 'Hotel Bath Towel', ar: 'منشفة حمام فندقية', tr: 'Otel Banyo Havlusu' },
      image: 'related/hotel-bath-towel.jpg',
    },
    'hotel-bath-sheet': {
      name: {
        en: 'Hotel Bath Sheet',
        ar: 'منشفة حمام كبيرة فندقية',
        tr: 'Otel Büyük Banyo Havlusu',
      },
      image: 'hospitality/hotel-bath-sheet.jpg',
    },
    'hotel-hand-towel': {
      name: { en: 'Hotel Hand Towel', ar: 'منشفة يد فندقية', tr: 'Otel El Havlusu' },
      image: 'related/hotel-hand-towel.jpg',
    },
    'hotel-spa-towel': {
      name: { en: 'Hotel Spa Towel', ar: 'منشفة سبا فندقية', tr: 'Otel Spa Havlusu' },
      image: 'related/hotel-spa-towel.jpg',
    },
    'satin-stripe-bed-linen-set': {
      name: {
        en: 'Satin Stripe Bed Linen Set',
        ar: 'طقم مفروشات أسرّة ساتان مخطط',
        tr: 'Saten Çizgili Nevresim Takımı',
      },
      image: 'related/satin-stripe-bed-linen-set.jpg',
    },
    'hotel-duvet-cover': {
      name: { en: 'Hotel Duvet Cover', ar: 'غطاء لحاف فندقي', tr: 'Otel Nevresim Kılıfı' },
      image: 'related/hotel-duvet-cover.jpg',
    },
    'hotel-fitted-sheet': {
      name: {
        en: 'Hotel Fitted Sheet',
        ar: 'ملاءة سرير مطاطية فندقية',
        tr: 'Otel Lastikli Çarşaf',
      },
      image: 'hospitality/fitted-sheet.jpg',
    },
    'goose-down-hotel-duvet': {
      name: {
        en: 'Goose Down Hotel Duvet',
        ar: 'لحاف فندقي بريش الإوز',
        tr: 'Kaz Tüyü Otel Yorganı',
      },
      image: 'related/goose-down-hotel-duvet.jpg',
    },
    'goose-down-hotel-pillow': {
      name: {
        en: 'Goose Down Hotel Pillow',
        ar: 'وسادة فندقية بريش الإوز',
        tr: 'Kaz Tüyü Otel Yastığı',
      },
      image: 'related/goose-down-hotel-pillow.jpg',
    },
    'waterproof-mattress-protector': {
      name: { en: 'Hotel Mattress Protector', ar: 'واقي مرتبة فندقي', tr: 'Otel Yatak Koruyucu' },
      image: 'related/waterproof-mattress-protector.jpg',
    },
    'waterproof-pillow-protector': {
      name: { en: 'Hotel Pillow Protector', ar: 'واقي وسادة فندقي', tr: 'Otel Yastık Koruyucu' },
      image: 'hospitality/pillow-protector.jpg',
    },
    'hotel-blackout-curtains': {
      name: { en: 'Hotel Blackout Curtain', ar: 'ستارة تعتيم فندقية', tr: 'Otel Karartma Perdesi' },
      image: 'hospitality/blackout-curtains.jpg',
    },
    'luxury-hotel-slippers': {
      name: { en: 'Hotel Slippers', ar: 'شباشب فندقية', tr: 'Otel Terliği' },
      image: 'related/luxury-hotel-slippers.jpg',
    },
  },
};
/**
 * The item's page on the company website. Both sites publish English without a prefix and
 * Arabic under /ar; neither has a Turkish edition, so Turkish readers get English.
 */
export function relatedUrl(company: CompanyId, locale: Locale, slug: string) {
  const base = company === 'real-estate' ? site.realEstate : site.hospitality;
  const kind = company === 'real-estate' ? 'projects' : 'products';
  return `${base}${locale === 'ar' ? '/ar' : ''}/${kind}/${slug}`;
}
