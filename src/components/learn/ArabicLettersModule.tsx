import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Eraser, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { ARABIC_LETTERS, ArabicLetterItem } from '../../data/curriculum';
import { LearningSubject } from '../../types/app';
import {
  playClickSound,
  playGentleTryAgainSound,
  speakArabic,
  speakEncouragement,
} from '../../utils/sound';

interface ArabicLettersModuleProps {
  completedLessons: string[];
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
  onLogReview: (id: string, label: string, subject: LearningSubject) => void;
}

export const ArabicLettersModule: React.FC<ArabicLettersModuleProps> = ({
  completedLessons,
  onCompleteLesson,
  onLogReview,
}) => {
  const [selected, setSelected] = useState<ArabicLetterItem>(ARABIC_LETTERS[0]);
  const [mode, setMode] = useState<'explore' | 'trace' | 'similar' | 'build'>('explore');

  // Canvas tracing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0284c7');
  const [hasDrawn, setHasDrawn] = useState(false);

  // Similar letters mini-quiz state
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [buildChoice, setBuildChoice] = useState<string[]>([]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    if (mode === 'trace') {
      clearCanvas();
    }
  }, [selected, mode]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.setPointerCapture(e.pointerId);
    const { x, y } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = strokeColor;
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleSelectLetter = (item: ArabicLetterItem) => {
    playClickSound();
    setSelected(item);
    setQuizFeedback(null);
    setBuildChoice([]);
    speakArabic(`حرف ${item.name}، ${item.soundHint}`);
  };

  const handleSimilarPick = (pick: string) => {
    if (pick === selected.letter) {
      const msg = speakEncouragement();
      setQuizFeedback(msg);
      onCompleteLesson(`arabic-similar-${selected.letter}`, 'arabic', 2);
    } else {
      playGentleTryAgainSound();
      speakArabic(`قريب جدًا يا محمد! ابحث عن حرف ${selected.name}`);
      setQuizFeedback(`حاول مرة أخرى! ابحث عن حرف ${selected.name} (${selected.letter})`);
      onLogReview(`arabic-letter-${selected.letter}`, `التمييز لحرف ${selected.name}`, 'arabic');
    }
  };

  const wordChars = selected.word.replace(/[\u064B-\u0652]/g, '').split('');
  const scrambledChars = [...wordChars].reverse();

  return (
    <div className="space-y-6">
      {/* Letter Grid Selector */}
      <div className="rounded-3xl bg-white border border-amber-200 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">
              الحروف العربية (٢٨ حرفًا)
            </h2>
            <p className="text-sm text-slate-600">اضغط على أي حرف لتسمع نطقه وترى كلماته وأشكاله</p>
          </div>
          <span className="text-sm font-bold text-amber-700 tabular-nums">
            تم إتقان {completedLessons.filter((l) => l.startsWith('arabic-')).length} نشاط
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {ARABIC_LETTERS.map((item) => {
            const isSelected = selected.letter === item.letter;
            const isDone = completedLessons.includes(`arabic-trace-${item.letter}`);
            return (
              <button
                key={item.letter}
                onClick={() => handleSelectLetter(item)}
                className={`relative h-12 sm:h-14 rounded-2xl font-display text-2xl font-black transition cursor-pointer flex items-center justify-center border-2 ${
                  isSelected
                    ? 'bg-amber-400 border-amber-600 text-slate-950 scale-105 shadow-md'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                    : 'bg-sky-50 border-sky-100 text-slate-800 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'explore', label: '📖 أشكال الحرف والكلمة' },
          { id: 'trace', label: '✏️ اكتب وتتبّع الحرف' },
          { id: 'similar', label: '🔍 الحروف المتشابهة' },
          { id: 'build', label: '🧩 كوّن الكلمة' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playClickSound();
              setMode(tab.id as typeof mode);
            }}
            className={`px-4 py-3 rounded-2xl font-bold text-sm sm:text-base transition cursor-pointer min-h-[48px] ${
              mode === tab.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Letter Stage */}
      {mode === 'explore' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white p-8 flex flex-col items-center justify-center text-center shadow-md space-y-4">
            <span className="text-7xl sm:text-8xl">{selected.emoji}</span>
            <div className="font-display text-8xl font-black leading-none">{selected.letter}</div>
            <p className="font-display text-2xl font-extrabold">حرف {selected.name} — {selected.word}</p>
            <button
              onClick={() => speakArabic(`حرف ${selected.name}، ${selected.soundHint}`)}
              className="flex items-center gap-2 rounded-2xl bg-white text-slate-900 font-bold px-6 py-3 shadow-sm hover:bg-amber-50 transition cursor-pointer min-h-[48px]"
            >
              <Volume2 className="w-5 h-5 text-orange-600" />
              <span>اسمع نطق الحرف</span>
            </button>
          </div>

          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="font-display text-xl font-extrabold text-slate-900 mb-3">
                أشكال حرف ({selected.letter}) في الكلمة:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'أول الكلمة', form: selected.forms.initial },
                  { label: 'وسط الكلمة', form: selected.forms.medial },
                  { label: 'آخر الكلمة', form: selected.forms.final },
                  { label: 'منفصل', form: selected.forms.isolated },
                ].map((f) => (
                  <button
                    key={f.label}
                    onClick={() => speakArabic(`حرف ${selected.name} في ${f.label}`)}
                    className="rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 p-4 text-center cursor-pointer transition"
                  >
                    <p className="text-xs font-bold text-sky-700 mb-1">{f.label}</p>
                    <p className="font-display text-4xl font-black text-slate-900">{f.form}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-bold text-emerald-900">تعلّمنا حرف {selected.name}!</p>
                <p className="text-sm text-emerald-700">اضغط على الزر للحصول على نجمتين</p>
              </div>
              <button
                onClick={() => {
                  speakEncouragement();
                  onCompleteLesson(`arabic-explore-${selected.letter}`, 'arabic', 2);
                }}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 transition cursor-pointer min-h-[48px]"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>فهمت الحرف (+٢ ⭐)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'trace' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900">
                تتبّع واكتب حرف ({selected.letter}) بإصبعك أو الماوس!
              </h3>
              <p className="text-sm text-slate-600">لوّن فوق الحرف الخفيف باللون الذي تحبه يا محمد</p>
            </div>

            <div className="flex items-center gap-2">
              {['#0284c7', '#ef4444', '#16a34a', '#9333ea', '#f59e0b'].map((c) => (
                <button
                  key={c}
                  onClick={() => setStrokeColor(c)}
                  aria-label="اختر لون القلم"
                  style={{ backgroundColor: c }}
                  className={`w-9 h-9 rounded-full border-4 cursor-pointer transition ${
                    strokeColor === c ? 'border-slate-900 scale-110' : 'border-white shadow-xs'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md aspect-square rounded-3xl border-4 border-dashed border-sky-300 bg-sky-50/60 overflow-hidden select-none touch-none">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[210px] font-black text-sky-200/80 select-none"
            >
              {selected.letter}
            </div>
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative z-10 w-full h-full cursor-crosshair"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-3 cursor-pointer min-h-[48px]"
            >
              <Eraser className="w-5 h-5" />
              <span>مسح وحاول تاني</span>
            </button>

            <button
              onClick={() => {
                if (!hasDrawn) {
                  speakArabic(`ارسم حرف ${selected.name} أولاً يا محمد!`);
                  return;
                }
                speakEncouragement();
                onCompleteLesson(`arabic-trace-${selected.letter}`, 'arabic', 3);
              }}
              className="flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 shadow-sm cursor-pointer min-h-[48px]"
            >
              <Sparkles className="w-5 h-5" />
              <span>أنهيت الكتابة! (+٣ ⭐)</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'similar' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-sky-700 font-bold">
            <HelpCircle className="w-5 h-5" />
            <span>التمييز بين الحروف المتشابهة</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
            أين حرف <span className="text-amber-600">«{selected.name}»</span> يا محمد؟
          </h3>
          <button
            onClick={() => speakArabic(`اختر حرف ${selected.name}`)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold px-4 py-2 text-sm cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>اسمع السؤال</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {selected.similarGroup.map((ltr) => (
              <button
                key={ltr}
                onClick={() => handleSimilarPick(ltr)}
                className="w-28 h-28 rounded-3xl bg-amber-50 hover:bg-amber-200 border-2 border-amber-300 font-display text-5xl font-black text-slate-900 transition transform hover:scale-105 cursor-pointer"
              >
                {ltr}
              </button>
            ))}
          </div>

          {quizFeedback && (
            <p className="font-display text-lg font-extrabold text-emerald-700">{quizFeedback}</p>
          )}
        </div>
      )}

      {mode === 'build' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-5">
          <div className="text-6xl">{selected.emoji}</div>
          <h3 className="font-display text-2xl font-black text-slate-900">
            اضغط على الحروف بالترتيب لتكوين كلمة «{selected.word}»
          </h3>

          <div className="flex items-center justify-center gap-2 min-h-[64px]">
            {wordChars.map((_, idx) => (
              <div
                key={idx}
                className="w-16 h-16 rounded-2xl border-2 border-dashed border-sky-400 bg-sky-50 flex items-center justify-center font-display text-3xl font-black text-sky-900"
              >
                {buildChoice[idx] || ''}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {scrambledChars.map((ch, idx) => (
              <button
                key={`${ch}-${idx}`}
                onClick={() => {
                  playClickSound();
                  const next = [...buildChoice, ch];
                  setBuildChoice(next);
                  if (next.length === wordChars.length) {
                    if (next.join('') === wordChars.join('')) {
                      speakEncouragement();
                      onCompleteLesson(`arabic-build-${selected.letter}`, 'arabic', 3);
                    } else {
                      playGentleTryAgainSound();
                      speakArabic('قريب جدًا! جرّب ترتيب الحروف مرة تانية يا محمد');
                      window.setTimeout(() => setBuildChoice([]), 700);
                    }
                  }
                }}
                className="w-16 h-16 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-3xl font-black shadow-sm cursor-pointer transition"
              >
                {ch}
              </button>
            ))}
          </div>

          <button
            onClick={() => setBuildChoice([])}
            className="text-sm font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
};
