import { businessIds, site, type Locale } from './site';

export type CompanyId = (typeof businessIds)[number];
export type ShowcaseItem = {
  slug: string;
  name: string;
  tag: string;
  facts: string[];
  image: string;
  /** Company that developed a project HADARA Real Estate markets; absent for its own development. */
  developer?: string;
};

/** Address of a page on a group company's own website, in the closest available language. */
export function companyUrl(id: CompanyId, locale: Locale, path = '') {
  if (id === 'real-estate') return `${site.realEstate}/${locale}${path}`;
  // HADARA Hospitality publishes English without a prefix and has no Turkish edition.
  return `${site.hospitality}${locale === 'ar' ? '/ar' : ''}${path}`;
}

/**
 * Path of HADARA Real Estate's architectural and engineering design page on its website (for
 * example '/engineering-architecture'). Until the owner confirms it, the design section's button
 * opens the contact page with a "request a consultation" label instead.
 */
export const designServicePath: string | null = null;

/** Display host for a company website, e.g. "www.hadararealestate.com". */
export const companyHost = (id: CompanyId) =>
  new URL(id === 'real-estate' ? site.realEstate : site.hospitality).host;

/** Where a showcase item lives on its company's website. */
export const showcaseUrl = (id: CompanyId, locale: Locale, slug: string) =>
  companyUrl(id, locale, `/${id === 'real-estate' ? 'projects' : 'products'}/${slug}`);

/**
 * Project images, self-hosted: HADARA Real Estate's own photograph of Marmara Haven Villa and the
 * developers' visualisations of the projects it markets (see docs/ASSETS.md).
 */
const projectImages = {
  'marmara-haven-villa': 'real-estate/marmara-haven-evening.jpg',
  'lotus-yasam': 'insights/lotus-yasam-street.jpg',
  'diamond-marin': 'insights/diamond-marin-facade.jpg',
  'lotus-koru-2': 'real-estate/lotus-koru-2.jpg',
};
const productImages = {
  'hotel-bath-sheet-700-gsm': 'hospitality/hotel-bath-sheet.jpg',
  'luxury-hotel-fitted-sheet-250-tc': 'hospitality/fitted-sheet.jpg',
  'waterproof-pillow-protector': 'hospitality/pillow-protector.jpg',
  'hotel-blackout-curtains': 'hospitality/blackout-curtains.jpg',
};
type Copy = Record<string, { name: string; tag: string; facts?: string[]; developer?: string }>;
const items = (images: Record<string, string>, copy: Copy): ShowcaseItem[] =>
  Object.entries(copy).map(([slug, c]) => ({ slug, facts: [], ...c, image: images[slug] }));

/**
 * Selected projects and products, as published on the companies' own websites
 * (hadararealestate.com and hadarahospitality.com). Update them together with those sites.
 */
export const showcase: Record<CompanyId, Record<Locale, ShowcaseItem[]>> = {
  'real-estate': {
    en: items(projectImages, {
      'marmara-haven-villa': {
        name: 'Marmara Haven Villa',
        tag: 'Private villa · Büyükçekmece, Istanbul',
        facts: ['4 floors', '576 m²', '5 bedrooms', '7 bathrooms'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'New residential project · Beylikdüzü',
        facts: ['21,000 m² land', 'Social amenities', 'Delivery 2028'],
        developer: 'Lotus Yapı Proje',
      },
      'diamond-marin': {
        name: 'Diamond Marin',
        tag: 'Boutique residential project · Beylikdüzü',
        facts: ['58 apartments', '3+1', 'Delivery 2027'],
        developer: 'Yıltaş × Lotus Yapı',
      },
      'lotus-koru-2': {
        name: 'Lotus Koru 2',
        tag: 'Delivered residential project · Beylikdüzü',
        facts: ['204 apartments', '17,500 m² green areas'],
        developer: 'Lotus Yapı Proje',
      },
    }),
    ar: items(projectImages, {
      'marmara-haven-villa': {
        name: 'فيلا Marmara Haven',
        tag: 'فيلا خاصة · بيوكجكمجة، إسطنبول',
        facts: ['4 طوابق', '576 م²', '5 غرف نوم', '7 حمامات'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'مشروع سكني جديد · بيليكدوزو',
        facts: ['أرض 21,000 م²', 'مرافق اجتماعية', 'تسليم 2028'],
        developer: 'لوتس يابي بروجي',
      },
      'diamond-marin': {
        name: 'Diamond Marin',
        tag: 'مشروع سكني بوتيكي · بيليكدوزو',
        facts: ['58 شقة', '⁦3+1⁩', 'تسليم 2027'],
        developer: 'Yıltaş × Lotus Yapı',
      },
      'lotus-koru-2': {
        name: 'Lotus Koru 2',
        tag: 'مشروع سكني مُسلَّم · بيليكدوزو',
        facts: ['204 شقة', 'مساحات خضراء 17,500 م²'],
        developer: 'لوتس يابي بروجي',
      },
    }),
    tr: items(projectImages, {
      'marmara-haven-villa': {
        name: 'Marmara Haven Villa',
        tag: 'Özel villa · Büyükçekmece, İstanbul',
        facts: ['4 kat', '576 m²', '5 yatak odası', '7 banyo'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'Yeni konut projesi · Beylikdüzü',
        facts: ['21.000 m² arsa', 'Sosyal olanaklar', '2028 teslim'],
        developer: 'Lotus Yapı Proje',
      },
      'diamond-marin': {
        name: 'Diamond Marin',
        tag: 'Butik konut projesi · Beylikdüzü',
        facts: ['58 daire', '3+1', '2027 teslim'],
        developer: 'Yıltaş × Lotus Yapı',
      },
      'lotus-koru-2': {
        name: 'Lotus Koru 2',
        tag: 'Teslim edilmiş konut projesi · Beylikdüzü',
        facts: ['204 daire', '17.500 m² yeşil alan'],
        developer: 'Lotus Yapı Proje',
      },
    }),
  },
  hospitality: {
    en: items(productImages, {
      'hotel-bath-sheet-700-gsm': { name: 'Hotel Bath Sheet', tag: 'Towels & bath' },
      'luxury-hotel-fitted-sheet-250-tc': {
        name: 'Luxury Hotel Fitted Sheet – 250 TC',
        tag: 'Bed linen',
      },
      'waterproof-pillow-protector': {
        name: 'Waterproof Pillow Protector',
        tag: 'Mattress & pillow protectors',
      },
      'hotel-blackout-curtains': { name: 'Hotel Blackout Curtains', tag: 'Curtains' },
    }),
    ar: items(productImages, {
      'hotel-bath-sheet-700-gsm': {
        name: 'منشفة حمام فندقية كبيرة الحجم',
        tag: 'المناشف ومنسوجات الحمام',
      },
      'luxury-hotel-fitted-sheet-250-tc': {
        name: 'ملاءة فندقية فاخرة بأطراف مطاطية – 250 TC',
        tag: 'بياضات الأسرّة',
      },
      'waterproof-pillow-protector': {
        name: 'واقي وسادة مقاوم للماء',
        tag: 'واقيات المراتب والوسائد',
      },
      'hotel-blackout-curtains': { name: 'ستائر تعتيم فندقية', tag: 'الستائر' },
    }),
    tr: items(productImages, {
      'hotel-bath-sheet-700-gsm': { name: 'Büyük Boy Otel Banyo Havlusu', tag: 'Havlu ve banyo' },
      'luxury-hotel-fitted-sheet-250-tc': {
        name: 'Lüks Otel Lastikli Çarşaf – 250 TC',
        tag: 'Yatak tekstili',
      },
      'waterproof-pillow-protector': {
        name: 'Sıvı Geçirmez Yastık Koruyucu',
        tag: 'Yatak ve yastık koruyucular',
      },
      'hotel-blackout-curtains': { name: 'Otel Karartma Perdesi', tag: 'Perdeler' },
    }),
  },
};
