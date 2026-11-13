import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { MATH_SHAPES, MATH_STORY_PROBLEMS } from '../../data/curriculum';
import { LearningSubject } from '../../types/app';
import {
  playClickSound,
  playGentleTryAgainSound,
  speakArabic,
  speakEncouragement,
} from '../../utils/sound';

interface MathModuleProps {
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
  onLogReview: (id: string, label: string, subject: LearningSubject) => void;
}

export const MathModule: React.FC<MathModuleProps> = ({ onCompleteLesson, onLogReview }) => {
  const [tab, setTab] = useState<'numbers' | 'operations' | 'compare' | 'shapes' | 'stories'>('numbers');
  const [selectedNum, setSelectedNum] = useState(1);

  // Visual addition/subtraction state
  const [aCount, setACount] = useState(3);
  const [bCount, setBCount] = useState(2);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [opFeedback, setOpFeedback] = useState<string | null>(null);

  // Compare state
  const [compareIdx, setCompareIdx] = useState(0);
  const comparePairs = [
    { left: 7, right: 4, ans: '>' },
    { left: 3, right: 8, ans: '<' },
    { left: 5, right: 5, ans: '=' },
    { left: 12, right: 9, ans: '>' },
  ];
  const currentPair = comparePairs[compareIdx % comparePairs.length];

  // Story problem state
  const [storyIdx, setStoryIdx] = useState(0);
  const currentStory = MATH_STORY_PROBLEMS[storyIdx % MATH_STORY_PROBLEMS.length];

  const targetResult = op === '+' ? aCount + bCount : aCount - bCount;
  const opOptions = Array.from(new Set([targetResult, targetResult + 1, Math.max(0, targetResult - 1)])).sort(
    (x, y) => x - y
  );

  const nextOperation = () => {
    const nextOp = Math.random() > 0.45 ? '+' : '-';
    const nextA = 2 + Math.floor(Math.random() * 6);
    const nextB = nextOp === '+' ? 1 + Math.floor(Math.random() * 5) : 1 + Math.floor(Math.random() * nextA);
    setOp(nextOp);
    setACount(nextA);
    setBCount(nextB);
    setOpFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'numbers', label: '💯 الأرقام من ١ إلى ١٠٠' },
          { id: 'operations', label: '➕ الجمع والطرح بالصور' },
          { id: 'compare', label: '⚖️ المقارنة والأنماط' },
          { id: 'stories', label: '🍎 مسائل مصورة' },
          { id: 'shapes', label: '🔺 الأشكال الهندسية' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              playClickSound();
              setTab(item.id as typeof tab);
              setOpFeedback(null);
            }}
            className={`px-4 py-3 rounded-2xl font-bold text-sm sm:text-base transition cursor-pointer min-h-[48px] ${
              tab === item.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'numbers' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-black text-slate-900">لوحة الأرقام من ١ إلى ١٠٠</h2>
              <p className="text-sm text-slate-600">اضغط على أي رقم لتسمعه وتعدّ نجومه!</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-sky-50 border border-sky-200 px-4 py-2">
              <span className="font-display text-3xl font-black text-sky-700 tabular-nums">{selectedNum}</span>
              <button
                onClick={() => speakArabic(String(selectedNum))}
                className="flex items-center gap-1.5 rounded-xl bg-sky-600 text-white px-3 py-2 text-xs font-bold cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسمع</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2" dir="ltr">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  playClickSound();
                  setSelectedNum(num);
                  speakArabic(String(num));
                  if (num % 10 === 0) {
                    onCompleteLesson(`math-ten-${num}`, 'math', 1);
                  }
                }}
                className={`h-11 rounded-xl font-display font-extrabold text-base tabular-nums transition cursor-pointer ${
                  selectedNum === num
                    ? 'bg-amber-400 text-slate-950 scale-105 shadow-sm'
                    : num % 10 === 0
                    ? 'bg-sky-100 text-sky-900 hover:bg-sky-200'
                    : 'bg-slate-50 text-slate-800 hover:bg-sky-50'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {tab === 'operations' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
          <h2 className="font-display text-2xl font-black text-slate-900">
            {op === '+' ? 'هيا نجمع التفاحات يا محمد!' : 'هيا نطرح التفاحات يا محمد!'}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-5xl font-display font-black" dir="ltr">
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 min-w-[120px]">
              <div className="text-2xl mb-1">{'🍎'.repeat(aCount)}</div>
              <span className="tabular-nums text-slate-900">{aCount}</span>
            </div>
            <span className="text-sky-600">{op}</span>
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 min-w-[120px]">
              <div className="text-2xl mb-1">{'🍏'.repeat(bCount)}</div>
              <span className="tabular-nums text-slate-900">{bCount}</span>
            </div>
            <span className="text-slate-500">=</span>
            <div className="rounded-2xl bg-sky-50 border-2 border-dashed border-sky-400 p-4 min-w-[90px] text-sky-700">
              ?
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {opOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  if (opt === targetResult) {
                    const msg = speakEncouragement();
                    setOpFeedback(msg);
                    onCompleteLesson(`math-op-${op}-${aCount}-${bCount}`, 'math', 2);
                    window.setTimeout(nextOperation, 1000);
                  } else {
                    playGentleTryAgainSound();
                    speakArabic('عد التفاحات مرة أخرى يا محمد، ستصل للحل!');
                    setOpFeedback('قريب جدًا! عدّ التفاحات بهدوء وحاول مرة أخرى.');
                    onLogReview('math-add-sub', 'الجمع والطرح البسيط', 'math');
                  }
                }}
                className="w-24 h-20 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display text-3xl font-black shadow-sm cursor-pointer transition tabular-nums"
              >
                {opt}
              </button>
            ))}
          </div>

          {opFeedback && <p className="font-display text-lg font-extrabold text-emerald-700">{opFeedback}</p>}
        </div>
      )}

      {tab === 'compare' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6">
          <h2 className="font-display text-2xl font-black text-slate-900">
            قارن بين العددين: أي إشارة تناسب؟
          </h2>
          <div className="flex items-center justify-center gap-6 text-5xl font-display font-black" dir="ltr">
            <span className="w-24 h-24 rounded-3xl bg-sky-100 text-sky-900 flex items-center justify-center tabular-nums">
              {currentPair.left}
            </span>
            <span className="w-20 h-20 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 flex items-center justify-center text-amber-700">
              ؟
            </span>
            <span className="w-24 h-24 rounded-3xl bg-emerald-100 text-emerald-900 flex items-center justify-center tabular-nums">
              {currentPair.right}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4" dir="ltr">
            {[
              { sym: '>', label: 'أكبر من' },
              { sym: '=', label: 'يساوي' },
              { sym: '<', label: 'أصغر من' },
            ].map((btn) => (
              <button
                key={btn.sym}
                onClick={() => {
                  if (btn.sym === currentPair.ans) {
                    const msg = speakEncouragement();
                    setOpFeedback(msg);
                    onCompleteLesson(`math-compare-${compareIdx}`, 'math', 2);
                    window.setTimeout(() => {
                      setOpFeedback(null);
                      setCompareIdx((i) => i + 1);
                    }, 900);
                  } else {
                    playGentleTryAgainSound();
                    speakArabic('انظر إلى العدد الأكبر، السمكة تفتح فمها نحو العدد الأكبر!');
                    setOpFeedback('تذكّر: العلامة تفتح فمها ناحية العدد الأكبر!');
                  }
                }}
                className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-2xl font-black cursor-pointer transition"
              >
                {btn.sym}
                <span className="block text-xs font-bold mt-1">{btn.label}</span>
              </button>
            ))}
          </div>
          {opFeedback && <p className="font-display text-lg font-extrabold text-emerald-700">{opFeedback}</p>}
        </div>
      )}

      {tab === 'stories' && (
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm text-center space-y-6 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-black text-slate-900">مسألة حسابية مصورة</h2>
          <p className="text-xl font-bold text-slate-800 leading-relaxed bg-amber-50 border border-amber-200 rounded-2xl p-5">
            {currentStory.story}
          </p>
          <button
            onClick={() => speakArabic(currentStory.story)}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-100 text-sky-900 font-bold px-4 py-2 text-sm cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>اسمع المسألة</span>
          </button>

          <div className="flex items-center justify-center gap-4">
            {currentStory.options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  if (opt === currentStory.answer) {
                    const msg = speakEncouragement();
                    setOpFeedback(msg);
                    onCompleteLesson(`math-story-${currentStory.id}`, 'math', 3);
                    window.setTimeout(() => {
                      setOpFeedback(null);
                      setStoryIdx((i) => i + 1);
                    }, 1000);
                  } else {
                    playGentleTryAgainSound();
                    speakArabic('اقرأ القصة مرة أخرى وعدّ الصور يا بطل!');
                    setOpFeedback('فكّر مرة أخرى وعدّ الصور!');
                  }
                }}
                className="w-24 h-20 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-3xl font-black cursor-pointer tabular-nums"
              >
                {opt}
              </button>
            ))}
          </div>
          {opFeedback && <p className="font-display text-lg font-extrabold text-emerald-700">{opFeedback}</p>}
        </div>
      )}

      {tab === 'shapes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATH_SHAPES.map((shape) => (
            <div
              key={shape.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl">
                  {shape.emoji}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-slate-900">{shape.name}</h3>
                  <p className="text-xs font-bold text-sky-700">{shape.sides}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">{shape.fact}</p>
              <button
                onClick={() => {
                  speakArabic(`${shape.name}، ${shape.fact}`);
                  onCompleteLesson(`math-shape-${shape.id}`, 'math', 1);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold py-2.5 text-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>اسمع وتعلّم (+١ ⭐)</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
