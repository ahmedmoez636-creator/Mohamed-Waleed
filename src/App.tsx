import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { AppScreen, GameId, LearningSubject } from './types/app';
import { useProgress } from './store/useProgress';
import { subscribeSpeechCaption } from './utils/sound';
import { TitleWelcomeScreen } from './components/TitleWelcomeScreen';
import { TopShellBar } from './components/TopShellBar';
import { WorldMapHub } from './components/WorldMapHub';
import { LearningWorld } from './components/LearningWorld';
import { GamesHub } from './components/GamesHub';
import { RewardsAndCertificates } from './components/RewardsAndCertificates';
import { ParentDashboard } from './components/ParentDashboard';
import { ParentGateModal } from './components/ParentGateModal';
import { OfflineIndicator } from './components/PWAHelper';

export default function App() {
  const {
    progress,
    availableMysteryBoxes,
    toggleSound,
    setActiveCompanion,
    completeLesson,
    recordGameComplete,
    logReviewItem,
    clearReviewItem,
    openMysteryBox,
    resetProgress,
  } = useProgress();

  const [screen, setScreen] = useState<AppScreen>('WELCOME');
  const [activeSubject, setActiveSubject] = useState<LearningSubject>('arabic');
  const [activeGameId, setActiveGameId] = useState<GameId | null>(null);
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [speechCaption, setSpeechCaption] = useState<string | null>(null);

  useEffect(() => {
    return subscribeSpeechCaption(setSpeechCaption);
  }, []);

  const handleOpenIslandLearn = (subject: LearningSubject) => {
    setActiveSubject(subject);
    setActiveGameId(null);
    setScreen('LEARN');
  };

  const handleSelectGame = (gameId: GameId) => {
    setActiveGameId(gameId);
    setScreen('GAMES');
  };

  const handleNavigate = (next: AppScreen) => {
    if (next !== 'GAMES') {
      setActiveGameId(null);
    }
    setScreen(next);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-900 flex flex-col">
      {screen === 'WELCOME' ? (
        <TitleWelcomeScreen
          stars={progress.stars}
          level={progress.level}
          soundMuted={progress.soundMuted}
          onToggleSound={toggleSound}
          onStartAdventure={() => setScreen('MAP')}
        />
      ) : (
        <>
          <TopShellBar
            currentScreen={screen}
            onNavigate={handleNavigate}
            stars={progress.stars}
            level={progress.level}
            activeCompanionId={progress.activeCompanionId}
            soundMuted={progress.soundMuted}
            onToggleSound={toggleSound}
            onOpenParentGate={() => setParentGateOpen(true)}
          />

          <main className="flex-1 pb-12">
            {screen === 'MAP' && (
              <WorldMapHub
                progress={progress}
                availableMysteryBoxes={availableMysteryBoxes}
                onSelectIslandLearn={handleOpenIslandLearn}
                onSelectGame={handleSelectGame}
                onOpenRewards={() => setScreen('REWARDS')}
              />
            )}

            {screen === 'LEARN' && (
              <LearningWorld
                activeSubject={activeSubject}
                onChangeSubject={setActiveSubject}
                progress={progress}
                onCompleteLesson={completeLesson}
                onLogReview={logReviewItem}
              />
            )}

            {screen === 'GAMES' && (
              <GamesHub
                activeGameId={activeGameId}
                progress={progress}
                onSelectGame={setActiveGameId}
                onGameComplete={recordGameComplete}
              />
            )}

            {screen === 'REWARDS' && (
              <RewardsAndCertificates
                progress={progress}
                availableMysteryBoxes={availableMysteryBoxes}
                onSelectCompanion={setActiveCompanion}
                onOpenMysteryBox={openMysteryBox}
              />
            )}

            {screen === 'PARENT' && (
              <ParentDashboard
                progress={progress}
                onBackToApp={() => setScreen('MAP')}
                onPracticeSubject={(subject) => {
                  setActiveSubject(subject);
                  setScreen('LEARN');
                }}
                onClearReviewItem={clearReviewItem}
                onResetProgress={resetProgress}
              />
            )}
          </main>
        </>
      )}

      {/* Visual Speech Caption Banner so prompts are always clear even if device TTS voices are muted */}
      {speechCaption && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl bg-slate-900/90 text-white px-4 py-3 shadow-xl flex items-center gap-2.5 text-sm font-bold animate-gentle-pop no-print">
          <Volume2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{speechCaption}</span>
        </div>
      )}

      <OfflineIndicator />

      <ParentGateModal
        isOpen={parentGateOpen}
        onClose={() => setParentGateOpen(false)}
        onSuccess={() => {
          setParentGateOpen(false);
          setScreen('PARENT');
        }}
      />
    </div>
  );
}
