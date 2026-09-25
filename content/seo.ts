import { site, type Locale } from './site';

/**
 * Search titles and descriptions for every corporate route. Titles stay within ~65
 * characters and descriptions within ~165 so search results do not truncate them.
 * Arabic entries use the Arabic brand name so the pages match Arabic searches.
 */
type SeoEntry = { title: string; description: string };

export const seo: Record<Locale, Record<string, SeoEntry>> = {
  en: {
    '': {
      title: 'BYHADARA Group | Istanbul Investment & Business Development',
      description:
        'BYHADARA Group is the Istanbul-based group behind HADARA Real Estate and HADARA Hospitality, two specialized companies in property and hospitality supply.',
    },
    about: {
      title: 'About Us – Istanbul Investment Group | BYHADARA Group',
      description:
        'Learn about BYHADARA Group, an Istanbul-based investment and business development group uniting independently registered companies in specialized industries.',
    },
    businesses: {
      title: 'Our Businesses – Real Estate & Hospitality | BYHADARA Group',
      description:
        'Discover the BYHADARA Group businesses: HADARA Real Estate for property development in Türkiye and HADARA Hospitality for hotel textiles and supplies.',
    },
    'businesses/real-estate': {
      title: 'HADARA Real Estate – Luxury Villas in Istanbul | BYHADARA Group',
      description:
        'HADARA Real Estate, a BYHADARA Group company, has developed luxury villas and residential projects in Istanbul since 2014, including Lotus Yaşam and Lotus Koru.',
    },
    'businesses/hospitality': {
      title: 'HADARA Hospitality – Hotel Textiles & Supplies | BYHADARA Group',
      description:
        'HADARA Hospitality, a BYHADARA Group company, supplies hotel linen, towels, bathrobes and guest essentials from Türkiye to 3★–5★ hotels in the GCC and Europe.',
    },
    markets: {
      title: 'Our Markets – Türkiye, GCC & Egypt | BYHADARA Group',
      description:
        'From its Istanbul base, BYHADARA Group builds commercial connections across Türkiye, the GCC and Egypt, with an approach grounded in each market.',
    },
    'markets/turkiye': {
      title: 'Türkiye – Our Operating Base in Istanbul | BYHADARA Group',
      description:
        'Istanbul is the headquarters and primary operating base of BYHADARA Group, supporting its real estate development and hospitality supply activities.',
    },
    'markets/gcc': {
      title: 'GCC Markets – Hospitality Supply & Partnerships | BYHADARA Group',
      description:
        'The GCC is a key region for BYHADARA Group’s hospitality supply relationships and regional business development, focused on long-term collaboration.',
    },
    'markets/egypt': {
      title: 'Egypt – Future Business Opportunities | BYHADARA Group',
      description:
        'Egypt is a market of interest for BYHADARA Group: exploring business development, commercial relationships and partners aligned with its growth direction.',
    },
    partnerships: {
      title: 'Partnerships & Investment Collaboration | BYHADARA Group',
      description:
        'Partner with BYHADARA Group in investment collaboration, real estate development, manufacturing and supply, and regional business development.',
    },
    insights: {
      title: 'Insights & News | BYHADARA Group',
      description:
        'Business perspectives, market insights and group updates from BYHADARA Group on real estate, hospitality and trade across Türkiye, the GCC and Egypt.',
    },
    contact: {
      title: 'Contact BYHADARA Group | Istanbul, Türkiye',
      description: `Contact BYHADARA Group in Istanbul at ${site.email} or ${site.phone} to discuss investment opportunities and strategic partnerships.`,
    },
    'contact/thank-you': {
      title: 'Thank You – Request Received | BYHADARA Group',
      description:
        'Thank you for contacting BYHADARA Group. Your request has reached our team in Istanbul, and we will get back to you on the phone number you provided.',
    },
    'inquiries/investment': {
      title: 'Investment Opportunities Inquiry | BYHADARA Group',
      description:
        'Introduce yourself and outline your proposal to explore investment opportunities and joint ventures with BYHADARA Group in Istanbul.',
    },
    'inquiries/partnership': {
      title: 'Strategic Partnership Inquiry | BYHADARA Group',
      description:
        'Developers, manufacturers, suppliers and regional partners: introduce your business and proposal to become a strategic partner of BYHADARA Group.',
    },
    privacy: {
      title: 'Privacy Policy | BYHADARA Group',
      description:
        'How the BYHADARA Group corporate website handles information: no advertising trackers or analytics, and separate privacy practices for business websites.',
    },
    terms: {
      title: 'Terms of Use | BYHADARA Group',
      description:
        'Terms of use for the BYHADARA Group corporate website: its informational purpose, its limitations, and the independently operated business websites it links to.',
    },
  },
  ar: {
    '': {
      title: 'مجموعة باي حضارة BYHADARA | استثمار وتطوير أعمال في إسطنبول',
      description:
        'مجموعة باي حضارة مجموعة للاستثمار وتطوير الأعمال مقرها إسطنبول، تضم شركتين متخصصتين: حضارة العقارية للتطوير العقاري وحضارة للضيافة لتوريد مستلزمات الفنادق.',
    },
    about: {
      title: 'عن مجموعة باي حضارة | مجموعة استثمار في إسطنبول',
      description:
        'تعرّف على مجموعة باي حضارة، مجموعة للاستثمار وتطوير الأعمال مقرها إسطنبول، تجمع شركات مسجلة بشكل مستقل تعمل في قطاعات متخصصة.',
    },
    businesses: {
      title: 'شركاتنا: العقارات ومستلزمات الضيافة | مجموعة باي حضارة',
      description:
        'اكتشف شركات مجموعة باي حضارة: حضارة العقارية للتطوير والاستثمار العقاري في تركيا، وحضارة للضيافة لتوريد المنسوجات الفندقية ومستلزمات الضيافة.',
    },
    'businesses/real-estate': {
      title: 'حضارة العقارية | فلل فاخرة ومشاريع سكنية في إسطنبول',
      description:
        'حضارة العقارية، إحدى شركات مجموعة باي حضارة، تطوّر منذ 2014 فللاً فاخرة ومشاريع سكنية عالية الجودة في إسطنبول، منها Lotus Yaşam وLotus Koru.',
    },
    'businesses/hospitality': {
      title: 'حضارة للضيافة | منسوجات فندقية ومستلزمات ضيافة من تركيا',
      description:
        'حضارة للضيافة، إحدى شركات مجموعة باي حضارة، تورّد من تركيا بياضات الفنادق والمناشف وأردية الحمام ومستلزمات الضيوف لفنادق 3 إلى 5 نجوم في الخليج وأوروبا.',
    },
    markets: {
      title: 'أسواقنا: تركيا والخليج ومصر | مجموعة باي حضارة',
      description:
        'من مقرها في إسطنبول، تعمل مجموعة باي حضارة على تعزيز الروابط التجارية في تركيا ودول الخليج ومصر، بنهج يقوم على فهم كل سوق.',
    },
    'markets/turkiye': {
      title: 'تركيا: مقر أعمالنا في إسطنبول | مجموعة باي حضارة',
      description:
        'إسطنبول مقر مجموعة باي حضارة وقاعدة عملياتها الرئيسية، ومنها تنطلق أنشطة التطوير العقاري وتوريد مستلزمات الضيافة في تركيا.',
    },
    'markets/gcc': {
      title: 'أسواق الخليج: توريد الضيافة والشراكات | مجموعة باي حضارة',
      description:
        'دول الخليج منطقة رئيسية لعلاقات توريد مستلزمات الضيافة وتطوير الأعمال الإقليمي لدى مجموعة باي حضارة، مع التركيز على التعاون التجاري طويل الأمد.',
    },
    'markets/egypt': {
      title: 'مصر: فرص أعمال مستقبلية | مجموعة باي حضارة',
      description:
        'مصر سوق تهتم به مجموعة باي حضارة لاستكشاف فرص تطوير الأعمال والعلاقات التجارية والشركاء المتوافقين مع توجه نمو المجموعة.',
    },
    partnerships: {
      title: 'الشراكات وفرص الاستثمار | مجموعة باي حضارة',
      description:
        'شارك مجموعة باي حضارة في التعاون الاستثماري وشراكات التطوير العقاري والتصنيع والتوريد وتطوير الأعمال الإقليمي مع المستثمرين والمطورين والموردين.',
    },
    insights: {
      title: 'الرؤى والأخبار | مجموعة باي حضارة',
      description:
        'رؤى تجارية وتحليلات للأسواق ومستجدات مجموعة باي حضارة في العقارات والضيافة والتجارة عبر تركيا ودول الخليج ومصر.',
    },
    contact: {
      title: 'تواصل مع مجموعة باي حضارة | إسطنبول، تركيا',
      description: `تواصل مع مجموعة باي حضارة في إسطنبول عبر ${site.email} أو ${site.phone} لمناقشة فرص الاستثمار والشراكات الاستراتيجية.`,
    },
    'contact/thank-you': {
      title: 'شكراً لتواصلكم – تم استلام الطلب | مجموعة باي حضارة',
      description:
        'شكراً لتواصلكم مع مجموعة باي حضارة. وصل طلبكم إلى فريقنا في إسطنبول، وسنتواصل معكم على رقم الهاتف الذي زودتمونا به بعد دراسة الطلب بعناية.',
    },
    'inquiries/investment': {
      title: 'استفسار عن فرص الاستثمار | مجموعة باي حضارة',
      description:
        'عرّف بنفسك وقدّم وصفاً واضحاً لمقترحك لاستكشاف فرص الاستثمار والمشاريع المشتركة مع مجموعة باي حضارة في إسطنبول.',
    },
    'inquiries/partnership': {
      title: 'طلب شراكة استراتيجية | مجموعة باي حضارة',
      description:
        'للمطورين والمصنّعين والموردين وشركاء الأعمال الإقليميين: عرّف بشركتك ومقترحك لتصبح شريكاً استراتيجياً لمجموعة باي حضارة.',
    },
    privacy: {
      title: 'سياسة الخصوصية | مجموعة باي حضارة',
      description:
        'كيف يتعامل الموقع المؤسسي لمجموعة باي حضارة مع المعلومات: لا أدوات تتبع إعلانية أو تحليلات، ولمواقع الشركات سياسات خصوصية خاصة بها.',
    },
    terms: {
      title: 'شروط الاستخدام | مجموعة باي حضارة',
      description:
        'شروط استخدام الموقع المؤسسي لمجموعة باي حضارة: غرضه المعلوماتي وحدود استخدامه، والعلاقة بمواقع الشركات المستقلة المرتبطة به.',
    },
  },
  tr: {
    '': {
      title: 'BYHADARA Group | İstanbul Yatırım ve İş Geliştirme Grubu',
      description:
        'BYHADARA Group; HADARA Real Estate ve HADARA Hospitality’yi bünyesinde toplayan, İstanbul merkezli bir yatırım ve iş geliştirme grubudur.',
    },
    about: {
      title: 'Hakkımızda – İstanbul Merkezli Yatırım Grubu | BYHADARA Group',
      description:
        'BYHADARA Group, uzman sektörlerde faaliyet gösteren bağımsız tescilli şirketleri bir araya getiren İstanbul merkezli bir yatırım ve iş geliştirme grubudur.',
    },
    businesses: {
      title: 'Şirketlerimiz – Gayrimenkul ve Otel Tedariki | BYHADARA Group',
      description:
        'BYHADARA Group şirketleri: Türkiye’de gayrimenkul geliştirme için HADARA Real Estate, otel tekstili ve konaklama ürünleri için HADARA Hospitality.',
    },
    'businesses/real-estate': {
      title: 'HADARA Real Estate – İstanbul’da Lüks Villalar | BYHADARA Group',
      description:
        'Bir BYHADARA Group şirketi olan HADARA Real Estate, 2014’ten bu yana İstanbul’da lüks villalar ve Lotus Yaşam, Lotus Koru gibi konut projeleri geliştirir.',
    },
    'businesses/hospitality': {
      title: 'HADARA Hospitality – Otel Tekstili ve Tedarik | BYHADARA Group',
      description:
        'Bir BYHADARA Group şirketi olan HADARA Hospitality, Türkiye’den Körfez ve Avrupa’daki 3★–5★ otellere otel tekstili, havlu, bornoz ve misafir ürünleri tedarik eder.',
    },
    markets: {
      title: 'Pazarlarımız – Türkiye, Körfez ve Mısır | BYHADARA Group',
      description:
        'İstanbul merkezli BYHADARA Group; Türkiye, Körfez ülkeleri ve Mısır’da her pazarın koşullarını gözeten güçlü ticari bağlantılar kurmayı hedefler.',
    },
    'markets/turkiye': {
      title: 'Türkiye – İstanbul’daki Faaliyet Merkezimiz | BYHADARA Group',
      description:
        'İstanbul, BYHADARA Group’un genel merkezi ve ana faaliyet üssüdür; Türkiye’deki gayrimenkul geliştirme ve otel tedariki faaliyetlerini destekler.',
    },
    'markets/gcc': {
      title: 'Körfez Pazarları – Otel Tedariki ve Ortaklıklar | BYHADARA Group',
      description:
        'Körfez bölgesi, BYHADARA Group için otel tedariki ilişkileri ve bölgesel iş geliştirmede uzun vadeli ticari işbirliğine odaklanan kilit bir bölgedir.',
    },
    'markets/egypt': {
      title: 'Mısır – Gelecekteki İş Fırsatları | BYHADARA Group',
      description:
        'Mısır, BYHADARA Group’un iş geliştirme, ticari ilişkiler ve büyüme yönüyle uyumlu iş ortaklıkları açısından ilgilendiği bir pazardır.',
    },
    partnerships: {
      title: 'İş Ortaklıkları ve Yatırım İşbirliği | BYHADARA Group',
      description:
        'BYHADARA Group ile yatırım işbirliği, gayrimenkul geliştirme, üretim ve tedarik ile bölgesel iş geliştirme alanlarındaki ortaklık fırsatlarını keşfedin.',
    },
    insights: {
      title: 'İçgörüler ve Haberler | BYHADARA Group',
      description:
        'BYHADARA Group’tan Türkiye, Körfez ve Mısır’da gayrimenkul, konaklama ve ticarete dair iş perspektifleri, pazar içgörüleri ve grup haberleri.',
    },
    contact: {
      title: 'İletişim – BYHADARA Group, İstanbul',
      description: `Yatırım fırsatları ve stratejik ortaklıklar için İstanbul’daki BYHADARA Group ile ${site.email} veya ${site.phone} üzerinden iletişime geçin.`,
    },
    'contact/thank-you': {
      title: 'Teşekkürler – Talebiniz Alındı | BYHADARA Group',
      description:
        'BYHADARA Group ile iletişime geçtiğiniz için teşekkür ederiz. Talebiniz İstanbul’daki ekibimize ulaştı; ilettiğiniz telefon numarasından size dönüş yapacağız.',
    },
    'inquiries/investment': {
      title: 'Yatırım Fırsatları Başvurusu | BYHADARA Group',
      description:
        'Kendinizi tanıtın ve teklifinizi açıkça özetleyin; İstanbul’da BYHADARA Group ile yatırım fırsatlarını ve ortak girişimleri keşfedin.',
    },
    'inquiries/partnership': {
      title: 'Stratejik İş Ortaklığı Başvurusu | BYHADARA Group',
      description:
        'Geliştiriciler, üreticiler, tedarikçiler ve bölgesel iş ortakları: BYHADARA Group’un stratejik iş ortağı olmak için şirketinizi ve teklifinizi tanıtın.',
    },
    privacy: {
      title: 'Gizlilik Politikası | BYHADARA Group',
      description:
        'BYHADARA Group kurumsal web sitesi bilgileri nasıl işler: reklam takipçisi veya analitik kullanılmaz; şirket sitelerinin kendi gizlilik uygulamaları vardır.',
    },
    terms: {
      title: 'Kullanım Koşulları | BYHADARA Group',
      description:
        'BYHADARA Group kurumsal web sitesinin kullanım koşulları: bilgilendirme amacı, kullanım sınırları ve bağlantı verilen bağımsız şirket web siteleri.',
    },
  },
};
