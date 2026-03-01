import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Modal,
  Dimensions,
  PanResponder,
  StyleSheet,
} from 'react-native';
import { styles } from '../styles/globalStyles';
import type { WaterCardProps } from '../types/index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const WaterCard = ({ waterConsumed, goalMl, onAddWater }: WaterCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(waterConsumed);
  
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
  
  // Modal animations
  const modalOpacity = useRef(new Animated.Value(0)).current;
  const modalScale = useRef(new Animated.Value(0.8)).current;
  const sliderX = useRef(new Animated.Value(0)).current;

  const amounts = [150, 250, 350, 500];

  // Open modal with animation
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSliderValue(waterConsumed);
    
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Close modal with animation
  const handleCloseModal = () => {
    Animated.parallel([
      Animated.timing(modalOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.8,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsModalOpen(false);
    });
  };

  // Handle slider value
  const handleSliderChange = (value: number) => {
    setSliderValue(Math.min(Math.max(value, 0), goalMl));
  };

  // Confirm slider value
  const handleConfirmSlider = () => {
    onAddWater(sliderValue);
    handleCloseModal();
  };

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

  // Calculate slider position
  const sliderPercent = (sliderValue / goalMl) * 100;
  const SLIDER_TRACK_WIDTH = SCREEN_WIDTH - 80; // 40px padding on each side
  const sliderPosition = (sliderPercent / 100) * SLIDER_TRACK_WIDTH;

  return (
    <>
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
            <View style={styles.headerRight}>
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
              <TouchableOpacity
                style={styles.waterIconButton}
                onPress={handleOpenModal}
                activeOpacity={0.7}
              >
                <Text style={styles.waterIconButtonText}>💧</Text>
              </TouchableOpacity>
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

      {/* Slider Modal */}
      <Modal
        visible={isModalOpen}
        transparent
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: modalOpacity,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, width: '100%' }}
            onPress={handleCloseModal}
            activeOpacity={1}
          />

          <Animated.View
            style={[
              waterModalStyles.container,
              {
                transform: [{ scale: modalScale }],
              },
            ]}
          >
            {/* Top indicator bar */}
            <View style={waterModalStyles.indicatorBar} />

            {/* Header */}
            <View style={waterModalStyles.header}>
              <View style={waterModalStyles.headerTitleContainer}>
                <Text style={waterModalStyles.headerIcon}>💧</Text>
                <Text style={waterModalStyles.title}>Water Intake</Text>
              </View>
              <TouchableOpacity onPress={handleCloseModal} style={waterModalStyles.closeButtonContainer}>
                <Text style={waterModalStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Display value with background */}
            <View style={waterModalStyles.valueContainer}>
              <Text style={waterModalStyles.value}>{sliderValue}</Text>
              <Text style={waterModalStyles.valueUnit}>ml</Text>
            </View>
            <Text style={waterModalStyles.sublabel}>
              {(sliderValue / 1000).toFixed(2)}L / {(goalMl / 1000).toFixed(2)}L
            </Text>

            {/* Slider Track */}
            <View style={waterModalStyles.sliderContainer}>
              <View style={waterModalStyles.sliderTrack}>
                <View
                  style={[
                    waterModalStyles.sliderFill,
                    { width: `${sliderPercent}%` },
                  ]}
                />
              </View>
              <Animated.View
                style={[
                  waterModalStyles.sliderThumb,
                  {
                    left: sliderPosition,
                  },
                ]}
              >
                <Text style={waterModalStyles.thumbIcon}>💧</Text>
              </Animated.View>
            </View>

            {/* Quick preset buttons */}
            <View style={waterModalStyles.presetsContainer}>
              {[250, 500, 750, 1000].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    waterModalStyles.presetButton,
                    sliderValue === amount && waterModalStyles.presetButtonActive,
                  ]}
                  onPress={() => handleSliderChange(amount)}
                >
                  <Text
                    style={[
                      waterModalStyles.presetButtonText,
                      sliderValue === amount && waterModalStyles.presetButtonTextActive,
                    ]}
                  >
                    {amount}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Input area with +/- buttons */}
            <View style={waterModalStyles.inputContainer}>
              <TouchableOpacity
                style={waterModalStyles.inputButton}
                onPress={() => handleSliderChange(sliderValue - 100)}
              >
                <Text style={waterModalStyles.inputButtonText}>−</Text>
              </TouchableOpacity>
              <View style={waterModalStyles.inputValueContainer}>
                <Text style={waterModalStyles.inputValue}>{sliderValue}</Text>
                <Text style={waterModalStyles.inputValueSmall}>ml</Text>
              </View>
              <TouchableOpacity
                style={waterModalStyles.inputButton}
                onPress={() => handleSliderChange(sliderValue + 100)}
              >
                <Text style={waterModalStyles.inputButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={waterModalStyles.divider} />

            {/* Confirm button */}
            <TouchableOpacity
              style={waterModalStyles.confirmButton}
              onPress={handleConfirmSlider}
              activeOpacity={0.8}
            >
              <Text style={waterModalStyles.confirmButtonText}>💾 Save Changes</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={{ flex: 0.5, width: '100%' }}
            onPress={handleCloseModal}
            activeOpacity={1}
          />
        </Animated.View>
      </Modal>
    </>
  );
};

const waterModalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 28,
    width: SCREEN_WIDTH - 40,
    maxHeight: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 15,
  },
  indicatorBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E8E8E8',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    fontSize: 28,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000',
  },
  closeButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
    fontWeight: '700',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#F8F8FF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 56,
    fontWeight: '800',
    color: '#5C51F0',
  },
  valueUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginLeft: 8,
  },
  sublabel: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  sliderContainer: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  sliderTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#5C51F0',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5C51F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5C51F0',
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    marginLeft: -28,
    marginTop: -24,
  },
  thumbIcon: {
    fontSize: 28,
  },
  presetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: '#5C51F0',
    borderColor: '#5C51F0',
  },
  presetButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  presetButtonTextActive: {
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  inputButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  inputButtonText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5C51F0',
  },
  inputValueContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    backgroundColor: '#F8F8FF',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  inputValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#5C51F0',
  },
  inputValueSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E8',
    marginBottom: 16,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#5C51F0',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C51F0',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
