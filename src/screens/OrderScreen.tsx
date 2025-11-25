import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { getLevelById } from '../data/levels';
import { OrderList } from '../components/OrderList';
import { useGame } from '../state/GameContext';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Order'>;

// Sipariş ekranı: level başında müşteri talebini gösterir.
export const OrderScreen: React.FC<Props> = ({ route, navigation }) => {
  const { levelId } = route.params;
  const level = getLevelById(levelId);
  const { startLevel } = useGame();

  if (!level) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Level bulunamadı.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.errorLink}>Geri dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleStart = () => {
    startLevel(level.levelId);
    navigation.replace('GamePlay', { levelId: level.levelId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Geri</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.customerLabel}>
            {level.customerType === 'online' ? 'Online Sipariş' : 'Walk-in Müşteri'}
          </Text>
          <Text style={styles.levelTitle}>Level {level.levelId}</Text>
          <Text style={styles.description}>
            Siparişi hazırlamak için gerekli ürünleri topla ve kasada paketle.
          </Text>

          <OrderList items={level.orderItems} showProgress={false} title="Sipariş Listesi" />

          {level.tutorialTips ? (
            <View style={styles.tutorialBox}>
              <Text style={styles.tutorialTitle}>İpuçları</Text>
              {level.tutorialTips.map((tip, index) => (
                <Text key={tip} style={styles.tutorialText}>
                  {index + 1}. {tip}
                </Text>
              ))}
            </View>
          ) : null}

          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startText}>Başla</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#020617'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 10
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginLeft: -8
  },
  backText: {
    fontSize: 16,
    color: '#93C5FD',
    fontWeight: '600'
  },
  container: {
    padding: 24,
    paddingBottom: 48,
    flexGrow: 1,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    gap: 20
  },
  customerLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#60A5FA'
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  description: {
    fontSize: 14,
    color: '#94A3B8'
  },
  tutorialBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    gap: 8
  },
  tutorialTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C7D2FE'
  },
  tutorialText: {
    fontSize: 12,
    color: '#E2E8F0'
  },
  startButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center'
  },
  startText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC'
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
    color: '#93C5FD'
  }
});

