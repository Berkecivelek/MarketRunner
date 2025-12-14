import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BibiCharacter } from './BibiCharacter';
import type { TutorialStep } from '../data/tutorialSteps';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TutorialOverlayProps {
  visible: boolean;
  step: TutorialStep | null;
  onNext?: () => void;
  onSkip?: () => void;
  onDismiss?: () => void;
}

// Tutorial overlay component - Bibi karakteri tüm ekranı kaplayacak şekilde, animatif ve modern UI
export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({
  visible,
  step,
  onNext,
  onSkip,
  onDismiss,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const bubbleFadeAnim = useRef(new Animated.Value(0)).current;
  const bubbleScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible && step) {
      // Giriş animasyonu - Bibi karakteri aşağıdan yukarı doğru gelir
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Bibi geldikten sonra konuşma balonu animasyonu
        Animated.parallel([
          Animated.timing(bubbleFadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(bubbleScaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start();
      });
    } else {
      // Çıkış animasyonu
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
      slideAnim.setValue(SCREEN_HEIGHT);
      bubbleFadeAnim.setValue(0);
      bubbleScaleAnim.setValue(0.8);
    }
  }, [visible, step, fadeAnim, scaleAnim, slideAnim, bubbleFadeAnim, bubbleScaleAnim]);

  if (!visible || !step) {
    return null;
  }

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        {/* Arka plan */}
        <View style={styles.background} />

        {/* Bibi karakteri - Tüm ekranı kaplayacak şekilde, merkezi */}
        <Animated.View
          style={[
            styles.bibiContainer,
            {
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          <BibiCharacter
            position="center"
            animation={step.bibiAnimation}
            size={Math.min(SCREEN_WIDTH * 0.85, SCREEN_HEIGHT * 0.6)}
          />
        </Animated.View>

        {/* Konuşma balonu - Bibi'nin üstünde */}
        <Animated.View
          style={[
            styles.speechBubbleContainer,
            {
              opacity: bubbleFadeAnim,
              transform: [{ scale: bubbleScaleAnim }],
            },
          ]}
        >
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{step.message}</Text>
            
            {/* Devam Et butonu */}
            {step.showNextButton && onNext && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.8}>
                <Text style={styles.nextButtonText}>Devam Et</Text>
                <Text style={styles.nextButtonArrow}>→</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Ok işareti - Bibi'ye doğru */}
          <View style={styles.arrow} />
        </Animated.View>

        {/* Skip butonu - Sağ üst köşede */}
        {onSkip && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip} activeOpacity={0.7}>
            <Text style={styles.skipButtonText}>Atla</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  bibiContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.1,
    alignSelf: 'center',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.15,
    alignSelf: 'center',
    width: SCREEN_WIDTH * 0.85,
    zIndex: 20,
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  speechText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  nextButtonArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  arrow: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
