import React from 'react';
import { ArrowRight, RotateCcw, Star, Trophy, Volume2 } from 'lucide-react';
import { GameMeta } from '../../types/app';
import { playClickSound, speakArabic } from '../../utils/sound';

interface GameShellProps {
  game: GameMeta;
  score: number;
  roundLabel?: string;
  questionAudioText?: string;
  isFinished: boolean;
  starsEarned: number;
  onExit: () => void;
  onRestart: () => void;
  children: React.ReactNode;
}

export const GameShell: React.FC<GameShellProps> = ({
  game,
  score,
  roundLabel,
  questionAudioText,
  isFinished,
  starsEarned,
  onExit,
  onRestart,
  children,
}) => {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-5">
      {/* Unobtrusive Top Game HUD */}
      <div className="rounded-3xl bg-white border border-slate-200 px-4 sm:px-6 py-3.5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClickSound();
              onExit();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2.5 text-sm cursor-pointer min-h-[44px]"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الألعاب</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">{game.emoji}</span>
            <div>
              <h1 className="font-display text-lg sm:text-xl font-black text-slate-900">
                {game.title}
              </h1>
              {roundLabel && <p className="text-xs font-bold text-sky-700">{roundLabel}</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {questionAudioText && (
            <button
              onClick={() => speakArabic(questionAudioText)}
              className="flex items-center gap-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold px-3.5 py-2 text-xs sm:text-sm cursor-pointer min-h-[44px]"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسمع السؤال</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2 font-display font-black text-amber-900 text-sm tabular-nums min-h-[44px]">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>النقاط: {score}</span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onRestart();
            }}
            aria-label="إعادة اللعبة"
            title="إعادة اللعبة"
            className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Playfield */}
      {!isFinished ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm min-h-[430px] flex flex-col justify-center">
          {children}
        </div>
      ) : (
        <div className="rounded-3xl bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 p-8 sm:p-12 shadow-lg text-center space-y-6 animate-gentle-pop">
          <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-extrabold text-amber-700">أحسنت يا محمد وليد هيكل!</p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
              أنهيت لعبة {game.title} بنجاح!
            </h2>
            <p className="text-lg font-bold text-slate-600">
              حصلت على <span className="text-amber-600 font-black">{starsEarned} نجوم ذهبية ⭐</span> · النتيجة: {score}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                playClickSound();
                onRestart();
              }}
              className="flex items-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold px-7 py-4 text-base shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>العب مرة أخرى</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onExit();
              }}
              className="rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-7 py-4 text-base cursor-pointer"
            >
              العودة لقائمة الألعاب
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
