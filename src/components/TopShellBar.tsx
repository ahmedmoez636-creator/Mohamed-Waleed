import React from 'react';
import { Volume2, VolumeX, ShieldCheck, Map, BookOpen, Gamepad2, Trophy, Star } from 'lucide-react';
import { AppScreen } from '../types/app';
import { APP_LOGO_IMAGE, COMPANION_CHARACTERS } from '../data/islandsAndRewards';
import { PWAInstallButton } from './PWAHelper';
import { playClickSound } from '../utils/sound';

interface TopShellBarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  stars: number;
  level: number;
  activeCompanionId: string;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenParentGate: () => void;
}

export const TopShellBar: React.FC<TopShellBarProps> = ({
  currentScreen,
  onNavigate,
  stars,
  level,
  activeCompanionId,
  soundMuted,
  onToggleSound,
  onOpenParentGate,
}) => {
  const activeCompanion =
    COMPANION_CHARACTERS.find((c) => c.id === activeCompanionId) || COMPANION_CHARACTERS[0];

  const navItems: { id: AppScreen; label: string; icon: React.ReactNode }[] = [
    { id: 'MAP', label: 'عالم الجزر', icon: <Map className="w-4 h-4" /> },
    { id: 'LEARN', label: 'الأقسام التعليمية', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'GAMES', label: 'الألعاب (٢٠)', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'REWARDS', label: 'المكافآت والشهادات', icon: <Trophy className="w-4 h-4" /> },
  ];

  const handleNav = (screen: AppScreen) => {
    playClickSound();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Cartoon Logo & Mohammed Profile */}
        <button
          onClick={() => handleNav('MAP')}
          className="flex items-center gap-3 text-right cursor-pointer shrink-0 group"
          title={activeCompanion.name}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-sky-100 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={APP_LOGO_IMAGE}
              alt="لوجو مغامرات محمد التعليمية"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <span className="block font-display text-base font-extrabold text-slate-900 whitespace-nowrap group-hover:text-sky-700 transition-colors">
              مغامرات محمد التعليمية
            </span>
            <span className="block text-xs font-bold text-sky-700 whitespace-nowrap">
              محمد وليد هيكل · المستوى {level}
            </span>
          </div>
        </button>

        {/* Zone 2: Clean Single-Line Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const active = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] ${
                  active
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-sky-50 hover:text-sky-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Stars, Audio, Install & Parent Gate */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-amber-900 font-display font-extrabold text-sm tabular-nums whitespace-nowrap"
            title="نجوم محمد الذهبية"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{stars}</span>
          </div>

          <button
            onClick={onToggleSound}
            aria-label={soundMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            title={soundMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
            className={`flex items-center justify-center w-11 h-11 rounded-xl border transition cursor-pointer shrink-0 ${
              soundMuted
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100'
            }`}
          >
            {soundMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <PWAInstallButton />

          <button
            onClick={() => {
              playClickSound();
              onOpenParentGate();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2.5 text-xs sm:text-sm font-bold transition whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="hidden md:inline">ولي الأمر</span>
          </button>
        </div>
      </div>
    </header>
  );
};
