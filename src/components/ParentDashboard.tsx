import React, { useState } from 'react';
import {
  ArrowRight,
  Clock,
  BookOpen,
  Gamepad2,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { ALL_GAMES } from '../data/islandsAndRewards';
import { LearningSubject, PlayerProgress } from '../types/app';

interface ParentDashboardProps {
  progress: PlayerProgress;
  onBackToApp: () => void;
  onPracticeSubject: (subject: LearningSubject) => void;
  onClearReviewItem: (id: string) => void;
  onResetProgress: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  progress,
  onBackToApp,
  onPracticeSubject,
  onClearReviewItem,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const minutes = Math.floor(progress.totalTimeSeconds / 60);
  const seconds = progress.totalTimeSeconds % 60;
  const totalActivities =
    progress.completedLessons.length +
    Object.values(progress.gameRecords).reduce((acc, g) => acc + (g?.plays || 0), 0);

  const skillRows: { key: keyof PlayerProgress['skillMastery']; label: string; color: string; subject: LearningSubject }[] = [
    { key: 'arabic', label: 'إتقان الحروف العربية', color: 'bg-amber-500', subject: 'arabic' },
    { key: 'math', label: 'إتقان الأرقام والرياضيات', color: 'bg-sky-600', subject: 'math' },
    { key: 'reading', label: 'مستوى القراءة والكتابة', color: 'bg-orange-500', subject: 'reading' },
    { key: 'english', label: 'إتقان اللغة الإنجليزية', color: 'bg-indigo-600', subject: 'english' },
    { key: 'knowledge', label: 'المعرفة العامة والعلوم', color: 'bg-emerald-600', subject: 'knowledge' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div>
          <p className="text-xs font-extrabold text-emerald-700">منطقة محمية · تقارير الأداء الحقيقية</p>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            لوحة تحكم ولي الأمر — متابعة {progress.childName}
          </h1>
        </div>
        <button
          onClick={onBackToApp}
          className="flex items-center gap-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold px-5 py-3 text-sm cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة لعالم محمد</span>
        </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>الأنشطة المكتملة</span>
          </div>
          <p className="font-display text-3xl font-black text-slate-900 tabular-nums">{totalActivities}</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>الوقت المقضي بالتطبيق</span>
          </div>
          <p className="font-display text-3xl font-black text-slate-900 tabular-nums">
            {minutes} د {seconds} ث
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
            <Star className="w-4 h-4 text-amber-500" />
            <span>مجموع النجوم</span>
          </div>
          <p className="font-display text-3xl font-black text-amber-600 tabular-nums">{progress.stars} ⭐</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
            <Gamepad2 className="w-4 h-4 text-violet-600" />
            <span>الألعاب المُلعبة</span>
          </div>
          <p className="font-display text-3xl font-black text-slate-900 tabular-nums">
            {Object.keys(progress.gameRecords).length} / ٢٠
          </p>
        </div>
      </div>

      {/* Mastery Bars & Review Needs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-5">
          <h2 className="font-display text-xl font-black text-slate-900">
            مستوى الإتقان حسب المهارات التعليمية
          </h2>
          <div className="space-y-4">
            {skillRows.map((row) => {
              const val = progress.skillMastery[row.key];
              return (
                <div key={row.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span className="text-slate-800">{row.label}</span>
                    <span className="text-slate-600 tabular-nums">{val}%</span>
                  </div>
                  <div className="h-3.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${row.color} transition-all duration-300`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-700 font-display font-black text-xl">
            <AlertCircle className="w-5 h-5" />
            <h2>أنشطة تحتاج إلى مراجعة</h2>
          </div>

          {progress.reviewItems.length === 0 ? (
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-bold text-emerald-900">ممتاز! لا توجد نقاط تحتاج لمراجعة حاليًا.</p>
              <p className="text-xs text-emerald-700">أداء محمد متوازن ومشجع جدًا.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {progress.reviewItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                    <p className="text-xs text-amber-800">محاولات إضافية: {item.mistakes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onPracticeSubject(item.subject)}
                      className="rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 text-xs font-bold cursor-pointer"
                    >
                      تدريب
                    </button>
                    <button
                      onClick={() => onClearReviewItem(item.id)}
                      className="rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-2.5 py-1.5 text-xs font-bold cursor-pointer"
                    >
                      تم
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* 20 Games Results Table */}
      <section className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <h2 className="font-display text-xl font-black text-slate-900">نتائج الألعاب التعليمية (٢٠ لعبة)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-extrabold text-slate-500">
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">اسم اللعبة</th>
                <th className="py-3 px-3">عدد مرات اللعب</th>
                <th className="py-3 px-3">أعلى نتيجة</th>
                <th className="py-3 px-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ALL_GAMES.map((game) => {
                const rec = progress.gameRecords[game.id];
                return (
                  <tr key={game.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-bold text-slate-500 tabular-nums">{game.number}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className="ml-2">{game.emoji}</span>
                      {game.title}
                    </td>
                    <td className="py-3 px-3 tabular-nums font-bold text-slate-700">{rec?.plays || 0}</td>
                    <td className="py-3 px-3 tabular-nums font-bold text-sky-700">{rec?.bestScore || 0}</td>
                    <td className="py-3 px-3">
                      {rec ? (
                        <span className="text-xs font-bold text-emerald-700">✓ تم اللعب</span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">لم تُلعب بعد</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Safe Progress Reset */}
      <section className="rounded-3xl bg-white border border-rose-200 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-black text-slate-900">إعادة ضبط التقدم المحفوظ</h3>
          <p className="text-sm text-slate-600">يتم حفظ جميع إنجازات محمد تلقائيًا على هذا الجهاز.</p>
        </div>

        {!confirmReset ? (
          <button
            onClick={() => setConfirmReset(true)}
            className="flex items-center gap-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-4 py-3 text-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة ضبط البيانات</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onResetProgress();
                setConfirmReset(false);
              }}
              className="rounded-xl bg-rose-600 text-white font-bold px-4 py-2.5 text-sm cursor-pointer"
            >
              تأكيد المسح النهائي
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="rounded-xl bg-slate-100 text-slate-700 font-bold px-4 py-2.5 text-sm cursor-pointer"
            >
              تراجع
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
