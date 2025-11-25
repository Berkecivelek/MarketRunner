import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SHELVES, buildOrderKey } from '../data/products';
import { getLevelById } from '../data/levels';
import { OrderList } from '../components/OrderList';
import { CartBar } from '../components/CartBar';
import { ShelfView } from '../components/ShelfView';
import { Timer } from '../components/Timer';
import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';
import type { CollectedItem } from '../types/common';
import type { OrderItem } from '../types/level';

type Props = NativeStackScreenProps<RootStackParamList, 'GamePlay'>;

interface FeedbackState {
  message: string;
  tone: 'success' | 'error';
}

const buildRequiredMap = (items: OrderItem[]) => {
  return items.reduce<Record<string, number>>((acc, item) => {
    const key = buildOrderKey(item.productId, item.brandId);
    acc[key] = (acc[key] ?? 0) + item.quantity;
    return acc;
  }, {});
};

// Oynanış ekranı: raflardan ürün toplama mekaniğini yönetir.
export const GamePlayScreen: React.FC<Props> = ({ navigation, route }) => {
  const { levelId } = route.params;
  const level = getLevelById(levelId);
  const { completeLevel } = useGame();

  const requiredMap = useMemo(() => (level ? buildRequiredMap(level.orderItems) : {}), [level]);
  const totalRequired = useMemo(() => {
    const values = Object.values(requiredMap) as number[];
    return values.reduce((sum, count) => sum + count, 0);
  }, [requiredMap]);

  const requiredKeys = useMemo(() => new Set(Object.keys(requiredMap)), [requiredMap]);

  const [collectedMap, setCollectedMap] = useState<Record<string, number>>({});
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [wrongKey, setWrongKey] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(level?.timeLimit ?? 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<'overview' | 'collect'>('overview');
  const shelvesToShow = useMemo(() => SHELVES, []);
  const defaultShelfIndex = useMemo(() => {
    if (requiredKeys.size === 0) {
      return 0;
    }
    const index = shelvesToShow.findIndex((shelf) =>
      shelf.variants.some((variant) =>
        requiredKeys.has(buildOrderKey(variant.productId, variant.brandId))
      )
    );
    return index >= 0 ? index : 0;
  }, [requiredKeys, shelvesToShow]);
  const [activeShelfIndex, setActiveShelfIndex] = useState(defaultShelfIndex);

  useEffect(() => {
    if (!level) return;
    setCollectedMap({});
    setCollectedItems([]);
    setFeedback(null);
    setWrongKey(null);
    setTimeLeft(level.timeLimit ?? 0);
    setPhase('overview');
  }, [level]);

  useEffect(() => {
    setActiveShelfIndex(defaultShelfIndex);
  }, [defaultShelfIndex]);

  const collectedTotals = useMemo(() => {
    const values = Object.values(collectedMap) as number[];
    return values.reduce((sum, count) => sum + count, 0);
  }, [collectedMap]);

  const allCollected = totalRequired > 0 && collectedTotals >= totalRequired;

  const highlightKeys = useMemo(() => {
    const keys = new Set<string>();
    Object.entries(requiredMap).forEach(([key, required]) => {
      const collected = collectedMap[key] ?? 0;
      if (required > collected) {
        keys.add(key);
      }
    });
    return keys;
  }, [requiredMap, collectedMap]);

  const handleWrongSelection = useCallback((key: string) => {
    setWrongKey(key);
    setFeedback({ message: 'Bu ürün siparişte yok!', tone: 'error' });
    setTimeout(() => setWrongKey(null), 600);
  }, []);

  const handleSelect = useCallback(
    (key: string) => {
      if (!level || isTransitioning) return;
      if (phase !== 'collect') {
        setFeedback({ message: 'Önce “Siparişi Hazırla” butonuna dokun.', tone: 'error' });
        return;
      }
      const required = requiredMap[key] ?? 0;
      const collected = collectedMap[key] ?? 0;

      if (required === 0) {
        handleWrongSelection(key);
        return;
      }

      if (collected >= required) {
        handleWrongSelection(key);
        return;
      }

      setCollectedMap((prev) => ({
        ...prev,
        [key]: collected + 1
      }));

      const [productId, brandIdPart] = key.split('__');
      setCollectedItems((prev) => [
        ...prev,
        {
          productId,
          brandId: brandIdPart === 'default' ? undefined : brandIdPart
        }
      ]);

      setFeedback({ message: 'Sepete eklendi!', tone: 'success' });
      setWrongKey(null);
    },
    [collectedMap, handleWrongSelection, isTransitioning, level, phase, requiredMap]
  );

  const handleTimeExpired = useCallback(() => {
    if (!level || isTransitioning || allCollected) return;
    setIsTransitioning(true);
    const result = completeLevel({
      levelId: level.levelId,
      coinsEarned: 0,
      xpEarned: 0,
      success: false
    });

    navigation.replace('LevelResult', {
      levelId: level.levelId,
      success: false,
      coinsEarned: 0,
      xpEarned: 0,
      totalCoins: result.totalCoins,
      totalXp: result.totalXp,
      marketLevel: result.marketLevel,
      leveledUp: result.leveledUp,
      unlockedLevels: result.unlockedLevels,
      failureReason: 'Süre doldu!'
    });
  }, [allCollected, completeLevel, isTransitioning, level, navigation]);

  const disabledKeys = useMemo(() => {
    const keys = new Set<string>();
    Object.entries(requiredMap).forEach(([key, required]) => {
      const collected = collectedMap[key] ?? 0;
      if (required > 0 && collected >= required) {
        keys.add(key);
      }
    });
    return keys;
  }, [requiredMap, collectedMap]);

  const handleStartCollect = useCallback(() => {
    if (!level) return;
    setPhase('collect');
    setFeedback({ message: 'Raflardan ürünleri topla!', tone: 'success' });
  }, [level]);

  const handleOrderListPress = useCallback((item: OrderItem) => {
    if (!level) return;
    
    // 1. Find which shelf contains this product
    const itemKey = buildOrderKey(item.productId, item.brandId);
    const shelfIndex = shelvesToShow.findIndex((shelf) =>
      shelf.variants.some((variant) =>
        buildOrderKey(variant.productId, variant.brandId) === itemKey
      )
    );

    if (shelfIndex >= 0) {
      setActiveShelfIndex(shelfIndex);
    }

    // 2. If in collect phase, provide feedback instead of auto-collecting
    if (phase === 'collect') {
      setFeedback({ message: 'Şimdi aşağıdaki raftan ürünü bulup sepete ekle!', tone: 'success' });
    } else {
       setFeedback({ message: 'Önce “Siparişi Hazırla” butonuna dokun.', tone: 'error' });
    }
  }, [level, phase, shelvesToShow]); // Removed handleSelect dependency

  const handleCompleteOrder = useCallback(() => {
    if (!level) return;
    if (phase !== 'collect') {
      setFeedback({ message: 'Önce raflardan ürünleri topla.', tone: 'error' });
      return;
    }

    const allMatch = level.orderItems.every((item) => {
      const key = buildOrderKey(item.productId, item.brandId);
      return (collectedMap[key] ?? 0) === item.quantity;
    });

    if (!allMatch) {
      setFeedback({
        message: 'Sepette eksik veya fazla ürün var, kontrol et!',
        tone: 'error'
      });
      return;
    }

    setIsTransitioning(true);
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
  }, [collectedMap, completeLevel, level, navigation, phase]);

  const currentShelf = shelvesToShow[activeShelfIndex] ?? shelvesToShow[0];

  const categoryTabs = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContent}
      style={styles.tabScroll}
    >
      {shelvesToShow.map((shelf, index) => {
        const isActive = index === activeShelfIndex;
        return (
          <TouchableOpacity
            key={shelf.id}
            onPress={() => setActiveShelfIndex(index)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
              {shelf.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  if (!level) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Level verisi bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LevelSelect')}>
          <Text style={styles.errorLink}>Level Seçimine dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('LevelSelect')}>
          <Text style={styles.backText}>← Çıkış</Text>
        </TouchableOpacity>
        <View style={styles.orderSummary}>
          <Text style={styles.topTitle}>Level {level.levelId}</Text>
          <Text style={styles.subtitle}>
            {level.customerType === 'online' ? 'Online Sipariş' : 'Walk-in Müşteri'}
          </Text>
        </View>

        {level.timeLimit ? (
          <Timer
            initialSeconds={level.timeLimit}
            isRunning={phase === 'collect' && !isTransitioning && !allCollected}
            onExpire={handleTimeExpired}
            onTick={(value) => setTimeLeft(value)}
          />
        ) : (
          <View style={styles.noTimerBadge}>
            <Text style={styles.noTimerText}>Rahat Mod</Text>
          </View>
        )}
      </View>

      <View style={styles.orderListWrapper}>
        <ScrollView style={styles.orderListScroll} nestedScrollEnabled>
          <OrderList 
            items={level.orderItems} 
            collectedMap={collectedMap} 
            title="Sipariş" 
            onItemPress={handleOrderListPress}
          />
        </ScrollView>
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>Raf İpucu</Text>
          <Text style={styles.instructionsText}>
            Raf sekmelerini yatay kaydırarak markette gez, kartlara dokunarak ürünleri sepete ekle.
            Yanlış ürün seçersen uyarı alırsın.
          </Text>
        </View>
        {phase === 'overview' ? (
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartCollect}>
            <Text style={styles.primaryButtonText}>Siparişi Hazırla</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.shelfSection}>
        <View style={styles.tabsContainer}>
          {categoryTabs}
        </View>
        <View style={styles.shelfContent}>
          <ShelfView
            shelf={currentShelf}
            requiredMap={requiredMap}
            collectedMap={collectedMap}
            onSelect={handleSelect}
            disabledKeys={disabledKeys}
            highlightKeys={highlightKeys}
            wrongSelectionKey={wrongKey}
            showTitle={false}
            interactionDisabled={phase !== 'collect' || isTransitioning}
          />
          {phase !== 'collect' ? (
            <TouchableOpacity style={styles.overlay} onPress={handleStartCollect}>
              <Text style={styles.overlayTitle}>Market Rafları Kilitli</Text>
              <Text style={styles.overlayText}>
                Toplamaya başlamak için “Siparişi Hazırla”ya dokun ve rafları gez.
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <CartBar
          orderItems={level.orderItems}
          collectedMap={collectedMap}
          totalCollected={collectedTotals}
          totalRequired={totalRequired}
        />
        {phase === 'collect' ? (
          <TouchableOpacity
            style={[styles.primaryButton, isTransitioning && styles.disabledButton]}
            onPress={handleCompleteOrder}
            disabled={isTransitioning}
          >
            <Text style={styles.primaryButtonText}>Siparişi Tamamla</Text>
          </TouchableOpacity>
        ) : null}
        {feedback ? (
          <Text
            style={[
              styles.feedbackText,
              feedback.tone === 'error' ? styles.feedbackError : styles.feedbackSuccess
            ]}
          >
            {feedback.message}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  backText: {
    fontSize: 14,
    color: '#93C5FD'
  },
  orderSummary: {
    alignItems: 'center'
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  subtitle: {
    fontSize: 12,
    color: '#CBD5F5'
  },
  noTimerBadge: {
    backgroundColor: '#134E4A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  noTimerText: {
    color: '#6EE7B7',
    fontSize: 12,
    fontWeight: '600'
  },
  orderListWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexShrink: 0
  },
  orderListScroll: {
    maxHeight: 180
  },
  instructionsBox: {
    marginTop: 10,
    backgroundColor: '#0B1220',
    borderRadius: 14,
    padding: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  instructionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#93C5FD'
  },
  instructionsText: {
    fontSize: 11,
    color: '#CBD5F5'
  },
  shelfSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 12
  },
  tabsContainer: {
    height: 50,
    marginBottom: 10,
    zIndex: 10, // Ensure tabs are clickable
    elevation: 10
  },
  tabScroll: {
    flexGrow: 0
  },
  tabContent: {
    gap: 8,
    paddingRight: 16
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#0B1220',
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  tabButtonActive: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E3A8A'
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8'
  },
  tabButtonTextActive: {
    color: '#F8FAFC'
  },
  shelfContent: {
    flex: 1,
    minHeight: 260
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 14,
    backgroundColor: 'rgba(2, 6, 23, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 6
  },
  overlayTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center'
  },
  overlayText: {
    fontSize: 11,
    color: '#CBD5F5',
    textAlign: 'center'
  },
  footer: {
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderColor: '#1E293B',
    backgroundColor: '#020617'
  },
  feedbackText: {
    fontSize: 14
  },
  feedbackError: {
    color: '#F87171',
    fontWeight: '600'
  },
  feedbackSuccess: {
    color: '#34D399',
    fontWeight: '600'
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: '#1E3A8A',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center'
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  disabledButton: {
    opacity: 0.6
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
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


