import React, { useRef, useEffect } from 'react';
import {
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { StatusBarTop } from '../components/StatusBarTop';
import { styles } from '../styles/globalStyles';

export const HistoryScreen = () => {
  // Animation refs
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const cardOpacity = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const cardScale = useRef([
    new Animated.Value(0.85),
    new Animated.Value(0.85),
    new Animated.Value(0.85),
  ]).current;

  const stats = [
    {
      icon: '💧',
      title: 'Total Water',
      value: '12.5L',
      subtitle: 'This week',
      color: '#64C8FF',
    },
    {
      icon: '👟',
      title: 'Total Steps',
      value: '45,250',
      subtitle: 'This week',
      color: '#7C3AED',
    },
    {
      icon: '🔥',
      title: 'Streak',
      value: '7 days',
      subtitle: 'Current',
      color: '#FF6B6B',
    },
  ];

  useEffect(() => {
    // Title animation
    Animated.parallel([
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(titleTranslateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Cards staggered animation
    const cardAnimations = cardOpacity.map((anim, index) =>
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          delay: 300 + index * 100,
          useNativeDriver: true,
        }),
        Animated.spring(cardScale[index], {
          toValue: 1,
          friction: 7,
          tension: 40,
          delay: 300 + index * 100,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel(cardAnimations).start();
  }, []);

  return (
    <GradientBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBarTop />

        {/* Title */}
        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <Text style={styles.pageTitle}>History</Text>
          <Text style={styles.pageSubtitle}>Your weekly progress</Text>
        </Animated.View>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 15, gap: 12 }}>
          {stats.map((stat, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: cardOpacity[index],
                transform: [{ scale: cardScale[index] }],
              }}
            >
              <View style={[styles.statCard, { borderLeftColor: stat.color, borderLeftWidth: 4 }]}>
                <View style={styles.statCardHeader}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <View style={styles.statCardInfo}>
                    <Text style={styles.statCardTitle}>{stat.title}</Text>
                    <Text style={styles.statCardSubtitle}>{stat.subtitle}</Text>
                  </View>
                </View>
                <Text style={styles.statCardValue}>{stat.value}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Activity Chart Section */}
        <View style={{ paddingHorizontal: 15, paddingTop: 32 }}>
          <Text style={styles.sectionTitle}>Activity This Week</Text>

          <View style={styles.activityContainer}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <View key={day} style={styles.dayActivityItem}>
                <View
                  style={[
                    styles.activityBar,
                    {
                      height: `${20 + index * 12}%`,
                    },
                  ]}
                />
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Goals Section */}
        <View style={{ paddingHorizontal: 15, paddingTop: 32 }}>
          <Text style={styles.sectionTitle}>Goals</Text>

          <View style={styles.goalsContainer}>
            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>Daily Water Intake</Text>
                <Text style={styles.goalBadge}>75%</Text>
              </View>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '75%' }]} />
              </View>
              <Text style={styles.goalSubtext}>1.5L of 2.0L goal</Text>
            </View>

            <View style={styles.goalItem}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>Daily Steps</Text>
                <Text style={styles.goalBadge}>82%</Text>
              </View>
              <View style={styles.goalProgressBar}>
                <View style={[styles.goalProgressFill, { width: '82%' }]} />
              </View>
              <Text style={styles.goalSubtext}>8,200 of 10,000 steps</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};
