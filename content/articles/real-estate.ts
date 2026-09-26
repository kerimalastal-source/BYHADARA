import type { Article } from '../articles';
import { companyUrl } from '../companies';
import type { Locale } from '../site';
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
const credit = {
  lotus: {
    en: 'Architectural visualisation: Lotus Yapı Proje.',
    ar: 'تصميم معماري: لوتس يابي بروجي.',
    tr: 'Mimari görselleştirme: Lotus Yapı Proje.',
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
];
