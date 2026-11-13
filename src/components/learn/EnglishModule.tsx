import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import {
  ENGLISH_COLORS,
  ENGLISH_CVC_WORDS,
  ENGLISH_LETTERS,
  EnglishLetterItem,
} from '../../data/curriculum';
import { LearningSubject } from '../../types/app';
import {
  playClickSound,
  playGentleTryAgainSound,
  speakArabic,
  speakEnglish,
  speakEncouragement,
} from '../../utils/sound';

interface EnglishModuleProps {
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
  onLogReview: (id: string, label: string, subject: LearningSubject) => void;
}

export const EnglishModule: React.FC<EnglishModuleProps> = ({ onCompleteLesson, onLogReview }) => {
  const [tab, setTab] = useState<'alphabet' | 'colorsNumbers' | 'cvc' | 'match'>('alphabet');
  const [selectedLetter, setSelectedLetter] = useState<EnglishLetterItem>(ENGLISH_LETTERS[0]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const quizTargets = ENGLISH_LETTERS.slice(0, 10);
  const currentTarget = quizTargets[quizIdx % quizTargets.length];
  const quizOptions = [
    currentTarget,
    quizTargets[(quizIdx + 2) % quizTargets.length],
    quizTargets[(quizIdx + 5) % quizTargets.length],
  ].sort((a, b) => a.word.localeCompare(b.word));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'alphabet', label: '🔤 الحروف A–Z والفونكس' },
          { id: 'colorsNumbers', label: '🎨 الألوان والأرقام 1–20' },
          { id: 'cvc', label: '📖 كلمات CVC البسيطة' },
          { id: 'match', label: '🎧 اسمع وطابق' },
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
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-indigo-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'alphabet' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl bg-white border border-indigo-200 p-5 shadow-sm">
            <h2 className="font-display text-xl font-black text-slate-900 mb-4">
              اضغط على أي حرف إنجليزي لتسمع نطقه وصوته:
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-7 gap-2" dir="ltr">
              {ENGLISH_LETTERS.map((item) => (
                <button
                  key={item.upper}
                  onClick={() => {
                    playClickSound();
                    setSelectedLetter(item);
                    speakEnglish(`${item.upper}, ${item.word}`);
                    onCompleteLesson(`english-letter-${item.upper}`, 'english', 1);
                  }}
                  className={`h-14 rounded-2xl font-display font-black text-xl transition cursor-pointer ${
                    selectedLetter.upper === item.upper
                      ? 'bg-indigo-600 text-white scale-105 shadow-md'
                      : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
                  }`}
                >
                  {item.upper}
                  <span className="text-sm font-bold opacity-80">{item.lower}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white p-8 shadow-md flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-7xl">{selectedLetter.emoji}</span>
            <div className="font-display text-6xl font-black" dir="ltr">
              {selectedLetter.upper} {selectedLetter.lower}
            </div>
            <p className="text-sm font-bold bg-white/15 rounded-xl px-4 py-1.5">
              صوت الحرف (Phonics): {selectedLetter.phonics}
            </p>
            <p className="font-display text-3xl font-extrabold" dir="ltr">
              {selectedLetter.word}
            </p>
            <p className="text-lg font-bold text-indigo-100">يعني: {selectedLetter.arabicWord}</p>
            <button
              onClick={() => speakEnglish(`${selectedLetter.upper} is for ${selectedLetter.word}`)}
              className="flex items-center gap-2 rounded-2xl bg-white text-indigo-900 font-bold px-6 py-3 shadow-sm hover:bg-indigo-50 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>اسمع النطق بالإنجليزية</span>
            </button>
          </div>
        </div>
      )}

      {tab === 'colorsNumbers' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-4">الألوان بالإنجليزية (Colors)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ENGLISH_COLORS.map((c) => (
                <button
                  key={c.word}
                  onClick={() => {
                    speakEnglish(c.word);
                    onCompleteLesson(`english-color-${c.word}`, 'english', 1);
                  }}
                  className="rounded-2xl border border-slate-200 p-4 text-center hover:shadow-md transition cursor-pointer space-y-2"
                >
                  <div className="w-14 h-14 rounded-2xl mx-auto shadow-inner" style={{ backgroundColor: c.hex }} />
                  <p className="font-display text-xl font-black text-slate-900" dir="ltr">
                    {c.word}
                  </p>
                  <p className="text-sm font-bold text-slate-600">{c.arabic}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
            <h2 className="font-display text-2xl font-black text-slate-900 mb-4">الأرقام بالإنجليزية (1 – 20)</h2>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2" dir="ltr">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    speakEnglish(String(n));
                    onCompleteLesson(`english-num-${n}`, 'english', 1);
                  }}
                  className="h-14 rounded-2xl bg-sky-50 hover:bg-indigo-600 hover:text-white border border-sky-200 font-display text-xl font-black text-slate-900 transition cursor-pointer tabular-nums"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'cvc' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENGLISH_CVC_WORDS.map((item) => (
            <div
              key={item.word}
              className="rounded-3xl bg-white border border-indigo-200 p-6 shadow-sm text-center space-y-4"
            >
              <div className="text-6xl">{item.emoji}</div>
              <div className="flex items-center justify-center gap-1.5" dir="ltr">
                {item.letters.map((l, i) => (
                  <button
                    key={i}
                    onClick={() => speakEnglish(l)}
                    className="w-11 h-12 rounded-xl bg-indigo-50 hover:bg-indigo-200 font-display text-2xl font-black text-indigo-900 cursor-pointer"
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="font-display text-2xl font-black text-slate-900" dir="ltr">
                {item.word}
              </p>
              <p className="text-sm font-bold text-slate-600">{item.arabic}</p>
              <button
                onClick={() => {
                  speakEnglish(item.word);
                  onCompleteLesson(`english-cvc-${item.word}`, 'english', 2);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 text-sm cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>اقرأ الكلمة (+٢ ⭐)</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'match' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-black text-slate-900">
            اسمع الكلمة الإنجليزية واختر الصورة الصحيحة!
          </h2>

          <button
            onClick={() => speakEnglish(currentTarget.word)}
            className="inline-flex items-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 text-lg shadow-sm cursor-pointer"
          >
            <Volume2 className="w-6 h-6" />
            <span>اسمع: {currentTarget.word}</span>
          </button>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {quizOptions.map((opt) => (
              <button
                key={opt.word}
                onClick={() => {
                  if (opt.word === currentTarget.word) {
                    const msg = speakEncouragement();
                    setFeedback(msg);
                    onCompleteLesson(`english-match-${opt.word}`, 'english', 2);
                    window.setTimeout(() => {
                      setFeedback(null);
                      setQuizIdx((i) => i + 1);
                    }, 1000);
                  } else {
                    playGentleTryAgainSound();
                    speakArabic(`جرّب مرة أخرى! الكلمة تعني ${currentTarget.arabicWord}`);
                    setFeedback(`تلميح: ${currentTarget.word} تعني «${currentTarget.arabicWord}»`);
                    onLogReview(`english-${currentTarget.word}`, `كلمة ${currentTarget.word}`, 'english');
                  }
                }}
                className="rounded-3xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 p-5 flex flex-col items-center gap-2 cursor-pointer transition hover:scale-105"
              >
                <span className="text-5xl">{opt.emoji}</span>
                <span className="font-bold text-slate-800">{opt.arabicWord}</span>
              </button>
            ))}
          </div>

          {feedback && (
            <p className="font-display text-lg font-extrabold text-emerald-700 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{feedback}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
