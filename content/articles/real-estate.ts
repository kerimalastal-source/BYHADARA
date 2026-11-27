import type { Article } from '../articles';
import { companyUrl } from '../companies';
import { site, type Locale } from '../site';
const image = (file: string) => `/images/insights/${file}.jpg`;
const visitLabel = {
  en: 'Visit HADARA Real Estate',
  ar: 'زيارة موقع حضارة العقارية',
  tr: 'HADARA Real Estate’i ziyaret edin',
} as const;
/** Closing call to action leading to the HADARA Real Estate website. */
const visit = (locale: Locale, title: string, text: string) => ({
  title,
  text,
  label: visitLabel[locale],
  href: companyUrl('real-estate', locale),
});
/** A project's page on the real estate website (English without a prefix, no Turkish). */
const projectPage = (slug: string, arabic: boolean) =>
  `${site.realEstate}${arabic ? '/ar' : ''}/projects/${slug}`;
const lotusKoru2Page = (arabic: boolean) => projectPage('lotus-koru-2', arabic);
const marmaraHavenPage = (arabic: boolean) => projectPage('marmara-haven-villa', arabic);
const lotusSisliPage = (arabic: boolean) => projectPage('lotus-sisli', arabic);
const seaPearlPage = (arabic: boolean) => projectPage('sea-pearl-atakoy', arabic);
const credit = {
  hadara: {
    en: 'Photograph: HADARA Real Estate.',
    ar: 'تصوير: حضارة العقارية.',
    tr: 'Fotoğraf: HADARA Real Estate.',
  },
  lotus: {
    en: 'Architectural visualisation: Lotus Yapı Proje.',
    ar: 'تصميم معماري: لوتس يابي بروجي.',
    tr: 'Mimari görselleştirme: Lotus Yapı Proje.',
  },
  kuzu: {
    en: 'Images: Kuzu İnşaat.',
    ar: 'الصور: Kuzu İnşaat.',
    tr: 'Görseller: Kuzu İnşaat.',
  },
  mh: {
    en: 'Architectural visualisation: MH Grup İnşaat.',
    ar: 'تصميم معماري: MH Grup İnşaat.',
    tr: 'Mimari görselleştirme: MH Grup İnşaat.',
  },
} as const;
/**
 * Real estate insights on Türkiye and international markets. Facts follow the HADARA Real Estate
 * guides (İkinci BYHADARA, src/i18n/*.json "blogData") and its project pages; figures that change
 * by regulation (such as the citizenship threshold) are deliberately not quoted.
 */
export const realEstate: Article[] = [
  {
    slug: 'buying-property-in-turkiye',
    category: 'turkiye',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    related: ['marmara-haven-villa', 'beylikduzu-living', 'diamond-marin'],
    translations: {
      en: {
        title: 'Buying property in Türkiye: from reservation to title deed',
        seoTitle: 'Buying property in Türkiye: a step-by-step guide',
        description:
          'A clear guide for international buyers to purchasing property in Türkiye: choosing a unit, the reservation, payment, the valuation report and the title deed (tapu).',
        body: [
          'For international buyers, purchasing property in Türkiye follows a well-defined sequence. Knowing each step in advance makes the process calmer and helps avoid delays at the final stage.',
          'It begins with choosing the right unit and signing a reservation agreement that secures it. Payment follows, either in full or through an instalment plan agreed with the developer.',
          'Before the transfer, foreign buyers obtain a Turkish tax number, and a licensed appraiser prepares an official valuation report. The report sets an objective market value for the property and is a mandatory step before the title deed is transferred.',
          'The transfer itself takes place at the Land Registry Office, where the title deed, known as the tapu, is issued in the buyer’s name. Buyers can attend in person or appoint an authorised representative through a power of attorney.',
          'Beyond the purchase price, buyers should budget for the title deed transfer fee, calculated as a percentage of the declared value and usually shared between buyer and seller, the valuation report fee and, once the property is registered, a modest annual property tax paid to the municipality.',
          'Working with an experienced team keeps every step on schedule. HADARA Real Estate accompanies its buyers from the first viewing to the Land Registry Office, so the transfer is completed correctly and on time.',
        ],
        image: image('lotus-yasam-street'),
        imageAlt: 'Residential blocks with shops at street level in Beylikdüzü, Istanbul',
        imageCredit: credit.lotus.en,
        cta: visit(
          'en',
          'Explore projects in Istanbul',
          'Current projects, availability and viewings are on the HADARA Real Estate website.',
        ),
      },
      ar: {
        title: 'شراء عقار في تركيا: من الحجز إلى سند الملكية',
        seoTitle: 'شراء عقار في تركيا: دليل خطوة بخطوة',
        description:
          'دليل واضح للمشترين الدوليين لشراء عقار في تركيا: اختيار الوحدة، والحجز، والدفع، وتقرير التقييم العقاري، ثم نقل سند الملكية المعروف بالطابو باسم المشتري.',
        body: [
          'يتبع شراء العقار في تركيا بالنسبة للمشترين الدوليين تسلسلاً واضحاً، ومعرفة كل خطوة مسبقاً تجعل العملية أكثر سلاسة وتجنّب التأخير في المرحلة الأخيرة.',
          'تبدأ العملية باختيار الوحدة المناسبة وتوقيع اتفاقية حجز تضمنها، ثم يأتي الدفع، إما دفعة واحدة أو وفق خطة تقسيط يُتفق عليها مع المطوّر.',
          'وقبل نقل الملكية، يحصل المشتري الأجنبي على رقم ضريبي تركي، ويُعدّ خبير مرخّص تقرير تقييم رسمياً يحدد القيمة السوقية للعقار بشكل موضوعي، وهو خطوة إلزامية قبل نقل سند الملكية.',
          'ويتم نقل الملكية في مديرية السجل العقاري، حيث يصدر سند الملكية المعروف بالطابو باسم المشتري. ويمكن للمشتري الحضور بنفسه أو تعيين ممثل عنه بموجب وكالة رسمية.',
          'وإلى جانب سعر الشراء، ينبغي احتساب رسوم نقل الطابو، التي تُحسب نسبةً من القيمة المصرّح بها وتُقسم عادة بين البائع والمشتري، ورسوم تقرير التقييم، ثم ضريبة عقارية سنوية معتدلة تُدفع للبلدية بعد التسجيل.',
          'ويساعد العمل مع فريق متمرّس على إنجاز كل خطوة في موعدها، إذ ترافق حضارة العقارية مشتريها من المعاينة الأولى حتى مديرية السجل العقاري، ليتم نقل الملكية بشكل صحيح وفي الوقت المحدد.',
        ],
        image: image('lotus-yasam-street'),
        imageAlt: 'مبانٍ سكنية تعلوها محلات تجارية في شارع ببيليكدوزو في إسطنبول',
        imageCredit: credit.lotus.ar,
        cta: visit(
          'ar',
          'اكتشف مشاريعنا في إسطنبول',
          'المشاريع الحالية والوحدات المتاحة وطلبات المعاينة على موقع حضارة العقارية.',
        ),
      },
      tr: {
        title: 'Türkiye’de gayrimenkul satın almak: rezervasyondan tapuya',
        seoTitle: 'Türkiye’de gayrimenkul satın alma rehberi',
        description:
          'Uluslararası alıcılar için Türkiye’de gayrimenkul satın alma rehberi: daire seçimi, rezervasyon, ödeme, ekspertiz raporu ve tapu devri adım adım anlatılıyor.',
        body: [
          'Uluslararası alıcılar için Türkiye’de gayrimenkul satın almak belirli bir sırayı izler. Her adımı önceden bilmek süreci rahatlatır ve son aşamadaki gecikmelerin önüne geçer.',
          'Süreç, doğru daireyi seçmek ve onu güvence altına alan bir rezervasyon sözleşmesi imzalamakla başlar. Ardından ödeme gelir; tek seferde ya da geliştiriciyle kararlaştırılan bir taksit planıyla.',
          'Devirden önce yabancı alıcılar bir Türk vergi numarası alır ve lisanslı bir değerleme uzmanı resmi bir ekspertiz raporu hazırlar. Rapor, gayrimenkulün piyasa değerini objektif olarak belirler ve tapu devrinden önce zorunlu bir adımdır.',
          'Devir işlemi tapu müdürlüğünde gerçekleşir ve tapu alıcı adına düzenlenir. Alıcı işleme bizzat katılabilir veya vekâletname ile yetkili bir temsilci atayabilir.',
          'Satın alma bedelinin yanı sıra; beyan edilen değer üzerinden yüzde olarak hesaplanan ve genellikle alıcı ile satıcı arasında paylaşılan tapu harcı, ekspertiz raporu ücreti ve tescilden sonra belediyeye ödenen makul bir yıllık emlak vergisi bütçelenmelidir.',
          'Deneyimli bir ekiple çalışmak her adımın zamanında tamamlanmasını sağlar. HADARA Real Estate, alıcılarına ilk ziyaretten tapu müdürlüğüne kadar eşlik ederek devrin doğru ve zamanında yapılmasını sağlar.',
        ],
        image: image('lotus-yasam-street'),
        imageAlt: 'Beylikdüzü’nde zemin katında mağazalar bulunan konut blokları',
        imageCredit: credit.lotus.tr,
        cta: visit(
          'tr',
          'İstanbul’daki projelerimizi keşfedin',
          'Güncel projeler, müsait daireler ve ziyaret talepleri HADARA Real Estate web sitesinde.',
        ),
      },
    },
  },
  {
    slug: 'turkish-citizenship-through-real-estate',
    category: 'investment',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    related: ['marmara-haven-villa', 'beylikduzu-living', 'lotus-koru-2'],
    translations: {
      en: {
        title: 'Turkish citizenship through real estate: how the route works',
        seoTitle: 'Turkish citizenship through real estate',
        description:
          'How buying qualifying property in Türkiye can lead to Turkish citizenship for investors and their families, the steps involved and what to confirm before buying.',
        body: [
          'Türkiye’s citizenship-by-investment programme is one of the most accessible routes to a second citizenship. Among its qualifying routes, real estate is the one most international investors choose.',
          'Under the current rules, a foreign national who buys property above the minimum value set by regulation, and undertakes not to sell it for at least three years, may apply for citizenship together with a spouse and children under 18.',
          'The process combines the property purchase, an official valuation report that confirms its value, and a citizenship application submitted to the relevant authorities once the purchase is registered.',
          'The appeal goes beyond the passport. Investors gain a foothold in a large, growing property market, rental income potential and a base in a country that connects Europe, Asia and the Middle East.',
          'Because thresholds and documentation can be updated by the Turkish government, it is important to confirm the latest requirements before committing. HADARA Real Estate’s advisers check the current rules with each investor and help select projects that qualify.',
        ],
        image: '/images/istanbul-bosphorus.jpg',
        imageAlt: 'The Bosphorus and its bridge seen from above Istanbul',
        imageCredit: 'Photo: Kaan Kosemen, Unsplash.',
        cta: {
          title: 'Discuss an investment',
          text: 'Share your plans and our team in Istanbul will get back to you.',
          label: 'Explore investment opportunities',
          href: '/en/inquiries/investment',
        },
      },
      ar: {
        title: 'الجنسية التركية عبر الاستثمار العقاري: كيف يعمل هذا المسار',
        seoTitle: 'الجنسية التركية عبر الاستثمار العقاري',
        description:
          'كيف يمكن لشراء عقار مؤهل في تركيا أن يفتح الطريق إلى الجنسية التركية للمستثمر وعائلته، وما خطوات العملية، وما الذي ينبغي التحقق منه قبل الشراء.',
        body: [
          'يُعد برنامج الجنسية التركية عبر الاستثمار من أيسر الطرق للحصول على جنسية ثانية، ومن بين مساراته المؤهلة يبقى العقار الخيار الأكثر إقبالاً لدى المستثمرين الدوليين.',
          'ووفق القواعد الحالية، يحق للأجنبي الذي يشتري عقاراً تتجاوز قيمته الحد الأدنى المحدد في اللوائح، ويتعهد بعدم بيعه لمدة ثلاث سنوات على الأقل، التقدم بطلب الجنسية مع الزوج أو الزوجة والأبناء دون سن الثامنة عشرة.',
          'وتجمع العملية بين شراء العقار، وتقرير تقييم رسمي يؤكد قيمته، وطلب جنسية يُقدَّم إلى الجهات المختصة بعد تسجيل الشراء.',
          'ولا تقتصر الجاذبية على جواز السفر، إذ يحصل المستثمر على موطئ قدم في سوق عقارية كبيرة ونامية، وإمكانية دخل إيجاري، وقاعدة في بلد يربط أوروبا وآسيا والشرق الأوسط.',
          'ولأن الحدود المطلوبة والمستندات قد تُحدَّث بقرارات حكومية، من المهم التحقق من أحدث المتطلبات قبل الالتزام. ويراجع مستشارو حضارة العقارية القواعد السارية مع كل مستثمر، ويساعدونه في اختيار مشاريع مؤهلة.',
        ],
        image: '/images/istanbul-bosphorus.jpg',
        imageAlt: 'مضيق البوسفور وجسره من أعلى إسطنبول',
        imageCredit: 'الصورة: Kaan Kosemen، Unsplash.',
        cta: {
          title: 'ناقش استثمارك معنا',
          text: 'شاركنا خططك وسيتواصل معك فريقنا في إسطنبول.',
          label: 'استكشف فرص الاستثمار',
          href: '/ar/inquiries/investment',
        },
      },
      tr: {
        title: 'Gayrimenkul yatırımıyla Türk vatandaşlığı: süreç nasıl işler?',
        seoTitle: 'Gayrimenkul yatırımıyla Türk vatandaşlığı',
        description:
          'Türkiye’de uygun bir gayrimenkul almanın yatırımcı ve ailesi için vatandaşlığa nasıl kapı açtığı, sürecin adımları ve satın almadan önce kontrol edilecekler.',
        body: [
          'Türkiye’nin yatırım yoluyla vatandaşlık programı, ikinci bir vatandaşlığa giden en erişilebilir yollardan biridir. Programın uygun yatırım seçenekleri arasında uluslararası yatırımcıların en çok tercih ettiği gayrimenkuldür.',
          'Mevcut kurallara göre, mevzuatta belirlenen asgari değerin üzerinde gayrimenkul satın alan ve bunu en az üç yıl satmamayı taahhüt eden yabancı bir kişi; eşi ve 18 yaşından küçük çocuklarıyla birlikte vatandaşlık başvurusunda bulunabilir.',
          'Süreç; gayrimenkulün satın alınmasını, değeri teyit eden resmi bir ekspertiz raporunu ve satış tescil edildikten sonra ilgili makamlara yapılan vatandaşlık başvurusunu kapsar.',
          'Cazibe pasaportla sınırlı değildir. Yatırımcı büyük ve büyüyen bir gayrimenkul piyasasında yer edinir, kira geliri potansiyeli kazanır ve Avrupa, Asya ile Orta Doğu’yu birbirine bağlayan bir ülkede bir üs elde eder.',
          'Eşikler ve belgeler hükümet kararlarıyla güncellenebildiğinden, taahhütte bulunmadan önce güncel şartları teyit etmek önemlidir. HADARA Real Estate danışmanları her yatırımcıyla yürürlükteki kuralları kontrol eder ve uygun projelerin seçilmesine yardımcı olur.',
        ],
        image: '/images/istanbul-bosphorus.jpg',
        imageAlt: 'İstanbul’un yukarısından Boğaz ve köprüsü',
        imageCredit: 'Fotoğraf: Kaan Kosemen, Unsplash.',
        cta: {
          title: 'Yatırımınızı konuşalım',
          text: 'Planlarınızı paylaşın, İstanbul’daki ekibimiz size dönüş yapsın.',
          label: 'Yatırım fırsatlarını keşfedin',
          href: '/tr/inquiries/investment',
        },
      },
    },
  },
  {
    slug: 'western-istanbul-beylikduzu-buyukcekmece',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    related: ['marmara-haven-villa', 'beylikduzu-living', 'lotus-koru-2'],
    translations: {
      en: {
        title: 'Western Istanbul: why Beylikdüzü and Büyükçekmece draw families and investors',
        seoTitle: 'Western Istanbul: Beylikdüzü and Büyükçekmece',
        description:
          'Beylikdüzü and Büyükçekmece on Istanbul’s European side combine the coast, marinas, new infrastructure and modern residential communities. Why they stand out.',
        body: [
          'Istanbul is Türkiye’s largest city and its economic heart, and its growth has increasingly moved west along the European side. In districts such as Beylikdüzü and Büyükçekmece, new infrastructure, shopping centres and residential communities continue to reshape the skyline.',
          'Much of the appeal is the setting. The Sea of Marmara is never far away: West Istanbul Marina and the Beylikdüzü Yaşam Vadisi park are within easy reach in Beylikdüzü, while Büyükçekmece offers a long coastline, beaches and Güzelce Marina.',
          'Connections matter too. The Metrobüs line links the area with the rest of the city, and shopping centres such as MarmaraPark and private hospitals such as Medicana International Istanbul are close by.',
          'The homes on offer have changed as well. Instead of standalone blocks, many new projects are planned communities with landscaped gardens, pools, sports facilities and 24/7 security, while villa enclaves in Beylikdüzü and Büyükçekmece add private gardens and sea-view terraces.',
          'For families, that means space, greenery and the sea within the city. For investors, it means steady demand from residents looking for exactly that, supported by the area’s continuing development.',
          'HADARA Real Estate’s portfolio is concentrated here, from Lotus Koru and Lotus Yaşam in Beylikdüzü to Marmara Haven Villa in Büyükçekmece.',
        ],
        image: image('western-istanbul-villas'),
        imageAlt: 'Villas with private gardens among trees in Büyükçekmece, western Istanbul',
        imageCredit: credit.lotus.en,
        cta: visit(
          'en',
          'Projects in western Istanbul',
          'See the HADARA Real Estate portfolio in Beylikdüzü, Büyükçekmece and beyond.',
        ),
      },
      ar: {
        title: 'غرب إسطنبول: لماذا تجذب بيليكدوزو وبيوكجكمجة العائلات والمستثمرين',
        seoTitle: 'غرب إسطنبول: بيليكدوزو وبيوكجكمجة',
        description:
          'تجمع بيليكدوزو وبيوكجكمجة على الجانب الأوروبي من إسطنبول بين الساحل والمارينات والبنية التحتية الحديثة والمجمعات السكنية المتكاملة. إليك ما يميزهما.',
        body: [
          'إسطنبول أكبر مدن تركيا وقلبها الاقتصادي، ويتجه نموها بشكل متزايد نحو الغرب على الجانب الأوروبي، حيث تعيد البنية التحتية الجديدة ومراكز التسوق والمجمعات السكنية رسم ملامح مناطق مثل بيليكدوزو وبيوكجكمجة.',
          'ويكمن جزء كبير من الجاذبية في الموقع، فبحر مرمرة قريب دائماً: مارينا غرب إسطنبول ومنتزه وادي الحياة في متناول سكان بيليكدوزو، بينما تقدم بيوكجكمجة ساحلاً طويلاً وشواطئ ومارينا غوزلجه.',
          'وللمواصلات أهميتها أيضاً، إذ يربط خط المتروبوس المنطقة ببقية المدينة، وتقع بالقرب منها مراكز تسوق مثل مرمرة بارك ومستشفيات خاصة مثل مستشفى ميديكانا الدولي.',
          'كما تغيّر شكل المساكن المعروضة، فبدلاً من المباني المنفردة، باتت مشاريع كثيرة مجمعات مخططة بحدائق منسّقة ومسابح ومرافق رياضية وحراسة على مدار الساعة، فيما تضيف مجمعات الفلل في بيليكدوزو وبيوكجكمجة حدائق خاصة وتراسات مطلة على البحر.',
          'بالنسبة للعائلات، يعني ذلك المساحة والخضرة والبحر داخل المدينة، وبالنسبة للمستثمرين طلباً مستمراً من سكان يبحثون عن ذلك تحديداً، يدعمه التطور المتواصل للمنطقة.',
          'وتتركز محفظة حضارة العقارية في هذا الجزء من إسطنبول، من لوتس كورو ولوتس ياشام في بيليكدوزو إلى فيلا مرمرة هيفن في بيوكجكمجة.',
        ],
        image: image('western-istanbul-villas'),
        imageAlt: 'فلل بحدائق خاصة بين الأشجار في بيوكجكمجة غرب إسطنبول',
        imageCredit: credit.lotus.ar,
        cta: visit(
          'ar',
          'مشاريعنا في غرب إسطنبول',
          'تعرّف على محفظة حضارة العقارية في بيليكدوزو وبيوكجكمجة وما حولهما.',
        ),
      },
      tr: {
        title: 'Batı İstanbul: Beylikdüzü ve Büyükçekmece neden aileleri ve yatırımcıları çekiyor?',
        seoTitle: 'Batı İstanbul: Beylikdüzü ve Büyükçekmece',
        description:
          'İstanbul’un Avrupa yakasındaki Beylikdüzü ve Büyükçekmece; sahili, marinaları, yeni altyapısı ve modern konut projeleriyle öne çıkıyor. İşte bunun nedenleri.',
        body: [
          'İstanbul, Türkiye’nin en büyük şehri ve ekonomik kalbidir; büyümesi giderek Avrupa yakasında batıya doğru kayıyor. Beylikdüzü ve Büyükçekmece gibi ilçelerde yeni altyapı, alışveriş merkezleri ve konut projeleri silueti yeniden şekillendiriyor.',
          'Cazibenin önemli bir kısmı konumdan geliyor. Marmara Denizi hep yakında: Batı İstanbul Marina ve Beylikdüzü Yaşam Vadisi, Beylikdüzü sakinlerinin kolayca ulaşabileceği mesafede; Büyükçekmece ise uzun bir sahil şeridi, plajlar ve Güzelce Marina sunuyor.',
          'Ulaşım da önemli. Metrobüs hattı bölgeyi şehrin geri kalanına bağlıyor; MarmaraPark gibi alışveriş merkezleri ve Medicana International İstanbul gibi özel hastaneler yakında bulunuyor.',
          'Sunulan konutlar da değişti. Tek başına bloklar yerine birçok yeni proje; peyzajlı bahçeleri, havuzları, spor alanları ve 7/24 güvenliğiyle planlı yaşam alanları olarak tasarlanıyor. Beylikdüzü ve Büyükçekmece’deki villa projeleri ise özel bahçeler ve deniz manzaralı teraslar ekliyor.',
          'Aileler için bu; şehrin içinde alan, yeşil ve deniz demek. Yatırımcılar için ise tam da bunu arayan sakinlerden gelen ve bölgenin süregelen gelişimiyle desteklenen istikrarlı bir talep.',
          'HADARA Real Estate’in portföyü de bu bölgede yoğunlaşıyor: Beylikdüzü’ndeki Lotus Koru ve Lotus Yaşam’dan Büyükçekmece’deki Marmara Haven Villa’ya.',
        ],
        image: image('western-istanbul-villas'),
        imageAlt: 'Batı İstanbul’da, Büyükçekmece’de ağaçlar arasında özel bahçeli villalar',
        imageCredit: credit.lotus.tr,
        cta: visit(
          'tr',
          'Batı İstanbul’daki projelerimiz',
          'HADARA Real Estate’in Beylikdüzü, Büyükçekmece ve çevresindeki portföyünü keşfedin.',
        ),
      },
    },
  },
  {
    slug: 'what-homebuyers-expect-today',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    related: ['beylikduzu-living', 'diamond-marin', 'marmara-haven-villa'],
    translations: {
      en: {
        title: 'What homebuyers around the world expect from a new home today',
        seoTitle: 'What homebuyers expect from a new home today',
        description:
          'From build quality and energy efficiency to amenities, security and flexible space, homebuyers’ priorities are shifting worldwide, and Istanbul is no exception.',
        body: [
          'Across major cities, the questions buyers ask about a new home have changed. Location and price still come first, but the conversation quickly moves to how a home is built, how it performs and how it supports daily life.',
          'Build quality has become a headline criterion. Buyers look closely at materials, insulation and the reputation of the developer behind a project, knowing that these decide how a home ages and how it holds its value.',
          'Energy efficiency follows close behind. Heat and sound insulation, efficient heating and cooling, and smart home systems lower running costs and add comfort, and buyers increasingly compare them project by project.',
          'Shared amenities now shape the choice of a home as much as the apartment itself. Landscaped gardens, fitness centres, pools, children’s play areas, walking tracks, covered parking and round-the-clock security turn a building into a community.',
          'Space is used differently, too. Many buyers want room to work from home, generous balconies and terraces, and storage such as dressing and laundry rooms.',
          'These priorities are shaping new projects in Istanbul as well, and they guide the developments HADARA Real Estate presents to its buyers, from family residences to villas with private gardens.',
        ],
        image: image('lotus-manzara-living-room'),
        imageAlt: 'Open-plan living room in a contemporary villa',
        imageCredit: credit.lotus.en,
        cta: visit(
          'en',
          'Discover our projects',
          'Current projects and available homes are on the HADARA Real Estate website.',
        ),
      },
      ar: {
        title: 'ما الذي يتوقعه مشترو المنازل حول العالم من المسكن الجديد اليوم',
        seoTitle: 'ما يتوقعه المشترون من المسكن الجديد اليوم',
        description:
          'من جودة البناء وكفاءة الطاقة إلى المرافق والأمان والمساحات المرنة، تتغير أولويات مشتري المنازل حول العالم، وإسطنبول ليست استثناءً من هذا التحول.',
        body: [
          'في المدن الكبرى حول العالم، تغيّرت الأسئلة التي يطرحها المشترون عن المسكن الجديد. ما زال الموقع والسعر في المقدمة، لكن الحديث ينتقل سريعاً إلى طريقة بناء المسكن وأدائه وكيف يخدم الحياة اليومية.',
          'أصبحت جودة البناء معياراً رئيسياً، إذ يدقق المشترون في المواد والعزل وسمعة المطوّر، لأنها تحدد كيف يصمد المسكن مع الزمن وكيف يحافظ على قيمته.',
          'وتليها كفاءة الطاقة، فالعزل الحراري والصوتي وأنظمة التدفئة والتبريد الفعالة وأنظمة المنزل الذكي تخفض تكاليف التشغيل وتزيد الراحة، ويقارنها المشترون بشكل متزايد بين مشروع وآخر.',
          'وباتت المرافق المشتركة تؤثر في اختيار المسكن بقدر الشقة نفسها، فالحدائق المنسّقة والصالات الرياضية والمسابح ومناطق لعب الأطفال ومسارات المشي والمواقف المغطاة والحراسة على مدار الساعة تحوّل المبنى إلى مجتمع متكامل.',
          'كما تُستخدم المساحات بطريقة مختلفة، فكثير من المشترين يريدون مكاناً للعمل من المنزل، وشرفات وتراسات واسعة، ومساحات تخزين مثل غرف الملابس والغسيل.',
          'وتنعكس هذه الأولويات على المشاريع الجديدة في إسطنبول أيضاً، وتوجّه المشاريع التي تقدمها حضارة العقارية لمشتريها، من المساكن العائلية إلى الفلل ذات الحدائق الخاصة.',
        ],
        image: image('lotus-manzara-living-room'),
        imageAlt: 'غرفة معيشة مفتوحة في فيلا عصرية',
        imageCredit: credit.lotus.ar,
        cta: visit(
          'ar',
          'اكتشف مشاريعنا',
          'المشاريع الحالية والوحدات المتاحة على موقع حضارة العقارية.',
        ),
      },
      tr: {
        title: 'Dünyada ev alıcıları bugün yeni bir evden ne bekliyor?',
        seoTitle: 'Ev alıcıları bugün yeni bir evden ne bekliyor?',
        description:
          'Yapı kalitesi ve enerji verimliliğinden sosyal olanaklara, güvenliğe ve esnek alanlara kadar alıcıların öncelikleri dünyada değişiyor; İstanbul da istisna değil.',
        body: [
          'Dünyanın büyük şehirlerinde alıcıların yeni bir ev hakkında sorduğu sorular değişti. Konum ve fiyat hâlâ ilk sırada, ancak konuşma hızla evin nasıl inşa edildiğine, nasıl performans gösterdiğine ve günlük yaşamı nasıl desteklediğine geçiyor.',
          'Yapı kalitesi başlıca kriterlerden biri hâline geldi. Alıcılar malzemeleri, yalıtımı ve projenin arkasındaki geliştiricinin itibarını yakından inceliyor; çünkü bunlar evin zamanla nasıl yaşlanacağını ve değerini nasıl koruyacağını belirliyor.',
          'Enerji verimliliği hemen ardından geliyor. Isı ve ses yalıtımı, verimli ısıtma ve soğutma ile akıllı ev sistemleri işletme maliyetlerini düşürüyor ve konforu artırıyor; alıcılar bunları giderek daha fazla proje proje karşılaştırıyor.',
          'Ortak olanaklar artık ev seçiminde dairenin kendisi kadar belirleyici. Peyzajlı bahçeler, fitness merkezleri, havuzlar, çocuk oyun alanları, yürüyüş parkurları, kapalı otopark ve 7/24 güvenlik bir binayı bir yaşam alanına dönüştürüyor.',
          'Alanlar da farklı kullanılıyor. Pek çok alıcı evden çalışmak için yer, geniş balkon ve teraslar, giyinme ve çamaşır odası gibi depolama alanları istiyor.',
          'Bu öncelikler İstanbul’daki yeni projeleri de şekillendiriyor ve HADARA Real Estate’in alıcılarına sunduğu projelere, aile konutlarından özel bahçeli villalara kadar yön veriyor.',
        ],
        image: image('lotus-manzara-living-room'),
        imageAlt: 'Çağdaş bir villada açık plan oturma odası',
        imageCredit: credit.lotus.tr,
        cta: visit(
          'tr',
          'Projelerimizi keşfedin',
          'Güncel projeler ve müsait konutlar HADARA Real Estate web sitesinde.',
        ),
      },
    },
  },
  {
    slug: 'off-plan-or-ready-property',
    category: 'investment',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    related: ['beylikduzu-living', 'diamond-marin', 'lotus-koru-2'],
    translations: {
      en: {
        title: 'Off-plan or ready to move in? How to judge a new residential project',
        seoTitle: 'Off-plan or ready property: what to check',
        description:
          'Buying off-plan can offer better prices and payment plans, while a ready home removes delivery risk. Here is what to check before choosing a new residential project.',
        body: [
          'Many of the most attractive new homes are sold before they are finished. Buying off-plan often means a better entry price, a wider choice of units and payments spread over the construction period, while a completed home offers certainty from day one.',
          'The first thing to judge is the developer. Completed projects, delivery record and construction quality say more than any brochure, and visiting a finished development is the best way to see them.',
          'Next comes the paperwork. In Türkiye, check that the project has its building permit and ask which title deed you will receive: units under construction can be registered with a construction servitude (kat irtifakı), which becomes full condominium ownership (kat mülkiyeti) once the building is completed and receives its occupancy permit.',
          'Read the sales contract carefully. The delivery date, specifications, what happens in case of delay and the payment schedule should all be written down, not only promised.',
          'A ready home, on the other hand, lets you see exactly what you are buying, move in or rent it out at once and avoid construction risk, usually at a higher price and with shorter payment terms.',
          'Neither choice suits everyone. HADARA Real Estate presents both new launches and completed projects, and helps buyers weigh timing, budget and goals before they decide.',
        ],
        image: image('cadde-ispartakule-tower'),
        imageAlt: 'New residential tower beside a landscaped park in western Istanbul',
        imageCredit: credit.mh.en,
        cta: visit(
          'en',
          'Compare new launches and completed homes',
          'Browse current projects on the HADARA Real Estate website.',
        ),
      },
      ar: {
        title: 'على المخطط أم جاهز للسكن؟ كيف تقيّم مشروعاً سكنياً جديداً',
        seoTitle: 'العقار على المخطط أم الجاهز: ما الذي تتحقق منه',
        description:
          'قد يمنح الشراء على المخطط سعراً أفضل وخطط دفع مريحة، بينما يزيل المسكن الجاهز مخاطر التسليم. إليك ما ينبغي التحقق منه قبل اختيار مشروع سكني جديد.',
        body: [
          'يُباع كثير من أجمل المساكن الجديدة قبل اكتمالها، فالشراء على المخطط يعني غالباً سعر دخول أفضل وخيارات أوسع من الوحدات ودفعات موزعة على فترة البناء، بينما يمنح المسكن المكتمل يقيناً منذ اليوم الأول.',
          'أول ما ينبغي تقييمه هو المطوّر، فالمشاريع المنجزة وسجل التسليم وجودة البناء تقول أكثر من أي كتيّب، وزيارة مشروع مكتمل هي أفضل طريقة لرؤيتها.',
          'ثم تأتي الأوراق. في تركيا، تأكد من حصول المشروع على رخصة البناء، واسأل عن نوع سند الملكية الذي ستحصل عليه: يمكن تسجيل الوحدات قيد الإنشاء بسند ارتفاق طابقي (kat irtifakı)، يتحول إلى ملكية طابقية كاملة (kat mülkiyeti) بعد اكتمال المبنى وحصوله على رخصة السكن.',
          'واقرأ عقد البيع بعناية، فموعد التسليم والمواصفات وما يحدث في حال التأخير وجدول الدفع ينبغي أن تُكتب جميعها، لا أن يُكتفى بالوعد بها.',
          'أما المسكن الجاهز فيتيح لك رؤية ما تشتريه تماماً، والسكن فيه أو تأجيره فوراً، وتجنّب مخاطر البناء، لكن غالباً بسعر أعلى وفترات دفع أقصر.',
          'لا يوجد خيار يناسب الجميع، إذ تقدم حضارة العقارية مشاريع جديدة وأخرى مكتملة، وتساعد المشترين على الموازنة بين التوقيت والميزانية والأهداف قبل اتخاذ القرار.',
        ],
        image: image('cadde-ispartakule-tower'),
        imageAlt: 'برج سكني جديد بجوار حديقة منسّقة في غرب إسطنبول',
        imageCredit: credit.mh.ar,
        cta: visit(
          'ar',
          'قارن بين المشاريع الجديدة والمكتملة',
          'تصفّح المشاريع الحالية على موقع حضارة العقارية.',
        ),
      },
      tr: {
        title: 'Projeden mi, hazır konut mu? Yeni bir konut projesi nasıl değerlendirilir?',
        seoTitle: 'Projeden mi, hazır konut mu? Nelere bakılmalı',
        description:
          'Projeden almak daha iyi fiyat ve ödeme planı sunabilir, hazır konut ise teslim riskini kaldırır. Yeni bir konut projesi seçmeden önce kontrol edilecekler.',
        body: [
          'En cazip yeni konutların birçoğu tamamlanmadan satılır. Projeden satın almak çoğu zaman daha iyi bir giriş fiyatı, daha geniş daire seçeneği ve inşaat süresine yayılan ödemeler anlamına gelir; tamamlanmış bir ev ise ilk günden kesinlik sunar.',
          'Değerlendirilecek ilk konu geliştiricidir. Tamamlanan projeler, teslim geçmişi ve yapı kalitesi her broşürden daha fazlasını anlatır; bunları görmenin en iyi yolu bitmiş bir projeyi ziyaret etmektir.',
          'Ardından belgeler gelir. Türkiye’de projenin yapı ruhsatı olduğunu kontrol edin ve hangi tür tapu alacağınızı sorun: inşaat hâlindeki bağımsız bölümler kat irtifakı ile tescil edilebilir; bina tamamlanıp iskân aldığında bu, kat mülkiyetine dönüşür.',
          'Satış sözleşmesini dikkatle okuyun. Teslim tarihi, teknik özellikler, gecikme hâlinde ne olacağı ve ödeme takvimi yalnızca vaat edilmemeli, yazılı olmalıdır.',
          'Hazır konut ise ne satın aldığınızı tam olarak görmenizi, hemen taşınmanızı veya kiraya vermenizi ve inşaat riskinden kaçınmanızı sağlar; genellikle daha yüksek bir fiyat ve daha kısa ödeme vadeleriyle.',
          'Herkese uyan tek bir seçenek yok. HADARA Real Estate hem yeni projeler hem de tamamlanmış projeler sunar ve alıcıların karar vermeden önce zamanlama, bütçe ve hedeflerini tartmasına yardımcı olur.',
        ],
        image: image('cadde-ispartakule-tower'),
        imageAlt: 'Batı İstanbul’da peyzajlı bir parkın yanında yeni bir konut kulesi',
        imageCredit: credit.mh.tr,
        cta: visit(
          'tr',
          'Yeni ve tamamlanmış projeleri karşılaştırın',
          'Güncel projelere HADARA Real Estate web sitesinden göz atın.',
        ),
      },
    },
  },
  {
    // Project facts from the İkinci BYHADARA real estate site (projects.ts and i18n "projectsData",
    // "lotus-koru-1" and "lotus-koru-2"). Two separate projects by Lotus Yapı Proje; HADARA Real
    // Estate is their marketing partner, never their developer. Searchers look for both names.
    slug: 'lotus-koru-1-and-2-beylikduzu',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-10-22',
    company: 'real-estate',
    related: ['lotus-koru-2', 'beylikduzu-living', 'diamond-marin'],
    translations: {
      en: {
        title: 'Lotus Koru 1 and Lotus Koru 2: two completed communities in Beylikdüzü',
        seoTitle: 'Lotus Koru 1 and 2 in Beylikdüzü, Istanbul',
        description:
          'Lotus Koru 1 and Lotus Koru 2 are two completed low-rise communities by Lotus Yapı Proje in Beylikdüzü: 144 homes now sold out, and 204 homes ready to move in.',
        body: [
          'Lotus Koru 1 and Lotus Koru 2 are two separate residential communities developed by Lotus Yapı Proje in Beylikdüzü, on the western side of Istanbul. Both are complete, and HADARA Real Estate, a BYHADARA Group company, is their marketing partner.',
          'Lotus Koru 1 was built between January 2022 and May 2024 on 10,500 m² of land, 6,500 m² of it landscaped, with a 7,000 m² municipal park in front of the project. Its 10 blocks of five floors hold 144 apartments and 27 shops in around 33,000 m² of construction. The community is fully sold.',
          'Lotus Koru 2 followed between 2023 and 2025 on a 15,005 m² plot, with 10,500 m² of landscaped green space and a 7,000 m² public park directly in front. Its 13 blocks of five floors hold 204 apartments in about 40,000 m² of construction, and its central Beylikdüzü location gives easy access to the rest of Istanbul.',
          'Residents of both communities share services that include separate swimming pools for men and women, a fitness centre, indoor parking, 24/7 security with camera surveillance and a backup generator.',
          'For buyers the difference is simple: Lotus Koru 1 is sold out, while Lotus Koru 2 is ready to move in, with apartments still available. Buyers abroad can start with a private video tour by HADARA Real Estate before visiting Istanbul.',
        ],
        image: '/images/real-estate/lotus-koru-2.jpg',
        imageAlt: 'Landscaped walkways and gardens between the residential blocks of Lotus Koru 2',
        imageCredit: credit.lotus.en,
        facts: [
          ['144', 'Apartments in Lotus\u00a0Koru\u00a01, sold out'],
          ['204', 'Apartments in Lotus\u00a0Koru\u00a02'],
          ['5 floors', 'Low-rise blocks in both'],
        ],
        gallery: [
          {
            src: image('lotus-koru-1-sports-court'),
            alt: 'Sports court, pool and walking path at Lotus Koru 1',
          },
          { src: image('lotus-koru-2-aerial'), alt: 'Aerial view of the Lotus Koru 2 blocks' },
        ],
        cta: {
          title: 'Discover Lotus Koru 2',
          text: 'Available apartments and viewing requests are on the HADARA Real Estate website.',
          label: 'View the project',
          href: lotusKoru2Page(false),
        },
      },
      ar: {
        title: 'لوتس كورو 1 ولوتس كورو 2: مجمّعان سكنيان مكتملان في بيليكدوزو',
        seoTitle: 'لوتس كورو 1 و2 في بيليكدوزو بإسطنبول',
        description:
          'لوتس كورو 1 ولوتس كورو 2 مجمّعان سكنيان مكتملان من تطوير لوتس يابي بروجي في بيليكدوزو: 144 شقة بيعت بالكامل، و204 شقق جاهزة للسكن مع وحدات متاحة.',
        body: [
          'لوتس كورو 1 ولوتس كورو 2 (Lotus Koru) مجمّعان سكنيان منفصلان من تطوير شركة لوتس يابي بروجي في بيليكدوزو، على الجانب الغربي من إسطنبول. اكتمل إنشاء المشروعين، وحضارة العقارية، إحدى شركات مجموعة باي حضارة، هي شريكهما التسويقي.',
          'شُيّد لوتس كورو 1 بين يناير 2022 ومايو 2024 على أرض مساحتها 10,500 م²، منها 6,500 م² مساحات خضراء منسّقة، وأمامه حديقة بلدية بمساحة 7,000 م². ويضم 10 مبانٍ من خمسة طوابق فيها 144 شقة و27 محلاً تجارياً، بمساحة بناء تبلغ نحو 33,000 م². وقد بيعت جميع وحداته.',
          'وتلاه لوتس كورو 2، الذي شُيّد بين عامي 2023 و2025 على قطعة أرض مساحتها 15,005 م²، فيها 10,500 م² من المساحات الخضراء المنسّقة، وأمامه مباشرة حديقة عامة بمساحة 7,000 م². ويضم 13 مبنى من خمسة طوابق فيها 204 شقق، بمساحة بناء تبلغ نحو 40,000 م²، ويتيح موقعه المركزي في بيليكدوزو سهولة الوصول إلى بقية إسطنبول.',
          'ويتشارك سكان المجمّعين خدمات تشمل مسابح منفصلة للرجال والنساء، وصالة رياضية، ومرآباً مغلقاً، وحراسة على مدار الساعة مع كاميرات مراقبة، ومولداً احتياطياً.',
          'والفرق بالنسبة للمشتري واضح: لوتس كورو 1 بيع بالكامل، أما لوتس كورو 2 فجاهز للسكن ولا تزال فيه شقق متاحة. ويمكن للمشترين من خارج تركيا البدء بجولة فيديو خاصة مع حضارة العقارية قبل زيارة إسطنبول.',
        ],
        image: '/images/real-estate/lotus-koru-2.jpg',
        imageAlt: 'ممرات وحدائق منسّقة بين المباني السكنية في لوتس كورو 2',
        imageCredit: credit.lotus.ar,
        facts: [
          ['144', 'شقة في لوتس\u00a0كورو\u00a01، بيعت بالكامل'],
          ['204', 'شقق في لوتس\u00a0كورو\u00a02'],
          ['5 طوابق', 'مبانٍ منخفضة في المشروعين'],
        ],
        gallery: [
          {
            src: image('lotus-koru-1-sports-court'),
            alt: 'ملعب رياضي ومسبح وممر مشي في لوتس كورو 1',
          },
          { src: image('lotus-koru-2-aerial'), alt: 'منظر جوي لمباني لوتس كورو 2' },
        ],
        cta: {
          title: 'اكتشف لوتس كورو 2',
          text: 'الشقق المتاحة وطلبات المعاينة على موقع حضارة العقارية.',
          label: 'عرض المشروع',
          href: lotusKoru2Page(true),
        },
      },
      tr: {
        title: 'Lotus Koru 1 ve Lotus Koru 2: Beylikdüzü’nde tamamlanan iki yaşam alanı',
        seoTitle: 'Beylikdüzü’nde Lotus Koru 1 ve Lotus Koru 2',
        description:
          'Lotus Koru 1 ve Lotus Koru 2, Lotus Yapı Proje’nin Beylikdüzü’nde tamamladığı iki az katlı konut projesi: satışı biten 144 daire ve taşınmaya hazır 204 daire.',
        body: [
          'Lotus Koru 1 ve Lotus Koru 2, Lotus Yapı Proje’nin İstanbul’un batı yakasında, Beylikdüzü’nde geliştirdiği iki ayrı konut projesidir. Her ikisi de tamamlandı; BYHADARA Group şirketlerinden HADARA Real Estate projelerin pazarlama ortağıdır.',
          'Lotus Koru 1, Ocak 2022 ile Mayıs 2024 arasında, 6.500 m²’si peyzaj alanı olan 10.500 m² arsa üzerinde inşa edildi; projenin önünde 7.000 m² belediye parkı bulunuyor. Beş katlı 10 blokta 144 daire ve 27 dükkân yer alıyor, toplam inşaat alanı yaklaşık 33.000 m². Projenin tüm daireleri satıldı.',
          'Lotus Koru 2, 2023–2025 yılları arasında 15.005 m² arsa üzerinde yükseldi; 10.500 m² peyzajlı yeşil alanı ve hemen önünde 7.000 m² kamu parkı var. Beş katlı 13 blokta 204 daire bulunuyor, toplam inşaat alanı yaklaşık 40.000 m². Beylikdüzü’nün merkezindeki konumu İstanbul’un her yerine kolay ulaşım sağlıyor.',
          'İki projenin sakinleri; kadınlar ve erkekler için ayrı yüzme havuzları, fitness merkezi, kapalı otopark, kamera sistemiyle desteklenen 7/24 güvenlik ve yedek jeneratör gibi ortak hizmetlerden yararlanıyor.',
          'Alıcılar için fark açık: Lotus Koru 1’in satışı tamamlandı, Lotus Koru 2 ise taşınmaya hazır ve satılık daireleri bulunuyor. Yurt dışındaki alıcılar, İstanbul’a gelmeden önce HADARA Real Estate ile özel bir video turla başlayabilir.',
        ],
        image: '/images/real-estate/lotus-koru-2.jpg',
        imageAlt: 'Lotus Koru 2 konut blokları arasındaki peyzajlı yürüyüş yolları ve bahçeler',
        imageCredit: credit.lotus.tr,
        facts: [
          ['144', 'Lotus\u00a0Koru\u00a01’de daire, satışı tamamlandı'],
          ['204', 'Lotus\u00a0Koru\u00a02’de daire'],
          ['5 kat', 'İki projede de az katlı bloklar'],
        ],
        gallery: [
          {
            src: image('lotus-koru-1-sports-court'),
            alt: 'Lotus Koru 1’de spor sahası, havuz ve yürüyüş yolu',
          },
          { src: image('lotus-koru-2-aerial'), alt: 'Lotus Koru 2 bloklarının havadan görünümü' },
        ],
        cta: {
          title: 'Lotus Koru 2’yi keşfedin',
          text: 'Satılık daireler ve ziyaret talepleri HADARA Real Estate web sitesinde.',
          label: 'Projeyi görüntüleyin',
          href: lotusKoru2Page(false),
        },
      },
    },
  },
  {
    slug: 'marmara-haven-villa-buyukcekmece',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-11-23',
    company: 'real-estate',
    related: ['marmara-haven-villa', 'lotus-yali', 'lotus-manzara-guzelce'],
    translations: {
      en: {
        title: 'Marmara Haven Villa: a private residence above the sea in Büyükçekmece',
        seoTitle: 'Marmara Haven Villa in Büyükçekmece, Istanbul',
        description:
          'Marmara Haven Villa, HADARA Real Estate’s own development in Büyükçekmece: 576.63 m² over four levels, a private pool, five bedrooms and Marmara Sea views.',
        body: [
          'Marmara Haven Villa is a private residence in Büyükçekmece, on the western shore of Istanbul, and the one project that HADARA Real Estate, a BYHADARA Group company, has developed itself. Set on a 637 m² plot, it offers 576.63 m² of gross living space over four levels, complete privacy, a private pool and panoramic views of the Sea of Marmara. Built between 2024 and 2026, the villa is complete and ready to move in.',
          'Because the villa is its own development, HADARA Real Estate is both the developer and the buyer’s single point of contact, from the first conversation to the handover of the keys. The company describes the house simply: a private sanctuary with panoramic views of the Marmara Sea.',
          '## A home arranged around the sea',
          'The ground floor opens through a main entrance with a marble floor and a storage room onto a 53 m² living room and a 24.70 m² kitchen. Both lead out to a 29.50 m² garden terrace and a 26 m² private swimming pool, so daily life moves easily between the house and the garden.',
          'The first floor holds four bedrooms and four bathrooms, a dressing room for the master suite, three balconies and a laundry room. Above it, the rooftop level adds a fifth bedroom with its own bathroom, a 34.88 m² living room with kitchen and a 24.49 m² roof terrace with open views over the Sea of Marmara: a second living space for quiet evenings and for receiving guests.',
          'The basement adapts to the owner’s way of life. It can be divided into rooms or a studio, or fitted out as a home cinema or gym, and it includes two spacious storage rooms, water and rainwater tanks and a bathroom. In all, the villa has five bedrooms and seven bathrooms.',
          '## Comfort built into the house',
          'An elevator serves every floor, and an integrated smart-home system controls lighting, heating and security from a phone. Underfloor heating, a modern high-efficiency fireplace and a private water well 220 metres deep complete the comfort. The villa was built with premium materials and luxury finishes, to the 2018 Turkish Earthquake Code, with a soil survey report and certificates.',
          '## Documents and location',
          'The villa has an independent title deed (müstakil tapu), a building permit issued by Büyükçekmece Municipality and its occupancy permit (iskan). It carries no encumbrance, a warranty is provided, the area is open to foreign residents’ registration, and the property may be eligible for Turkish citizenship under the programme’s conditions. The Marmara swimming coast is five minutes away, the E-5 highway three minutes and the E-80 (TEM) seven, while Istanbul Airport is about 37 minutes by road, First Avenue Mall 18 minutes and Mall of Istanbul 40.',
          'The project page on the HADARA Real Estate website presents the villa’s photographs, floor plans and a video tour that shows its spaces, its finishes and its view over the sea. Buyers abroad can begin with a private video tour with an advisor, then arrange a viewing in Istanbul, directly with the team that built the villa.',
        ],
        image: image('marmara-haven-villa-aerial'),
        imageAlt: 'Marmara Haven Villa seen from the air, with its private pool and timber terrace',
        imageCredit: credit.hadara.en,
        facts: [
          ['576.63 m²', 'Gross living space over four levels'],
          ['5 bedrooms', 'And seven bathrooms, with a master suite'],
          ['26 m²', 'Private pool beside a garden terrace'],
        ],
        gallery: [
          {
            src: image('marmara-haven-villa-living-room'),
            alt: 'Living room of Marmara Haven Villa opening onto the terrace, with the sea beyond',
          },
          {
            src: image('marmara-haven-villa-balcony-pool'),
            alt: 'The private pool and the Sea of Marmara seen from a balcony of the villa',
          },
        ],
        cta: {
          title: 'Discover Marmara Haven Villa',
          text: 'Photographs, floor plans, the video tour and viewing requests are on the HADARA Real Estate website.',
          label: 'View the project',
          href: marmaraHavenPage(false),
        },
      },
      ar: {
        title: 'فيلا مرمرة هيفن: مسكن خاص يطل على البحر في بيوكجكمجة',
        seoTitle: 'فيلا مرمرة هيفن في بيوكجكمجة بإسطنبول',
        description:
          'فيلا مرمرة هيفن من تطوير حضارة العقارية في بيوكجكمجة: 576.63 م² على أربعة طوابق، ومسبح خاص، وخمس غرف نوم، وإطلالة بانورامية على بحر مرمرة.',
        body: [
          'فيلا مرمرة هيفن (Marmara Haven Villa) مسكن خاص في بيوكجكمجة على الساحل الغربي لإسطنبول، وهي المشروع الوحيد الذي طوّرته حضارة العقارية، إحدى شركات مجموعة باي حضارة، بنفسها. تقوم الفيلا على أرض مساحتها 637 م²، بمساحة معيشة إجمالية تبلغ 576.63 م² موزّعة على أربعة طوابق، مع خصوصية كاملة ومسبح خاص وإطلالة بانورامية على بحر مرمرة. شُيّدت بين عامي 2024 و2026، واكتمل إنشاؤها وأصبحت جاهزة للسكن.',
          'ولأن الفيلا من تطويرها، فإن حضارة العقارية هي المطوّر وجهة التواصل الوحيدة للمشتري في آنٍ معاً، من أول حديث حتى تسليم المفاتيح. وتصف الشركة الفيلا بعبارة واحدة: ملاذ خاص بإطلالة بانورامية على بحر مرمرة.',
          '## منزل يتمحور حول البحر',
          'يستقبلك الطابق الأرضي بمدخل رئيسي بأرضية من الرخام ومخزن، وصالون بمساحة 53 م² ومطبخ بمساحة 24.70 م²، ينفتحان على تراس أرضي بمساحة 29.50 م² ومسبح خاص بمساحة 26 م²، فتنساب الحياة اليومية بين البيت والحديقة.',
          'ويضم الطابق الأول أربع غرف نوم وأربعة حمّامات، وغرفة ملابس للجناح الرئيسي، وثلاث شرفات وغرفة غسيل. وفوقه يضيف طابق السطح غرفة نوم خامسة بحمّامها، وصالوناً مع مطبخ بمساحة 34.88 م²، وتراس سطح بمساحة 24.49 م² بإطلالة مفتوحة على بحر مرمرة: مساحة معيشة ثانية للأمسيات الهادئة واستقبال الضيوف.',
          'ويتكيّف الطابق السفلي مع أسلوب حياة المالك؛ إذ يمكن تقسيمه إلى غرف أو استوديو، أو تخصيصه كغرفة سينما أو صالة رياضية، وهو يضم مستودعين واسعين وخزانات مياه ومياه أمطار وحمّاماً. وفي المجمل، تضم الفيلا خمس غرف نوم وسبعة حمّامات.',
          '## راحة مدمجة في تصميم المنزل',
          'يخدم مصعد جميع الطوابق، ويتيح نظام المنزل الذكي المتكامل التحكم بالإضاءة والتدفئة والأمن عبر الهاتف. وتكتمل الراحة بالتدفئة الأرضية ومدفأة حديثة عالية الكفاءة وبئر مياه خاص بعمق 220 متراً. وقد شُيّدت الفيلا بمواد عالية الجودة وتشطيبات فاخرة، وفق لائحة الزلازل التركية لعام 2018، مع تقرير فحص التربة والشهادات اللازمة.',
          '## الوثائق والموقع',
          'تتمتع الفيلا بسند ملكية مستقل (Müstakil Tapu)، ورخصة بناء صادرة عن بلدية بيوكجكمجة، وإذن الإشغال (إسكان). ولا يترتب عليها أي رهن أو قيد، وتتوفر لها ضمانة، والحي مفتوح لتسجيل إقامة الأجانب، وقد تكون مؤهلة للحصول على الجنسية التركية وفق شروط البرنامج. ويقع ساحل السباحة على بحر مرمرة على بُعد خمس دقائق، وطريق E-5 السريع على بُعد ثلاث دقائق، وطريق E-80 (TEM) على بُعد سبع دقائق، فيما يبعد مطار إسطنبول نحو 37 دقيقة بالسيارة، وفيرست أفينيو مول 18 دقيقة، ومول أوف إسطنبول 40 دقيقة.',
          'تعرض صفحة المشروع على موقع حضارة العقارية صور الفيلا ومخططاتها وجولة فيديو تعرض مساحاتها وتشطيباتها وإطلالتها على البحر. ويمكن للمشترين من خارج تركيا البدء بجولة فيديو خاصة مع أحد المستشارين، ثم ترتيب موعد للمعاينة في إسطنبول مباشرة مع الفريق الذي شيّد الفيلا.',
        ],
        image: image('marmara-haven-villa-aerial'),
        imageAlt: 'فيلا مرمرة هيفن من الجو مع مسبحها الخاص وتراسها الخشبي',
        imageCredit: credit.hadara.ar,
        facts: [
          ['576.63 م²', 'مساحة معيشة إجمالية على أربعة طوابق'],
          ['5 غرف نوم', 'وسبعة حمّامات، منها جناح رئيسي'],
          ['26 م²', 'مسبح خاص بجوار تراس الحديقة'],
        ],
        gallery: [
          {
            src: image('marmara-haven-villa-living-room'),
            alt: 'صالون فيلا مرمرة هيفن ينفتح على التراس والبحر في الأفق',
          },
          {
            src: image('marmara-haven-villa-balcony-pool'),
            alt: 'المسبح الخاص وبحر مرمرة من إحدى شرفات الفيلا',
          },
        ],
        cta: {
          title: 'اكتشف فيلا مرمرة هيفن',
          text: 'الصور والمخططات وجولة الفيديو وطلبات المعاينة على موقع حضارة العقارية.',
          label: 'عرض المشروع',
          href: marmaraHavenPage(true),
        },
      },
      tr: {
        title: 'Marmara Haven Villa: Büyükçekmece’de denize bakan özel bir konut',
        seoTitle: 'Marmara Haven Villa, Büyükçekmece, İstanbul',
        description:
          'Marmara Haven Villa, HADARA Real Estate’in Büyükçekmece’deki kendi projesi: dört katta 576,63 m², özel havuz, beş yatak odası ve Marmara Denizi manzarası.',
        body: [
          'Marmara Haven Villa, İstanbul’un batı kıyısında, Büyükçekmece’de yer alan özel bir konut ve BYHADARA Group şirketlerinden HADARA Real Estate’in bizzat geliştirdiği tek projedir. 637 m² arsa üzerinde, dört katta 576,63 m² brüt yaşam alanı sunan villa; tam mahremiyet, özel havuz ve Marmara Denizi’ne panoramik manzara bir araya getiriyor. 2024–2026 yılları arasında inşa edilen villa tamamlandı ve taşınmaya hazır.',
          'Villa kendi projesi olduğu için HADARA Real Estate, ilk görüşmeden anahtar teslimine kadar hem geliştirici hem de alıcının tek muhatabıdır. Şirket villayı tek cümleyle anlatıyor: Marmara Denizi’ne panoramik manzaralı özel bir sığınak.',
          '## Denize göre kurgulanmış bir ev',
          'Zemin kat, mermer zeminli ve depolu ana girişten 53 m² salona ve 24,70 m² mutfağa açılıyor. Her ikisi de 29,50 m² bahçe terasına ve 26 m² özel yüzme havuzuna uzanıyor; böylece gündelik yaşam ev ile bahçe arasında rahatça akıyor.',
          'Birinci katta dört yatak odası ve dört banyo, ebeveyn süiti için giyinme odası, üç balkon ve çamaşır odası bulunuyor. Çatı katı ise kendi banyosu olan beşinci bir yatak odası, 34,88 m² mutfaklı salon ve Marmara Denizi’ne açık manzaralı 24,49 m² çatı terası ekliyor: sakin akşamlar ve misafir ağırlamak için ikinci bir yaşam alanı.',
          'Bodrum kat, sahibinin yaşam tarzına uyum sağlıyor. Odalara ya da bir stüdyoya bölünebilir veya ev sineması ya da spor salonu olarak düzenlenebilir; iki geniş depo, su ve yağmur suyu tankları ile bir banyo içeriyor. Villada toplam beş yatak odası ve yedi banyo bulunuyor.',
          '## Evin içine yerleşmiş konfor',
          'Asansör tüm katlara hizmet veriyor; entegre akıllı ev sistemi aydınlatma, ısıtma ve güvenliği telefondan yönetmeyi sağlıyor. Yerden ısıtma, modern ve yüksek verimli şömine ve 220 metre derinliğinde özel su kuyusu konforu tamamlıyor. Villa, birinci sınıf malzemeler ve lüks işçilikle, 2018 Türkiye Bina Deprem Yönetmeliği’ne uygun olarak, zemin etüdü raporu ve sertifikalarıyla inşa edildi.',
          '## Belgeler ve konum',
          'Villanın müstakil tapusu, Büyükçekmece Belediyesi’nce verilmiş yapı ruhsatı ve iskânı bulunuyor. Üzerinde herhangi bir takyidat yok, garanti sağlanıyor, bölge yabancıların ikamet kaydına açık ve mülk, program koşulları çerçevesinde Türk vatandaşlığına uygun olabilir. Marmara Denizi’ndeki yüzme sahili beş dakika, E-5 karayolu üç dakika, E-80 (TEM) yedi dakika uzaklıkta; İstanbul Havalimanı karayoluyla yaklaşık 37 dakika, First Avenue AVM 18 dakika, Mall of Istanbul ise 40 dakika.',
          'HADARA Real Estate web sitesindeki proje sayfası villanın fotoğraflarını, kat planlarını ve mekânlarını, işçiliğini ve deniz manzarasını gösteren video turunu sunuyor. Yurt dışındaki alıcılar bir danışmanla özel video turla başlayabilir, ardından İstanbul’da villayı inşa eden ekiple doğrudan yerinde görme randevusu ayarlayabilir.',
        ],
        image: image('marmara-haven-villa-aerial'),
        imageAlt: 'Marmara Haven Villa’nın özel havuzu ve ahşap terasıyla havadan görünümü',
        imageCredit: credit.hadara.tr,
        facts: [
          ['576,63 m²', 'Dört katta brüt yaşam alanı'],
          ['5 yatak odası', 'Ve ebeveyn süitiyle yedi banyo'],
          ['26 m²', 'Bahçe terasının yanında özel havuz'],
        ],
        gallery: [
          {
            src: image('marmara-haven-villa-living-room'),
            alt: 'Marmara Haven Villa’nın terasa ve denize açılan salonu',
          },
          {
            src: image('marmara-haven-villa-balcony-pool'),
            alt: 'Villanın bir balkonundan özel havuz ve Marmara Denizi',
          },
        ],
        cta: {
          title: 'Marmara Haven Villa’yı keşfedin',
          text: 'Fotoğraflar, kat planları, video tur ve görme talepleri HADARA Real Estate web sitesinde.',
          label: 'Projeyi görüntüleyin',
          href: marmaraHavenPage(false),
        },
      },
    },
  },
  {
    slug: 'lotus-sisli',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-11-25',
    company: 'real-estate',
    related: ['lotus-sisli', 'referans-besiktas', 'buyukyali'],
    translations: {
      en: {
        title: 'Lotus Şişli: home offices and residences in the heart of Şişli',
        seoTitle: 'Lotus Şişli: home offices in Şişli, Istanbul',
        description:
          'Lotus Şişli by Lotus Yapı Proje: 320 home offices, apartments, penthouses and shops in two 18-storey towers on Piyalepaşa Boulevard, delivery planned for 2026.',
        body: [
          'Lotus Şişli is a mixed-use project rising on Piyalepaşa Boulevard, in the business heart of Şişli on Istanbul’s European side. Developed by Lotus Yapı Proje and designed by the architect Hakan Saçık, it brings together 320 home offices, apartments, penthouses and street-front shops in two towers of 18 storeys. HADARA Real Estate, a BYHADARA Group company, is its marketing partner.',
          'The developer presents Lotus Şişli as an innovative mixed-use landmark in the heart of Istanbul, set to become one of the most prestigious addresses in the district. Its address is Kaptan Paşa Mahallesi, on Piyalepaşa Boulevard at Okmeydanı Caddesi. The project covers 35,342 m² of construction, and the two towers share a retail podium at their entrance. Work began in December 2024; the project is under construction, units are currently on sale, and according to the developer delivery is scheduled for December 2026.',
          '## A home, an office, or both',
          'The home offices are designed to serve as a workplace, a home or both. They come as 1+1 and 2+1 apartments, or as closed or open-plan offices of the same sizes. A 1+1 measures 57.56 m² gross and 43.41 m² net, with a saleable area of 75.97 m²; a 2+1 measures 83.75 m² gross, 63.16 m² net and 110.53 m² saleable. Reading the three figures together gives the clearest picture of the space itself. The arrangement suits owners who want to live and work at the same address, or to keep the freedom to change how the unit is used later.',
          'The penthouses crown the towers with generous terraces over the city, and three street-front shops occupy the ground floor. A flex space concept lets owners add extra space to their home only when they need it, with no charge while it is unused.',
          '## Services within the building',
          'Residents have a concierge service and a lounge, an indoor swimming pool, a fitness centre, a reformer Pilates studio and a spa with a Turkish bath, a sauna, a Finnish bath and massage rooms. Meeting rooms, a café and vitamin bar, a private cinema room and a PlayStation room complete the shared spaces, alongside ample parking, private security and camera systems, so much of daily life and work can stay within the building.',
          '## At the centre of the city',
          'The towers stand steps from the metro, the Metrobüs and the E-5 highway, surrounded by hospitals, hotels, the Istanbul Courthouse and shopping centres. Memorial Şişli Hospital is 100 m away, Okmeydanı Training and Research Hospital 280 m, the Perpa Business Centre 500 m and the Darülaceze–Perpa Metrobüs stop 540 m. The Istanbul Courthouse is 880 m away, Çağlayan Metro 1 km and Cevahir Mall 1.5 km, while Nişantaşı is 2 km away, Taksim 2.9 km and Zorlu Center 4.1 km.',
          'The developer offers a payment plan with a 30% down payment and the balance over 30 months. Buyers abroad can begin with a private video tour with HADARA Real Estate, then visit Istanbul to see the project and choose their unit.',
          'Floor plans, current availability and viewing requests for Lotus Şişli are on the HADARA Real Estate website.',
        ],
        image: image('lotus-sisli-towers'),
        imageAlt: 'The Lotus Şişli towers at dusk above their street-front shops',
        imageCredit: credit.lotus.en,
        facts: [
          ['320', 'Home offices, with apartments, penthouses and shops'],
          ['2 × 18', 'Two towers of 18 storeys'],
          ['Dec 2026', 'Scheduled delivery, according to the developer'],
        ],
        gallery: [
          {
            src: image('lotus-sisli-living-room'),
            alt: 'Living room and open kitchen of a Lotus Şişli apartment',
          },
          {
            src: image('lotus-sisli-penthouse-terrace'),
            alt: 'Penthouse terrace at Lotus Şişli overlooking the city',
          },
        ],
        cta: {
          title: 'Discover Lotus Şişli',
          text: 'Floor plans, availability and viewing requests are on the HADARA Real Estate website.',
          label: 'View the project',
          href: lotusSisliPage(false),
        },
      },
      ar: {
        title: 'لوتس شيشلي: مكاتب منزلية ومساكن في قلب شيشلي',
        seoTitle: 'لوتس شيشلي: مكاتب منزلية في شيشلي بإسطنبول',
        description:
          'لوتس شيشلي من تطوير لوتس يابي بروجي: 320 مكتباً منزلياً وشقق وبنتهاوس ومحلات في برجين من 18 طابقاً على جادة بيالة باشا، والتسليم مقرر في 2026.',
        body: [
          'لوتس شيشلي (Lotus Şişli) مشروع متعدد الاستخدامات يرتفع على جادة بيالة باشا، في قلب منطقة الأعمال بشيشلي على الجانب الأوروبي من إسطنبول. طوّرته شركة لوتس يابي بروجي وصمّمه المعماري حقان صاتشيك، ويجمع 320 مكتباً منزلياً وشققاً سكنية وبنتهاوس ومحلات تجارية على الشارع في برجين من 18 طابقاً. وحضارة العقارية، إحدى شركات مجموعة باي حضارة، هي شريكه التسويقي.',
          'ويقدّم المطوّر لوتس شيشلي معلماً متعدد الاستخدامات ومبتكراً في قلب إسطنبول، يستعد ليكون واحداً من أرقى العناوين في المنطقة. يقع المشروع في حي قبطان باشا، على جادة بيالة باشا عند شارع أوكميداني. وتبلغ مساحة البناء الإجمالية فيه 35,342 م²، ويتشارك البرجان منصة تجارية عند مدخلهما. بدأ العمل فيه في ديسمبر 2024، وهو قيد الإنشاء حالياً والبيع مستمر فيه، والتسليم مقرر بحسب المطوّر في ديسمبر 2026.',
          '## منزل أو مكتب أو الاثنان معاً',
          'صُمّمت المكاتب المنزلية لتكون مكاناً للعمل أو للسكن أو للاثنين معاً، وهي متاحة كشقق 1+1 و2+1، أو كمكاتب مغلقة أو مفتوحة بالمساحات نفسها. تبلغ المساحة الإجمالية لشقة 1+1 نحو 57.56 م² والصافية 43.41 م²، فيما تبلغ مساحتها البيعية 75.97 م²؛ أما شقة 2+1 فمساحتها الإجمالية 83.75 م² والصافية 63.16 م² والبيعية 110.53 م². وقراءة الأرقام الثلاثة معاً تعطي الصورة الأوضح عن المساحة الفعلية. ويناسب هذا الترتيب المالكين الراغبين في السكن والعمل في العنوان نفسه، أو في الاحتفاظ بحرية تغيير طريقة استخدام الوحدة لاحقاً.',
          'وتتوّج وحدات البنتهاوس البرجين بتراسات واسعة مطلة على المدينة، فيما تشغل ثلاثة محلات تجارية الطابق الأرضي على الشارع. ويتيح مفهوم «المساحة المرنة» للمالكين إضافة مساحة إلى منازلهم عند الحاجة فقط، دون أي رسوم خلال فترة عدم استخدامها.',
          '## خدمات داخل المبنى',
          'يتمتع السكان بخدمة كونسيرج وصالة استقبال، ومسبح داخلي، وصالة رياضية، واستوديو بيلاتس ريفورمر، ومركز سبا يضم حماماً تركياً وساونا وحماماً فنلندياً وغرف مساج. وتكتمل المساحات المشتركة بقاعات اجتماعات وكافيه وبار فيتامين وغرفة سينما خاصة وغرفة بلايستيشن، إلى جانب مواقف سيارات واسعة وحراسة خاصة وأنظمة كاميرات، بحيث يبقى جزء كبير من الحياة اليومية والعمل داخل المبنى.',
          '## في قلب المدينة',
          'يقع البرجان على بُعد خطوات من المترو والمتروبوس وطريق E-5، وتحيط بهما المستشفيات والفنادق وقصر العدل في إسطنبول ومراكز التسوق. يبعد مستشفى ميموريال شيشلي 100 م، ومستشفى أوكميداني للتعليم والأبحاث 280 م، ومركز بيربا للأعمال 500 م، ومحطة متروبوس دارالعجزة – بيربا 540 م. ويبعد قصر العدل في إسطنبول 880 م، ومترو تشاغليان 1 كم، وجواهر مول 1.5 كم، فيما تبعد نيشانتاشي 2 كم، وتقسيم 2.9 كم، وزورلو سنتر 4.1 كم.',
          'ويقدّم المطوّر خطة سداد بدفعة أولى بنسبة ⁦30%⁩ والباقي على 30 شهراً. ويمكن للمشترين من خارج تركيا البدء بجولة فيديو خاصة مع حضارة العقارية، ثم زيارة إسطنبول لمعاينة المشروع واختيار وحدتهم.',
          'المخططات والوحدات المتاحة حالياً وطلبات المعاينة الخاصة بلوتس شيشلي على موقع حضارة العقارية.',
        ],
        image: image('lotus-sisli-towers'),
        imageAlt: 'برجا لوتس شيشلي عند الغروب فوق المحلات التجارية على الشارع',
        imageCredit: credit.lotus.ar,
        facts: [
          ['320', 'مكتباً منزلياً، مع شقق وبنتهاوس ومحلات'],
          ['⁦2 × 18⁩', 'برجان من 18 طابقاً'],
          ['ديسمبر 2026', 'موعد التسليم المقرر بحسب المطوّر'],
        ],
        gallery: [
          {
            src: image('lotus-sisli-living-room'),
            alt: 'صالون ومطبخ مفتوح في إحدى شقق لوتس شيشلي',
          },
          {
            src: image('lotus-sisli-penthouse-terrace'),
            alt: 'تراس بنتهاوس في لوتس شيشلي مطل على المدينة',
          },
        ],
        cta: {
          title: 'اكتشف لوتس شيشلي',
          text: 'المخططات والوحدات المتاحة وطلبات المعاينة على موقع حضارة العقارية.',
          label: 'عرض المشروع',
          href: lotusSisliPage(true),
        },
      },
      tr: {
        title: 'Lotus Şişli: Şişli’nin merkezinde ev-ofis ve konutlar',
        seoTitle: 'Lotus Şişli: Şişli’de ev-ofis ve daireler',
        description:
          'Lotus Yapı Proje’nin Lotus Şişli projesi: Piyalepaşa Bulvarı’nda 18 katlı iki kulede 320 ev-ofis, daire, çatı dubleksi ve dükkân; teslim 2026’da planlanıyor.',
        body: [
          'Lotus Şişli, İstanbul’un Avrupa yakasında, Şişli’nin iş merkezinde Piyalepaşa Bulvarı üzerinde yükselen karma kullanımlı bir projedir. Lotus Yapı Proje tarafından geliştirilen ve mimar Hakan Saçık’ın tasarladığı proje, 18 katlı iki kulede 320 ev-ofis, daire, çatı dubleksi ve cadde dükkânlarını bir araya getiriyor. BYHADARA Group şirketlerinden HADARA Real Estate projenin pazarlama ortağıdır.',
          'Geliştirici, Lotus Şişli’yi İstanbul’un kalbinde yenilikçi, karma kullanımlı bir simge yapı ve bölgenin en prestijli adreslerinden biri olmaya aday bir proje olarak tanımlıyor. Adresi Kaptan Paşa Mahallesi, Piyalepaşa Bulvarı, Okmeydanı Caddesi. Projenin toplam inşaat alanı 35.342 m²; iki kule girişte ortak bir ticari podyumu paylaşıyor. Çalışmalar Aralık 2024’te başladı; proje inşaat aşamasında, daireler satışta ve geliştiriciye göre teslim Aralık 2026’da planlanıyor.',
          '## Ev, ofis ya da ikisi birden',
          'Ev-ofisler iş yeri, konut ya da her ikisi olarak kullanılmak üzere tasarlandı. 1+1 ve 2+1 daire olarak ya da aynı büyüklükte kapalı veya açık ofis olarak sunuluyor. 1+1 birimler 57,56 m² brüt ve 43,41 m² net olup satışa esas alanı 75,97 m²; 2+1 birimler ise 83,75 m² brüt, 63,16 m² net ve 110,53 m² satışa esas alana sahip. Üç rakamı birlikte okumak, alanın kendisine dair en net resmi verir. Bu düzen, aynı adreste hem yaşamak hem çalışmak isteyen ya da birimin kullanım şeklini ileride değiştirme özgürlüğünü korumak isteyen sahiplere uygundur.',
          'Çatı dubleksleri, kuleleri şehre bakan geniş teraslarla taçlandırıyor; zemin katta üç cadde dükkânı yer alıyor. Esnek alan konsepti, sahiplerin evlerine yalnızca ihtiyaç duyduklarında ek alan eklemesine imkân tanıyor; kullanılmadığı sürece ücret alınmıyor.',
          '## Bina içindeki hizmetler',
          'Sakinler konsiyerj hizmeti ve dinlenme salonu, kapalı yüzme havuzu, fitness merkezi, reformer pilates stüdyosu ve Türk hamamı, sauna, Fin hamamı ile masaj odalarından oluşan bir spadan yararlanıyor. Toplantı odaları, kafe ve vitamin bar, özel sinema odası ve PlayStation odası ortak alanları tamamlarken geniş otopark, özel güvenlik ve kamera sistemleri de bulunuyor; böylece gündelik yaşamın ve işin büyük bölümü bina içinde kalabiliyor.',
          '## Şehrin tam merkezinde',
          'Kuleler metroya, metrobüse ve E-5 karayoluna birkaç adım mesafede; çevresinde hastaneler, oteller, İstanbul Adliyesi ve alışveriş merkezleri bulunuyor. Memorial Şişli Hastanesi 100 m, Okmeydanı Eğitim ve Araştırma Hastanesi 280 m, Perpa Ticaret Merkezi 500 m, Darülaceze–Perpa metrobüs durağı 540 m uzaklıkta. İstanbul Adliyesi 880 m, Çağlayan metrosu 1 km, Cevahir AVM 1,5 km; Nişantaşı 2 km, Taksim 2,9 km ve Zorlu Center 4,1 km mesafede.',
          'Geliştirici, %30 peşinat ve kalanı 30 ayda ödenen bir ödeme planı sunuyor. Yurt dışındaki alıcılar HADARA Real Estate ile özel bir video turla başlayabilir, ardından projeyi görmek ve dairesini seçmek için İstanbul’a gelebilir.',
          'Lotus Şişli’nin kat planları, güncel satılık birimleri ve ziyaret talepleri HADARA Real Estate web sitesinde.',
        ],
        image: image('lotus-sisli-towers'),
        imageAlt: 'Cadde dükkânlarının üzerinde alacakaranlıkta Lotus Şişli kuleleri',
        imageCredit: credit.lotus.tr,
        facts: [
          ['320', 'Ev-ofis; ayrıca daire, çatı dubleksi ve dükkân'],
          ['2 × 18', '18 katlı iki kule'],
          ['Aralık 2026', 'Geliştiriciye göre planlanan teslim'],
        ],
        gallery: [
          {
            src: image('lotus-sisli-living-room'),
            alt: 'Bir Lotus Şişli dairesinde salon ve açık mutfak',
          },
          {
            src: image('lotus-sisli-penthouse-terrace'),
            alt: 'Lotus Şişli’de şehre bakan çatı dubleksi terası',
          },
        ],
        cta: {
          title: 'Lotus Şişli’yi keşfedin',
          text: 'Kat planları, satılık birimler ve ziyaret talepleri HADARA Real Estate web sitesinde.',
          label: 'Projeyi görüntüleyin',
          href: lotusSisliPage(false),
        },
      },
    },
  },
  {
    slug: 'sea-pearl-atakoy',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-11-27',
    company: 'real-estate',
    related: ['sea-pearl-atakoy', 'buyukyali', 'hayat-flora'],
    translations: {
      en: {
        title: 'Sea Pearl Ataköy: seafront living in Ataköy, Istanbul',
        seoTitle: 'Sea Pearl Ataköy: seafront homes in Istanbul',
        description:
          'Sea Pearl Ataköy by Kuzu İnşaat: 631 apartments in four 20-storey blocks, a 1.2 km seafront for residents and Ottoman-style gardens. Complete and ready to move in.',
        body: [
          'Sea Pearl Ataköy is a seafront residential community in Ataköy, in the Bakırköy district on the European shore of the Sea of Marmara. It was developed by Kuzu İnşaat, a company known for major real estate and construction projects in Türkiye and for its work on infrastructure. The project is complete and ready to move in, and HADARA Real Estate, a BYHADARA Group company, is its marketing partner.',
          'Its defining feature is the shore itself: a 1.2 km seafront reserved for residents. Residents can also use yacht mooring and sea transport towards Ataköy Marina, about 1 km away. The developer sums up the project in one line: a residents-only seafront, Ottoman-style gardens and sea views in Ataköy. Its address is Zeytinlik Mahallesi, Rauf Orbay Caddesi, on the Ataköy coast road.',
          '## Gardens between the towers and the sea',
          'The site covers about 55,000 m², and around 60% of it, some 33,000 m², is given over to green space. The landscaping is inspired by Ottoman palace gardens, with a carefully chosen selection of plants and roses imported from Japan, and an artificial lake adds quiet places to rest between the buildings and the water. At night the gardens and the lake are lit, and the lawns lead the eye from the towers down to the shore.',
          '## Residences and services',
          'Four blocks of 20 floors, each with two entrances and its own residents’ gym, hold 631 apartments. Layouts range from 1+1 to 4.5+1, with gross areas from 88 m² to 398 m²: 1+1 homes of 88 to 104 m², 2+1 homes of 117 to 270 m², 3+1 homes of 193 to 204 m², 3.5+1 homes of 235 to 277 m², 4+1 homes of 237 to 276 m² and 4.5+1 homes of 248 to 398 m². Around 200 apartments with direct sea views are currently available.',
          'Residents also benefit from special offers and reduced annual fees for some services of the JW Marriott hotel. Given its seafront setting, the project was built to modern construction standards and in line with Türkiye’s seismic code, and according to the developer it may be eligible for Turkish citizenship under the programme’s conditions.',
          '## Ataköy and its surroundings',
          'Ataköy is one of Istanbul’s most refined and sought-after residential districts, popular with Turkish residents and with the city’s elite. A Plus mall is a minute away, Galleria about 3 minutes and the Florya shopping centre about 10. Medicana hospital, built by the same construction company, stands right next to the project, and Acıbadem hospital is about 6 minutes away. The Eurasia Tunnel is about 5 minutes away, and the Marmaray and M9 metro stations are about a 10-minute walk.',
          'Buyers abroad can begin with a private video tour with HADARA Real Estate to compare views, floors and layouts among the available sea-view apartments, then visit Istanbul to see the apartments in person. Because the project is complete, buyers see the finished apartments, the gardens and the shore before they decide.',
          'Available apartments, layouts and viewing requests for Sea Pearl Ataköy are on the HADARA Real Estate website.',
        ],
        image: image('sea-pearl-atakoy-coast'),
        imageAlt: 'Sea Pearl Ataköy towers and gardens on the Marmara shore at dusk',
        imageCredit: credit.kuzu.en,
        facts: [
          ['1.2 km', 'Seafront reserved for residents'],
          ['631', 'Apartments in four 20-storey blocks'],
          ['33,000 m²', 'Gardens, about 60% of the site'],
        ],
        gallery: [
          {
            src: image('sea-pearl-atakoy-gardens'),
            alt: 'Ottoman-style gardens between the Sea Pearl Ataköy towers, opening onto the sea',
          },
          {
            src: image('sea-pearl-atakoy-terrace'),
            alt: 'Garden terrace of a Sea Pearl Ataköy apartment above the Sea of Marmara',
          },
        ],
        cta: {
          title: 'Discover Sea Pearl Ataköy',
          text: 'Available apartments, layouts and viewing requests are on the HADARA Real Estate website.',
          label: 'View the project',
          href: seaPearlPage(false),
        },
      },
      ar: {
        title: 'سي بيرل أتاكوي: سكن على الواجهة البحرية في أتاكوي بإسطنبول',
        seoTitle: 'سي بيرل أتاكوي: شقق على البحر في إسطنبول',
        description:
          'سي بيرل أتاكوي من تطوير Kuzu İnşaat: 631 شقة في أربعة مبانٍ من 20 طابقاً، وواجهة بحرية بطول 1.2 كم للسكان، وحدائق على الطراز العثماني. مكتمل وجاهز للسكن.',
        body: [
          'سي بيرل أتاكوي (Sea Pearl Ataköy) مجمّع سكني على الواجهة البحرية في أتاكوي، ضمن بلدية باكركوي على الساحل الأوروبي لبحر مرمرة. طوّرته شركة Kuzu İnşaat المعروفة بتنفيذ المشاريع العقارية والإنشائية الكبرى في تركيا وبمشاركتها في مشاريع البنية التحتية. والمشروع مكتمل وجاهز للسكن، وحضارة العقارية، إحدى شركات مجموعة باي حضارة، هي شريكه التسويقي.',
          'وأبرز ما يميّزه الساحل نفسه: واجهة بحرية تمتد 1.2 كم مخصّصة لسكانه. كما يمكن للسكان الاستفادة من خدمات رسوّ اليخوت والتنقل البحري باتجاه مارينا أتاكوي التي تبعد نحو كيلومتر واحد. ويلخّص المطوّر المشروع في سطر واحد: واجهة بحرية خاصة بالسكان، وحدائق على الطراز العثماني، وإطلالات على البحر في أتاكوي. ويقع المشروع في حي زيتونلك، على شارع رؤوف أورباي، على طريق أتاكوي الساحلي.',
          '## حدائق بين الأبراج والبحر',
          'يمتد المشروع على مساحة تقارب 55,000 م²، خُصّص نحو ⁦60%⁩ منها، أي قرابة 33,000 م²، للمساحات الخضراء. ويستوحي تنسيقها الحدائق العثمانية، مع مجموعة مختارة بعناية من النباتات والورود المستوردة من اليابان، فيما تضيف بحيرة صناعية مساحات هادئة للاسترخاء بين المباني والماء. وفي المساء تُضاء الحدائق والبحيرة، وتقود المروج النظر من الأبراج نزولاً إلى الشاطئ.',
          '## الشقق والخدمات',
          'يتألف المشروع من أربعة مبانٍ من 20 طابقاً، لكلٍّ منها مدخلان وصالة رياضية مخصّصة للمقيمين، وتضم 631 شقة. وتتراوح أنماطها بين 1+1 و4.5+1 بمساحات إجمالية من 88 إلى 398 م²: شقق 1+1 بين 88 و104 م²، وشقق 2+1 بين 117 و270 م²، وشقق 3+1 بين 193 و204 م²، وشقق 3.5+1 بين 235 و277 م²، وشقق 4+1 بين 237 و276 م²، وشقق 4.5+1 بين 248 و398 م². وتتوفر حالياً نحو 200 شقة بإطلالات بحرية مباشرة.',
          'ويستفيد السكان أيضاً من عروض خاصة ورسوم سنوية مخفّضة لبعض خدمات فندق JW Marriott. ونظراً إلى موقعه الساحلي، شُيّد المشروع وفق معايير بناء حديثة ووفق الكود الزلزالي المعتمد في تركيا، وقد يكون مؤهلاً للحصول على الجنسية التركية وفق شروط البرنامج بحسب المطوّر.',
          '## أتاكوي ومحيطها',
          'تُعدّ أتاكوي من أرقى المناطق السكنية في إسطنبول وأكثرها طلباً، وتحظى بإقبال كبير من السكان الأتراك ونخبة المدينة. يبعد مول A Plus دقيقة واحدة، ومول Galleria نحو 3 دقائق، ومركز Florya التجاري نحو 10 دقائق. ويقع مستشفى Medicana، الذي نفّذته الشركة الإنشائية ذاتها، بجوار المشروع مباشرة، ويبعد مستشفى Acıbadem نحو 6 دقائق. أما نفق أوراسيا فيبعد نحو 5 دقائق، ومحطتا مرمراي ومترو M9 نحو 10 دقائق سيراً على الأقدام.',
          'ويمكن للمشترين من خارج تركيا البدء بجولة فيديو خاصة مع حضارة العقارية للمقارنة بين الإطلالات والطوابق والمخططات في الشقق المتاحة المطلة على البحر، ثم زيارة إسطنبول لمعاينة الشقق على أرض الواقع. ولأن المشروع مكتمل، يرى المشتري الشقق المنجزة والحدائق والشاطئ قبل أن يقرر.',
          'الشقق المتاحة والمخططات وطلبات المعاينة الخاصة بسي بيرل أتاكوي على موقع حضارة العقارية.',
        ],
        image: image('sea-pearl-atakoy-coast'),
        imageAlt: 'أبراج سي بيرل أتاكوي وحدائقه على ساحل مرمرة عند الغروب',
        imageCredit: credit.kuzu.ar,
        facts: [
          ['1.2 كم', 'واجهة بحرية مخصّصة للسكان'],
          ['631', 'شقة في أربعة مبانٍ من 20 طابقاً'],
          ['33,000 م²', 'حدائق، نحو ⁦60%⁩ من المساحة'],
        ],
        gallery: [
          {
            src: image('sea-pearl-atakoy-gardens'),
            alt: 'حدائق على الطراز العثماني بين أبراج سي بيرل أتاكوي تنفتح على البحر',
          },
          {
            src: image('sea-pearl-atakoy-terrace'),
            alt: 'تراس حديقة في إحدى شقق سي بيرل أتاكوي فوق بحر مرمرة',
          },
        ],
        cta: {
          title: 'اكتشف سي بيرل أتاكوي',
          text: 'الشقق المتاحة والمخططات وطلبات المعاينة على موقع حضارة العقارية.',
          label: 'عرض المشروع',
          href: seaPearlPage(true),
        },
      },
      tr: {
        title: 'Sea Pearl Ataköy: Ataköy’de denize sıfır yaşam',
        seoTitle: 'Sea Pearl Ataköy: denize sıfır daireler',
        description:
          'Kuzu İnşaat’ın Sea Pearl Ataköy projesi: 20 katlı dört blokta 631 daire, sakinlere özel 1,2 km sahil ve Osmanlı tarzı bahçeler. Tamamlandı, taşınmaya hazır.',
        body: [
          'Sea Pearl Ataköy, Marmara Denizi’nin Avrupa kıyısında, Bakırköy ilçesine bağlı Ataköy’de denize sıfır bir konut projesidir. Türkiye’de büyük gayrimenkul ve inşaat projeleri ile altyapı çalışmalarıyla tanınan Kuzu İnşaat tarafından geliştirildi. Proje tamamlandı ve taşınmaya hazır; BYHADARA Group şirketlerinden HADARA Real Estate projenin pazarlama ortağıdır.',
          'Projeyi asıl ayıran kıyının kendisidir: sakinlere ayrılmış 1,2 km’lik bir sahil. Sakinler ayrıca yat bağlama imkânından ve yaklaşık 1 km uzaklıktaki Ataköy Marina’ya deniz ulaşımından yararlanabiliyor. Geliştirici projeyi tek cümleyle özetliyor: sakinlere özel sahil, Osmanlı tarzı bahçeler ve Ataköy’de deniz manzarası. Adresi Zeytinlik Mahallesi, Rauf Orbay Caddesi, Ataköy Sahil Yolu.',
          '## Kuleler ile deniz arasında bahçeler',
          'Proje yaklaşık 55.000 m² alana yayılıyor ve bunun yaklaşık %60’ı, yani 33.000 m² civarı yeşil alana ayrılmış. Peyzaj Osmanlı saray bahçelerinden ilham alıyor; özenle seçilmiş bitkiler ve Japonya’dan getirilen güller kullanılmış. Yapay bir göl ise binalar ile deniz arasında sakin dinlenme alanları sunuyor. Akşamları bahçeler ve göl aydınlatılıyor; çimenler bakışı kulelerden kıyıya doğru taşıyor.',
          '## Daireler ve hizmetler',
          'Her biri iki girişli ve sakinlere özel spor salonuna sahip 20 katlı dört blokta 631 daire bulunuyor. Daire tipleri 1+1’den 4,5+1’e, brüt alanlar 88 m²’den 398 m²’ye uzanıyor: 1+1 daireler 88–104 m², 2+1 daireler 117–270 m², 3+1 daireler 193–204 m², 3,5+1 daireler 235–277 m², 4+1 daireler 237–276 m², 4,5+1 daireler ise 248–398 m². Şu anda doğrudan deniz manzaralı yaklaşık 200 daire satışta.',
          'Sakinler ayrıca JW Marriott otelinin bazı hizmetlerinde özel tekliflerden ve indirimli yıllık ücretlerden yararlanıyor. Kıyıdaki konumu nedeniyle proje modern yapı standartlarına ve Türkiye deprem yönetmeliğine uygun inşa edildi; geliştiriciye göre program koşulları çerçevesinde Türk vatandaşlığına uygun olabilir.',
          '## Ataköy ve çevresi',
          'Ataköy, İstanbul’un en seçkin ve en çok tercih edilen konut bölgelerinden biridir; Türk sakinlerin ve şehrin seçkinlerinin gözdesidir. A Plus AVM bir dakika, Galleria yaklaşık 3 dakika, Florya alışveriş merkezi yaklaşık 10 dakika uzaklıkta. Aynı inşaat şirketinin yaptığı Medicana Hastanesi projenin hemen yanında, Acıbadem Hastanesi ise yaklaşık 6 dakika mesafede. Avrasya Tüneli yaklaşık 5 dakika, Marmaray ve M9 metro istasyonları yaklaşık 10 dakikalık yürüme mesafesinde.',
          'Yurt dışındaki alıcılar satıştaki deniz manzaralı dairelerin manzaralarını, katlarını ve planlarını karşılaştırmak için HADARA Real Estate ile özel bir video turla başlayabilir, ardından daireleri yerinde görmek için İstanbul’a gelebilir. Proje tamamlandığı için alıcılar karar vermeden önce bitmiş daireleri, bahçeleri ve sahili görebiliyor.',
          'Sea Pearl Ataköy’ün satılık daireleri, planları ve ziyaret talepleri HADARA Real Estate web sitesinde.',
        ],
        image: image('sea-pearl-atakoy-coast'),
        imageAlt: 'Alacakaranlıkta Marmara kıyısında Sea Pearl Ataköy kuleleri ve bahçeleri',
        imageCredit: credit.kuzu.tr,
        facts: [
          ['1,2 km', 'Sakinlere ayrılmış sahil'],
          ['631', '20 katlı dört blokta daire'],
          ['33.000 m²', 'Bahçe, alanın yaklaşık %60’ı'],
        ],
        gallery: [
          {
            src: image('sea-pearl-atakoy-gardens'),
            alt: 'Sea Pearl Ataköy kuleleri arasında denize açılan Osmanlı tarzı bahçeler',
          },
          {
            src: image('sea-pearl-atakoy-terrace'),
            alt: 'Marmara Denizi’ne bakan bir Sea Pearl Ataköy dairesinin bahçe terası',
          },
        ],
        cta: {
          title: 'Sea Pearl Ataköy’ü keşfedin',
          text: 'Satılık daireler, planlar ve ziyaret talepleri HADARA Real Estate web sitesinde.',
          label: 'Projeyi görüntüleyin',
          href: seaPearlPage(false),
        },
      },
    },
  },
];
