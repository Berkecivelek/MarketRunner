import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import type { RootStackParamList } from '../navigation';
import { XPBar } from '../components/XPBar';
import { TutorialOverlay } from '../components/TutorialOverlay';
import { useGame } from '../state/GameContext';
import { getTutorialStep, type TutorialStepId } from '../data/tutorialSteps';
import { getTranslation } from '../utils/i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelResult'>;

// Level sonuç ekranı: kazanılan ödülleri ve ilerlemeyi gösterir.
export const LevelResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const {
    levelId,
    success,
    coinsEarned,
    xpEarned,
    totalCoins,
    totalXp,
    marketLevel,
    leveledUp,
    failureReason,
    unlockedLevels
  } = route.params;
  const { unlockedLevels: contextUnlocked, shouldShowTutorial, completeTutorial } = useGame();
  
  // Tutorial state - Level 1 başarılı tamamlandıysa göster
  const [showTutorial, setShowTutorial] = useState(false);
  
  useEffect(() => {
    // Level 1 başarılı tamamlandıysa tutorial'i göster
    if (levelId === 1 && success && shouldShowTutorial(levelId)) {
      setShowTutorial(true);
    } else {
      setShowTutorial(false);
    }
  }, [levelId, success, shouldShowTutorial]);
  
  const tutorialStep = showTutorial ? getTutorialStep('LEVEL_COMPLETE') : null;
  
  const handleTutorialNext = () => {
    // Tutorial tamamlandı
    completeTutorial();
    setShowTutorial(false);
  };
  
  const handleTutorialSkip = () => {
    // Tutorial atlandı
    completeTutorial();
    setShowTutorial(false);
  };

  const nextLevelId = success ? levelId + 1 : levelId;
  const canPlayNext = success && unlockedLevels.includes(nextLevelId);

  useFocusEffect(
    useCallback(() => {
      const lockPortrait = async () => {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch (error) {
          // ScreenOrientation yüklenemezse sessizce devam et
          console.warn('Failed to lock orientation:', error);
        }
      };
      lockPortrait();
    }, [])
  );

  const handleRetry = () => {
    navigation.replace('GamePlay', { levelId });
  };

  const handleNext = () => {
    if (canPlayNext) {
      navigation.replace('GamePlay', { levelId: nextLevelId });
    } else {
      navigation.replace('LevelSelect');
    }
  };

  const handleLevelSelect = () => {
    navigation.navigate('LevelSelect');
  };
  
  const handleMainMenu = () => {
    navigation.navigate('MainMenu');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{success ? getTranslation('levelResult', 'success') : getTranslation('levelResult', 'levelFailed')}</Text>
        <Text style={styles.subtitle}>
          {getTranslation('game', 'level')} {levelId}{' '}
          {success
            ? getTranslation('levelResult', 'levelCompleted')
            : failureReason ?? 'Bu deneme olmadı, tekrar deneyebilirsin.'}
        </Text>

        <View style={styles.rewardBox}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>{getTranslation('game', 'coins')}</Text>
            <Text style={styles.rewardValue}>{success ? coinsEarned : 0}</Text>
            <Text style={styles.rewardTotal}>{getTranslation('levelResult', 'total')}: {totalCoins}</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>{getTranslation('game', 'xp')}</Text>
            <Text style={styles.rewardValue}>{success ? xpEarned : 0}</Text>
            <Text style={styles.rewardTotal}>{getTranslation('levelResult', 'total')}: {totalXp}</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>{getTranslation('game', 'marketLevel')}</Text>
            <Text style={styles.rewardValue}>{marketLevel}</Text>
            <Text style={styles.rewardTotal}>
              {getTranslation('levelResult', 'openLevels')}: {contextUnlocked.length}
            </Text>
          </View>
        </View>

        <View style={styles.xpBarWrapper}>
          <XPBar compact />
        </View>

        {leveledUp ? (
          <View style={styles.levelUpBanner}>
            <Text style={styles.levelUpTitle}>{getTranslation('levelResult', 'levelUp')}</Text>
            <Text style={styles.levelUpText}>
              {getTranslation('levelResult', 'levelUpText')}
            </Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          {/* Sol Buton: Her zaman 'Tekrar Oyna' veya 'Level Seç' (Başarısızsa) */}
          {success ? (
             <TouchableOpacity style={styles.secondaryButton} onPress={handleRetry}>
               <Text style={styles.secondaryText}>{getTranslation('levelResult', 'retryLevel')}</Text>
             </TouchableOpacity>
          ) : (
             <TouchableOpacity style={styles.secondaryButton} onPress={handleLevelSelect}>
               <Text style={styles.secondaryText}>{getTranslation('levelResult', 'selectLevel')}</Text>
             </TouchableOpacity>
          )}

          {/* Sağ Buton: Başarılıysa 'Sonraki Level', Başarısızsa 'Tekrar Oyna' */}
          {success ? (
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryText}>{getTranslation('levelResult', 'nextLevel')} ({nextLevelId})</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={handleRetry}>
              <Text style={styles.primaryText}>{getTranslation('levelResult', 'retryLevel')}</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.exitButton} onPress={handleMainMenu}>
           <Text style={styles.exitButtonText}>{getTranslation('levelResult', 'exit')}</Text>
        </TouchableOpacity>

      </View>
      
      {/* Tutorial Overlay - Level 1 tamamlandı */}
      <TutorialOverlay
        visible={showTutorial && tutorialStep !== null}
        step={tutorialStep}
        onNext={handleTutorialNext}
        onSkip={handleTutorialSkip}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 24,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 28,
    padding: 28,
    gap: 18
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8'
  },
  rewardBox: {
    flexDirection: 'row',
    gap: 12
  },
  rewardItem: {
    flex: 1,
    backgroundColor: '#111c36',
    borderRadius: 18,
    padding: 16,
    gap: 6
  },
  rewardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C7D2FE'
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDE68A'
  },
  rewardTotal: {
    fontSize: 12,
    color: '#94A3B8'
  },
  xpBarWrapper: {
    marginTop: 12
  },
  levelUpBanner: {
    backgroundColor: '#1E40AF',
    borderRadius: 18,
    padding: 16,
    gap: 6
  },
  levelUpTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FACC15'
  },
  levelUpText: {
    fontSize: 13,
    color: '#E0F2FE'
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 16,
    alignItems: 'center'
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E2E8F0'
  },
  primaryButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#22D3EE'
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1120'
  },
  exitButton: {
    marginTop: 6,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)'
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444'
  }
});
