import React, { useState } from 'react';
import {
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import { GradientBackground } from '../components/GradientBackground';
import { StatusBarTop } from '../components/StatusBarTop';
import { HeaderInfo } from '../components/HeaderInfo';
import { BarChart } from '../components/BarChart';
import { StepsCard } from '../components/StepsCard';
import { WaterCard } from '../components/WaterCard';

export const DashboardScreen = () => {
  const [stepsConsumed, setStepsConsumed] = useState(0);
  const [waterConsumed, setWaterConsumed] = useState(0);

  const handleAddSteps = () => {
    setStepsConsumed((prev) => {
      const newValue = Math.min(prev + 25, 275);
      return newValue;
    });
  };

  const handleWaterChange = (totalMl: number) => {
    setWaterConsumed(totalMl);
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
        <WaterCard waterConsumed={waterConsumed} goalMl={2000} onAddWater={handleWaterChange} />
      </ScrollView>
    </GradientBackground>
  );
};
