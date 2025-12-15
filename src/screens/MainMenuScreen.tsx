import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { XPBar } from '../components/XPBar';
import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';
import { getTranslation } from '../utils/i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'MainMenu'>;

// Ana menü: navigasyonu ve temel ilerlemeyi gösterir.
export const MainMenuScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { coins, xp, marketLevel } = useGame();
  
  const MENU_BUTTONS = [
    { label: getTranslation('mainMenu', 'play'), target: 'LevelSelect' as const },
    { label: getTranslation('mainMenu', 'market'), target: 'MarketUpgrade' as const },
    { label: getTranslation('mainMenu', 'settings'), target: 'Settings' as const }
  ];

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

  return (
    <View style={[styles.container, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{getTranslation('mainMenu', 'title')}</Text>
        <Text style={styles.subtitle}>{getTranslation('mainMenu', 'subtitle')}</Text>
      </View>

      <XPBar />

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>{getTranslation('game', 'coins')}</Text>
          <Text style={styles.statValue}>{coins}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>{getTranslation('game', 'xp')}</Text>
          <Text style={styles.statValue}>{xp}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>{getTranslation('game', 'marketLevel')}</Text>
          <Text style={styles.statValue}>{marketLevel}</Text>
        </View>
      </View>

      <View style={styles.menu}>
        {MENU_BUTTONS.map((button) => (
          <TouchableOpacity
            key={button.label}
            style={styles.menuButton}
            onPress={() => navigation.navigate(button.target)}
          >
            <Text style={styles.menuButtonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    gap: 24
  },
  header: {
    gap: 8
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8'
  },
  stats: {
    flexDirection: 'row',
    gap: 12
  },
  statCard: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8'
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDE68A'
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    gap: 18
  },
  menuButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center'
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    letterSpacing: 1.2
  }
});
