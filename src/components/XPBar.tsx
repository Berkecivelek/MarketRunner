import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getXpThresholdForLevel, useGame } from '../state/GameContext';

interface XPBarProps {
  compact?: boolean;
}

// Oyuncunun market level ilerlemesini gösteren basit XP barı.
export const XPBar: React.FC<XPBarProps> = ({ compact = false }) => {
  const { xp, marketLevel } = useGame();

  const previousThreshold = marketLevel > 1 ? getXpThresholdForLevel(marketLevel - 1) : 0;
  const nextThreshold = getXpThresholdForLevel(marketLevel);
  const span = nextThreshold - previousThreshold || 1;
  const progress = Math.min((xp - previousThreshold) / span, 1);

  return (
    <View style={[styles.container, compact ? styles.compactContainer : undefined]}>
      <View style={styles.header}>
        <Text style={styles.levelText}>Market Level {marketLevel}</Text>
        <Text style={styles.xpText}>
          {xp} / {nextThreshold} XP
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12
  },
  compactContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FDE68A'
  },
  xpText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E0F2FE'
  },
  barBackground: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    overflow: 'hidden'
  },
  barFill: {
    height: '100%',
    backgroundColor: '#38BDF8'
  }
});

