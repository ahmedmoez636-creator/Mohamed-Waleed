export interface ArabicLetterItem {
  letter: string;
  name: string;
  soundHint: string;
  word: string;
  emoji: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  similarGroup: string[];
}

export const ARABIC_LETTERS: ArabicLetterItem[] = [
  { letter: 'أ', name: 'ألف', soundHint: 'أَ مثل أَسَد', word: 'أَسَد', emoji: '🦁', forms: { isolated: 'أ', initial: 'أَ', medial: 'ـأ', final: 'ـأ' }, similarGroup: ['أ', 'إ', 'آ'] },
  { letter: 'ب', name: 'باء', soundHint: 'بَ مثل بَطَّة', word: 'بَطَّة', emoji: '🦆', forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' }, similarGroup: ['ب', 'ت', 'ث'] },
  { letter: 'ت', name: 'تاء', soundHint: 'تُ مثل تُفَّاح', word: 'تُفَّاح', emoji: '🍎', forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' }, similarGroup: ['ب', 'ت', 'ث'] },
  { letter: 'ث', name: 'ثاء', soundHint: 'ثَ مثل ثَعْلَب', word: 'ثَعْلَب', emoji: '🦊', forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' }, similarGroup: ['ب', 'ت', 'ث'] },
  { letter: 'ج', name: 'جيم', soundHint: 'جَ مثل جَمَل', word: 'جَمَل', emoji: '🐪', forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' }, similarGroup: ['ج', 'ح', 'خ'] },
  { letter: 'ح', name: 'حاء', soundHint: 'حِ مثل حِصَان', word: 'حِصَان', emoji: '🐴', forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' }, similarGroup: ['ج', 'ح', 'خ'] },
  { letter: 'خ', name: 'خاء', soundHint: 'خَ مثل خَرُوف', word: 'خَرُوف', emoji: '🐑', forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' }, similarGroup: ['ج', 'ح', 'خ'] },
  { letter: 'د', name: 'دال', soundHint: 'دُ مثل دُبّ', word: 'دُبّ', emoji: '🐻', forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' }, similarGroup: ['د', 'ذ'] },
  { letter: 'ذ', name: 'ذال', soundHint: 'ذُ مثل ذُرَة', word: 'ذُرَة', emoji: '🌽', forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' }, similarGroup: ['د', 'ذ'] },
  { letter: 'ر', name: 'راء', soundHint: 'رُ مثل رُمَّان', word: 'رُمَّان', emoji: '🫐', forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' }, similarGroup: ['ر', 'ز'] },
  { letter: 'ز', name: 'زاي', soundHint: 'زَ مثل زَرَافَة', word: 'زَرَافَة', emoji: '🦒', forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' }, similarGroup: ['ر', 'ز'] },
  { letter: 'س', name: 'سين', soundHint: 'سَ مثل سَمَكَة', word: 'سَمَكَة', emoji: '🐟', forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' }, similarGroup: ['س', 'ش'] },
  { letter: 'ش', name: 'شين', soundHint: 'شَ مثل شَمْس', word: 'شَمْس', emoji: '☀️', forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' }, similarGroup: ['س', 'ش'] },
  { letter: 'ص', name: 'صاد', soundHint: 'صَ مثل صَارُوخ', word: 'صَارُوخ', emoji: '🚀', forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' }, similarGroup: ['ص', 'ض'] },
  { letter: 'ض', name: 'ضاد', soundHint: 'ضِ مثل ضِفْدَع', word: 'ضِفْدَع', emoji: '🐸', forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' }, similarGroup: ['ص', 'ض'] },
  { letter: 'ط', name: 'طاء', soundHint: 'طَ مثل طَائِرَة', word: 'طَائِرَة', emoji: '✈️', forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' }, similarGroup: ['ط', 'ظ'] },
  { letter: 'ظ', name: 'ظاء', soundHint: 'ظَ مثل ظَرْف', word: 'ظَرْف', emoji: '✉️', forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' }, similarGroup: ['ط', 'ظ'] },
  { letter: 'ع', name: 'عين', soundHint: 'عِ مثل عِنَب', word: 'عِنَب', emoji: '🍇', forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' }, similarGroup: ['ع', 'غ'] },
  { letter: 'غ', name: 'غين', soundHint: 'غَ مثل غَزَال', word: 'غَزَال', emoji: '🦌', forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' }, similarGroup: ['ع', 'غ'] },
  { letter: 'ف', name: 'فاء', soundHint: 'فِ مثل فِيل', word: 'فِيل', emoji: '🐘', forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' }, similarGroup: ['ف', 'ق'] },
  { letter: 'ق', name: 'قاف', soundHint: 'قَ مثل قَمَر', word: 'قَمَر', emoji: '🌙', forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' }, similarGroup: ['ف', 'ق'] },
  { letter: 'ك', name: 'كاف', soundHint: 'كَ مثل كَلْب', word: 'كَلب', emoji: '🐶', forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' }, similarGroup: ['ك', 'ل'] },
  { letter: 'ل', name: 'لام', soundHint: 'لَ مثل لَيْمُون', word: 'لَيْمُون', emoji: '🍋', forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' }, similarGroup: ['ك', 'ل'] },
  { letter: 'م', name: 'ميم', soundHint: 'مَ مثل مَوْز', word: 'مَوْز', emoji: '🍌', forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' }, similarGroup: ['م', 'هـ'] },
  { letter: 'ن', name: 'نون', soundHint: 'نَ مثل نَجْمَة', word: 'نَجْمَة', emoji: '⭐', forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' }, similarGroup: ['ب', 'ت', 'ن'] },
  { letter: 'هـ', name: 'هاء', soundHint: 'هِ مثل هِلَال', word: 'هِلَال', emoji: '🌙', forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' }, similarGroup: ['هـ', 'ة'] },
  { letter: 'و', name: 'واو', soundHint: 'وَ مثل وَرْدَة', word: 'وَرْدَة', emoji: '🌹', forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' }, similarGroup: ['و', 'ر'] },
  { letter: 'ي', name: 'ياء', soundHint: 'يَ مثل يَد', word: 'يَد', emoji: '✋', forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' }, similarGroup: ['ب', 'ت', 'ي'] },
];

export interface ReadingWord {
  word: string;
  letters: string[];
  emoji: string;
  missingIndex: number;
  syllables: string[];
}

export const READING_WORDS: ReadingWord[] = [
  { word: 'أسد', letters: ['أ', 'س', 'د'], emoji: '🦁', missingIndex: 1, syllables: ['أَ', 'سَ', 'د'] },
  { word: 'بطة', letters: ['ب', 'ط', 'ة'], emoji: '🦆', missingIndex: 0, syllables: ['بَطْ', 'طَة'] },
  { word: 'قمر', letters: ['ق', 'م', 'ر'], emoji: '🌙', missingIndex: 1, syllables: ['قَ', 'مَ', 'ر'] },
  { word: 'شمس', letters: ['ش', 'م', 'س'], emoji: '☀️', missingIndex: 0, syllables: ['شَمْ', 'س'] },
  { word: 'جمل', letters: ['ج', 'م', 'ل'], emoji: '🐪', missingIndex: 2, syllables: ['جَ', 'مَ', 'ل'] },
  { word: 'بيت', letters: ['ب', 'ي', 'ت'], emoji: '🏠', missingIndex: 1, syllables: ['بَيْ', 'ت'] },
  { word: 'فيل', letters: ['ف', 'ي', 'ل'], emoji: '🐘', missingIndex: 0, syllables: ['فِي', 'ل'] },
  { word: 'موز', letters: ['م', 'و', 'ز'], emoji: '🍌', missingIndex: 1, syllables: ['مَوْ', 'ز'] },
  { word: 'سمك', letters: ['س', 'م', 'ك'], emoji: '🐟', missingIndex: 2, syllables: ['سَ', 'مَ', 'ك'] },
  { word: 'قطة', letters: ['ق', 'ط', 'ة'], emoji: '🐱', missingIndex: 1, syllables: ['قِطْ', 'طَة'] },
  { word: 'ورد', letters: ['و', 'ر', 'د'], emoji: '🌹', missingIndex: 1, syllables: ['وَرْ', 'د'] },
  { word: 'كتاب', letters: ['ك', 'ت', 'ا', 'ب'], emoji: '📖', missingIndex: 2, syllables: ['كِ', 'تَا', 'ب'] },
];

export interface ShortSentence {
  id: string;
  text: string;
  emoji: string;
  parts: { word: string; emoji: string }[];
}

export const SHORT_SENTENCES: ShortSentence[] = [
  {
    id: 's1',
    text: 'مُحَمَّد يَقْرَأُ كِتَابًا',
    emoji: '👦📖',
    parts: [
      { word: 'مُحَمَّد', emoji: '👦' },
      { word: 'يَقْرَأُ', emoji: '👀' },
      { word: 'كِتَابًا', emoji: '📖' },
    ],
  },
  {
    id: 's2',
    text: 'الشَّمْسُ سَاطِعَةٌ فِي السَّمَاءِ',
    emoji: '☀️☁️',
    parts: [
      { word: 'الشَّمْسُ', emoji: '☀️' },
      { word: 'سَاطِعَةٌ', emoji: '✨' },
      { word: 'فِي السَّمَاءِ', emoji: '☁️' },
    ],
  },
  {
    id: 's3',
    text: 'القِطَّةُ تَشْرَبُ الحَلِيبَ',
    emoji: '🐱🥛',
    parts: [
      { word: 'القِطَّةُ', emoji: '🐱' },
      { word: 'تَشْرَبُ', emoji: '😋' },
      { word: 'الحَلِيبَ', emoji: '🥛' },
    ],
  },
  {
    id: 's4',
    text: 'أَحْمَدُ يَأْكُلُ تُفَّاحَةً حَمْرَاءَ',
    emoji: '👦🍎',
    parts: [
      { word: 'الوَلَدُ', emoji: '👦' },
      { word: 'يَأْكُلُ', emoji: '🍽️' },
      { word: 'تُفَّاحَةً', emoji: '🍎' },
    ],
  },
];

export const MATH_SHAPES = [
  { id: 'circle', name: 'دائرة', sides: 'بدون أضلاع', color: '#0284c7', emoji: '🔵', fact: 'الدائرة مدورة مثل الشمس والكرة!' },
  { id: 'square', name: 'مربع', sides: '٤ أضلاع متساوية', color: '#059669', emoji: '🟩', fact: 'المربع له ٤ أضلاع كلها قد بعض!' },
  { id: 'triangle', name: 'مثلث', sides: '٣ أضلاع', color: '#f59e0b', emoji: '🔺', fact: 'المثلث له ٣ أضلاع مثل الهرم!' },
  { id: 'rectangle', name: 'مستطيل', sides: '٤ أضلاع', color: '#7c3aed', emoji: '🟪', fact: 'المستطيل يشبه الباب والكتاب!' },
  { id: 'star', name: 'نجمة', sides: '٥ رؤوس لامعة', color: '#eab308', emoji: '⭐', fact: 'النجمة تلمع في السماء مثل نجوم محمد!' },
  { id: 'diamond', name: 'معين', sides: '٤ أضلاع مائلة', color: '#ec4899', emoji: '🔶', fact: 'المعين يشبه الطائرة الورقية الجميلة!' },
];

export const MATH_STORY_PROBLEMS = [
  { id: 'mp1', story: 'مع محمد ٣ تفاحات 🍎🍎🍎 وأعطته ماما ٢ تفاحتين 🍎🍎. كم تفاحة مع محمد الآن؟', answer: 5, options: [4, 5, 6] },
  { id: 'mp2', story: 'في الحديقة ٦ عصافير 🐦، طار منها ٢ عصفورين. كم عصفورًا بقي على الشجرة؟', answer: 4, options: [3, 4, 5] },
  { id: 'mp3', story: 'اشترى محمد ٤ سيارات ألعاب 🚗 وأهداه بابا ٤ سيارات أخرى. كم سيارة معه؟', answer: 8, options: [7, 8, 9] },
  { id: 'mp4', story: 'على الطاولة ٧ موزات 🍌، أكل محمد ٣ موزات. كم موزة بقيت؟', answer: 4, options: [3, 4, 5] },
  { id: 'mp5', story: 'جمع محمد ٥ نجوم ذهبية ⭐ ثم ربح ٥ نجوم أخرى. ما مجموع النجوم؟', answer: 10, options: [9, 10, 11] },
];

export interface EnglishLetterItem {
  upper: string;
  lower: string;
  phonics: string;
  word: string;
  arabicWord: string;
  emoji: string;
}

export const ENGLISH_LETTERS: EnglishLetterItem[] = [
  { upper: 'A', lower: 'a', phonics: 'أه /æ/', word: 'Apple', arabicWord: 'تفاحة', emoji: '🍎' },
  { upper: 'B', lower: 'b', phonics: 'بْ /b/', word: 'Ball', arabicWord: 'كرة', emoji: '⚽' },
  { upper: 'C', lower: 'c', phonics: 'كْ /k/', word: 'Cat', arabicWord: 'قطة', emoji: '🐱' },
  { upper: 'D', lower: 'd', phonics: 'دْ /d/', word: 'Dog', arabicWord: 'كلب', emoji: '🐶' },
  { upper: 'E', lower: 'e', phonics: 'إيه /e/', word: 'Elephant', arabicWord: 'فيل', emoji: '🐘' },
  { upper: 'F', lower: 'f', phonics: 'فْ /f/', word: 'Fish', arabicWord: 'سمكة', emoji: '🐟' },
  { upper: 'G', lower: 'g', phonics: 'جْ /g/', word: 'Giraffe', arabicWord: 'زرافة', emoji: '🦒' },
  { upper: 'H', lower: 'h', phonics: 'هـْ /h/', word: 'Hat', arabicWord: 'قبعة', emoji: '👒' },
  { upper: 'I', lower: 'i', phonics: 'إي /ɪ/', word: 'Ice Cream', arabicWord: 'آيس كريم', emoji: '🍦' },
  { upper: 'J', lower: 'j', phonics: 'دجْ /dʒ/', word: 'Juice', arabicWord: 'عصير', emoji: '🧃' },
  { upper: 'K', lower: 'k', phonics: 'كْ /k/', word: 'Kite', arabicWord: 'طائرة ورقية', emoji: '🪁' },
  { upper: 'L', lower: 'l', phonics: 'لْ /l/', word: 'Lion', arabicWord: 'أسد', emoji: '🦁' },
  { upper: 'M', lower: 'm', phonics: 'مْ /m/', word: 'Moon', arabicWord: 'قمر', emoji: '🌙' },
  { upper: 'N', lower: 'n', phonics: 'نْ /n/', word: 'Nest', arabicWord: 'عش', emoji: '🪺' },
  { upper: 'O', lower: 'o', phonics: 'أو /ɒ/', word: 'Orange', arabicWord: 'برتقالة', emoji: '🍊' },
  { upper: 'P', lower: 'p', phonics: 'پْ /p/', word: 'Penguin', arabicWord: 'بطريق', emoji: '🐧' },
  { upper: 'Q', lower: 'q', phonics: 'كْو /kw/', word: 'Queen', arabicWord: 'ملكة', emoji: '👑' },
  { upper: 'R', lower: 'r', phonics: 'رْ /r/', word: 'Rocket', arabicWord: 'صاروخ', emoji: '🚀' },
  { upper: 'S', lower: 's', phonics: 'سْ /s/', word: 'Sun', arabicWord: 'شمس', emoji: '☀️' },
  { upper: 'T', lower: 't', phonics: 'تْ /t/', word: 'Tiger', arabicWord: 'نمر', emoji: '🐯' },
  { upper: 'U', lower: 'u', phonics: 'أَ /ʌ/', word: 'Umbrella', arabicWord: 'مظلة', emoji: '☂️' },
  { upper: 'V', lower: 'v', phonics: 'ڤْ /v/', word: 'Van', arabicWord: 'شاحنة', emoji: '🚐' },
  { upper: 'W', lower: 'w', phonics: 'وْ /w/', word: 'Whale', arabicWord: 'حوت', emoji: '🐋' },
  { upper: 'X', lower: 'x', phonics: 'كْس /ks/', word: 'Xylophone', arabicWord: 'إكسليفون', emoji: '🎵' },
  { upper: 'Y', lower: 'y', phonics: 'يْ /j/', word: 'Yellow', arabicWord: 'أصفر', emoji: '💛' },
  { upper: 'Z', lower: 'z', phonics: 'زْ /z/', word: 'Zebra', arabicWord: 'حمار وحشي', emoji: '🦓' },
];

export const ENGLISH_COLORS = [
  { word: 'Red', arabic: 'أحمر', hex: '#ef4444' },
  { word: 'Blue', arabic: 'أزرق', hex: '#3b82f6' },
  { word: 'Green', arabic: 'أخضر', hex: '#22c55e' },
  { word: 'Yellow', arabic: 'أصفر', hex: '#eab308' },
  { word: 'Orange', arabic: 'برتقالي', hex: '#f97316' },
  { word: 'Purple', arabic: 'بنفسجي', hex: '#a855f7' },
  { word: 'Pink', arabic: 'وردي', hex: '#ec4899' },
  { word: 'Brown', arabic: 'بني', hex: '#92400e' },
];

export const ENGLISH_CVC_WORDS = [
  { word: 'CAT', arabic: 'قطة', emoji: '🐱', letters: ['C', 'A', 'T'] },
  { word: 'DOG', arabic: 'كلب', emoji: '🐶', letters: ['D', 'O', 'G'] },
  { word: 'SUN', arabic: 'شمس', emoji: '☀️', letters: ['S', 'U', 'N'] },
  { word: 'HAT', arabic: 'قبعة', emoji: '👒', letters: ['H', 'A', 'T'] },
  { word: 'PEN', arabic: 'قلم', emoji: '🖊️', letters: ['P', 'E', 'N'] },
  { word: 'CUP', arabic: 'كوب', emoji: '🥤', letters: ['C', 'U', 'P'] },
  { word: 'FOX', arabic: 'ثعلب', emoji: '🦊', letters: ['F', 'O', 'X'] },
  { word: 'BED', arabic: 'سرير', emoji: '🛏️', letters: ['B', 'E', 'D'] },
];

export interface KnowledgeTopic {
  id: string;
  title: string;
  emoji: string;
  items: {
    id: string;
    name: string;
    emoji: string;
    detail: string;
    soundText?: string;
    animalId?: string;
  }[];
}

export const GENERAL_KNOWLEDGE_TOPICS: KnowledgeTopic[] = [
  {
    id: 'animals',
    title: 'الحيوانات وأصواتها',
    emoji: '🦁',
    items: [
      { id: 'lion', animalId: 'lion', name: 'الأسد', emoji: '🦁', soundText: 'زئير: غرررر!', detail: 'ملك الغابة القوي، صوته يُسمى زئير.' },
      { id: 'cat', animalId: 'cat', name: 'القطة', emoji: '🐱', soundText: 'مواء: مياو مياو!', detail: 'حيوان أليف لطيف يحب اللعب وصوته مواء.' },
      { id: 'dog', animalId: 'dog', name: 'الكلب', emoji: '🐶', soundText: 'نباح: هو هو!', detail: 'صديق وفيّ يحرس البيت وصوته نباح.' },
      { id: 'cow', animalId: 'cow', name: 'البقرة', emoji: '🐄', soundText: 'خوار: مووو!', detail: 'تعطينا الحليب المفيد لصحة أجسامنا.' },
      { id: 'rooster', animalId: 'rooster', name: 'الديك', emoji: '🐓', soundText: 'صياح: كوكوكو!', detail: 'يوقظنا في الصباح الباكر بصوته الجميل.' },
      { id: 'sheep', animalId: 'sheep', name: 'الخروف', emoji: '🐑', soundText: 'ثغاء: ماء ماء!', detail: 'يعطينا الصوف الدافئ.' },
      { id: 'duck', animalId: 'duck', name: 'البطة', emoji: '🦆', soundText: 'بطبطة: كواك كواك!', detail: 'تحب السباحة في الماء وصوتها كواك.' },
      { id: 'frog', animalId: 'frog', name: 'الضفدع', emoji: '🐸', soundText: 'نقيق: نق نق!', detail: 'يقفز عاليًا ويعيش قرب الماء.' },
    ],
  },
  {
    id: 'body',
    title: 'جسم الإنسان',
    emoji: '🧒',
    items: [
      { id: 'eye', name: 'العين', emoji: '👁️', detail: 'نرى بها الألوان والصور والكتب الجميلة.' },
      { id: 'ear', name: 'الأذن', emoji: '👂', detail: 'نسمع بها الأصوات والكلمات والموسيقى.' },
      { id: 'nose', name: 'الأنف', emoji: '👃', detail: 'نشم به روائح الورد والطعام اللذيذ.' },
      { id: 'mouth', name: 'الفم', emoji: '👄', detail: 'نتحدث به ونأكل ونبتسم.' },
      { id: 'hand', name: 'اليد', emoji: '✋', detail: 'نكتب ونرسم ونسلم بها على أصدقائنا.' },
      { id: 'heart', name: 'القلب', emoji: '❤️', detail: 'يضخ الدم في كل جسمنا ليعطينا الطاقة.' },
    ],
  },
  {
    id: 'fruits',
    title: 'الفواكه والخضراوات',
    emoji: '🍓',
    items: [
      { id: 'apple', name: 'تفاح', emoji: '🍎', detail: 'فاكهة مقرمشة لذيذة تقوي الجسم.' },
      { id: 'banana', name: 'موز', emoji: '🍌', detail: 'فاكهة صفراء حلوة تعطي محمد طاقة للعب.' },
      { id: 'strawberry', name: 'فراولة', emoji: '🍓', detail: 'فاكهة حمراء جميلة مليئة بالفيتامينات.' },
      { id: 'watermelon', name: 'بطيخ', emoji: '🍉', detail: 'فاكهة الصيف المنعشة والمليئة بالماء.' },
      { id: 'carrot', name: 'جزر', emoji: '🥕', detail: 'خضار برتقالي مفيد جدًا لصحة العينين.' },
      { id: 'tomato', name: 'طماطم', emoji: '🍅', detail: 'خضار أحمر لذيذ يدخل في أطباق الطعام.' },
    ],
  },
  {
    id: 'transport',
    title: 'وسائل المواصلات',
    emoji: '🚀',
    items: [
      { id: 'car', name: 'سيارة', emoji: '🚗', detail: 'تسير على الطريق السريع بأربع عجلات.' },
      { id: 'plane', name: 'طائرة', emoji: '✈️', detail: 'تطير عاليًا بين السحاب لتسافر بعيدًا.' },
      { id: 'train', name: 'قطار', emoji: '🚆', detail: 'يمشي على قضبان الحديد ويحمل ركابًا كثيرين.' },
      { id: 'ship', name: 'سفينة', emoji: '🚢', detail: 'تبحر فوق أمواج البحر الواسع.' },
      { id: 'bike', name: 'دراجة', emoji: '🚲', detail: 'رياضة ممتعة تسير بالبدال وتقوي العضلات.' },
      { id: 'rocket', name: 'صاروخ', emoji: '🚀', detail: 'ينطلق إلى الفضاء بين النجوم والكواكب.' },
    ],
  },
  {
    id: 'jobs',
    title: 'المهن',
    emoji: '👩‍⚕️',
    items: [
      { id: 'doctor', name: 'الطبيب', emoji: '👨‍⚕️', detail: 'يعالج المرضى ويساعدنا لنكون بصحة جيدة.' },
      { id: 'teacher', name: 'المعلم', emoji: '👩‍🏫', detail: 'يعلمنا القراءة والكتابة والعلوم والأخلاق.' },
      { id: 'engineer', name: 'المهندس', emoji: '👷', detail: 'يصمم البيوت والجسور والألعاب الذكية.' },
      { id: 'firefighter', name: 'رجل الإطفاء', emoji: '👨‍🚒', detail: 'بطل شجاع يطفئ الحرائق وينقذ الناس.' },
      { id: 'pilot', name: 'الطيار', emoji: '👨‍✈️', detail: 'يقود الطائرة بأمان في السماء.' },
      { id: 'farmer', name: 'الفلاح', emoji: '👨‍🌾', detail: 'يزرع الأرض لنأكل الفواكه والخضار الطازج.' },
    ],
  },
  {
    id: 'space',
    title: 'الفضاء والكواكب',
    emoji: '🪐',
    items: [
      { id: 'sun', name: 'الشمس', emoji: '☀️', detail: 'نجم كبير دافئ يعطينا الضوء والدفء كل صباح.' },
      { id: 'moon', name: 'القمر', emoji: '🌙', detail: 'ينير لنا السماء ليلًا ويدور حول الأرض.' },
      { id: 'earth', name: 'كوكب الأرض', emoji: '🌍', detail: 'بيتنا الجميل الأزرق الذي نعيش عليه.' },
      { id: 'mars', name: 'المريخ', emoji: '🔴', detail: 'يُعرف بالكوكب الأحمر بسبب لون تربته.' },
      { id: 'saturn', name: 'زحل', emoji: '🪐', detail: 'كوكب مميز تدور حوله حلقات رائعة من الجليد.' },
      { id: 'astronaut', name: 'رائد الفضاء', emoji: '👨‍🚀', detail: 'يسافر بالصاروخ ليستكشف القمر والنجوم.' },
    ],
  },
  {
    id: 'nature',
    title: 'الطبيعة والبيئة',
    emoji: '🌳',
    items: [
      { id: 'tree', name: 'الشجرة', emoji: '🌳', detail: 'تعطينا الهواء النقي والظل والثمار اللذيذة.' },
      { id: 'rain', name: 'المطر', emoji: '🌧️', detail: 'يسقي الزرع والحدائق لتنمو وتزهر.' },
      { id: 'sea', name: 'البحر', emoji: '🌊', detail: 'تعيش فيه الأسماك الملونة والشعب المرجانية.' },
      { id: 'mountain', name: 'الجبل', emoji: '⛰️', detail: 'أرض عالية جدًا قممها تلامس السحاب.' },
      { id: 'rainbow', name: 'قوس قزح', emoji: '🌈', detail: 'يظهر بسبعة ألوان جميلة بعد المطر والشمس.' },
      { id: 'flower', name: 'الزهرة', emoji: '🌸', detail: 'تزين الحدائق وتزورها الفراشات والنحل.' },
    ],
  },
  {
    id: 'calendar',
    title: 'أيام الأسبوع والشهور',
    emoji: '📅',
    items: [
      { id: 'week', name: 'أيام الأسبوع (٧)', emoji: '🗓️', detail: 'السبت · الأحد · الاثنين · الثلاثاء · الأربعاء · الخميس · الجمعة' },
      { id: 'weekend', name: 'عطلة نهاية الأسبوع', emoji: '🎉', detail: 'الجمعة والسبت أيام جميلة للعب مع العائلة!' },
      { id: 'seasons', name: 'فصول السنة (٤)', emoji: '🍂', detail: 'الشتاء البارد ❄️ · الربيع المزهر 🌸 · الصيف المشمس ☀️ · الخريف 🍁' },
      { id: 'months', name: 'شهور السنة (١٢)', emoji: '📆', detail: 'يناير، فبراير، مارس، أبريل، مايو، يونيو، يوليو، أغسطس، سبتمبر، أكتوبر، نوفمبر، ديسمبر.' },
    ],
  },
];
