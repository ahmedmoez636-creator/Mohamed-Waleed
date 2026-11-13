import React, { useState } from 'react';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { GENERAL_KNOWLEDGE_TOPICS } from '../../data/curriculum';
import { LearningSubject } from '../../types/app';
import { playAnimalPattern, playClickSound, speakArabic } from '../../utils/sound';

interface GeneralKnowledgeModuleProps {
  onCompleteLesson: (lessonId: string, subject: LearningSubject, stars?: number) => void;
}

export const GeneralKnowledgeModule: React.FC<GeneralKnowledgeModuleProps> = ({
  onCompleteLesson,
}) => {
  const [activeTopicId, setActiveTopicId] = useState(GENERAL_KNOWLEDGE_TOPICS[0].id);

  const activeTopic =
    GENERAL_KNOWLEDGE_TOPICS.find((t) => t.id === activeTopicId) || GENERAL_KNOWLEDGE_TOPICS[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {GENERAL_KNOWLEDGE_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              playClickSound();
              setActiveTopicId(topic.id);
              speakArabic(topic.title);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm sm:text-base transition cursor-pointer min-h-[48px] ${
              activeTopicId === topic.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50'
            }`}
          >
            <span>{topic.emoji}</span>
            <span>{topic.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeTopic.items.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-4xl shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-black text-slate-900">{item.name}</h3>
                  {item.soundText && (
                    <p className="text-xs font-bold text-amber-700 mt-0.5">{item.soundText}</p>
                  )}
                </div>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{item.detail}</p>
            </div>

            <button
              onClick={() => {
                if (item.animalId) {
                  playAnimalPattern(item.animalId);
                }
                speakArabic(`${item.name}. ${item.soundText ? item.soundText + '. ' : ''}${item.detail}`);
                onCompleteLesson(`knowledge-${activeTopic.id}-${item.id}`, 'knowledge', 1);
              }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 text-sm cursor-pointer transition min-h-[48px]"
            >
              {item.animalId ? <Volume2 className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
              <span>{item.animalId ? 'اسمع الصوت والمعلومة (+١ ⭐)' : 'اسمع وتعلّم (+١ ⭐)'}</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};
