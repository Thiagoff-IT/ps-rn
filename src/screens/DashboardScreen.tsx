import React, { useState } from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import { styles } from '../styles/globalStyles';
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
    <View style={styles.container}>
      <HeaderInfo />
      <BarChart />
      <StepsCard stepsConsumed={stepsConsumed} onAddSteps={handleAddSteps} />
      <StatusBar style="light" />
    </View>
  );
};
