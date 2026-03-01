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
  const rightOpacity = useRef(new Animated.Value(0)).current;
  const rightTranslateX = useRef(new Animated.Value(50)).current;

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
      Animated.timing(rightOpacity, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rightTranslateX, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Animated.View
        style={[
          styles.headerItem,
          {
            opacity: leftOpacity,
            transform: [{ translateX: leftTranslateX }],
          },
        ]}
      >
        <Text style={styles.headerNumber}>876</Text>
        <Text style={styles.headerLabel}>Steps behind</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.headerItem,
          {
            opacity: rightOpacity,
            transform: [{ translateX: rightTranslateX }],
          },
        ]}
      >
        <Text style={styles.headerHighlight}>76%</Text>
        <Text style={styles.headerLabel}>Lower than yesterday</Text>
      </Animated.View>

      <TouchableOpacity style={styles.trashIcon}>
        <Text style={styles.trashText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};
