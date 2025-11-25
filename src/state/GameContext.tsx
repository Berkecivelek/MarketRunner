import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { GameMode } from '../types/common';

interface GameState {
  coins: number;
  xp: number;
  marketLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  activeLevelId?: number | null;
  gameMode?: GameMode;
  isLoading?: boolean;
}

interface LevelCompletionPayload {
  levelId: number;
  coinsEarned: number;
  xpEarned: number;
  success: boolean;
}

export interface LevelCompletionResult extends LevelCompletionPayload {
  totalCoins: number;
  totalXp: number;
  unlockedLevels: number[];
  marketLevel: number;
  leveledUp: boolean;
}

interface GameContextValue extends GameState {
  startLevel: (levelId: number) => void;
  completeLevel: (payload: LevelCompletionPayload) => LevelCompletionResult;
  resetActiveLevel: () => void;
  getNextXpThreshold: () => number;
}

const STORAGE_KEY = '@market_runner_state_v1';
const XP_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1300, 1650];

export const getXpThresholdForLevel = (marketLevel: number) => {
  if (marketLevel <= XP_THRESHOLDS.length) {
    return XP_THRESHOLDS[marketLevel];
  }

  const lastThreshold = XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const extraLevels = marketLevel - XP_THRESHOLDS.length;
  return lastThreshold + extraLevels * 250;
};

const INITIAL_STATE: GameState = {
  coins: 0,
  xp: 0,
  marketLevel: 1,
  unlockedLevels: [1],
  completedLevels: [],
  activeLevelId: null,
  gameMode: undefined,
  isLoading: true
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<GameState>(INITIAL_STATE);

  // Load state on mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setState({ ...parsed, activeLevelId: null, isLoading: false });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (e) {
        console.error('Failed to load game state', e);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };
    loadState();
  }, []);

  // Save state on change
  useEffect(() => {
    if (state.isLoading) return;
    
    const saveState = async () => {
      try {
        const { isLoading, activeLevelId, ...toSave } = state;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.error('Failed to save game state', e);
      }
    };
    saveState();
  }, [state]);

  const startLevel = (levelId: number) => {
    let gameMode: GameMode = 'BAKKAL';
    if (levelId > 20 && levelId <= 40) {
      gameMode = 'MARKET';
    } else if (levelId > 40) {
      gameMode = 'SUPERMARKET';
    }

    setState((prev) => ({
      ...prev,
      activeLevelId: levelId,
      gameMode
    }));
  };

  const resetActiveLevel = () => {
    setState((prev) => ({
      ...prev,
      activeLevelId: null,
      gameMode: undefined
    }));
  };

  const completeLevel = (payload: LevelCompletionPayload): LevelCompletionResult => {
    let completionResult: LevelCompletionResult = {
      ...payload,
      totalCoins: state.coins,
      totalXp: state.xp,
      unlockedLevels: state.unlockedLevels,
      marketLevel: state.marketLevel,
      leveledUp: false
    };

    setState((prev) => {
      const coinsAfter = payload.success ? prev.coins + payload.coinsEarned : prev.coins;
      const xpAfter = payload.success ? prev.xp + payload.xpEarned : prev.xp;

      let marketLevel = prev.marketLevel;
      let leveledUp = false;
      let nextThreshold = getXpThresholdForLevel(marketLevel);

      while (payload.success && xpAfter >= nextThreshold) {
        marketLevel += 1;
        leveledUp = true;
        nextThreshold = getXpThresholdForLevel(marketLevel);
      }

      const unlockedLevels = new Set<number>(prev.unlockedLevels);
      if (payload.success) {
        unlockedLevels.add(payload.levelId);
        unlockedLevels.add(payload.levelId + 1);
      }

      const completedLevels = new Set<number>(prev.completedLevels);
      if (payload.success) {
        completedLevels.add(payload.levelId);
      }

      completionResult = {
        ...payload,
        totalCoins: coinsAfter,
        totalXp: xpAfter,
        unlockedLevels: Array.from(unlockedLevels).sort((a, b) => a - b),
        marketLevel,
        leveledUp
      };

      return {
        ...prev,
        coins: coinsAfter,
        xp: xpAfter,
        marketLevel,
        unlockedLevels: completionResult.unlockedLevels,
        completedLevels: Array.from(completedLevels).sort((a, b) => a - b),
        activeLevelId: null
      };
    });

    return completionResult;
  };

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      startLevel,
      completeLevel,
      resetActiveLevel,
      getNextXpThreshold: () => getXpThresholdForLevel(state.marketLevel)
    }),
    [state]
  );

  if (state.isLoading) {
    return null; // Or a loading spinner
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame sadece GameProvider içinde kullanılabilir');
  }
  return context;
};

