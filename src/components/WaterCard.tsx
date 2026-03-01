import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/globalStyles';
import type { WaterCardProps } from '../types/index';

export const WaterCard = ({ waterConsumed, goalMl, onAddWater }: WaterCardProps) => {
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(50)).current;
  const numberScale = useRef(new Animated.Value(1)).current;
  const waterAnimValue = useRef(new Animated.Value(0)).current;
  const [waterDisplay, setWaterDisplay] = useState(0);
  const progressScale = useRef(new Animated.Value(1)).current;
  const buttonsOpacity = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const buttonsScale = useRef([
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
    new Animated.Value(0.3),
  ]).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const [selectedSegment, setSelectedSegment] = useState('D');

  const amounts = [150, 250, 350, 500];

  useEffect(() => {
    // Card entrance with scale and translation
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        delay: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 700,
        delay: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cardTranslateY, {
        toValue: 0,
        duration: 700,
        delay: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Header animation
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 600,
      delay: 900,
      useNativeDriver: true,
    }).start();

    // Button animations (staggered)
    const buttonAnimations = buttonsOpacity.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          delay: 1000 + index * 60,
          useNativeDriver: true,
        }),
        Animated.spring(buttonsScale[index], {
          toValue: 1,
          friction: 6,
          tension: 40,
          delay: 1000 + index * 60,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel(buttonAnimations).start();

    return () => {
      waterAnimValue.removeAllListeners();
    };
  }, []);

  // Animate when waterConsumed changes
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

    // Update display value
    Animated.timing(waterAnimValue, {
      toValue: waterConsumed,
      duration: 400,
      useNativeDriver: false,
    }).start();

    waterAnimValue.addListener(({ value }) => {
      setWaterDisplay(Math.round(value));
    });
  }, [waterConsumed]);

  const progressPercentage = (waterConsumed / goalMl) * 100;

  const handleSegmentPress = (segment: string) => {
    setSelectedSegment(segment);
  };

  const handleQuickAdd = (amount: number) => {
    const newTotal = Math.min(waterConsumed + amount, goalMl);
    onAddWater(newTotal);
  };

  const waterLiters = (waterDisplay / 1000).toFixed(2);
  const goalLiters = (goalMl / 1000).toFixed(2);

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
      {/* Header with logo and period selector */}
      <Animated.View
        style={[
          styles.cardHeader,
          { opacity: headerOpacity },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.headerLogo}>💧</Text>
          <Text style={styles.headerTitle}>Water</Text>
        </View>
        <View style={styles.periodSelector}>
          {['D', 'W', 'M'].map((segment) => (
            <TouchableOpacity
              key={segment}
              onPress={() => handleSegmentPress(segment)}
              style={[
                styles.periodButton,
                selectedSegment === segment && styles.periodButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedSegment === segment && styles.periodTextActive,
                ]}
              >
                {segment}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Main water display */}
      <Animated.View
        style={{
          transform: [{ scale: numberScale }],
        }}
      >
        <Text style={styles.cardMainNumber}>{waterDisplay}</Text>
        <Text style={styles.cardMainLabel}>ml</Text>
      </Animated.View>

      {/* Water metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{waterLiters}L</Text>
          <Text style={styles.metricLabel}>Consumed</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{goalLiters}L</Text>
          <Text style={styles.metricLabel}>Goal</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{Math.round(progressPercentage)}%</Text>
          <Text style={styles.metricLabel}>Progress</Text>
        </View>
      </View>

      {/* Progress bar */}
      <Animated.View
        style={[
          styles.progressBar,
          {
            transform: [{ scaleX: progressScale }],
          },
        ]}
      >
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(progressPercentage, 100)}%`,
            },
          ]}
        />
      </Animated.View>

      {/* Quick add buttons */}
      <View style={styles.waterButtonsContainer}>
        {amounts.map((amount, index) => (
          <Animated.View
            key={amount}
            style={{
              opacity: buttonsOpacity[index],
              transform: [{ scale: buttonsScale[index] }],
            }}
          >
            <TouchableOpacity
              style={styles.waterButton}
              onPress={() => handleQuickAdd(amount)}
              activeOpacity={0.7}
            >
              <Text style={styles.waterButtonText}>+{amount}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};
