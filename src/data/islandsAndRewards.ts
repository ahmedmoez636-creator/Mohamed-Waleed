import { BadgeDef, CompanionCharacter, GameMeta, IslandInfo, MysteryRewardItem } from '../types/app';
import appLogoImg from '../assets/images/mohammed_cartoon_logo_1794577980634.jpg';
import worldBackdropImg from '../assets/images/welcome_hero_world_1794577805752.jpg';
import mohammedCharImg from '../assets/images/mohammed_character_portrait_1794577979823.jpg';
import hudhudCharImg from '../assets/images/char_mascot_owl_1794577806594.jpg';
import roboCharImg from '../assets/images/char_mascot_robot_1794577806992.jpg';
import simsimCharImg from '../assets/images/char_mascot_lion_1794577807806.jpg';

export const APP_LOGO_IMAGE = appLogoImg;
export const WORLD_BACKDROP_IMAGE = worldBackdropImg;

export const COMPANION_CHARACTERS: CompanionCharacter[] = [
  {
    id: 'mohammed',
    name: 'محمد المستكشف',
    role: 'بطل المغامرة الرئيسي',
    image: mohammedCharImg,
    unlockStars: 0,
    greeting: 'أنا محمد وليد هيكل! مستعد نكتشف الجزر مع بعض؟',
  },
  {
    id: 'hudhud',
    name: 'هدهد الذكي',
    role: 'رفيق الحروف والقصص',
    image: hudhudCharImg,
    unlockStars: 15,
    greeting: 'أهلاً يا محمد! كل حرف جديد يفتح لنا حكاية ممتعة!',
  },
  {
    id: 'robo',
    name: 'روبو العبقري',
    role: 'صديق الأرقام والألغاز',
    image: roboCharImg,
    unlockStars: 35,
    greeting: 'بيب بوب! أنا روبو، هيا نحل الألغاز ونجمع النجوم يا محمد!',
  },
  {
    id: 'simsim',
    name: 'سمسم الشجاع',
    role: 'حارس جزيرة الحيوانات',
    image: simsimCharImg,
    unlockStars: 60,
    greeting: 'رور! أنا سمسم الأسد الصغير، هيا ننطلق في مغامرة جديدة!',
  },
];

export const ISLANDS: IslandInfo[] = [
  {
    id: 'letters',
    title: 'جزيرة الحروف',
    subtitle: 'الحروف العربية والقراءة والكتابة',
    description: 'تعلّم الحروف أ–ي، تتبّع كتابتها بالرسم، وركّب كلمات وجمل قصيرة.',
    requiredStars: 0,
    accentColor: 'text-amber-700',
    bgGradient: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-300',
    subject: 'arabic',
    featuredGames: ['letter-catcher', 'word-builder', 'choose-word', 'missing-letter', 'order-letters'],
    mapPosition: { top: '52%', left: '56%' },
  },
  {
    id: 'numbers',
    title: 'جزيرة الأرقام',
    subtitle: 'العد 1–100 والجمع والطرح والأشكال',
    description: 'اكتشف الأرقام والأشكال الهندسية وحل تحديات الجمع والطرح بالصور.',
    requiredStars: 0,
    accentColor: 'text-sky-700',
    bgGradient: 'from-sky-400 to-blue-600',
    borderColor: 'border-sky-300',
    subject: 'math',
    featuredGames: ['number-challenge', 'add-subtract', 'complete-pattern'],
    mapPosition: { top: '26%', left: '49%' },
  },
  {
    id: 'english',
    title: 'جزيرة اللغة الإنجليزية',
    subtitle: 'الحروف A–Z والفونكس وكلمات CVC',
    description: 'اسمع أصوات الحروف الإنجليزية وتعلّم الألوان والحيوانات وكلمات جديدة.',
    requiredStars: 0,
    accentColor: 'text-indigo-700',
    bgGradient: 'from-indigo-400 to-violet-600',
    borderColor: 'border-indigo-300',
    subject: 'english',
    featuredGames: ['match-picture-word', 'order-letters'],
    mapPosition: { top: '34%', left: '16%' },
  },
  {
    id: 'animals',
    title: 'جزيرة الحيوانات',
    subtitle: 'الحيوانات وأصواتها والطبيعة',
    description: 'تعرّف على الحيوانات وأصواتها والفواكه والبيئة من حولنا.',
    requiredStars: 0,
    accentColor: 'text-emerald-700',
    bgGradient: 'from-emerald-400 to-teal-600',
    borderColor: 'border-emerald-300',
    subject: 'knowledge',
    featuredGames: ['guess-animal', 'coloring', 'odd-one-out'],
    mapPosition: { top: '68%', left: '22%' },
  },
  {
    id: 'puzzles',
    title: 'جزيرة الألغاز',
    subtitle: 'الذاكرة والمتاهة والاختلافات والبازل',
    description: 'شغّل ذكاءك مع ألعاب التركيب والذاكرة والاختلافات والسرعة.',
    requiredStars: 0,
    accentColor: 'text-rose-700',
    bgGradient: 'from-rose-400 to-pink-600',
    borderColor: 'border-rose-300',
    subject: 'reading',
    featuredGames: ['memory-match', 'spot-differences', 'jigsaw-puzzle', 'maze', 'speed-observation'],
    mapPosition: { top: '42%', left: '34%' },
  },
  {
    id: 'adventures',
    title: 'جزيرة المغامرات',
    subtitle: 'الفضاء والمواصلات والكنز والمعلومات',
    description: 'انطلق بالصاروخ في الفضاء وابحث عن الكنز ورتّب الأحداث.',
    requiredStars: 0,
    accentColor: 'text-cyan-700',
    bgGradient: 'from-cyan-500 to-sky-700',
    borderColor: 'border-cyan-300',
    subject: 'knowledge',
    featuredGames: ['treasure-hunt', 'sequence-order', 'adventure-quiz'],
    mapPosition: { top: '62%', left: '82%' },
  },
];

export const ALL_GAMES: GameMeta[] = [
  { id: 'letter-catcher', number: 1, title: 'صائد الحروف', description: 'التقط الفقاعات التي تحمل الحرف المطلوب!', island: 'letters', skillKey: 'arabic', emoji: '🫧', colorClass: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'word-builder', number: 2, title: 'تركيب الكلمات', description: 'رتّب الحروف لتكوين الكلمة المناسبة للصورة.', island: 'letters', skillKey: 'reading', emoji: '🧩', colorClass: 'bg-orange-50 border-orange-200 text-orange-900' },
  { id: 'choose-word', number: 3, title: 'اختر الكلمة الصحيحة', description: 'شاهد الصورة واسمع الصوت واختر الكلمة الصح.', island: 'letters', skillKey: 'reading', emoji: '📖', colorClass: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
  { id: 'missing-letter', number: 4, title: 'أكمل الكلمة الناقصة', description: 'اختر الحرف الناقص لإكمال الكلمة.', island: 'letters', skillKey: 'arabic', emoji: '✏️', colorClass: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'number-challenge', number: 5, title: 'تحدي الأرقام', description: 'عدّ العناصر واختر الرقم الأكبر أو الصحيح.', island: 'numbers', skillKey: 'math', emoji: '🔢', colorClass: 'bg-sky-50 border-sky-200 text-sky-900' },
  { id: 'add-subtract', number: 6, title: 'لعبة الجمع والطرح', description: 'اجمع واطرح بالصور الممتعة واربح النجوم.', island: 'numbers', skillKey: 'math', emoji: '➕', colorClass: 'bg-blue-50 border-blue-200 text-blue-900' },
  { id: 'odd-one-out', number: 7, title: 'اكتشف الشكل المختلف', description: 'ابحث عن الشكل المختلف بين ٤ صور.', island: 'animals', skillKey: 'knowledge', emoji: '🔍', colorClass: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { id: 'memory-match', number: 8, title: 'لعبة الذاكرة', description: 'اقلب البطاقات وطابق كل صورتين متشابهتين.', island: 'puzzles', skillKey: 'english', emoji: '🃏', colorClass: 'bg-rose-50 border-rose-200 text-rose-900' },
  { id: 'spot-differences', number: 9, title: 'اكتشف الاختلافات', description: 'دقّق النظر واكتشف الاختلافات بين اللوحتين.', island: 'puzzles', skillKey: 'knowledge', emoji: '👀', colorClass: 'bg-pink-50 border-pink-200 text-pink-900' },
  { id: 'jigsaw-puzzle', number: 10, title: 'تركيب الصور Puzzle', description: 'حرّك وبدّل القطع لتكتمل اللوحة الجميلة.', island: 'puzzles', skillKey: 'math', emoji: '🖼️', colorClass: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-900' },
  { id: 'maze', number: 11, title: 'المتاهة', description: 'ساعد محمد في الوصول إلى صندوق الكنز.', island: 'puzzles', skillKey: 'math', emoji: '🧭', colorClass: 'bg-violet-50 border-violet-200 text-violet-900' },
  { id: 'sequence-order', number: 12, title: 'ترتيب الأحداث', description: 'رتّب خطوات القصة من البداية إلى النهاية.', island: 'adventures', skillKey: 'reading', emoji: '🌱', colorClass: 'bg-teal-50 border-teal-200 text-teal-900' },
  { id: 'guess-animal', number: 13, title: 'اكتشف الحيوان من صوته', description: 'اسمع الصوت وخمّن من هو الحيوان الصديق.', island: 'animals', skillKey: 'knowledge', emoji: '🔊', colorClass: 'bg-lime-50 border-lime-200 text-lime-900' },
  { id: 'match-picture-word', number: 14, title: 'صل الصورة بالكلمة', description: 'طابق الصور الجميلة مع الكلمة الصحيحة.', island: 'english', skillKey: 'english', emoji: '🔗', colorClass: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
  { id: 'coloring', number: 15, title: 'تلوين الصور', description: 'لوّن الصاروخ والأسد والفراشة بألوانك المفضلة.', island: 'animals', skillKey: 'knowledge', emoji: '🎨', colorClass: 'bg-amber-50 border-amber-200 text-amber-900' },
  { id: 'treasure-hunt', number: 16, title: 'البحث عن الكنز', description: 'اتبع الاتجاهات على خريطة الجزيرة للعثور على الكنز.', island: 'adventures', skillKey: 'knowledge', emoji: '🏴‍☠️', colorClass: 'bg-cyan-50 border-cyan-200 text-cyan-900' },
  { id: 'order-letters', number: 17, title: 'ترتيب الحروف', description: 'رتّب الحروف العربية أو الإنجليزية بالترتيب الصحيح.', island: 'letters', skillKey: 'arabic', emoji: '🔤', colorClass: 'bg-orange-50 border-orange-200 text-orange-900' },
  { id: 'speed-observation', number: 18, title: 'تحدي سرعة الملاحظة', description: 'اعثر على كل الأشكال المطلوبة بسرعة وتركيز.', island: 'puzzles', skillKey: 'math', emoji: '⚡', colorClass: 'bg-yellow-50 border-yellow-200 text-yellow-900' },
  { id: 'complete-pattern', number: 19, title: 'أكمل النمط', description: 'اكتشف القاعدة وأكمل النمط بالألوان والأرقام.', island: 'numbers', skillKey: 'math', emoji: '🔁', colorClass: 'bg-sky-50 border-sky-200 text-sky-900' },
  { id: 'adventure-quiz', number: 20, title: 'مغامرة الأسئلة والمعلومات', description: 'رحلة أسئلة ممتعة في الفضاء والمهن والطبيعة.', island: 'adventures', skillKey: 'knowledge', emoji: '🚀', colorClass: 'bg-cyan-50 border-cyan-200 text-cyan-900' },
];

export const BADGES: BadgeDef[] = [
  { id: 'first-star', title: 'بداية البطل', description: 'جمع أول ٥ نجوم في عالم المغامرات', emoji: '🌟', conditionLabel: '٥ نجوم' },
  { id: 'letter-hero', title: 'صديق الحروف', description: 'تعلّم ٣ حروف أو أكمل لعبة حروف', emoji: '✏️', conditionLabel: 'قسم الحروف' },
  { id: 'math-wizard', title: 'عبقري الأرقام', description: 'تألّق في تحديات الأرقام والجمع', emoji: '🧮', conditionLabel: 'قسم الرياضيات' },
  { id: 'english-star', title: 'نجم الإنجليزية', description: 'أكمل نشاطًا في جزيرة اللغة الإنجليزية', emoji: '🅰️', conditionLabel: 'اللغة الإنجليزية' },
  { id: 'explorer-10', title: 'مستكشف نشيط', description: 'لعب ٥ ألعاب تعليمية مختلفة', emoji: '🧭', conditionLabel: '٥ ألعاب' },
  { id: 'super-mohammed', title: 'وسام محمد الذهبي', description: 'وصل إلى ٥٠ نجمة ذهبية', emoji: '🏆', conditionLabel: '٥٠ نجمة' },
];

export const MYSTERY_REWARDS: MysteryRewardItem[] = [
  { id: 'sticker-rocket', title: 'ملصق الصاروخ الفضائي', emoji: '🚀', message: 'هدية رائعة لرحلتك بين الكواكب يا محمد!' },
  { id: 'sticker-dino', title: 'ملصق الديناصور اللطيف', emoji: '🦕', message: 'صديق جديد ينضم لمجموعتك!' },
  { id: 'sticker-crown', title: 'تاج البطل الذهبي', emoji: '👑', message: 'تاج التميز لمحمد وليد هيكل!' },
  { id: 'sticker-trophy', title: 'كأس القراءة والذكاء', emoji: '🏆', message: 'لأنك ذكي ومثابر كل يوم!' },
  { id: 'sticker-rainbow', title: 'قوس قزح السعادة', emoji: '🌈', message: 'ألوان جميلة تضيف البهجة لعالمك!' },
  { id: 'sticker-medal', title: 'ميدالية المستكشف الصغير', emoji: '🎖️', message: 'مبروك يا بطل! استمر في التألق!' },
];

export const LEVEL_TITLES = [
  'مستكشف صغير',
  'باحث عن النجوم',
  'صديق الحروف',
  'فارس الأرقام',
  'بطل القراءة',
  'عالم الفضاء',
  'عبقري الألغاز',
  'قائد الجزيرة',
  'نجم المعرفة',
  'البطل الأسطوري',
];

export function getLevelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(Math.max(level - 1, 0), LEVEL_TITLES.length - 1)];
}
