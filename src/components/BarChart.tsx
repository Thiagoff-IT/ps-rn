import React, { useRef, useEffect } from 'react';
import {
  Text,
  View,
  Animated,
} from 'react-native';
import { styles } from '../styles/globalStyles';
import { CHART_DATA } from '../constants/chartData';

export const BarChart = () => {
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
