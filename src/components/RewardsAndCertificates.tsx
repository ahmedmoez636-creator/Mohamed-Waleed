import React, { useState } from 'react';
import { Award, CheckCircle2, Gift, Lock, Printer, Sparkles, Star } from 'lucide-react';
import {
  APP_LOGO_IMAGE,
  BADGES,
  COMPANION_CHARACTERS,
  getLevelTitle,
} from '../data/islandsAndRewards';
import { MysteryRewardItem, PlayerProgress } from '../types/app';
import { playBoxOpenSound, playClickSound, speakArabic } from '../utils/sound';

interface RewardsAndCertificatesProps {
  progress: PlayerProgress;
  availableMysteryBoxes: number;
  onSelectCompanion: (id: string) => void;
  onOpenMysteryBox: () => MysteryRewardItem;
}

export const RewardsAndCertificates: React.FC<RewardsAndCertificatesProps> = ({
  progress,
  availableMysteryBoxes,
  onSelectCompanion,
  onOpenMysteryBox,
}) => {
  const [lastReward, setLastReward] = useState<MysteryRewardItem | null>(null);

  const handleOpenBox = () => {
    if (availableMysteryBoxes <= 0) return;
    playBoxOpenSound();
    const reward = onOpenMysteryBox();
    setLastReward(reward);
    speakArabic(`مفاجأة رائعة يا محمد! حصلت على ${reward.title}!`);
  };

  const todayArabic = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-10">
      {/* Header Summary */}
      <section className="rounded-3xl bg-gradient-to-l from-amber-400 to-orange-500 text-slate-950 p-6 sm:p-8 shadow-md flex flex-wrap items-center justify-between gap-6 no-print">
        <div className="space-y-2">
          <p className="text-sm font-extrabold text-amber-950">خزانة إنجازات البطل</p>
          <h1 className="font-display text-3xl sm:text-4xl font-black">
            لوحة إنجازات {progress.childName}
          </h1>
          <p className="text-base font-bold text-amber-950/80">
            المستوى {progress.level} ({getLevelTitle(progress.level)}) · {progress.stars} نجمة ذهبية ⭐
          </p>
        </div>

        <div className="flex items-center gap-3">
          {progress.collectedStickers.map((st, idx) => (
            <span
              key={idx}
              className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center text-2xl shadow-xs"
            >
              {st}
            </span>
          ))}
        </div>
      </section>

      {/* Mystery Surprise Box Section */}
      <section className="rounded-3xl bg-white border border-amber-200 p-6 sm:p-8 shadow-sm no-print">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <Gift className="w-5 h-5" />
              <span>صندوق المفاجآت السعيدة</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
              كل ١٥ نجمة تفتح صندوق هدايا جديدًا!
            </h2>
            <p className="text-slate-600">
              لديك الآن <strong className="text-amber-600">{availableMysteryBoxes}</strong> صندوق مفاجآت جاهز للفتح. افتح الصندوق واحصل على ملصقات ونجمتين إضافيتين!
            </p>
            <button
              onClick={handleOpenBox}
              disabled={availableMysteryBoxes <= 0}
              className={`inline-flex items-center gap-2 rounded-2xl px-7 py-4 font-display font-black text-lg transition cursor-pointer ${
                availableMysteryBoxes > 0
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>
                {availableMysteryBoxes > 0
                  ? 'افتح صندوق المفاجآت الآن!'
                  : `تحتاج ${15 - (progress.stars % 15)} نجمة للصندوق القادم`}
              </span>
            </button>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center rounded-3xl bg-amber-50 border border-amber-200 p-6 text-center min-h-[190px]">
            {lastReward ? (
              <div className="space-y-2 animate-gentle-pop">
                <div className="text-6xl">{lastReward.emoji}</div>
                <h3 className="font-display text-xl font-black text-slate-900">{lastReward.title}</h3>
                <p className="text-sm font-bold text-emerald-700">{lastReward.message}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-6xl animate-float-slow">🎁</div>
                <p className="font-bold text-amber-900">صندوق مفاجآت محمد</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Unlockable 3D Companion Characters */}
      <section className="space-y-4 no-print">
        <h2 className="font-display text-2xl font-black text-slate-900">
          الشخصيات المرافقة (تُفتح بالنجوم)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPANION_CHARACTERS.map((char) => {
            const unlocked = progress.stars >= char.unlockStars;
            const isSelected = progress.activeCompanionId === char.id;
            return (
              <div
                key={char.id}
                className={`rounded-3xl border p-5 transition flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 shadow-md'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={char.image}
                      alt={char.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover ${!unlocked ? 'grayscale opacity-50' : ''}`}
                    />
                    {!unlocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/45 text-white p-3 text-center">
                        <Lock className="w-8 h-8 mb-1" />
                        <span className="font-bold text-sm">يُفتح عند {char.unlockStars} ⭐</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-slate-900">{char.name}</h3>
                    <p className="text-xs font-bold text-sky-700">{char.role}</p>
                  </div>
                </div>

                <button
                  disabled={!unlocked}
                  onClick={() => {
                    playClickSound();
                    onSelectCompanion(char.id);
                    speakArabic(char.greeting);
                  }}
                  className={`w-full rounded-2xl py-3 font-bold text-sm transition cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : unlocked
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSelected ? 'رفيقك الحالي ✓' : unlocked ? 'اختر هذا الرفيق' : `مغلق (${char.unlockStars} ⭐)`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges Grid */}
      <section className="space-y-4 no-print">
        <h2 className="font-display text-2xl font-black text-slate-900">شارات الإنجاز</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const earned = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-3xl border p-5 flex items-center gap-4 ${
                  earned
                    ? 'bg-white border-emerald-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-4xl shrink-0">
                  {badge.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-lg font-black text-slate-900">{badge.title}</h3>
                    {earned && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-sm text-slate-600">{badge.description}</p>
                  <p className="text-xs font-bold text-amber-700 mt-1">الشرط: {badge.conditionLabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Official Personalized Certificate for Mohammed Waleed Haikal */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 no-print">
          <h2 className="font-display text-2xl font-black text-slate-900">
            شهادة التميز الرسمية باسم محمد
          </h2>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-3 text-sm shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة أو حفظ الشهادة</span>
          </button>
        </div>

        <div className="rounded-3xl bg-white border-8 border-double border-amber-400 p-8 sm:p-12 shadow-xl text-center space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-amber-400 shadow-md">
              <img
                src={APP_LOGO_IMAGE}
                alt="شعار محمد"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-extrabold text-amber-700">مغامرات محمد التعليمية · نتعلم ونلعب ونكتشف كل يوم!</p>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-slate-900">
              شهادة تقدير وتفوق
            </h3>
          </div>

          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            تُمنح هذه الشهادة بكل فخر ومحبة إلى البطل المبدع:
          </p>

          <div className="font-display text-3xl sm:text-5xl font-black text-sky-700 py-2">
            محمد وليد هيكل
          </div>

          <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            وذلك تقديرًا لاجتهاده الرائع في استكشاف عالم الجزر التعليمية، وجمعه{' '}
            <strong className="text-amber-600">{progress.stars} نجمة ذهبية</strong>، ووصوله إلى{' '}
            <strong className="text-emerald-700">المستوى {progress.level} ({getLevelTitle(progress.level)})</strong>.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-around gap-6 border-t border-amber-200 text-sm font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>التاريخ: {todayArabic}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              <span>توقيع: أكاديمية مغامرات محمد</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
