import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

// Basit splash screen: kısa süre sonra ana menüye yönlendirir.
export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        navigation.replace('MainMenu');
      } catch (error) {
        // Navigation hatası durumunda sessizce devam et
        console.warn('Navigation error:', error);
      }
    }, 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Market Runner</Text>
      </View>
      <Text style={styles.subtitle}>Market yönetimi simülasyon prototipi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  logo: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 24,
    backgroundColor: '#1E40AF'
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 1.5
  },
  subtitle: {
    fontSize: 14,
    color: '#CBD5F5'
  }
});

