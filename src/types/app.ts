export type AppScreen = 'WELCOME' | 'MAP' | 'LEARN' | 'GAMES' | 'REWARDS' | 'PARENT';

export type IslandId =
  | 'letters'
  | 'numbers'
  | 'english'
  | 'animals'
  | 'puzzles'
  | 'adventures';

export type LearningSubject =
  | 'arabic'
  | 'reading'
  | 'math'
  | 'english'
  | 'knowledge';

export type GameId =
  | 'letter-catcher'
  | 'word-builder'
  | 'choose-word'
  | 'missing-letter'
  | 'number-challenge'
  | 'add-subtract'
  | 'odd-one-out'
  | 'memory-match'
  | 'spot-differences'
  | 'jigsaw-puzzle'
  | 'maze'
  | 'sequence-order'
  | 'guess-animal'
  | 'match-picture-word'
  | 'coloring'
  | 'treasure-hunt'
  | 'order-letters'
  | 'speed-observation'
  | 'complete-pattern'
  | 'adventure-quiz';

export interface IslandInfo {
  id: IslandId;
  title: string;
  subtitle: string;
  description: string;
  requiredStars: number;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  subject: LearningSubject;
  featuredGames: GameId[];
  mapPosition: { top: string; left: string };
}

export interface GameMeta {
  id: GameId;
  number: number;
  title: string;
  description: string;
  island: IslandId;
  skillKey: keyof SkillMastery;
  emoji: string;
  colorClass: string;
}

export interface CompanionCharacter {
  id: string;
  name: string;
  role: string;
  image: string;
  unlockStars: number;
  greeting: string;
}

export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  emoji: string;
  conditionLabel: string;
}

export interface SkillMastery {
  arabic: number;
  reading: number;
  math: number;
  english: number;
  knowledge: number;
}

export interface GameScoreRecord {
  plays: number;
  bestScore: number;
  lastPlayedAt: string;
}

export interface ReviewItem {
  id: string;
  label: string;
  subject: LearningSubject;
  mistakes: number;
  lastSeenAt: string;
}

export interface MysteryRewardItem {
  id: string;
  title: string;
  emoji: string;
  message: string;
}

export interface PlayerProgress {
  childName: string;
  childAge: number;
  stars: number;
  xp: number;
  level: number;
  totalTimeSeconds: number;
  soundMuted: boolean;
  activeCompanionId: string;
  completedLessons: string[];
  gameRecords: Partial<Record<GameId, GameScoreRecord>>;
  unlockedBadges: string[];
  openedMysteryBoxes: number;
  collectedStickers: string[];
  skillMastery: SkillMastery;
  reviewItems: ReviewItem[];
  lastUpdatedAt: string;
}
