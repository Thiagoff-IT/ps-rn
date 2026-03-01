import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
} from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { StatusBarTop } from '../components/StatusBarTop';
import { HeaderInfo } from '../components/HeaderInfo';
import { BarChart } from '../components/BarChart';
import { StepsCard } from '../components/StepsCard';

export const DashboardScreen = () => {
  const [stepsConsumed, setStepsConsumed] = useState(0);

  const handleAddSteps = () => {
    setStepsConsumed((prev) => {
      const newValue = Math.min(prev + 25, 275);
      return newValue;
    });
  };

  return (
    <GradientBackground>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBarTop />
        <HeaderInfo />
        <BarChart />
        <StepsCard stepsConsumed={stepsConsumed} onAddSteps={handleAddSteps} />
      </ScrollView>
    </GradientBackground>
  );
};
