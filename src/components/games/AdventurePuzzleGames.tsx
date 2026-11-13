import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CheckCircle2, Palette, Sparkles, Volume2 } from 'lucide-react';
import {
  playAnimalPattern,
  playClickSound,
  playGentleTryAgainSound,
  playPopSound,
  speakArabic,
  speakEncouragement,
} from '../../utils/sound';

interface CommonGameProps {
  onScoreChange: (score: number) => void;
  onRoundLabel: (label: string) => void;
  onQuestionAudio: (text: string) => void;
  onFinish: (finalScore: number, stars: number) => void;
}

// 8. لعبة الذاكرة
export const MemoryMatchGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const symbols = ['🦁', '🚀', '🍎', '🌙', '🐘', '⚽'];
  const [cards] = useState(() =>
    [...symbols, ...symbols]
      .map((sym, idx) => ({ id: idx, sym, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    onRoundLabel(`أزواج متطابقة: ${matched.length} / ${symbols.length}`);
    onQuestionAudio('اقلب بطاقتين وابحث عن كل صورتين متشابهتين');
  }, [matched.length, symbols.length, onRoundLabel, onQuestionAudio]);

  const flipCard = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].sym)) return;
    playClickSound();
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a].sym === cards[b].sym) {
        playPopSound();
        const nextMatched = [...matched, cards[a].sym];
        const ns = score + 20;
        setMatched(nextMatched);
        setScore(ns);
        onScoreChange(ns);
        setFlipped([]);
        if (nextMatched.length === symbols.length) {
          speakEncouragement();
          onFinish(ns, 4);
        }
      } else {
        window.setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  return (
    <div className="text-center space-y-5">
      <h2 className="font-display text-2xl font-black text-slate-900">
        اقلب البطاقات لتجد كل صورتين متشابهتين!
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
        {cards.map((c, idx) => {
          const revealed = flipped.includes(idx) || matched.includes(c.sym);
          return (
            <button
              key={c.id}
              onClick={() => flipCard(idx)}
              className={`h-24 rounded-2xl border-2 text-4xl font-display font-black transition cursor-pointer ${
                revealed
                  ? 'bg-white border-amber-400 shadow-sm'
                  : 'bg-gradient-to-br from-rose-500 to-pink-600 border-white text-white hover:scale-105'
              }`}
            >
              {revealed ? c.sym : '؟'}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 9. اكتشف الاختلافات
export const SpotDifferencesGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const [found, setFound] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const diffs = [
    { id: 'sun', label: 'لون الشمس / القمر' },
    { id: 'bird', label: 'العصفور فوق الشجرة' },
    { id: 'flower', label: 'الزهرة الإضافية' },
  ];

  useEffect(() => {
    onRoundLabel(`اكتشفت ${found.length} من ${diffs.length} اختلافات`);
    onQuestionAudio('انظر إلى اللوحتين واضغط على الاختلافات الثلاثة في اللوحة الثانية');
  }, [found.length, diffs.length, onRoundLabel, onQuestionAudio]);

  const markFound = (id: string) => {
    if (found.includes(id)) return;
    playPopSound();
    const next = [...found, id];
    const ns = score + 30;
    setFound(next);
    setScore(ns);
    onScoreChange(ns);
    if (next.length === diffs.length) {
      speakEncouragement();
      window.setTimeout(() => onFinish(ns, 4), 700);
    }
  };

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">
        اضغط على ٣ اختلافات موجودة في اللوحة الثانية (يسار)!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scene A */}
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-3">
          <p className="text-xs font-bold text-sky-800 mb-2">اللوحة الأولى</p>
          <svg viewBox="0 0 320 200" className="w-full rounded-2xl bg-sky-200">
            <rect y="140" width="320" height="60" fill="#4ade80" />
            <circle cx="265" cy="45" r="24" fill="#facc15" />
            <rect x="65" y="100" width="20" height="50" fill="#92400e" />
            <circle cx="75" cy="85" r="32" fill="#16a34a" />
            <rect x="160" y="95" width="75" height="55" rx="6" fill="#fef3c7" />
            <polygon points="150,98 197,58 245,98" fill="#ef4444" />
            <rect x="188" y="120" width="20" height="30" fill="#78350f" />
          </svg>
        </div>

        {/* Scene B (Clickable Differences) */}
        <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-3">
          <p className="text-xs font-bold text-amber-800 mb-2">اللوحة الثانية — اضغط على الاختلافات هنا!</p>
          <svg viewBox="0 0 320 200" className="w-full rounded-2xl bg-sky-200">
            <rect y="140" width="320" height="60" fill="#4ade80" />
            {/* Diff 1: Orange/Pink Sun */}
            <g onClick={() => markFound('sun')} className="cursor-pointer">
              <circle cx="265" cy="45" r="26" fill="#f97316" />
              {found.includes('sun') && (
                <circle cx="265" cy="45" r="32" fill="none" stroke="#16a34a" strokeWidth="4" />
              )}
            </g>

            {/* Tree + Diff 2: Bird on tree */}
            <rect x="65" y="100" width="20" height="50" fill="#92400e" />
            <circle cx="75" cy="85" r="32" fill="#16a34a" />
            <g onClick={() => markFound('bird')} className="cursor-pointer">
              <circle cx="75" cy="52" r="10" fill="#3b82f6" />
              <polygon points="85,50 93,53 85,56" fill="#f59e0b" />
              {found.includes('bird') && (
                <circle cx="75" cy="52" r="18" fill="none" stroke="#16a34a" strokeWidth="4" />
              )}
            </g>

            {/* House */}
            <rect x="160" y="95" width="75" height="55" rx="6" fill="#fef3c7" />
            <polygon points="150,98 197,58 245,98" fill="#ef4444" />
            <rect x="188" y="120" width="20" height="30" fill="#78350f" />

            {/* Diff 3: Extra Flower */}
            <g onClick={() => markFound('flower')} className="cursor-pointer">
              <rect x="255" y="145" width="5" height="22" fill="#15803d" />
              <circle cx="257" cy="142" r="10" fill="#ec4899" />
              <circle cx="257" cy="142" r="4" fill="#fde047" />
              {found.includes('flower') && (
                <circle cx="257" cy="146" r="20" fill="none" stroke="#16a34a" strokeWidth="4" />
              )}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

// 10. تركيب الصور Puzzle (Swap-tile 3x3 Puzzle)
export const JigsawPuzzleGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const solvedTiles = [
    { id: 0, label: '☀️', bg: 'bg-sky-200' },
    { id: 1, label: '☁️', bg: 'bg-sky-100' },
    { id: 2, label: '🐦', bg: 'bg-sky-200' },
    { id: 3, label: '🌳', bg: 'bg-emerald-200' },
    { id: 4, label: '🏠', bg: 'bg-amber-200' },
    { id: 5, label: '🌴', bg: 'bg-emerald-200' },
    { id: 6, label: '🌷', bg: 'bg-green-300' },
    { id: 7, label: '🚗', bg: 'bg-slate-200' },
    { id: 8, label: '🌼', bg: 'bg-green-300' },
  ];

  // Start slightly shuffled for a fun 6-year-old level
  const [order, setOrder] = useState<number[]>([2, 1, 0, 3, 5, 4, 6, 8, 7]);
  const [selectedPos, setSelectedPos] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const correctCount = order.filter((val, idx) => val === idx).length;
    onRoundLabel(`قطع في مكانها: ${correctCount} / ٩`);
    onQuestionAudio('اضغط على قطعتين لتبديلهما حتى تكتمل لوحة الطبيعة');
  }, [order, onRoundLabel, onQuestionAudio]);

  const handleTileClick = (pos: number) => {
    playClickSound();
    if (selectedPos === null) {
      setSelectedPos(pos);
      return;
    }
    if (selectedPos === pos) {
      setSelectedPos(null);
      return;
    }
    const next = [...order];
    [next[selectedPos], next[pos]] = [next[pos], next[selectedPos]];
    setOrder(next);
    setSelectedPos(null);
    setMoves((m) => m + 1);

    const correctCount = next.filter((val, idx) => val === idx).length;
    onScoreChange(correctCount * 10);
    if (correctCount === 9) {
      speakEncouragement();
      onFinish(Math.max(60, 120 - moves * 5), 4);
    }
  };

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">
        رتّب اللوحة! اضغط على قطعتين لتبديل مكانهما
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-2 p-3 rounded-3xl bg-slate-100 border-2 border-slate-200" dir="ltr">
          {order.map((tileId, pos) => {
            const tile = solvedTiles[tileId];
            const isCorrect = tileId === pos;
            const isSel = selectedPos === pos;
            return (
              <button
                key={pos}
                onClick={() => handleTileClick(pos)}
                className={`h-22 rounded-2xl ${tile.bg} flex flex-col items-center justify-center text-3xl border-4 transition cursor-pointer ${
                  isSel
                    ? 'border-amber-500 scale-105'
                    : isCorrect
                    ? 'border-emerald-500'
                    : 'border-white'
                }`}
              >
                <span>{tile.label}</span>
                <span className="text-[11px] font-bold text-slate-700">{tileId + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl bg-amber-50 border border-amber-200 p-4 space-y-2">
          <p className="text-sm font-bold text-amber-900">الصورة الصحيحة للمساعدة:</p>
          <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto" dir="ltr">
            {solvedTiles.map((t) => (
              <div
                key={t.id}
                className={`h-12 rounded-xl ${t.bg} flex items-center justify-center text-xl border border-white`}
              >
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 11. المتاهة
export const MazeGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  // 0 = path, 1 = wall, 2 = goal
  const grid = [
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 2],
  ];
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    onRoundLabel(`عدد الخطوات: ${steps}`);
    onQuestionAudio('حرّك محمد بالأسهم ليصل إلى الكنز');
  }, [steps, onRoundLabel, onQuestionAudio]);

  const move = (dr: number, dc: number) => {
    const nr = pos.r + dr;
    const nc = pos.c + dc;
    if (nr < 0 || nr >= 5 || nc < 0 || nc >= 5 || grid[nr][nc] === 1) {
      playGentleTryAgainSound();
      return;
    }
    playClickSound();
    setPos({ r: nr, c: nc });
    setSteps((s) => s + 1);
    onScoreChange(Math.max(20, 100 - steps * 3));
    if (grid[nr][nc] === 2) {
      speakEncouragement();
      onFinish(100, 4);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); move(-1, 0); }
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1, 0); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); move(0, -1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); move(0, 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">
        ساعد محمد في الخروج من المتاهة والوصول للكنز!
      </h2>
      <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto p-3 rounded-3xl bg-sky-100 border-2 border-sky-200" dir="ltr">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = pos.r === r && pos.c === c;
            return (
              <div
                key={`${r}-${c}`}
                className={`h-14 rounded-xl flex items-center justify-center text-2xl font-bold ${
                  cell === 1
                    ? 'bg-emerald-700'
                    : isPlayer
                    ? 'bg-amber-300 border-2 border-amber-600'
                    : cell === 2
                    ? 'bg-yellow-200'
                    : 'bg-white'
                }`}
              >
                {isPlayer ? '👦' : cell === 1 ? '🌳' : cell === 2 ? '🏆' : ''}
              </div>
            );
          })
        )}
      </div>

      {/* Big Touch Directional Pad */}
      <div className="flex flex-col items-center gap-2" dir="ltr">
        <button onClick={() => move(-1, 0)} className="w-16 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center cursor-pointer">
          <ArrowUp className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => move(0, -1)} className="w-16 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center cursor-pointer">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button onClick={() => move(1, 0)} className="w-16 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center cursor-pointer">
            <ArrowDown className="w-6 h-6" />
          </button>
          <button onClick={() => move(0, 1)} className="w-16 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center cursor-pointer">
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 12. ترتيب الأحداث
export const SequenceOrderGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const stories = [
    {
      title: 'نمو الزهرة الجميلة',
      steps: [
        { id: 1, text: 'نضع البذرة في التربة', emoji: '🌰' },
        { id: 2, text: 'نسقيها بالماء فتظهر ورقة صغيرة', emoji: '🌱' },
        { id: 3, text: 'تكبر وتصبح زهرة جميلة', emoji: '🌸' },
      ],
    },
    {
      title: 'روتين محمد الصباحي',
      steps: [
        { id: 1, text: 'يستيقظ محمد من النوم', emoji: '🌅' },
        { id: 2, text: 'يغسل وجهه وأسنانه', emoji: '🪥' },
        { id: 3, text: 'يتناول فطوره ويذهب للمدرسة', emoji: '🎒' },
      ],
    },
  ];
  const [sIdx, setSIdx] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const cur = stories[sIdx];
  const shuffled = [cur.steps[2], cur.steps[0], cur.steps[1]];

  useEffect(() => {
    onRoundLabel(`قصة ${sIdx + 1} من ${stories.length}`);
    onQuestionAudio(`رتّب خطوات ${cur.title} من الأول إلى الأخير`);
  }, [sIdx, cur.title, stories.length, onRoundLabel, onQuestionAudio]);

  const handleStep = (stepId: number) => {
    if (picked.includes(stepId)) return;
    const expected = picked.length + 1;
    if (stepId === expected) {
      playPopSound();
      const next = [...picked, stepId];
      setPicked(next);
      const ns = score + 20;
      setScore(ns);
      onScoreChange(ns);
      if (next.length === 3) {
        speakEncouragement();
        window.setTimeout(() => {
          setPicked([]);
          if (sIdx + 1 >= stories.length) onFinish(ns, 3);
          else setSIdx((i) => i + 1);
        }, 800);
      }
    } else {
      playGentleTryAgainSound();
      speakArabic('فكّر ما الذي يحدث أولاً يا محمد!');
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">
        رتّب أحداث: {cur.title}
      </h2>
      <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
        {[1, 2, 3].map((slot) => {
          const step = cur.steps.find((s) => s.id === picked[slot - 1]);
          return (
            <div key={slot} className="rounded-2xl border-2 border-dashed border-teal-400 bg-teal-50 p-4 min-h-[110px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-teal-700 mb-1">الخطوة {slot}</span>
              {step ? (
                <>
                  <span className="text-3xl">{step.emoji}</span>
                  <span className="text-xs font-bold text-slate-800 mt-1">{step.text}</span>
                </>
              ) : (
                <span className="text-2xl text-teal-400">؟</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
        {shuffled.map((st) => (
          <button
            key={st.id}
            disabled={picked.includes(st.id)}
            onClick={() => handleStep(st.id)}
            className={`rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition cursor-pointer ${
              picked.includes(st.id)
                ? 'bg-emerald-50 border-emerald-200 opacity-50'
                : 'bg-white hover:bg-amber-50 border-amber-300'
            }`}
          >
            <span className="text-4xl">{st.emoji}</span>
            <span className="font-bold text-sm text-slate-800">{st.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// 13. اكتشف الحيوان من صوته
export const GuessAnimalSoundGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const animals = [
    { id: 'cat', name: 'القطة', emoji: '🐱', soundWord: 'مياو مياو!' },
    { id: 'lion', name: 'الأسد', emoji: '🦁', soundWord: 'زئير قوي: غرررر!' },
    { id: 'cow', name: 'البقرة', emoji: '🐄', soundWord: 'موووو!' },
    { id: 'duck', name: 'البطة', emoji: '🦆', soundWord: 'كواك كواك!' },
    { id: 'rooster', name: 'الديك', emoji: '🐓', soundWord: 'كوكوكو!' },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const target = animals[idx];

  const options = [
    target,
    animals[(idx + 1) % animals.length],
    animals[(idx + 3) % animals.length],
  ].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    onRoundLabel(`حيوان ${idx + 1} من ${animals.length}`);
    onQuestionAudio(`من صاحب هذا الصوت؟ ${target.soundWord}`);
  }, [idx, target.soundWord, animals.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
        اضغط لتسمع الصوت وخمّن من هو الحيوان!
      </h2>

      <button
        onClick={() => {
          playAnimalPattern(target.id);
          speakArabic(target.soundWord);
        }}
        className="inline-flex items-center gap-3 rounded-3xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-display font-black text-xl px-8 py-5 shadow-md cursor-pointer"
      >
        <Volume2 className="w-7 h-7" />
        <span>اسمع الصوت: «{target.soundWord}»</span>
      </button>

      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              if (opt.id === target.id) {
                speakEncouragement();
                const ns = score + 20;
                setScore(ns);
                onScoreChange(ns);
                setMsg(`صحيح! إنها ${opt.name}`);
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= animals.length) onFinish(ns, 4);
                  else setIdx((i) => i + 1);
                }, 850);
              } else {
                playGentleTryAgainSound();
                setMsg('حاول مرة أخرى واستمع للصوت!');
              }
            }}
            className="rounded-3xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 p-5 flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-6xl">{opt.emoji}</span>
            <span className="font-display font-extrabold text-lg text-slate-900">{opt.name}</span>
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};

// 15. تلوين الصور
export const ColoringGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const palette = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316'];
  const [activeColor, setActiveColor] = useState(palette[0]);
  const [template, setTemplate] = useState<'rocket' | 'butterfly' | 'house'>('rocket');
  const [fills, setFills] = useState<Record<string, string>>({});

  const coloredCount = Object.keys(fills).length;

  useEffect(() => {
    onRoundLabel(`الأجزاء الملونة: ${coloredCount}`);
    onQuestionAudio('اختر لونًا ثم اضغط على أي جزء في الرسمة لتلوينه');
  }, [coloredCount, onRoundLabel, onQuestionAudio]);

  const paint = (part: string) => {
    playPopSound();
    const next = { ...fills, [part]: activeColor };
    setFills(next);
    onScoreChange(Object.keys(next).length * 15);
  };

  return (
    <div className="space-y-5 text-center">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-600" />
          <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900">استوديو التلوين</h2>
        </div>

        <div className="flex items-center gap-2">
          {[
            { id: 'rocket', label: '🚀 صاروخ' },
            { id: 'butterfly', label: '🦋 فراشة' },
            { id: 'house', label: '🏠 بيت' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTemplate(t.id as typeof template);
                setFills({});
              }}
              className={`px-3 py-2 rounded-xl text-sm font-bold cursor-pointer ${
                template === t.id ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Palette */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {palette.map((c) => (
          <button
            key={c}
            onClick={() => {
              playClickSound();
              setActiveColor(c);
            }}
            style={{ backgroundColor: c }}
            aria-label="اختر لونًا"
            className={`w-11 h-11 rounded-full border-4 cursor-pointer transition ${
              activeColor === c ? 'border-slate-900 scale-115 shadow-md' : 'border-white shadow-xs'
            }`}
          />
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="max-w-sm mx-auto rounded-3xl bg-sky-50 border-2 border-sky-200 p-4">
        {template === 'rocket' && (
          <svg viewBox="0 0 240 240" className="w-full">
            <polygon points="120,20 155,75 85,75" fill={fills.nose || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('nose')} className="cursor-pointer" />
            <rect x="85" y="75" width="70" height="100" rx="8" fill={fills.body || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('body')} className="cursor-pointer" />
            <circle cx="120" cy="118" r="22" fill={fills.win || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('win')} className="cursor-pointer" />
            <polygon points="85,135 50,185 85,175" fill={fills.wingL || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('wingL')} className="cursor-pointer" />
            <polygon points="155,135 190,185 155,175" fill={fills.wingR || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('wingR')} className="cursor-pointer" />
            <polygon points="100,175 120,220 140,175" fill={fills.flame || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('flame')} className="cursor-pointer" />
          </svg>
        )}

        {template === 'butterfly' && (
          <svg viewBox="0 0 240 240" className="w-full">
            <ellipse cx="75" cy="95" rx="45" ry="38" fill={fills.w1 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('w1')} className="cursor-pointer" />
            <ellipse cx="165" cy="95" rx="45" ry="38" fill={fills.w2 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('w2')} className="cursor-pointer" />
            <ellipse cx="82" cy="155" rx="35" ry="30" fill={fills.w3 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('w3')} className="cursor-pointer" />
            <ellipse cx="158" cy="155" rx="35" ry="30" fill={fills.w4 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('w4')} className="cursor-pointer" />
            <rect x="108" y="65" width="24" height="115" rx="12" fill={fills.bbody || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('bbody')} className="cursor-pointer" />
          </svg>
        )}

        {template === 'house' && (
          <svg viewBox="0 0 240 240" className="w-full">
            <polygon points="40,105 120,35 200,105" fill={fills.roof || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('roof')} className="cursor-pointer" />
            <rect x="55" y="105" width="130" height="95" fill={fills.wall || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('wall')} className="cursor-pointer" />
            <rect x="103" y="140" width="34" height="60" fill={fills.door || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('door')} className="cursor-pointer" />
            <rect x="68" y="125" width="24" height="24" fill={fills.win1 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('win1')} className="cursor-pointer" />
            <rect x="148" y="125" width="24" height="24" fill={fills.win2 || '#ffffff'} stroke="#1e293b" strokeWidth="4" onClick={() => paint('win2')} className="cursor-pointer" />
          </svg>
        )}
      </div>

      <button
        onClick={() => {
          speakEncouragement();
          onFinish(Math.max(50, coloredCount * 20), 3);
        }}
        className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 cursor-pointer"
      >
        <Sparkles className="w-5 h-5" />
        <span>أنهيت التلوين! احفظ لوحتي</span>
      </button>
    </div>
  );
};

// 16. البحث عن الكنز
export const TreasureHuntGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const clues = [
    { clue: 'الكنز الأول مختبئ عند الشجرة الكبيرة في الزاوية العلوية اليمنى!', target: 3 },
    { clue: 'الكنز الثاني تحت الصخرة في الصف الأوسط العمود الثاني!', target: 5 },
    { clue: 'الكنز الذهبي الأخير عند القارب في الأسفل!', target: 10 },
  ];
  const icons = ['🏝️', '🦀', '🌴', '🌳', '🐚', '🪨', '⭐', '🌺', '🦜', '🐠', '⛵', '🧭'];
  const [round, setRound] = useState(0);
  const [dug, setDug] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const cur = clues[round];

  useEffect(() => {
    onRoundLabel(`كنز ${round + 1} من ${clues.length}`);
    onQuestionAudio(cur.clue);
  }, [round, cur.clue, clues.length, onRoundLabel, onQuestionAudio]);

  const digTile = (idx: number) => {
    if (idx === cur.target) {
      playPopSound();
      const ns = score + 30;
      setScore(ns);
      onScoreChange(ns);
      speakEncouragement();
      window.setTimeout(() => {
        setDug([]);
        if (round + 1 >= clues.length) onFinish(ns, 4);
        else setRound((r) => r + 1);
      }, 800);
    } else {
      playGentleTryAgainSound();
      setDug((prev) => [...prev, idx]);
    }
  };

  return (
    <div className="space-y-5 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">اتبع الخريطة وابحث عن الكنز!</h2>
      <p className="rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3 font-bold text-amber-950 max-w-xl mx-auto">
        🗺️ {cur.clue}
      </p>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {icons.map((ic, idx) => (
          <button
            key={idx}
            onClick={() => digTile(idx)}
            className={`h-20 rounded-2xl text-4xl border-2 transition cursor-pointer ${
              dug.includes(idx)
                ? 'bg-slate-100 border-slate-200 opacity-50'
                : 'bg-cyan-50 hover:bg-amber-100 border-cyan-200'
            }`}
          >
            {dug.includes(idx) ? '🕳️' : ic}
          </button>
        ))}
      </div>
    </div>
  );
};

// 20. مغامرة الأسئلة والمعلومات العامة
export const AdventureQuizGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const questions = [
    { q: 'ما الكوكب الذي نعيش عليه؟', emoji: '🌍', opts: ['كوكب الأرض', 'كوكب زحل', 'القمر'], ans: 'كوكب الأرض' },
    { q: 'من يعالج المرضى في المستشفى؟', emoji: '🏥', opts: ['الطيار', 'الطبيب', 'المهندس'], ans: 'الطبيب' },
    { q: 'أي وسيلة مواصلات تطير في السماء؟', emoji: '☁️', opts: ['السفينة', 'القطار', 'الطائرة'], ans: 'الطائرة' },
    { q: 'كم عدد أيام الأسبوع؟', emoji: '📅', opts: ['٥ أيام', '٧ أيام', '١٠ أيام'], ans: '٧ أيام' },
    { q: 'ما العضو الذي نرى به الألوان الجميلة؟', emoji: '👁️', opts: ['العين', 'الأذن', 'الأنف'], ans: 'العين' },
  ];
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');
  const cur = questions[idx];

  useEffect(() => {
    onRoundLabel(`سؤال ${idx + 1} من ${questions.length}`);
    onQuestionAudio(cur.q);
  }, [idx, cur.q, questions.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <div className="text-7xl">{cur.emoji}</div>
      <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">{cur.q}</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {cur.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === cur.ans) {
                speakEncouragement();
                const ns = score + 20;
                setScore(ns);
                onScoreChange(ns);
                setMsg('معلومة صحيحة يا بطل!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= questions.length) onFinish(ns, 4);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                speakArabic('فكّر مرة أخرى يا محمد!');
                setMsg('قريب جدًا! جرّب إجابة أخرى.');
              }
            }}
            className="px-7 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-display text-xl font-black cursor-pointer min-w-[150px]"
          >
            {opt}
          </button>
        ))}
      </div>
      {msg && (
        <p className="font-bold text-emerald-700 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-5 h-5" />
          <span>{msg}</span>
        </p>
      )}
    </div>
  );
};
