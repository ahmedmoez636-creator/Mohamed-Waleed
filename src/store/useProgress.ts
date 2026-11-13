import { useCallback, useEffect, useState } from 'react';
import { GameId, LearningSubject, PlayerProgress, SkillMastery } from '../types/app';
import { MYSTERY_REWARDS } from '../data/islandsAndRewards';
import { setAudioMuted } from '../utils/sound';

const STORAGE_KEY = 'mohammed_waleed_adventures_v1';

const DEFAULT_PROGRESS: PlayerProgress = {
  childName: 'محمد وليد هيكل',
  childAge: 6,
  stars: 10,
  xp: 20,
  level: 1,
  totalTimeSeconds: 0,
  soundMuted: false,
  activeCompanionId: 'mohammed',
  completedLessons: [],
  gameRecords: {},
  unlockedBadges: ['first-star'],
  openedMysteryBoxes: 0,
  collectedStickers: ['⭐'],
  skillMastery: {
    arabic: 18,
    reading: 12,
    math: 15,
    english: 10,
    knowledge: 20,
  },
  reviewItems: [],
  lastUpdatedAt: new Date().toISOString(),
};

function computeLevel(stars: number): number {
  return Math.min(10, Math.floor(stars / 15) + 1);
}

function evaluateBadges(p: PlayerProgress): string[] {
  const badges = new Set(p.unlockedBadges);
  if (p.stars >= 5) badges.add('first-star');
  if (p.skillMastery.arabic >= 25 || p.completedLessons.some((id) => id.startsWith('arabic-'))) {
    badges.add('letter-hero');
  }
  if (p.skillMastery.math >= 25 || p.completedLessons.some((id) => id.startsWith('math-'))) {
    badges.add('math-wizard');
  }
  if (p.skillMastery.english >= 20 || p.completedLessons.some((id) => id.startsWith('english-'))) {
    badges.add('english-star');
  }
  if (Object.keys(p.gameRecords).length >= 5) {
    badges.add('explorer-10');
  }
  if (p.stars >= 50) {
    badges.add('super-mohammed');
  }
  return Array.from(badges);
}

function loadInitialProgress(): PlayerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<PlayerProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      skillMastery: {
        ...DEFAULT_PROGRESS.skillMastery,
        ...(parsed.skillMastery || {}),
      },
      gameRecords: parsed.gameRecords || {},
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : ['first-star'],
      collectedStickers: Array.isArray(parsed.collectedStickers) ? parsed.collectedStickers : ['⭐'],
      reviewItems: Array.isArray(parsed.reviewItems) ? parsed.reviewItems : [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(loadInitialProgress);

  useEffect(() => {
    setAudioMuted(progress.soundMuted);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [progress]);

  // Track active time spent in the app automatically every 10 seconds
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setProgress((prev) => ({
          ...prev,
          totalTimeSeconds: prev.totalTimeSeconds + 10,
          lastUpdatedAt: new Date().toISOString(),
        }));
      }
    }, 10000);
    return () => window.clearInterval(interval);
  }, []);

  const toggleSound = useCallback(() => {
    setProgress((prev) => ({
      ...prev,
      soundMuted: !prev.soundMuted,
      lastUpdatedAt: new Date().toISOString(),
    }));
  }, []);

  const setActiveCompanion = useCallback((companionId: string) => {
    setProgress((prev) => ({
      ...prev,
      activeCompanionId: companionId,
      lastUpdatedAt: new Date().toISOString(),
    }));
  }, []);

  const completeLesson = useCallback((lessonId: string, subject: LearningSubject, starsEarned = 2) => {
    setProgress((prev) => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const nextStars = prev.stars + (alreadyDone ? 1 : starsEarned);
      const nextMastery = { ...prev.skillMastery };
      const boost = alreadyDone ? 2 : 5;
      nextMastery[subject] = Math.min(100, (nextMastery[subject] || 0) + boost);

      const updated: PlayerProgress = {
        ...prev,
        stars: nextStars,
        xp: prev.xp + (alreadyDone ? 5 : 15),
        level: computeLevel(nextStars),
        completedLessons: alreadyDone ? prev.completedLessons : [...prev.completedLessons, lessonId],
        skillMastery: nextMastery,
        lastUpdatedAt: new Date().toISOString(),
      };
      updated.unlockedBadges = evaluateBadges(updated);
      return updated;
    });
  }, []);

  const recordGameComplete = useCallback(
    (gameId: GameId, skillKey: keyof SkillMastery, score: number, starsEarned = 3) => {
      setProgress((prev) => {
        const prevRecord = prev.gameRecords[gameId];
        const nextStars = prev.stars + starsEarned;
        const nextMastery = { ...prev.skillMastery };
        nextMastery[skillKey] = Math.min(100, (nextMastery[skillKey] || 0) + 6);

        const updated: PlayerProgress = {
          ...prev,
          stars: nextStars,
          xp: prev.xp + starsEarned * 10,
          level: computeLevel(nextStars),
          skillMastery: nextMastery,
          gameRecords: {
            ...prev.gameRecords,
            [gameId]: {
              plays: (prevRecord?.plays || 0) + 1,
              bestScore: Math.max(prevRecord?.bestScore || 0, score),
              lastPlayedAt: new Date().toISOString(),
            },
          },
          lastUpdatedAt: new Date().toISOString(),
        };
        updated.unlockedBadges = evaluateBadges(updated);
        return updated;
      });
    },
    []
  );

  const logReviewItem = useCallback((id: string, label: string, subject: LearningSubject) => {
    setProgress((prev) => {
      const existing = prev.reviewItems.find((r) => r.id === id);
      const nextReviewItems = existing
        ? prev.reviewItems.map((r) =>
            r.id === id ? { ...r, mistakes: r.mistakes + 1, lastSeenAt: new Date().toISOString() } : r
          )
        : [
            ...prev.reviewItems,
            { id, label, subject, mistakes: 1, lastSeenAt: new Date().toISOString() },
          ];
      return {
        ...prev,
        reviewItems: nextReviewItems.slice(-12),
        lastUpdatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const clearReviewItem = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      reviewItems: prev.reviewItems.filter((r) => r.id !== id),
      lastUpdatedAt: new Date().toISOString(),
    }));
  }, []);

  const availableMysteryBoxes = Math.max(0, Math.floor(progress.stars / 15) - progress.openedMysteryBoxes);

  const openMysteryBox = useCallback(() => {
    const reward = MYSTERY_REWARDS[Math.floor(Math.random() * MYSTERY_REWARDS.length)];
    setProgress((prev) => {
      const stickers = prev.collectedStickers.includes(reward.emoji)
        ? prev.collectedStickers
        : [...prev.collectedStickers, reward.emoji];
      return {
        ...prev,
        openedMysteryBoxes: prev.openedMysteryBoxes + 1,
        collectedStickers: stickers,
        stars: prev.stars + 2,
        level: computeLevel(prev.stars + 2),
        lastUpdatedAt: new Date().toISOString(),
      };
    });
    return reward;
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS, lastUpdatedAt: new Date().toISOString() });
  }, []);

  return {
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
  };
}
