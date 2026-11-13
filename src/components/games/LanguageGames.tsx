import React, { useEffect, useRef, useState } from 'react';
import { ARABIC_LETTERS, ENGLISH_CVC_WORDS, READING_WORDS } from '../../data/curriculum';
import {
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

// 1. صائد الحروف (60fps Falling Bubbles Catcher)
export const LetterCatcherGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const targets = ARABIC_LETTERS.slice(0, 8);
  const [targetIdx, setTargetIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [feedback, setFeedback] = useState('التقط الفقاعات التي تحمل الحرف المطلوب!');

  interface Bubble {
    id: number;
    letter: string;
    x: number;
    y: number;
    speed: number;
    color: string;
  }

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const nextIdRef = useRef(1);
  const targetLetter = targets[targetIdx % targets.length];

  useEffect(() => {
    onRoundLabel(`الهدف: ${caughtCount} / ٦ فقاعات`);
    onQuestionAudio(`اصطد فقاعات حرف ${targetLetter.name}`);
  }, [caughtCount, targetLetter, onRoundLabel, onQuestionAudio]);

  useEffect(() => {
    const colors = ['bg-amber-300', 'bg-sky-300', 'bg-emerald-300', 'bg-rose-300', 'bg-violet-300'];
    const spawn = () => {
      const isTarget = Math.random() < 0.48;
      const randomLetter = isTarget
        ? targetLetter.letter
        : ARABIC_LETTERS[Math.floor(Math.random() * 14)].letter;
      setBubbles((prev) => [
        ...prev.slice(-10),
        {
          id: nextIdRef.current++,
          letter: randomLetter,
          x: 10 + Math.random() * 80,
          y: -10,
          speed: 0.42 + Math.random() * 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    };

    spawn();
    const spawnTimer = window.setInterval(spawn, 950);

    let animId = 0;
    let lastTime = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;
      setBubbles((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + b.speed * dt }))
          .filter((b) => b.y < 105)
      );
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);

    return () => {
      window.clearInterval(spawnTimer);
      cancelAnimationFrame(animId);
    };
  }, [targetLetter]);

  const catchBubble = (bubble: Bubble) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    if (bubble.letter === targetLetter.letter) {
      playPopSound();
      const nextScore = score + 10;
      const nextCaught = caughtCount + 1;
      setScore(nextScore);
      setCaughtCount(nextCaught);
      onScoreChange(nextScore);
      setFeedback('ممتاز يا محمد! اصطدت الحرف الصحيح!');
      if (nextCaught >= 6) {
        speakEncouragement();
        onFinish(nextScore, 4);
      } else if (nextCaught % 2 === 0) {
        setTargetIdx((i) => i + 1);
      }
    } else {
      playGentleTryAgainSound();
      setFeedback(`هذه ${bubble.letter} — ابحث عن حرف ${targetLetter.name} (${targetLetter.letter})`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-4">
        <p className="font-display text-xl font-black text-slate-900">
          اصطد حرف: <span className="text-3xl text-amber-600 mx-1">{targetLetter.letter}</span> ({targetLetter.name})
        </p>
        <p className="text-sm font-bold text-sky-800">{feedback}</p>
      </div>

      <div className="relative h-80 sm:h-96 w-full rounded-3xl bg-gradient-to-b from-sky-100 to-cyan-50 border-2 border-sky-200 overflow-hidden select-none">
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={() => catchBubble(b)}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className={`absolute -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full ${b.color} border-4 border-white shadow-md flex items-center justify-center font-display text-3xl font-black text-slate-900 cursor-pointer hover:scale-110 transition-transform`}
          >
            {b.letter}
          </button>
        ))}
      </div>
    </div>
  );
};

// 2. تركيب الكلمات
export const WordBuilderGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const words = READING_WORDS.slice(0, 5);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');

  const item = words[idx];
  const shuffled = [...item.letters].reverse();

  useEffect(() => {
    onRoundLabel(`كلمة ${idx + 1} من ${words.length}`);
    onQuestionAudio(`ركّب حروف كلمة ${item.word}`);
  }, [idx, item.word, words.length, onRoundLabel, onQuestionAudio]);

  const pickLetter = (ltr: string) => {
    playClickSound();
    const next = [...picked, ltr];
    setPicked(next);
    if (next.length === item.letters.length) {
      if (next.join('') === item.letters.join('')) {
        speakEncouragement();
        const nextScore = score + 20;
        setScore(nextScore);
        onScoreChange(nextScore);
        setMsg('أحسنت! ركبت الكلمة بشكل صحيح!');
        window.setTimeout(() => {
          setPicked([]);
          setMsg('');
          if (idx + 1 >= words.length) {
            onFinish(nextScore, 4);
          } else {
            setIdx((i) => i + 1);
          }
        }, 900);
      } else {
        playGentleTryAgainSound();
        setMsg(`جرّب ترتيب حروف «${item.word}» مرة أخرى!`);
        window.setTimeout(() => setPicked([]), 700);
      }
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-7xl">{item.emoji}</div>
      <h2 className="font-display text-2xl font-black text-slate-900">
        كوّن كلمة «{item.word}» بالضغط على الحروف بالترتيب:
      </h2>

      <div className="flex items-center justify-center gap-3">
        {item.letters.map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-2xl border-2 border-dashed border-sky-400 bg-sky-50 flex items-center justify-center font-display text-3xl font-black text-sky-900"
          >
            {picked[i] || ''}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {shuffled.map((ltr, i) => (
          <button
            key={`${ltr}-${i}`}
            onClick={() => pickLetter(ltr)}
            className="w-18 h-18 px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-3xl font-black shadow-sm cursor-pointer"
          >
            {ltr}
          </button>
        ))}
      </div>

      {msg && <p className="font-bold text-lg text-emerald-700">{msg}</p>}
    </div>
  );
};

// 3. اختر الكلمة الصحيحة
export const ChooseCorrectWordGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const pool = READING_WORDS.slice(0, 6);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');

  const item = pool[idx];
  const options = [
    item.word,
    pool[(idx + 1) % pool.length].word,
    pool[(idx + 3) % pool.length].word,
  ].sort();

  useEffect(() => {
    onRoundLabel(`السؤال ${idx + 1} من ${pool.length}`);
    onQuestionAudio(`ما اسم هذه الصورة؟`);
  }, [idx, pool.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <div className="text-8xl">{item.emoji}</div>
      <h2 className="font-display text-2xl font-black text-slate-900">اختر الكلمة المناسبة للصورة:</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              if (opt === item.word) {
                speakEncouragement();
                const ns = score + 15;
                setScore(ns);
                onScoreChange(ns);
                setMsg('إجابة صحيحة يا بطل!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= pool.length) onFinish(ns, 3);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                setMsg('حاول مرة أخرى يا محمد!');
              }
            }}
            className="px-8 py-4 rounded-2xl bg-sky-50 hover:bg-sky-200 border-2 border-sky-200 font-display text-2xl font-black text-slate-900 cursor-pointer min-w-[140px]"
          >
            {opt}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700 text-lg">{msg}</p>}
    </div>
  );
};

// 4. أكمل الكلمة الناقصة
export const MissingLetterGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const pool = READING_WORDS.slice(0, 6);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState('');

  const item = pool[idx];
  const answer = item.letters[item.missingIndex];
  const opts = Array.from(new Set([answer, 'م', 'س', 'ب'])).slice(0, 3).sort();

  useEffect(() => {
    onRoundLabel(`كلمة ${idx + 1} من ${pool.length}`);
    onQuestionAudio(`أكمل الحرف الناقص في كلمة ${item.word}`);
  }, [idx, item.word, pool.length, onRoundLabel, onQuestionAudio]);

  return (
    <div className="text-center space-y-6">
      <div className="text-7xl">{item.emoji}</div>
      <h2 className="font-display text-2xl font-black text-slate-900">أكمل الحرف الناقص في «{item.word}»:</h2>
      <div className="flex items-center justify-center gap-3">
        {item.letters.map((l, i) => (
          <span
            key={i}
            className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display text-3xl font-black ${
              i === item.missingIndex
                ? 'bg-amber-100 border-2 border-dashed border-amber-500 text-amber-700'
                : 'bg-slate-100 text-slate-900'
            }`}
          >
            {i === item.missingIndex ? '؟' : l}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        {opts.map((o) => (
          <button
            key={o}
            onClick={() => {
              if (o === answer) {
                speakEncouragement();
                const ns = score + 15;
                setScore(ns);
                onScoreChange(ns);
                setMsg('ممتاز!');
                window.setTimeout(() => {
                  setMsg('');
                  if (idx + 1 >= pool.length) onFinish(ns, 3);
                  else setIdx((i) => i + 1);
                }, 800);
              } else {
                playGentleTryAgainSound();
                setMsg('جرّب حرفًا آخر!');
              }
            }}
            className="w-24 h-20 rounded-2xl bg-amber-400 hover:bg-amber-300 font-display text-3xl font-black text-slate-950 cursor-pointer"
          >
            {o}
          </button>
        ))}
      </div>
      {msg && <p className="font-bold text-emerald-700">{msg}</p>}
    </div>
  );
};

// 14. صل الصورة بالكلمة
export const MatchPictureWordGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const pairs = ENGLISH_CVC_WORDS.slice(0, 5);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const shuffledWords = [...pairs].sort((a, b) => a.word.localeCompare(b.word));

  useEffect(() => {
    onRoundLabel(`تم توصيل ${matched.length} من ${pairs.length}`);
    onQuestionAudio('اضغط على الصورة ثم اضغط على الكلمة الإنجليزية المطابقة لها');
  }, [matched.length, pairs.length, onRoundLabel, onQuestionAudio]);

  const handleWordClick = (word: string) => {
    if (!selectedEmoji) {
      speakArabic('اختر صورة أولاً ثم اختر كلمتها!');
      return;
    }
    const target = pairs.find((p) => p.emoji === selectedEmoji);
    if (target && target.word === word) {
      playPopSound();
      const nextMatched = [...matched, word];
      const ns = score + 20;
      setMatched(nextMatched);
      setScore(ns);
      onScoreChange(ns);
      setSelectedEmoji(null);
      if (nextMatched.length >= pairs.length) {
        speakEncouragement();
        onFinish(ns, 4);
      }
    } else {
      playGentleTryAgainSound();
      setSelectedEmoji(null);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <h2 className="font-display text-2xl font-black text-slate-900">
        صل كل صورة بالكلمة الإنجليزية الصحيحة!
      </h2>
      <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
        <div className="space-y-3">
          {pairs.map((p) => {
            const done = matched.includes(p.word);
            return (
              <button
                key={p.word}
                disabled={done}
                onClick={() => {
                  playClickSound();
                  setSelectedEmoji(p.emoji);
                }}
                className={`w-full py-3 rounded-2xl text-4xl border-2 transition cursor-pointer ${
                  done
                    ? 'bg-emerald-50 border-emerald-300 opacity-50'
                    : selectedEmoji === p.emoji
                    ? 'bg-amber-100 border-amber-500 scale-105'
                    : 'bg-sky-50 border-sky-200 hover:bg-sky-100'
                }`}
              >
                {p.emoji}
              </button>
            );
          })}
        </div>

        <div className="space-y-3" dir="ltr">
          {shuffledWords.map((p) => {
            const done = matched.includes(p.word);
            return (
              <button
                key={p.word}
                disabled={done}
                onClick={() => handleWordClick(p.word)}
                className={`w-full py-4 rounded-2xl font-display text-2xl font-black border-2 transition cursor-pointer ${
                  done
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-60'
                    : 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-900'
                }`}
              >
                {p.word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// 17. ترتيب الحروف
export const OrderLettersGame: React.FC<CommonGameProps> = ({
  onScoreChange,
  onRoundLabel,
  onQuestionAudio,
  onFinish,
}) => {
  const rounds = [
    { title: 'رتّب الحروف العربية من أ إلى ث:', answer: ['أ', 'ب', 'ت', 'ث'], scrambled: ['ت', 'أ', 'ث', 'ب'] },
    { title: 'رتّب الحروف العربية من ج إلى د:', answer: ['ج', 'ح', 'خ', 'د'], scrambled: ['خ', 'ج', 'د', 'ح'] },
    { title: 'رتّب الحروف الإنجليزية من A إلى D:', answer: ['A', 'B', 'C', 'D'], scrambled: ['C', 'A', 'D', 'B'] },
  ];
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const current = rounds[idx];

  useEffect(() => {
    onRoundLabel(`جولة ${idx + 1} من ${rounds.length}`);
    onQuestionAudio(current.title);
  }, [idx, current.title, rounds.length, onRoundLabel, onQuestionAudio]);

  const handlePick = (ltr: string) => {
    if (picked.includes(ltr)) return;
    const expected = current.answer[picked.length];
    if (ltr === expected) {
      playPopSound();
      const next = [...picked, ltr];
      setPicked(next);
      if (next.length === current.answer.length) {
        speakEncouragement();
        const ns = score + 25;
        setScore(ns);
        onScoreChange(ns);
        window.setTimeout(() => {
          setPicked([]);
          if (idx + 1 >= rounds.length) onFinish(ns, 3);
          else setIdx((i) => i + 1);
        }, 800);
      }
    } else {
      playGentleTryAgainSound();
      speakArabic(`ابحث عن الحرف ${expected} أولاً!`);
    }
  };

  return (
    <div className="text-center space-y-6">
      <h2 className="font-display text-2xl font-black text-slate-900">{current.title}</h2>
      <div className="flex items-center justify-center gap-3">
        {current.answer.map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-2xl border-2 border-dashed border-sky-400 bg-sky-50 flex items-center justify-center font-display text-3xl font-black text-sky-900"
          >
            {picked[i] || ''}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {current.scrambled.map((ltr) => (
          <button
            key={ltr}
            disabled={picked.includes(ltr)}
            onClick={() => handlePick(ltr)}
            className={`w-20 h-20 rounded-2xl font-display text-3xl font-black transition cursor-pointer ${
              picked.includes(ltr)
                ? 'bg-emerald-100 text-emerald-700 opacity-50'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm'
            }`}
          >
            {ltr}
          </button>
        ))}
      </div>
    </div>
  );
};
