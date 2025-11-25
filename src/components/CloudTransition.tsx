import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CloudTransitionProps {
  visible: boolean;
  onTransitionEnd: () => void;
}

export const CloudTransition: React.FC<CloudTransitionProps> = ({ visible, onTransitionEnd }) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ]).start(() => {
        onTransitionEnd();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 20, 0]
  });

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.cloud, { transform: [{ scale }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  cloud: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10
  }
});

