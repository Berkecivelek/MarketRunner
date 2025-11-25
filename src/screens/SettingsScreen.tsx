import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

// Placeholder ayarlar ekranı. Gelecekte ses / kontroller / dil gibi seçenekler eklenebilir.
export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 }
      ]}
    >
      <Text style={styles.backLink} onPress={() => navigation.goBack()}>
        ← Ana Menü
      </Text>
      <View style={styles.card}>
        <Text style={styles.title}>Ayarlar</Text>
        <Text style={styles.description}>
          Bu alan prototip kapsamında placeholder olarak bırakıldı. Ses ayarları, dokunma hassasiyeti,
          çocuk modu, altyazılar ve daha fazlasını ileride kolayca ekleyebilmek için ekranı ayrı
          komponent olarak hazırladık.
        </Text>
        <View style={styles.placeholderBox}>
          <Text style={styles.placeholderItem}>• Ses & Müzik</Text>
          <Text style={styles.placeholderItem}>• Dokunmatik Kontroller</Text>
          <Text style={styles.placeholderItem}>• Dil & Erişilebilirlik</Text>
          <Text style={styles.placeholderItem}>• Çocuk Güvenliği</Text>
        </View>
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
    gap: 16
  },
  backLink: {
    fontSize: 14,
    color: '#93C5FD',
    marginBottom: 12
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    padding: 24,
    gap: 16
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F8FAFC'
  },
  description: {
    fontSize: 14,
    color: '#94A3B8'
  },
  placeholderBox: {
    backgroundColor: '#111c36',
    borderRadius: 18,
    padding: 16,
    gap: 8
  },
  placeholderItem: {
    fontSize: 13,
    color: '#E2E8F0'
  }
});

