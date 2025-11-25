import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TimerProps {
  initialSeconds: number;
  isRunning?: boolean;
  onExpire?: () => void;
  onTick?: (secondsLeft: number) => void;
}

// Basit geri sayım sayacı komponenti. Oyun süresini takip etmek için kullanıyoruz.
export const Timer: React.FC<TimerProps> = ({
  initialSeconds,
  isRunning = true,
  onExpire,
  onTick
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onTickRef = useRef(onTick);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onTickRef.current = onTick;
    onExpireRef.current = onExpire;
  }, [onTick, onExpire]);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = Math.max(prev - 1, 0);
        if (onTickRef.current) {
          onTickRef.current(next);
        }
        if (next === 0) {
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); // Removed onTick and onExpire from deps

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Süre</Text>
      <Text style={[styles.time, secondsLeft <= 10 ? styles.critical : undefined]}>
        {minutes}:{seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#1F2937',
    alignItems: 'center'
  },
  label: {
    fontSize: 12,
    color: '#9CA3AF'
  },
  time: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB'
  },
  critical: {
    color: '#F87171'
  }
});

