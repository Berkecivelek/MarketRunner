import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

export type BibiAnimation = 'idle' | 'pointing' | 'thumbs-up' | 'waving' | 'running';
export type BibiPosition = 'left' | 'right' | 'center';

interface BibiCharacterProps {
  position?: BibiPosition;
  animation?: BibiAnimation;
  size?: number;
}

// Bibi karakteri component - Logo'daki karakterin birebir aynısı
export const BibiCharacter: React.FC<BibiCharacterProps> = ({
  position = 'left',
  animation = 'idle',
  size = 200,
}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animasyon efektleri
    switch (animation) {
      case 'idle':
        // Hafif yukarı-aşağı hareket
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: -10,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;

      case 'pointing':
        // İşaret etme animasyonu
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;

      case 'thumbs-up':
        // Başarı animasyonu
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
        break;

      case 'waving':
        // El sallama animasyonu
        Animated.loop(
          Animated.sequence([
            Animated.timing(rotateAnim, {
              toValue: 15,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: -15,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;

      case 'running':
        // Koşma animasyonu
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceAnim, {
              toValue: -15,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(bounceAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ])
        ).start();
        break;
    }
  }, [animation, bounceAnim, scaleAnim, rotateAnim]);

  const getPositionStyle = () => {
    switch (position) {
      case 'left':
        return { alignSelf: 'flex-start' };
      case 'right':
        return { alignSelf: 'flex-end' };
      case 'center':
        return { alignSelf: 'center' };
      default:
        return { alignSelf: 'flex-start' };
    }
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [-15, 15],
    outputRange: ['-15deg', '15deg'],
  });

  return (
    <View style={[styles.container, getPositionStyle()]}>
      <Animated.View
        style={[
          styles.characterContainer,
          {
            width: size,
            height: size,
            transform: [
              { translateY: bounceAnim },
              { scale: scaleAnim },
              { rotate: rotateInterpolation },
            ],
          },
        ]}
      >
        <Image
          source={require('../../assets/bibi-character.png')}
          style={[styles.character, { width: size, height: size }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  character: {
    width: '100%',
    height: '100%',
  },
});

