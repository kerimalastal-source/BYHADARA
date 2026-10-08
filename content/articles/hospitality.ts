import type { Article } from '../articles';
import { companyUrl } from '../companies';
import type { Locale } from '../site';
const image = (file: string) => `/images/${file}.jpg`;
const photo = {
  en: 'Photo: Unsplash.',
  ar: 'الصورة: Unsplash.',
  tr: 'Fotoğraf: Unsplash.',
} as const;
const visitCopy = {
  en: {
    title: 'Explore HADARA Hospitality',
    text: 'The full collection, specifications and quotations are on the HADARA Hospitality website.',
    label: 'Visit HADARA Hospitality',
  },
  ar: {
    title: 'اكتشف حضارة للضيافة',
    text: 'المجموعة الكاملة والمواصفات وعروض الأسعار على موقع حضارة للضيافة.',
    label: 'زيارة موقع حضارة للضيافة',
  },
  tr: {
    title: 'HADARA Hospitality’yi keşfedin',
    text: 'Tüm koleksiyon, teknik özellikler ve teklifler HADARA Hospitality web sitesinde.',
    label: 'HADARA Hospitality’yi ziyaret edin',
  },
} as const;
/** Closing call to action leading to the HADARA Hospitality website. */
const visit = (locale: Locale) => ({
  ...visitCopy[locale],
  href: companyUrl('hospitality', locale),
});
const guideCopy = {
  en: {
    title: 'Read the fabric quality guide',
    text: 'HADARA Hospitality explains thread count, towel weight and fabric choices in detail.',
    label: 'Open the guide',
  },
  ar: {
    title: 'اقرأ دليل جودة الأقمشة',
    text: 'تشرح حضارة للضيافة عدد الخيوط ووزن المناشف وخيارات الأقمشة بالتفصيل.',
    label: 'افتح الدليل',
  },
  tr: {
    title: 'Kumaş kalitesi rehberini okuyun',
    text: 'HADARA Hospitality iplik sayısını, havlu ağırlığını ve kumaş seçeneklerini ayrıntılı olarak anlatıyor.',
    label: 'Rehberi açın',
  },
} as const;
/** Closing call to action leading to the fabric quality guide on the HADARA Hospitality website. */
const guide = (locale: Locale) => ({
  ...guideCopy[locale],
  href: companyUrl('hospitality', locale, '/fabric-quality-guide'),
});
/** Credit for the illustrative images taken from the HADARA Hospitality website. */
const illustration = {
  en: 'Illustrative image: HADARA Hospitality.',
  ar: 'صورة توضيحية: حضارة للضيافة.',
  tr: 'Temsili görsel: HADARA Hospitality.',
} as const;
type Cta = { title: string; text: string; label: string };
/** Closing call to action leading to a page of the HADARA Hospitality website. */
const page = (locale: Locale, path: string, copy: Record<Locale, Cta>) => ({
  ...copy[locale],
  href: companyUrl('hospitality', locale, path),
});
const bedLinen: Record<Locale, Cta> = {
  en: {
    title: 'Hotel bed linen at HADARA Hospitality',
    text: 'Sheets, duvet covers, pillowcases and bed linen sets for hotels, with specifications and quotations.',
    label: 'View bed linen',
  },
  ar: {
    title: 'بياضات الأسرّة لدى حضارة للضيافة',
    text: 'شراشف وأغطية لحف وأكياس وسائد وأطقم بياضات للفنادق، مع المواصفات وعروض الأسعار.',
    label: 'تصفّح بياضات الأسرّة',
  },
  tr: {
    title: 'HADARA Hospitality’de yatak tekstili',
    text: 'Oteller için çarşaf, nevresim, yastık kılıfı ve nevresim takımları; teknik özellikler ve tekliflerle.',
    label: 'Yatak tekstilini inceleyin',
  },
};
const pillows: Record<Locale, Cta> = {
  en: {
    title: 'Pillows and duvets at HADARA Hospitality',
    text: 'Hotel pillows and duvets are on the HADARA Hospitality website, with specifications and quotations.',
    label: 'View pillows and duvets',
  },
  ar: {
    title: 'الوسائد واللحف لدى حضارة للضيافة',
    text: 'وسائد ولحف للفنادق على موقع حضارة للضيافة، مع المواصفات وعروض الأسعار.',
    label: 'تصفّح الوسائد واللحف',
  },
  tr: {
    title: 'HADARA Hospitality’de yastık ve yorgan',
    text: 'Oteller için yastık ve yorganlar HADARA Hospitality web sitesinde; teknik özellikler ve tekliflerle.',
    label: 'Yastık ve yorganları inceleyin',
  },
};
const robes: Record<Locale, Cta> = {
  en: {
    title: 'Bathrobes at HADARA Hospitality',
    text: 'Hotel and spa bathrobes and slippers, with specifications and quotations.',
    label: 'View bathrobes',
  },
  ar: {
    title: 'أرواب الحمّام لدى حضارة للضيافة',
    text: 'أرواب حمّام وأخفاف للفنادق ومراكز السبا، مع المواصفات وعروض الأسعار.',
    label: 'تصفّح الأرواب',
  },
  tr: {
    title: 'HADARA Hospitality’de bornozlar',
    text: 'Otel ve spa bornozları ile terlikler; teknik özellikler ve tekliflerle.',
    label: 'Bornozları inceleyin',
  },
};
const quote: Record<Locale, Cta> = {
  en: {
    title: 'Request a quotation',
    text: 'HADARA Hospitality’s quote form gathers the property, products, quantities and delivery details in one place.',
    label: 'Request a quote',
  },
  ar: {
    title: 'اطلب عرض سعر',
    text: 'يجمع نموذج طلب عرض السعر لدى حضارة للضيافة تفاصيل المنشأة والمنتجات والكميات والتسليم في مكان واحد.',
    label: 'طلب عرض سعر',
  },
  tr: {
    title: 'Teklif isteyin',
    text: 'HADARA Hospitality’nin teklif formu tesis, ürün, miktar ve teslimat bilgilerini tek yerde toplar.',
    label: 'Teklif isteyin',
  },
};
/**
 * Hospitality and hotel supply insights. Facts follow the HADARA Hospitality guides
 * (hadarahospitality repository, src/data/blog.ts), rewritten for the group site rather than copied.
 */
export const hospitality: Article[] = [
  {
    slug: 'textiles-hotel-guests-remember',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'The textiles guests remember: how bed and bath shape a hotel stay',
        seoTitle: 'The textiles hotel guests remember',
        description:
          'Bed linen, towels and bathrobes are what guests touch most in a hotel. How textiles shape comfort, reviews and running costs, and what to weigh when choosing them.',
        body: [
          'Guests rarely remember the brand of a hotel’s sheets, but they always remember how the bed felt. Bed linen, towels and bathrobes are the parts of a stay guests touch most, and they quietly shape how the whole property is judged.',
          'Textiles are also among the details guests mention in reviews when something is wrong: sheets that have greyed, towels that have lost their softness or a pillow that has lost its shape. Each tells a guest something about the standards of the property.',
          'For hotel operators, the same textiles are operational equipment. They are washed at high temperatures, dried industrially and handled every day, so a specification that looks perfect in a showroom must also survive dozens of commercial wash cycles.',
          'The best textile programmes therefore balance three things: the comfort guests feel, the durability housekeeping needs, and the cost per guest-night over the product’s working life rather than the unit price alone.',
          'Consistency matters as much as quality. A well-matched set in every room, from the bed to the bath, gives a property a recognisable standard and makes restocking simpler for housekeeping.',
          'HADARA Hospitality works with hotels in the Gulf and Europe on exactly this balance, matching bed and bath textiles to each property’s segment, laundry routine and guest expectations.',
        ],
        image: image('insights/hotel-bed-linen'),
        imageAlt: 'Close view of crisp white hotel bed linen',
        imageCredit: photo.en,
        cta: visit('en'),
      },
      ar: {
        title: 'المنسوجات التي يتذكرها النزلاء: كيف تصنع غرفة النوم والحمّام تجربة الإقامة',
        seoTitle: 'المنسوجات التي يتذكرها نزلاء الفنادق',
        description:
          'البياضات والمناشف وأرواب الحمام أكثر ما يلمسه النزيل في الفندق. كيف تؤثر المنسوجات في الراحة والتقييمات وتكاليف التشغيل، وما الذي يُراعى عند اختيارها.',
        body: [
          'نادراً ما يتذكر النزيل علامة ملاءات الفندق، لكنه يتذكر دائماً شعوره بالسرير. فالبياضات والمناشف وأرواب الحمام أكثر ما يلمسه النزيل خلال إقامته، وهي تشكّل بهدوء حكمه على الفندق كله.',
          'والمنسوجات أيضاً من التفاصيل التي يذكرها النزلاء في تقييماتهم حين يكون هناك خلل: ملاءات فقدت بياضها، أو مناشف فقدت نعومتها، أو وسادة فقدت شكلها. وكل ذلك يقول للنزيل شيئاً عن معايير المكان.',
          'أما بالنسبة لمشغلي الفنادق، فهذه المنسوجات معدات تشغيلية، تُغسل بدرجات حرارة عالية وتُجفف صناعياً وتُستخدم يومياً، لذا فالمواصفات التي تبدو مثالية في صالة العرض يجب أن تصمد أيضاً أمام عشرات دورات الغسيل التجاري.',
          'ولذلك توازن أفضل برامج المنسوجات بين ثلاثة أمور: الراحة التي يشعر بها النزيل، والمتانة التي يحتاجها قسم التدبير الفندقي، والتكلفة لكل ليلة إقامة طوال عمر المنتج، لا سعر القطعة وحده.',
          'والاتساق لا يقل أهمية عن الجودة، فطقم متناسق في كل الغرف، من السرير إلى الحمّام، يمنح الفندق معياراً واضحاً ويسهّل إعادة التزويد على فرق التدبير الفندقي.',
          'وعلى هذا التوازن تحديداً تعمل حضارة للضيافة مع الفنادق في الخليج وأوروبا، فتطابق منسوجات السرير والحمّام مع فئة كل فندق وروتين الغسيل فيه وتوقعات نزلائه.',
        ],
        image: image('insights/hotel-bed-linen'),
        imageAlt: 'لقطة قريبة لبياضات فندقية بيضاء',
        imageCredit: photo.ar,
        cta: visit('ar'),
      },
      tr: {
        title:
          'Misafirlerin hatırladığı tekstiller: yatak ve banyo konaklamayı nasıl şekillendirir?',
        seoTitle: 'Otel misafirlerinin hatırladığı tekstiller',
        description:
          'Nevresim, havlu ve bornoz, misafirlerin otelde en çok dokunduğu ürünlerdir. Tekstilin konfora, yorumlara ve işletme maliyetine etkisi ve seçerken dikkat edilecekler.',
        body: [
          'Misafirler otel çarşaflarının markasını nadiren hatırlar, ama yatağın nasıl hissettirdiğini her zaman hatırlar. Nevresim, havlu ve bornoz konaklama boyunca en çok dokunulan ürünlerdir ve otelin bütününe dair yargıyı sessizce şekillendirir.',
          'Tekstiller, bir sorun olduğunda misafir yorumlarında da yer alır: grileşmiş çarşaflar, yumuşaklığını yitirmiş havlular ya da şeklini kaybetmiş bir yastık. Her biri misafire otelin standartları hakkında bir şey söyler.',
          'Otel işletmecileri için aynı tekstiller birer işletme ekipmanıdır. Yüksek sıcaklıkta yıkanır, endüstriyel olarak kurutulur ve her gün kullanılır; bu yüzden showroomda kusursuz görünen bir ürünün düzinelerce endüstriyel yıkamaya da dayanması gerekir.',
          'Bu nedenle en iyi tekstil programları üç şeyi dengeler: misafirin hissettiği konfor, kat hizmetlerinin ihtiyaç duyduğu dayanıklılık ve yalnızca birim fiyat değil, ürünün kullanım ömrü boyunca konaklama gecesi başına maliyet.',
          'Tutarlılık da kalite kadar önemlidir. Yataktan banyoya her odada uyumlu bir set, otele tanınan bir standart kazandırır ve kat hizmetleri için ikmali kolaylaştırır.',
          'HADARA Hospitality, Körfez ve Avrupa’daki otellerle tam da bu denge üzerine çalışır; yatak ve banyo tekstillerini her otelin segmentine, çamaşırhane düzenine ve misafir beklentilerine göre eşleştirir.',
        ],
        image: image('insights/hotel-bed-linen'),
        imageAlt: 'Beyaz otel nevresimine yakından bakış',
        imageCredit: photo.tr,
        cta: visit('tr'),
      },
    },
  },
  {
    slug: 'hotel-bed-linen-beyond-thread-count',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Hotel bed linen: looking beyond thread count',
        description:
          'Thread count is only part of the story. Fibre, weave and laundry performance decide how hotel bed linen feels and lasts; the right choice depends on the property.',
        body: [
          'Thread count is usually the first number hotels compare when buying bed linen, yet it tells only part of the story. Two sheets with the same count can feel very different in the guest room, and different again after fifty commercial washes.',
          'Thread count measures the threads woven into one square inch of fabric. Some labels inflate it by counting multi-ply yarns several times, so an honestly counted 300 can outperform a sheet marketed at 800.',
          'Fibre quality and weave usually matter more. Long-staple cotton is stronger and softer, percale gives a crisp, cool finish, and sateen a smoother drape with a subtle sheen.',
          'The right specification also depends on the segment. A durable 180–200 thread count percale suits many 3-star hotels, a 250 thread count sateen or percale meets 4-star expectations, and 5-star properties are judged on the whole bed: sheets, duvet weight and decorative layers together.',
          'Whatever the tier, the most reliable test is a practical one: request a physical sample and put it through the property’s own laundry cycle before committing to a bulk order.',
        ],
        image: image('hospitality/fitted-sheet'),
        imageAlt: 'Fitted white sheet on a hotel mattress',
        imageCredit: photo.en,
        facts: [
          ['180–200 TC', 'Durable percale for 3★ hotels'],
          ['250 TC', 'Sateen or percale for 4★ hotels'],
          ['Whole bed', 'What 5★ guests judge'],
        ],
        cta: guide('en'),
      },
      ar: {
        title: 'بياضات الفنادق: ما وراء عدد الخيوط',
        description:
          'عدد الخيوط ليس سوى جزء من الصورة، فالألياف والنسيج والأداء في الغسيل هي ما يحدد ملمس بياضات الفنادق وعمرها، والاختيار الصحيح يختلف من فندق إلى آخر.',
        body: [
          'عدد الخيوط هو غالباً أول رقم تقارنه الفنادق عند شراء البياضات، لكنه لا يروي سوى جزء من القصة. فقد يختلف ملمس ملاءتين بالعدد نفسه في غرفة النزيل، ثم يختلف مجدداً بعد خمسين غسلة تجارية.',
          'يقيس هذا الرقم عدد الخيوط المنسوجة في بوصة مربعة واحدة من القماش، وتضخّمه بعض الملصقات باحتساب الخيوط المزدوجة أكثر من مرة، فقد تتفوق ملاءة بعدد حقيقي يبلغ 300 على أخرى تُسوَّق بـ 800.',
          'وغالباً ما تكون جودة الألياف ونوع النسيج أهم، فالقطن طويل التيلة أقوى وأنعم، ونسيج البيركال يمنح ملمساً منعشاً ومشدوداً، والساتان انسيابية أنعم ولمعة خفيفة.',
          'وتعتمد المواصفات المناسبة أيضاً على فئة الفندق، فبيركال متين بعدد خيوط بين 180 و200 يناسب كثيراً من فنادق الثلاث نجوم، وساتان أو بيركال بعدد 250 يلبي توقعات فنادق الأربع نجوم، أما فنادق الخمس نجوم فتُقيَّم على السرير كاملاً: الملاءات ووزن اللحاف والطبقات الزخرفية معاً.',
          'ومهما كانت الفئة، يبقى الاختبار العملي هو الأوثق: اطلب عينة فعلية وأخضعها لدورة الغسيل في فندقك قبل الالتزام بطلبية كبيرة.',
        ],
        image: image('hospitality/fitted-sheet'),
        imageAlt: 'ملاءة بيضاء مطاطية على فرشة فندقية',
        imageCredit: photo.ar,
        facts: [
          // The isolate keeps the range in reading order inside right-to-left text.
          ['⁦180–200⁩ خيط', 'بيركال متين لفنادق الثلاث نجوم'],
          ['250 خيطاً', 'ساتان أو بيركال لفنادق الأربع نجوم'],
          ['السرير كاملاً', 'ما يقيّمه نزلاء الخمس نجوم'],
        ],
        cta: guide('ar'),
      },
      tr: {
        title: 'Otel nevresimleri: iplik sayısının ötesine bakmak',
        seoTitle: 'Otel nevresimleri: iplik sayısının ötesi',
        description:
          'İplik sayısı hikâyenin yalnızca bir parçası. Otel nevresiminin hissini ve ömrünü lif, dokuma ve yıkama performansı belirler; doğru seçim otele göre değişir.',
        body: [
          'İplik sayısı, oteller nevresim alırken genellikle karşılaştırdıkları ilk rakamdır; ama hikâyenin yalnızca bir kısmını anlatır. Aynı iplik sayısına sahip iki çarşaf misafir odasında çok farklı hissettirebilir, elli endüstriyel yıkamadan sonra ise yine farklı.',
          'İplik sayısı, kumaşın bir inç karesine dokunan iplikleri ölçer. Bazı etiketler katlı iplikleri birkaç kez sayarak bu rakamı şişirir; dürüstçe sayılmış 300’lük bir çarşaf, 800 diye pazarlanan birinden daha iyi performans gösterebilir.',
          'Lif kalitesi ve dokuma çoğu zaman daha önemlidir. Uzun elyaflı pamuk daha güçlü ve yumuşaktır; perkal serin ve diri bir his, saten ise hafif parlak ve daha yumuşak bir döküm verir.',
          'Doğru özellik segmente de bağlıdır. Dayanıklı 180–200 iplik perkal birçok 3 yıldızlı otele uyar, 250 iplik saten veya perkal 4 yıldız beklentilerini karşılar; 5 yıldızlı oteller ise çarşaf, yorgan ağırlığı ve dekoratif katmanlarla yatağın bütünüyle değerlendirilir.',
          'Segment ne olursa olsun en güvenilir test pratiktir: toplu siparişten önce fiziksel bir numune isteyin ve onu otelinizin kendi yıkama döngüsünden geçirin.',
        ],
        image: image('hospitality/fitted-sheet'),
        imageAlt: 'Otel yatağında beyaz lastikli çarşaf',
        imageCredit: photo.tr,
        facts: [
          ['180–200 TC', '3★ oteller için dayanıklı perkal'],
          ['250 TC', '4★ oteller için saten veya perkal'],
          ['Yatağın bütünü', '5★ misafirlerin değerlendirdiği'],
        ],
        cta: guide('tr'),
      },
    },
  },
  {
    slug: 'hotel-towels-choosing-gsm',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Hotel towels: matching weight to the property',
        seoTitle: 'Hotel towels: choosing the right GSM',
        description:
          'GSM shapes a towel’s absorbency, feel, drying time and laundry cost. How hotels can match towel weight to their segment and use instead of choosing the heaviest.',
        body: [
          'GSM, grams per square metre, is the standard measure of a towel’s density. It is tempting to treat a higher number as simply better, but in a working hotel that assumption quickly becomes expensive.',
          'Heavier towels are thicker, more absorbent and feel more luxurious. They also take longer to dry between guest turnovers, cost more to launder and add weight to every shipment, which can turn a busy bathroom into a housekeeping bottleneck.',
          'The better approach is to match weight to use: around 400–500 GSM for hand and face towels that change often, 500–600 GSM for everyday bath towels in 3 and 4-star hotels, 600–700 GSM for bath towels and mats in 4 and 5-star properties, and 700 GSM and above for spa, pool and signature towels.',
          'Construction matters as much as weight. The cotton and the hems decide how a towel looks after months of industrial washing, not only on the day it arrives.',
          'The right choice balances guest comfort with drying capacity, laundry cycle time and replacement budget, a trade-off worth modelling against the property’s own occupancy before placing an order.',
        ],
        image: image('hospitality/hotel-bath-sheet'),
        imageAlt: 'Folded white hotel bath towels on a rack',
        imageCredit: photo.en,
        facts: [
          ['400–500 GSM', 'Hand and face towels'],
          ['500–600 GSM', 'Bath towels, 3–4★ hotels'],
          ['600–700 GSM', 'Bath towels, 4–5★ hotels'],
        ],
        cta: guide('en'),
      },
      ar: {
        title: 'مناشف الفنادق: اختيار الوزن المناسب لكل فندق',
        seoTitle: 'مناشف الفنادق: اختيار الوزن المناسب',
        description:
          'يحدد وزن المنشفة امتصاصها وملمسها ووقت تجفيفها وتكلفة غسيلها. كيف تختار الفنادق وزن المناشف وفق فئتها واستخدامها بدلاً من اختيار الأثقل فحسب.',
        body: [
          'يُقاس وزن المنشفة بالغرام لكل متر مربع (GSM)، وهو المقياس المعتاد لكثافتها. ومن المغري اعتبار الرقم الأعلى أفضل دائماً، لكن هذا الافتراض يصبح مكلفاً بسرعة في فندق يعمل يومياً.',
          'فالمناشف الأثقل أسمك وأكثر امتصاصاً وأفخم ملمساً، لكنها تحتاج وقتاً أطول لتجف بين نزيل وآخر، وتكلف أكثر في الغسيل، وتزيد وزن كل شحنة، ما قد يجعل الحمّامات كثيرة الاستخدام عبئاً على فرق التدبير الفندقي.',
          'والأفضل مطابقة الوزن مع الاستخدام: من 400 إلى 500 غرام لمناشف اليد والوجه التي تُبدَّل كثيراً، ومن 500 إلى 600 لمناشف الاستحمام اليومية في فنادق الثلاث والأربع نجوم، ومن 600 إلى 700 لمناشف الاستحمام ودواسات الحمّام في فنادق الأربع والخمس نجوم، و700 غرام فما فوق لمناشف السبا والمسبح والمناشف المميزة.',
          'والصناعة لا تقل أهمية عن الوزن، فنوعية القطن والحواف هي التي تحدد شكل المنشفة بعد أشهر من الغسيل الصناعي، لا يوم وصولها فقط.',
          'ويوازن الاختيار الصحيح بين راحة النزيل وسعة التجفيف ومدة دورة الغسيل وميزانية الاستبدال، وهي معادلة تستحق دراستها وفق نسبة إشغال الفندق قبل تقديم الطلب.',
        ],
        image: image('hospitality/hotel-bath-sheet'),
        imageAlt: 'مناشف استحمام فندقية بيضاء مطوية على رف',
        imageCredit: photo.ar,
        facts: [
          ['⁦400–500⁩ غرام', 'مناشف اليد والوجه'],
          ['⁦500–600⁩ غرام', 'مناشف الاستحمام لفنادق الثلاث والأربع نجوم'],
          ['⁦600–700⁩ غرام', 'مناشف الاستحمام لفنادق الأربع والخمس نجوم'],
        ],
        cta: guide('ar'),
      },
      tr: {
        title: 'Otel havluları: ağırlığı otele göre seçmek',
        seoTitle: 'Otel havluları: doğru GSM nasıl seçilir?',
        description:
          'GSM, bir havlunun emiciliğini, hissini, kuruma süresini ve yıkama maliyetini belirler. Oteller havlu ağırlığını segmentlerine ve kullanım amacına göre nasıl seçmeli?',
        body: [
          'GSM, yani metrekare başına gram, bir havlunun yoğunluğunun standart ölçüsüdür. Daha yüksek rakamı doğrudan daha iyi saymak cazip gelir, ancak çalışan bir otelde bu varsayım kısa sürede pahalıya mal olur.',
          'Daha ağır havlular daha kalın, daha emici ve daha lüks hissettirir. Ancak misafir değişimleri arasında daha geç kurur, yıkaması daha pahalıdır ve her sevkiyata ağırlık ekler; yoğun kullanılan bir banyoyu kat hizmetleri için darboğaza çevirebilir.',
          'Daha iyi yaklaşım, ağırlığı kullanıma göre seçmektir: sık değişen el ve yüz havluları için yaklaşık 400–500 GSM, 3 ve 4 yıldızlı otellerde günlük banyo havluları için 500–600 GSM, 4 ve 5 yıldızlı otellerde banyo havluları ve paspaslar için 600–700 GSM, spa, havuz ve imza havluları için 700 GSM ve üzeri.',
          'İşçilik de ağırlık kadar önemlidir. Pamuğun kalitesi ve kenar dikişleri, bir havlunun yalnızca geldiği gün değil, aylarca endüstriyel yıkamadan sonra nasıl göründüğünü belirler.',
          'Doğru seçim, misafir konforunu kurutma kapasitesi, yıkama süresi ve yenileme bütçesiyle dengeler; sipariş öncesinde bu dengeyi otelin kendi doluluğuna göre modellemek değerlidir.',
        ],
        image: image('hospitality/hotel-bath-sheet'),
        imageAlt: 'Rafta katlanmış beyaz otel banyo havluları',
        imageCredit: photo.tr,
        facts: [
          ['400–500 GSM', 'El ve yüz havluları'],
          ['500–600 GSM', 'Banyo havluları, 3–4★ oteller'],
          ['600–700 GSM', 'Banyo havluları, 4–5★ oteller'],
        ],
        cta: guide('tr'),
      },
    },
  },
  {
    slug: 'turkiye-hub-for-hotel-textiles',
    category: 'trade',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Why Türkiye remains a hub for hotel textiles',
        description:
          'Decades of cotton, weaving and finishing expertise and short routes to Europe and the Gulf make Türkiye a natural source of hotel textiles. What buyers should check.',
        body: [
          'Türkiye has supplied hotel textiles to Europe and the Gulf for decades. Its position is built on cotton cultivation and on weaving and finishing infrastructure concentrated in a small number of industrial regions.',
          'Many manufacturers there are used to requirements specific to hospitality: colourfastness against commercial bleach, seams built for industrial tumble drying, and production runs sized for a property’s ongoing par stock rather than only large retail orders.',
          'Geography helps as well. Export routes to Europe, the Gulf and North Africa are shorter and more established than from many competing regions, which shows up in more predictable lead times.',
          'The capability only becomes an advantage when the supplier relationship is managed well. Buyers should ask which region and facility will produce their order, test a physical sample in their own laundry, confirm export documentation to their country, and agree specifications and terms in writing before production begins.',
          'That is why HADARA Hospitality is based in Istanbul: to work directly with manufacturing partners across Türkiye on behalf of hotels in the Gulf region and Europe.',
        ],
        image: image('insights/hotel-bed-blanket'),
        imageAlt: 'Woven blanket folded over the end of a hotel bed',
        imageCredit: photo.en,
        cta: visit('en'),
      },
      ar: {
        title: 'لماذا تبقى تركيا مركزاً لمنسوجات الفنادق',
        description:
          'عقود من الخبرة في القطن والنسيج والتشطيب، وطرق شحن قصيرة إلى أوروبا والخليج، تجعل تركيا مصدراً طبيعياً لمنسوجات الفنادق. وهذا ما ينبغي للمشتري التحقق منه.',
        body: [
          'تورّد تركيا منسوجات الفنادق إلى أوروبا والخليج منذ عقود، وتستند مكانتها إلى زراعة القطن وبنية تحتية للنسيج والتشطيب تتركز في عدد محدود من المناطق الصناعية.',
          'واعتاد كثير من المصنّعين هناك على متطلبات خاصة بقطاع الضيافة، مثل ثبات الألوان أمام مواد التبييض التجارية، ودرزات مصممة للتجفيف الصناعي، ودفعات إنتاج تناسب احتياجات الفندق المستمرة من المخزون، لا الطلبيات الكبيرة لقطاع التجزئة فقط.',
          'وتساعد الجغرافيا أيضاً، فطرق التصدير إلى أوروبا والخليج وشمال أفريقيا أقصر وأكثر رسوخاً من كثير من المناطق المنافسة، وهو ما ينعكس في مواعيد تسليم أكثر قابلية للتوقع.',
          'لكن هذه القدرة لا تصبح ميزة إلا حين تُدار العلاقة مع المورّد جيداً. فعلى المشتري أن يسأل عن المنطقة والمصنع الذي سينتج طلبيته، وأن يختبر عينة فعلية في مغسلة فندقه، وأن يتأكد من مستندات التصدير إلى بلده، وأن يتفق على المواصفات والشروط كتابياً قبل بدء الإنتاج.',
          'ولهذا تتخذ حضارة للضيافة من إسطنبول مقراً لها، لتعمل مباشرة مع شركاء التصنيع في أنحاء تركيا لصالح الفنادق في منطقة الخليج وأوروبا.',
        ],
        image: image('insights/hotel-bed-blanket'),
        imageAlt: 'بطانية منسوجة مطوية على طرف سرير فندقي',
        imageCredit: photo.ar,
        cta: visit('ar'),
      },
      tr: {
        title: 'Türkiye neden otel tekstilinin merkezi olmaya devam ediyor?',
        seoTitle: 'Türkiye neden otel tekstilinin merkezi?',
        description:
          'Pamuk, dokuma ve terbiyede onlarca yıllık birikim ve Avrupa ile Körfez’e kısa rotalar Türkiye’yi otel tekstilinde doğal bir kaynak yapıyor. Alıcılar neye bakmalı?',
        body: [
          'Türkiye, onlarca yıldır Avrupa ve Körfez’e otel tekstili tedarik ediyor. Bu konum; pamuk üretimine ve az sayıda sanayi bölgesinde yoğunlaşan dokuma ve terbiye altyapısına dayanıyor.',
          'Oradaki pek çok üretici konaklama sektörüne özgü gerekliliklere alışkındır: endüstriyel ağartıcılara karşı renk haslığı, endüstriyel kurutmaya dayanıklı dikişler ve yalnızca büyük perakende siparişlerine değil, bir otelin süregelen stok ihtiyacına göre boyutlanan üretim partileri.',
          'Coğrafya da yardımcı olur. Avrupa, Körfez ve Kuzey Afrika’ya ihracat rotaları birçok rakip bölgeye göre daha kısa ve daha yerleşiktir; bu da daha öngörülebilir teslim sürelerine yansır.',
          'Ancak bu kapasite, tedarikçi ilişkisi iyi yönetildiğinde avantaja dönüşür. Alıcılar siparişlerinin hangi bölgede ve tesiste üretileceğini sormalı, fiziksel bir numuneyi kendi çamaşırhanelerinde test etmeli, kendi ülkelerine ihracat belgelerini teyit etmeli ve üretim başlamadan önce özellikleri ve koşulları yazılı olarak kararlaştırmalıdır.',
          'HADARA Hospitality’nin İstanbul’da bulunmasının nedeni de budur: Körfez bölgesi ve Avrupa’daki oteller adına Türkiye genelindeki üretim ortaklarıyla doğrudan çalışmak.',
        ],
        image: image('insights/hotel-bed-blanket'),
        imageAlt: 'Otel yatağının ucuna katlanmış dokuma battaniye',
        imageCredit: photo.tr,
        cta: visit('tr'),
      },
    },
  },
  {
    slug: 'durable-hotel-textiles-sustainability',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Durability: the most practical form of sustainability in hotel textiles',
        seoTitle: 'Durable hotel textiles and sustainability',
        description:
          'A towel that lasts longer has a smaller footprint than one replaced three times. How durability, sourcing and smarter ordering make hotel textiles more sustainable.',
        body: [
          'Sustainability in hotel textiles has moved from a marketing line to a real purchasing criterion, driven as much by owners watching operating costs as by guests asking where products come from.',
          'The most practical lever is durability. A towel that survives 150 wash cycles has a smaller footprint than a cheaper one replaced three times over the same period, and it costs less per guest-night too.',
          'Durability should be specified, not assumed. Before ordering, ask how many industrial wash cycles a fabric was tested against, how much it shrinks after the first washes, whether the dye resists commercial bleach and hot water, and how seams and hems hold up under repeated tumble drying.',
          'Sourcing comes next: where the raw fibre is grown and processed, how the manufacturing partner manages water and dye discharge, and whether orders can be consolidated into fewer shipments instead of frequent small reorders.',
          'A credible programme does not have to change everything at once. Starting with the highest-volume categories, towels and bed linen, and asking suppliers for real answers on fibre origin and durability is a step both owners and guests can see.',
        ],
        image: image('insights/quilted-pillow-protector'),
        imageAlt: 'Quilted white pillow protector',
        imageCredit: photo.en,
        cta: visit('en'),
      },
      ar: {
        title: 'المتانة: الشكل الأكثر عملية للاستدامة في منسوجات الفنادق',
        seoTitle: 'منسوجات الفنادق المتينة والاستدامة',
        description:
          'المنشفة التي تدوم أطول أثرها البيئي أقل من منشفة أرخص تُستبدل ثلاث مرات. كيف تجعل المتانة والتوريد المدروس والطلب الذكي برامج منسوجات الفنادق أكثر استدامة.',
        body: [
          'انتقلت الاستدامة في منسوجات الفنادق من شعار تسويقي إلى معيار شراء حقيقي، يدفعه الملاك الذين يراقبون تكاليف التشغيل بقدر ما يدفعه النزلاء الذين يسألون عن مصدر المنتجات.',
          'وأكثر الأدوات عملية هي المتانة، فالمنشفة التي تصمد 150 دورة غسيل أثرها البيئي أقل من منشفة أرخص تُستبدل ثلاث مرات في الفترة نفسها، كما أن تكلفتها لكل ليلة إقامة أقل أيضاً.',
          'وينبغي أن تُحدَّد المتانة في المواصفات لا أن تُفترض. فقبل الطلب، اسأل: كم دورة غسيل صناعي اختُبر عليها القماش؟ وكم ينكمش بعد الغسلات الأولى؟ وهل تثبت ألوانه أمام مواد التبييض التجارية والماء الساخن؟ وكيف تصمد الدرزات والحواف أمام التجفيف المتكرر؟',
          'ثم يأتي التوريد: أين تُزرع الألياف الخام وتُعالج، وكيف يدير شريك التصنيع المياه وتصريف الأصباغ، وهل يمكن تجميع الطلبيات في شحنات أقل بدلاً من طلبات صغيرة متكررة.',
          'ولا يحتاج البرنامج الموثوق إلى تغيير كل شيء دفعة واحدة، فالبدء بالفئات الأعلى استهلاكاً، أي المناشف والبياضات، وطلب إجابات حقيقية من الموردين عن مصدر الألياف ومتانتها خطوة يراها الملاك والنزلاء معاً.',
        ],
        image: image('insights/quilted-pillow-protector'),
        imageAlt: 'واقي وسادة أبيض مبطّن',
        imageCredit: photo.ar,
        cta: visit('ar'),
      },
      tr: {
        title: 'Dayanıklılık: otel tekstilinde sürdürülebilirliğin en pratik biçimi',
        seoTitle: 'Dayanıklı otel tekstili ve sürdürülebilirlik',
        description:
          'Uzun ömürlü bir havlunun ayak izi, üç kez yenilenen ucuz bir havludan küçüktür. Dayanıklılık ve bilinçli tedarik otel tekstilini nasıl sürdürülebilir kılar?',
        body: [
          'Otel tekstilinde sürdürülebilirlik bir pazarlama cümlesinden gerçek bir satın alma kriterine dönüştü; bunu işletme maliyetlerini izleyen sahipler kadar ürünlerin nereden geldiğini soran misafirler de yönlendiriyor.',
          'En pratik araç dayanıklılıktır. 150 yıkamaya dayanan bir havlunun ayak izi, aynı sürede üç kez yenilenen daha ucuz bir havludan küçüktür; konaklama gecesi başına maliyeti de daha düşüktür.',
          'Dayanıklılık varsayılmamalı, şartnameye yazılmalıdır. Sipariş öncesinde kumaşın kaç endüstriyel yıkamaya karşı test edildiğini, ilk yıkamalardan sonra ne kadar çektiğini, boyanın endüstriyel ağartıcıya ve sıcak suya dayanıp dayanmadığını ve dikişlerin tekrarlanan kurutmada nasıl dayandığını sorun.',
          'Sonraki adım tedariktir: ham lifin nerede yetiştirilip işlendiği, üretim ortağının su ve boya atıklarını nasıl yönettiği ve siparişlerin sık küçük siparişler yerine daha az sevkiyatta birleştirilip birleştirilemeyeceği.',
          'Güvenilir bir program her şeyi bir anda değiştirmek zorunda değildir. En yüksek hacimli kategorilerle, havlu ve nevresimle başlamak ve tedarikçilerden lif kaynağı ile dayanıklılık konusunda gerçek yanıtlar istemek, sahiplerin ve misafirlerin görebileceği bir adımdır.',
        ],
        image: image('insights/quilted-pillow-protector'),
        imageAlt: 'Kapitone beyaz yastık alezi',
        imageCredit: photo.tr,
        cta: visit('tr'),
      },
    },
  },
  {
    slug: 'hotel-bed-linen-by-star-rating',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-10-08',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Hotel bed linen for 3, 4 and 5-star hotels',
        description:
          'The right bed linen is not the most expensive one but the one matched to the hotel’s star rating, guests and laundry. A guide for 3, 4 and 5-star hotels.',
        body: [
          'A 3-star city hotel and a 5-star resort should not buy the same bed linen. The right specification follows the guests’ expectations, the room rate and the laundry programme, not the highest thread count on a price list.',
          'At 3-star level, guests notice crisp, clean and well-pressed sheets rather than a number on a label. A durable percale of around 180–200 thread count in long-staple cotton, chosen for how it survives washing, usually serves better than a “premium” sheet that wears out sooner.',
          'At 4-star level, guests expect a softer hand and a fuller-looking bed. A sateen or percale of around 250 thread count with a mid-weight duvet usually meets that expectation without paying for gains guests will not feel.',
          'At 5-star and resort properties, guests judge the whole bed rather than the sheet alone: a sateen finish, a choice of duvet weights and a decorative layer all shape the made bed they remember and photograph.',
          'At every level, three things matter more than the label: the quality and staple length of the cotton, the weave (percale for a crisp finish, sateen for a softer drape) and whether the fabric holds up in the hotel’s own commercial laundry. That is why a specification is best checked on a sample, washed in that laundry, before a bulk order.',
        ],
        image: image('insights/hotel-linen-star-rating'),
        imageAlt: 'Hotel bed with white striped sateen linen and pillows',
        imageCredit: illustration.en,
        facts: [
          ['180–200 TC', 'Durable percale, 3★'],
          ['~250 TC', 'Sateen or percale, 4★'],
          ['The whole bed', 'Sateen and duvet options, 5★'],
        ],
        cta: page('en', '/collections/bed-linen', bedLinen),
      },
      ar: {
        title: 'بياضات الأسرّة لفنادق 3 و4 و5 نجوم',
        description:
          'البياضات المناسبة ليست الأغلى، بل تلك التي تناسب فئة الفندق ونزلاءه ونظام الغسيل فيه. دليل لاختيار بياضات الأسرّة لفنادق الثلاث والأربع والخمس نجوم.',
        body: [
          'لا ينبغي لفندق مدينة من فئة ثلاث نجوم ومنتجع من فئة خمس نجوم أن يشتريا البياضات نفسها. فالمواصفات الصحيحة تتبع توقعات النزلاء وسعر الغرفة ونظام الغسيل، لا أعلى عدد خيوط في قائمة الأسعار.',
          'في فنادق الثلاث نجوم يلاحظ النزيل نظافة الشراشف وانتعاشها وكيّها الجيد أكثر من أي رقم على البطاقة. ولذلك يخدم قماش البيركال المتين من القطن طويل التيلة، بعدد خيوط بين 180 و200 تقريباً، أفضل من شرشف «فاخر» يبلى أسرع.',
          'وفي فنادق الأربع نجوم يتوقع النزيل ملمساً أنعم وسريراً يبدو أكثر امتلاءً، وغالباً ما يلبّي ذلك قماش ساتان أو بيركال بعدد خيوط يقارب 250 مع لحاف متوسط الوزن، دون دفع ثمن فروق لا يشعر بها النزيل.',
          'أما فنادق الخمس نجوم والمنتجعات فيحكم فيها النزيل على السرير كاملاً لا على الشرشف وحده: لمسة الساتان، وخيارات أوزان اللحاف، وطبقة زخرفية، كلها تصنع السرير الذي يتذكره النزيل ويصوّره.',
          'وفي كل الفئات تبقى ثلاثة أمور أهم من البطاقة: جودة القطن وطول تيلته، ونوع النسج (البيركال لملمس منتعش والساتان لانسدال أنعم)، وصمود القماش في مغسلة الفندق نفسه. لذلك يُستحسن اختبار المواصفات على عيّنة تُغسل في تلك المغسلة قبل الطلب الكبير.',
        ],
        image: image('insights/hotel-linen-star-rating'),
        imageAlt: 'سرير فندقي ببياضات ساتان بيضاء مخططة ووسائد',
        imageCredit: illustration.ar,
        facts: [
          ['⁦180–200⁩ خيط', 'بيركال متين، 3 نجوم'],
          ['نحو 250 خيطاً', 'ساتان أو بيركال، 4 نجوم'],
          ['السرير كاملاً', 'ساتان وخيارات لحاف، 5 نجوم'],
        ],
        cta: page('ar', '/collections/bed-linen', bedLinen),
      },
      tr: {
        title: '3, 4 ve 5 yıldızlı oteller için yatak tekstili',
        description:
          'Doğru nevresim en pahalısı değil; otelin yıldız sınıfına, misafirlerine ve çamaşırhanesine uygun olandır. 3, 4 ve 5 yıldızlı oteller için yatak tekstili rehberi.',
        body: [
          '3 yıldızlı bir şehir oteliyle 5 yıldızlı bir tatil köyü aynı yatak tekstilini almamalı. Doğru şartname, fiyat listesindeki en yüksek iplik sayısını değil; misafir beklentisini, oda fiyatını ve yıkama programını izler.',
          '3 yıldızlı otellerde misafir, etiketteki rakamdan çok çarşafların temizliğini, canlılığını ve ütüsünü fark eder. Uzun elyaflı pamuktan, yaklaşık 180–200 iplik sayılı dayanıklı bir perkal, daha çabuk yıpranan “premium” bir çarşaftan genellikle daha iyi hizmet verir.',
          '4 yıldızlı otellerde misafir daha yumuşak bir dokunuş ve daha dolgun görünen bir yatak bekler. Yaklaşık 250 iplik sayılı saten ya da perkal ve orta ağırlıkta bir yorgan, misafirin hissetmeyeceği farklara para ödemeden bu beklentiyi çoğunlukla karşılar.',
          '5 yıldızlı otellerde ve tatil köylerinde misafir yalnızca çarşafı değil, yatağın bütününü değerlendirir: saten yüzey, farklı yorgan ağırlıkları ve dekoratif bir katman, misafirin hatırladığı ve fotoğrafladığı yatağı oluşturur.',
          'Her sınıfta üç şey etiketten daha önemlidir: pamuğun kalitesi ve elyaf uzunluğu, dokuma (canlı bir doku için perkal, daha yumuşak bir düşüş için saten) ve kumaşın otelin kendi endüstriyel çamaşırhanesinde dayanıp dayanmadığı. Bu yüzden şartnameyi toplu siparişten önce o çamaşırhanede yıkanan bir numuneyle denemek en doğrusudur.',
        ],
        image: image('insights/hotel-linen-star-rating'),
        imageAlt: 'Beyaz çizgili saten nevresimli ve yastıklı otel yatağı',
        imageCredit: illustration.tr,
        facts: [
          ['180–200 TC', 'Dayanıklı perkal, 3★'],
          ['~250 TC', 'Saten veya perkal, 4★'],
          ['Yatağın bütünü', 'Saten ve yorgan seçenekleri, 5★'],
        ],
        cta: page('tr', '/collections/bed-linen', bedLinen),
      },
    },
  },
  {
    slug: 'hotel-pillows-and-duvets',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-10-08',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Hotel pillows and duvets: firmness, fill and weight',
        seoTitle: 'How to choose hotel pillows and duvets',
        description:
          'Sheets get most of the attention, but the pillow and duvet shape a guest’s night. How hotels choose firmness, fill and duvet weight, and when to replace them.',
        body: [
          'Hotel bedding decisions tend to focus on sheets and thread count, yet it is the pillow under a guest’s head and the duvet over them that shape how the night feels, and how it is reviewed.',
          'There is no single right firmness. Rather than standardising on one pillow that suits some guests and disappoints others, many hotels offer a small, consistent range, typically soft and medium-firm.',
          'Microfibre fill has become the practical standard in hospitality: it keeps its shape through frequent commercial washing, resists clumping better than cheaper fills and avoids the allergy concerns some guests associate with down.',
          'Duvet weight should follow the climate and the season, not only the brand standard: light for warm climates and air-conditioned properties all year, medium as the safest default for most 3 to 5-star hotels, and heavier for mountain or resort properties with genuinely cold nights. One cover size and closure across the property keeps housekeeping simple.',
          'Pillows and duvet inserts lose loft and hygiene well before they look worn, so a planned replacement cycle protects comfort better than waiting until they look tired.',
        ],
        image: image('insights/hotel-pillows'),
        imageAlt: 'White hotel pillows on a made bed',
        imageCredit: illustration.en,
        facts: [
          ['Soft · medium-firm', 'A small pillow range'],
          ['Microfibre', 'The practical standard fill'],
          ['Light · medium · heavy', 'Duvet weight by climate'],
        ],
        cta: page('en', '/collections/pillows', pillows),
      },
      ar: {
        title: 'وسائد الفنادق ولحفها: كيف تختار الأنسب؟',
        description:
          'تنال الشراشف معظم الاهتمام، لكن الوسادة واللحاف هما ما يصنعان ليلة النزيل. كيف تختار الفنادق صلابة الوسائد وحشوها ووزن اللحاف، ومتى تستبدلها.',
        body: [
          'تتركز قرارات أسرّة الفنادق عادةً على الشراشف وعدد الخيوط، لكن الوسادة التي يضع النزيل رأسه عليها واللحاف الذي يتغطى به هما ما يصنعان إحساسه بالليلة، وتقييمه لها.',
          'لا توجد صلابة واحدة صحيحة للجميع. فبدلاً من اعتماد وسادة واحدة تناسب بعض النزلاء وتخيّب آخرين، تقدّم فنادق كثيرة تشكيلة صغيرة ثابتة، عادةً وسادة ناعمة وأخرى متوسطة الصلابة.',
          'وأصبح حشو الألياف الدقيقة (المايكروفايبر) المعيار العملي في الضيافة: يحافظ على شكله مع الغسيل التجاري المتكرر، ويقاوم التكتل أكثر من الحشوات الأرخص، ويتجنب مخاوف الحساسية التي يربطها بعض النزلاء بالريش.',
          'ويتبع وزن اللحاف المناخ والموسم لا معيار العلامة فقط: خفيف للمناطق الحارة والفنادق المكيفة طوال العام، ومتوسط كخيار آمن لمعظم فنادق الثلاث إلى الخمس نجوم، وأثقل للفنادق الجبلية والمنتجعات ذات الليالي الباردة فعلاً. كما أن توحيد مقاس غطاء اللحاف وطريقة إغلاقه في الفندق كله يسهّل عمل فرق التدبير الفندقي.',
          'وتفقد الوسائد وحشوات اللحف انتفاخها ومستوى نظافتها قبل أن يظهر عليها البلى بوقت طويل، لذا تحمي دورة استبدال مخططة راحة النزيل أكثر من الانتظار حتى يبدو عليها التعب.',
        ],
        image: image('insights/hotel-pillows'),
        imageAlt: 'وسائد فندقية بيضاء على سرير مرتب',
        imageCredit: illustration.ar,
        facts: [
          ['ناعمة ومتوسطة', 'تشكيلة وسائد صغيرة'],
          ['مايكروفايبر', 'الحشو العملي المعتاد'],
          ['خفيف · متوسط · ثقيل', 'وزن اللحاف حسب المناخ'],
        ],
        cta: page('ar', '/collections/pillows', pillows),
      },
      tr: {
        title: 'Otel yastıkları ve yorganları nasıl seçilir?',
        description:
          'Çarşaflar ilgiyi toplar, ancak misafirin gecesini yastık ve yorgan belirler. Oteller sertliği, dolguyu ve yorgan ağırlığını nasıl seçmeli, ne zaman yenilemeli?',
        body: [
          'Otel yatağıyla ilgili kararlar genellikle çarşaf ve iplik sayısına odaklanır; oysa gecenin nasıl geçtiğini ve nasıl yorumlandığını misafirin başını koyduğu yastık ve üzerine çektiği yorgan belirler.',
          'Herkese uyan tek bir sertlik yoktur. Bazı misafirleri memnun edip diğerlerini hayal kırıklığına uğratan tek bir yastık yerine birçok otel küçük ve tutarlı bir seçenek sunar; genellikle yumuşak ve orta sert.',
          'Mikrofiber dolgu konaklama sektöründe pratik standart haline geldi: sık endüstriyel yıkamada formunu korur, ucuz dolgulara göre daha az topaklanır ve bazı misafirlerin kaz tüyüyle ilişkilendirdiği alerji kaygısını taşımaz.',
          'Yorgan ağırlığı yalnızca marka standardına değil iklime ve mevsime göre seçilmelidir: sıcak iklimler ve yıl boyu klimalı oteller için hafif, 3–5 yıldızlı otellerin çoğu için en güvenli varsayılan olarak orta, gerçekten soğuk gecelerin yaşandığı dağ otelleri ve tatil köyleri için daha ağır. Tüm otelde tek bir nevresim ölçüsü ve kapama sistemi kat hizmetlerini kolaylaştırır.',
          'Yastıklar ve yorgan içleri, yıpranmış görünmeden çok önce kabarıklığını ve hijyenini kaybeder; bu yüzden planlı bir yenileme döngüsü misafir konforunu, eskidiği görülene kadar beklemekten daha iyi korur.',
        ],
        image: image('insights/hotel-pillows'),
        imageAlt: 'Hazırlanmış yatakta beyaz otel yastıkları',
        imageCredit: illustration.tr,
        facts: [
          ['Yumuşak · orta sert', 'Küçük bir yastık seçkisi'],
          ['Mikrofiber', 'Pratik standart dolgu'],
          ['Hafif · orta · ağır', 'İklime göre yorgan ağırlığı'],
        ],
        cta: page('tr', '/collections/pillows', pillows),
      },
    },
  },
  {
    slug: 'spa-bathrobes-and-towels',
    category: 'hospitality',
    status: 'published',
    approved: true,
    publishedAt: '2026-10-08',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Spa bathrobes and towels that last',
        description:
          'Spa textiles must feel indulgent yet survive constant moisture and frequent washing. Terry or waffle, towel weight and what to specify for high-frequency use.',
        body: [
          'Spa and wellness textiles face a harder mix of demands than almost any other hotel category: they must feel indulgent at first touch, survive far more frequent laundering than a guest-room towel and keep their shape and softness through it.',
          'Terry and waffle do different jobs. Terry robes and towels offer the most absorbency and a familiar plush feel, the right choice for pool and bath-focused properties. Waffle weaves are lighter and dry faster, better suited to warm climates and treatment spas where guests move often between wet and dry areas.',
          'For high-frequency use, specifications usually include heavier towels of around 700–800 GSM that outlast frequent washing, reinforced seams on robes, and fabric that resists pilling after high-heat industrial drying.',
          'Consistency matters too: buying from the same supplier keeps replacement stock matching the texture and colour already in use, so a spa never looks like a mix of generations.',
        ],
        image: image('insights/spa-bathrobe'),
        imageAlt: 'White bathrobe and towel hanging in a spa bathroom',
        imageCredit: illustration.en,
        facts: [
          ['Terry', 'Absorbent and plush'],
          ['Waffle', 'Light and fast-drying'],
          ['700–800 GSM', 'Spa towels for frequent washing'],
        ],
        cta: page('en', '/collections/robes', robes),
      },
      ar: {
        title: 'أرواب ومناشف السبا التي تدوم',
        description:
          'يجب أن تمنح منسوجات السبا إحساساً بالرفاهية وأن تتحمل الرطوبة الدائمة والغسيل المتكرر. التيري أم الوافل، ووزن المناشف، وما يلزم للاستخدام الكثيف.',
        body: [
          'تواجه منسوجات السبا والعافية متطلبات أصعب من أي فئة فندقية أخرى تقريباً: يجب أن تمنح إحساساً بالرفاهية من اللمسة الأولى، وأن تتحمل غسيلاً أكثر تكراراً بكثير من مناشف الغرف، وأن تحافظ على شكلها ونعومتها رغم ذلك.',
          'ولكلٍّ من التيري والوافل دور مختلف. فأرواب التيري ومناشفه تمنح أعلى امتصاص وملمساً وثيراً مألوفاً، وهي الخيار المناسب للفنادق التي تركز على المسابح والحمّامات. أما نسيج الوافل فأخف وزناً وأسرع جفافاً، وأنسب للمناطق الحارة ومراكز العلاج التي يتنقل فيها النزيل كثيراً بين المناطق الرطبة والجافة.',
          'وللاستخدام الكثيف تتضمن المواصفات عادةً مناشف أثقل بين 700 و800 غرام للمتر المربع تصمد أمام الغسيل المتكرر، وخياطة مقوّاة في الأرواب، وقماشاً يقاوم التوبّر بعد التجفيف الصناعي بالحرارة العالية.',
          'والثبات مهم أيضاً: الشراء من المورّد نفسه يجعل مخزون الاستبدال مطابقاً للملمس واللون المستخدمين، فلا يبدو السبا خليطاً من أجيال مختلفة من المنسوجات.',
        ],
        image: image('insights/spa-bathrobe'),
        imageAlt: 'روب حمّام أبيض ومنشفة معلّقان في حمّام سبا',
        imageCredit: illustration.ar,
        facts: [
          ['تيري', 'امتصاص عالٍ وملمس وثير'],
          ['وافل', 'خفيف وسريع الجفاف'],
          ['⁦700–800⁩ غرام', 'مناشف السبا للغسيل المتكرر'],
        ],
        cta: page('ar', '/collections/robes', robes),
      },
      tr: {
        title: 'Uzun ömürlü spa bornozları ve havluları',
        description:
          'Spa tekstili lüks hissettirmeli, ancak sürekli neme ve sık yıkamaya da dayanmalı. Havlu kumaş mı waffle mı, havlu ağırlığı ve yoğun kullanım için doğru şartname.',
        body: [
          'Spa ve wellness tekstili, neredeyse tüm otel kategorilerinden daha zorlu bir talep karışımıyla karşı karşıyadır: ilk dokunuşta lüks hissettirmeli, oda havlusundan çok daha sık yıkanmaya dayanmalı ve bu süreçte formunu ve yumuşaklığını korumalıdır.',
          'Havlu kumaş (terry) ve waffle farklı işler görür. Terry bornoz ve havlular en yüksek emiciliği ve tanıdık, kabarık bir dokuyu sunar; havuz ve banyo odaklı oteller için doğru seçimdir. Waffle dokuma daha hafiftir ve daha hızlı kurur; sıcak iklimlere ve misafirin ıslak ve kuru alanlar arasında sık geçtiği bakım odaklı spalara daha uygundur.',
          'Yoğun kullanım için şartnameler genellikle sık yıkamaya dayanan, yaklaşık 700–800 GSM ağırlığında daha ağır havluları, bornozlarda güçlendirilmiş dikişleri ve yüksek ısıda endüstriyel kurutmadan sonra tüylenmeye direnen kumaşı içerir.',
          'Tutarlılık da önemlidir: aynı tedarikçiden almak, yenileme stokunun kullanımdaki doku ve renkle eşleşmesini sağlar; böylece spa farklı kuşaklardan tekstillerin karışımı gibi görünmez.',
        ],
        image: image('insights/spa-bathrobe'),
        imageAlt: 'Spa banyosunda asılı beyaz bornoz ve havlu',
        imageCredit: illustration.tr,
        facts: [
          ['Terry', 'Emici ve kabarık'],
          ['Waffle', 'Hafif ve hızlı kuruyan'],
          ['700–800 GSM', 'Sık yıkanan spa havluları'],
        ],
        cta: page('tr', '/collections/robes', robes),
      },
    },
  },
  {
    slug: 'ordering-hotel-textiles',
    category: 'trade',
    status: 'published',
    approved: true,
    publishedAt: '2026-10-08',
    company: 'hospitality',
    translations: {
      en: {
        title: 'Ordering hotel textiles: from inquiry to delivery',
        seoTitle: 'How hotels order textiles, step by step',
        description:
          'A complete request gets an accurate, comparable quotation in days. The five stages of a well-run hotel textile order and where delays usually begin.',
        body: [
          'Ordering textiles for a hotel is rarely a single transaction. Specifications have to be confirmed, samples tested and production planned against a real opening or delivery date, often across a language and a border.',
          'A well-run order moves through five stages: an inquiry that shares the property type, room count and categories needed; samples reviewed against the hotel’s own quality and laundry standards; approval that fixes specifications, quantities and terms in writing; production with regular progress updates; and delivery, with export documents and logistics arranged to the destination.',
          'The first stage decides how fast and how accurate the quotation will be. A complete request names the property type and star rating, quantities per product rather than “please quote your range”, any existing specifications to match (size, colour, GSM or thread count), the delivery city and target date, whether a sample is needed and any branding requirements.',
          'Grouping products precisely pays off: bath towels, hand towels and bath mats quoted separately give a price that can be compared with another offer, where a single line for “bed linen and towels” only returns a range.',
          'Delays rarely start on the factory floor. They usually come from specifications approved verbally instead of in writing, or from samples never tested in real laundry conditions before the bulk order, which is why a clear sampling and approval step saves time rather than costing it.',
        ],
        image: image('insights/hotel-linen-samples'),
        imageAlt: 'Folded white striped hotel bed linen and pillowcases',
        imageCredit: illustration.en,
        facts: [
          ['5 stages', 'From inquiry to delivery'],
          ['In writing', 'Specifications and terms'],
          ['Sample first', 'Tested before the bulk order'],
        ],
        cta: page('en', '/get-a-quote', quote),
      },
      ar: {
        title: 'طلب منسوجات الفنادق من الاستفسار إلى التسليم',
        description:
          'الطلب المكتمل يحصل على عرض سعر دقيق وقابل للمقارنة خلال أيام. المراحل الخمس لطلب منسوجات الفنادق بشكل منظم، ومن أين تبدأ التأخيرات عادةً.',
        body: [
          'نادراً ما يكون طلب منسوجات فندق صفقة واحدة سريعة. فالمواصفات تحتاج إلى تأكيد، والعيّنات إلى اختبار، والإنتاج إلى تخطيط وفق موعد افتتاح أو تسليم حقيقي، وغالباً عبر لغة وحدود مختلفة.',
          'ويمر الطلب المنظم بخمس مراحل: استفسار يوضح نوع المنشأة وعدد الغرف والفئات المطلوبة، ثم عيّنات تُراجع وفق معايير الجودة والغسيل في الفندق نفسه، ثم موافقة تثبّت المواصفات والكميات والشروط كتابةً، ثم إنتاج مع تحديثات منتظمة عن سيره، وأخيراً تسليم مع وثائق التصدير والشحن حتى الوجهة.',
          'والمرحلة الأولى هي التي تحدد سرعة عرض السعر ودقته. فالطلب المكتمل يذكر نوع الفندق وفئته، والكميات لكل منتج بدلاً من «أرسلوا لنا أسعار تشكيلتكم»، وأي مواصفات حالية يجب مطابقتها (المقاس واللون والوزن أو عدد الخيوط)، ومدينة التسليم والموعد المستهدف، وهل تلزم عيّنة، وأي متطلبات لوضع العلامة التجارية.',
          'ويفيد التحديد الدقيق للمنتجات: فتسعير مناشف الاستحمام ومناشف اليد ودواسات الحمّام كلٌّ على حدة يعطي سعراً يمكن مقارنته بعرض آخر، بينما لا يُرجع بند واحد باسم «بياضات ومناشف» إلا نطاقاً تقريبياً.',
          'ونادراً ما تبدأ التأخيرات في المصنع، بل تأتي غالباً من مواصفات اعتُمدت شفهياً لا كتابةً، أو من عيّنات لم تُختبر في ظروف غسيل حقيقية قبل الطلب الكبير. لذلك فإن خطوة واضحة للعيّنات والموافقة توفر الوقت ولا تهدره.',
        ],
        image: image('insights/hotel-linen-samples'),
        imageAlt: 'بياضات فندقية بيضاء مخططة مطوية مع أكياس وسائد',
        imageCredit: illustration.ar,
        facts: [
          ['5 مراحل', 'من الاستفسار إلى التسليم'],
          ['كتابةً', 'المواصفات والشروط'],
          ['العيّنة أولاً', 'تُختبر قبل الطلب الكبير'],
        ],
        cta: page('ar', '/get-a-quote', quote),
      },
      tr: {
        title: 'Otel tekstili siparişi: talepten teslimata',
        description:
          'Eksiksiz bir talep, birkaç gün içinde doğru ve karşılaştırılabilir bir teklif getirir. Bir otel tekstili siparişinin beş aşaması ve gecikmelerin başladığı yer.',
        body: [
          'Bir otel için tekstil siparişi nadiren tek seferlik bir işlemdir. Şartnamelerin teyit edilmesi, numunelerin denenmesi ve üretimin gerçek bir açılış ya da teslim tarihine göre planlanması gerekir; çoğu zaman farklı bir dil ve sınır üzerinden.',
          'İyi yönetilen bir sipariş beş aşamadan geçer: tesis tipini, oda sayısını ve gereken kategorileri paylaşan bir talep; otelin kendi kalite ve yıkama standartlarına göre incelenen numuneler; şartname, miktar ve koşulları yazılı olarak sabitleyen onay; düzenli ilerleme bilgisiyle üretim; ve ihracat belgeleri ile lojistiği varış noktasına kadar düzenlenen teslimat.',
          'Teklifin ne kadar hızlı ve doğru geleceğini ilk aşama belirler. Eksiksiz bir talep; tesis tipini ve yıldız sınıfını, “ürün yelpazenizin fiyatını gönderin” yerine ürün başına miktarları, eşleştirilecek mevcut şartnameleri (ölçü, renk, GSM veya iplik sayısı), teslim şehrini ve hedef tarihi, numune gerekip gerekmediğini ve markalama ihtiyaçlarını içerir.',
          'Ürünleri net gruplamak kazandırır: banyo havlusu, el havlusu ve banyo paspası ayrı ayrı fiyatlandığında başka bir teklifle karşılaştırılabilir bir fiyat elde edilir; “nevresim ve havlu” diye tek bir kalem ise yalnızca bir aralık döndürür.',
          'Gecikmeler nadiren üretim hattında başlar. Çoğunlukla yazılı yerine sözlü onaylanan şartnamelerden ya da toplu siparişten önce gerçek yıkama koşullarında denenmemiş numunelerden kaynaklanır; bu yüzden net bir numune ve onay adımı zaman kaybettirmez, kazandırır.',
        ],
        image: image('insights/hotel-linen-samples'),
        imageAlt: 'Katlanmış beyaz çizgili otel nevresimi ve yastık kılıfları',
        imageCredit: illustration.tr,
        facts: [
          ['5 aşama', 'Talepten teslimata'],
          ['Yazılı', 'Şartname ve koşullar'],
          ['Önce numune', 'Toplu siparişten önce denenir'],
        ],
        cta: page('tr', '/get-a-quote', quote),
      },
    },
  },
];
