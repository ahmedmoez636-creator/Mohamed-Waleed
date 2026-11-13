import React, { useState } from 'react';
import { Gamepad2, Play, Star } from 'lucide-react';
import { ALL_GAMES, ISLANDS } from '../data/islandsAndRewards';
import { GameId, IslandId, PlayerProgress, SkillMastery } from '../types/app';
import { playClickSound } from '../utils/sound';
import { GameShell } from './games/GameShell';
import {
  ChooseCorrectWordGame,
  LetterCatcherGame,
  MatchPictureWordGame,
  MissingLetterGame,
  OrderLettersGame,
  WordBuilderGame,
} from './games/LanguageGames';
import {
  AddSubtractGame,
  CompletePatternGame,
  NumberChallengeGame,
  OddOneOutGame,
  SpeedObservationGame,
} from './games/MathLogicGames';
import {
  AdventureQuizGame,
  ColoringGame,
  GuessAnimalSoundGame,
  JigsawPuzzleGame,
  MazeGame,
  MemoryMatchGame,
  SequenceOrderGame,
  SpotDifferencesGame,
  TreasureHuntGame,
} from './games/AdventurePuzzleGames';

interface GamesHubProps {
  activeGameId: GameId | null;
  progress: PlayerProgress;
  onSelectGame: (gameId: GameId | null) => void;
  onGameComplete: (gameId: GameId, skillKey: keyof SkillMastery, score: number, stars: number) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({
  activeGameId,
  progress,
  onSelectGame,
  onGameComplete,
}) => {
  const [islandFilter, setIslandFilter] = useState<'all' | IslandId>('all');
  const [score, setScore] = useState(0);
  const [roundLabel, setRoundLabel] = useState('');
  const [questionAudio, setQuestionAudio] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [starsEarned, setStarsEarned] = useState(3);
  const [restartKey, setRestartKey] = useState(0);

  const launchGame = (id: GameId) => {
    playClickSound();
    setScore(0);
    setRoundLabel('');
    setQuestionAudio('');
    setIsFinished(false);
    setRestartKey((k) => k + 1);
    onSelectGame(id);
  };

  if (activeGameId) {
    const gameMeta = ALL_GAMES.find((g) => g.id === activeGameId) || ALL_GAMES[0];
    const commonProps = {
      onScoreChange: setScore,
      onRoundLabel: setRoundLabel,
      onQuestionAudio: setQuestionAudio,
      onFinish: (finalScore: number, stars: number) => {
        setScore(finalScore);
        setStarsEarned(stars);
        setIsFinished(true);
        onGameComplete(gameMeta.id, gameMeta.skillKey, finalScore, stars);
      },
    };

    const renderGame = () => {
      switch (gameMeta.id) {
        case 'letter-catcher': return <LetterCatcherGame key={restartKey} {...commonProps} />;
        case 'word-builder': return <WordBuilderGame key={restartKey} {...commonProps} />;
        case 'choose-word': return <ChooseCorrectWordGame key={restartKey} {...commonProps} />;
        case 'missing-letter': return <MissingLetterGame key={restartKey} {...commonProps} />;
        case 'number-challenge': return <NumberChallengeGame key={restartKey} {...commonProps} />;
        case 'add-subtract': return <AddSubtractGame key={restartKey} {...commonProps} />;
        case 'odd-one-out': return <OddOneOutGame key={restartKey} {...commonProps} />;
        case 'memory-match': return <MemoryMatchGame key={restartKey} {...commonProps} />;
        case 'spot-differences': return <SpotDifferencesGame key={restartKey} {...commonProps} />;
        case 'jigsaw-puzzle': return <JigsawPuzzleGame key={restartKey} {...commonProps} />;
        case 'maze': return <MazeGame key={restartKey} {...commonProps} />;
        case 'sequence-order': return <SequenceOrderGame key={restartKey} {...commonProps} />;
        case 'guess-animal': return <GuessAnimalSoundGame key={restartKey} {...commonProps} />;
        case 'match-picture-word': return <MatchPictureWordGame key={restartKey} {...commonProps} />;
        case 'coloring': return <ColoringGame key={restartKey} {...commonProps} />;
        case 'treasure-hunt': return <TreasureHuntGame key={restartKey} {...commonProps} />;
        case 'order-letters': return <OrderLettersGame key={restartKey} {...commonProps} />;
        case 'speed-observation': return <SpeedObservationGame key={restartKey} {...commonProps} />;
        case 'complete-pattern': return <CompletePatternGame key={restartKey} {...commonProps} />;
        case 'adventure-quiz': return <AdventureQuizGame key={restartKey} {...commonProps} />;
      }
    };

    return (
      <GameShell
        game={gameMeta}
        score={score}
        roundLabel={roundLabel}
        questionAudioText={questionAudio}
        isFinished={isFinished}
        starsEarned={starsEarned}
        onExit={() => onSelectGame(null)}
        onRestart={() => launchGame(gameMeta.id)}
      >
        {renderGame()}
      </GameShell>
    );
  }

  const filteredGames =
    islandFilter === 'all' ? ALL_GAMES : ALL_GAMES.filter((g) => g.island === islandFilter);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
            <Gamepad2 className="w-5 h-5" />
            <span>٢٠ لعبة تعليمية تفاعلية لمحمد وليد هيكل</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            اختر لعبتك المفضلة وابدأ التحدي!
          </h1>
        </div>
      </div>

      {/* Island Filter Bar */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            playClickSound();
            setIslandFilter('all');
          }}
          className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
            islandFilter === 'all'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50'
          }`}
        >
          كل الألعاب (٢٠)
        </button>
        {ISLANDS.map((isl) => (
          <button
            key={isl.id}
            onClick={() => {
              playClickSound();
              setIslandFilter(isl.id);
            }}
            className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
              islandFilter === isl.id
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50'
            }`}
          >
            {isl.title}
          </button>
        ))}
      </div>

      {/* 20 Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredGames.map((game) => {
          const rec = progress.gameRecords[game.id];
          return (
            <article
              key={game.id}
              className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-3xl shrink-0">
                    {game.emoji}
                  </div>
                  <span className="text-xs font-extrabold text-slate-400 tabular-nums">
                    لعبة {game.number}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-black text-slate-900">{game.title}</h2>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{game.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                {rec && (
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>مرات اللعب: {rec.plays}</span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      أعلى نتيجة: {rec.bestScore}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => launchGame(game.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black py-3 text-base shadow-xs cursor-pointer transition min-h-[48px]"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>العب الآن</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
