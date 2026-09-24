import { businessIds, site, type Locale } from './site';

export type CompanyId = (typeof businessIds)[number];
export type ShowcaseItem = {
  slug: string;
  name: string;
  tag: string;
  facts: string[];
  image: string;
};

/** Address of a page on a group company's own website, in the closest available language. */
export function companyUrl(id: CompanyId, locale: Locale, path = '') {
  if (id === 'real-estate') return `${site.realEstate}/${locale}${path}`;
  // HADARA Hospitality publishes English without a prefix and has no Turkish edition.
  return `${site.hospitality}${locale === 'ar' ? '/ar' : ''}${path}`;
}

/** Display host for a company website, e.g. "www.hadararealestate.com". */
export const companyHost = (id: CompanyId) =>
  new URL(id === 'real-estate' ? site.realEstate : site.hospitality).host;

/** Where a showcase item lives on its company's website. */
export const showcaseUrl = (id: CompanyId, locale: Locale, slug: string) =>
  companyUrl(id, locale, `/${id === 'real-estate' ? 'projects' : 'products'}/${slug}`);

const wix = (file: string) => `https://static.wixstatic.com/media/${file}`;
const projectImages = {
  'marmara-haven-villa': wix('3510f9_c4e14f77b98144a59013aca49d0e7c40~mv2.jpeg'),
  'lotus-yasam': wix('3510f9_6e8795e3581c4582a0a197a6ab6dd4cd~mv2.jpg'),
  'lotus-koru': wix('3510f9_ad7dc0dc93a74625a1542c2cad01ebcd~mv2.jpeg'),
};
const productImages = {
  'hotel-bath-sheet-700-gsm': 'hospitality/hotel-bath-sheet.jpg',
  'luxury-hotel-fitted-sheet-250-tc': 'hospitality/fitted-sheet.jpg',
  'waterproof-pillow-protector': 'hospitality/pillow-protector.jpg',
  'hotel-blackout-curtains': 'hospitality/blackout-curtains.jpg',
};
type Copy = Record<string, { name: string; tag: string; facts?: string[] }>;
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
        tag: 'Private villa · Marmara coast',
        facts: ['4 floors', '576 m²', '5 bedrooms', '7 bathrooms'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'New residential project · Beylikdüzü, Istanbul',
        facts: ['21,000 m² land', 'Social amenities', 'Delivery 2028'],
      },
      'lotus-koru': {
        name: 'Lotus Koru',
        tag: 'Residential project · Beylikdüzü, Istanbul',
        facts: ['Modern apartments', 'Delivered project'],
      },
    }),
    ar: items(projectImages, {
      'marmara-haven-villa': {
        name: 'فيلا Marmara Haven',
        tag: 'فيلا خاصة · ساحل مرمرة',
        facts: ['4 طوابق', '576 م²', '5 غرف نوم', '7 حمامات'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'مشروع سكني جديد · بيليكدوزو، إسطنبول',
        facts: ['أرض 21,000 م²', 'مرافق اجتماعية', 'تسليم 2028'],
      },
      'lotus-koru': {
        name: 'Lotus Koru',
        tag: 'مشروع سكني · بيليكدوزو، إسطنبول',
        facts: ['شقق عصرية', 'مشروع مُسلَّم'],
      },
    }),
    tr: items(projectImages, {
      'marmara-haven-villa': {
        name: 'Marmara Haven Villa',
        tag: 'Özel villa · Marmara kıyısı',
        facts: ['4 kat', '576 m²', '5 yatak odası', '7 banyo'],
      },
      'lotus-yasam': {
        name: 'Lotus Yaşam',
        tag: 'Yeni konut projesi · Beylikdüzü, İstanbul',
        facts: ['21.000 m² arsa', 'Sosyal olanaklar', '2028 teslim'],
      },
      'lotus-koru': {
        name: 'Lotus Koru',
        tag: 'Konut projesi · Beylikdüzü, İstanbul',
        facts: ['Modern daireler', 'Teslim edilmiş proje'],
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
