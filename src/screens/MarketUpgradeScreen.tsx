import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketUpgrade'>;

interface UpgradeTier {
  level: number;
  title: string;
  description: string;
}

const UPGRADE_TIERS: UpgradeTier[] = [
  {
    level: 1,
    title: 'Başlangıç Dükkânı',
    description: 'Temel raflar ve sınırlı ürün gamı.'
  },
  {
    level: 2,
    title: 'Mahalle Favorisi',
    description: 'Yeni kahvaltılık raflar ve küçük dekor bonusları.'
  },
  {
    level: 3,
    title: 'Yoğun Market',
    description: 'Soğuk içecek standı ve hızlı kasa hattı.'
  },
  {
    level: 4,
    title: 'Online Sipariş Merkezi',
    description: 'Tablet panel, online sipariş modülü ve süslemeler.'
  },
  {
    level: 5,
    title: 'Bölgenin Yıldızı',
    description: 'Özel kampanya köşeleri ve sadakat programı vitrinleri.'
  }
];

// Market yükseltmelerinin placeholder tanıtımı. Gelecekte ekonomi sistemiyle genişletilebilir.
export const MarketUpgradeScreen: React.FC<Props> = ({ navigation }) => {
  const { marketLevel } = useGame();
  const insets = useSafeAreaInsets();

  const tiers = useMemo(() => UPGRADE_TIERS, []);

  useFocusEffect(
    useCallback(() => {
      const lockPortrait = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      };
      lockPortrait();
    }, [])
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24 }
      ]}
    >
      <Text style={styles.backLink} onPress={() => navigation.goBack()}>
        ← Ana Menü
      </Text>

      <View style={styles.header}>
        <Text style={styles.title}>Market Yükseltmeleri</Text>
        <Text style={styles.subtitle}>
          Mevcut market seviyen: <Text style={styles.highlight}>Level {marketLevel}</Text>
        </Text>
        <Text style={styles.description}>
          Her seviye yeni raflar, dekorasyonlar veya servis özellikleri açar. Bu alan gelecekte
          kullanılacak gerçek ekonomi sistemine hazır olacak şekilde düzenlendi.
        </Text>
      </View>

      <View style={styles.grid}>
        {tiers.map((tier) => {
          const unlocked = marketLevel >= tier.level;
          return (
            <View
              key={tier.level}
              style={[styles.tierCard, unlocked ? styles.tierUnlocked : styles.tierLocked]}
            >
              <Text style={styles.tierLevel}>Level {tier.level}</Text>
              <Text style={styles.tierTitle}>{tier.title}</Text>
              <Text style={styles.tierDescription}>{tier.description}</Text>
              <Text style={[styles.tierStatus, unlocked ? styles.statusUnlocked : styles.statusLocked]}>
                {unlocked ? 'Açık' : 'Kilitli'}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#020617'
  },
  container: {
    backgroundColor: '#020617',
    paddingHorizontal: 24,
    gap: 20
  },
  backLink: {
    fontSize: 14,
    color: '#93C5FD',
    marginBottom: 8
  },
  header: {
    gap: 10
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  subtitle: {
    fontSize: 15,
    color: '#CBD5F5'
  },
  highlight: {
    color: '#FDE68A',
    fontWeight: '700'
  },
  description: {
    fontSize: 13,
    color: '#94A3B8'
  },
  grid: {
    gap: 16
  },
  tierCard: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
    borderWidth: 1
  },
  tierUnlocked: {
    borderColor: '#34D399',
    backgroundColor: '#0F172A'
  },
  tierLocked: {
    borderColor: '#1F2937',
    backgroundColor: '#0B1220',
    opacity: 0.7
  },
  tierLevel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A5B4FC'
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC'
  },
  tierDescription: {
    fontSize: 13,
    color: '#CBD5F5'
  },
  tierStatus: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700'
  },
  statusUnlocked: {
    color: '#34D399'
  },
  statusLocked: {
    color: '#F87171'
  }
});
