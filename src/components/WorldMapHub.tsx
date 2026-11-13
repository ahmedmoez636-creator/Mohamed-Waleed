import React from 'react';
import { BookOpen, Gamepad2, Gift, Sparkles, Volume2, Award } from 'lucide-react';
import {
  ALL_GAMES,
  COMPANION_CHARACTERS,
  ISLANDS,
  WORLD_BACKDROP_IMAGE,
  getLevelTitle,
} from '../data/islandsAndRewards';
import { GameId, IslandId, LearningSubject, PlayerProgress } from '../types/app';
import { playClickSound, speakArabic } from '../utils/sound';

interface WorldMapHubProps {
  progress: PlayerProgress;
  availableMysteryBoxes: number;
  onSelectIslandLearn: (subject: LearningSubject) => void;
  onSelectGame: (gameId: GameId) => void;
  onOpenRewards: () => void;
}

export const WorldMapHub: React.FC<WorldMapHubProps> = ({
  progress,
  availableMysteryBoxes,
  onSelectIslandLearn,
  onSelectGame,
  onOpenRewards,
}) => {
  const companion =
    COMPANION_CHARACTERS.find((c) => c.id === progress.activeCompanionId) || COMPANION_CHARACTERS[0];

  const completedGamesCount = Object.keys(progress.gameRecords).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-8">
      {/* Mohammed Hero Banner + Companion Greeting */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-l from-sky-600 to-blue-700 text-white p-6 sm:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sky-100 text-sm font-bold">
              <span>بطل العالم: {progress.childName}</span>
              <span aria-hidden="true">·</span>
              <span>العمر: {progress.childAge} سنوات</span>
              <span aria-hidden="true">·</span>
              <span>الرتبة: {getLevelTitle(progress.level)}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-black leading-snug">
              أهلاً بك يا محمد وليد هيكل في عالم الجزر الست!
            </h1>

            <p className="text-sky-100 text-base sm:text-lg max-w-2xl">
              اختر أي جزيرة لتتعلم وتلعب وتجمع النجوم الذهبية. كل ١٥ نجمة تفتح لك صندوق مفاجآت جديد!
            </p>
          </div>

          <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                speakArabic(
                  `أهلاً يا محمد وليد هيكل! معك الآن ${progress.stars} نجمة. اختر أي جزيرة على الخريطة لنبدأ اللعب والتعلم!`
                );
              }}
              className="flex items-center gap-2 rounded-2xl bg-white/20 hover:bg-white/30 px-4 py-3 text-sm font-bold text-white transition cursor-pointer min-h-[48px]"
            >
              <Volume2 className="w-5 h-5 text-amber-300" />
              <span>اسمع تعليمات المغامرة</span>
            </button>

            {availableMysteryBoxes > 0 && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenRewards();
                }}
                className="flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 text-sm sm:text-base font-extrabold shadow-md transition cursor-pointer min-h-[48px]"
              >
                <Gift className="w-5 h-5" />
                <span>لديك {availableMysteryBoxes} صندوق مفاجآت جاهز للفتح!</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Companion Buddy Card */}
        <div className="lg:col-span-4 rounded-3xl bg-white border border-sky-100 p-5 shadow-sm flex items-center gap-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-amber-50 border-2 border-amber-300 shrink-0">
            <img
              src={companion.image}
              alt={companion.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2 flex-1 min-w-0">
            <p className="text-xs font-bold text-sky-700">رفيقك الحالي · {companion.role}</p>
            <h2 className="font-display text-xl font-extrabold text-slate-900">{companion.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{companion.greeting}</p>
            <button
              onClick={() => speakArabic(companion.greeting)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تحدّث معي</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Progress Overview Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
          <p className="text-xs font-bold text-slate-500">نجوم محمد</p>
          <p className="font-display text-3xl font-black text-amber-500 mt-1 tabular-nums">{progress.stars} ⭐</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
          <p className="text-xs font-bold text-slate-500">الدروس المكتملة</p>
          <p className="font-display text-3xl font-black text-sky-600 mt-1 tabular-nums">{progress.completedLessons.length}</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
          <p className="text-xs font-bold text-slate-500">الألعاب المكتشفة</p>
          <p className="font-display text-3xl font-black text-emerald-600 mt-1 tabular-nums">{completedGamesCount} / ٢٠</p>
        </div>
        <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-xs">
          <p className="text-xs font-bold text-slate-500">الشارات المحققة</p>
          <p className="font-display text-3xl font-black text-violet-600 mt-1 tabular-nums">{progress.unlockedBadges.length} / ٦</p>
        </div>
      </section>

      {/* Visual Interactive Archipelago Map */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
              خريطة عالم الجزر التفاعلية
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              اضغط على أي جزيرة على الخريطة أو من البطاقات بالأسفل للدخول مباشرة
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onOpenRewards();
            }}
            className="hidden sm:flex items-center gap-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2.5 text-sm font-bold transition cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>شهادات محمد</span>
          </button>
        </div>

        <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-sky-200">
          <img
            src={WORLD_BACKDROP_IMAGE}
            alt="خريطة الجزر الست"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/15" />

          {ISLANDS.map((island) => (
            <button
              key={island.id}
              onClick={() => {
                playClickSound();
                speakArabic(`أهلاً بك في ${island.title}`);
                onSelectIslandLearn(island.subject);
              }}
              style={{ top: island.mapPosition.top, left: island.mapPosition.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`rounded-2xl bg-gradient-to-br ${island.bgGradient} text-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg border-2 border-white font-display font-extrabold text-xs sm:text-sm md:text-base whitespace-nowrap group-hover:scale-110 transition-transform`}
                >
                  {island.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6 Islands Detailed Explorer Cards */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-black text-slate-900">
          استكشف الجزر الست والأنشطة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ISLANDS.map((island) => {
            const gamesForIsland = island.featuredGames
              .map((gid) => ALL_GAMES.find((g) => g.id === gid))
              .filter(Boolean);

            return (
              <article
                key={island.id}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-xs font-bold ${island.accentColor}`}>{island.subtitle}</p>
                      <h3 className="font-display text-2xl font-black text-slate-900 mt-0.5">
                        {island.title}
                      </h3>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${island.bgGradient} text-white flex items-center justify-center shrink-0 shadow-sm`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {island.description}
                  </p>

                  {/* Featured games quick launch */}
                  <div className="pt-2 space-y-2">
                    <p className="text-xs font-bold text-slate-500">ألعاب مميزة في هذه الجزيرة:</p>
                    <div className="flex flex-wrap gap-2">
                      {gamesForIsland.slice(0, 3).map((game) =>
                        game ? (
                          <button
                            key={game.id}
                            onClick={() => {
                              playClickSound();
                              onSelectGame(game.id);
                            }}
                            className="flex items-center gap-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 px-3 py-2 text-xs font-bold text-slate-800 transition cursor-pointer"
                          >
                            <span>{game.emoji}</span>
                            <span>{game.title}</span>
                          </button>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <button
                    onClick={() => {
                      playClickSound();
                      onSelectIslandLearn(island.subject);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${island.bgGradient} text-white font-bold py-3 px-4 text-sm shadow-sm hover:opacity-95 transition cursor-pointer min-h-[48px]`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>ادخل للتعلم</span>
                  </button>
                  {gamesForIsland[0] && (
                    <button
                      onClick={() => {
                        playClickSound();
                        onSelectGame(gamesForIsland[0]!.id);
                      }}
                      className="flex items-center justify-center gap-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 text-sm transition cursor-pointer min-h-[48px]"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      <span>العب</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
