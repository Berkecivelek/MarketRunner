import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getLevelById } from '../data/levels';
import { buildOrderKey, getProductName, getVariantByKey } from '../data/products';
import type { RootStackParamList } from '../navigation';
import { useGame } from '../state/GameContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

type Stage = 'scan' | 'pack';

// Kasa ve paketleme akışını simüle eden ekran.
export const CheckoutAndPackingScreen: React.FC<Props> = ({ navigation, route }) => {
  const { levelId, collectedItems, timeRemaining } = route.params;
  const level = getLevelById(levelId);
  const { completeLevel } = useGame();
  const insets = useSafeAreaInsets();

  const queue = useMemo(() => {
    if (!level) return [];
    return level.orderItems.flatMap((item) =>
      Array.from({ length: item.quantity }, () => ({
        productId: item.productId,
        brandId: item.brandId
      }))
    );
  }, [level]);

  const [stage, setStage] = useState<Stage>('scan');
  const [scanIndex, setScanIndex] = useState(0);
  const [packIndex, setPackIndex] = useState(0);
  const [message, setMessage] = useState('Ürünleri kasada okutmaya başla!');
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    setStage('scan');
    setScanIndex(0);
    setPackIndex(0);
    setMessage('Ürünleri kasada okutmaya başla!');
    setHasCompleted(false);
  }, [levelId]);

  useEffect(() => {
    if (stage === 'scan' && scanIndex >= queue.length && queue.length > 0) {
      setStage('pack');
      setMessage('Harika! Şimdi ürünleri paket kutusuna taşı.');
    }
  }, [queue.length, scanIndex, stage]);

  useEffect(() => {
    if (stage === 'pack' && packIndex >= queue.length && queue.length > 0) {
      handleComplete();
    }
  }, [queue.length, packIndex, stage]);

  if (!level) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Level verisi bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LevelSelect')}>
          <Text style={styles.errorLink}>Level seçimine dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentItem = queue[stage === 'scan' ? scanIndex : packIndex];
  const variant = currentItem
    ? getVariantByKey(currentItem.productId, currentItem.brandId)
    : undefined;

  const handleComplete = () => {
    if (hasCompleted) return;
    setHasCompleted(true);
    const result = completeLevel({
      levelId: level.levelId,
      coinsEarned: level.reward.coins,
      xpEarned: level.reward.xp,
      success: true
    });

    navigation.replace('LevelResult', {
      levelId: level.levelId,
      success: true,
      coinsEarned: level.reward.coins,
      xpEarned: level.reward.xp,
      totalCoins: result.totalCoins,
      totalXp: result.totalXp,
      marketLevel: result.marketLevel,
      leveledUp: result.leveledUp,
      unlockedLevels: result.unlockedLevels
    });
  };

  const handleActionPress = () => {
    if (stage === 'scan') {
      if (scanIndex < queue.length) {
        setScanIndex((prev) => prev + 1);
        setMessage('Bip! Ürün okundu.');
      }
    } else {
      if (packIndex < queue.length) {
        setPackIndex((prev) => prev + 1);
        setMessage('Paketlendi! Devam et.');
      }
    }
  };

  const progress = stage === 'scan' ? scanIndex : packIndex;
  const total = queue.length || 1;
  const progressRatio = Math.min(progress / total, 1);

  const collectedSummary = useMemo(() => {
    const map = new Map<string, number>();
    collectedItems.forEach((item) => {
      const key = buildOrderKey(item.productId, item.brandId);
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return Array.from(map.entries()).map(([key, count]) => {
      const [productId, brandIdPart] = key.split('__');
      const brandId = brandIdPart === 'default' ? undefined : brandIdPart;
      return {
        key,
        count,
        name: getProductName(productId, brandId)
      };
    });
  }, [collectedItems]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 }
      ]}
    >
      <Text style={styles.title}>Kasa & Paketleme</Text>
      <Text style={styles.subtitle}>
        {stage === 'scan'
          ? 'Kasaya getir ve okut'
          : 'Kutuyu sağa çekerek paketlemeyi tamamla'}
      </Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>
          {stage === 'scan' ? 'Kasadan Geçirme' : 'Paketleme'} İlerlemesi
        </Text>
        <Text style={styles.progressValue}>
          {progress}/{total}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
        </View>
      </View>

      {currentItem ? (
        <View style={styles.currentItemCard}>
          <Text style={styles.currentLabel}>Sıradaki Ürün</Text>
          <View
            style={[
              styles.itemColor,
              { backgroundColor: variant?.color ?? '#1E3A8A' }
            ]}
          />
          <Text style={styles.itemName}>
            {variant?.displayName ??
              getProductName(currentItem.productId, currentItem.brandId)}
          </Text>
        </View>
      ) : (
        <View style={styles.currentItemCard}>
          <Text style={styles.currentLabel}>Tüm ürünler hazır!</Text>
          <Text style={styles.itemName}>Birazdan sonuç ekranına geçilecek.</Text>
        </View>
      )}

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
        {typeof timeRemaining === 'number' ? (
          <Text style={styles.timeReminder}>
            Kalan süre: {timeRemaining < 999 ? `${timeRemaining}s` : 'Süre sınırsız'}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={handleActionPress}>
        <Text style={styles.actionButtonText}>
          {stage === 'scan' ? 'Kasada Oku (Bip!)' : 'Pakete Yerleştir'}
        </Text>
      </TouchableOpacity>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Sepet Özeti</Text>
        {collectedSummary.map((item) => (
          <View key={item.key} style={styles.summaryRow}>
            <Text style={styles.summaryName}>{item.name}</Text>
            <Text style={styles.summaryCount}>{item.count}x</Text>
          </View>
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
    gap: 18
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8'
  },
  progressCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    gap: 8
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#C7D2FE'
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FDE68A'
  },
  progressBar: {
    height: 10,
    borderRadius: 8,
    backgroundColor: '#1E293B'
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#38BDF8'
  },
  currentItemCard: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 20,
    gap: 12,
    alignItems: 'center'
  },
  currentLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#93C5FD'
  },
  itemColor: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1E3A8A'
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center'
  },
  messageBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    gap: 6
  },
  messageText: {
    fontSize: 14,
    color: '#E2E8F0'
  },
  timeReminder: {
    fontSize: 12,
    color: '#38BDF8'
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: '#22D3EE',
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center'
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B1120'
  },
  summaryBox: {
    marginTop: 8,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    gap: 10
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryName: {
    fontSize: 13,
    color: '#E2E8F0'
  },
  summaryCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FDE68A'
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  errorText: {
    fontSize: 16,
    color: '#F87171'
  },
  errorLink: {
    fontSize: 14,
    color: '#60A5FA'
  }
});

