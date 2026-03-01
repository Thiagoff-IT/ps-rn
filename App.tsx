import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CHART_DATA = [
  { day: 'Thu', value: 300, maxValue: 2500 },
  { day: 'Fri', value: 2500, maxValue: 2500 },
  { day: 'Sat', value: 1200, maxValue: 2500 },
  { day: 'Sun', value: 1800, maxValue: 2500 },
  { day: 'Mon', value: 600, maxValue: 2500 },
  { day: 'Tue', value: 900, maxValue: 2500 },
  { day: 'Wed', value: 400, maxValue: 2500 },
];

const HeaderInfo = () => {
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

const BarChart = () => {
  const animatedValues = useRef(CHART_DATA.map(() => new Animated.Value(0))).current;
  const chartOpacity = useRef(new Animated.Value(0)).current;
  const chartScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(chartOpacity, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(chartScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: CHART_DATA[index].value,
        duration: 1000,
        delay: 500 + index * 100,
        useNativeDriver: false,
      })
    );

    Animated.stagger(100, animations).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.chartContainer,
        {
          opacity: chartOpacity,
          transform: [{ scale: chartScale }],
        },
      ]}
    >
      <View style={styles.chartContent}>
        {animatedValues.map((animValue, index) => (
          <View key={index} style={styles.barWrapper}>
            <Animated.View
              style={[
                styles.bar,
                {
                  height: animValue.interpolate({
                    inputRange: [0, 2500],
                    outputRange: ['0%', '100%'],
                  }),
                  opacity: animValue.interpolate({
                    inputRange: [0, 2500],
                    outputRange: [0.5, 1],
                  }),
                  transform: [
                    {
                      scaleY: animValue.interpolate({
                        inputRange: [0, 2500],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
            <Text style={styles.dayLabel}>{CHART_DATA[index].day}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

const StepsCard = () => {
  const cardScale = useRef(new Animated.Value(0.85)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(50)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;
  const badgeRotate = useRef(new Animated.Value(0)).current;
  const stepsAnimValue = useRef(new Animated.Value(0)).current;
  const [stepsDisplay, setStepsDisplay] = useState(0);
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

  const badgeRotation = badgeRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

      <Text style={styles.stepsNumber}>{stepsDisplay}</Text>
      <Text style={styles.stepsLabel}>Steps</Text>

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
              <>
                <Text style={styles.controlIcon}>👟</Text>
                <Text style={styles.controlLabel}>Steps</Text>
              </>
            )}
            {index === 1 && <Text style={styles.controlIcon}>〰️</Text>}
            {index === 2 && <Text style={styles.controlIcon}>⊙</Text>}
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderInfo />
      <BarChart />
      <StepsCard />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C51F0',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    position: 'relative',
  },
  headerItem: {
    flex: 1,
  },
  headerNumber: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 28,
    fontWeight: '600',
  },
  headerHighlight: {
    color: '#FF9500',
    fontSize: 28,
    fontWeight: '700',
  },
  headerLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  trashIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashText: {
    fontSize: 20,
  },
  chartContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 30,
    alignItems: 'center',
  },
  chartContent: {
    width: '100%',
    height: 180,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  bar: {
    width: '100%',
    backgroundColor: 'rgba(200, 190, 255, 0.5)',
    borderRadius: 12,
    minHeight: 20,
  },
  dayLabel: {
    marginTop: 10,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  card: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    marginBottom: 20,
  },
  cardHeader: {
    marginBottom: 16,
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  stepsNumber: {
    fontSize: 72,
    fontWeight: '800',
    color: '#000',
    marginVertical: 8,
    lineHeight: 80,
  },
  stepsLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginBottom: 28,
  },
  metricsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  metricLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
    fontWeight: '500',
  },
  metricUnit: {
    fontSize: 10,
    color: '#CCC',
    marginTop: 2,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
  },
  controlIcon: {
    fontSize: 22,
  },
  controlLabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
    fontWeight: '600',
  },
});
