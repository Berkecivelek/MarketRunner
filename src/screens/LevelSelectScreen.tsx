import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { LEVELS } from '../data/levels';
import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LevelSelect'>;

// Level seçimi ekranı: 20 seviyeyi grid olarak gösteriyor.
export const LevelSelectScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { unlockedLevels, completedLevels } = useGame();
  const unlockedSet = new Set(unlockedLevels);
  const completedSet = new Set(completedLevels);

  useFocusEffect(
    useCallback(() => {
      const lockPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
      lockPortrait();
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Ana Menü</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Seviye Seç</Text>
      </View>

      <FlatList
        data={LEVELS}
        numColumns={2}
        keyExtractor={(item) => item.levelId.toString()}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const locked = !unlockedSet.has(item.levelId);
          const completed = completedSet.has(item.levelId);

          return (
            <TouchableOpacity
              style={[
                styles.levelCard,
                locked ? styles.levelCardLocked : undefined,
                completed ? styles.levelCardCompleted : undefined
              ]}
              disabled={locked}
              onPress={() => navigation.navigate('GamePlay', { levelId: item.levelId })}
            >
              <Text style={styles.levelNumber}>Level {item.levelId}</Text>
              <Text style={styles.customerType}>
                {item.customerType === 'online' ? 'Online Sipariş' : 'Walk-in'}
              </Text>
              {item.timeLimit ? (
                <Text style={styles.subMeta}>Süre: {item.timeLimit}s</Text>
              ) : (
                <Text style={styles.subMeta}>Rahat mod</Text>
              )}
              {locked ? <Text style={styles.lockedLabel}>Kilitli</Text> : null}
              {completed ? <Text style={styles.completedLabel}>Tamamlandı</Text> : null}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 20
  },
  header: {
    marginBottom: 16
  },
  backText: {
    fontSize: 14,
    color: '#93C5FD'
  },
  title: {
    marginTop: 8,
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  listContent: {
    paddingBottom: 48,
    gap: 16
  },
  columnWrapper: {
    gap: 16
  },
  levelCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: '#1F2937'
  },
  levelCardLocked: {
    opacity: 0.5
  },
  levelCardCompleted: {
    borderColor: '#34D399'
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  customerType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A5B4FC'
  },
  subMeta: {
    fontSize: 12,
    color: '#94A3B8'
  },
  lockedLabel: {
    marginTop: 12,
    fontSize: 12,
    color: '#F87171',
    fontWeight: '700'
  },
  completedLabel: {
    marginTop: 12,
    fontSize: 12,
    color: '#34D399',
    fontWeight: '700'
  }
});
