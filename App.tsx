import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';

import { RootNavigator } from './src/navigation';
import { GameProvider } from './src/state/GameContext';

// Error Boundary Component - Production build'de hataları yakalamak için
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Bir hata oluştu</Text>
          <Text style={styles.errorSubtext}>Lütfen uygulamayı yeniden başlatın</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

// Uygulamanın giriş noktası. GameProvider oyundaki progress state'ini taşır.
export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GameProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </GameProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#030712',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#CBD5F5',
    textAlign: 'center',
  },
});
