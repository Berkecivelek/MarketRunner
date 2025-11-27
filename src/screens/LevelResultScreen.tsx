import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import type { RootStackParamList } from '../navigation';
import { XPBar } from '../components/XPBar';
import { useGame } from '../state/GameContext';

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
  const { unlockedLevels: contextUnlocked } = useGame();

  const nextLevelId = success ? levelId + 1 : levelId;
  const canPlayNext = success && unlockedLevels.includes(nextLevelId);

  useFocusEffect(
    useCallback(() => {
      const lockPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{success ? 'Tebrikler!' : 'Level Başarısız'}</Text>
        <Text style={styles.subtitle}>
          Level {levelId}{' '}
          {success
            ? 'siparişi tamamlandı.'
            : failureReason ?? 'Bu deneme olmadı, tekrar deneyebilirsin.'}
        </Text>

        <View style={styles.rewardBox}>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>Coins</Text>
            <Text style={styles.rewardValue}>{success ? coinsEarned : 0}</Text>
            <Text style={styles.rewardTotal}>Toplam: {totalCoins}</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>XP</Text>
            <Text style={styles.rewardValue}>{success ? xpEarned : 0}</Text>
            <Text style={styles.rewardTotal}>Toplam: {totalXp}</Text>
          </View>
          <View style={styles.rewardItem}>
            <Text style={styles.rewardLabel}>Market Lv.</Text>
            <Text style={styles.rewardValue}>{marketLevel}</Text>
            <Text style={styles.rewardTotal}>
              Açık level: {contextUnlocked.length}
            </Text>
          </View>
        </View>

        <View style={styles.xpBarWrapper}>
          <XPBar compact />
        </View>

        {leveledUp ? (
          <View style={styles.levelUpBanner}>
            <Text style={styles.levelUpTitle}>Market Level Up!</Text>
            <Text style={styles.levelUpText}>
              Daha geniş raflar ve yeni dekorlar kullanıma hazır görünüyor.
            </Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          {/* Sol Buton: Her zaman 'Tekrar Oyna' veya 'Level Seç' (Başarısızsa) */}
          {success ? (
             <TouchableOpacity style={styles.secondaryButton} onPress={handleRetry}>
               <Text style={styles.secondaryText}>Tekrar Oyna</Text>
             </TouchableOpacity>
          ) : (
             <TouchableOpacity style={styles.secondaryButton} onPress={handleLevelSelect}>
               <Text style={styles.secondaryText}>Level Seç</Text>
             </TouchableOpacity>
          )}

          {/* Sağ Buton: Başarılıysa 'Sonraki Level', Başarısızsa 'Tekrar Oyna' */}
          {success ? (
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryText}>Sonraki Level ({nextLevelId})</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={handleRetry}>
              <Text style={styles.primaryText}>Tekrar Oyna</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
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
  }
});
