/**
 * وقت لبعض | Time for All - LocalStorage Architecture & Seed Data
 * Centralized data management module for the entire application.
 */

const STORAGE_KEYS = {
  USERS: 'waqt_users',
  CURRENT_USER: 'waqt_current_user',
  SERVICES: 'waqt_services',
  REQUESTS: 'waqt_requests',
  TRANSACTIONS: 'waqt_transactions',
  SOLIDARITY_FUND: 'waqt_solidarity_fund',
  SOLIDARITY_APPS: 'waqt_solidarity_apps',
  GIFTS: 'waqt_gifts',
  NOTIFICATIONS: 'waqt_notifications',
  SETTINGS: 'waqt_settings',
  INITIALIZED: 'waqt_initialized_v1'
};

// Initial Seed Data
const DEFAULT_SETTINGS = {
  welcomeBonus: 2, // 2 hours given to every new user
  allowZeroBalanceSolidarity: true,
  maxGiftHours: 10,
  platformName: 'وقت لبعض - Time for All',
  currencyName: 'ساعة رصيد',
  solidarityFundMinimum: 5
};

const DEFAULT_USERS = [
  {
    id: 'user_admin',
    name: 'أ/ سامي عبد الرحيم',
    email: 'admin@waqt.org',
    password: 'admin',
    role: 'admin',
    phone: '01001234567',
    city: 'القاهرة',
    university: 'جامعة القاهرة',
    bio: 'منسق مبادرة وقت لبعض المجتمعية - باحث في التنمية الاجتماعية والعمل الأهلي.',
    skills: ['إدارة المبادرات', 'التوجيه المجتمعي', 'التدريب القيادي'],
    participationType: 'both', // 'provider', 'requester', 'both'
    balance: 10,
    totalEarned: 15,
    totalSpent: 3,
    totalDonated: 2,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-01-15'
  },
  {
    id: 'user_ahmed',
    name: 'أحمد محمود',
    email: 'ahmed@example.com',
    password: 'password',
    role: 'user',
    phone: '01112233445',
    city: 'الجيزة',
    university: 'كلية العلوم - جامعة عين شمس',
    bio: 'طالب في السنة النهائية، متفوق في الرياضيات والإحصاء. أحب مساعدة زملائي وتبسيط المفاهيم المعقدة.',
    skills: ['الرياضيات الجامعية', 'الإحصاء التطبيقي', 'إكسيل وتحليل البيانات'],
    participationType: 'both',
    balance: 5,
    totalEarned: 8,
    totalSpent: 2,
    totalDonated: 1,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-01'
  },
  {
    id: 'user_sara',
    name: 'سارة علي',
    email: 'sara@example.com',
    password: 'password',
    role: 'user',
    phone: '01223344556',
    city: 'القاهرة',
    university: 'حاسبات ومعلومات - جامعة حلوان',
    bio: 'مهندسة برمجيات واجهات أمامية وتصميم UI/UX. أؤمن بأن المعرفة تنمو بالمشاركة وتبادل الخبرات.',
    skills: ['تطوير الويب', 'HTML/CSS/JS', 'تصميم واجهات Figma', 'أساسيات بايثون'],
    participationType: 'both',
    balance: 4,
    totalEarned: 6,
    totalSpent: 3,
    totalDonated: 1,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-05'
  },
  {
    id: 'user_mona',
    name: 'د. منى كمال',
    email: 'mona@example.com',
    password: 'password',
    role: 'user',
    phone: '01099887766',
    city: 'الإسكندرية',
    university: 'كلية الآداب - جامعة الإسكندرية',
    bio: 'مدرسة لغات واستشارية إرشاد مهني وتطوير ذاتي. أسعى لتمكين الشباب وتجهيزهم لسوق العمل الحديث.',
    skills: ['المحادثة الإنجليزية', 'كتابة السيرة الذاتية', 'التحضير لمقابلات العمل', 'الترجمة'],
    participationType: 'both',
    balance: 3,
    totalEarned: 7,
    totalSpent: 4,
    totalDonated: 2,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-10'
  },
  {
    id: 'user_youssef',
    name: 'يوسف خليل',
    email: 'youssef@example.com',
    password: 'password',
    role: 'user',
    phone: '01556677889',
    city: 'القاهرة',
    university: 'هندسة شبكات - جامعة بنها',
    bio: 'مهتم بالدعم التقني ومساعدة كبار السن في استخدام التكنولوجيا والخدمات الرقمية والحكومية بأمان.',
    skills: ['الدعم الفني والكمبيوتر', 'تطبيقات الهواتف الذكية', 'الأمان الرقمي لكبار السن'],
    participationType: 'both',
    balance: 6,
    totalEarned: 9,
    totalSpent: 3,
    totalDonated: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-12'
  },
  {
    id: 'user_fatima',
    name: 'فاطمة حسن',
    email: 'fatima@example.com',
    password: 'password',
    role: 'user',
    phone: '01123456789',
    city: 'طنطا',
    university: 'التربية النوعية - فنون تطبيقية',
    bio: 'مدربة حرف يدوية، متخصصة في التفصيل والخياطة وإعادة تدوير الأقمشة. أحب نشر الحرف التراثية.',
    skills: ['الخياطة والتفصيل', 'التطريز اليدوي', 'صناعة الكروشيه'],
    participationType: 'provider',
    balance: 3,
    totalEarned: 4,
    totalSpent: 1,
    totalDonated: 0,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-15'
  },
  {
    id: 'user_ibrahim',
    name: 'عم إبراهيم الدسوقي',
    email: 'ibrahim@example.com',
    password: 'password',
    role: 'user',
    phone: '01011224488',
    city: 'القاهرة',
    university: 'بالمعاش - حي السيدة زينب',
    bio: 'متقاعد عن العمل بعد ٤٠ عاماً في التعليم الابتدائي. أحتاج لبعض المساعدة في الخدمات الإلكترونية والرعاية.',
    skills: ['قصص التاريخ والتراث', 'استشارات تربوية'],
    participationType: 'requester',
    balance: 0, // Zero balance to demonstrate solidarity assistance!
    totalEarned: 0,
    totalSpent: 0,
    totalDonated: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    joinedDate: '2025-02-20'
  }
];

const DEFAULT_SERVICES = [
  {
    id: 'srv_1',
    providerId: 'user_ahmed',
    providerName: 'أحمد محمود',
    providerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    title: 'شرح مادة الرياضيات والإحصاء للجامعات',
    category: 'التعليم والدروس',
    duration: 2, // hours
    type: 'online', // 'online' or 'in-person'
    location: 'عبر زووم / جوجل ميت',
    availability: 'مساء السبت والثلاثاء من ٦ إلى ٩',
    shortDesc: 'شرح مبسط لمفاهيم التفاضل والتكامل، والاحتمالات والإحصاء التطبيقي للسنوات الجامعية الأولى.',
    fullDesc: 'أقدم جلسات تفاعلية لشرح مناهج الرياضيات الجامعية والإحصاء، مع حل نماذج امتحانات سابقة وتقديم ملخصات مكتوبة بخط اليد. نركز خلال الساعتين على النقاط الصعبة وحل المسائل خطوة بخطوة حتى تمام الفهم.',
    status: 'approved', // 'approved', 'pending', 'rejected'
    rating: 4.9,
    reviewsCount: 7,
    createdAt: '2025-02-02'
  },
  {
    id: 'srv_2',
    providerId: 'user_sara',
    providerName: 'سارة علي',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    title: 'أساسيات بناء وتصميم المواقع الإلكترونية',
    category: 'التكنولوجيا والتحول الرقمي',
    duration: 2,
    type: 'online',
    location: 'عبر الإنترنت',
    availability: 'أيام الخميس والجمعة',
    shortDesc: 'تعلم كيف تبدأ خطوتك الأولى في البرمجة من خلال فهم هيكل صفحات الويب HTML و CSS و JavaScript.',
    fullDesc: 'ورشة تدريبية عملية تركز على المبتدئين بدون أي خبرة مسبقة. سنبني معاً صفحة هبوط شخصية متكاملة وسأشرح لك كيفية استضافة موقعك مجاناً وأهم مصادر التعلم الذاتي المجانية الموثوقة.',
    status: 'approved',
    rating: 5.0,
    reviewsCount: 11,
    createdAt: '2025-02-06'
  },
  {
    id: 'srv_3',
    providerId: 'user_mona',
    providerName: 'د. منى كمال',
    providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    title: 'جلسة محادثة وكسر حاجز الخوف من الإنجليزية',
    category: 'اللغات والترجمة',
    duration: 1,
    type: 'online',
    location: 'عبر زووم',
    availability: 'الأحد والأربعاء صباحاً ومساءً',
    shortDesc: 'جلسة حوارية مريحة تركز على النطق السليم واكتساب الثقة للتحدث باللغة الإنجليزية في الحياة اليومية.',
    fullDesc: 'جلسة مخصصة لكسر حاجز الخجل والخوف من التحدث باللغة الإنجليزية. نختار موضوعاً شيقاً من اهتماماتك ونتدرب على التعبير عن الأفكار، مع تصحيح النطق بلطف ودون أي ضغط، وتزويدك بأهم المصطلحات العملية.',
    status: 'approved',
    rating: 4.8,
    reviewsCount: 9,
    createdAt: '2025-02-11'
  },
  {
    id: 'srv_4',
    providerId: 'user_youssef',
    providerName: 'يوسف خليل',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    title: 'مساعدة كبار السن في التعامل مع الهواتف الذكية والتطبيقات الحكومية',
    category: 'المساعدة اليومية',
    duration: 2,
    type: 'in-person',
    location: 'حي المعادي / حلوان / السيدة زينب',
    availability: 'الجمعة والسبت بعد الظهر',
    shortDesc: 'جلسة صبورة ولطيفة لتعليم كبار السن كيفية استخدام واتساب، تطبيقات الخدمات، وأمان الحسابات.',
    fullDesc: 'أحب مساعدة أهالينا الكبار بصبر وهدوء تام. نقوم بضبط خط الهاتف ليكون واضحاً وكبيراً، وتعليمهم استخدام محادثات الصوت والفيديو مع العائلة، وحجز المواعيد الحكومية أو الطبية، وتوعيتهم ضد رسائل الاحتيال الإلكتروني.',
    status: 'approved',
    rating: 5.0,
    reviewsCount: 14,
    createdAt: '2025-02-13'
  },
  {
    id: 'srv_5',
    providerId: 'user_fatima',
    providerName: 'فاطمة حسن',
    providerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    title: 'تعليم أساسيات الخياطة والتفصيل المنزلي',
    category: 'الحرف والفنون',
    duration: 3,
    type: 'in-person',
    location: 'مركز شباب طنطا / ورشة تدريبية',
    availability: 'أيام الاثنين والخميس',
    shortDesc: 'تعلمي كيفية استخدام ماكينة الخياطة، أخذ المقاسات بدقة، وتصليح وتعديل الملابس بنفسك.',
    fullDesc: 'ورشة عملية وممتعة تهدف لتمكين السيدات والفتيات من مهارة الخياطة الأساسية. تشمل التدريب على أنواع الغرز، كيفية قص الباترون البسيط، تصليح الثياب وإعادة تدويرها لتوفير التكاليف وممارسة هواية جميلة ومفيدة.',
    status: 'approved',
    rating: 4.9,
    reviewsCount: 6,
    createdAt: '2025-02-16'
  },
  {
    id: 'srv_6',
    providerId: 'user_mona',
    providerName: 'د. منى كمال',
    providerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    title: 'مراجعة السيرة الذاتية والتأهيل للمقابلات الشخصية',
    category: 'الإرشاد المهني',
    duration: 1,
    type: 'online',
    location: 'عبر الإنترنت',
    availability: 'السبت والاثنين مساءً',
    shortDesc: 'صياغة سيرة ذاتية احترافية تتوافق مع معايير ATS والتدريب على أهم أسئلة المقابلات وسلوكياتها.',
    fullDesc: 'جلسة تدريبية مكثفة نراجع فيها سيرتك الذاتية كلمة بكلمة، نتأكد من إبراز إنجازاتك وقوتك، ونجري محاكاة واقعية لمقابلة العمل مع تقديم تغذية راجعة فورية لتعزيز ثقتك وحضورك أمام مسؤولي التوظيف.',
    status: 'approved',
    rating: 5.0,
    reviewsCount: 12,
    createdAt: '2025-02-17'
  },
  {
    id: 'srv_7',
    providerId: 'user_sara',
    providerName: 'سارة علي',
    providerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    title: 'تصميم هوية بصرية وشعارات للمبادرات الشبابية',
    category: 'الحرف والفنون',
    duration: 3,
    type: 'online',
    location: 'عبر الإنترنت',
    availability: 'نهاية الأسبوع',
    shortDesc: 'مساعدة المشاريع والمبادرات الناشئة في ابتكار شعار وتناسق ألوان احترافي يعبر عن رسالتهم.',
    fullDesc: 'إذا كنت تطلق مبادرة مجتمعية أو مشروعاً طلابياً غير ربحي، سأساعدك في جلسات عصف ذهني لاختيار الألوان والخطوط والشعار المناسب، وتجهيز قوالب للنشر على منصات التواصل الاجتماعي.',
    status: 'approved',
    rating: 4.9,
    reviewsCount: 5,
    createdAt: '2025-02-18'
  },
  {
    id: 'srv_8',
    providerId: 'user_youssef',
    providerName: 'يوسف خليل',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    title: 'فحص وتسريع أجهزة اللابتوب وحل مشاكل الويندوز',
    category: 'التكنولوجيا والتحول الرقمي',
    duration: 2,
    type: 'in-person',
    location: 'جامعة القاهرة أو الجيزة',
    availability: 'أيام الأحد والثلاثاء ظهراً',
    shortDesc: 'تنظيف الجهاز من الفيروسات، تسريع إقلاع النظام، وتثبيت البرامج الأساسية اللازمة للدراسة.',
    fullDesc: 'مساعدة الزملاء الطلاب في صيانة حواسيبهم المحمولة، والتخلص من الملفات المؤقتة التي تبطئ الجهاز، وإعادة ضبط إعدادات الأمان وتثبيت حزمة برامج الأوفيس وأدوات القراءة والبحث العلمي.',
    status: 'approved',
    rating: 4.7,
    reviewsCount: 8,
    createdAt: '2025-02-19'
  }
];

const DEFAULT_SOLIDARITY_FUND = {
  availableHours: 24,
  totalDonatedHours: 54,
  usedHours: 30,
  supportedCount: 16,
  donorsCount: 22,
  description: 'صندوق التكافل هو مخزون الساعات التضامني المخصص لدعم الأفراد الذين يحتاجون إلى مساعدة ولا تسمح ظروفهم أو أعمارهم بتقديم خدمات مقابلة. لأن المساعدة حق ومسؤولية مجتمعية متبادلة، وليست ديناً على عاتق أحد.'
};

const DEFAULT_SOLIDARITY_APPS = [
  {
    id: 'sol_app_1',
    applicantName: 'عم إبراهيم الدسوقي',
    applicantEmail: 'ibrahim@example.com',
    applicantPhone: '01011224488',
    city: 'القاهرة - السيدة زينب',
    assistanceType: 'المساعدة اليومية والتقنية',
    hoursNeeded: 2,
    description: 'أحتاج إلى مساعدة في تجديد بطاقة التموين والاشتراك في التأمين الصحي الشامل عبر الموقع الإلكتروني، حيث أن نظري ضعيف ولا أجيد استخدام الكمبيوتر.',
    contactPreference: 'هاتفياً',
    status: 'assigned', // pending, approved, assigned, completed, rejected
    assignedVolunteerId: 'user_youssef',
    assignedVolunteerName: 'يوسف خليل',
    submittedAt: '2025-02-18',
    adminNotes: 'تم التحقق من الطلب وتكليف يوسف خليل بالمهمة نظراً لخبرته وقربه من المنطقة.'
  },
  {
    id: 'sol_app_2',
    applicantName: 'أم كلثوم عبد الجليل',
    applicantEmail: 'omkalthoum@test.org',
    applicantPhone: '01234455667',
    city: 'الجيزة',
    assistanceType: 'اللغات والترجمة',
    hoursNeeded: 2,
    description: 'ترجمة تقرير طبي وأشعة صادرة باللغة الإنجليزية لأحد المراكز المتخصصة، لعرضها على استشاري حكومي.',
    contactPreference: 'واتساب',
    status: 'completed',
    assignedVolunteerId: 'user_mona',
    assignedVolunteerName: 'د. منى كمال',
    submittedAt: '2025-02-12',
    completedAt: '2025-02-14',
    adminNotes: 'اكتملت الترجمة بنجاح وتم تسليمها للأسرة.'
  },
  {
    id: 'sol_app_3',
    applicantName: 'الحاج فاروق النجار',
    applicantEmail: 'farouk@test.org',
    applicantPhone: '01122998877',
    city: 'الإسكندرية',
    assistanceType: 'المساعدة لذوي الإعاقة',
    hoursNeeded: 3,
    description: 'مرافقة إلى المستشفى لإجراء فحوصات روتينية، ومساعدتي في قراءة التعليمات الطبية وإجراءات الدخول.',
    contactPreference: 'هاتفياً',
    status: 'pending',
    assignedVolunteerId: null,
    assignedVolunteerName: null,
    submittedAt: '2025-02-19',
    adminNotes: 'طلب جديد قيد مراجعة وتعيين متطوع قريب من سموحة.'
  }
];

const DEFAULT_REQUESTS = [
  {
    id: 'req_101',
    serviceId: 'srv_1',
    serviceTitle: 'شرح مادة الرياضيات والإحصاء للجامعات',
    providerId: 'user_ahmed',
    providerName: 'أحمد محمود',
    requesterId: 'user_sara',
    requesterName: 'سارة علي',
    requesterAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    hours: 2,
    date: '2025-02-24',
    time: '07:00 مساءً',
    notes: 'أحتاج للتركيز على مسائل الجبر الخطي والمصفوفات لاستخدامها في خوارزميات الرسوميات.',
    status: 'scheduled', // 'pending', 'accepted', 'scheduled', 'awaiting_confirmation', 'completed', 'rejected', 'cancelled'
    isSolidarity: false,
    createdAt: '2025-02-17'
  },
  {
    id: 'req_102',
    serviceId: 'srv_3',
    serviceTitle: 'جلسة محادثة وكسر حاجز الخوف من الإنجليزية',
    providerId: 'user_mona',
    providerName: 'د. منى كمال',
    requesterId: 'user_ahmed',
    requesterName: 'أحمد محمود',
    requesterAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    hours: 1,
    date: '2025-02-23',
    time: '05:00 مساءً',
    notes: 'أستعد لتقديم عرض تقديمي بالإنجليزية في مؤتمر علمي بالجامعة وأحتاج لمراجعة الإلقاء.',
    status: 'completed',
    isSolidarity: false,
    createdAt: '2025-02-14',
    completedAt: '2025-02-16'
  },
  {
    id: 'req_103',
    serviceId: 'srv_4',
    serviceTitle: 'مساعدة كبار السن في التعامل مع الهواتف الذكية والتطبيقات الحكومية',
    providerId: 'user_youssef',
    providerName: 'يوسف خليل',
    requesterId: 'user_ibrahim',
    requesterName: 'عم إبراهيم الدسوقي',
    requesterAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    hours: 2,
    date: '2025-02-25',
    time: '11:00 صباحاً',
    notes: 'طلب مساعدة تكافلية لتعليم الحاج إبراهيم كيفية استخدام تطبيق المعاش والتواصل مع أبنائه.',
    status: 'scheduled',
    isSolidarity: true, // Sponsored by solidarity fund!
    createdAt: '2025-02-18'
  },
  {
    id: 'req_104',
    serviceId: 'srv_2',
    serviceTitle: 'أساسيات بناء وتصميم المواقع الإلكترونية',
    providerId: 'user_sara',
    providerName: 'سارة علي',
    requesterId: 'user_fatima',
    requesterName: 'فاطمة حسن',
    requesterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    hours: 2,
    date: '2025-02-26',
    time: '06:00 مساءً',
    notes: 'أريد معرفة كيفية عمل صفحة لمعرض أعمال الخياطة والحرف اليدوية.',
    status: 'pending',
    isSolidarity: false,
    createdAt: '2025-02-19'
  }
];

const DEFAULT_TRANSACTIONS = [
  {
    id: 'tx_1',
    userId: 'user_ahmed',
    type: 'welcome', // 'welcome', 'earned', 'spent', 'donated', 'gifted', 'received_gift'
    amount: 2,
    balanceAfter: 2,
    description: 'رصيد ترحيبي عند الانضمام لمنصة وقت لبعض',
    relatedUser: 'المنصة',
    date: '2025-02-01 10:00'
  },
  {
    id: 'tx_2',
    userId: 'user_ahmed',
    type: 'earned',
    amount: 2,
    balanceAfter: 4,
    description: 'تقديم خدمة: شرح مادة الإحصاء لزميل جامعي',
    relatedUser: 'عمر شريف',
    date: '2025-02-05 16:30'
  },
  {
    id: 'tx_3',
    userId: 'user_ahmed',
    type: 'earned',
    amount: 2,
    balanceAfter: 6,
    description: 'تقديم خدمة: حل مسائل التفاضل المتقدم لطلاب الهندسة',
    relatedUser: 'كريم خالد',
    date: '2025-02-09 18:00'
  },
  {
    id: 'tx_4',
    userId: 'user_ahmed',
    type: 'spent',
    amount: 1,
    balanceAfter: 5,
    description: 'الاستفادة من خدمة: جلسة محادثة باللغة الإنجليزية',
    relatedUser: 'د. منى كمال',
    date: '2025-02-12 19:15'
  },
  {
    id: 'tx_5',
    userId: 'user_ahmed',
    type: 'donated',
    amount: 1,
    balanceAfter: 4,
    description: 'تبرع بساعة رصيد لصندوق التكافل المجتمعي',
    relatedUser: 'صندوق التكافل',
    date: '2025-02-14 11:20'
  },
  {
    id: 'tx_6',
    userId: 'user_ahmed',
    type: 'earned',
    amount: 2,
    balanceAfter: 6,
    description: 'تقديم خدمة: تدريب إكسيل لجمعية طلابية',
    relatedUser: 'رنا مصطفى',
    date: '2025-02-16 14:00'
  },
  {
    id: 'tx_7',
    userId: 'user_ahmed',
    type: 'gifted',
    amount: 1,
    balanceAfter: 5,
    description: 'إهداء ساعة إلى سارة علي تقديراً لمجهودها في مبادرة البرمجة',
    relatedUser: 'سارة علي',
    date: '2025-02-17 15:45'
  },
  {
    id: 'tx_8',
    userId: 'user_sara',
    type: 'received_gift',
    amount: 1,
    balanceAfter: 4,
    description: 'هدية وقت من أحمد محمود: "شكراً على مبادرتك في تعليم البرمجة"',
    relatedUser: 'أحمد محمود',
    date: '2025-02-17 15:45'
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif_1',
    userId: 'user_ahmed',
    title: 'طلب خدمة جديد',
    message: 'قدمت سارة علي طلباً للاستفادة من خدمة "شرح الرياضيات الجامعية".',
    type: 'request',
    isRead: false,
    link: 'my-requests.html',
    createdAt: '2025-02-17 18:30'
  },
  {
    id: 'notif_2',
    userId: 'user_ahmed',
    title: 'تم تسجيل تبرعك بنجاح',
    message: 'شكراً لعطائك! تم تحويل ساعة واحدة من رصيدك لدعم صندوق التكافل المجتمعي.',
    type: 'solidarity',
    isRead: true,
    link: 'solidarity.html',
    createdAt: '2025-02-14 11:20'
  },
  {
    id: 'notif_3',
    userId: 'user_sara',
    title: 'هدية ساعات رصيد!',
    message: 'أرسل لك أحمد محمود هدية قدرها ساعة واحدة مع رسالة شكر لطيفة.',
    type: 'gift',
    isRead: false,
    link: 'wallet.html',
    createdAt: '2025-02-17 15:45'
  },
  {
    id: 'notif_4',
    userId: 'user_ibrahim',
    title: 'تمت الموافقة على طلب المساعدة',
    message: 'تم تخصيص المتطوع يوسف خليل لمساعدتك في استخدام التطبيقات الحكومية يوم الثلاثاء.',
    type: 'solidarity',
    isRead: false,
    link: 'solidarity.html',
    createdAt: '2025-02-18 12:00'
  }
];

// Centralized Storage API
const Storage = {
  // Initialization
  init: function() {
    if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
      this.resetToDefaults();
    }
  },

  resetToDefaults: function() {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(DEFAULT_SERVICES));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(DEFAULT_REQUESTS));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(DEFAULT_TRANSACTIONS));
    localStorage.setItem(STORAGE_KEYS.SOLIDARITY_FUND, JSON.stringify(DEFAULT_SOLIDARITY_FUND));
    localStorage.setItem(STORAGE_KEYS.SOLIDARITY_APPS, JSON.stringify(DEFAULT_SOLIDARITY_APPS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.GIFTS, JSON.stringify([]));
    
    // Default logged in user: Ahmed Mahmoud for smooth immediate demo testing
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[1]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  },

  // Generic Helpers
  _get: function(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return fallback;
    }
  },

  _set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing ${key} to localStorage:`, e);
      return false;
    }
  },

  // Settings
  getSettings: function() {
    return this._get(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  updateSettings: function(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    this._set(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Users
  getUsers: function() {
    return this._get(STORAGE_KEYS.USERS, []);
  },

  getUserById: function(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  getUserByEmail: function(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  saveUser: function(user) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.id === user.id);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    this._set(STORAGE_KEYS.USERS, users);

    // If updating current user, sync current_user session
    const current = this.getCurrentUser();
    if (current && current.id === user.id) {
      this.setCurrentUser(user);
    }
    return user;
  },

  updateUser: function(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;
    const updatedUser = { ...user, ...updates };
    return this.saveUser(updatedUser);
  },

  // Current Auth Session
  getCurrentUser: function() {
    const user = this._get(STORAGE_KEYS.CURRENT_USER, null);
    if (!user) return null;
    // Always fetch fresh data from users list
    return this.getUserById(user.id) || user;
  },

  setCurrentUser: function(user) {
    this._set(STORAGE_KEYS.CURRENT_USER, user);
  },

  logout: function() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Services
  getServices: function() {
    return this._get(STORAGE_KEYS.SERVICES, []);
  },

  getServiceById: function(id) {
    const services = this.getServices();
    return services.find(s => s.id === id) || null;
  },

  saveService: function(service) {
    const services = this.getServices();
    const existingIndex = services.findIndex(s => s.id === service.id);
    if (existingIndex >= 0) {
      services[existingIndex] = service;
    } else {
      services.unshift(service); // new services first
    }
    this._set(STORAGE_KEYS.SERVICES, services);
    return service;
  },

  deleteService: function(id) {
    let services = this.getServices();
    services = services.filter(s => s.id !== id);
    this._set(STORAGE_KEYS.SERVICES, services);
  },

  // Requests
  getRequests: function() {
    return this._get(STORAGE_KEYS.REQUESTS, []);
  },

  getRequestById: function(id) {
    const requests = this.getRequests();
    return requests.find(r => r.id === id) || null;
  },

  saveRequest: function(request) {
    const requests = this.getRequests();
    const existingIndex = requests.findIndex(r => r.id === request.id);
    if (existingIndex >= 0) {
      requests[existingIndex] = request;
    } else {
      requests.unshift(request);
    }
    this._set(STORAGE_KEYS.REQUESTS, requests);
    return request;
  },

  // Transactions
  getTransactions: function() {
    return this._get(STORAGE_KEYS.TRANSACTIONS, []);
  },

  getUserTransactions: function(userId) {
    const txs = this.getTransactions();
    return txs.filter(t => t.userId === userId).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  addTransaction: function(tx) {
    const txs = this.getTransactions();
    const newTx = {
      id: 'tx_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      date: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      ...tx
    };
    txs.unshift(newTx);
    this._set(STORAGE_KEYS.TRANSACTIONS, txs);
    return newTx;
  },

  // Solidarity Fund
  getSolidarityFund: function() {
    return this._get(STORAGE_KEYS.SOLIDARITY_FUND, DEFAULT_SOLIDARITY_FUND);
  },

  updateSolidarityFund: function(updates) {
    const fund = this.getSolidarityFund();
    const updated = { ...fund, ...updates };
    this._set(STORAGE_KEYS.SOLIDARITY_FUND, updated);
    return updated;
  },

  getSolidarityApplications: function() {
    return this._get(STORAGE_KEYS.SOLIDARITY_APPS, []);
  },

  getSolidarityAppById: function(id) {
    const apps = this.getSolidarityApplications();
    return apps.find(a => a.id === id) || null;
  },

  saveSolidarityApplication: function(app) {
    const apps = this.getSolidarityApplications();
    const existingIndex = apps.findIndex(a => a.id === app.id);
    if (existingIndex >= 0) {
      apps[existingIndex] = app;
    } else {
      apps.unshift(app);
    }
    this._set(STORAGE_KEYS.SOLIDARITY_APPS, apps);
    return app;
  },

  // Notifications
  getNotifications: function(userId) {
    const all = this._get(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter(n => n.userId === userId);
  },

  addNotification: function(userId, notifData) {
    const all = this._get(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNotif = {
      id: 'notif_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      userId: userId,
      isRead: false,
      createdAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      ...notifData
    };
    all.unshift(newNotif);
    this._set(STORAGE_KEYS.NOTIFICATIONS, all);
    return newNotif;
  },

  markNotificationRead: function(id) {
    const all = this._get(STORAGE_KEYS.NOTIFICATIONS, []);
    const notif = all.find(n => n.id === id);
    if (notif) {
      notif.isRead = true;
      this._set(STORAGE_KEYS.NOTIFICATIONS, all);
    }
  },

  markAllNotificationsRead: function(userId) {
    const all = this._get(STORAGE_KEYS.NOTIFICATIONS, []);
    all.forEach(n => {
      if (n.userId === userId) n.isRead = true;
    });
    this._set(STORAGE_KEYS.NOTIFICATIONS, all);
  },

  // -------------------------------------------------------------
  // CORE BUSINESS LOGIC (Strict time-banking rules & validations)
  // -------------------------------------------------------------

  /**
   * Transfer time credits between users upon confirmed service completion.
   */
  completeServiceAndTransferHours: function(requestId) {
    const request = this.getRequestById(requestId);
    if (!request) return { success: false, message: 'الطلب غير موجود' };
    if (request.status === 'completed') return { success: false, message: 'تم إكمال الخدمة وتحويل الساعات مسبقاً' };

    const hours = Number(request.hours);
    const provider = this.getUserById(request.providerId);
    if (!provider) return { success: false, message: 'مقدم الخدمة غير موجود' };

    if (request.isSolidarity) {
      // Funded by the Solidarity Fund!
      const fund = this.getSolidarityFund();
      if (fund.availableHours < hours) {
        return { success: false, message: 'عذراً، رصيد صندوق التكافل المتاح لا يكفي' };
      }

      // Deduct from fund, mark used
      this.updateSolidarityFund({
        availableHours: fund.availableHours - hours,
        usedHours: fund.usedHours + hours,
        supportedCount: (fund.supportedCount || 0) + 1
      });

      // Provider earns hours
      const newProviderBalance = provider.balance + hours;
      this.updateUser(provider.id, {
        balance: newProviderBalance,
        totalEarned: (provider.totalEarned || 0) + hours
      });

      // Transaction log for provider
      this.addTransaction({
        userId: provider.id,
        type: 'earned',
        amount: hours,
        balanceAfter: newProviderBalance,
        description: `تقديم خدمة تكافلية: ${request.serviceTitle}`,
        relatedUser: `صندوق التكافل (لصالح ${request.requesterName})`
      });

      // Update request status
      request.status = 'completed';
      request.completedAt = new Date().toISOString();
      this.saveRequest(request);

      // Notifications
      this.addNotification(provider.id, {
        title: 'تم إكمال الخدمة وإضافة الرصيد!',
        message: `تمت إضافة ${hours} ساعات إلى رصيدك مقابل تقديمك لخدمة تكافلية لصالح ${request.requesterName}.`,
        type: 'credit',
        link: 'wallet.html'
      });

      this.addNotification(request.requesterId, {
        title: 'تم إكمال الخدمة التكافلية بنجاح',
        message: `تم إكمال خدمة "${request.serviceTitle}" بنجاح بدعم من صندوق التكافل المجتمعي.`,
        type: 'solidarity',
        link: 'my-requests.html'
      });

      return { success: true, message: `تم تأكيد إكمال الخدمة بنجاح، وإضافة ${hours} ساعة لرصيد مقدم الخدمة من صندوق التكافل.` };

    } else {
      // Regular user-to-user exchange
      const requester = this.getUserById(request.requesterId);
      if (!requester) return { success: false, message: 'طالب الخدمة غير موجود' };

      if (requester.balance < hours) {
        return { 
          success: false, 
          message: `رصيد المستفيد الحالي (${requester.balance} ساعة) لا يكفي لتسديد الساعات المطلوبة (${hours} ساعة). يمكنه طلب الدعم من صندوق التكافل.` 
        };
      }

      // Deduct from requester
      const newRequesterBalance = requester.balance - hours;
      this.updateUser(requester.id, {
        balance: newRequesterBalance,
        totalSpent: (requester.totalSpent || 0) + hours
      });

      // Add to provider
      const newProviderBalance = provider.balance + hours;
      this.updateUser(provider.id, {
        balance: newProviderBalance,
        totalEarned: (provider.totalEarned || 0) + hours
      });

      // Transaction logs
      this.addTransaction({
        userId: requester.id,
        type: 'spent',
        amount: hours,
        balanceAfter: newRequesterBalance,
        description: `الاستفادة من خدمة: ${request.serviceTitle}`,
        relatedUser: provider.name
      });

      this.addTransaction({
        userId: provider.id,
        type: 'earned',
        amount: hours,
        balanceAfter: newProviderBalance,
        description: `تقديم خدمة: ${request.serviceTitle}`,
        relatedUser: requester.name
      });

      // Update request status
      request.status = 'completed';
      request.completedAt = new Date().toISOString();
      this.saveRequest(request);

      // Notifications
      this.addNotification(provider.id, {
        title: 'تم تأكيد الخدمة وإضافة الساعات!',
        message: `تمت إضافة ${hours} ساعة لرصيدك بعد تأكيد إكمال خدمة "${request.serviceTitle}".`,
        type: 'credit',
        link: 'wallet.html'
      });

      this.addNotification(requester.id, {
        title: 'تم تأكيد إكمال الخدمة',
        message: `تم خصم ${hours} ساعة من رصيدك بنجاح مقابل خدمة "${request.serviceTitle}". شكراً لتبادل وقتك!`,
        type: 'request',
        link: 'wallet.html'
      });

      return { success: true, message: `تم تأكيد إكمال الخدمة بنجاح وتحويل ${hours} ساعة لرصيد ${provider.name}.` };
    }
  },

  /**
   * Donate hours to Community Solidarity Fund
   */
  donateHours: function(userId, hours) {
    hours = Number(hours);
    if (isNaN(hours) || hours <= 0) {
      return { success: false, message: 'يرجى إدخال عدد ساعات صحيح أكبر من صفر.' };
    }

    const user = this.getUserById(userId);
    if (!user) return { success: false, message: 'المستخدم غير موجود' };

    if (user.balance < hours) {
      return { success: false, message: `رصيدك الحالي (${user.balance} ساعة) لا يسمح بالتبرع بـ ${hours} ساعة.` };
    }

    // Deduct from user
    const newBalance = user.balance - hours;
    this.updateUser(user.id, {
      balance: newBalance,
      totalDonated: (user.totalDonated || 0) + hours
    });

    // Update Solidarity Fund
    const fund = this.getSolidarityFund();
    this.updateSolidarityFund({
      availableHours: (fund.availableHours || 0) + hours,
      totalDonatedHours: (fund.totalDonatedHours || 0) + hours,
      donorsCount: (fund.donorsCount || 0) + 1
    });

    // Log transaction
    this.addTransaction({
      userId: user.id,
      type: 'donated',
      amount: hours,
      balanceAfter: newBalance,
      description: 'تبرع بساعات لصندوق التكافل المجتمعي (لأن المساعدة حق.. مش دين)',
      relatedUser: 'صندوق التكافل'
    });

    // Notify user
    this.addNotification(user.id, {
      title: 'شكراً لعطائك وتكافلك المجتمعي!',
      message: `تم بنجاح التبرع بـ ${hours} ساعة لصندوق التكافل لمساعدة أفراد المجتمع غير القادرين على رد الخدمة.`,
      type: 'solidarity',
      link: 'solidarity.html'
    });

    return { 
      success: true, 
      message: `تم التبرع بـ ${hours} ساعة بنجاح لصندوق التكافل! رصيدك الجديد: ${newBalance} ساعة.` 
    };
  },

  /**
   * Gift hours to another registered member
   */
  giftHours: function(senderId, recipientId, hours, message) {
    hours = Number(hours);
    if (isNaN(hours) || hours <= 0) {
      return { success: false, message: 'يرجى إدخال عدد ساعات صحيح أكبر من صفر.' };
    }

    if (senderId === recipientId) {
      return { success: false, message: 'لا يمكنك إهداء الساعات لنفسك!' };
    }

    const sender = this.getUserById(senderId);
    const recipient = this.getUserById(recipientId);

    if (!sender || !recipient) {
      return { success: false, message: 'أحد أطراف الإهداء غير موجود في النظام.' };
    }

    if (sender.balance < hours) {
      return { success: false, message: `رصيدك الحالي (${sender.balance} ساعة) لا يكفي لإهداء ${hours} ساعة.` };
    }

    // Deduct from sender
    const newSenderBalance = sender.balance - hours;
    this.updateUser(sender.id, {
      balance: newSenderBalance,
      totalSpent: (sender.totalSpent || 0) + hours
    });

    // Add to recipient
    const newRecipientBalance = recipient.balance + hours;
    this.updateUser(recipient.id, {
      balance: newRecipientBalance,
      totalEarned: (recipient.totalEarned || 0) + hours
    });

    // Save gift record
    const gifts = this._get(STORAGE_KEYS.GIFTS, []);
    const giftRecord = {
      id: 'gift_' + Date.now(),
      senderId,
      senderName: sender.name,
      recipientId,
      recipientName: recipient.name,
      hours,
      message: message || 'هدية وقت وتقدير',
      date: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' })
    };
    gifts.unshift(giftRecord);
    this._set(STORAGE_KEYS.GIFTS, gifts);

    // Sender transaction
    this.addTransaction({
      userId: sender.id,
      type: 'gifted',
      amount: hours,
      balanceAfter: newSenderBalance,
      description: `إهداء ساعات إلى ${recipient.name}${message ? ': ' + message : ''}`,
      relatedUser: recipient.name
    });

    // Recipient transaction
    this.addTransaction({
      userId: recipient.id,
      type: 'received_gift',
      amount: hours,
      balanceAfter: newRecipientBalance,
      description: `هدية ساعات من ${sender.name}${message ? ': "' + message + '"' : ''}`,
      relatedUser: sender.name
    });

    // Recipient notification
    this.addNotification(recipient.id, {
      title: 'وصلتك هدية ساعات جديدة!',
      message: `أرسل لك ${sender.name} هدية قدرها ${hours} ساعات رصيد. تفقد محفظتك!`,
      type: 'gift',
      link: 'wallet.html'
    });

    return {
      success: true,
      message: `تم إهداء ${hours} ساعة بنجاح إلى ${recipient.name}!`
    };
  }
};

// Initialize automatically on script load
Storage.init();
