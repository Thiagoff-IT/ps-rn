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
import { WaterQuickAdd } from '../components/WaterQuickAdd';

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
      </ScrollView>
      
      {/* Water Quick Add Component */}
      <WaterQuickAdd
        goalMl={2000}
        initialMl={waterConsumed}
        onChange={handleWaterChange}
      />
    </GradientBackground>
  );
};
