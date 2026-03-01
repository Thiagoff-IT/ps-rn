import React, { useRef, useEffect } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/globalStyles';

export const HeaderInfo = () => {
  const leftOpacity = useRef(new Animated.Value(0)).current;
  const leftTranslateX = useRef(new Animated.Value(-50)).current;
  const centerOpacity = useRef(new Animated.Value(0)).current;
  const centerScale = useRef(new Animated.Value(0.8)).current;
  const rightOpacity = useRef(new Animated.Value(0)).current;
  const rightScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(leftOpacity, {
        toValue: 1,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(leftTranslateX, {
        toValue: 0,
        duration: 600,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(centerOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.spring(centerScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rightOpacity, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(rightScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[
          styles.headerLeftSection,
          {
            opacity: leftOpacity,
            transform: [{ translateX: leftTranslateX }],
          },
        ]}
      >
        <View style={styles.headerLeftIcon}>
          <Text style={styles.headerLeftIconText}>⚠️</Text>
        </View>
        <View style={styles.headerLeftContent}>
          <Text style={styles.headerNumber}>876</Text>
          <Text style={styles.headerLabel}>Steps behind</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.headerItem,
          {
            opacity: centerOpacity,
            transform: [{ scale: centerScale }],
          },
        ]}
      >
        <Text style={styles.headerHighlight}>76%</Text>
        <Text style={styles.headerLabel}>Lower than yesterday</Text>
      </Animated.View>

      <Animated.View
        style={[
          {
            opacity: rightOpacity,
            transform: [{ scale: rightScale }],
          },
        ]}
      >
        <TouchableOpacity style={styles.waterButton}>
          <Text style={styles.waterIcon}>💧</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
