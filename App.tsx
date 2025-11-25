import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation';
import { GameProvider } from './src/state/GameContext';

// Uygulamanın giriş noktası. GameProvider oyundaki progress state'ini taşır.
export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </GameProvider>
    </SafeAreaProvider>
  );
}

