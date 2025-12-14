import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SpeechBubblePosition = 'top' | 'bottom' | 'left' | 'right';
export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

interface BibiSpeechBubbleProps {
  text: string;
  position?: SpeechBubblePosition;
  arrowDirection?: ArrowDirection;
  onDismiss?: () => void;
  showNextButton?: boolean;
  onNext?: () => void;
  maxWidth?: number;
}

// Bibi konuşma balonu component
export const BibiSpeechBubble: React.FC<BibiSpeechBubbleProps> = ({
  text,
  position = 'top',
  arrowDirection = 'down',
  onDismiss,
  showNextButton = false,
  onNext,
  maxWidth = 300,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Fade-in ve scale animasyonu
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const getArrowStyle = () => {
    const arrowSize = 12;
    const arrowColor = '#FFFFFF';
    const borderColor = '#1E40AF';

    switch (arrowDirection) {
      case 'down':
        return {
          position: 'absolute' as const,
          bottom: -arrowSize,
          left: 30,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: arrowColor,
          borderStyle: 'solid' as const,
        };
      case 'up':
        return {
          position: 'absolute' as const,
          top: -arrowSize,
          left: 30,
          width: 0,
          height: 0,
          borderLeftWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: arrowColor,
          borderStyle: 'solid' as const,
        };
      case 'left':
        return {
          position: 'absolute' as const,
          left: -arrowSize,
          top: 20,
          width: 0,
          height: 0,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderRightWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: arrowColor,
          borderStyle: 'solid' as const,
        };
      case 'right':
        return {
          position: 'absolute' as const,
          right: -arrowSize,
          top: 20,
          width: 0,
          height: 0,
          borderTopWidth: arrowSize,
          borderBottomWidth: arrowSize,
          borderLeftWidth: arrowSize,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: arrowColor,
          borderStyle: 'solid' as const,
        };
      default:
        return {};
    }
  };

  const getContainerStyle = () => {
    switch (position) {
      case 'top':
        return { marginBottom: 16 };
      case 'bottom':
        return { marginTop: 16 };
      case 'left':
        return { marginRight: 16 };
      case 'right':
        return { marginLeft: 16 };
      default:
        return { marginBottom: 16 };
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        getContainerStyle(),
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
          maxWidth,
        },
      ]}
    >
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
        {showNextButton && onNext && (
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextButtonText}>Devam Et →</Text>
          </TouchableOpacity>
        )}
        {onDismiss && !showNextButton && (
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissButtonText}>×</Text>
          </TouchableOpacity>
        )}
        <View style={[styles.arrow, getArrowStyle()]} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#1E40AF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 22,
    marginBottom: 8,
  },
  nextButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  dismissButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dismissButtonText: {
    color: '#6B7280',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    // Arrow styles are applied dynamically
  },
});

