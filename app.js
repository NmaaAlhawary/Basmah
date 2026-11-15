/* بصمة · Basmah — clickable mobile prototype (static, data lives in localStorage) */

// ---------------- icons (Phosphor, bundled in assets/icons) ----------------
const I = {
  home: 'house', search: 'magnifying-glass', star: 'star', trophy: 'trophy', user: 'user', back: 'caret-right', chev: 'caret-left',
  plus: 'plus', bell: 'bell', shield: 'shield-check', check: 'check', upload: 'upload-simple', lock: 'lock-simple', eye: 'eye',
  flag: 'flag-banner', play: 'play', clock: 'clock', pin: 'map-pin', verified: 'seal-check', doc: 'file-text', trash: 'trash',
  settings: 'gear-six', calendar: 'calendar-blank', inbox: 'tray', admin: 'clipboard-text', globe: 'globe-hemisphere-east', square: 'square',
  'x-circle': 'x-circle', 'bookmark-simple': 'bookmark-simple', 'caret-down': 'caret-down', 'chat-circle-text': 'chat-circle-text', 'eye-slash': 'eye-slash', 'check-square': 'check-square', 'chat-slash': 'chat-circle-slash', key: 'key', 'chart-line-up': 'chart-line-up', sparkle: 'sparkle', 'paper-plane-tilt': 'paper-plane-tilt', 'lock-simple': 'lock-simple', 'flag-banner': 'flag-banner', 'gear-six': 'gear-six', 'clipboard-text': 'clipboard-text', buildings: 'buildings', medal: 'medal',
  wallet: 'wallet', gift: 'gift', info: 'info', 'check-circle': 'check-circle', 'shield-check': 'shield-check', 'arrow-square-out': 'arrow-square-out', 'paper-plane-tilt': 'paper-plane-tilt', compass: 'compass', question: 'question',
};
// ui icon: bold weight by default; w = 'fill' | 'duotone' for emphasis
const ic = (n, extra = '', w = 'bold') => `<i class="ph-${w} ph-${I[n] || n} icn" ${extra}></i>`;
// illustration icon (duotone) in a colour
const di = (n, color = '') => `<i class="ph-duotone ph-${n}"${color ? ` style="color:${color}"` : ''}></i>`;
const fic = k => di(FIELDS[k].e, FIELDS[k].fg);
// child avatar: first letter of the display name on the field colour
const av = (c, cls = '', style = '') => `<div class="avatar ${cls}" style="background:${c.bg};color:${FIELDS[c.field].fg};${style}">${esc(initial(c.name))}</div>`;
const initial = n => { n = (n || '').trim(); if (typeof isEN === 'function' && isEN() && /[\u0600-\u06FF]/.test(n)) n = tr(n); return (n[0] || '?').toUpperCase(); };
const mini = c => `<span class="mini" style="background:${c.bg};color:${FIELDS[c.field].fg}">${esc(initial(c.name))}</span>`;

// ---------------- reference data (from the project study) ----------------
const FIELDS = {
  arts:    { n: 'الفنون والرسم',   e: 'palette', fg: '#7C5BD6', bg: '#F1E9FF', skills: ['رسم', 'تصميم', 'أشغال يدوية', 'تصوير'] },
  music:   { n: 'الموسيقى والأداء', e: 'microphone-stage', fg: '#D9682B', bg: '#FFEFE3', skills: ['غناء', 'عزف', 'إلقاء', 'تمثيل'] },
  sports:  { n: 'الرياضة',         e: 'soccer-ball', fg: '#2F8F72', bg: '#E3F3EE', skills: ['كرة قدم', 'سباحة', 'جمباز', 'فنون قتالية'] },
  science: { n: 'العلوم والابتكار', e: 'robot', fg: '#2F6FCF', bg: '#E4EEFB', skills: ['روبوتات', 'اختراعات', 'تجارب', 'برمجة'] },
  lang:    { n: 'اللغة والأدب',     e: 'book-open-text', fg: '#A47A0B', bg: '#FFF6DC', skills: ['كتابة', 'قراءة', 'قصص', 'إلقاء'] },
  mind:    { n: 'الذكاء والمهارات', e: 'puzzle-piece', fg: '#4A5568', bg: '#ECEFF3', skills: ['شطرنج', 'ألغاز', 'تفكير', 'مهارات تحليلية'] },
};
const AGES = [
  { k: 'buds',    n: 'براعم',  r: '\u20663–5\u2069',   min: 3,  max: 5,  d: 'أنشطة إبداعية وحركية بمشاركة الأهل' },
  { k: 'disc',    n: 'اكتشاف', r: '\u20666–9\u2069',   min: 6,  max: 9,  d: 'مواهب أولية وتحديات بسيطة' },
  { k: 'dev',     n: 'تطوير',  r: '\u206610–13\u2069', min: 10, max: 13, d: 'تدريب وتقييم وفرص متخصصة' },
  { k: 'empower', n: 'تمكين',  r: '\u206614–17\u2069', min: 14, max: 17, d: 'برامج متقدمة وفرص ومبادرات' },
];
const ageGroup = a => AGES.find(g => a >= g.min && a <= g.max) || AGES[0];

const JOURNEY = [
  ['ولي الأمر يسجل', 'يفتح حساباً ويؤكد موافقته على الشروط'],
  ['إضافة ملف الطفل', 'يحدد العمر والمجال والمهارات'],
  ['رفع الموهبة', 'فيديو أو صور، وتبقى غير منشورة حتى المراجعة'],
  ['مراجعة بصمة', 'التحقق من المحتوى والملاءمة والسلامة'],
  ['اكتشاف الفرص', 'تظهر برامج وأكاديميات مناسبة'],
  ['طلب المشاركة', 'ولي الأمر يقرر إن كان يريد التقديم'],
  ['متابعة التطور', 'توثيق الإنجازات والتدريب والمشاركة'],
];

// sample partners — fictional names for the prototype
// Real Jordanian organisations and programmes. Facts come from their own sites or published news (see src/url).
// Basmah is not partnered with any of them yet; "apply via Basmah" is illustrative in the prototype.
const OPPS = [
  { id: 'o1', img: 'assets/photos/music.jpg', kind: 'برنامج', field: 'music', title: 'التعليم الموسيقي للأطفال', org: 'المعهد الوطني للموسيقى', parent: 'مؤسسة الملك الحسين', min: 4, max: 17,
    ages: 'من المرحلة التحضيرية', cost: 'حسب البرنامج', area: 'عمّان · رأس العين، مركز الحسين الثقافي', when: 'على مدار العام + ورشة موسيقية صيفية سنوية',
    desc: 'أول أكاديمية موسيقى في الأردن، تأسست عام 1985. تقدّم تعليماً موسيقياً من المرحلة التحضيرية حتى الجامعية، وتضم أول أوركسترا شباب في الأردن وفرقة الموسيقى العربية.',
    url: 'https://kinghusseinfoundation.org/en/EntityPage/National%20Music%20Conservatory/7', src: 'مؤسسة الملك الحسين' },
  { id: 'o2', img: 'assets/photos/lab.jpg', kind: 'مختبر', field: 'science', title: 'مختبر المبتكرين الصغار', org: 'مكتبة درب المعرفة', parent: 'مؤسسة عبد الحميد شومان', min: 6, max: 16,
    ages: 'أطفال ويافعون', cost: 'حسب النشاط', area: 'عمّان · جبل عمّان', when: 'حسب جدول أنشطة المكتبة',
    desc: 'مساحة للأطفال داخل مكتبة درب المعرفة لأنشطة تشجّع الابتكار والتجريب، ضمن برامج المكتبة في القراءة والموسيقى والابتكار.',
    url: 'https://shoman.org/en/The-Library/Knowledge-Path-Library/Young-Innovators-Lab', src: 'مؤسسة عبد الحميد شومان' },
  { id: 'o3', img: 'assets/photos/science.jpg', kind: 'نوادي وورش', field: 'science', title: 'نوادي STEAM والعروض العلمية', org: 'متحف الأطفال الأردن', min: 1, max: 12,
    ages: '⁦1–12⁩ سنة', cost: 'حسب البرنامج (عضوية عائلية متاحة)', area: 'عمّان', when: 'برامج وأنشطة شهرية',
    desc: 'تأسس عام 2007 ويضم أكثر من 150 معروضة تفاعلية. يقدّم نوادي في العلوم والفنون البصرية والقراءة والطفولة المبكرة، وورشاً وعروضاً علمية ومخيمات.',
    url: 'https://cmj.jo/families/', src: 'متحف الأطفال الأردن' },
  { id: 'o4', img: 'assets/photos/football.jpg', kind: 'برنامج', field: 'sports', title: 'مراكز الأمير علي للبراعم', org: 'الاتحاد الأردني لكرة القدم', min: 6, max: 14,
    ages: 'براعم وناشئون', cost: 'دون رسوم في برامج القاعدة', area: 'محافظات المملكة', when: 'أُعيد إطلاقها بتوجيه من سمو ولي العهد',
    desc: 'مراكز تأسست عام 2002 بإشراف الاتحاد الأردني لكرة القدم لاكتشاف المواهب الكروية الصغيرة وتطويرها في أنحاء المملكة.',
    url: 'https://rhc.jo/en/news/crown-prince-directs-relaunch-of-prince-ali-grassroots-centres', src: 'الديوان الملكي الهاشمي' },
  { id: 'o5', img: 'assets/photos/reading.jpg', kind: 'أندية وورش', field: 'lang', title: 'أندية القراءة وورش الكتابة الإبداعية', org: 'مكتبة درب المعرفة', parent: 'مؤسسة عبد الحميد شومان', min: 4, max: 16,
    ages: 'أطفال ويافعون', cost: 'حسب النشاط', area: 'عمّان · جبل عمّان والأشرفية', when: 'أندية موسمية وأنشطة أسبوعية',
    desc: 'قراءات موجّهة وجلسات نقاش وأندية موسمية وورش كتابة إبداعية ورواية قصص. افتُتحت المكتبة عام 2013، وفرع الأشرفية عام 2018.',
    url: 'https://shoman.org/en/Kids-library', src: 'مؤسسة عبد الحميد شومان' },
  { id: 'o6', img: 'assets/photos/art.jpg', kind: 'ورش ومخيمات', field: 'arts', title: 'ورش الفن والدراما والمسرح', org: 'مركز هيا الثقافي', min: 3, max: 15,
    ages: 'أطفال ويافعون', cost: 'حسب الورشة', area: 'عمّان · الشميساني', when: 'ورش دورية ومخيمات صيفية',
    desc: 'أول مؤسسة ثقافية غير ربحية في الأردن (1976). ورش في الفن والرقص والدراما والطبخ، ومسرح وعروض دمى وقبة فلكية ومتحف بيئي تفاعلي.',
    url: 'https://annalindhfoundation.org/node/5297', src: 'مؤسسة آنا ليند' },
  { id: 'o7', img: 'assets/photos/palette.jpg', kind: 'ورش فنية', field: 'arts', title: 'ورش فنية مع فنانين', org: 'المتحف الوطني الأردني للفنون الجميلة', min: 6, max: 17,
    ages: 'حسب الورشة', cost: 'حسب الورشة', area: 'عمّان · جبل اللويبدة', when: 'حسب برنامج الفعاليات',
    desc: 'ينظّم المتحف ورشاً فنية بالتعاون مع فنانين وكتّاب ومؤسسات ثقافية، ويشغّل متحفاً متنقلاً منذ عام 2009.',
    url: 'https://nationalgallery.org/about/art/', src: 'المتحف الوطني للفنون الجميلة' },
];
const ORGS = [
  { n: 'المعهد الوطني للموسيقى', f: 'music', area: 'عمّان', since: 1985, url: OPPS[0].url },
  { n: 'مكتبة درب المعرفة · شومان', f: 'lang', area: 'عمّان', since: 2013, url: OPPS[4].url },
  { n: 'متحف الأطفال الأردن', f: 'science', area: 'عمّان', since: 2007, url: OPPS[2].url },
  { n: 'مركز هيا الثقافي', f: 'arts', area: 'عمّان', since: 1976, url: OPPS[5].url },
  { n: 'الاتحاد الأردني لكرة القدم', f: 'sports', area: 'كل المحافظات', since: 2002, url: OPPS[3].url, note: 'مراكز البراعم منذ' },
  { n: 'مركز اليوبيل للتميز التربوي', f: 'science', area: 'عمّان', url: 'https://jubilee.edu.jo/first-lego-league' },
  { n: 'الاتحاد الملكي الأردني للشطرنج', f: 'mind', area: 'عمّان', url: 'https://www.joc.jo/en/news/4151/royal-chess-federation-honours-winners' },
  { n: 'المتحف الوطني للفنون الجميلة', f: 'arts', area: 'عمّان', url: OPPS[6].url },
];

const COMPS = [
  { id: 'k1', img: 'assets/photos/art.jpg', own: true, title: 'تحدي بصمة للرسم · موسم الشتاء', field: 'arts', status: 'open', ages: ['disc', 'dev'], deadline: '30 كانون الأول 2026',
    org: 'بصمة', prize: 'معرض رقمي للأعمال الفائزة وشهادات مشاركة', note: 'مسابقة نموذجية من بصمة لتجربة آلية المشاركة',
    rules: ['عمل واحد لكل طفل', 'العمل من إنتاج الطفل نفسه', 'يُرفع العمل كصورة واضحة', 'يمر العمل بمراجعة بصمة قبل اعتماده'] },
  { id: 'k2', img: 'assets/photos/library.jpg', title: '16 كتاباً قبل 16', field: 'lang', status: 'annual', ages: ['disc', 'dev', 'empower'], deadline: 'مسابقة سنوية — تابع إعلان الجهة',
    org: 'مكتبة درب المعرفة · مؤسسة عبد الحميد شومان', prize: 'تكريم الفائزين', ageText: 'من 7 إلى 11 سنة، ومن 12 إلى 16 سنة',
    rules: ['قراءة 16 كتاباً من فئات متنوعة قبل سن 16', 'إرسال ملخصات إلكترونية للكتب عبر رابط التسجيل الرسمي', 'مفتوحة للأردنيين والمقيمين في الأردن'],
    facts: [['2018', 'سنة الإطلاق'], ['21', 'متأهلاً في 2025'], ['6', 'فائزين في 2025']],
    url: 'https://shoman.org/en/Awards/16-before-16/About-the-Award' },
  { id: 'k3', img: 'assets/photos/robotics.jpg', title: 'المسابقة الوطنية للروبوت · FIRST LEGO League', field: 'science', status: 'annual', ages: ['dev', 'empower'], deadline: 'مسابقة سنوية — تابع إعلان الجهة',
    org: 'مركز اليوبيل للتميز التربوي · مؤسسة الملك الحسين', prize: 'التأهل للمنافسات الإقليمية والدولية',
    rules: ['فرق مدرسية أو مجتمعية', 'تصميم روبوت وبرمجته وفق قوانين FIRST LEGO League', 'عرض مشروع ابتكاري أمام لجنة التحكيم'],
    facts: [['2005', 'تُقام منذ'], ['17', 'دورة حتى 2022'], ['15+', 'عاماً من المسابقات']],
    url: 'https://jubilee.edu.jo/first-lego-league' },
  { id: 'k4', img: 'assets/photos/chess.jpg', title: 'بطولات المملكة للشطرنج حسب الفئات العمرية', field: 'mind', status: 'annual', ages: ['disc', 'dev', 'empower'], deadline: 'بطولات سنوية — تابع إعلان الاتحاد',
    org: 'الاتحاد الملكي الأردني للشطرنج', prize: 'ألقاب وطنية لكل فئة عمرية', ageText: 'فئات من تحت 8 حتى تحت 18 سنة',
    rules: ['بطولات فردية لكل فئة عمرية', 'أُقيمت بطولة 2025 لفئة تحت 12 بين 31 تموز و8 آب في عمّان', 'التسجيل عبر الاتحاد'],
    facts: [['100+', 'مشارك ومشاركة في بطولة الناشئين'], ['U8–U18', 'فئات عمرية']],
    url: 'https://www.joc.jo/en/news/4158/chess-championships-underway' },
  { id: 'k5', img: 'assets/photos/reading.jpg', title: 'تحدي القراءة العربي · الدورة العاشرة', field: 'lang', status: 'done', ages: ['disc', 'dev', 'empower'], deadline: 'اختُتمت في 23 حزيران 2026',
    org: 'وزارة التربية والتعليم', prize: 'تكريم أوائل المملكة', ageText: 'طلبة المدارس',
    rules: ['تُقام التصفيات عبر المدارس بإشراف مشرفين معتمدين'],
    facts: [['2.1M+', 'طالب وطالبة'], ['5,890', 'مدرسة'], ['8,000+', 'مشرف']],
    url: 'https://petra.gov.jo/en/news/education-ministry-celebrates-10th-arab-reading-challenge-winners-with-record-breaking-participation' },
];
const CRITERIA = [['المهارة والإتقان', 40], ['الإبداع والأصالة', 25], ['التطور والجهد', 20], ['التعبير والثقة', 15]];

// public profiles (only shown with guardian approval — display name + age group, no contact / school / exact location)
const PUBLIC = [
  { id: 'p1', name: 'سلمى', age: 9, field: 'lang', bg: '#FFF6DC', skills: ['إلقاء', 'قصص'], bio: 'أحب إلقاء الشعر وكتابة القصص القصيرة عن الحيوانات.', works: [['قصيدة "وطني"', 'microphone', 'video', '24621'], ['قصة الغيمة', 'book-open-text', 'image', '45564']] },
  { id: 'p2', name: 'عمر', age: 11, field: 'science', bg: '#E4EEFB', skills: ['روبوتات', 'برمجة'], bio: 'بنيت روبوتاً يتبع الخط وأحلم بصنع طائرة مسيّرة.', works: [['لوحة حساسات الروبوت', 'robot', 'video', '47051'], ['دائرة على أردوينو', 'lightbulb', 'image', 'assets/photos/lab.jpg']] },
  { id: 'p3', name: 'تالا', age: 8, field: 'arts', bg: '#F1E9FF', skills: ['رسم', 'أشغال يدوية'], bio: 'أرسم كل يوم، وأحب الألوان المائية.', works: [['غروب في العقبة', 'sun-horizon', 'image', '41602'], ['ألوان الأكريليك', 'palette', 'image', '41611']] },
  { id: 'p4', name: 'كريم', age: 13, field: 'sports', bg: '#E3F3EE', skills: ['كرة قدم'], bio: 'ألعب في خط الوسط وأتدرب ثلاث مرات أسبوعياً.', works: [['مهارات المراوغة', 'soccer-ball', 'video', '42541']] },
  { id: 'p5', name: 'جود', age: 15, field: 'music', bg: '#FFEFE3', skills: ['عزف', 'غناء'], bio: 'أعزف الغيتار منذ خمس سنوات وأحب الغناء.', works: [['معزوفة على الغيتار', 'guitar', 'video', '44161'], ['أغنية تراثية', 'microphone-stage', 'video', '44049']] },
  { id: 'p6', name: 'آدم', age: 7, field: 'mind', bg: '#ECEFF3', skills: ['شطرنج', 'ألغاز'], bio: 'فزت ببطولة الشطرنج في نادي الحي.', works: [['حل مكعب روبيك', 'puzzle-piece', 'video', '49325'], ['مباراة شطرنج سريعة', 'crown', 'video', '5339']] },
  { id: 'p7', name: 'لين', age: 4, field: 'arts', bg: '#F1E9FF', skills: ['رسم'], bio: 'يديرها ولي الأمر — رسومات لين الأولى.', works: [['رسمتي الأولى بالرصاص', 'pencil', 'image', '2858']] },
  { id: 'p8', name: 'يوسف', age: 12, field: 'lang', bg: '#FFF6DC', skills: ['كتابة', 'قراءة'], bio: 'قرأت 40 كتاباً هذه السنة وأكتب مدونة صغيرة.', works: [['كتبي المفضلة هذا الشهر', 'books', 'video', '50726'], ['مراجعة كتاب', 'books', 'image', '21587']] },
];
// real news from Jordan (with sources)
const NEWS = [
  ['2.1 مليون قارئ', 'شارك أكثر من 2.1 مليون طالب من 5,890 مدرسة أردنية في الدورة العاشرة من تحدي القراءة العربي.', 'بترا · حزيران 2026', COMPS[4].url],
  ['لقب عالمي في الروبوتات', 'فاز طلاب أردنيون بلقب عالمي في الروبوتات بمشروع زراعة ذكية يعتمد على الذكاء الاصطناعي.', 'بترا', 'https://petra.gov.jo/en/news/jordanian-students-win-global-robotics-title-with-ai-powered-smart-agriculture-project'],
  ['16 قبل 16', 'كرّمت مكتبة درب المعرفة 6 فائزين من بين 21 متأهلاً من محافظات مختلفة في مسابقة 2025.', 'مؤسسة شومان', 'https://shoman.org/en/Latest-News/ArticleID/4129/16-before-16-reading-competition-2025-winners-EN'],
];
const fcardInner = k => `<i class="ph-duotone ph-${FIELDS[k].e} fwm"></i><span class="e">${fic(k)}</span><b>${FIELDS[k].n}</b>`;
const countLabel = k => { const n = OPPS.filter(o => o.field === k).length + COMPS.filter(c => c.field === k && c.status !== 'done').length;
  return n === 0 ? 'قريباً' : n === 1 ? 'فرصة واحدة' : n === 2 ? 'فرصتان' : n + ' فرص'; };
const fits = (o, c) => o.field === c.field && c.age >= o.min && c.age <= o.max;
const fitKids = o => S.children.filter(c => fits(o, c));

// ---------------- state ----------------
const KEY = 'basmah-proto-v5';
const seed = () => ({
  onboarded: false,
  parent: null,
  children: [
    { id: 'c1', name: 'ليان', age: 8, field: 'music', bg: '#FFEFE3', skills: ['غناء', 'عزف'],
      bio: 'تحب الغناء وتتعلم البيانو منذ سنة.', visibility: 'public',
      consents: { profile: true, media: true, publish: true, partners: false },
      works: [
        { id: 'w1', title: 'أغنية "يا ليل"', type: 'video', e: 'microphone-stage', m: '2850', status: 'approved', date: '2 تشرين الثاني' },
        { id: 'w2', title: 'معزوفة بيانو قصيرة', type: 'video', e: 'piano-keys', m: '50330', status: 'approved', date: '20 تشرين الأول' },
        { id: 'w3', title: 'رسمة المسرح', type: 'image', e: 'mask-happy', m: '29984', status: 'pending', date: 'اليوم' },
      ],
      achievements: [['شهادة مشاركة · ورشة الصوت', 'تشرين الأول 2026', 'medal'], ['أداء في حفل المدرسة', 'حزيران 2026', 'music-notes']] },
    { id: 'c2', name: 'يزن', age: 12, field: 'science', bg: '#E4EEFB', skills: ['روبوتات', 'برمجة'],
      bio: 'يصمم روبوتات صغيرة ويبرمجها.', visibility: 'private',
      consents: { profile: true, media: true, publish: false, partners: true },
      works: [{ id: 'w4', title: 'دارة سيارة تتجنب العوائق', type: 'video', e: 'car-profile', m: '47049', status: 'approved', date: '8 تشرين الثاني' }],
      achievements: [['المركز الثاني · معرض العلوم المدرسي', 'أيار 2026', 'medal']] },
  ],
  requests: [],
  entries: [],
  reports: [],
  deletion: null,
  notifs: [
    { t: 'عمل "رسمة المسرح" قيد المراجعة', d: 'سنخبرك فور اعتماده أو إذا احتاج تعديلاً.', e: 'hourglass-medium', read: false },
    { t: 'فرصة تناسب ليان', d: 'التعليم الموسيقي للأطفال — المعهد الوطني للموسيقى', e: 'sparkle', read: false, go: 'opp:o1' },
    { t: 'تحدي بصمة للرسم مفتوح الآن', d: 'التقديم حتى 30 كانون الأول', e: 'trophy', read: true, go: 'comp:k1' },
  ],
  log: [['النظام', 'إنشاء الحساب التجريبي', 'قبل يومين']],
});
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch { S = seed(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };

// ---------------- router ----------------
let stack = [];
let route = S.onboarded ? { n: 'home' } : { n: 'welcome' };
let ui = {}; // per-screen transient state
let dir = '';
const go = (n, p = {}, opts = {}) => {
  dir = 'push';
  if (!opts.replace) stack.push(route);
  route = { n, ...p }; ui = opts.ui || {};
  render(true);
};
const back = () => { dir = 'back'; route = stack.pop() || { n: 'home' }; ui = {}; render(true); };
const tabTo = n => { dir = ''; stack = []; route = { n }; ui = {}; render(true); };

const $app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const kid = id => S.children.find(c => c.id === id);
const opp = id => OPPS.find(o => o.id === id);
const comp = id => COMPS.find(c => c.id === id);
const pendingCount = () => S.children.reduce((n, c) => n + c.works.filter(w => w.status === 'pending').length, 0);

// ---------------- shared pieces ----------------
const bell = () => `<button class="icon-btn" data-go="notifs" aria-label="الإشعارات">${ic('bell')}${S.notifs.some(n => !n.read) ? '<i class="badge-dot"></i>' : ''}</button>`;
// root tabs get an iOS-style large title; pushed screens get a compact nav bar
const bar = (title, sub = '', opts = {}) => opts.noBack ? `
  <header class="top large ${opts.cls || ''}">
    <div class="top-row"><div class="brand"><span class="brand-mark"><img src="assets/logo-gold.svg" alt=""></span><span>بصمة</span></div>${opts.right ?? bell()}</div>
    <h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ''}
  </header>` : `
  <header class="top ${opts.cls || ''}">
    <button class="icon-btn" data-action="back" aria-label="رجوع">${ic('back')}</button>
    <div class="nav-title"><b>${title}</b>${sub ? `<span>${sub}</span>` : ''}</div>
    <div class="nav-right">${opts.right ?? bell()}</div>
  </header>`;

const TABS = [['home', 'الرئيسية', 'home'], ['discover', 'اكتشف', 'search'], ['opps', 'الفرص', 'star'], ['comps', 'المسابقات', 'trophy'], ['account', 'حسابي', 'user']];
const tabbar = active => `<nav class="tabs">${TABS.map(([k, l, i]) =>
  `<button class="tab ${k === active ? 'on' : ''}" data-tab="${k}">${ic(i, '', k === active ? 'fill' : 'bold')}<span>${l}</span></button>`).join('')}</nav>`;

const statusTag = s => ({
  approved: `<span class="tag tag-green">${ic('check')} منشور</span>`,
  pending: `<span class="tag tag-gold">${ic('clock')} قيد المراجعة</span>`,
  rejected: `<span class="tag tag-red">يحتاج تعديل</span>`,
  private: `<span class="tag tag-gray">${ic('lock')} خاص</span>`,
}[s]);
const reqTag = s => ({
  review: '<span class="tag tag-gold">قيد المراجعة</span>',
  accepted: '<span class="tag tag-green">مقبول</span>',
  sent: '<span class="tag tag-purple">أُرسل للجهة</span>',
}[s]);

const fitTag = o => { const k = fitKids(o); return k.length ? `<span class="tag tag-green">${ic('check')} يناسب ${k.map(c => esc(c.name)).join(' و')}</span>` : ''; };

const oppCard = o => `
  <button class="opp-card" data-go="opp" data-id="${o.id}">
    <div class="band photo" style="background-image:url(${o.img})"><span class="tag">${o.kind}</span></div>
    <div class="in"><b>${o.title}</b>
      <div class="small muted">${o.org}</div>
      <div style="margin-top:8px">${fitTag(o) || `<span class="small muted">${o.area.split(' · ')[0]}</span>`}</div>
    </div>
  </button>`;

const oppRow = o => `
  <button class="list-item" data-go="opp" data-id="${o.id}">
    <div class="thumb photo" style="background-image:url(${o.img})"><span class="fbadge" style="color:${FIELDS[o.field].fg}">${fic(o.field)}</span></div>
    <div class="grow"><b>${o.title}</b>
      <div class="small muted">${o.org} · ${o.area.split(' · ')[0]}</div>
      <div class="row small" style="gap:6px;margin-top:6px;flex-wrap:wrap"><span class="tag tag-purple">${o.kind}</span>${fitTag(o)}</div>
    </div>${ic('chev', 'style="color:#B9B4A6;font-size:18px"')}
  </button>`;

const extLink = (url, label = 'زيارة موقع الجهة') => `<a class="btn btn-ghost" href="${url}" target="_blank" rel="noopener">${ic('arrow-square-out')} ${label}</a>`;

// what should the parent do next? first unfinished step wins
const nextStep = () => {
  const kids = S.children, works = kids.flatMap(c => c.works);
  const steps = [
    { done: kids.length > 0, t: 'أضف ملف طفلك', d: 'العمر والمجال والمهارات — دقيقة واحدة.', go: 'addChild', cta: 'إضافة طفل', i: 'user-plus' },
    { done: works.length > 0, t: 'ارفع أول عمل', d: 'فيديو أو صورة أو نص، ويُراجع قبل النشر.', go: 'upload', cta: 'رفع موهبة', i: 'upload-simple' },
    { done: works.some(w => w.status === 'approved'), t: 'انتظر مراجعة بصمة', d: 'نتحقق من الملاءمة والسلامة ثم نُعلمك.', go: 'notifs', cta: 'الإشعارات', i: 'hourglass-medium' },
    { done: S.requests.length > 0, t: 'اختر فرصة مناسبة', d: 'برامج وجهات أردنية تناسب عمر طفلك ومجاله.', tab: 'opps', cta: 'تصفح الفرص', i: 'compass' },
  ];
  return { steps, n: steps.filter(s => s.done).length, cur: steps.find(s => !s.done) };
};

const QUICK = [['upload', 'رفع موهبة', 'upload-simple', '#2F6FCF', '#E4EEFB'], ['addChild', 'إضافة طفل', 'user-plus', '#D9682B', '#FFEFE3'], ['opps', 'الفرص', 'compass', '#2F8F72', '#E3F3EE'], ['comps', 'المسابقات', 'trophy', '#A47A0B', '#FFF6DC']];

// ---------------- media (works) ----------------
const DUR = { 24621: '0:08', 50330: '0:11', 2850: '0:10', 42541: '0:15', 44049: '0:13', 44161: '0:13', 47049: '0:13', 47051: '0:10', 49325: '0:14', 50726: '0:09', 5339: '0:12' };
const BLOBS = {}; // files picked in the upload screen — kept in memory for this session only
const mPath = (m, ext) => m.includes('/') ? m : `assets/media/${m}.${ext}`;
const mSrc = w => BLOBS[w.id]?.url || (w.m ? mPath(w.m, w.type === 'video' ? 'mp4' : 'jpg') : '');
const mPoster = w => BLOBS[w.id] ? (BLOBS[w.id].kind === 'image' ? BLOBS[w.id].url : '') : w.m ? mPath(w.m, 'jpg') : '';
const workPic = (w, fg, bg, extra = '') => {
  const src = mSrc(w), poster = mPoster(w), vid = w.type === 'video';
  if (!src) return `<div class="pic" style="background:${bg}">${di(w.e, fg)}${vid ? `<span class="play">${ic('play', '', 'fill')}</span>` : ''}${extra}</div>`;
  return `<div class="pic media" data-action="view" data-src="${src}" data-type="${vid && BLOBS[w.id]?.kind !== 'image' ? 'video' : 'image'}" data-title="${esc(w.title)}" data-poster="${poster}" style="background-color:${bg}${poster ? `;background-image:url('${poster}')` : ''}">
    ${!poster && vid ? `<video src="${src}" muted playsinline preload="metadata"></video>` : ''}
    ${vid ? `<span class="play">${ic('play', '', 'fill')}</span>${DUR[w.m] ? `<span class="dur">${DUR[w.m]}</span>` : ''}` : `<span class="play img">${ic('arrows-out-simple')}</span>`}${extra}</div>`;
};
function openViewer({ src, type, title, poster }) {
  const v = document.createElement('div');
  v.className = 'viewer';
  v.innerHTML = `<div class="v-top"><button class="v-close" aria-label="إغلاق">${ic('x')}</button><b>${esc(title)}</b></div>
    <div class="v-body">${type === 'video' ? `<video src="${src}" ${poster ? `poster="${poster}"` : ''} controls autoplay playsinline loop></video>` : `<img src="${src}" alt="">`}</div>
    <div class="v-foot">${ic('shield-check')} عمل معتمد بعد مراجعة فريق بصمة · لا يُسمح بالتنزيل أو المراسلة</div>`;
  if (isEN()) translateDOM(v);
  v.addEventListener('click', e => { if (e.target === v || e.target.closest('.v-close')) v.remove(); });
  $app.appendChild(v);
}
const sheet = html => `<div class="sheet-bg" data-action="close-sheet"><div class="sheet" data-stop>${'<div class="grab"></div>' + html}</div></div>`;

let toastTimer;
function toast(msg) {
  document.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = ic('check') + `<span>${isEN() ? tr(msg) : msg}</span>`;
  $app.appendChild(t);
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.remove(), 2600);
}

// ---------------- screens ----------------
const SCREENS = {};

SCREENS.welcome = () => {
  const slides = [
    { img: true, h: 'لكل طفل ما يميّزه', p: 'بصمة منصة عربية لاكتشاف مواهب الأطفال وتنميتها وربطها بفرص حقيقية.' },
    { e: 'compass', h: 'رحلة كاملة، لا مجرد أصوات', p: 'اكتشاف الموهبة، ملف خاص بها، توجيه من مختصين، ثم برامج وأكاديميات ومسابقات مناسبة.' },
    { e: 'shield-check', h: 'ولي الأمر يتحكم بكل شيء', p: 'الحساب لولي الأمر، والموافقات منفصلة، وكل محتوى يُراجع قبل نشره. لا رسائل خاصة مع الطفل ولا عناوين أو أرقام ظاهرة.' },
  ];
  const i = ui.slide || 0, s = slides[i];
  return `<div class="onb screen-in">
    <div class="onb-top">${langPill()}</div>
    <div class="onb-mid" data-k="${i}">
      ${s.img ? `<img class="logo" src="assets/logo.svg" alt=""><img class="wm" src="assets/wordmark.svg" alt="بصمة">` : `<div class="big-e">${di(s.e)}</div>`}
      <h2>${s.h}</h2><p>${s.p}</p>
    </div>
    <div class="dots">${slides.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
    ${i < slides.length - 1
      ? `<button class="btn btn-gold" data-action="slide">التالي</button>`
      : `<button class="btn btn-gold" data-go="register">إنشاء حساب ولي الأمر</button>`}
    <button class="link" data-action="demo">تصفح ببيانات تجريبية</button>
  </div>`;
};

SCREENS.register = () => {
  const f = ui.f || (ui.f = { name: '', phone: '', email: '', c1: false, c2: false, c3: false });
  const ok = f.name.trim() && f.phone.trim() && f.c1 && f.c2;
  return `${bar('حساب ولي الأمر', 'الخطوة 1 من 2', { right: '' })}
  <div class="scroll screen-in">
    <div class="steps-bar"><i class="on"></i><i></i></div>
    <div class="notice info">${ic('shield')}<div>حساب المنصة يكون لولي الأمر فقط، وهو من يدير ملفات الأطفال والموافقات.</div></div>
    <div class="field"><label>الاسم الكامل</label><input data-bind="name" value="${esc(f.name)}" placeholder="مثال: سارة أحمد"></div>
    <div class="field"><label>رقم الهاتف</label><input data-bind="phone" value="${esc(f.phone)}" inputmode="tel" placeholder="07X XXX XXXX" dir="ltr" style="text-align:right">
      <div class="hint">لن يظهر رقمك لأي جهة أو مستخدم آخر.</div></div>
    <div class="field"><label>البريد الإلكتروني (اختياري)</label><input data-bind="email" value="${esc(f.email)}" inputmode="email" dir="ltr" style="text-align:right"></div>
    <div class="card" style="padding:4px 14px">
      <label class="check"><input type="checkbox" data-bind="c1" ${f.c1 ? 'checked' : ''}><i class="box"></i><div><b>أقر بأنني ولي الأمر أو الوصي القانوني</b><span class="d">على الأطفال الذين سأضيف ملفاتهم.</span></div></label>
      <label class="check"><input type="checkbox" data-bind="c2" ${f.c2 ? 'checked' : ''}><i class="box"></i><div><b>أوافق على الشروط وسياسة الخصوصية</b><span class="d">وفق قانون حماية البيانات الشخصية الأردني رقم 24 لسنة 2023.</span></div></label>
      <label class="check"><input type="checkbox" data-bind="c3" ${f.c3 ? 'checked' : ''}><i class="box"></i><div><b>أرغب باستلام الفرص المناسبة</b><span class="d">اختياري — يمكنك تغييره لاحقاً.</span></div></label>
    </div>
    <button class="btn btn-navy" data-action="register" ${ok ? '' : 'disabled'}>متابعة</button>
  </div>`;
};

SCREENS.home = () => {
  const name = S.parent?.name?.split(' ')[0] || 'بك';
  const p = pendingCount(), ns = nextStep();
  const matched = OPPS.filter(o => fitKids(o).length);
  return `${bar(`أهلاً ${esc(name)}`, 'ماذا تريد أن تفعل اليوم؟', { noBack: true })}
  <div class="scroll screen-in">
    ${ns.cur ? `<div class="guide">
      <div class="row"><div class="grow"><span class="guide-k">خطوتك التالية · ${ns.n} من ${ns.steps.length}</span><b>${ns.cur.t}</b><span class="small muted">${ns.cur.d}</span></div>
        <div class="guide-i">${di(ns.cur.i)}</div></div>
      <div class="guide-bar">${ns.steps.map(s => `<i class="${s.done ? 'on' : ''}"></i>`).join('')}</div>
      <button class="btn btn-navy" ${ns.cur.tab ? `data-tab="${ns.cur.tab}"` : `data-go="${ns.cur.go}"`}>${ns.cur.cta}</button>
    </div>` : `<div class="hero"><h3>كل الخطوات مكتملة</h3><p>تابع تطور أطفالك واكتشف فرصاً جديدة كل أسبوع.</p><button class="btn btn-gold" data-tab="opps">${ic('compass')} فرص جديدة</button></div>`}

    <div class="quick">${QUICK.map(([k, l, i, fg, bg]) => `<button ${['opps', 'comps'].includes(k) ? `data-tab="${k}"` : `data-go="${k}"`}><span style="background:${bg};color:${fg}">${di(i)}</span>${l}</button>`).join('')}</div>

    <button class="quiz-banner" data-go="quiz"><div class="grow"><b>لا تعرف موهبة طفلك بعد؟</b><span>5 أسئلة قصيرة تقترح مجالات تناسبه</span></div><span class="qb-i">${di('sparkle')}</span></button>
    ${p ? `<button class="notice warn" style="width:100%" data-go="child" data-id="${S.children.find(c => c.works.some(w => w.status === 'pending'))?.id}">${ic('clock')}<div class="grow"><b>${p} ${p === 1 ? 'عمل' : 'أعمال'} قيد المراجعة</b><br>سنرسل لك إشعاراً فور اعتماده.</div>${ic('chev')}</button>` : ''}

    <div class="sec-h"><h3>أطفالي</h3><button data-tab="account">إدارة</button></div>
    <div class="hscroll">
      ${S.children.map(c => `<button class="kid-pill" data-go="child" data-id="${c.id}">
        ${av(c)}<b>${esc(c.name)}</b><span class="small muted">${c.age} سنوات · ${FIELDS[c.field].n}</span>
        ${c.visibility === 'public' ? '<span class="tag tag-green">ملف عام</span>' : '<span class="tag tag-gray">ملف خاص</span>'}</button>`).join('')}
      <button class="kid-add" data-go="addChild">${ic('plus')}إضافة طفل</button>
    </div>

    ${matched.length ? `<div class="sec-h"><h3>فرص تناسب أطفالك</h3><button data-tab="opps">عرض الكل</button></div>
    <div class="hscroll">${matched.map(oppCard).join('')}</div>` : ''}

    <div class="sec-h"><h3>مجالات المواهب</h3><button data-tab="discover">اكتشف</button></div>
    <div class="fields-grid">${Object.entries(FIELDS).map(([k, f]) =>
      `<button class="fcard" style="--c:${f.fg}" data-go="discover" data-field="${k}">${fcardInner(k)}<small>${countLabel(k)}</small></button>`).join('')}</div>

    <div class="sec-h"><h3>أعمال مميزة</h3><button data-tab="discover">كل المواهب</button></div>
    <div class="hscroll reels">${PUBLIC.flatMap(p => p.works.filter(w => w[2] === 'video').slice(0, 1).map(([title, , , m]) => `<div class="reel" data-action="view" data-src="${mPath(m, 'mp4')}" data-type="video" data-title="${title}" data-poster="${mPath(m, 'jpg')}" style="background-image:url('${mPath(m, 'jpg')}')">
      <span class="play">${ic('play', '', 'fill')}</span><span class="dur">${DUR[m] || ''}</span>
      <div class="reel-cap"><b>${title}</b><button data-go="public" data-id="${p.id}">${fic(p.field)} ${p.name} · ${p.age} سنوات</button></div></div>`)).join('')}</div>

    <div class="sec-h"><h3>من الأردن</h3></div>
    <div class="hscroll">${NEWS.map(([h, d, src, url]) => `<a class="story" href="${url}" target="_blank" rel="noopener"><b>${di('newspaper', '#163463')} ${h}</b>${d}<span class="src">${ic('arrow-square-out')} ${src}</span></a>`).join('')}</div>
  </div>${tabbar('home')}`;
};

SCREENS.discover = () => {
  const f = route.field || ui.field || 'all', a = ui.age || 'all', q = (ui.q || '').trim();
  const list = PUBLIC.filter(p => (f === 'all' || p.field === f) && (a === 'all' || ageGroup(p.age).k === a)
    && (!q || (p.name + p.skills.join(' ') + FIELDS[p.field].n).includes(q)));
  return `${bar('اكتشف المواهب', 'ملفات توضيحية · تُنشر بموافقة أولياء الأمور فقط', { noBack: true })}
  <div class="scroll screen-in">
    <div class="field" style="margin-bottom:12px"><div class="search">${ic('search')}<input type="search" data-bind-ui="q" value="${esc(ui.q || '')}" placeholder="ابحث بمهارة أو مجال…"></div></div>
    <div class="hscroll" style="padding-bottom:4px"><button class="chip ${f === 'all' ? 'on' : ''}" data-ui="field" data-v="all">كل المجالات</button>
      ${Object.entries(FIELDS).map(([k, x]) => `<button class="chip ${f === k ? 'on' : ''}" data-ui="field" data-v="${k}">${fic(k)} ${x.n}</button>`).join('')}</div>
    <div class="hscroll" style="padding-top:6px"><button class="chip ${a === 'all' ? 'on' : ''}" data-ui="age" data-v="all">كل الأعمار</button>
      ${AGES.map(g => `<button class="chip ${a === g.k ? 'on' : ''}" data-ui="age" data-v="${g.k}">${g.n} · ${g.r}</button>`).join('')}</div>
    <div class="notice safe" style="margin-top:6px">${ic('shield')}<div>نعرض اسم العرض والعمر والمجال فقط — لا أرقام هواتف ولا عناوين ولا أسماء مدارس.</div></div>
    ${list.length ? list.map(p => `<button class="list-item" data-go="public" data-id="${p.id}">
      ${av(p)}
      <div class="grow"><b>${p.name} · ${p.age} سنوات</b><div class="small muted">${fic(p.field)} ${FIELDS[p.field].n}</div>
      <div class="row small" style="gap:5px;margin-top:5px;flex-wrap:wrap">${p.skills.map(s => `<span class="tag tag-purple">${s}</span>`).join('')}<span class="tag tag-gray">${ageGroup(p.age).n}</span></div></div>
      ${ic('chev', 'style="color:#B9B4A6;font-size:18px"')}</button>`).join('')
      : `<div class="empty"><span class="e">${di('magnifying-glass')}</span>لا توجد ملفات مطابقة بعد</div>`}
  </div>${tabbar('discover')}`;
};

SCREENS.public = () => {
  const p = PUBLIC.find(x => x.id === route.id);
  return `${bar(p.name, FIELDS[p.field].n)}
  <div class="scroll screen-in">
    <div class="profile-card"><div class="cover" style="--c:${FIELDS[p.field].fg}"></div>
      <div class="prof-head">${av(p, 'lg')}
      <h3>${p.name}</h3><div class="meta">${p.age} سنوات · ${ageGroup(p.age).n} · ${FIELDS[p.field].n}</div>
      <div class="chips" style="justify-content:center;margin-top:12px">${p.skills.map(s => `<span class="tag tag-purple">${s}</span>`).join('')}</div></div></div>
    <div class="card"><b>نبذة عن الموهبة</b><p class="muted" style="margin:6px 0 0;line-height:1.8">${p.bio}</p></div>
    <div class="sec-h"><h3>أعمال مختارة</h3></div>
    <div class="works">${p.works.map(([title, e, type, m], i) => `<div class="work">${workPic({ id: p.id + i, title, e, type, m }, FIELDS[p.field].fg, p.bg)}<div class="cap">${title}<div class="small muted" style="font-weight:400">${type === 'video' ? 'فيديو' : 'صورة'}</div></div></div>`).join('')}</div>
    <div class="notice info" style="margin-top:16px">${ic('lock')}<div>لا يمكن مراسلة الطفل. الجهات الشريكة تتواصل مع ولي الأمر فقط عبر طلبات الفرص.</div></div>
    <button class="btn btn-ghost" data-action="report" data-id="${p.id}">${ic('flag')} الإبلاغ عن محتوى أو حساب</button>
  </div>
  ${ui.sheet === 'report' ? sheet(`<h3>الإبلاغ عن محتوى</h3><p class="muted small">سيراجع فريق بصمة البلاغ خلال 24 ساعة. هوية المُبلّغ لا تظهر لصاحب الملف.</p>
    ${['محتوى غير مناسب لعمر الطفل', 'معلومات شخصية ظاهرة', 'انتحال هوية أو محتوى ليس للطفل', 'سبب آخر'].map((r, i) =>
      `<button class="radio-row ${ui.reason === i ? 'on' : ''}" data-ui="reason" data-v="${i}" data-num>${r}</button>`).join('')}
    <button class="btn btn-navy" style="margin-top:8px" data-action="send-report" ${ui.reason === undefined ? 'disabled' : ''}>إرسال البلاغ</button>`) : ''}`;
};

SCREENS.child = () => {
  const c = kid(route.id); if (!c) return SCREENS.home();
  const tab = ui.tab || 'works', g = ageGroup(c.age);
  const approved = c.works.filter(w => w.status === 'approved').length;
  const step = approved ? (S.requests.some(r => r.child === c.id) ? 7 : 5) : c.works.length ? 4 : 2;
  return `${bar(esc(c.name), 'ملف الموهبة', { right: `<button class="icon-btn" data-go="privacy" data-id="${c.id}" aria-label="الخصوصية">${ic('settings')}</button>` })}
  <div class="scroll screen-in">
    <div class="profile-card"><div class="cover" style="--c:${FIELDS[c.field].fg}"></div>
      <div class="prof-head">${av(c, 'lg')}
      <h3>${esc(c.name)}</h3><div class="meta">${c.age} سنوات · فئة ${g.n} · ${FIELDS[c.field].n}</div>
      <div style="margin-top:10px">${c.visibility === 'public' ? `<span class="tag tag-green">${ic('eye')} ملف عام</span>` : `<span class="tag tag-gray">${ic('lock')} ملف خاص · لا يظهر في الاكتشاف</span>`}</div></div>
      <div class="stats"><div><b>${c.works.length}</b><span>أعمال</span></div><div><b>${c.achievements.length}</b><span>إنجازات</span></div><div><b>${S.requests.filter(r => r.child === c.id).length}</b><span>طلبات فرص</span></div></div></div>
    <div class="card"><b>نبذة</b><p class="muted" style="margin:6px 0 10px;line-height:1.8">${esc(c.bio || 'لم تُضف نبذة بعد.')}</p>
      <div class="chips">${c.skills.map(s => `<span class="tag tag-purple">${esc(s)}</span>`).join('')}</div></div>
    <button class="list-item" data-go="growth" data-id="${c.id}"><div class="thumb" style="background:var(--green-soft);color:var(--green)">${di('chart-line-up')}</div><div class="grow"><b>سجل التطور</b><div class="small muted">المهارات والإنجازات على خط زمني</div></div>${ic('chev', 'data-chev')}</button>
    <div class="seg">${[['works', 'الأعمال'], ['ach', 'الإنجازات'], ['journey', 'الرحلة']].map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-ui="tab" data-v="${k}">${l}</button>`).join('')}</div>
    ${tab === 'works' ? `
      ${c.works.length ? '' : `<div class="empty card">${di('film-strip', FIELDS[c.field].fg)}<b>لا أعمال بعد</b>ارفع أول عمل لـ ${esc(c.name)} — سيُراجع قبل النشر.</div>`}
      <div class="works">${c.works.map(w => `<div class="work">${workPic(w, FIELDS[c.field].fg, c.bg, statusTag(w.status))}<div class="cap">${esc(w.title)}<div class="small muted" style="font-weight:400">${w.date}</div></div></div>`).join('')}</div>
      <button class="btn btn-gold" style="margin-top:14px" data-go="upload" data-id="${c.id}">${ic('upload')} رفع عمل جديد</button>`
    : tab === 'ach' ? `<div class="card">${c.achievements.length ? c.achievements.map(([t, d, e]) => `<div class="ach"><div class="medal">${di(e, '#A9861C')}</div><div><b>${esc(t)}</b><div class="small muted">${d}</div></div></div>`).join('') : `<div class="empty">${di('medal', '#A9861C')}<b>لا إنجازات بعد</b>تُضاف الشهادات والمشاركات هنا مع الوقت.</div>`}</div>`
    : `<div class="card journey">${JOURNEY.map(([t, d], i) => `<div class="jstep ${i + 1 < step ? 'done' : i + 1 === step ? 'now' : ''}"><span class="n">${i + 1 < step ? ic('check') : i + 1}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>`}
    <div class="sec-h"><h3>فرص تناسب ${esc(c.name)}</h3></div>
    ${OPPS.filter(o => o.field === c.field).map(oppRow).join('') || `<div class="empty small">سنقترح فرصاً حين تتوفر في هذا المجال</div>`}
  </div>`;
};

SCREENS.addChild = () => {
  const f = ui.f || (ui.f = { name: '', age: 7, field: route.field || '', skills: [], bio: '', profile: false, media: false, publish: false, partners: false });
  const st = ui.step || 1;
  const can = st === 1 ? f.name.trim() && f.age : st === 2 ? f.field && f.skills.length : f.profile;
  return `${bar('إضافة ملف طفل', `الخطوة ${st} من 3`, { right: '' })}
  <div class="scroll screen-in">
    <div class="steps-bar">${[1, 2, 3].map(i => `<i class="${i <= st ? 'on' : ''}"></i>`).join('')}</div>
    ${st === 1 ? `
      <div class="field"><label>اسم العرض</label><input data-bind="name" value="${esc(f.name)}" placeholder="الاسم الأول فقط مثلاً">
        <div class="hint">ننصح باستخدام الاسم الأول فقط — لا يظهر الاسم الكامل للعامة.</div></div>
      <div class="field"><label>العمر: <span id="age-lbl" style="color:var(--navy-2)">${f.age} سنوات</span></label>
        <input type="range" min="3" max="17" value="${f.age}" data-bind="age" style="padding:0;accent-color:var(--gold)"></div>
      <div class="card"><div class="row"><span class="tag tag-gold">${ageGroup(f.age).n} · ${ageGroup(f.age).r}</span></div>
        <p class="small muted" style="margin:8px 0 0">${ageGroup(f.age).d}</p>
        ${f.age <= 5 ? `<div class="notice warn" style="margin:10px 0 0">${ic('shield')}<div>الأطفال الأصغر سناً يحتاجون ضوابط عرض أشد — الملف سيكون خاصاً افتراضياً.</div></div>` : ''}</div>`
    : st === 2 ? `
      <label style="font-weight:700;font-size:14px">المجال الرئيسي</label>
      <div class="fields-grid" style="margin:8px 0 18px">${Object.entries(FIELDS).map(([k, x]) => `<button class="fcard ${f.field === k ? 'on' : ''}" style="--c:${x.fg}" data-fset="${k}">${fcardInner(k)}</button>`).join('')}</div>
      ${f.field ? `<label style="font-weight:700;font-size:14px">المهارات</label><div class="chips" style="margin:8px 0 16px">${FIELDS[f.field].skills.map(s => `<button class="chip ${f.skills.includes(s) ? 'on' : ''}" data-skill="${s}">${s}</button>`).join('')}</div>
      <div class="field"><label>نبذة قصيرة (اختياري)</label><textarea rows="3" data-bind="bio" placeholder="ماذا يحب طفلك أن يفعل؟">${esc(f.bio)}</textarea></div>` : ''}`
    : `
      <div class="notice info">${ic('shield')}<div>كل موافقة منفصلة، ويمكنك سحبها في أي وقت من إعدادات الخصوصية.</div></div>
      <div class="card" style="padding:4px 14px">
        ${[['profile', 'إنشاء ملف موهبة للطفل', 'مطلوبة لإنشاء الملف.'], ['media', 'رفع الصور والفيديوهات', 'للمراجعة من فريق بصمة قبل أي نشر.'], ['publish', 'النشر العام في صفحة الاكتشاف', 'يظهر اسم العرض والعمر والمجال فقط.'], ['partners', 'مشاركة الملف مع الجهات الشريكة', 'عند تقديمك على فرصة فقط، ولكل طلب على حدة.']]
          .map(([k, t, d]) => `<label class="check"><input type="checkbox" data-bind="${k}" ${f[k] ? 'checked' : ''} ${k === 'publish' && f.age <= 5 ? 'disabled' : ''}><i class="box"></i><div><b>${t}</b><span class="d">${k === 'publish' && f.age <= 5 ? 'غير متاح لفئة البراعم في النسخة الأولى.' : d}</span></div></label>`).join('')}
      </div>`}
    <button class="btn btn-navy" data-action="child-next" ${can ? '' : 'disabled'}>${st < 3 ? 'التالي' : 'إنشاء الملف'}</button>
    ${st > 1 ? `<button class="btn btn-ghost" data-action="child-prev">السابق</button>` : ''}
  </div>`;
};

SCREENS.upload = () => {
  const f = ui.f || (ui.f = { child: route.id || S.children[0]?.id, type: 'video', title: '', file: '' });
  if (ui.done) return `${bar('رفع موهبة', '', { right: '' })}<div class="scroll screen-in"><div class="success">
    <div class="ring">${ic('clock')}</div><h3>تم الرفع — بانتظار المراجعة</h3>
    <p>سيبقى العمل <b>غير منشور</b> حتى يتحقق فريق بصمة من ملاءمته وسلامته. سنرسل لك إشعاراً بالنتيجة.</p>
    <button class="btn btn-navy" data-go="child" data-id="${f.child}" data-replace>عرض ملف ${esc(kid(f.child)?.name)}</button>
    <button class="btn btn-ghost" data-go="admin" data-replace>تجربة: افتح لوحة الإدارة واعتمده</button></div></div>`;
  const c = kid(f.child);
  const noMedia = c && !c.consents.media;
  const ok = c && f.title.trim() && f.file && !noMedia;
  return `${bar('رفع موهبة', '', { right: '' })}
  <div class="scroll screen-in">
    <label style="font-weight:700;font-size:14px">لمن هذا العمل؟</label>
    <div class="chips" style="margin:8px 0 16px">${S.children.map(k => `<button class="chip ${f.child === k.id ? 'on' : ''}" data-fchild="${k.id}">${mini(k)} ${esc(k.name)}</button>`).join('')}
      <button class="chip" data-go="addChild">${ic('plus', 'style="font-size:14px"')} طفل جديد</button></div>
    ${noMedia ? `<div class="notice warn">${ic('lock')}<div>لم تمنح موافقة رفع الصور والفيديوهات لـ ${esc(c.name)}. <button style="text-decoration:underline;font-weight:700" data-go="privacy" data-id="${c.id}">تعديل الموافقات</button></div></div>` : ''}
    <label style="font-weight:700;font-size:14px">نوع العمل</label>
    <div class="seg">${[['video', di('film-strip') + ' فيديو'], ['image', di('image') + ' صورة'], ['doc', di('note-pencil') + ' نص']].map(([k, l]) => `<button class="${f.type === k ? 'on' : ''}" data-ftype="${k}">${l}</button>`).join('')}</div>
    <label class="drop ${f.file ? 'has' : ''}">${f.file ? ic('check') : ic('upload')}
      <b>${f.file ? esc(f.file) : 'اختر ملفاً من جهازك'}</b><span class="small muted">${f.type === 'video' ? 'حتى 3 دقائق' : f.type === 'image' ? 'JPG أو PNG' : 'PDF أو صورة للنص'}</span>
      <input type="file" data-file accept="${f.type === 'video' ? 'video/*' : f.type === 'image' ? 'image/*' : '.pdf,image/*'}"></label>
    <div class="field" style="margin-top:14px"><label>عنوان العمل</label><input data-bind="title" value="${esc(f.title)}" placeholder="مثال: أغنية عن الوطن"></div>
    <div class="notice safe">${ic('shield')}<div>قبل الرفع تأكد أن الفيديو لا يُظهر اسم المدرسة أو عنوان المنزل أو الزي المدرسي أو أي معلومات شخصية.</div></div>
    <button class="btn btn-gold" data-action="upload" ${ok ? '' : 'disabled'}>${ic('upload')} إرسال للمراجعة</button>
  </div>`;
};

SCREENS.privacy = () => {
  const c = kid(route.id); if (!c) return SCREENS.account();
  const row = (k, t, d) => `<div class="check" style="align-items:center"><div class="grow"><b>${t}</b><span class="d">${d}</span></div>
    <label class="switch"><input type="checkbox" data-consent="${k}" ${c.consents[k] ? 'checked' : ''}><i></i></label></div>`;
  return `${bar('الخصوصية والموافقات', esc(c.name), { right: '' })}
  <div class="scroll screen-in">
    <div class="card"><div class="row"><div class="grow"><b>ظهور الملف</b><div class="small muted">${c.visibility === 'public' ? 'يظهر في صفحة الاكتشاف' : 'لا يراه إلا أنت وفريق المراجعة'}</div></div></div>
      <div class="seg" style="margin:12px 0 0">${[['public', ic('globe') + ' عام'], ['private', ic('lock') + ' خاص']].map(([k, l]) => `<button class="${c.visibility === k ? 'on' : ''}" data-vis="${k}">${l}</button>`).join('')}</div></div>
    <div class="card" style="padding:4px 14px">
      ${row('profile', 'ملف الموهبة', 'سحبها يعني إيقاف الملف وطلب حذفه')}
      ${row('media', 'رفع الصور والفيديوهات', 'تمر بمراجعة قبل النشر')}
      ${row('publish', 'النشر العام', 'اسم العرض والعمر والمجال فقط')}
      ${row('partners', 'المشاركة مع الجهات الشريكة', 'مطلوبة للتقديم على الفرص')}
    </div>
    <div class="card"><b>ما الذي لا يظهر أبداً للعامة؟</b>
      <div class="chips" style="margin-top:10px">${['رقم الهاتف', 'العنوان', 'اسم المدرسة', 'الموقع الدقيق', 'الاسم الكامل'].map(s => `<span class="tag tag-gray">${ic('lock')} ${s}</span>`).join('')}</div></div>
    <button class="btn btn-ghost" data-action="export">${ic('doc')} طلب نسخة من بيانات ${esc(c.name)}</button>
    <button class="btn btn-danger" data-action="delete-child" data-id="${c.id}">${ic('trash')} طلب حذف ملف ${esc(c.name)}</button>
  </div>
  ${ui.sheet === 'del' ? sheet(`<h3>حذف ملف ${esc(c.name)}؟</h3><p class="muted" style="line-height:1.8">سيُخفى الملف فوراً، وتُحذف الأعمال والبيانات خلال المدة المحددة في سياسة الاحتفاظ بالبيانات وفق القانون.</p>
    <button class="btn btn-danger" data-action="confirm-del" data-id="${c.id}">نعم، احذف الملف</button><button class="btn btn-ghost" data-action="close-sheet">إلغاء</button>`) : ''}`;
};

SCREENS.opps = () => {
  const t = ui.t || 'all', f = ui.field || 'all', q = (ui.q || '').trim();
  const list = OPPS.filter(o => (f === 'all' || o.field === f) && (t !== 'match' || fitKids(o).length)
    && (!q || (o.title + o.org + o.area + FIELDS[o.field].n).includes(q)));
  return `${bar('الفرص', 'برامج وورش من جهات أردنية', { noBack: true })}
  <div class="scroll screen-in">
    <div class="field" style="margin-bottom:12px"><div class="search">${ic('search')}<input type="search" data-bind-ui="q" value="${esc(ui.q || '')}" placeholder="ابحث باسم برنامج أو جهة أو مدينة"></div></div>
    <div class="seg">${[['all', 'كل الفرص'], ['match', 'تناسب أطفالي'], ['orgs', 'الجهات']].map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-ui="t" data-v="${k}">${l}</button>`).join('')}</div>
    ${t === 'orgs' ? ORGS.map(a => `<a class="list-item" href="${a.url}" target="_blank" rel="noopener"><div class="thumb" style="background:${FIELDS[a.f].bg}">${fic(a.f)}</div>
        <div class="grow"><b>${a.n}</b><div class="small muted">${FIELDS[a.f].n} · ${a.area}${a.since ? ` · ${a.note || 'منذ'} ${a.since}` : ''}</div></div>${ic('arrow-square-out', 'style="color:#B9B4A6;font-size:18px"')}</a>`).join('')
        + `<p class="small muted" style="text-align:center;line-height:1.7">جهات أردنية حقيقية · الروابط تفتح مواقعها الرسمية أو مصادر منشورة.<br>بصمة لا ترتبط بشراكة معها حالياً.</p>`
      : `<div class="hscroll" style="padding-bottom:10px"><button class="chip ${f === 'all' ? 'on' : ''}" data-ui="field" data-v="all">كل المجالات</button>
        ${Object.entries(FIELDS).map(([k, x]) => `<button class="chip ${f === k ? 'on' : ''}" data-ui="field" data-v="${k}">${fic(k)} ${x.n}</button>`).join('')}</div>
        ${list.map(oppRow).join('') || `<div class="empty">${di('magnifying-glass')}<b>لا نتائج</b>جرّب مجالاً آخر أو امسح البحث.<br><button class="chip" style="margin-top:12px" data-action="clear-filters">مسح الفلاتر</button></div>`}`}
  </div>${tabbar('opps')}`;
};

SCREENS.opp = () => {
  const o = opp(route.id);
  const applied = S.requests.filter(r => r.opp === o.id).map(r => r.child);
  const fit = fitKids(o);
  const isSaved = (S.saved || []).includes(o.id);
  return `${bar(o.kind, '', { right: `<button class="icon-btn ${isSaved ? 'saved' : ''}" data-action="save-opp" data-id="${o.id}" aria-label="حفظ">${ic('bookmark-simple', '', isSaved ? 'fill' : 'bold')}</button>` })}
  <div class="scroll screen-in has-dock">
    <div class="photo-hero" style="background-image:url(${o.img})"><div class="ph-meta"><span class="tag">${fic(o.field)} ${FIELDS[o.field].n}</span></div></div>

    <div class="card title-card">
      <h1>${o.title}</h1>
      <div class="org-line">${ic('buildings')} ${o.org}</div>
      ${fit.length ? `<div class="fit-row">${fitTag(o)}</div>` : ''}
    </div>

    ${applied.length ? `<div class="notice safe">${ic('check-circle')}<div>أرسلت طلباً لـ ${applied.map(id => esc(kid(id)?.name)).join('، ')}. تابع الحالة من «حسابي».</div></div>` : ''}

    <div class="sec-h"><h3>معلومات سريعة</h3></div>
    <div class="tiles">${[['user', 'العمر', o.ages, '#6A5AC9'], ['wallet', 'التكلفة', o.cost, '#2F8F72'], ['pin', 'المكان', o.area, '#D9682B'], ['calendar', 'المواعيد', o.when, '#2F6FCF']].map(([i, l, v, c]) =>
      `<div class="tile"><span class="ti" style="color:${c};background:color-mix(in srgb, ${c} 12%, #fff)">${ic(i)}</span><span class="tl-l">${l}</span><b>${v}</b></div>`).join('')}</div>

    <div class="sec-h"><h3>عن البرنامج</h3></div>
    <div class="card"><p class="about">${o.desc}</p></div>

    <div class="sec-h"><h3>الجهة المنظِّمة</h3></div>
    <a class="card org-card" href="${o.url}" target="_blank" rel="noopener">
      <span class="org-ic" style="background:${FIELDS[o.field].bg}">${fic(o.field)}</span>
      <div class="grow"><b>${o.org}</b><span>${o.parent || o.area.split(' · ')[0]}</span></div>
      <span class="org-link">${ic('arrow-square-out')}</span>
    </a>
    <p class="fine">${ic('info')} المصدر: ${o.src}. التقديم عبر بصمة توضيحي في النموذج الأولي؛ المواعيد والأسعار النهائية تحددها الجهة.</p>
  </div>
  <div class="dock"><a class="icon-btn lg" href="${o.url}" target="_blank" rel="noopener" aria-label="موقع الجهة">${ic('globe')}</a>
    <button class="btn btn-navy" data-action="apply-open">${ic('paper-plane-tilt')} طلب المشاركة</button></div>
  ${ui.sheet === 'apply' ? sheet(`<h3>لمن الطلب؟</h3><p class="muted small">أنت من يقرر. لن نشارك أي بيانات قبل موافقتك.</p>
    ${S.children.map(c => `<button class="radio-row ${ui.pick === c.id ? 'on' : ''}" data-ui="pick" data-v="${c.id}" ${applied.includes(c.id) ? 'disabled style="opacity:.5"' : ''}>
      ${av(c, '', 'width:42px;height:42px;font-size:19px')}<div class="grow"><b>${esc(c.name)}</b><div class="small muted">${c.age} سنوات${applied.includes(c.id) ? ' · قُدّم مسبقاً' : fits(o, c) ? ' · يناسب العمر والمجال' : ''}</div></div></button>`).join('')}
    ${ui.pick ? `<label class="check card" style="padding:12px;margin:6px 0 12px"><input type="checkbox" data-ui-check="share" ${ui.share ? 'checked' : ''}><i class="box"></i><div><b>أوافق على مشاركة ملف ${esc(kid(ui.pick).name)} مع ${o.org}</b><span class="d">لهذا الطلب فقط: اسم العرض والعمر والمجال والأعمال المعتمدة.</span></div></label>` : ''}
    <button class="btn btn-navy" data-action="apply" ${ui.pick && ui.share ? '' : 'disabled'}>إرسال الطلب</button>`) : ''}`;
};

const compStatus = c => ({ open: '<span class="tag tag-green">مفتوحة الآن</span>', annual: '<span class="tag tag-purple">سنوية</span>', done: '<span class="tag tag-gray">انتهت</span>' }[c.status]);

SCREENS.comps = () => {
  const t = ui.t || 'open';
  const list = COMPS.filter(c => t === 'open' ? c.status !== 'done' : c.status === 'done');
  return `${bar('المسابقات', 'مسابقات بصمة ومسابقات وطنية للأطفال', { noBack: true })}
  <div class="scroll screen-in">
    <div class="seg">${[['open', 'الحالية والسنوية'], ['done', 'المنتهية والنتائج']].map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-ui="t" data-v="${k}">${l}</button>`).join('')}</div>
    ${list.map(c => `<button class="card comp-card" data-go="comp" data-id="${c.id}">
      <div class="row"><div class="thumb photo" style="background-image:url(${c.img})"><span class="fbadge" style="color:${FIELDS[c.field].fg}">${di(c.own ? 'trophy' : 'medal')}</span></div><div class="grow"><b>${c.title}</b><div class="small muted">${c.org}</div></div></div>
      <div class="row small" style="margin-top:12px;gap:6px;flex-wrap:wrap">${compStatus(c)}${c.own ? '<span class="tag tag-gold">من بصمة</span>' : ''}<span class="muted">${c.deadline}</span></div></button>`).join('')}
    <div class="notice info">${ic('shield-check')}<div>لا يوجد تصويت مدفوع. مسابقات بصمة تُحكَّم بمعايير معلنة مسبقاً، والمسابقات الوطنية تتبع قواعد جهاتها.</div></div>
  </div>${tabbar('comps')}`;
};

SCREENS.comp = () => {
  const c = comp(route.id);
  const entered = S.entries.filter(e => e.comp === c.id);
  const ageText = c.ageText || c.ages.map(a => { const g = AGES.find(x => x.k === a); return `${g.n} ${g.r}`; }).join('، ');
  return `${bar(c.own ? 'مسابقة بصمة' : 'مسابقة وطنية', FIELDS[c.field].n)}
  <div class="scroll screen-in">
    <div class="photo-hero comp" style="background-image:url(${c.img})"><div class="ph-cap"><span>${compStatus(c)}</span><h2>${c.title}</h2><p>${c.org}</p></div></div>
    ${c.facts ? `<div class="facts">${c.facts.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>` : ''}
    <div class="card info-list" style="margin-top:12px">${[['calendar', 'الموعد', c.deadline], ['user', 'الفئات العمرية', ageText], ['gift', 'الجائزة', c.prize]].map(([i, l, v]) =>
      `<div class="info-row"><span class="ii">${ic(i)}</span><div><span>${l}</span><b>${v}</b></div></div>`).join('')}</div>
    <div class="card"><b>${c.own ? 'شروط المشاركة' : 'كيف تشارك؟'}</b><ul class="rules">${c.rules.map(r => `<li>${r}</li>`).join('')}</ul></div>
    ${c.own ? `<div class="card"><b>طريقة التحكيم</b>${CRITERIA.map(([l, v]) => `<div class="crit"><div class="lbl"><span>${l}</span><b>${v}%</b></div><div class="bar"><i style="width:${v}%"></i></div></div>`).join('')}
      <div class="small muted">${c.note}.</div></div>` : ''}
    ${entered.length ? `<div class="notice safe">${ic('check-circle')}<div>شارك ${entered.map(e => esc(kid(e.child)?.name)).join('، ')} — المشاركة قيد المراجعة.</div></div>` : ''}
    ${c.status === 'open' ? `<button class="btn btn-navy" data-action="enter-open">${ic('trophy')} المشاركة في المسابقة</button>`
      : c.status === 'annual' ? `<button class="btn btn-navy" data-action="remind">${ic('bell')} ذكّرني عند فتح التسجيل</button>${extLink(c.url, 'التفاصيل على موقع الجهة')}`
      : extLink(c.url, 'قراءة الخبر في المصدر')}
  </div>
  ${ui.sheet === 'enter' ? sheet(`<h3>اختر الطفل والعمل</h3><p class="muted small">يمكن المشاركة بالأعمال المعتمدة فقط.</p>
    ${S.children.filter(k => c.ages.includes(ageGroup(k.age).k)).map(k => `<div style="margin-bottom:10px"><b class="row" style="gap:8px">${mini(k)} ${esc(k.name)}</b>
      ${k.works.filter(w => w.status === 'approved').map(w => `<button class="radio-row ${ui.pick === k.id + ':' + w.id ? 'on' : ''}" style="margin-top:6px" data-ui="pick" data-v="${k.id}:${w.id}">${mPoster(w) ? `<span class="thumb photo sm" style="background-image:url('${mPoster(w)}')"></span>` : `<span style="font-size:24px">${di(w.e, FIELDS[k.field].fg)}</span>`}<span class="grow">${esc(w.title)}</span></button>`).join('') || '<div class="small muted" style="padding:6px 0">لا أعمال معتمدة بعد</div>'}</div>`).join('') || '<div class="empty small">لا يوجد طفل ضمن الفئات العمرية لهذه المسابقة</div>'}
    <button class="btn btn-navy" data-action="enter" ${ui.pick ? '' : 'disabled'}>تأكيد المشاركة</button>`) : ''}`;
};

// ---------------- extra pages ----------------
// settings-style grouped menu row
const mrow = (i, t, d, attrs, color = 'var(--navy-2)', extra = '') => `<button class="mrow" ${attrs}><span class="mi" style="color:${color}">${ic(i)}</span><div class="grow"><b>${t}</b>${d ? `<span>${d}</span>` : ''}</div>${extra}${ic('chev', 'data-chev')}</button>`;

SCREENS.account = () => {
  const p = S.parent || { name: 'ولي أمر تجريبي', phone: '07X XXX XXXX' };
  const saved = (S.saved || []).length;
  return `${bar('حسابي', '', { noBack: true })}
  <div class="scroll screen-in">
    <button class="me" data-go="settings"><div class="avatar" style="background:var(--navy);color:var(--gold-2)">${esc(initial(p.name))}</div>
      <div class="grow"><b>${esc(p.name)}</b><span dir="ltr">${esc(p.phone)}</span></div><span class="tag tag-green">${ic('shield-check')} ولي أمر موثّق</span></button>

    <div class="sec-h"><h3>أطفالي</h3><button data-go="addChild">+ إضافة</button></div>
    <div class="menu">${S.children.map(c => `<button class="mrow" data-go="child" data-id="${c.id}">${av(c, '', 'width:40px;height:40px;font-size:17px;border-radius:13px')}<div class="grow"><b>${esc(c.name)}</b><span>${c.age} سنوات · ${FIELDS[c.field].n}</span></div>${c.visibility === 'public' ? '<span class="tag tag-green">عام</span>' : '<span class="tag tag-gray">خاص</span>'}${ic('chev', 'data-chev')}</button>`).join('') || '<div class="empty small">لم تضف أطفالاً بعد</div>'}</div>

    <div class="sec-h"><h3>نشاطي</h3></div>
    <div class="menu">
      ${mrow('paper-plane-tilt', 'طلبات الفرص', S.requests.length ? `${S.requests.length} طلب` : 'لا طلبات بعد', 'data-go="requests"', '#2F6FCF')}
      ${mrow('bookmark-simple', 'الفرص المحفوظة', saved ? `${saved} فرصة` : 'احفظ ما يعجبك لترجع له', 'data-go="saved"', '#D9682B')}
      ${mrow('sparkle', 'اكتشف موهبة طفلك', 'أسئلة قصيرة تقترح مجالات مناسبة', 'data-go="quiz"', '#6A5AC9')}
    </div>

    <div class="sec-h"><h3>الخصوصية والأمان</h3></div>
    <div class="menu">
      ${mrow('shield-check', 'الموافقات والظهور', 'لكل طفل على حدة', `data-go="privacy" data-id="${S.children[0]?.id || ''}"`, '#2F8F72')}
      ${mrow('lock-simple', 'حماية الأطفال وخصوصيتهم', 'كيف نحمي بيانات طفلك', 'data-go="safety"', '#2F8F72')}
      ${mrow('flag-banner', 'بلاغاتي', `${S.reports.length} بلاغ`, 'data-action="noop"', '#C24A33')}
    </div>

    <div class="sec-h"><h3>المساعدة والمزيد</h3></div>
    <div class="menu">
      ${mrow('question', 'الأسئلة الشائعة', 'وتواصل مع فريق بصمة', 'data-go="faq"')}
      ${mrow('compass', 'كيف تعمل بصمة؟', 'سبع خطوات من التسجيل إلى الفرصة', 'data-action="help"')}
      ${mrow('buildings', 'للأكاديميات والشركات', 'انشر فرصة أو ارعَ برنامجاً', 'data-go="forOrgs"', '#A47A0B')}
      ${mrow('globe', 'اللغة · Language', isEN() ? 'English' : 'العربية', 'data-action="lang" data-v="' + (isEN() ? 'ar' : 'en') + '"', '#2F6FCF')}
      ${mrow('gear-six', 'الإعدادات', 'الحساب والإشعارات واللغة', 'data-go="settings"')}
      ${mrow('clipboard-text', 'لوحة الإدارة', `عرض تجريبي · ${pendingCount()} بانتظار المراجعة`, 'data-go="admin"', '#6A5AC9')}
    </div>
    <button class="btn btn-ghost" data-action="reset" style="margin-top:18px">إعادة ضبط البيانات التجريبية</button>
    <p class="small muted" style="text-align:center;margin-top:14px">بصمة · نموذج أولي 0.4 · الأردن</p>
  </div>${tabbar('account')}
  ${ui.sheet === 'help' ? sheet(`<h3>كيف تعمل بصمة؟</h3><p class="muted small">رحلة طفلك في سبع خطوات، وأنت تتحكم في كل خطوة.</p>
    <div class="card journey" style="margin-top:12px">${JOURNEY.map(([t, d], i) => `<div class="jstep"><span class="n">${i + 1}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>
    <button class="btn btn-navy" data-action="close-sheet">فهمت</button>`) : ''}`;
};

// ---- talent discovery quiz (guidance, not diagnosis) ----
const QUIZ = [
  ['ماذا يفعل طفلك في وقت فراغه غالباً؟', [['يرسم أو يلوّن أو يصنع أشياء بيديه', 'arts'], ['يغني أو يقلّد أو يمثّل', 'music'], ['يجري ويلعب الكرة ويتحرك', 'sports'], ['يفكك الألعاب ويسأل كيف تعمل', 'science']]],
  ['أي هدية تُفرحه أكثر؟', [['علبة ألوان أو أدوات رسم', 'arts'], ['كتاب أو قصة جديدة', 'lang'], ['لعبة ألغاز أو شطرنج', 'mind'], ['كرة أو دراجة', 'sports']]],
  ['في المدرسة، ما المادة التي يحبها؟', [['الرياضيات', 'mind'], ['العلوم', 'science'], ['اللغة العربية', 'lang'], ['التربية الفنية أو الموسيقية', 'arts']]],
  ['عندما يتحدث أمام الآخرين…', [['يحب الوقوف والإلقاء', 'lang'], ['يغني أو يؤدي بثقة', 'music'], ['يشرح فكرة أو اختراعاً', 'science'], ['يفضّل أن يُري عملاً صنعه', 'arts']]],
  ['ما الذي يجعله يركّز وقتاً طويلاً؟', [['لغز أو تحدٍّ ذهني', 'mind'], ['بناء نموذج أو تجربة', 'science'], ['آلة موسيقية أو أغنية', 'music'], ['تمرين رياضي أو مباراة', 'sports']]],
];
SCREENS.quiz = () => {
  const q = ui.q ?? 0, ans = ui.ans || (ui.ans = []);
  if (q >= QUIZ.length) {
    const score = {}; ans.forEach(f => score[f] = (score[f] || 0) + 1);
    const top = Object.entries(score).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const best = top[0][0];
    return `${bar('نتيجة الاكتشاف', '', { right: '' })}
    <div class="scroll screen-in">
      <div class="result-hero" style="--c:${FIELDS[best].fg}"><span>${fic(best)}</span><small>يبدو أن طفلك يميل إلى</small><h2>${FIELDS[best].n}</h2></div>
      <div class="card">${top.map(([f, n]) => `<div class="crit"><div class="lbl"><span class="row" style="gap:6px">${fic(f)} ${FIELDS[f].n}</span><b>${Math.round(n / QUIZ.length * 100)}%</b></div><div class="bar"><i style="width:${n / QUIZ.length * 100}%;background:${FIELDS[f].fg}"></i></div></div>`).join('')}</div>
      <div class="notice warn">${ic('info')}<div>هذا توجيه أولي من إجاباتك وليس تقييماً أو تشخيصاً. التقييم المتخصص يتم من جهات مؤهلة.</div></div>
      <div class="sec-h"><h3>فرص في ${FIELDS[best].n}</h3></div>
      ${OPPS.filter(o => o.field === best).map(oppRow).join('')}
      ${COMPS.filter(c => c.field === best && c.status !== 'done').map(c => `<button class="list-item" data-go="comp" data-id="${c.id}"><div class="thumb" style="background:${FIELDS[c.field].bg}">${di('medal', FIELDS[c.field].fg)}</div><div class="grow"><b>${c.title}</b><div class="small muted">مسابقة · ${c.org}</div></div>${ic('chev', 'data-chev')}</button>`).join('')}
      <button class="btn btn-navy" data-go="addChild" data-field="${best}" style="margin-top:8px">إنشاء ملف موهبة بهذا المجال</button>
      <button class="btn btn-ghost" data-action="quiz-restart">إعادة الأسئلة</button>
    </div>`;
  }
  const [question, opts] = QUIZ[q];
  return `${bar('اكتشف موهبة طفلك', `سؤال ${q + 1} من ${QUIZ.length}`, { right: '' })}
  <div class="scroll screen-in">
    <div class="steps-bar">${QUIZ.map((_, i) => `<i class="${i <= q ? 'on' : ''}"></i>`).join('')}</div>
    <h2 class="q-title">${question}</h2>
    ${opts.map(([t, f]) => `<button class="q-opt" data-action="quiz-pick" data-f="${f}"><span style="background:${FIELDS[f].bg}">${fic(f)}</span><b>${t}</b></button>`).join('')}
    ${q ? `<button class="btn btn-ghost" data-action="quiz-back" style="margin-top:6px">السؤال السابق</button>` : '<p class="small muted" style="text-align:center;margin-top:16px">5 أسئلة · أقل من دقيقة · لا نحفظ الإجابات</p>'}
  </div>`;
};

// ---- growth timeline ----
SCREENS.growth = () => {
  const c = kid(route.id); if (!c) return SCREENS.home();
  const ev = [
    ...c.works.map(w => ({ d: w.date, t: w.status === 'approved' ? `نُشر: ${w.title}` : w.status === 'pending' ? `رُفع للمراجعة: ${w.title}` : `يحتاج تعديلاً: ${w.title}`, i: w.status === 'approved' ? 'check-circle' : w.status === 'pending' ? 'hourglass-medium' : 'pencil-simple', c: w.status === 'approved' ? '#2F8F72' : '#A47A0B' })),
    ...c.achievements.map(([t, d, e]) => ({ d, t, i: e, c: '#A47A0B' })),
    ...S.requests.filter(r => r.child === c.id).map(r => ({ d: r.date, t: `طلب مشاركة: ${opp(r.opp).title}`, i: 'paper-plane-tilt', c: '#2F6FCF' })),
  ];
  return `${bar('سجل التطور', esc(c.name), { right: `<button class="icon-btn" data-action="ach-open" aria-label="إضافة إنجاز">${ic('plus')}</button>` })}
  <div class="scroll screen-in">
    <div class="facts" style="margin-top:0">${[[c.works.filter(w => w.status === 'approved').length, 'أعمال منشورة'], [c.achievements.length, 'إنجازات'], [c.skills.length, 'مهارات']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
    <div class="sec-h"><h3>المهارات</h3></div>
    <div class="card">${c.skills.map((s, i) => { const lv = (c.levels || {})[s] ?? (i ? 1 : 2); return `<div class="skill"><b>${esc(s)}</b><div class="lv">${['مبتدئ', 'متوسط', 'متقدم'].map((l, k) => `<button class="${k === lv ? 'on' : ''}" data-action="level" data-s="${esc(s)}" data-v="${k}">${l}</button>`).join('')}</div></div>`; }).join('')}
      <p class="small muted" style="margin:10px 0 0">يحدّدها ولي الأمر أو المدرب لمتابعة التقدم — ليست تقييماً رسمياً.</p></div>
    <div class="sec-h"><h3>الخط الزمني</h3><button data-action="ach-open">+ إنجاز</button></div>
    <div class="card timeline">${ev.length ? ev.map(e => `<div class="tl"><span class="dot" style="color:${e.c}">${di(e.i)}</span><div><b>${esc(e.t)}</b><span>${e.d}</span></div></div>`).join('') : `<div class="empty">${di('path')}<b>لا أحداث بعد</b>ارفع عملاً أو أضف إنجازاً.</div>`}</div>
  </div>
  ${ui.sheet === 'ach' ? sheet(`<h3>إضافة إنجاز</h3><p class="muted small">شهادة، مشاركة، جائزة، أو خطوة يفخر بها طفلك.</p>
    <div class="field" style="margin-top:12px"><label>العنوان</label><input data-bind-ui="achT" value="${esc(ui.achT || '')}" placeholder="مثال: شهادة إتمام ورشة الرسم"></div>
    <div class="chips" style="margin-bottom:14px">${[['medal', 'شهادة'], ['trophy', 'جائزة'], ['star', 'مشاركة'], ['flag-banner', 'هدف تحقق']].map(([i, l]) => `<button class="chip ${(ui.achI || 'medal') === i ? 'on' : ''}" data-ui="achI" data-v="${i}">${ic(i)} ${l}</button>`).join('')}</div>
    <button class="btn btn-navy" data-action="ach-save" ${(ui.achT || '').trim() ? '' : 'disabled'}>حفظ الإنجاز</button>`) : ''}`;
};

// ---- saved opportunities ----
SCREENS.saved = () => {
  const list = OPPS.filter(o => (S.saved || []).includes(o.id));
  return `${bar('الفرص المحفوظة', `${list.length} فرصة`, { right: '' })}
  <div class="scroll screen-in">${list.map(oppRow).join('') || `<div class="empty card">${di('bookmark-simple')}<b>لا محفوظات بعد</b>اضغط على علامة الحفظ في أي فرصة لتجدها هنا.<br><button class="chip" style="margin-top:12px" data-tab="opps">تصفح الفرص</button></div>`}</div>`;
};

// ---- requests + request detail ----
const REQ_STEPS = [['أُرسل الطلب', 'وصل طلبك إلى بصمة'], ['مراجعة بصمة', 'نتأكد من اكتمال الملف وملاءمة الفرصة'], ['أُرسل للجهة', 'شاركنا الملف المعتمد فقط بموافقتك'], ['رد الجهة', 'تتواصل الجهة مع ولي الأمر مباشرة']];
const reqStep = r => ({ review: 1, sent: 2, accepted: 3 }[r.status] ?? 1);
SCREENS.requests = () => `${bar('طلبات الفرص', '', { right: '' })}
  <div class="scroll screen-in">${S.requests.length ? S.requests.map(r => { const o = opp(r.opp), c = kid(r.child); return `<button class="list-item" data-go="req" data-id="${r.id}">
    <div class="thumb" style="background:${FIELDS[o.field].bg}">${fic(o.field)}</div>
    <div class="grow"><b style="font-size:14.5px">${o.title}</b><div class="small muted">${esc(c?.name || '—')} · ${r.date}</div>
      <div class="mini-steps">${REQ_STEPS.map((_, i) => `<i class="${i <= reqStep(r) ? 'on' : ''}"></i>`).join('')}</div></div>${reqTag(r.status)}</button>`; }).join('')
    : `<div class="empty card">${di('paper-plane-tilt')}<b>لا طلبات بعد</b>عندما تجد فرصة مناسبة اضغط «طلب المشاركة».<br><button class="chip" style="margin-top:12px" data-tab="opps">تصفح الفرص</button></div>`}</div>`;

SCREENS.req = () => {
  const r = S.requests.find(x => x.id === route.id); if (!r) return SCREENS.requests();
  const o = opp(r.opp), c = kid(r.child), st = reqStep(r);
  return `${bar('حالة الطلب', o.org, { right: '' })}
  <div class="scroll screen-in">
    <button class="list-item" data-go="opp" data-id="${o.id}"><div class="thumb" style="background:${FIELDS[o.field].bg}">${fic(o.field)}</div><div class="grow"><b>${o.title}</b><div class="small muted">لـ ${esc(c?.name)} · ${r.date}</div></div>${ic('chev', 'data-chev')}</button>
    <div class="card journey">${REQ_STEPS.map(([t, d], i) => `<div class="jstep ${i < st ? 'done' : i === st ? 'now' : ''}"><span class="n">${i < st ? ic('check') : i + 1}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>
    <div class="notice info">${ic('lock')}<div>شاركنا مع الجهة: اسم العرض والعمر والمجال والأعمال المعتمدة فقط. لا رقم هاتف الطفل ولا مدرسته.</div></div>
    <button class="btn btn-danger" data-action="cancel-req" data-id="${r.id}">${ic('x-circle')} سحب الطلب</button>
  </div>`;
};

// ---- for organisations (pricing from the project study — test prices, not market-proven) ----
SCREENS.forOrgs = () => `${bar('للأكاديميات والشركات', '', { right: '' })}
  <div class="scroll screen-in">
    <div class="hero"><h3>اعثر على المواهب وادعمها</h3><p>انشر برامجك لأولياء أمور يبحثون عنها، أو ارعَ مسابقة ببرنامج ذي أثر قابل للقياس.</p></div>
    <div class="sec-h"><h3>ماذا نقدم</h3></div>
    <div class="menu">${[['megaphone', 'نشر فرصة أو ورشة', 'لفترة محدودة', '50–100'], ['buildings', 'اشتراك أكاديمية', 'شهرياً · صفحة موثّقة واستقبال طلبات', '50–150'], ['hand-heart', 'رعاية برنامج أو مسابقة', 'للشركات والمبادرات المجتمعية', '1,000–3,000'], ['calendar-star', 'تنظيم فعالية خاصة', 'للمدارس والمراكز', '300–1,000']].map(([i, t, d, p]) =>
      `<div class="mrow"><span class="mi" style="color:#A47A0B">${di(i)}</span><div class="grow"><b>${t}</b><span>${d}</span></div><span class="price"><b>⁦${p}⁩</b> دولار</span></div>`).join('')}</div>
    <p class="small muted" style="line-height:1.7">أسعار أولية للتفاوض من دراسة المشروع، وليست أسعاراً ثبت قبول السوق لها.</p>
    <div class="sec-h"><h3>التزاماتنا مع الجهات</h3></div>
    <div class="card"><ul class="rules">${['التحقق من الجهة قبل ظهور شارة «موثّقة»', 'لا رسائل خاصة مع الأطفال — التواصل مع ولي الأمر فقط', 'نشارك بيانات الطفل لكل طلب على حدة وبموافقة ولي الأمر', 'تقارير بالطلبات والزيارات لكل برنامج'].map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div class="sec-h"><h3>سجّل اهتمام جهتك</h3></div>
    <div class="field"><input data-bind-ui="orgN" value="${esc(ui.orgN || '')}" placeholder="اسم الجهة"></div>
    <div class="field"><input data-bind-ui="orgE" value="${esc(ui.orgE || '')}" placeholder="البريد الإلكتروني" dir="ltr" style="text-align:right"></div>
    <button class="btn btn-navy" data-action="org-interest" ${(ui.orgN || '').trim() && (ui.orgE || '').includes('@') ? '' : 'disabled'}>إرسال</button>
  </div>`;

// ---- child protection (from the study's legal section) ----
SCREENS.safety = () => `${bar('حماية الأطفال', 'وخصوصية بياناتهم', { right: '' })}
  <div class="scroll screen-in">
    <div class="result-hero" style="--c:#2F8F72"><span>${di('shield-check', '#2F8F72')}</span><small>مبدأنا الأول</small><h2>سلامة الطفل قبل الظهور</h2></div>
    <div class="sec-h"><h3>كيف نحمي طفلك</h3></div>
    <div class="menu">${[['user', 'الحساب لولي الأمر', 'لا يملك الطفل حساباً ولا يتواصل مع أحد'], ['check-square', 'موافقات منفصلة', 'للملف، والصور والفيديو، والنشر العام، والمشاركة مع الجهات'], ['eye-slash', 'لا معلومات حساسة', 'لا يظهر الهاتف أو العنوان أو اسم المدرسة للعامة'], ['magnifying-glass', 'مراجعة قبل النشر', 'كل محتوى يراجعه فريق بصمة'], ['chat-slash', 'لا رسائل خاصة', 'بين الطفل وأي أكاديمية أو مستخدم'], ['flag-banner', 'زر الإبلاغ', 'في كل ملف ومحتوى عام'], ['trash', 'حق الحذف', 'اسحب موافقتك أو احذف البيانات متى شئت'], ['key', 'صلاحيات محدودة', 'للموظفين وسجل بكل تعديل أو حذف']].map(([i, t, d]) =>
      `<div class="mrow"><span class="mi" style="color:#2F8F72">${ic(i)}</span><div class="grow"><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>
    <div class="sec-h"><h3>المرجعية القانونية</h3></div>
    <div class="card"><ul class="rules">
      <li>قانون حماية البيانات الشخصية الأردني رقم 24 لسنة 2023، النافذ منذ 17 آذار 2024.</li>
      <li>تعليمات وزارة الاقتصاد الرقمي والريادة حول الموافقة المسبقة وحقوق أصحاب البيانات.</li>
      <li>قانون حقوق الطفل الأردني وأحكام حماية الأطفال من الجرائم الإلكترونية.</li>
      <li>إرشادات اليونيسف الأردن لحماية الأطفال عند التواصل عبر الإنترنت.</li></ul>
      <p class="small muted" style="margin:10px 0 0">سيُراجع محامٍ أردني مختص هذه السياسات قبل جمع أي بيانات فعلية.</p></div>
  </div>`;

// ---- FAQ ----
const FAQ = [
  ['هل التسجيل في بصمة مجاني لأولياء الأمور؟', 'نعم. دخل بصمة يأتي من الأكاديميات والرعاة، وليس من رسوم على الأهالي أو من بيع الأصوات.'],
  ['هل سيرى الجميع فيديو طفلي؟', 'لا. الملف خاص افتراضياً، ولا يظهر أي عمل قبل مراجعته وقبل موافقتك على النشر العام.'],
  ['هل يمكن لأكاديمية أن تراسل طفلي؟', 'لا توجد رسائل خاصة إطلاقاً. الجهة ترى طلبك وتتواصل معك أنت فقط.'],
  ['هل تقيس بصمة ذكاء طفلي أو قدراته؟', 'لا. بصمة ليست جهة تشخيص. أداة «اكتشف موهبة طفلك» توجيه أولي فقط، والتقييم المتخصص من جهات مؤهلة.'],
  ['كيف أحذف بيانات طفلي؟', 'من «حسابي» ← الموافقات والظهور ← طلب حذف الملف. يُخفى فوراً ويُحذف وفق سياسة الاحتفاظ بالبيانات.'],
  ['ما الأعمار المناسبة؟', 'من 3 إلى 17 سنة في أربع فئات: براعم، اكتشاف، تطوير، تمكين. فئة البراعم لها ضوابط عرض أشد.'],
];
SCREENS.faq = () => `${bar('الأسئلة الشائعة', '', { right: '' })}
  <div class="scroll screen-in">
    <div class="menu">${FAQ.map(([q, a], i) => `<button class="faq ${ui.open === i ? 'open' : ''}" data-ui="open" data-v="${ui.open === i ? -1 : i}" data-num><div class="row"><b class="grow">${q}</b>${ic('caret-down', 'data-chev')}</div>${ui.open === i ? `<p>${a}</p>` : ''}</button>`).join('')}</div>
    <div class="card contact"><div class="row"><span class="mi" style="color:var(--purple)">${di('headset')}</span><div class="grow"><b>لم تجد إجابتك؟</b><span class="small muted">فريق بصمة يرد خلال يوم عمل.</span></div></div>
      <button class="btn btn-navy" data-action="noop" style="margin-top:12px">${ic('chat-circle-text')} تواصل معنا</button></div>
  </div>`;

// ---- settings ----
SCREENS.settings = () => {
  const p = S.parent || (S.parent = { name: 'ولي أمر تجريبي', phone: '' });
  const n = S.prefs || (S.prefs = { review: true, opps: true, comps: true, weekly: false });
  const sw = (k, t, d) => `<div class="mrow"><div class="grow"><b>${t}</b><span>${d}</span></div><label class="switch"><input type="checkbox" data-pref="${k}" ${n[k] ? 'checked' : ''}><i></i></label></div>`;
  return `${bar('الإعدادات', '', { right: '' })}
  <div class="scroll screen-in">
    <div class="sec-h" style="margin-top:4px"><h3>الحساب</h3></div>
    <div class="field"><label>الاسم</label><input data-parent="name" value="${esc(p.name)}"></div>
    <div class="field"><label>رقم الهاتف</label><input data-parent="phone" value="${esc(p.phone)}" dir="ltr" style="text-align:right" inputmode="tel"><div class="hint">لا يظهر لأي جهة أو مستخدم.</div></div>
    <div class="sec-h"><h3>الإشعارات</h3></div>
    <div class="menu">${sw('review', 'نتيجة المراجعة', 'عند اعتماد عمل أو طلب تعديله')}${sw('opps', 'فرص تناسب أطفالي', 'برامج جديدة في مجالاتهم وأعمارهم')}${sw('comps', 'المسابقات', 'عند فتح التسجيل')}${sw('weekly', 'ملخص أسبوعي', 'كل يوم أحد')}</div>
    <div class="sec-h"><h3>اللغة</h3></div>
    <div class="seg"><button class="${isEN() ? '' : 'on'}" data-action="lang" data-v="ar">العربية</button><button class="${isEN() ? 'on' : ''}" data-action="lang" data-v="en">English</button></div>
    <button class="btn btn-danger" data-action="del-account" style="margin-top:20px">${ic('trash')} ${S.deletion ? 'طلب الحذف قيد المعالجة' : 'طلب حذف الحساب وجميع البيانات'}</button>
  </div>`;
};

SCREENS.notifs = () => {
  S.notifs.forEach(n => n.read = true); save();
  return `${bar('الإشعارات', '', { right: '' })}<div class="scroll screen-in">
    ${S.notifs.map(n => `<button class="list-item" ${n.go ? `data-go="${n.go.split(':')[0]}" data-id="${n.go.split(':')[1]}"` : ''}><div class="thumb" style="background:var(--gold-soft)">${di(n.e, '#A9861C')}</div>
      <div class="grow"><b style="font-size:14.5px">${n.t}</b><div class="small muted">${n.d}</div></div></button>`).join('')}</div>`;
};

SCREENS.admin = () => {
  const t = ui.t || 'queue';
  const queue = S.children.flatMap(c => c.works.filter(w => w.status === 'pending').map(w => ({ c, w })));
  return `${bar('لوحة الإدارة', 'عرض تجريبي لفريق بصمة', { right: '<span class="tag tag-purple">فريق بصمة</span>' })}
  <div class="scroll screen-in">
    <div class="stats"><div><b>${queue.length}</b><span>بانتظار المراجعة</span></div><div><b>${S.requests.filter(r => r.status === 'review').length}</b><span>طلبات فرص</span></div><div><b>${S.reports.length}</b><span>بلاغات</span></div></div>
    <div class="seg">${[['queue', 'المحتوى'], ['reqs', 'الطلبات'], ['reports', 'البلاغات'], ['log', 'السجل']].map(([k, l]) => `<button class="${t === k ? 'on' : ''}" data-ui="t" data-v="${k}">${l}</button>`).join('')}</div>
    ${t === 'queue' ? (queue.length ? queue.map(({ c, w }) => `<div class="card">
        <div class="row">${mSrc(w) ? `<div class="thumb photo" data-action="view" data-src="${mSrc(w)}" data-type="${w.type === 'video' && BLOBS[w.id]?.kind !== 'image' ? 'video' : 'image'}" data-title="${esc(w.title)}" data-poster="${mPoster(w)}" style="${mPoster(w) ? `background-image:url('${mPoster(w)}')` : `background:${c.bg}`}">${w.type === 'video' ? `<span class="fbadge">${ic('play', '', 'fill')}</span>` : ''}</div>` : `<div class="thumb" style="background:${c.bg}">${di(w.e, FIELDS[c.field].fg)}</div>`}<div class="grow"><b>${esc(w.title)}</b><div class="small muted">${esc(c.name)} · ${c.age} سنوات · ${w.type === 'video' ? 'فيديو' : w.type === 'image' ? 'صورة' : 'نص'}</div></div></div>
        <div class="chips" style="margin:12px 0">${['لا معلومات شخصية', 'مناسب للعمر', 'من إنتاج الطفل'].map(s => `<span class="tag tag-gray">${ic('square')} ${s}</span>`).join('')}</div>
        <div class="row"><button class="btn btn-navy" style="padding:11px" data-action="approve" data-c="${c.id}" data-w="${w.id}">${ic('check')} اعتماد ونشر</button>
        <button class="btn btn-danger" style="padding:11px;margin:0;width:auto" data-action="reject" data-c="${c.id}" data-w="${w.id}">رفض</button></div></div>`).join('')
        : `<div class="empty"><span class="e">${di('check-circle', '#4FA38A')}</span>لا يوجد محتوى بانتظار المراجعة</div>`)
    : t === 'reqs' ? S.requests.map(r => { const o = opp(r.opp), c = kid(r.child); return `<div class="list-item"><div class="grow"><b style="font-size:14px">${o.title}</b><div class="small muted">${esc(c?.name)} ← ${o.org}</div></div>
        ${r.status === 'review' ? `<button class="chip on" data-action="fwd" data-id="${r.id}">إرسال للجهة</button>` : reqTag(r.status)}</div>`; }).join('') || '<div class="empty small">لا طلبات</div>'
    : t === 'reports' ? (S.reports.length ? S.reports.map(r => `<div class="list-item"><div class="thumb" style="background:var(--red-soft)">${di('flag-banner', '#C8553D')}</div><div class="grow"><b style="font-size:14px">${r.reason}</b><div class="small muted">ملف ${r.name} · ${r.date}</div></div><span class="tag tag-gold">جديد</span></div>`).join('') : '<div class="empty small">لا بلاغات — جرّب الإبلاغ من ملف عام في "اكتشف"</div>')
    : `<div class="card">${S.log.slice().reverse().map(([who, what, when]) => `<div class="log"><b>${who}</b> — ${what} · ${when}</div>`).join('')}</div>`}
  </div>`;
};

// ---------------- English mode ----------------
// screens are written in Arabic; in English mode we translate the rendered DOM using EN_DICT
const AR_RUN = /[\u0600-\u06FF\u0750-\u077F](?:[\u0600-\u06FF\u0750-\u077F\s\d%+\-–—:·.,!،؛؟«»"()/]*[\u0600-\u06FF\u0750-\u077F])?/g;
const EN = typeof EN_DICT === 'object' ? EN_DICT : {};
// translate one Arabic run: exact match, else greedy longest word-phrase matching (never inside a word)
const PUNCT = /[،؛؟.,:!«»"()]+$/;
const trRun = m => {
  if (EN[m] !== undefined) return EN[m].trim();
  const w = m.split(/\s+/), out = [];
  for (let i = 0; i < w.length;) {
    let hit = false;
    for (let j = Math.min(w.length, i + 24); j > i; j--) {
      const ph = w.slice(i, j).join(' '), core = ph.replace(PUNCT, ''), tail = ph.slice(core.length);
      if (core && EN[core] !== undefined) { out.push(EN[core].trim() + tail); i = j; hit = true; break; }
    }
    if (!hit) { const x = w[i++], c = x.replace(PUNCT, '');  // "وفلان" → "and …"
      out.push(c.length > 2 && c[0] === 'و' && EN[c.slice(1)] !== undefined ? 'and ' + EN[c.slice(1)].trim() + x.slice(c.length) : x); }
  }
  return out.join(' ').replace(/،/g, ',').replace(/؟/g, '?').replace(/[«»]/g, '"').replace(/ ,/g, ',');
};
const tr = t => t.replace(AR_RUN, trRun);
const isEN = () => S.lang === 'en';
function translateDOM(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) if (/[\u0600-\u06FF]/.test(n.nodeValue)) n.nodeValue = tr(n.nodeValue);
  root.querySelectorAll('[placeholder],[aria-label],[alt],[title]').forEach(el => {
    for (const a of ['placeholder', 'aria-label', 'alt', 'title']) { const v = el.getAttribute(a); if (v && /[\u0600-\u06FF]/.test(v)) el.setAttribute(a, tr(v)); }
  });
  root.querySelectorAll('input[value]').forEach(el => { if (/[\u0600-\u06FF]/.test(el.value) && !el.dataset.parent && !el.dataset.bind) el.value = tr(el.value); });
}
function applyLang() {
  const en = isEN();
  document.documentElement.lang = en ? 'en' : 'ar';
  document.documentElement.dir = en ? 'ltr' : 'rtl';
  $app.dir = en ? 'ltr' : 'rtl';
  if (en) { translateDOM($app); const side = document.querySelector('.side'); if (side && !side.dataset.tr) { translateDOM(side); side.dataset.tr = 1; } }
}
const setLang = l => { S.lang = l; save(); if (l === 'ar') return location.reload(); render(false); toast('Language: English'); };
const langPill = () => `<button class="lang-pill" data-action="lang" data-v="${isEN() ? 'ar' : 'en'}">${ic('globe')} ${isEN() ? 'العربية' : 'English'}</button>`;

// ---------------- render + events ----------------
function render(scrollTop) {
  const prev = $app.querySelector('.scroll')?.scrollTop || 0;
  $app.innerHTML = (SCREENS[route.n] || SCREENS.home)();
  $app.dataset.dir = scrollTop ? dir : ''; dir = '';
  document.querySelector('.phone')?.classList.toggle('dark-ui', route.n === 'welcome');
  applyLang();
  const sc = $app.querySelector('.scroll');
  if (sc && !scrollTop) sc.scrollTop = prev;
}
const rerender = () => render(false);
const log = what => S.log.push(['المشرفة', what, 'الآن']);

$app.addEventListener('click', e => {
  if (e.target.closest('[data-stop]') && !e.target.closest('[data-action],[data-ui],[data-go],button,label,input')) return;
  const el = e.target.closest('[data-action],[data-go],[data-tab],[data-ui],[data-fset],[data-skill],[data-fchild],[data-ftype],[data-vis]');
  if (!el) return;
  const d = el.dataset;

  if (d.tab) return tabTo(d.tab);
  if (d.go) {
    const p = {}; if (d.id) p.id = d.id; if (d.field) p.field = d.field;
    if (d.go === 'discover' && d.field) { stack = []; route = { n: 'discover' }; ui = { field: d.field }; return render(true); }
    return go(d.go, p, { replace: 'replace' in d });
  }
  if (d.ui) { ui[d.ui] = 'num' in d ? +d.v : d.v; if (d.ui === 'field' && route.field) delete route.field; if (d.ui === 'pick') ui.share = false; return rerender(); }
  if (d.fset) { ui.f.field = d.fset; ui.f.skills = []; return rerender(); }
  if (d.skill) { const s = ui.f.skills; s.includes(d.skill) ? s.splice(s.indexOf(d.skill), 1) : s.push(d.skill); return rerender(); }
  if (d.fchild) { ui.f.child = d.fchild; return rerender(); }
  if (d.ftype) { ui.f.type = d.ftype; ui.f.file = ''; ui.blob = null; return rerender(); }
  if (d.vis) {
    const c = kid(route.id);
    if (d.vis === 'public' && !c.consents.publish) { toast('فعّل موافقة النشر العام أولاً'); return; }
    c.visibility = d.vis; save(); return rerender();
  }

  const A = {
    back,
    slide: () => { ui.slide = (ui.slide || 0) + 1; rerender(); },
    demo: () => { S.onboarded = true; S.parent = { name: 'سارة أحمد', phone: '079 000 0000' }; save(); tabTo('home'); },
    register: () => { const f = ui.f; S.parent = { name: f.name.trim(), phone: f.phone.trim(), email: f.email }; S.onboarded = true; save(); stack = []; route = { n: 'home' }; go('addChild'); toast('تم إنشاء الحساب — أضف ملف طفلك الأول'); },
    'child-prev': () => { ui.step--; rerender(); },
    'child-next': () => {
      const f = ui.f;
      if ((ui.step || 1) < 3) { ui.step = (ui.step || 1) + 1; if (ui.step === 3 && f.age <= 5) f.publish = false; return rerender(); }
      const id = 'c' + Date.now();
      S.children.push({ id, name: f.name.trim(), age: +f.age, field: f.field, skills: f.skills, bio: f.bio.trim(), bg: FIELDS[f.field].bg,
        visibility: f.publish ? 'public' : 'private', consents: { profile: f.profile, media: f.media, publish: f.publish, partners: f.partners }, works: [], achievements: [] });
      save(); stack = [{ n: 'home' }]; route = { n: 'child', id }; ui = {}; render(true); toast('تم إنشاء ملف الموهبة');
    },
    upload: () => {
      const f = ui.f, c = kid(f.child);
      const wid = 'w' + Date.now(); if (ui.blob) BLOBS[wid] = ui.blob;
      c.works.unshift({ id: wid, title: f.title.trim(), type: f.type, e: { video: 'film-strip', image: 'image', doc: 'note-pencil' }[f.type], status: 'pending', date: 'اليوم' });
      S.notifs.unshift({ t: `"${f.title.trim()}" قيد المراجعة`, d: 'لن يُنشر قبل موافقة فريق بصمة.', e: 'hourglass-medium', read: false });
      save(); ui.done = true; rerender();
    },
    'apply-open': () => { ui.sheet = 'apply'; rerender(); },
    apply: () => {
      const c = kid(ui.pick); c.consents.partners = true;
      S.requests.unshift({ id: 'r' + Date.now(), opp: route.id, child: ui.pick, status: 'review', date: 'اليوم' });
      save(); ui = {}; rerender(); toast('أُرسل الطلب — تابع حالته من حسابي');
    },
    'enter-open': () => { ui.sheet = 'enter'; rerender(); },
    enter: () => { const [child, work] = ui.pick.split(':'); S.entries.push({ comp: route.id, child, work }); save(); ui = {}; rerender(); toast('تم تسجيل المشاركة'); },
    remind: () => toast('سنذكّرك عند إعلان موعد التسجيل'),
    'quiz-pick': () => { ui.ans[ui.q || 0] = d.f; ui.q = (ui.q || 0) + 1; render(true); },
    'quiz-back': () => { ui.q--; rerender(); },
    'quiz-restart': () => { ui = {}; render(true); },
    'save-opp': () => { S.saved = S.saved || []; const i = S.saved.indexOf(d.id); i < 0 ? S.saved.push(d.id) : S.saved.splice(i, 1); save(); rerender(); toast(i < 0 ? 'حُفظت في «الفرص المحفوظة»' : 'أُزيلت من المحفوظات'); },
    'cancel-req': () => { S.requests = S.requests.filter(r => r.id !== d.id); save(); back(); toast('سُحب الطلب'); },
    'ach-open': () => { ui.sheet = 'ach'; rerender(); },
    'ach-save': () => { const c = kid(route.id); c.achievements.unshift([ui.achT.trim(), 'اليوم', ui.achI || 'medal']); save(); ui = {}; rerender(); toast('أُضيف الإنجاز'); },
    level: () => { const c = kid(route.id); c.levels = c.levels || {}; c.levels[d.s] = +d.v; save(); rerender(); },
    'org-interest': () => { ui = {}; rerender(); toast('شكراً! سيتواصل معكم فريق الشراكات'); },
    'clear-filters': () => { ui = { t: ui.t }; rerender(); },
    help: () => { ui.sheet = 'help'; rerender(); },
    report: () => { ui.sheet = 'report'; rerender(); },
    'send-report': () => {
      const p = PUBLIC.find(x => x.id === route.id);
      S.reports.unshift({ name: p.name, reason: ['محتوى غير مناسب لعمر الطفل', 'معلومات شخصية ظاهرة', 'انتحال هوية أو محتوى ليس للطفل', 'سبب آخر'][ui.reason], date: 'الآن' });
      save(); ui = {}; rerender(); toast('شكراً — وصل البلاغ لفريق بصمة');
    },
    'close-sheet': () => { if (e.target.closest('.sheet') && !el.closest('.sheet')) return; ui.sheet = null; rerender(); },
    'delete-child': () => { ui.sheet = 'del'; rerender(); },
    'confirm-del': () => { S.children = S.children.filter(c => c.id !== d.id); S.requests = S.requests.filter(r => r.child !== d.id); save(); tabTo('account'); toast('تم استلام طلب الحذف وإخفاء الملف'); },
    export: () => toast('سنرسل نسخة من البيانات خلال المدة القانونية'),
    'del-account': () => { S.deletion = true; save(); rerender(); toast('تم استلام طلب حذف الحساب'); },
    approve: () => {
      const c = kid(d.c), w = c.works.find(x => x.id === d.w); w.status = 'approved';
      S.notifs.unshift({ t: `تم اعتماد "${w.title}"`, d: c.visibility === 'public' ? 'أصبح ظاهراً في ملف ' + c.name : 'محفوظ في ملف ' + c.name + ' الخاص', e: 'check-circle', read: false, go: 'child:' + c.id });
      log(`اعتماد "${w.title}" (${c.name})`); save(); rerender(); toast('تم الاعتماد وإشعار ولي الأمر');
    },
    reject: () => {
      const c = kid(d.c), w = c.works.find(x => x.id === d.w); w.status = 'rejected';
      S.notifs.unshift({ t: `"${w.title}" يحتاج تعديلاً`, d: 'يظهر في الفيديو معلومات شخصية — يرجى إعادة الرفع.', e: 'pencil-simple', read: false, go: 'child:' + c.id });
      log(`رفض "${w.title}" (${c.name})`); save(); rerender();
    },
    fwd: () => { const r = S.requests.find(x => x.id === d.id); r.status = 'sent'; log(`إرسال طلب ${kid(r.child)?.name} إلى ${opp(r.opp).org}`); save(); rerender(); },
    reset: () => { localStorage.removeItem(KEY); S = seed(); stack = []; route = { n: 'welcome' }; ui = {}; render(true); },
    noop: () => toast('غير مفعّل في النموذج الأولي'),
    lang: () => setLang(d.v),
  };
  if (d.action === 'view') return openViewer(d);
  A[d.action]?.();
});

$app.addEventListener('input', e => {
  const el = e.target, d = el.dataset;
  if (e.isComposing) return;
  if (d.bind) { ui.f[d.bind] = el.type === 'checkbox' ? el.checked : el.type === 'range' ? +el.value : el.value;
    if (el.type === 'range') { const l = $app.querySelector('#age-lbl'); if (l) l.textContent = el.value + ' سنوات'; return; }
    if (el.type === 'checkbox') return rerender();
    // keep focus while typing: update only the primary button's disabled state
    const before = document.activeElement === el; const pos = el.selectionStart;
    rerender(); if (before) { const n = $app.querySelector(`[data-bind="${d.bind}"]`); n.focus(); try { n.setSelectionRange(pos, pos); } catch {} }
  }
  if (d.bindUi) { ui[d.bindUi] = el.value; const pos = el.selectionStart; rerender(); const n = $app.querySelector(`[data-bind-ui="${d.bindUi}"]`); n.focus(); n.setSelectionRange(pos, pos); }
});
$app.addEventListener('change', e => {
  const el = e.target, d = el.dataset;
  if (d.bind && el.type === 'range') return rerender();
  if ('file' in d && el.files[0]) { const fl = el.files[0]; ui.f.file = fl.name;
    if (/^(image|video)\//.test(fl.type)) ui.blob = { url: URL.createObjectURL(fl), kind: fl.type.split('/')[0] }; if (!ui.f.title) ui.f.title = el.files[0].name.replace(/\.[^.]+$/, ''); rerender(); }
  if (d.uiCheck) { ui[d.uiCheck] = el.checked; rerender(); }
  if (d.pref) { S.prefs[d.pref] = el.checked; save(); }
  if (d.parent) { S.parent[d.parent] = el.value; save(); toast('حُفظت التغييرات'); }
  if (d.consent) {
    const c = kid(route.id); c.consents[d.consent] = el.checked;
    if (d.consent === 'publish' && !el.checked) c.visibility = 'private';
    if (d.consent === 'profile' && !el.checked) { ui.sheet = 'del'; }
    save(); rerender();
  }
});
document.querySelector('.side-reset')?.addEventListener('click', () => { localStorage.removeItem(KEY); S = seed(); stack = []; route = { n: 'welcome' }; ui = {}; render(true); });

render(true);
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
