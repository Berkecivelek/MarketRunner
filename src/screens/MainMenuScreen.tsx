import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { XPBar } from '../components/XPBar';
import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MainMenu'>;

const MENU_BUTTONS = [
  { label: 'Play', target: 'LevelSelect' as const },
  { label: 'My Market', target: 'MarketUpgrade' as const },
  { label: 'Settings', target: 'Settings' as const }
];

// Ana menü: navigasyonu ve temel ilerlemeyi gösterir.
export const MainMenuScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { coins, xp, marketLevel } = useGame();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Market Runner</Text>
        <Text style={styles.subtitle}>Mahalle marketini yönet, siparişleri yetiştir!</Text>
      </View>

      <XPBar />

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Coins</Text>
          <Text style={styles.statValue}>{coins}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>XP</Text>
          <Text style={styles.statValue}>{xp}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Market Lv.</Text>
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

