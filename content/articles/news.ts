import type { Article } from '../articles';
import { showcaseUrl } from '../companies';
const image = (file: string) => `/images/insights/${file}.jpg`;
/** Group and company news. Facts come from the companies' own pages and verified event sources. */
export const news: Article[] = [
  {
    // Event facts (11th edition, 12–14 October 2026, DECC Doha, trade-only, hotel design and guest
    // technology on show) from the organiser's announcements as reported by marhaba.qa, Qatar
    // Living and the Canadian Trade Commissioner. The team attends as visitors, not as an exhibitor
    // (owner, 2026-09-26): never mention a stand.
    slug: 'hospitality-qatar-2026',
    category: 'corporate',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'hospitality',
    translations: {
      en: {
        title: 'HADARA Hospitality to visit Hospitality Qatar 2026 in Doha',
        seoTitle: 'HADARA Hospitality visits Hospitality Qatar 2026',
        description:
          'The HADARA Hospitality team will visit Hospitality Qatar 2026, the 11th edition of the trade exhibition, at Doha Exhibition and Convention Center on 12–14 October.',
        body: [
          'The team of HADARA Hospitality, a BYHADARA Group company, will visit Hospitality Qatar 2026, which returns for its 11th edition to the Doha Exhibition and Convention Center (DECC) from 12 to 14 October 2026.',
          'The trade-only exhibition brings together hotel groups, buyers, procurement teams and suppliers from across Qatar’s hospitality and food and beverage sectors, making it a natural meeting point for a company that supplies hotels throughout the Gulf.',
          'During the visit, the team will follow the latest in hotel design and guest technology, and meet hotel owners, operators and procurement managers to discuss bed linen, towels, bathrobes, pillows and duvets, protectors, curtains and guest amenities, sourced from trusted manufacturing partners across Türkiye.',
          'For HADARA Hospitality, the three days are a chance to talk through specifications, samples and supply programmes face to face, and to strengthen relationships with hotels in Qatar and the wider region.',
          'Hotels and partners who would like to meet the team in Doha during the exhibition are invited to get in touch in advance to arrange a time.',
        ],
        image: image('hotel-guest-room'),
        imageAlt: 'Hotel guest room with a made bed, curtains and a sofa',
        imageCredit: 'Photo: Unsplash.',
        facts: [
          ['12–14 Oct 2026', 'Exhibition dates'],
          ['DECC, Doha', 'Venue'],
          ['11th', 'Edition of the exhibition'],
        ],
        cta: {
          title: 'Meet us in Doha',
          text: 'Arrange a meeting with the HADARA Hospitality team in Doha during Hospitality Qatar 2026.',
          label: 'Request a meeting',
          href: '/en/contact',
        },
      },
      ar: {
        title: 'فريق حضارة للضيافة يزور معرض الضيافة قطر 2026 في الدوحة',
        seoTitle: 'حضارة للضيافة تزور معرض الضيافة قطر 2026',
        description:
          'يزور فريق حضارة للضيافة معرض الضيافة قطر 2026 (Hospitality Qatar) بدورته الحادية عشرة، في مركز الدوحة للمعارض والمؤتمرات من 12 إلى 14 أكتوبر.',
        body: [
          'يزور فريق حضارة للضيافة، إحدى شركات مجموعة باي حضارة، معرض الضيافة قطر 2026 (Hospitality Qatar)، الذي يعود في دورته الحادية عشرة إلى مركز الدوحة للمعارض والمؤتمرات من 12 إلى 14 أكتوبر 2026.',
          'يجمع المعرض، المخصص للمهنيين، مجموعات الفنادق والمشترين وفرق المشتريات والموردين من قطاعي الضيافة والأغذية والمشروبات في قطر، ما يجعله ملتقى طبيعياً لشركة تورّد مستلزمات الفنادق في أنحاء الخليج.',
          'وخلال الزيارة، يطّلع الفريق على أحدث ما يقدمه القطاع في تصميم الفنادق وتقنيات خدمة الضيوف، ويلتقي بملاك الفنادق ومشغليها ومديري المشتريات لبحث البياضات والمناشف وأرواب الحمام والوسائد والألحفة والواقيات والستائر ومستلزمات الضيوف، التي تورّدها الشركة من شركاء تصنيع موثوقين في أنحاء تركيا.',
          'وتمثل أيام المعرض الثلاثة فرصة لمناقشة المواصفات والعينات وبرامج التوريد وجهاً لوجه، وتعزيز العلاقات مع الفنادق في قطر والمنطقة.',
          'ندعو الفنادق والشركاء الراغبين في لقاء الفريق في الدوحة خلال المعرض إلى التواصل معنا مسبقاً لتحديد موعد.',
        ],
        image: image('hotel-guest-room'),
        imageAlt: 'غرفة فندقية بسرير مرتب وستائر وأريكة',
        imageCredit: 'الصورة: Unsplash.',
        facts: [
          // The isolate keeps the date range in reading order inside right-to-left text.
          ['⁦12–14⁩ أكتوبر 2026', 'موعد المعرض'],
          ['الدوحة', 'مركز الدوحة للمعارض والمؤتمرات'],
          ['11', 'الدورة الحادية عشرة للمعرض'],
        ],
        cta: {
          title: 'نلتقي في الدوحة',
          text: 'حدد موعداً مع فريق حضارة للضيافة في الدوحة خلال معرض الضيافة قطر 2026.',
          label: 'اطلب موعداً',
          href: '/ar/contact',
        },
      },
      tr: {
        title: 'HADARA Hospitality ekibi Hospitality Qatar 2026’yı ziyaret ediyor',
        seoTitle: 'HADARA Hospitality, Hospitality Qatar 2026’da',
        description:
          'HADARA Hospitality ekibi, 12–14 Ekim’de Doha Sergi ve Kongre Merkezi’nde düzenlenecek ticari fuar Hospitality Qatar 2026’nın 11. edisyonunu ziyaret ediyor.',
        body: [
          'BYHADARA Group şirketlerinden HADARA Hospitality’nin ekibi, 11. edisyonuyla 12–14 Ekim 2026 tarihlerinde Doha Sergi ve Kongre Merkezi’nde (DECC) düzenlenecek Hospitality Qatar 2026’yı ziyaret ediyor.',
          'Yalnızca sektör profesyonellerine açık olan fuar, Katar’ın konaklama ile yiyecek ve içecek sektörlerinden otel gruplarını, alıcıları, satın alma ekiplerini ve tedarikçileri bir araya getiriyor; bu da Körfez genelindeki otellere tedarik sağlayan bir şirket için doğal bir buluşma noktası.',
          'Ekip ziyaret boyunca otel tasarımı ve misafir teknolojilerindeki yenilikleri takip edecek; otel sahipleri, işletmecileri ve satın alma yöneticileriyle Türkiye’deki güvenilir üretim ortaklarından tedarik edilen nevresim ve çarşaflar, havlular, bornozlar, yastık ve yorganlar, alezler, perdeler ve misafir ürünleri üzerine görüşecek.',
          'HADARA Hospitality için üç gün; ürün özelliklerini, numuneleri ve tedarik programlarını yüz yüze konuşmak ve Katar ile bölgedeki otellerle ilişkileri güçlendirmek için bir fırsat.',
          'Fuar süresince ekiple Doha’da görüşmek isteyen oteller ve iş ortakları, randevu için önceden iletişime geçebilir.',
        ],
        image: image('hotel-guest-room'),
        imageAlt: 'Yatağı hazırlanmış, perdeli ve kanepeli bir otel odası',
        imageCredit: 'Fotoğraf: Unsplash.',
        facts: [
          ['12–14 Ekim 2026', 'Fuar tarihleri'],
          ['DECC, Doha', 'Mekân'],
          ['11.', 'Fuar edisyonu'],
        ],
        cta: {
          title: 'Doha’da görüşelim',
          text: 'Hospitality Qatar 2026 süresince HADARA Hospitality ekibiyle Doha’da bir görüşme planlayın.',
          label: 'Görüşme talep edin',
          href: '/tr/contact',
        },
      },
    },
  },
  {
    // Project facts from the İkinci BYHADARA real estate site (projects.ts, "beylikduzu-living").
    slug: 'lotus-yasam-launch',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    translations: {
      en: {
        title: 'Lotus Yaşam: a new residential community takes shape in Beylikdüzü',
        seoTitle: 'Lotus Yaşam launches in Beylikdüzü, Istanbul',
        description:
          'HADARA Real Estate presents Lotus Yaşam, a residential community by Lotus Yapı Proje on 21,000 m² of land in Beylikdüzü, with delivery planned for late 2028.',
        body: [
          'HADARA Real Estate, a BYHADARA Group company, presents Lotus Yaşam, a new residential community developed by Lotus Yapı Proje in Beylikdüzü, on the growing western side of Istanbul.',
          'Set on 21,000 m² of land, the project brings together 18 residential blocks arranged around landscaped courtyards, with a children’s playground, a sports court and a walking track at the heart of daily life.',
          'Homes range from 2+1 apartments of about 100–109 m² to 3+1 residences of 134–167 m² and generous 4+1 homes of 194–197 m² gross. Many include a dressing room, a laundry room and wide balconies.',
          'Residents will share a complete set of community services, including separate swimming pools for men and women, a fitness centre, indoor parking, 24/7 security with camera surveillance and a backup generator.',
          'Flexible instalment plans are available, and the project is eligible for Türkiye’s citizenship-by-investment programme, subject to the programme’s conditions. Delivery is planned for the end of 2028.',
          'Lotus Yaşam joins Lotus Koru in HADARA Real Estate’s Beylikdüzü portfolio, continuing the company’s work with Lotus, one of the group’s success partners.',
        ],
        image: image('lotus-yasam-courtyard'),
        imageAlt: 'Landscaped courtyard between the residential blocks of Lotus Yaşam',
        imageCredit: 'Architectural visualisations: Lotus Yapı Proje.',
        facts: [
          ['21,000 m²', 'Land area'],
          ['18', 'Residential blocks'],
          ['2028', 'Planned delivery'],
        ],
        gallery: [
          {
            src: image('lotus-yasam-garden-terrace'),
            alt: 'Ground-floor garden terrace at Lotus Yaşam',
          },
          { src: image('lotus-yasam-living-room'), alt: 'Living room in a Lotus Yaşam residence' },
        ],
        cta: {
          title: 'Discover Lotus Yaşam',
          text: 'Project details and viewing requests are on the HADARA Real Estate website.',
          label: 'View the project',
          href: showcaseUrl('real-estate', 'en', 'lotus-yasam'),
        },
      },
      ar: {
        title: 'لوتس ياشام: مجتمع سكني جديد يتشكّل في بيليكدوزو',
        seoTitle: 'انطلاق مشروع لوتس ياشام في بيليكدوزو',
        description:
          'تقدّم حضارة العقارية مشروع لوتس ياشام من تطوير لوتس يابي بروجي في بيليكدوزو بإسطنبول، مجتمع سكني على أرض مساحتها 21,000 م² والتسليم مخطط له نهاية 2028.',
        body: [
          'تقدّم حضارة العقارية، إحدى شركات مجموعة باي حضارة، مشروع لوتس ياشام (Lotus\u00a0Yaşam)، المجتمع السكني الجديد من تطوير شركة لوتس يابي بروجي في بيليكدوزو، على الجانب الغربي المتنامي من إسطنبول.',
          'يمتد المشروع على أرض مساحتها 21,000 م²، ويضم 18 بلوكاً سكنياً تتوزع حول ساحات خضراء منسّقة، يتوسطها ملعب للأطفال وملعب رياضي ومسار للمشي.',
          'تتنوع الوحدات بين شقق 2+1 بمساحة إجمالية تتراوح بين 100 و109 م² تقريباً، وشقق 3+1 بين 134 و167 م²، وشقق 4+1 رحبة بين 194 و197 م²، وكثير منها مزوّد بغرفة ملابس وغرفة غسيل وشرفات واسعة.',
          'ويتشارك السكان منظومة متكاملة من الخدمات، تشمل مسابح منفصلة للرجال والنساء، وصالة رياضية، ومرآباً مغلقاً، وحراسة على مدار الساعة مع كاميرات مراقبة، ومولداً احتياطياً.',
          'يتوفر المشروع بخطط تقسيط مرنة، وهو مؤهل لبرنامج الجنسية التركية عبر الاستثمار العقاري وفق شروط البرنامج، والتسليم مخطط له في نهاية عام 2028.',
          'وبهذا ينضم لوتس ياشام إلى لوتس كورو ضمن مشاريع حضارة العقارية في بيليكدوزو، استمراراً لعمل الشركة مع لوتس، أحد شركاء النجاح في المجموعة.',
        ],
        image: image('lotus-yasam-courtyard'),
        imageAlt: 'ساحة خضراء منسّقة بين البلوكات السكنية في مشروع لوتس ياشام',
        imageCredit: 'تصاميم معمارية: لوتس يابي بروجي.',
        facts: [
          ['21,000 م²', 'مساحة الأرض'],
          ['18', 'بلوكاً سكنياً'],
          ['2028', 'موعد التسليم المخطط'],
        ],
        gallery: [
          {
            src: image('lotus-yasam-garden-terrace'),
            alt: 'تراس حديقة في الطابق الأرضي بمشروع لوتس ياشام',
          },
          { src: image('lotus-yasam-living-room'), alt: 'غرفة معيشة في إحدى شقق لوتس ياشام' },
        ],
        cta: {
          title: 'اكتشف لوتس ياشام',
          text: 'تفاصيل المشروع وطلبات المعاينة على موقع حضارة العقارية.',
          label: 'عرض المشروع',
          href: showcaseUrl('real-estate', 'ar', 'lotus-yasam'),
        },
      },
      tr: {
        title: 'Lotus Yaşam: Beylikdüzü’nde yeni bir yaşam alanı yükseliyor',
        seoTitle: 'Lotus Yaşam Beylikdüzü’nde hayata geçiyor',
        description:
          'HADARA Real Estate, Lotus Yapı Proje’nin Beylikdüzü’nde 21.000 m² arsa üzerinde yükselen konut projesi Lotus Yaşam’ı sunuyor. Teslim 2028 sonunda planlanıyor.',
        body: [
          'BYHADARA Group şirketlerinden HADARA Real Estate, Lotus Yapı Proje’nin İstanbul’un gelişen batı yakasında, Beylikdüzü’nde hayata geçirdiği yeni konut projesi Lotus Yaşam’ı sunuyor.',
          '21.000 m² arsa üzerinde yer alan proje, peyzajlı avlular çevresinde konumlanan 18 konut bloğundan oluşuyor; çocuk oyun alanı, spor sahası ve yürüyüş parkuru günlük yaşamın merkezinde yer alıyor.',
          'Daireler, yaklaşık 100–109 m² brüt 2+1’lerden 134–167 m² brüt 3+1’lere ve 194–197 m² brüt geniş 4+1’lere uzanıyor. Dairelerin birçoğunda giyinme odası, çamaşır odası ve geniş balkonlar bulunuyor.',
          'Sakinler; kadınlar ve erkekler için ayrı yüzme havuzları, fitness merkezi, kapalı otopark, kamera sistemiyle desteklenen 7/24 güvenlik ve yedek jeneratör gibi kapsamlı ortak hizmetlerden yararlanacak.',
          'Esnek taksit seçenekleri sunulan proje, program koşullarına bağlı olarak yatırım yoluyla Türk vatandaşlığı programına uygundur. Teslimin 2028 sonunda yapılması planlanıyor.',
          'Lotus Yaşam, grubun başarı ortaklarından Lotus ile sürdürülen çalışmaların devamı olarak Lotus Koru ile birlikte HADARA Real Estate’in Beylikdüzü portföyünde yer alıyor.',
        ],
        image: image('lotus-yasam-courtyard'),
        imageAlt: 'Lotus Yaşam konut blokları arasındaki peyzajlı avlu',
        imageCredit: 'Mimari görseller: Lotus Yapı Proje.',
        facts: [
          ['21.000 m²', 'Arsa alanı'],
          ['18', 'Konut bloğu'],
          ['2028', 'Planlanan teslim'],
        ],
        gallery: [
          {
            src: image('lotus-yasam-garden-terrace'),
            alt: 'Lotus Yaşam’da zemin kat bahçe terası',
          },
          { src: image('lotus-yasam-living-room'), alt: 'Lotus Yaşam dairesinde oturma odası' },
        ],
        cta: {
          title: 'Lotus Yaşam’ı keşfedin',
          text: 'Proje detayları ve ziyaret talepleri HADARA Real Estate web sitesinde.',
          label: 'Projeyi görüntüleyin',
          href: showcaseUrl('real-estate', 'tr', 'lotus-yasam'),
        },
      },
    },
  },
  {
    // Project facts from the İkinci BYHADARA real estate site (projects.ts, "diamond-marin").
    // The project is not yet on hadararealestate.com, so the call to action leads to Contact.
    slug: 'diamond-marin-launch',
    category: 'real-estate',
    status: 'published',
    approved: true,
    publishedAt: '2026-09-26',
    company: 'real-estate',
    translations: {
      en: {
        title: 'Diamond Marin: boutique living minutes from West Istanbul Marina',
        seoTitle: 'Diamond Marin launches in Beylikdüzü, Istanbul',
        description:
          'HADARA Real Estate presents Diamond Marin, a boutique project of 58 homes in two low-rise blocks in Beylikdüzü by Yıltaş and Lotus Yapı, near West Istanbul Marina.',
        body: [
          'HADARA Real Estate, a BYHADARA Group company, presents Diamond Marin, a boutique residential project in Beylikdüzü that brings the rhythm of the city together with the calm of the sea.',
          'Designed exclusively for 58 families in two low-rise blocks, the project is developed in partnership by Yıltaş, active in construction for more than 40 years, and Lotus Yapı, the developer behind the Lotus projects.',
          'Every residence is a spacious 3+1 apartment of 117.60 to 143.08 m² gross, with private garden terraces on the ground floor. Homes come with a smart home system, built-in kitchen appliances, air conditioning, a combi boiler, and heat and sound insulation.',
          'Within a private, secure site, residents will enjoy an outdoor swimming pool, a fitness centre, landscaped gardens, an indoor car park and 24/7 private security.',
          'West Istanbul Marina and Beylikdüzü Yaşam Vadisi are five minutes away, the Metrobüs ten minutes, and MarmaraPark and Medicana International Istanbul Hospital fifteen minutes. Delivery is planned for the end of 2027.',
        ],
        image: image('diamond-marin-facade'),
        imageAlt: 'Diamond Marin residential building at dusk',
        imageCredit: 'Architectural visualisations: Yıltaş × Lotus Yapı.',
        facts: [
          ['58', 'Residences in two blocks'],
          ['117–143 m²', '3+1 homes, gross area'],
          ['2027', 'Planned delivery'],
        ],
        gallery: [
          {
            src: image('diamond-marin-living-room'),
            alt: 'Living room in a Diamond Marin residence',
          },
          {
            src: image('diamond-marin-master-bedroom'),
            alt: 'Main bedroom in a Diamond Marin residence',
          },
        ],
        cta: {
          title: 'Ask about Diamond Marin',
          text: 'Our team in Istanbul will be glad to share the project details and answer your questions.',
          label: 'Contact us',
          href: '/en/contact',
        },
      },
      ar: {
        title: 'دايموند مارين: سكن بوتيكي على بُعد دقائق من مارينا غرب إسطنبول',
        seoTitle: 'انطلاق مشروع دايموند مارين في بيليكدوزو',
        description:
          'تقدّم حضارة العقارية مشروع دايموند مارين في بيليكدوزو: 58 شقة 3+1 في مبنيين منخفضَي الارتفاع بشراكة يلتاش ولوتس يابي، على بُعد 5 دقائق من مارينا غرب إسطنبول.',
        body: [
          'تقدّم حضارة العقارية، إحدى شركات مجموعة باي حضارة، مشروع دايموند مارين (Diamond\u00a0Marin)، مشروعاً سكنياً بوتيكياً في بيليكدوزو يجمع بين إيقاع المدينة وهدوء البحر.',
          'صُمّم المشروع حصرياً لـ 58 عائلة ضمن مبنيين منخفضَي الارتفاع، ويُطوَّر بشراكة بين شركة يلتاش، العاملة في قطاع البناء منذ أكثر من 40 عاماً، وشركة لوتس يابي، المطوّر لمشاريع لوتس.',
          'جميع الوحدات شقق 3+1 رحبة بمساحات إجمالية بين 117.60 و143.08 م²، مع تراسات حديقة خاصة في الطابق الأرضي، ومزوّدة بنظام منزل ذكي وأجهزة مطبخ مدمجة وتكييف وغلاية كومبي وعزل حراري وصوتي.',
          'وضمن مجمّع خاص وآمن، يتمتع السكان بمسبح خارجي وصالة رياضية وحدائق منسّقة ومرآب مغلق للسيارات وحراسة خاصة على مدار الساعة.',
          'تبعد مارينا غرب إسطنبول ووادي الحياة في بيليكدوزو 5 دقائق فقط، ومحطة المتروبوس 10 دقائق، ومركز مرمرة بارك ومستشفى ميديكانا الدولي 15 دقيقة. والتسليم مخطط له في نهاية عام 2027.',
        ],
        image: image('diamond-marin-facade'),
        imageAlt: 'مبنى دايموند مارين السكني عند الغروب',
        imageCredit: 'تصاميم معمارية: يلتاش × لوتس يابي.',
        facts: [
          ['58', 'شقة في مبنيين'],
          // The isolate keeps the range in reading order inside right-to-left text.
          ['\u2066117–143\u2069 م²', 'شقق 3+1، مساحة إجمالية'],
          ['2027', 'موعد التسليم المخطط'],
        ],
        gallery: [
          { src: image('diamond-marin-living-room'), alt: 'غرفة معيشة في إحدى شقق دايموند مارين' },
          {
            src: image('diamond-marin-master-bedroom'),
            alt: 'غرفة النوم الرئيسية في إحدى شقق دايموند مارين',
          },
        ],
        cta: {
          title: 'استفسر عن دايموند مارين',
          text: 'يسعد فريقنا في إسطنبول بمشاركتك تفاصيل المشروع والإجابة عن استفساراتك.',
          label: 'تواصل معنا',
          href: '/ar/contact',
        },
      },
      tr: {
        title: 'Diamond Marin: Batı İstanbul Marina’ya dakikalar mesafede butik yaşam',
        seoTitle: 'Diamond Marin Beylikdüzü’nde hayata geçiyor',
        description:
          'HADARA Real Estate, Yıltaş ve Lotus Yapı ortaklığıyla Beylikdüzü’nde yükselen, iki az katlı blokta 58 adet 3+1 daireden oluşan butik proje Diamond Marin’i sunuyor.',
        body: [
          'BYHADARA Group şirketlerinden HADARA Real Estate, şehrin ritmini denizin huzuruyla buluşturan Beylikdüzü’ndeki butik konut projesi Diamond Marin’i sunuyor.',
          'Yalnızca 58 aile için iki az katlı blokta tasarlanan proje, 40 yılı aşkın süredir inşaat sektöründe faaliyet gösteren Yıltaş ile Lotus projelerinin geliştiricisi Lotus Yapı ortaklığıyla hayata geçiriliyor.',
          'Tüm daireler 117,60–143,08 m² brüt alana sahip ferah 3+1’lerden oluşuyor ve zemin kat daireleri özel bahçe teraslarına sahip. Daireler akıllı ev sistemi, ankastre mutfak cihazları, klima, kombi ile ısı ve ses yalıtımıyla donatılıyor.',
          'Özel ve güvenli site konseptinde sakinleri açık yüzme havuzu, fitness merkezi, peyzajlı bahçeler, kapalı otopark ve 7/24 özel güvenlik bekliyor.',
          'Batı İstanbul Marina ve Beylikdüzü Yaşam Vadisi 5, Metrobüs 10, MarmaraPark AVM ve Medicana International İstanbul Hastanesi 15 dakika mesafede. Teslimin 2027 sonunda yapılması planlanıyor.',
        ],
        image: image('diamond-marin-facade'),
        imageAlt: 'Akşam saatlerinde Diamond Marin konut binası',
        imageCredit: 'Mimari görseller: Yıltaş × Lotus Yapı.',
        facts: [
          ['58', 'İki blokta daire'],
          ['117–143 m²', 'Brüt 3+1 daireler'],
          ['2027', 'Planlanan teslim'],
        ],
        gallery: [
          { src: image('diamond-marin-living-room'), alt: 'Diamond Marin dairesinde oturma odası' },
          {
            src: image('diamond-marin-master-bedroom'),
            alt: 'Diamond Marin dairesinde ebeveyn yatak odası',
          },
        ],
        cta: {
          title: 'Diamond Marin hakkında bilgi alın',
          text: 'İstanbul’daki ekibimiz proje detaylarını paylaşmaktan ve sorularınızı yanıtlamaktan memnuniyet duyar.',
          label: 'Bize ulaşın',
          href: '/tr/contact',
        },
      },
    },
  },
];
