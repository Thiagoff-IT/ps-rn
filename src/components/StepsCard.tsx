import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/globalStyles';
import type { StepsCardProps } from '../types/index';

export const StepsCard = ({ stepsConsumed, onAddSteps }: StepsCardProps) => {
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(50)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeRotate = useRef(new Animated.Value(0)).current;
  const numberScale = useRef(new Animated.Value(1)).current;
  const stepsAnimValue = useRef(new Animated.Value(0)).current;
  const [stepsDisplay, setStepsDisplay] = useState(0);
  const progressScale = useRef(new Animated.Value(1)).current;
  const controlsOpacity = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const controlsScale = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;
  const metricsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Card entrance with scale and translation
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 700,
        delay: 600,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 700,
        delay: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Badge bounce
    Animated.sequence([
      Animated.delay(900),
      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    // Badge rotate continuous
    Animated.loop(
      Animated.sequence([
        Animated.delay(1100),
        Animated.timing(badgeRotate, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Counter animation
    Animated.timing(stepsAnimValue, {
      toValue: 275,
      duration: 1800,
      delay: 1200,
      useNativeDriver: false,
    }).start();

    stepsAnimValue.addListener((value) => {
      setStepsDisplay(Math.round(value.value));
    });

    // Metrics fade in
    Animated.timing(metricsOpacity, {
      toValue: 1,
      duration: 600,
      delay: 1900,
      useNativeDriver: true,
    }).start();

    // Controls staggered entrance
    const controlAnimations = controlsOpacity.map((opacity, index) =>
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: 2100 + index * 120,
          useNativeDriver: true,
        }),
        Animated.spring(controlsScale[index], {
          toValue: 1,
          friction: 6,
          tension: 40,
          delay: 2100 + index * 120,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel(controlAnimations).start();

    return () => {
      stepsAnimValue.removeAllListeners();
    };
  }, []);

  // Animate when stepsConsumed changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(numberScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(numberScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.sequence([
      Animated.timing(progressScale, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(progressScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [stepsConsumed]);

  const badgeRotation = badgeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressPercentage = (stepsConsumed / 275) * 100;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            { scale: cardScale },
            { translateY: cardTranslateY },
          ],
          opacity: cardOpacity,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Animated.View
          style={[
            styles.badge,
            {
              transform: [
                { scale: badgeScale },
                { rotateZ: badgeRotation },
              ],
            },
          ]}
        >
          <Text style={styles.badgeText}>DI</Text>
        </Animated.View>
      </View>

      <Animated.Text
        style={[
          styles.stepsNumber,
          {
            transform: [{ scale: numberScale }],
          },
        ]}
      >
        {stepsConsumed}
      </Animated.Text>
      <Text style={styles.stepsLabel}>Steps</Text>

      {/* Progress bar */}
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [{ scaleX: progressScale }],
            width: `${Math.min(progressPercentage, 100)}%`,
          },
        ]}
      />

      <Animated.View style={[styles.metricsContainer, { opacity: metricsOpacity }]}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>0.11</Text>
          <Text style={styles.metricLabel}>Distance</Text>
          <Text style={styles.metricUnit}>mi</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>8</Text>
          <Text style={styles.metricLabel}>Calories</Text>
          <Text style={styles.metricUnit}>kcal</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>1</Text>
          <Text style={styles.metricLabel}>Floors</Text>
        </View>
      </Animated.View>

      <View style={styles.controls}>
        {controlsOpacity.map((opacity, index) => (
          <Animated.View
            key={index}
            style={[
              styles.controlButton,
              {
                opacity: opacity,
                transform: [{ scale: controlsScale[index] }],
              },
            ]}
          >
            {index === 0 && (
              <TouchableOpacity onPress={onAddSteps}>
                <Text style={styles.controlIcon}>👟</Text>
                <Text style={styles.controlLabel}>Steps</Text>
              </TouchableOpacity>
            )}
            {index === 1 && <Text style={styles.controlIcon}>〰️</Text>}
            {index === 2 && <Text style={styles.controlIcon}>⊙</Text>}
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};
