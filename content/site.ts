export const locales = ['en', 'ar', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
export const paths = [
  '',
  'about',
  'businesses',
  'businesses/real-estate',
  'businesses/hospitality',
  'markets',
  'markets/turkiye',
  'markets/gcc',
  'markets/egypt',
  'partnerships',
  'insights',
  'contact',
  'contact/thank-you',
  'inquiries/investment',
  'inquiries/partnership',
  'privacy',
  'terms',
] as const;
export const navPaths = ['', 'about', 'businesses', 'markets', 'partnerships', 'insights'];
export const businessIds = ['real-estate', 'hospitality'] as const;
export const marketIds = ['turkiye', 'gcc', 'egypt'] as const;
export const site = {
  name: 'BYHADARA Group',
  origin: (process.env.SITE_URL || 'https://www.byhadara.com').replace(/\/+$/, ''),
  hospitality: 'https://www.hadarahospitality.com',
  realEstate: process.env.REAL_ESTATE_URL || 'https://www.hadararealestate.com',
  /** Registered company that operates the website and manages the requests sent through it. */
  legalName: 'Hadara Investment İnşaat Sanayi ve Ticaret Anonim Şirketi',
  email: process.env.CONTACT_EMAIL || 'info@byhadara.com',
  phone: process.env.CONTACT_PHONE || '+90 531 930 92 14',
};
export const dictionaries = {
  en: {
    nav: ['Home', 'About Us', 'Our Businesses', 'Our Markets', 'Partnerships', 'Insights & News'],
    contact: 'Contact Us',
    partner: 'Partner with us',
    menu: 'Open navigation',
    close: 'Close navigation',
    skip: 'Skip to content',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    language: 'Language',
    back: 'Back to overview',
    location: 'ISTANBUL, TÜRKİYE · INTERNATIONAL PERSPECTIVE',
    hero: ['Building Value.', 'Connecting Markets.'],
    intro:
      'An Istanbul-based investment and business development group. Building specialized businesses and meaningful connections across regional and international markets.',
    explore: 'Explore our businesses',
    discover: 'Discover our group',
    scroll: 'A shared vision. A world of opportunity.',
    who: 'WHO WE ARE',
    whoTitle: 'Rooted in Istanbul.\nLooking beyond borders.',
    whoText:
      'BYHADARA Group brings together independently registered companies with a shared commitment to sustainable growth. Our current activities span real estate development and hospitality supply.',
    whoMore:
      'We combine local market understanding with an international perspective to develop our businesses, explore new opportunities, and build lasting commercial relationships.',
    businesses: 'OUR BUSINESSES',
    businessesTitle: 'Specialized businesses.\nOne shared vision.',
    businessIntro:
      'Focused expertise in distinct industries, connected by a common ambition to build lasting value.',
    learn: 'Discover the company',
    imageNote: 'Illustrative photography. Not a BYHADARA property or facility.',
    productImageNote: 'Product photography is illustrative.',
    groupLabel: 'THE GROUP',
    groupTitle: 'One group.\nTwo specialized companies.',
    groupText:
      'BYHADARA Group brings HADARA Real Estate and HADARA Hospitality together under one umbrella, each focused on its own industry.',
    groupCompany: 'A BYHADARA Group company',
    aboutCompany: 'About the company',
    alsoInGroup: 'Also in the group',
    newTab: '(opens in a new tab)',
    partnersLabel: 'TRUSTED NETWORK',
    partnersTitle: 'Our Success Partners',
    partnersText:
      'Our companies work alongside leading regional developers and holding groups to deliver projects our clients can rely on.',
    business: [
      {
        name: 'HADARA Real Estate',
        sector: 'Real Estate Development',
        desc: 'Luxury villas and considered residential developments in Istanbul, created for modern living and long-term value.',
        detail:
          'HADARA Real Estate is an Istanbul-based developer of luxury villas and high-quality residential projects. Since 2014 it has combined elegant design, sustainable construction and premium living environments for families and investors.',
        facts: [
          ['2014', 'Founded in Istanbul'],
          ['3', 'Signature developments'],
          ['3', 'Regional partnerships'],
        ],
        areas: [
          'Luxury villas',
          'Residential project development',
          'Architectural services',
          'Building materials export',
        ],
        showcaseTitle: 'Selected projects',
        showcaseCta: 'View project',
        visit: 'Visit the HADARA Real Estate website',
        visitText:
          'Every project, availability and viewings are on the dedicated HADARA Real Estate platform.',
        image: 'architecture.jpg',
        alt: 'Reflective glass facade of a contemporary building',
      },
      {
        name: 'HADARA Hospitality',
        sector: 'Hospitality Supply',
        desc: 'Hotel linen, towels, bathrobes and guest essentials from Türkiye for 3★–5★ hotels and resorts.',
        detail:
          'HADARA Hospitality is an Istanbul-based hospitality supply company. Through trusted manufacturing partnerships across Türkiye, it supplies hotels and resorts in the Gulf region and Europe with carefully selected textiles and guest room essentials.',
        facts: [
          ['3★–5★', 'Hotel segments supplied'],
          ['Türkiye', 'Manufacturing partnerships'],
          ['GCC & Europe', 'Hotel partnerships'],
        ],
        areas: [
          'Bed linen',
          'Towels & bath',
          'Bathrobes & slippers',
          'Pillows & duvets',
          'Mattress & pillow protectors',
          'Curtains',
          'Guest amenities',
        ],
        showcaseTitle: 'Selected products',
        showcaseCta: 'View product',
        visit: 'Visit the HADARA Hospitality website',
        visitText:
          'The full collection, specifications and quotations are on the dedicated HADARA Hospitality platform.',
        image: 'hospitality/rolled-towels.jpg',
        alt: 'Rolled white hotel towels',
      },
    ],
    markets: 'OUR MARKETS',
    marketsTitle: 'Local understanding.\nRegional connections.',
    marketsIntro:
      'From our Istanbul base, we seek to strengthen commercial connections across Türkiye, the GCC, and Egypt. Our direction is international; our approach is grounded in each market.',
    marketsCta: 'Explore our markets',
    market: [
      {
        name: 'Türkiye',
        status: 'OUR OPERATING BASE',
        desc: 'Istanbul is our headquarters and primary operating base, supporting our real estate and hospitality supply activities.',
        interest:
          'Develop existing businesses, deepen local relationships, and explore property and hospitality opportunities.',
        sectors: 'Real estate development · Hospitality supply',
      },
      {
        name: 'GCC Markets',
        status: 'COMMERCIAL & REGIONAL FOCUS',
        desc: 'A key region for hospitality supply relationships and regional business development, with a focus on long-term commercial collaboration.',
        interest:
          'Build relationships with hospitality buyers, distributors, suppliers, and regional business development partners.',
        sectors: 'Hospitality supply · Business development',
      },
      {
        name: 'Egypt',
        status: 'FUTURE OPPORTUNITIES',
        desc: 'A market of interest for business development, commercial relationships, and future opportunities.',
        interest:
          'Explore market knowledge, potential partners, and opportunities that align with the group’s growth direction.',
        sectors: 'Commercial relationships · Future business development',
      },
    ],
    marketNote:
      'Regional interests do not imply local offices, registered entities, or confirmed investment projects.',
    vision: 'OUR VISION',
    visionTitle: 'Creating value\nfor the long term.',
    visionText:
      'To build a diversified business group with a strong regional presence, developing sustainable enterprises and connecting investment and business opportunities across industries and international markets.',
    mission: 'Our mission',
    missionText:
      'To establish and develop specialized businesses, strengthen our existing companies, and foster strategic partnerships by combining local market expertise with an international perspective.',
    purpose: 'Our purpose',
    purposeText:
      'To transform opportunities into sustainable businesses and build economic and commercial connections across markets and industries.',
    values: 'Our core values',
    valueList: [
      'Trust & Transparency',
      'Sustainable Growth',
      'Strategic Partnerships',
      'Innovation',
      'Quality & Excellence',
    ],
    philosophy: 'A considered approach to growth',
    philosophyText:
      'We believe lasting businesses are built through clear priorities, specialized expertise, and trusted relationships. We approach new opportunities with care, guided by their fit with our businesses and long-term direction.',
    growth: 'Our growth direction',
    growthText:
      'Our ambition is to strengthen our current businesses, explore new companies and projects, and develop international partnerships. These are objectives for future development, rather than claims of established operations.',
    partnerships: 'PARTNERSHIPS',
    partnershipsTitle: 'Let’s grow\ntogether.',
    partnershipIntro:
      'Good partnerships begin with a shared perspective. We welcome conversations with investors, developers, manufacturers, suppliers, and regional business partners.',
    investmentCta: 'Explore investment opportunities',
    partnershipCta: 'Become a strategic partner',
    partnershipHero: 'Building partnerships.\nCreating opportunities.',
    partnershipTypes: [
      'Investment collaboration',
      'Real estate development partnerships',
      'Manufacturing & supply partnerships',
      'Regional business development',
      'Corporate & strategic alliances',
    ],
    partnershipDescriptions: [
      'Explore potential joint ventures and business opportunities aligned with our existing sectors and long-term direction.',
      'Discuss residential and commercial development opportunities in Türkiye with a shared focus on responsible growth.',
      'Connect manufacturing expertise and dependable sourcing with hospitality procurement needs.',
      'Bring market knowledge, distribution experience, and commercial relationships to regional opportunities.',
      'Explore complementary capabilities and a common approach to developing specialized businesses.',
    ],
    insights: 'INSIGHTS & NEWS',
    insightsTitle: 'Perspectives that matter.',
    insightsIntro: 'Ideas, business perspectives, and updates from across the group.',
    emptyTitle: 'The next perspective starts here.',
    emptyText:
      'Our editorial desk is preparing its first publications. Approved insights and group updates will appear here.',
    allInsights: 'View all insights',
    search: 'Search insights',
    allCategories: 'All categories',
    noResults: 'No articles match your search.',
    read: 'Read article',
    related: 'Related perspectives',
    categories: [
      'Corporate News',
      'Investment & Business',
      'Real Estate',
      'Hospitality',
      'Türkiye Markets',
      'GCC Markets',
      'Egypt Markets',
      'International Trade',
    ],
    ctaTitle: 'Let’s build opportunities\ntogether.',
    ctaText:
      'Connect with BYHADARA Group to explore business opportunities, strategic partnerships, and regional collaboration.',
    cta: 'Contact our group',
    footer:
      'An Istanbul-based investment and business development group, connecting specialized businesses with a shared vision.',
    quickLinks: 'Explore',
    based: 'Istanbul, Türkiye',
    legalIdentity:
      'BYHADARA Group is a commercial identity connecting independently registered companies.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    rights: 'All rights reserved.',
    aboutTitle: 'A shared ambition.\nA considered direction.',
    aboutIntro:
      'BYHADARA Group is an Istanbul-based investment and business development group bringing together independently registered companies operating across specialized industries.',
    contactTitle: 'A conversation can\nopen new possibilities.',
    contactIntro:
      'Tell us where your ambitions meet ours. Choose the most relevant way to connect with the group or visit our specialized business platforms.',
    directContact: 'Direct contact',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    companySites: 'Our companies online',
    thanksLabel: 'Request received',
    thanksTitle: 'Thank you for contacting BYHADARA Group.',
    thanksText:
      'Your request has reached our team in Istanbul. We will review it carefully and get back to you by phone or email.',
    thanksHome: 'Back to home',
    thanksCompanies: 'Explore our companies',
    thanksMoreLabel: 'More options',
    thanksMoreTitle: 'Is there anything else we can help with?',
    thanksAnother: 'Submit another request',
    generalRequest: 'General inquiry',
    specializations: 'Areas of specialization',
    targetMarkets: 'Market focus',
    strategicInterest: 'Strategic interests',
    investmentTitle: 'Explore investment\nopportunities.',
    partnershipFormTitle: 'Become a\nstrategic partner.',
    formIntro:
      'Share an introduction and a clear outline of your proposal. Please do not include sensitive financial information or proof of funds.',
    formUnavailable: `Online requests are not available at the moment. Please email ${site.email} or call ${site.phone}.`,
    formDisclaimer:
      'An inquiry is an introduction only. It does not constitute an investment offer, acceptance, or agreement.',
    legalUpdated: 'Website information',
    privacyIntro:
      'This notice explains how this website handles information. It covers the corporate website only; independently operated business websites have their own privacy practices.',
    privacySections: [
      [
        'Data controller',
        `This website and the requests sent through it are managed by ${site.legalName}, Istanbul, Türkiye, which operates under the BYHADARA Group name. Contact: ${site.email}.`,
      ],
      [
        'Browsing the website',
        'The website does not use advertising trackers or analytics. Hosting infrastructure may process standard request information for delivery and security. Fonts and photographs are served from the website itself.',
      ],
      [
        'Contact requests',
        'The contact form asks for your full name, email address, phone number with country code and your request, and optionally your company name and website. Please do not include sensitive personal or financial information.',
      ],
      [
        'How requests are handled',
        `Your request is emailed to ${site.email} through our email delivery provider (Resend) and saved in our customer relationship management system (HubSpot), so that our team and, where relevant, the group company concerned can answer and follow it up. These providers may store data on servers outside Türkiye. Your details are never sold.`,
      ],
      [
        'Email updates',
        `We send news and updates by email only if you tick the optional box in the form. Every such email includes an unsubscribe link, and you can also withdraw your consent by writing to ${site.email}.`,
      ],
      [
        'Retention',
        'We keep your details for as long as needed to answer your request and maintain our business relationship, or until you ask us to delete them, unless the law requires us to keep them longer.',
      ],
      [
        'Protection',
        'Requests travel over an encrypted connection. Submissions are validated and protected against spam.',
      ],
      [
        'Your rights',
        `Under applicable data protection law, including Türkiye’s Law No. 6698 on the Protection of Personal Data (KVKK), you may ask what data we hold about you, have it corrected or deleted, object to its processing or withdraw your consent. Write to ${site.email}.`,
      ],
    ],
    termsIntro:
      'These terms describe the purpose and limitations of the BYHADARA Group corporate website.',
    termsSections: [
      [
        'Corporate identity',
        `BYHADARA Group is a commercial identity connecting independently registered companies. This website does not represent the group as a registered holding company, investment fund, or licensed financial advisory institution. The website is operated by ${site.legalName}, Istanbul, Türkiye.`,
      ],
      [
        'Information and inquiries',
        'Content is for general corporate information. It is not financial advice, an investment offer, a promise of returns, or a contractual commitment. Sending an inquiry does not establish an agreement.',
      ],
      [
        'Businesses and markets',
        'Business descriptions distinguish existing activities from future objectives. References to regional markets do not imply local offices, legal entities, or completed projects.',
      ],
      [
        'External websites',
        'Specialized business websites are independently operated. Their content, services, privacy notices, and terms apply when you visit them.',
      ],
      [
        'Website content',
        'Brand names and original website content identify the group and its companies. Project and product information comes from the group companies’ own websites; other licensed photographs are illustrative and do not depict group properties or offices.',
      ],
      [
        'Responsible use',
        'Do not misuse inquiry forms, attempt unauthorized access, or submit unlawful, malicious, or misleading material. Business relationships require separate, mutually agreed arrangements.',
      ],
    ],
    notFound: 'Page not found',
    notFoundText: 'The page you are looking for is not available in this language.',
    returnHome: 'Return to homepage',
  },
  ar: {
    nav: ['الرئيسية', 'عن المجموعة', 'شركاتنا', 'أسواقنا', 'الشراكات', 'الرؤى والأخبار'],
    contact: 'تواصل معنا',
    partner: 'كن شريكاً لنا',
    menu: 'فتح قائمة التنقل',
    close: 'إغلاق قائمة التنقل',
    skip: 'انتقل إلى المحتوى',
    home: 'الرئيسية',
    breadcrumb: 'مسار التنقل',
    language: 'اللغة',
    back: 'العودة إلى الصفحة الرئيسية للقسم',
    location: 'إسطنبول، تركيا · رؤية دولية',
    hero: ['نبني القيمة.', 'نربط الأسواق.'],
    intro:
      'مجموعة للاستثمار وتطوير الأعمال تنطلق من إسطنبول، لتطوير شركات متخصصة وبناء روابط تجارية ذات قيمة عبر الأسواق الإقليمية والدولية.',
    explore: 'اكتشف شركاتنا',
    discover: 'تعرّف على المجموعة',
    scroll: 'رؤية مشتركة. وآفاق واسعة.',
    who: 'من نحن',
    whoTitle: 'من إسطنبول.\nإلى آفاق أوسع.',
    whoText:
      'تجمع مجموعة باي حضارة شركات مسجلة بشكل مستقل، يوحّدها الالتزام بالنمو المستدام. وتشمل أنشطتنا الحالية التطوير العقاري وتوريد مستلزمات الضيافة.',
    whoMore:
      'نجمع بين فهم السوق المحلي والرؤية الدولية لتطوير أعمالنا، واستكشاف الفرص، وبناء علاقات تجارية طويلة الأمد.',
    businesses: 'شركاتنا',
    businessesTitle: 'شركات متخصصة.\nورؤية واحدة.',
    businessIntro: 'خبرات متخصصة في قطاعات مختلفة، تجمعها الرغبة في بناء قيمة مستدامة.',
    learn: 'تعرّف على الشركة',
    imageNote: 'صور توضيحية لا تمثل عقارات أو مرافق تابعة للمجموعة.',
    productImageNote: 'صور المنتجات توضيحية.',
    groupLabel: 'المجموعة',
    groupTitle: 'مجموعة واحدة.\nوشركتان متخصصتان.',
    groupText:
      'تجمع مجموعة باي حضارة تحت مظلتها شركتين متخصصتين: حضارة العقارية وحضارة للضيافة، تركّز كل منهما على قطاعها.',
    groupCompany: 'إحدى شركات مجموعة باي حضارة',
    aboutCompany: 'نبذة عن الشركة',
    alsoInGroup: 'أيضاً ضمن المجموعة',
    newTab: '(يفتح في نافذة جديدة)',
    partnersLabel: 'شبكة موثوقة',
    partnersTitle: 'شركاء النجاح',
    partnersText:
      'تعمل شركات المجموعة إلى جانب شركات تطوير ومجموعات قابضة إقليمية رائدة لتسليم مشاريع يعتمد عليها عملاؤنا.',
    business: [
      {
        name: 'حضارة العقارية',
        sector: 'التطوير العقاري',
        desc: 'فلل فاخرة ومشاريع سكنية مدروسة في إسطنبول، تُصمَّم للحياة العصرية والقيمة طويلة الأمد.',
        detail:
          'حضارة العقارية مطوّر عقاري مقره إسطنبول، متخصص في الفلل الفاخرة والمشاريع السكنية عالية الجودة. منذ عام 2014 تجمع بين التصميم الأنيق والبناء المستدام وبيئات العيش الراقية للعائلات والمستثمرين.',
        facts: [
          ['2014', 'تأسست في إسطنبول'],
          ['3', 'مشاريع مميزة'],
          ['3', 'شراكات إقليمية'],
        ],
        areas: [
          'الفلل الفاخرة',
          'تطوير المشاريع السكنية',
          'الخدمات المعمارية',
          'تصدير مواد البناء',
        ],
        showcaseTitle: 'مشاريع مختارة',
        showcaseCta: 'عرض المشروع',
        visit: 'انتقل إلى موقع حضارة العقارية',
        visitText:
          'جميع المشاريع وتفاصيل التوفر ومواعيد المعاينة على المنصة المتخصصة لحضارة العقارية.',
        image: 'architecture.jpg',
        alt: 'واجهة زجاجية عاكسة لمبنى معاصر',
      },
      {
        name: 'حضارة للضيافة',
        sector: 'توريد مستلزمات الضيافة',
        desc: 'بياضات فندقية ومناشف وأردية حمام ومستلزمات ضيوف من تركيا، للفنادق والمنتجعات من فئة 3 إلى 5 نجوم.',
        detail:
          'حضارة للضيافة شركة توريد ضيافة مقرها إسطنبول. من خلال شراكات تصنيع موثوقة في تركيا، تورّد للفنادق والمنتجعات في منطقة الخليج وأوروبا منسوجات ومستلزمات غرف مختارة بعناية.',
        facts: [
          ['3★–5★', 'فئات الفنادق التي نورّد لها'],
          ['تركيا', 'شراكات تصنيع'],
          ['الخليج وأوروبا', 'شراكات فندقية'],
        ],
        areas: [
          'بياضات الأسرّة',
          'المناشف ومنسوجات الحمام',
          'أردية الحمام والنعال',
          'الوسائد واللحف',
          'واقيات المراتب والوسائد',
          'الستائر',
          'مستلزمات الضيوف',
        ],
        showcaseTitle: 'منتجات مختارة',
        showcaseCta: 'عرض المنتج',
        visit: 'انتقل إلى موقع حضارة للضيافة',
        visitText:
          'المجموعة الكاملة والمواصفات وطلبات عروض الأسعار على المنصة المتخصصة لحضارة للضيافة.',
        image: 'hospitality/rolled-towels.jpg',
        alt: 'مناشف فندقية بيضاء ملفوفة',
      },
    ],
    markets: 'أسواقنا',
    marketsTitle: 'معرفة محلية.\nوروابط إقليمية.',
    marketsIntro:
      'من مقرنا في إسطنبول، نسعى إلى تعزيز الروابط التجارية في تركيا ودول الخليج ومصر. نتطلع إلى آفاق دولية انطلاقاً من فهم خصوصية كل سوق.',
    marketsCta: 'اكتشف أسواقنا',
    market: [
      {
        name: 'تركيا',
        status: 'مركز أعمالنا',
        desc: 'إسطنبول مقر المجموعة وقاعدة عملياتها الرئيسية، ومنها ننطلق في أنشطة العقارات وتوريد مستلزمات الضيافة.',
        interest: 'تطوير أعمالنا الحالية وتعميق العلاقات المحلية واستكشاف فرص العقارات والضيافة.',
        sectors: 'التطوير العقاري · توريد مستلزمات الضيافة',
      },
      {
        name: 'أسواق الخليج',
        status: 'علاقات تجارية وتطوير إقليمي',
        desc: 'منطقة رئيسية لعلاقات توريد مستلزمات الضيافة وتطوير الأعمال الإقليمي، مع التركيز على التعاون التجاري طويل الأمد.',
        interest:
          'بناء علاقات مع مشتري قطاع الضيافة والموزعين والموردين وشركاء تطوير الأعمال الإقليميين.',
        sectors: 'توريد مستلزمات الضيافة · تطوير الأعمال',
      },
      {
        name: 'مصر',
        status: 'فرص مستقبلية',
        desc: 'سوق نهتم فيه باستكشاف تطوير الأعمال والعلاقات التجارية والفرص المستقبلية.',
        interest:
          'تعميق المعرفة بالسوق واستكشاف الشركاء المحتملين والفرص المتوافقة مع توجه المجموعة.',
        sectors: 'العلاقات التجارية · تطوير الأعمال المستقبلي',
      },
    ],
    marketNote:
      'لا تعني الاهتمامات الإقليمية وجود مكاتب محلية أو كيانات مسجلة أو مشاريع استثمارية مؤكدة.',
    vision: 'رؤيتنا',
    visionTitle: 'نبني القيمة\nللمدى الطويل.',
    visionText:
      'بناء مجموعة أعمال متنوعة ذات حضور إقليمي قوي، من خلال تطوير شركات مستدامة وربط الفرص الاستثمارية والتجارية عبر القطاعات والأسواق الدولية.',
    mission: 'رسالتنا',
    missionText:
      'تأسيس وتطوير شركات متخصصة، وتعزيز أعمال شركاتنا الحالية، وبناء شراكات استراتيجية تجمع بين الخبرة المحلية والرؤية الدولية.',
    purpose: 'غايتنا',
    purposeText:
      'تحويل الفرص إلى أعمال مستدامة، وبناء روابط اقتصادية وتجارية بين الأسواق والقطاعات.',
    values: 'قيمنا الأساسية',
    valueList: [
      'الثقة والشفافية',
      'النمو المستدام',
      'الشراكات الاستراتيجية',
      'الابتكار',
      'الجودة والتميّز',
    ],
    philosophy: 'نمو قائم على رؤية مدروسة',
    philosophyText:
      'نؤمن بأن الأعمال المستدامة تُبنى على أولويات واضحة وخبرات متخصصة وعلاقات موثوقة. ندرس الفرص الجديدة بعناية وفق انسجامها مع أعمالنا وتوجهنا طويل الأمد.',
    growth: 'اتجاه نمونا',
    growthText:
      'نطمح إلى تعزيز شركاتنا الحالية واستكشاف شركات ومشاريع جديدة وتطوير شراكات دولية. وهذه أهداف للتطوير المستقبلي، وليست ادعاءات بعمليات قائمة.',
    partnerships: 'الشراكات',
    partnershipsTitle: 'لننمُ\nمعاً.',
    partnershipIntro:
      'تبدأ الشراكات الجيدة برؤية مشتركة. نرحّب بالتواصل مع المستثمرين والمطورين والمصنّعين والموردين وشركاء الأعمال الإقليميين.',
    investmentCta: 'استكشف فرص الاستثمار',
    partnershipCta: 'كن شريكاً استراتيجياً',
    partnershipHero: 'نبني الشراكات.\nنصنع الفرص.',
    partnershipTypes: [
      'التعاون الاستثماري',
      'شراكات التطوير العقاري',
      'شراكات التصنيع والتوريد',
      'تطوير الأعمال الإقليمي',
      'التحالفات المؤسسية والاستراتيجية',
    ],
    partnershipDescriptions: [
      'استكشاف المشاريع المشتركة وفرص الأعمال المتوافقة مع قطاعاتنا الحالية وتوجهنا طويل الأمد.',
      'مناقشة فرص التطوير السكني والتجاري في تركيا، برؤية مشتركة للنمو المسؤول.',
      'ربط الخبرة التصنيعية والتوريد الموثوق باحتياجات مشتريات قطاع الضيافة.',
      'توظيف المعرفة بالأسواق وخبرات التوزيع والعلاقات التجارية لاستكشاف الفرص الإقليمية.',
      'استكشاف القدرات المتكاملة والرؤى المشتركة لتطوير شركات متخصصة.',
    ],
    insights: 'الرؤى والأخبار',
    insightsTitle: 'رؤى تستحق الاهتمام.',
    insightsIntro: 'أفكار ورؤى تجارية ومستجدات من مختلف أعمال المجموعة.',
    emptyTitle: 'هنا تبدأ الرؤية القادمة.',
    emptyText: 'نعدّ إصداراتنا الأولى. ستُنشر هنا الرؤى المعتمدة وأخبار المجموعة حال توفرها.',
    allInsights: 'جميع الرؤى والأخبار',
    search: 'ابحث في الرؤى',
    allCategories: 'جميع التصنيفات',
    noResults: 'لا توجد مقالات تطابق بحثك.',
    read: 'اقرأ المقال',
    related: 'رؤى ذات صلة',
    categories: [
      'أخبار المجموعة',
      'الاستثمار والأعمال',
      'العقارات',
      'الضيافة',
      'أسواق تركيا',
      'أسواق الخليج',
      'أسواق مصر',
      'التجارة الدولية',
    ],
    ctaTitle: 'لنبنِ الفرص\nمعاً.',
    ctaText:
      'تواصل مع مجموعة باي حضارة لاستكشاف فرص الأعمال والشراكات الاستراتيجية والتعاون الإقليمي.',
    cta: 'تواصل مع المجموعة',
    footer: 'مجموعة للاستثمار وتطوير الأعمال مقرها إسطنبول، تجمع شركات متخصصة برؤية مشتركة.',
    quickLinks: 'اكتشف',
    based: 'إسطنبول، تركيا',
    legalIdentity: 'مجموعة باي حضارة هوية تجارية تجمع شركات مسجلة بشكل مستقل.',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    rights: 'جميع الحقوق محفوظة.',
    aboutTitle: 'طموح مشترك.\nواتجاه مدروس.',
    aboutIntro:
      'مجموعة باي حضارة مجموعة للاستثمار وتطوير الأعمال مقرها إسطنبول، تجمع شركات مسجلة بشكل مستقل تعمل في قطاعات متخصصة.',
    contactTitle: 'محادثة واحدة قد\nتفتح آفاقاً جديدة.',
    contactIntro:
      'أخبرنا أين تلتقي طموحاتك مع رؤيتنا. اختر وسيلة التواصل الأنسب، أو زر منصات شركاتنا المتخصصة.',
    directContact: 'تواصل مباشر',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'الهاتف',
    locationLabel: 'الموقع',
    companySites: 'مواقع شركاتنا',
    thanksLabel: 'تم استلام طلبكم',
    thanksTitle: 'شكراً لتواصلكم مع مجموعة باي حضارة.',
    thanksText:
      'وصل طلبكم إلى فريقنا في إسطنبول، وسندرسه بعناية ونتواصل معكم عبر الهاتف أو البريد الإلكتروني.',
    thanksHome: 'العودة إلى الرئيسية',
    thanksCompanies: 'تعرّف على شركاتنا',
    thanksMoreLabel: 'خيارات أخرى',
    thanksMoreTitle: 'هل يمكننا مساعدتكم في أمر آخر؟',
    thanksAnother: 'تقديم طلب آخر',
    generalRequest: 'استفسار عام',
    specializations: 'مجالات التخصص',
    targetMarkets: 'الأسواق المستهدفة',
    strategicInterest: 'الاهتمامات الاستراتيجية',
    investmentTitle: 'استكشف الفرص\nالاستثمارية.',
    partnershipFormTitle: 'كن شريكاً\nاستراتيجياً.',
    formIntro:
      'عرّفنا بنفسك وقدّم وصفاً واضحاً لمقترحك. يرجى عدم إرفاق معلومات مالية حساسة أو إثباتات للأموال.',
    formUnavailable: `إرسال الطلبات عبر الموقع غير متاح حالياً. يرجى مراسلتنا على ${site.email} أو الاتصال على ${site.phone}.`,
    formDisclaimer: 'الاستفسار خطوة للتعارف فقط، ولا يشكّل عرضاً استثمارياً أو قبولاً أو اتفاقاً.',
    legalUpdated: 'معلومات الموقع',
    privacyIntro:
      'يوضح هذا الإشعار كيفية التعامل مع المعلومات في الموقع المؤسسي فقط. وللمواقع المستقلة لشركات المجموعة ممارسات خصوصية خاصة بها.',
    privacySections: [
      [
        'المسؤول عن البيانات',
        `تتولى إدارة هذا الموقع والطلبات المرسلة عبره شركة ${site.legalName}، إسطنبول، تركيا، التي تعمل تحت اسم مجموعة باي حضارة. للتواصل: ${site.email}.`,
      ],
      [
        'تصفح الموقع',
        'لا يستخدم الموقع أدوات تتبع إعلانية أو تحليلات. قد تعالج الاستضافة معلومات الطلبات المعتادة لتقديم الخدمة وحمايتها. تُقدَّم الخطوط والصور من الموقع نفسه.',
      ],
      [
        'طلبات التواصل',
        'يطلب نموذج التواصل الاسم الكامل والبريد الإلكتروني ورقم الهاتف مع رمز الدولة ونص الطلب، واسم الشركة وموقعها الإلكتروني اختيارياً. يرجى عدم إرسال بيانات شخصية أو مالية حساسة.',
      ],
      [
        'كيف نتعامل مع الطلبات',
        `يُرسَل طلبك بالبريد الإلكتروني إلى ${site.email} عبر مزوّد خدمة إرسال البريد (Resend)، ويُحفَظ في نظام إدارة علاقات العملاء لدينا (HubSpot)، ليتمكن فريقنا، وشركة المجموعة المعنية عند الحاجة، من الرد عليه ومتابعته. قد يخزّن هؤلاء المزوّدون البيانات على خوادم خارج تركيا. لا نبيع بياناتك أبداً.`,
      ],
      [
        'الرسائل الإخبارية',
        `لا نرسل الأخبار والمستجدات بالبريد الإلكتروني إلا إذا حدّدت المربع الاختياري في النموذج. تتضمن كل رسالة رابطاً لإلغاء الاشتراك، ويمكنك أيضاً سحب موافقتك بمراسلتنا على ${site.email}.`,
      ],
      [
        'مدة الاحتفاظ',
        'نحتفظ ببياناتك طوال المدة اللازمة للرد على طلبك واستمرار علاقتنا التجارية، أو إلى أن تطلب حذفها، ما لم يُلزمنا القانون بالاحتفاظ بها مدة أطول.',
      ],
      [
        'الحماية',
        'تنتقل الطلبات عبر اتصال مشفّر، ونتحقق من البيانات المرسلة ونحميها من الرسائل المزعجة.',
      ],
      [
        'حقوقك',
        `وفق قوانين حماية البيانات المعمول بها، ومنها قانون حماية البيانات الشخصية التركي رقم 6698 (KVKK)، يحق لك معرفة البيانات التي نحتفظ بها عنك وطلب تصحيحها أو حذفها، والاعتراض على معالجتها أو سحب موافقتك. راسلنا على ${site.email}.`,
      ],
    ],
    termsIntro: 'توضح هذه الشروط غرض الموقع المؤسسي لمجموعة باي حضارة وحدود استخدامه.',
    termsSections: [
      [
        'الهوية المؤسسية',
        `مجموعة باي حضارة هوية تجارية تجمع شركات مسجلة بشكل مستقل. لا يقدم الموقع المجموعة باعتبارها شركة قابضة مسجلة أو صندوقاً استثمارياً أو جهة استشارات مالية مرخصة. يُدار الموقع من قبل شركة ${site.legalName}، إسطنبول، تركيا.`,
      ],
      [
        'المعلومات والاستفسارات',
        'المحتوى معلومات مؤسسية عامة، وليس نصيحة مالية أو عرضاً استثمارياً أو وعداً بالعوائد أو التزاماً تعاقدياً. إرسال الاستفسار لا ينشئ اتفاقاً.',
      ],
      [
        'الشركات والأسواق',
        'تميز أوصاف الأعمال بين الأنشطة الحالية والأهداف المستقبلية. لا تعني الإشارة إلى الأسواق الإقليمية وجود مكاتب أو كيانات قانونية أو مشاريع منجزة فيها.',
      ],
      [
        'المواقع الخارجية',
        'تُدار مواقع الشركات المتخصصة بصورة مستقلة، وتنطبق محتوياتها وخدماتها وسياسات خصوصيتها وشروطها عند زيارتها.',
      ],
      [
        'محتوى الموقع',
        'تعرّف الأسماء التجارية والمحتوى الأصلي بالمجموعة وشركاتها. معلومات المشاريع والمنتجات مأخوذة من مواقع شركات المجموعة، أما الصور المرخصة الأخرى فتوضيحية ولا تمثل عقارات أو مكاتب المجموعة.',
      ],
      [
        'الاستخدام المسؤول',
        'يُمنع إساءة استخدام النماذج أو محاولة الوصول غير المصرح به أو إرسال مواد غير قانونية أو ضارة أو مضللة. تتطلب العلاقات التجارية ترتيبات منفصلة متفقاً عليها.',
      ],
    ],
    notFound: 'الصفحة غير موجودة',
    notFoundText: 'الصفحة المطلوبة غير متاحة بهذه اللغة.',
    returnHome: 'العودة إلى الرئيسية',
  },
  tr: {
    nav: [
      'Ana Sayfa',
      'Hakkımızda',
      'Şirketlerimiz',
      'Pazarlarımız',
      'İş Ortaklıkları',
      'İçgörüler ve Haberler',
    ],
    contact: 'İletişim',
    partner: 'İş ortağımız olun',
    menu: 'Menüyü aç',
    close: 'Menüyü kapat',
    skip: 'İçeriğe geç',
    home: 'Ana Sayfa',
    breadcrumb: 'Sayfa yolu',
    language: 'Dil',
    back: 'Genel bakışa dön',
    location: 'İSTANBUL, TÜRKİYE · ULUSLARARASI BAKIŞ',
    hero: ['Değer İnşa Ediyoruz.', 'Pazarları Buluşturuyoruz.'],
    intro:
      'İstanbul merkezli bir yatırım ve iş geliştirme grubu. Uzmanlaşmış işletmeler geliştiriyor, bölgesel ve uluslararası pazarlar arasında anlamlı ticari bağlar kuruyoruz.',
    explore: 'Şirketlerimizi keşfedin',
    discover: 'Grubumuzu tanıyın',
    scroll: 'Ortak bir vizyon. Yeni fırsatlar.',
    who: 'BİZ KİMİZ',
    whoTitle: 'İstanbul’dan güç alıyor.\nSınırların ötesine bakıyoruz.',
    whoText:
      'BYHADARA Group, sürdürülebilir büyüme anlayışıyla bağımsız olarak tescil edilmiş şirketleri bir araya getirir. Mevcut faaliyetlerimiz gayrimenkul geliştirme ve konaklama tedarikini kapsar.',
    whoMore:
      'İşletmelerimizi geliştirmek, yeni fırsatları değerlendirmek ve kalıcı ticari ilişkiler kurmak için yerel pazar bilgisini uluslararası bir bakış açısıyla birleştiriyoruz.',
    businesses: 'ŞİRKETLERİMİZ',
    businessesTitle: 'Uzmanlaşmış işletmeler.\nOrtak bir vizyon.',
    businessIntro: 'Farklı sektörlerde uzmanlık, kalıcı değer yaratma hedefinde buluşuyor.',
    learn: 'Şirketi keşfedin',
    imageNote: 'Fotoğraflar temsilidir; BYHADARA mülk veya tesislerini göstermez.',
    productImageNote: 'Ürün fotoğrafları temsilidir.',
    groupLabel: 'GRUP',
    groupTitle: 'Tek grup.\nİki uzman şirket.',
    groupText:
      'BYHADARA Group, HADARA Real Estate ve HADARA Hospitality’yi tek çatı altında buluşturur; her biri kendi sektörüne odaklanır.',
    groupCompany: 'Bir BYHADARA Group şirketi',
    aboutCompany: 'Şirket hakkında',
    alsoInGroup: 'Grubun diğer şirketi',
    newTab: '(yeni sekmede açılır)',
    partnersLabel: 'GÜVENİLİR AĞ',
    partnersTitle: 'Başarı Ortaklarımız',
    partnersText:
      'Grup şirketlerimiz, müşterilerimizin güvenebileceği projeler için bölgenin önde gelen geliştiricileri ve holding gruplarıyla birlikte çalışır.',
    business: [
      {
        name: 'HADARA Real Estate',
        sector: 'Gayrimenkul Geliştirme',
        desc: 'İstanbul’da modern yaşam ve uzun vadeli değer için tasarlanan lüks villalar ve özenli konut projeleri.',
        detail:
          'HADARA Real Estate, İstanbul merkezli bir lüks villa ve nitelikli konut projeleri geliştiricisidir. 2014’ten bu yana aileler ve yatırımcılar için zarif tasarımı, sürdürülebilir yapıyı ve seçkin yaşam alanlarını bir araya getirir.',
        facts: [
          ['2014', 'İstanbul’da kuruldu'],
          ['3', 'Özel proje'],
          ['3', 'Bölgesel ortaklık'],
        ],
        areas: [
          'Lüks villalar',
          'Konut projesi geliştirme',
          'Mimari hizmetler',
          'Yapı malzemeleri ihracatı',
        ],
        showcaseTitle: 'Seçili projeler',
        showcaseCta: 'Projeyi görüntüle',
        visit: 'HADARA Real Estate web sitesine gidin',
        visitText:
          'Tüm projeler, müsaitlik ve ziyaret bilgileri HADARA Real Estate’in kendi platformunda.',
        image: 'architecture.jpg',
        alt: 'Çağdaş bir binanın yansıtıcı cam cephesi',
      },
      {
        name: 'HADARA Hospitality',
        sector: 'Konaklama Tedariki',
        desc: 'Türkiye’den 3★–5★ otel ve tatil köyleri için otel tekstili, havlu, bornoz ve misafir ürünleri.',
        detail:
          'HADARA Hospitality, İstanbul merkezli bir konaklama tedarik şirketidir. Türkiye genelindeki güvenilir üretim ortaklıklarıyla Körfez bölgesi ve Avrupa’daki otel ve tatil köylerine özenle seçilmiş tekstil ve misafir odası ürünleri tedarik eder.',
        facts: [
          ['3★–5★', 'Tedarik edilen otel segmentleri'],
          ['Türkiye', 'Üretim ortaklıkları'],
          ['Körfez ve Avrupa', 'Otel ortaklıkları'],
        ],
        areas: [
          'Yatak tekstili',
          'Havlu ve banyo',
          'Bornoz ve terlik',
          'Yastık ve yorgan',
          'Yatak ve yastık koruyucular',
          'Perdeler',
          'Misafir ürünleri',
        ],
        showcaseTitle: 'Seçili ürünler',
        showcaseCta: 'Ürünü görüntüle',
        visit: 'HADARA Hospitality web sitesine gidin',
        visitText:
          'Tüm koleksiyon, teknik özellikler ve teklif talepleri HADARA Hospitality’nin kendi platformunda.',
        image: 'hospitality/rolled-towels.jpg',
        alt: 'Rulo yapılmış beyaz otel havluları',
      },
    ],
    markets: 'PAZARLARIMIZ',
    marketsTitle: 'Yerel bilgi.\nBölgesel bağlar.',
    marketsIntro:
      'İstanbul’daki merkezimizden Türkiye, Körfez ülkeleri ve Mısır arasında ticari bağları güçlendirmeyi hedefliyoruz. Uluslararası vizyonumuzu her pazarın kendine özgü koşullarıyla şekillendiriyoruz.',
    marketsCta: 'Pazarlarımızı keşfedin',
    market: [
      {
        name: 'Türkiye',
        status: 'FAALİYET MERKEZİMİZ',
        desc: 'İstanbul, grubun merkezi ve gayrimenkul ile konaklama tedariki faaliyetlerinin ana üssüdür.',
        interest:
          'Mevcut işletmeleri geliştirmek, yerel ilişkileri derinleştirmek, gayrimenkul ve konaklama fırsatlarını değerlendirmek.',
        sectors: 'Gayrimenkul geliştirme · Konaklama tedariki',
      },
      {
        name: 'Körfez Pazarları',
        status: 'TİCARİ VE BÖLGESEL ODAK',
        desc: 'Uzun vadeli ticari iş birliği anlayışıyla konaklama tedariki ilişkileri ve bölgesel iş geliştirme açısından önemli bir bölge.',
        interest:
          'Konaklama alıcıları, distribütörler, tedarikçiler ve bölgesel iş geliştirme ortaklarıyla ilişkiler kurmak.',
        sectors: 'Konaklama tedariki · İş geliştirme',
      },
      {
        name: 'Mısır',
        status: 'GELECEĞE YÖNELİK FIRSATLAR',
        desc: 'İş geliştirme, ticari ilişkiler ve gelecekteki fırsatlar açısından ilgi duyduğumuz bir pazar.',
        interest:
          'Pazar bilgisini, potansiyel ortakları ve grubun büyüme yönüyle uyumlu fırsatları araştırmak.',
        sectors: 'Ticari ilişkiler · Geleceğe yönelik iş geliştirme',
      },
    ],
    marketNote:
      'Bölgesel ilgi alanları; yerel ofis, tescilli şirket veya kesinleşmiş yatırım projesi bulunduğu anlamına gelmez.',
    vision: 'VİZYONUMUZ',
    visionTitle: 'Uzun vadeli\ndeğer yaratmak.',
    visionText:
      'Sürdürülebilir işletmeler geliştirerek, sektörler ve uluslararası pazarlar arasındaki yatırım ve iş fırsatlarını birleştirerek güçlü bölgesel varlığa sahip, çeşitlendirilmiş bir iş grubu oluşturmak.',
    mission: 'Misyonumuz',
    missionText:
      'Yerel pazar uzmanlığını uluslararası bakış açısıyla birleştirerek uzmanlaşmış işletmeler kurmak ve geliştirmek, mevcut şirketlerimizi güçlendirmek ve stratejik ortaklıklar oluşturmak.',
    purpose: 'Amacımız',
    purposeText:
      'Fırsatları sürdürülebilir işletmelere dönüştürmek; pazarlar ve sektörler arasında ekonomik ve ticari bağlar kurmak.',
    values: 'Temel değerlerimiz',
    valueList: [
      'Güven ve Şeffaflık',
      'Sürdürülebilir Büyüme',
      'Stratejik Ortaklıklar',
      'Yenilikçilik',
      'Kalite ve Mükemmellik',
    ],
    philosophy: 'Büyümeye bilinçli bir yaklaşım',
    philosophyText:
      'Kalıcı işletmelerin net öncelikler, uzmanlık ve güvenilir ilişkilerle kurulduğuna inanıyoruz. Yeni fırsatları, mevcut işlerimiz ve uzun vadeli yönümüzle uyumları açısından dikkatle değerlendiriyoruz.',
    growth: 'Büyüme yönümüz',
    growthText:
      'Mevcut işletmelerimizi güçlendirmeyi, yeni şirket ve proje fırsatlarını araştırmayı ve uluslararası ortaklıklar geliştirmeyi amaçlıyoruz. Bunlar geleceğe yönelik hedeflerdir; mevcut faaliyetlere ilişkin iddialar değildir.',
    partnerships: 'İŞ ORTAKLIKLARI',
    partnershipsTitle: 'Birlikte\nbüyüyelim.',
    partnershipIntro:
      'İyi ortaklıklar ortak bir bakış açısıyla başlar. Yatırımcılar, geliştiriciler, üreticiler, tedarikçiler ve bölgesel iş ortaklarıyla görüşmeye açığız.',
    investmentCta: 'Yatırım fırsatlarını keşfedin',
    partnershipCta: 'Stratejik iş ortağımız olun',
    partnershipHero: 'Ortaklıklar kuruyor.\nFırsatlar yaratıyoruz.',
    partnershipTypes: [
      'Yatırım iş birlikleri',
      'Gayrimenkul geliştirme ortaklıkları',
      'Üretim ve tedarik ortaklıkları',
      'Bölgesel iş geliştirme',
      'Kurumsal ve stratejik iş birlikleri',
    ],
    partnershipDescriptions: [
      'Mevcut sektörlerimiz ve uzun vadeli yönümüzle uyumlu ortak girişim ve iş fırsatlarını değerlendirin.',
      'Sorumlu büyüme anlayışıyla Türkiye’de konut ve ticari gayrimenkul geliştirme fırsatlarını görüşün.',
      'Üretim uzmanlığını ve güvenilir tedariki konaklama sektörünün satın alma ihtiyaçlarıyla buluşturun.',
      'Pazar bilgisi, dağıtım deneyimi ve ticari ilişkilerle bölgesel fırsatlara katkı sağlayın.',
      'Uzmanlaşmış işletmeler geliştirmek için tamamlayıcı yetkinlikleri ve ortak yaklaşımları değerlendirin.',
    ],
    insights: 'İÇGÖRÜLER VE HABERLER',
    insightsTitle: 'Değer katan bakış açıları.',
    insightsIntro: 'Grubun iş alanlarından fikirler, değerlendirmeler ve güncel gelişmeler.',
    emptyTitle: 'Yeni bakış açıları burada buluşacak.',
    emptyText:
      'İlk yayınlarımızı hazırlıyoruz. Onaylanan içgörüler ve grup haberleri burada yayımlanacak.',
    allInsights: 'Tüm içgörüler',
    search: 'İçgörülerde ara',
    allCategories: 'Tüm kategoriler',
    noResults: 'Aramanızla eşleşen makale bulunamadı.',
    read: 'Makaleyi okuyun',
    related: 'İlgili içerikler',
    categories: [
      'Grup Haberleri',
      'Yatırım ve İş Dünyası',
      'Gayrimenkul',
      'Konaklama',
      'Türkiye Pazarları',
      'Körfez Pazarları',
      'Mısır Pazarları',
      'Uluslararası Ticaret',
    ],
    ctaTitle: 'Fırsatları birlikte\ngeliştirelim.',
    ctaText:
      'İş fırsatları, stratejik ortaklıklar ve bölgesel iş birliklerini görüşmek için BYHADARA Group ile iletişime geçin.',
    cta: 'Grubumuzla iletişime geçin',
    footer:
      'İstanbul merkezli, uzmanlaşmış işletmeleri ortak bir vizyonda buluşturan yatırım ve iş geliştirme grubu.',
    quickLinks: 'Keşfedin',
    based: 'İstanbul, Türkiye',
    legalIdentity:
      'BYHADARA Group, bağımsız olarak tescil edilmiş şirketleri bir araya getiren ticari bir kimliktir.',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
    rights: 'Tüm hakları saklıdır.',
    aboutTitle: 'Ortak bir hedef.\nBilinçli bir yön.',
    aboutIntro:
      'BYHADARA Group, uzmanlaşmış sektörlerde faaliyet gösteren bağımsız tescilli şirketleri bir araya getiren İstanbul merkezli bir yatırım ve iş geliştirme grubudur.',
    contactTitle: 'Bir görüşme, yeni\nolanaklar açabilir.',
    contactIntro:
      'Hedeflerinizin vizyonumuzla nerede buluştuğunu anlatın. Grubumuzla iletişim kurmanın uygun yolunu seçin veya uzman şirket platformlarımızı ziyaret edin.',
    directContact: 'Doğrudan iletişim',
    emailLabel: 'E-posta',
    phoneLabel: 'Telefon',
    locationLabel: 'Konum',
    companySites: 'Şirketlerimizin web siteleri',
    thanksLabel: 'Talebiniz alındı',
    thanksTitle: 'BYHADARA Group ile iletişime geçtiğiniz için teşekkür ederiz.',
    thanksText:
      'Talebiniz İstanbul’daki ekibimize ulaştı. Dikkatle inceleyip size telefon veya e-posta ile dönüş yapacağız.',
    thanksHome: 'Ana sayfaya dön',
    thanksCompanies: 'Şirketlerimizi keşfedin',
    thanksMoreLabel: 'Diğer seçenekler',
    thanksMoreTitle: 'Size başka bir konuda yardımcı olabilir miyiz?',
    thanksAnother: 'Yeni bir talep iletin',
    generalRequest: 'Genel talep',
    specializations: 'Uzmanlık alanları',
    targetMarkets: 'Pazar odağı',
    strategicInterest: 'Stratejik ilgi alanları',
    investmentTitle: 'Yatırım fırsatlarını\nkeşfedin.',
    partnershipFormTitle: 'Stratejik iş\nortağımız olun.',
    formIntro:
      'Kendinizi tanıtın ve önerinizi açıkça anlatın. Hassas finansal bilgi veya fon kanıtı paylaşmayın.',
    formUnavailable: `Site üzerinden talep gönderimi şu anda kullanılamıyor. Lütfen ${site.email} adresine yazın veya ${site.phone} numarasını arayın.`,
    formDisclaimer:
      'Talep yalnızca bir tanışma adımıdır; yatırım teklifi, kabulü veya sözleşmesi oluşturmaz.',
    legalUpdated: 'Web sitesi bilgileri',
    privacyIntro:
      'Bu bildirim yalnızca kurumsal web sitesindeki bilgi işleme uygulamalarını açıklar. Bağımsız şirket web sitelerinin kendi gizlilik uygulamaları vardır.',
    privacySections: [
      [
        'Veri sorumlusu',
        `Bu web sitesi ve site üzerinden gönderilen talepler, BYHADARA Group adıyla faaliyet gösteren ${site.legalName} (İstanbul, Türkiye) tarafından yönetilir. İletişim: ${site.email}.`,
      ],
      [
        'Web sitesini ziyaret etmek',
        'Site reklam takipçisi veya analitik kullanmaz. Barındırma altyapısı, hizmet sunumu ve güvenlik için standart istek bilgilerini işleyebilir. Yazı tipleri ve fotoğraflar sitenin kendisinden sunulur.',
      ],
      [
        'İletişim talepleri',
        'İletişim formu ad soyad, e-posta adresi, ülke koduyla telefon numarası ve talebinizi; isteğe bağlı olarak şirket adı ve web sitesini ister. Lütfen hassas kişisel veya finansal bilgi göndermeyin.',
      ],
      [
        'Taleplerin işlenmesi',
        `Talebiniz, e-posta gönderim sağlayıcımız (Resend) aracılığıyla ${site.email} adresine iletilir ve müşteri ilişkileri yönetim sistemimize (HubSpot) kaydedilir; böylece ekibimiz ve gerektiğinde ilgili grup şirketi talebinizi yanıtlayıp takip edebilir. Bu sağlayıcılar verileri Türkiye dışındaki sunucularda saklayabilir. Bilgileriniz hiçbir zaman satılmaz.`,
      ],
      [
        'E-posta ile haber ve duyurular',
        `Haber ve duyuruları yalnızca formdaki isteğe bağlı kutuyu işaretlemeniz hâlinde e-posta ile göndeririz. Her e-postada abonelikten çıkma bağlantısı bulunur; onayınızı ${site.email} adresine yazarak da geri alabilirsiniz.`,
      ],
      [
        'Saklama süresi',
        'Bilgilerinizi, kanunen daha uzun süre saklamamız gerekmedikçe, talebinizi yanıtlamak ve ticari ilişkimizi sürdürmek için gerekli olduğu sürece ya da silinmesini isteyene kadar saklarız.',
      ],
      [
        'Koruma',
        'Talepler şifreli bağlantı üzerinden iletilir. Gönderimler doğrulanır ve spama karşı korunur.',
      ],
      [
        'Haklarınız',
        `6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) dahil yürürlükteki veri koruma mevzuatı kapsamında, hakkınızda hangi verileri tuttuğumuzu öğrenme, bunların düzeltilmesini veya silinmesini isteme, işlenmesine itiraz etme ve onayınızı geri alma haklarına sahipsiniz. ${site.email} adresine yazabilirsiniz.`,
      ],
    ],
    termsIntro:
      'Bu koşullar BYHADARA Group kurumsal web sitesinin amacını ve kullanım sınırlarını açıklar.',
    termsSections: [
      [
        'Kurumsal kimlik',
        `BYHADARA Group, bağımsız tescilli şirketleri bir araya getiren ticari kimliktir. Site grubu tescilli holding, yatırım fonu veya lisanslı finansal danışmanlık kurumu olarak sunmaz. Web sitesi ${site.legalName} (İstanbul, Türkiye) tarafından işletilmektedir.`,
      ],
      [
        'Bilgi ve talepler',
        'İçerik genel kurumsal bilgi amaçlıdır. Finansal tavsiye, yatırım teklifi, getiri vaadi veya sözleşme taahhüdü değildir. Talep gönderimi bir anlaşma oluşturmaz.',
      ],
      [
        'Şirketler ve pazarlar',
        'İş tanımları mevcut faaliyetleri gelecekteki hedeflerden ayırır. Bölgesel pazarlara yapılan atıflar yerel ofis, tüzel kişi veya tamamlanmış proje bulunduğu anlamına gelmez.',
      ],
      [
        'Harici web siteleri',
        'Uzman şirket web siteleri bağımsız işletilir. Bu siteleri ziyaret ettiğinizde kendi içerikleri, hizmetleri, gizlilik bildirimleri ve koşulları geçerlidir.',
      ],
      [
        'Site içeriği',
        'Marka isimleri ve özgün içerikler grubu ve şirketlerini tanıtır. Proje ve ürün bilgileri grup şirketlerinin kendi web sitelerinden alınmıştır; diğer lisanslı fotoğraflar temsilidir ve grubun mülk veya ofislerini göstermez.',
      ],
      [
        'Sorumlu kullanım',
        'Formları kötüye kullanmayın, yetkisiz erişim girişiminde bulunmayın; hukuka aykırı, zararlı veya yanıltıcı materyal göndermeyin. Ticari ilişkiler ayrıca mutabık kalınmış düzenlemeler gerektirir.',
      ],
    ],
    notFound: 'Sayfa bulunamadı',
    notFoundText: 'Aradığınız sayfa bu dilde mevcut değil.',
    returnHome: 'Ana sayfaya dön',
  },
};
export type Dictionary = typeof dictionaries.en;
export const dictionary = (locale: Locale): Dictionary => dictionaries[locale];
