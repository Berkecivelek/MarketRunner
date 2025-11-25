import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '../screens/SplashScreen';
import { MainMenuScreen } from '../screens/MainMenuScreen';
import { LevelSelectScreen } from '../screens/LevelSelectScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { GamePlayScreen } from '../screens/GamePlayScreen';
import { CheckoutAndPackingScreen } from '../screens/CheckoutAndPackingScreen';
import { LevelResultScreen } from '../screens/LevelResultScreen';
import { MarketUpgradeScreen } from '../screens/MarketUpgradeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { CollectedItem } from '../types/common';

export type RootStackParamList = {
  Splash: undefined;
  MainMenu: undefined;
  LevelSelect: undefined;
  Order: { levelId: number };
  GamePlay: { levelId: number };
  Checkout: { levelId: number; collectedItems: CollectedItem[]; timeRemaining?: number };
  LevelResult: {
    levelId: number;
    success: boolean;
    coinsEarned: number;
    xpEarned: number;
    totalCoins: number;
    totalXp: number;
    marketLevel: number;
    leveledUp: boolean;
    unlockedLevels: number[];
    failureReason?: string;
  };
  MarketUpgrade: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Uygulamanın temel navigasyon yığını.
export const RootNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        contentStyle: {
          backgroundColor: '#020617'
        }
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainMenu" component={MainMenuScreen} />
      <Stack.Screen name="LevelSelect" component={LevelSelectScreen} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="GamePlay" component={GamePlayScreen} />
      <Stack.Screen name="Checkout" component={CheckoutAndPackingScreen} />
      <Stack.Screen name="LevelResult" component={LevelResultScreen} />
      <Stack.Screen name="MarketUpgrade" component={MarketUpgradeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

