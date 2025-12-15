import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { GameMode } from '../types/common';
import { soundManager } from '../utils/SoundManager';

interface GameState {
  coins: number;
  xp: number;
  marketLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  activeLevelId?: number | null;
  gameMode?: GameMode;
  isLoading?: boolean;
  tutorialCompleted: boolean;
  audioSettings: {
    music: boolean;
    sfx: boolean;
  };
  language: 'TR' | 'EN';
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
  toggleMusic: (enabled: boolean) => void;
  toggleSfx: (enabled: boolean) => void;
  setLanguage: (lang: 'TR' | 'EN') => void;
  resetProgress: () => void;
  completeTutorial: () => void;
  shouldShowTutorial: (levelId: number) => boolean;
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
  isLoading: true,
  tutorialCompleted: false,
  audioSettings: {
    music: true,
    sfx: true
  },
  language: 'TR'
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
          // Ensure audioSettings exists for old saves
          const loadedState = {
             ...parsed,
             activeLevelId: null,
             isLoading: false,
             tutorialCompleted: parsed.tutorialCompleted ?? false, // ?? kullanarak null/undefined kontrolü
             completedLevels: parsed.completedLevels || [], // completedLevels array'i kontrol et
             audioSettings: parsed.audioSettings || { music: true, sfx: true },
             language: parsed.language || 'TR'
          };
          console.log('GameContext loadedState:', {
            tutorialCompleted: loadedState.tutorialCompleted,
            completedLevels: loadedState.completedLevels,
            levelId: 1,
            shouldShow: !loadedState.tutorialCompleted && !loadedState.completedLevels.includes(1)
          });
          setState(loadedState);
          // i18n'yi güncelle
          const { setLanguage: setI18nLanguage } = require('../utils/i18n');
          setI18nLanguage(loadedState.language);
          // SoundManager çağrısını try-catch ile koru
          try {
            soundManager.setAudioSettings(loadedState.audioSettings.music, loadedState.audioSettings.sfx);
          } catch (audioError) {
            console.warn('Failed to set audio settings:', audioError);
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
          // i18n'yi varsayılan dil'e ayarla
          const { setLanguage: setI18nLanguage } = require('../utils/i18n');
          setI18nLanguage('TR');
          // SoundManager çağrısını try-catch ile koru
          try {
            soundManager.setAudioSettings(true, true);
          } catch (audioError) {
            console.warn('Failed to set audio settings:', audioError);
          }
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
      let tutorialCompleted = prev.tutorialCompleted;
      
      if (payload.success) {
        completedLevels.add(payload.levelId);
        // Level 1 tamamlandıysa tutorial'i de tamamla
        if (payload.levelId === 1) {
          tutorialCompleted = true;
        }
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
        activeLevelId: null,
        tutorialCompleted
      };
    });

    return completionResult;
  };

  const toggleMusic = (enabled: boolean) => {
    setState(prev => {
        const newSettings = { ...prev.audioSettings, music: enabled };
        try {
          soundManager.setAudioSettings(newSettings.music, newSettings.sfx);
        } catch (error) {
          console.warn('Failed to set audio settings:', error);
        }
        return { ...prev, audioSettings: newSettings };
    });
  };

  const toggleSfx = (enabled: boolean) => {
    setState(prev => {
        const newSettings = { ...prev.audioSettings, sfx: enabled };
        try {
          soundManager.setAudioSettings(newSettings.music, newSettings.sfx);
        } catch (error) {
          console.warn('Failed to set audio settings:', error);
        }
        return { ...prev, audioSettings: newSettings };
    });
  };

  const setLanguage = (lang: 'TR' | 'EN') => {
    setState(prev => ({ ...prev, language: lang }));
    // i18n'yi güncelle
    const { setLanguage: setI18nLanguage } = require('../utils/i18n');
    setI18nLanguage(lang);
  };

  const resetProgress = () => {
      setState({
          ...INITIAL_STATE,
          isLoading: false,
          // Keep audio settings preferred by user even after reset
          audioSettings: state.audioSettings 
      });
  };

  const completeTutorial = () => {
    setState((prev) => ({
      ...prev,
      tutorialCompleted: true,
    }));
  };

  const shouldShowTutorial = useCallback((levelId: number): boolean => {
    // Level 1 değilse tutorial gösterme
    if (levelId !== 1) {
      console.log('shouldShowTutorial: levelId !== 1', levelId);
      return false;
    }
    
    // Level 1 tamamlanmışsa tutorial gösterme
    if (state.completedLevels.includes(1)) {
      console.log('shouldShowTutorial: Level 1 already completed');
      return false;
    }
    
    // Tutorial zaten tamamlanmışsa gösterme
    if (state.tutorialCompleted) {
      console.log('shouldShowTutorial: Tutorial already completed');
      return false;
    }
    
    console.log('shouldShowTutorial: TRUE - showing tutorial', {
      levelId,
      completedLevels: state.completedLevels,
      tutorialCompleted: state.tutorialCompleted
    });
    return true;
  }, [state.completedLevels, state.tutorialCompleted]);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      startLevel,
      completeLevel,
      resetActiveLevel,
      getNextXpThreshold: () => getXpThresholdForLevel(state.marketLevel),
      toggleMusic,
      toggleSfx,
      setLanguage,
      resetProgress,
      completeTutorial,
      shouldShowTutorial
    }),
    [state]
  );

  // Loading state'te bile provider'ı render et (null döndürme - bu çökme sebebi olabilir)
  // isLoading false olana kadar basit bir placeholder göster
  if (state.isLoading) {
    return (
      <GameContext.Provider value={value}>
        {children}
      </GameContext.Provider>
    );
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    // Production build'de context undefined olabilir, default değer döndür
    console.warn('useGame called outside GameProvider, returning default values');
    return {
      coins: 0,
      xp: 0,
      marketLevel: 1,
      unlockedLevels: [1],
      completedLevels: [],
      activeLevelId: null,
      gameMode: undefined,
      isLoading: false,
      audioSettings: { music: true, sfx: true },
      tutorialCompleted: false,
      startLevel: () => {},
      completeLevel: () => ({
        levelId: 0,
        coinsEarned: 0,
        xpEarned: 0,
        success: false,
        totalCoins: 0,
        totalXp: 0,
        unlockedLevels: [1],
        marketLevel: 1,
        leveledUp: false,
      }),
      resetActiveLevel: () => {},
      getNextXpThreshold: () => 100,
      toggleMusic: () => {},
      toggleSfx: () => {},
      setLanguage: () => {},
      resetProgress: () => {},
      completeTutorial: () => {},
      shouldShowTutorial: () => false,
      language: 'TR',
    } as GameContextValue;
  }
  return context;
};
