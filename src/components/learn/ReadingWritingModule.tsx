import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw } from 'lucide-react';
import { READING_WORDS, SHORT_SENTENCES } from '../../data/curriculum';
import { LearningSubject } from '../../types/app';
import {
  playClickSound,
  playGentleTryAgainSound,
  speakArabic,
  speakEncouragement,
} from '../../utils/sound';

interface ReadingWritingModuleProps {
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
  onLogReview: (id: string, label: string, subject: LearningSubject) => void;
}

const SYLLABLE_BASES = [
  { letter: 'ب', forms: ['بَ', 'بُ', 'بِ'] },
  { letter: 'ت', forms: ['تَ', 'تُ', 'تِ'] },
  { letter: 'س', forms: ['سَ', 'سُ', 'سِ'] },
  { letter: 'م', forms: ['مَ', 'مُ', 'مِ'] },
  { letter: 'ق', forms: ['قَ', 'قُ', 'قِ'] },
  { letter: 'ك', forms: ['كَ', 'كُ', 'كِ'] },
];

export const ReadingWritingModule: React.FC<ReadingWritingModuleProps> = ({
  onCompleteLesson,
  onLogReview,
}) => {
  const [tab, setTab] = useState<'syllables' | 'missing' | 'sentences' | 'dictation'>('syllables');
  const [wordIdx, setWordIdx] = useState(0);
  const [dictationInput, setDictationInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedSentenceParts, setSelectedSentenceParts] = useState<string[]>([]);

  const currentWord = READING_WORDS[wordIdx % READING_WORDS.length];
  const missingLetter = currentWord.letters[currentWord.missingIndex];
  const distractors = ['ب', 'م', 'س', 'ق', 'ل', 'ر'].filter((c) => c !== missingLetter).slice(0, 2);
  const missingOptions = [missingLetter, ...distractors].sort();

  const handleMissingPick = (pick: string) => {
    if (pick === missingLetter) {
      const msg = speakEncouragement();
      setFeedback(msg);
      onCompleteLesson(`reading-missing-${currentWord.word}`, 'reading', 2);
      window.setTimeout(() => {
        setFeedback(null);
        setWordIdx((i) => i + 1);
      }, 1100);
    } else {
      playGentleTryAgainSound();
      speakArabic(`حاول مرة أخرى! الكلمة هي ${currentWord.word}`);
      setFeedback(`جرّب حرفًا آخر لإكمال كلمة «${currentWord.word}»`);
      onLogReview(`reading-${currentWord.word}`, `إكمال كلمة ${currentWord.word}`, 'reading');
    }
  };

  const handleDictationCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = dictationInput.trim().replace(/[\u064B-\u0652]/g, '');
    if (cleaned === currentWord.word) {
      const msg = speakEncouragement();
      setFeedback(msg);
      onCompleteLesson(`reading-dictation-${currentWord.word}`, 'reading', 3);
      setDictationInput('');
      window.setTimeout(() => {
        setFeedback(null);
        setWordIdx((i) => i + 1);
      }, 1100);
    } else {
      playGentleTryAgainSound();
      speakArabic(`اقتربت! الكلمة هي ${currentWord.word}`);
      setFeedback(`تأكد من حروف كلمة «${currentWord.word}» وحاول مرة أخرى`);
      onLogReview(`dictation-${currentWord.word}`, `إملاء كلمة ${currentWord.word}`, 'reading');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'syllables', label: '🗣️ المقاطع والحركات' },
          { id: 'missing', label: '✏️ إكمال الحروف الناقصة' },
          { id: 'sentences', label: '📖 قراءة وتكوين جمل' },
          { id: 'dictation', label: '📝 تدريب الإملاء' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playClickSound();
              setTab(item.id as typeof tab);
              setFeedback(null);
            }}
            className={`px-4 py-3 rounded-2xl font-bold text-sm sm:text-base transition cursor-pointer min-h-[48px] ${
              tab === item.id
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'syllables' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-display text-2xl font-black text-slate-900">
              قراءة المقاطع بالفتحة والضمة والكسرة
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              اضغط على أي مقطع لتسمعه بوضوح، ثم اقرأ الكلمة المقسمة لمقاطع!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYLLABLE_BASES.map((row) => (
              <div key={row.letter} className="rounded-2xl bg-orange-50/70 border border-orange-200 p-4 space-y-3">
                <p className="text-xs font-bold text-orange-800">حرف {row.letter}</p>
                <div className="grid grid-cols-3 gap-2">
                  {row.forms.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        playClickSound();
                        speakArabic(f);
                      }}
                      className="h-14 rounded-xl bg-white hover:bg-orange-200 border border-orange-200 font-display text-2xl font-black text-slate-900 cursor-pointer transition"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-sky-50 border border-sky-200 p-5 space-y-3">
            <h3 className="font-display text-lg font-extrabold text-sky-900">تحليل الكلمات لمقاطع صوتية:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {READING_WORDS.slice(0, 6).map((w) => (
                <button
                  key={w.word}
                  onClick={() => {
                    speakArabic(`${w.syllables.join(' ')}، ${w.word}`);
                    onCompleteLesson(`reading-syl-${w.word}`, 'reading', 1);
                  }}
                  className="flex items-center justify-between rounded-2xl bg-white border border-sky-200 p-4 hover:shadow-sm cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{w.emoji}</span>
                    <div className="text-right">
                      <p className="font-display text-xl font-black text-slate-900">{w.word}</p>
                      <p className="text-xs font-bold text-sky-700">{w.syllables.join(' · ')}</p>
                    </div>
                  </div>
                  <Volume2 className="w-5 h-5 text-sky-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'missing' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
          <div className="text-7xl">{currentWord.emoji}</div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
            اختر الحرف الناقص لتكتمل الكلمة:
          </h2>
          <button
            onClick={() => speakArabic(currentWord.word)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold px-4 py-2 text-sm cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>اسمع الكلمة</span>
          </button>

          <div className="flex items-center justify-center gap-3">
            {currentWord.letters.map((ltr, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-display text-4xl font-black ${
                  idx === currentWord.missingIndex
                    ? 'border-2 border-dashed border-orange-500 bg-orange-50 text-orange-600'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                {idx === currentWord.missingIndex ? '؟' : ltr}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            {missingOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => handleMissingPick(opt)}
                className="w-24 h-24 rounded-3xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-4xl font-black shadow-sm cursor-pointer transition hover:scale-105"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback && <p className="font-display text-lg font-extrabold text-emerald-700">{feedback}</p>}
        </div>
      )}

      {tab === 'sentences' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SHORT_SENTENCES.map((s) => (
              <div
                key={s.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{s.emoji}</span>
                  <p className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-relaxed">
                    {s.text}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      speakArabic(s.text);
                      onCompleteLesson(`reading-sentence-${s.id}`, 'reading', 2);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold px-4 py-2.5 text-sm cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>اقرأ واسمع الجملة (+٢ ⭐)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Picture Sentence Composer */}
          <div className="rounded-3xl bg-white border border-emerald-200 p-6 shadow-sm space-y-4">
            <h3 className="font-display text-xl font-black text-slate-900">
              كوّن جملة جميلة بالصور!
            </h3>
            <p className="text-sm text-slate-600">اضغط على البطاقات بالترتيب: «مُحَمَّد» ثم «يَقْرَأُ» ثم «كِتَابًا»</p>

            <div className="min-h-[60px] rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-wrap items-center gap-3">
              {selectedSentenceParts.length === 0 ? (
                <span className="text-sm text-emerald-700">الجملة ستظهر هنا...</span>
              ) : (
                selectedSentenceParts.map((part, idx) => (
                  <span key={idx} className="font-display text-2xl font-black text-emerald-900">
                    {part}
                  </span>
                ))
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { word: 'كِتَابًا', emoji: '📖' },
                { word: 'مُحَمَّد', emoji: '👦' },
                { word: 'يَقْرَأُ', emoji: '👀' },
              ].map((card) => (
                <button
                  key={card.word}
                  onClick={() => {
                    playClickSound();
                    speakArabic(card.word);
                    const next = [...selectedSentenceParts, card.word];
                    setSelectedSentenceParts(next);
                    if (next.join(' ') === 'مُحَمَّد يَقْرَأُ كِتَابًا') {
                      speakEncouragement();
                      onCompleteLesson('reading-compose-1', 'reading', 3);
                    }
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-amber-100 hover:bg-amber-200 border border-amber-300 px-5 py-3 font-display text-lg font-extrabold text-slate-900 cursor-pointer"
                >
                  <span>{card.emoji}</span>
                  <span>{card.word}</span>
                </button>
              ))}

              <button
                onClick={() => setSelectedSentenceParts([])}
                className="flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>مسح</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'dictation' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-5 max-w-xl mx-auto">
          <div className="text-7xl">{currentWord.emoji}</div>
          <h2 className="font-display text-2xl font-black text-slate-900">
            تدريب الإملاء: اسمع الكلمة واكتبها!
          </h2>

          <button
            onClick={() => speakArabic(currentWord.word)}
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 py-3 cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>اسمع الكلمة المطلوبة</span>
          </button>

          <p className="text-sm text-slate-500">تلميح الحروف: {currentWord.letters.join(' · ')}</p>

          <form onSubmit={handleDictationCheck} className="space-y-4">
            <input
              type="text"
              value={dictationInput}
              onChange={(e) => setDictationInput(e.target.value)}
              placeholder="اكتب الكلمة هنا..."
              className="w-full rounded-2xl border-2 border-sky-200 focus:border-sky-500 px-4 py-3.5 text-center font-display text-2xl font-bold outline-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 text-lg cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>تأكد من الإملاء</span>
            </button>
          </form>

          {feedback && <p className="font-display text-lg font-extrabold text-emerald-700">{feedback}</p>}
        </div>
      )}
    </div>
  );
};
