import React, { useEffect, useState } from 'react';
import { playGentleTryAgainSound, playPopSound, speakArabic, speakEncouragement } from '../../utils/sound';

interface CommonGameProps {
  onScoreChange: (score: number) => void;
  onRoundLabel: (label: string) => void;
  onQuestionAudio: (text: string) => void;
  onFinish: (finalScore: number, stars: number) => void;
}

// 5. تحدي الأرقام
export const NumberChallengeGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const rounds = [
    { prompt: 'كم نجمة في الصورة؟', items: '⭐⭐⭐⭐⭐⭐', ans: 6, options: [5, 6, 7] },
    { prompt: 'أي رقم هو الأكبر؟', items: '١٢  أم  ٢١  أم  ٩', ans: 21, options: [12, 21, 9] },
    { prompt: 'كم فراولة هنا؟', items: '🍓🍓🍓🍓🍓🍓🍓🍓', ans: 8, options: [7, 8, 9] },
    { prompt: 'ما الرقم الذي يأتي بعد ٢٩؟', items: '٢٧ · ٢٨ · ٢٩ · ؟', ans: 30, options: [28, 30, 31] },
    { prompt: 'كم صاروخًا في السماء؟', items: '🚀🚀🚀🚀🚀', ans: 5, options: [4, 5, 6] },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const cur = rounds[idx];

  useEffect(() => {
    onRoundLabel(`تحدي ${idx + 1} من ${rounds.length}`);
    onQuestionAudio(cur.prompt);
  }, [idx, cur.prompt, rounds.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">{cur.prompt}</h2>
      <div className="text-4xl sm:text-5xl py-4 rounded-3xl bg-sky-50 border border-sky-200 max-w-lg mx-auto">
        {cur.items}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {cur.options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === cur.ans) {
                speakEncouragement();
                const ns = score + 20;
                setScore(ns);
                onScoreChange(ns);
                setMsg('أحسنت يا محمد!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= rounds.length) onFinish(ns, 3);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                setMsg('عدّ مرة أخرى بهدوء يا بطل!');
              }
            }}
            className="w-24 h-20 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display text-3xl font-black cursor-pointer tabular-nums"
          >
            {opt}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};

// 6. لعبة الجمع والطرح
export const AddSubtractGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const problems = [
    { a: 3, b: 2, op: '+', ans: 5, options: [4, 5, 6] },
    { a: 6, b: 2, op: '-', ans: 4, options: [3, 4, 5] },
    { a: 4, b: 4, op: '+', ans: 8, options: [7, 8, 9] },
    { a: 9, b: 3, op: '-', ans: 6, options: [5, 6, 7] },
    { a: 5, b: 4, op: '+', ans: 9, options: [8, 9, 10] },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const cur = problems[idx];

  useEffect(() => {
    onRoundLabel(`مسألة ${idx + 1} من ${problems.length}`);
    onQuestionAudio(`كم يساوي ${cur.a} ${cur.op === '+' ? 'زائد' : 'ناقص'} ${cur.b}`);
  }, [idx, cur, problems.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl font-black text-slate-900">احسب الناتج الصحيح:</h2>
      <div className="font-display text-5xl sm:text-6xl font-black text-sky-800 bg-sky-50 border border-sky-200 rounded-3xl py-6 max-w-md mx-auto tabular-nums" dir="ltr">
        {cur.a} {cur.op} {cur.b} = ?
      </div>
      <div className="flex items-center justify-center gap-4">
        {cur.options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === cur.ans) {
                speakEncouragement();
                const ns = score + 20;
                setScore(ns);
                onScoreChange(ns);
                setMsg('عبقري يا محمد!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= problems.length) onFinish(ns, 4);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                setMsg('قرّبت جدًا! احسب على أصابعك وحاول مرة أخرى.');
              }
            }}
            className="w-24 h-20 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display text-3xl font-black cursor-pointer tabular-nums"
          >
            {opt}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};

// 7. اكتشف الشكل المختلف
export const OddOneOutGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const sets = [
    { items: ['🍎', '🍌', '🚗', '🍓'], odd: '🚗', hint: 'السيارة ليست فاكهة!' },
    { items: ['🦁', '🐱', '🐶', '✈️'], odd: '✈️', hint: 'الطائرة ليست حيوانًا!' },
    { items: ['🔵', '🔵', '🔺', '🔵'], odd: '🔺', hint: 'المثلث شكله مختلف!' },
    { items: ['☀️', '🌙', '⭐', '🍔'], odd: '🍔', hint: 'البرجر طعام وليس في السماء!' },
    { items: ['٣', '٥', 'ب', '٨'], odd: 'ب', hint: 'الباء حرف وليس رقمًا!' },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const cur = sets[idx];

  useEffect(() => {
    onRoundLabel(`لغز ${idx + 1} من ${sets.length}`);
    onQuestionAudio('اختر الشكل المختلف عن الباقي');
  }, [idx, sets.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
        اكتشف الشكل المختلف عن المجموعة:
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
        {cur.items.map((it, i) => (
          <button
            key={i}
            onClick={() => {
              if (it === cur.odd) {
                speakEncouragement();
                const ns = score + 20;
                setScore(ns);
                onScoreChange(ns);
                setMsg(cur.hint);
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= sets.length) onFinish(ns, 3);
                  else setIdx((n) => n + 1);
                }, 900);
              } else {
                playGentleTryAgainSound();
                setMsg('انظر بتركيز، هناك شكل واحد لا يشبه البقية!');
              }
            }}
            className="h-28 rounded-3xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-5xl font-display font-black flex items-center justify-center cursor-pointer transition hover:scale-105"
          >
            {it}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};

// 18. تحدي سرعة الملاحظة
export const SpeedObservationGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const targets = [
    { target: '⭐', grid: ['🌙', '⭐', '☁️', '☀️', '⭐', '🌈', '⭐', '🚀', '🌍', '⭐', '🛸', '🪐'] },
    { target: '🍎', grid: ['🍌', '🍎', '🍇', '🍊', '🍎', '🍉', '🍎', '🍓', '🍋', '🍎', '🍐', '🥝'] },
  ];
  const [round, setRound] = useState(0);
  const [foundIndices, setFoundIndices] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const cur = targets[round];
  const totalTargets = cur.grid.filter((x) => x === cur.target).length;

  useEffect(() => {
    onRoundLabel(`وجدت ${foundIndices.length} من ${totalTargets}`);
    onQuestionAudio(`ابحث بسرعة عن كل ${cur.target}`);
  }, [foundIndices.length, totalTargets, cur.target, onRoundLabel, onQuestionAudio]);

  const handleCell = (i: number, val: string) => {
    if (foundIndices.includes(i)) return;
    if (val === cur.target) {
      playPopSound();
      const next = [...foundIndices, i];
      const ns = score + 15;
      setFoundIndices(next);
      setScore(ns);
      onScoreChange(ns);
      if (next.length >= totalTargets) {
        speakEncouragement();
        window.setTimeout(() => {
          setFoundIndices([]);
          if (round + 1 >= targets.length) onFinish(ns, 4);
          else setRound((r) => r + 1);
        }, 700);
      }
    } else {
      playGentleTryAgainSound();
    }
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
        اضغط بسرعة على كل <span className="text-4xl mx-1">{cur.target}</span> في الشبكة!
      </h2>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cur.grid.map((val, i) => {
          const found = foundIndices.includes(i);
          return (
            <button
              key={i}
              onClick={() => handleCell(i, val)}
              className={`h-20 rounded-2xl text-4xl border-2 transition cursor-pointer ${
                found
                  ? 'bg-amber-300 border-amber-500 scale-95'
                  : 'bg-sky-50 hover:bg-sky-100 border-sky-200'
              }`}
            >
              {val}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 19. أكمل النمط
export const CompletePatternGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const patterns = [
    { seq: ['🔴', '🔵', '🔴', '🔵', '🔴'], ans: '🔵', opts: ['🔵', '🟢', '🟡'] },
    { seq: ['⭐', '🌙', '⭐', '🌙', '⭐'], ans: '🌙', opts: ['☀️', '🌙', '☁️'] },
    { seq: ['٢', '٤', '٦', '٨'], ans: '١٠', opts: ['٩', '١٠', '١٢'] },
    { seq: ['🔺', '🔺', '🟩', '🔺', '🔺'], ans: '🟩', opts: ['🔺', '🟩', '🔵'] },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const cur = patterns[idx];

  useEffect(() => {
    onRoundLabel(`نمط ${idx + 1} من ${patterns.length}`);
    onQuestionAudio('اكتشف النمط وأكمل الشكل الناقص');
  }, [idx, patterns.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
        ماذا يأتي بعد ذلك في هذا النمط؟
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3 bg-sky-50 border border-sky-200 rounded-3xl p-5 max-w-xl mx-auto">
        {cur.seq.map((s, i) => (
          <span key={i} className="text-4xl font-display font-black">{s}</span>
        ))}
        <span className="w-14 h-14 rounded-2xl border-2 border-dashed border-amber-500 bg-amber-50 flex items-center justify-center font-display text-2xl font-black text-amber-700">
          ؟
        </span>
      </div>

      <div className="flex items-center justify-center gap-4">
        {cur.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === cur.ans) {
                speakEncouragement();
                const ns = score + 25;
                setScore(ns);
                onScoreChange(ns);
                setMsg('مذهل! فهمت النمط بسرعة!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= patterns.length) onFinish(ns, 3);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                speakArabic('تأمل الترتيب مرة أخرى يا محمد!');
                setMsg('جرّب الاختيار الآخر!');
              }
            }}
            className="w-24 h-20 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display text-3xl font-black cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};
