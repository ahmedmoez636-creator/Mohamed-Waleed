import React from 'react';
import { LearningSubject, PlayerProgress } from '../types/app';
import { ArabicLettersModule } from './learn/ArabicLettersModule';
import { ReadingWritingModule } from './learn/ReadingWritingModule';
import { MathModule } from './learn/MathModule';
import { EnglishModule } from './learn/EnglishModule';
import { GeneralKnowledgeModule } from './learn/GeneralKnowledgeModule';
import { playClickSound } from '../utils/sound';

interface LearningWorldProps {
  activeSubject: LearningSubject;
  onChangeSubject: (s: LearningSubject) => void;
  progress: PlayerProgress;
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
  onLogReview: (id: string, label: string, subject: LearningSubject) => void;
}

const SUBJECT_TABS: { id: LearningSubject; title: string; emoji: string; activeClass: string }[] = [
  { id: 'arabic', title: 'الحروف العربية', emoji: 'أ ب ت', activeClass: 'bg-amber-500 text-slate-950' },
  { id: 'reading', title: 'القراءة والكتابة', emoji: '📖', activeClass: 'bg-orange-500 text-white' },
  { id: 'math', title: 'الرياضيات والأرقام', emoji: '🔢', activeClass: 'bg-sky-600 text-white' },
  { id: 'english', title: 'اللغة الإنجليزية', emoji: '🅰️', activeClass: 'bg-indigo-600 text-white' },
  { id: 'knowledge', title: 'المعرفة العامة', emoji: '🌍', activeClass: 'bg-emerald-600 text-white' },
];

export const LearningWorld: React.FC<LearningWorldProps> = ({
  activeSubject,
  onChangeSubject,
  progress,
  onCompleteLesson,
  onLogReview,
}) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
            أقسام التعلم التفاعلية لمحمد
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            اختر القسم الذي تحب استكشافه واكسب نجومًا جديدة مع كل درس!
          </p>
        </div>
      </div>

      {/* 5 Main Subject Switcher */}
      <div className="flex flex-wrap gap-2.5 bg-white p-2 rounded-3xl border border-slate-200 shadow-xs">
        {SUBJECT_TABS.map((tab) => {
          const isActive = activeSubject === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                onChangeSubject(tab.id);
              }}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-display font-extrabold text-sm sm:text-base transition cursor-pointer min-h-[50px] ${
                isActive ? `${tab.activeClass} shadow-sm` : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {activeSubject === 'arabic' && (
        <ArabicLettersModule
          completedLessons={progress.completedLessons}
          onCompleteLesson={onCompleteLesson}
          onLogReview={onLogReview}
        />
      )}
      {activeSubject === 'reading' && (
        <ReadingWritingModule
          onCompleteLesson={onCompleteLesson}
          onLogReview={onLogReview}
        />
      )}
      {activeSubject === 'math' && (
        <MathModule onCompleteLesson={onCompleteLesson} onLogReview={onLogReview} />
      )}
      {activeSubject === 'english' && (
        <EnglishModule onCompleteLesson={onCompleteLesson} onLogReview={onLogReview} />
      )}
      {activeSubject === 'knowledge' && (
        <GeneralKnowledgeModule onCompleteLesson={onCompleteLesson} />
      )}
    </div>
  );
};
