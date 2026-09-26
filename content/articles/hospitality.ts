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
];
