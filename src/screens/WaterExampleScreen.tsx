import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { WaterQuickAdd } from '../components/WaterQuickAdd';

/**
 * WaterExampleScreen
 * 
 * Exemplo completo de como usar o componente WaterQuickAdd
 * Este é um componente de demonstração/teste isolado
 */
export const WaterExampleScreen = () => {
  const [waterConsumed, setWaterConsumed] = useState(250);
  const WATER_GOAL = 2000;

  const handleWaterChange = (totalMl: number) => {
    setWaterConsumed(totalMl);
  };

  const progressPercentage = Math.round((waterConsumed / WATER_GOAL) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Water Intake Tracker</Text>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.progressText}>
            {waterConsumed} / {WATER_GOAL} ml
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(progressPercentage, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.percentageText}>{progressPercentage}%</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>How to use:</Text>
          <Text style={styles.instructionText}>
            • Tap the water cup button in the top-right corner
          </Text>
          <Text style={styles.instructionText}>
            • Select an amount (150, 250, 350 ou 500 ml)
          </Text>
          <Text style={styles.instructionText}>
            • Press "Add" to confirm
          </Text>
          <Text style={styles.instructionText}>
            • Watch the smooth animation with liquid fill + wave
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Features:</Text>
          <Text style={styles.featureItem}>✓ Premium animations with react-native-reanimated</Text>
          <Text style={styles.featureItem}>✓ Liquid fill with wave effect</Text>
          <Text style={styles.featureItem}>✓ Bounce feedback on button</Text>
          <Text style={styles.featureItem}>✓ Floating counter animation</Text>
          <Text style={styles.featureItem}>✓ Haptic feedback (light + success)</Text>
          <Text style={styles.featureItem}>✓ Fully isolated & reusable component</Text>
        </View>

        {/* Props Example */}
        <View style={styles.propsCard}>
          <Text style={styles.propsTitle}>Component Props:</Text>
          <Text style={styles.propsCode}>
            {`<WaterQuickAdd\n  goalMl={${WATER_GOAL}}\n  initialMl={${waterConsumed}}\n  onChange={handleWaterChange}\n/>`}
          </Text>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {/* Water Quick Add Component - Floating Button */}
      <WaterQuickAdd
        goalMl={WATER_GOAL}
        initialMl={waterConsumed}
        onChange={handleWaterChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5C51F0',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5C51F0',
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  instructionsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  featuresCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
    lineHeight: 20,
  },
  propsCard: {
    backgroundColor: '#F5F0FF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#5C51F0',
  },
  propsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C51F0',
    marginBottom: 12,
  },
  propsCode: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#333',
    lineHeight: 18,
  },
});
