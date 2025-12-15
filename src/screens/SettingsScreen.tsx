import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';

import type { RootStackParamList } from '../navigation';
import { useGame } from '../state/GameContext';
import { getTranslation, setLanguage as setI18nLanguage } from '../utils/i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { resetProgress, audioSettings, toggleMusic, toggleSfx, language, setLanguage } = useGame();

  // Local state for UI not yet in global context
  const [childMode, setChildMode] = useState(true);
  const [showJoystick, setShowJoystick] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const handleLanguageChange = (lang: 'TR' | 'EN') => {
    setLanguage(lang);
    setI18nLanguage(lang);
  };

  useFocusEffect(
    useCallback(() => {
      const lockPortrait = async () => {
        try {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch (error) {
          // ScreenOrientation yüklenemezse sessizce devam et
          console.warn('Failed to lock orientation:', error);
        }
      };
      lockPortrait();
    }, [])
  );

  const handleReset = () => {
    Alert.alert(
      getTranslation('settings', 'resetProgress'),
      getTranslation('settings', 'resetConfirm'),
      [
        { text: getTranslation('settings', 'cancel'), style: 'cancel' },
        { 
          text: getTranslation('settings', 'reset'), 
          style: 'destructive', 
          onPress: () => {
            resetProgress();
            Alert.alert(getTranslation('settings', 'resetSuccess'), getTranslation('settings', 'resetSuccess'));
          }
        }
      ]
    );
  };

  const SettingRow = ({ label, value, onValueChange, description }: { label: string, value: boolean, onValueChange: (v: boolean) => void, description?: string }) => (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.rowDesc}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#334155', true: '#22C55E' }}
        thumbColor={value ? '#FFFFFF' : '#94A3B8'}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 32 }
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backLink}>{getTranslation('settings', 'backToMenu')}</Text>
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{getTranslation('settings', 'title')}</Text>

      {/* SES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslation('settings', 'audio')}</Text>
        <View style={styles.card}>
          <SettingRow label={getTranslation('settings', 'music')} value={audioSettings.music} onValueChange={toggleMusic} />
          <View style={styles.divider} />
          <SettingRow label={getTranslation('settings', 'sfx')} value={audioSettings.sfx} onValueChange={toggleSfx} />
        </View>
      </View>

      {/* OYUN & ÇOCUK */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslation('settings', 'gameSecurity')}</Text>
        <View style={styles.card}>
          <SettingRow 
            label={getTranslation('settings', 'childMode')} 
            value={childMode} 
            onValueChange={setChildMode} 
            description={getTranslation('settings', 'childModeDesc')}
          />
          <View style={styles.divider} />
          <SettingRow 
            label={getTranslation('settings', 'showJoystick')} 
            value={showJoystick} 
            onValueChange={setShowJoystick}
            description={getTranslation('settings', 'showJoystickDesc')} 
          />
        </View>
      </View>

      {/* ERİŞİLEBİLİRLİK */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslation('settings', 'accessibility')}</Text>
        <View style={styles.card}>
          <SettingRow label={getTranslation('settings', 'largeText')} value={largeText} onValueChange={setLargeText} />
          <View style={styles.divider} />
          <SettingRow label={getTranslation('settings', 'highContrast')} value={highContrast} onValueChange={setHighContrast} />
        </View>
      </View>

      {/* DİL */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslation('settings', 'language')}</Text>
        <View style={styles.card}>
          <View style={styles.langRow}>
            <TouchableOpacity 
              style={[styles.langButton, language === 'TR' && styles.langButtonActive]} 
              onPress={() => handleLanguageChange('TR')}
            >
              <Text style={[styles.langText, language === 'TR' && styles.langTextActive]}>Türkçe 🇹🇷</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.langButton, language === 'EN' && styles.langButtonActive]} 
              onPress={() => handleLanguageChange('EN')}
            >
              <Text style={[styles.langText, language === 'EN' && styles.langTextActive]}>English 🇬🇧</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* VERİ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{getTranslation('settings', 'account')}</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetText}>{getTranslation('settings', 'resetProgress')}</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>{getTranslation('settings', 'version')}</Text>
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
    paddingHorizontal: 20,
    gap: 24
  },
  backButton: {
    marginBottom: 10,
    padding: 5
  },
  backLink: {
    fontSize: 16,
    color: '#60A5FA',
    fontWeight: '600'
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 10
  },
  section: {
    gap: 8
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    marginLeft: 4,
    letterSpacing: 0.5
  },
  card: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  rowText: {
    flex: 1,
    marginRight: 10
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E2E8F0'
  },
  rowDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginVertical: 8
  },
  langRow: {
    flexDirection: 'row',
    gap: 10
  },
  langButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  langButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#3B82F6'
  },
  langText: {
    color: '#94A3B8',
    fontWeight: '600'
  },
  langTextActive: {
    color: '#FFFFFF'
  },
  resetButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)'
  },
  resetText: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 15
  },
  versionText: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 12,
    marginTop: 12
  }
});
