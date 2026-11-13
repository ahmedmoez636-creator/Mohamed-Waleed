import React, { useEffect } from 'react';
import { Volume2, VolumeX, Compass, Sparkles } from 'lucide-react';
import { APP_LOGO_IMAGE, COMPANION_CHARACTERS, WORLD_BACKDROP_IMAGE } from '../data/islandsAndRewards';
import { playLevelUpSound, speakArabic } from '../utils/sound';

interface TitleWelcomeScreenProps {
  stars: number;
  level: number;
  soundMuted: boolean;
  onToggleSound: () => void;
  onStartAdventure: () => void;
}

export const TitleWelcomeScreen: React.FC<TitleWelcomeScreenProps> = ({
  stars,
  level,
  soundMuted,
  onToggleSound,
  onStartAdventure,
}) => {
  const mohammedChar = COMPANION_CHARACTERS[0];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playLevelUpSound();
        speakArabic('مرحبًا يا محمد وليد هيكل! أهلاً بك في عالم المغامرات والتعلم!');
        onStartAdventure();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onStartAdventure]);

  const handleVoiceGreeting = () => {
    speakArabic('مرحبًا يا محمد وليد هيكل! أهلاً بك في عالم المغامرات والتعلم. نتعلم ونلعب ونكتشف كل يوم!');
  };

  const handleStart = () => {
    playLevelUpSound();
    speakArabic('هيا نبدأ المغامرة يا بطل!');
    onStartAdventure();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-sky-900 flex flex-col justify-between">
      {/* Full-viewport illustrated archipelago backdrop */}
      <img
        src={WORLD_BACKDROP_IMAGE}
        alt="خريطة عالم مغامرات محمد التعليمية"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-slate-950/85 via-slate-900/55 to-sky-900/35" />

      {/* Top minimal controls */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-300 shadow-lg shrink-0 bg-sky-100">
            <img
              src={APP_LOGO_IMAGE}
              alt="لوجو مغامرات محمد التعليمية"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight">
              مغامرات محمد التعليمية
            </p>
            <p className="text-xs md:text-sm font-medium text-amber-200">
              نتعلم ونلعب ونكتشف كل يوم!
            </p>
          </div>
        </div>

        <button
          onClick={onToggleSound}
          aria-label={soundMuted ? 'تشغيل الصوت' : 'إيقاف الصوت'}
          className="flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 px-4 py-3 text-sm font-bold text-white transition cursor-pointer min-h-[48px]"
        >
          {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          <span>{soundMuted ? 'الصوت متوقف' : 'الصوت يعمل'}</span>
        </button>
      </div>

      {/* Main focal hero stage */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 py-6 md:px-12 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Welcome Text & Primary CTA */}
          <div className="lg:col-span-7 text-right space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-sm md:text-base">
              <Sparkles className="w-5 h-5" />
              <span>عالم مخصص للبطل ذي الـ ٦ سنوات · المستوى {level} · {stars} نجمة ⭐</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight [text-wrap:balance]">
              مرحبًا يا محمد وليد هيكل!
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-sky-100 leading-relaxed max-w-2xl">
              أهلاً بك في عالم المغامرات والتعلم.
            </p>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
              ٦ جزر مدهشة تنتظرك لتتعلم الحروف والأرقام والإنجليزية والمعرفة العامة، وتلعب ٢٠ لعبة ممتعة وتجمع النجوم والهدايا!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleStart}
                className="flex items-center justify-center gap-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-display font-black text-xl md:text-2xl px-8 py-4 shadow-xl shadow-amber-500/30 transition cursor-pointer min-h-[60px]"
              >
                <Compass className="w-7 h-7" />
                <span>ابدأ المغامرة!</span>
              </button>

              <button
                onClick={handleVoiceGreeting}
                className="flex items-center justify-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-base md:text-lg px-6 py-4 transition cursor-pointer min-h-[60px]"
              >
                <Volume2 className="w-6 h-6 text-amber-300" />
                <span>اسمع الترحيب</span>
              </button>
            </div>
          </div>

          {/* 3D Cartoon Explorer Character Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl bg-gradient-to-b from-white/20 to-white/5 p-3 border border-white/30 shadow-2xl animate-float-slow">
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-sky-100">
                  <img
                    src={mohammedChar.image}
                    alt="محمد وليد هيكل المستكشف"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
                  <p className="font-display text-lg font-extrabold text-slate-900">
                    أهلاً يا صديقي! أنا محمد 👋
                  </p>
                  <p className="text-sm font-medium text-sky-700 mt-0.5">
                    اضغط «ابدأ المغامرة!» لنبحر إلى الجزر الست
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Single flat control-hint line */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs sm:text-sm font-medium text-sky-100/80">
        اضغط Enter أو المسافة للبدء · بدون إعلانات · جميع البيانات محفوظة تلقائيًا لمحمد وليد هيكل
      </footer>
    </div>
  );
};
