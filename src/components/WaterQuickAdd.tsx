import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Svg, { Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = 56;
const BUTTON_RADIUS = BUTTON_SIZE / 2;

interface WaterQuickAddProps {
  goalMl: number;
  initialMl: number;
  onChange: (totalMl: number) => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export const WaterQuickAdd: React.FC<WaterQuickAddProps> = ({
  goalMl,
  initialMl,
  onChange,
}) => {
  const [currentMl, setCurrentMl] = useState(initialMl);
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Shared values para animações
  const panelScale = useSharedValue(0.92);
  const panelOpacity = useSharedValue(0);
  const panelTranslateY = useSharedValue(-8);

  const buttonScale = useSharedValue(1);
  const progressValue = useSharedValue(currentMl / goalMl);
  const counterOpacity = useSharedValue(0);
  const counterTranslateY = useSharedValue(0);
  const wavePhase = useSharedValue(0);

  const amounts = [150, 250, 350, 500];

  // Abre o painel
  const handleOpenPanel = useCallback(async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Light);
    setIsPanelOpen(true);

    panelScale.value = withTiming(1, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    panelOpacity.value = withTiming(1, {
      duration: 250,
    });
    panelTranslateY.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  // Fecha o painel
  const handleClosePanel = useCallback(() => {
    panelScale.value = withTiming(0.92, {
      duration: 200,
      easing: Easing.in(Easing.cubic),
    });
    panelOpacity.value = withTiming(0, {
      duration: 200,
    });
    panelTranslateY.value = withTiming(-8, {
      duration: 200,
      easing: Easing.in(Easing.cubic),
    });

    setTimeout(() => {
      setIsPanelOpen(false);
    }, 200);
  }, []);

  // Confirma a adição de água
  const handleConfirmAdd = useCallback(async () => {
    // 1. Fechar painel
    handleClosePanel();

    // 2. Atualizar estado
    const newTotal = currentMl + selectedAmount;
    setCurrentMl(newTotal);
    onChange(newTotal);

    // Haptics de sucesso
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // 3. Sequência de animações
    setTimeout(() => {
      // Bounce do botão
      buttonScale.value = withSequence(
        withSpring(1.12, {
          damping: 8,
          mass: 1,
          stiffness: 100,
          overshootClamping: false,
        }),
        withSpring(1, {
          damping: 8,
          mass: 1,
          stiffness: 100,
        })
      );

      // Counter flutuante
      counterOpacity.value = withSequence(
        withTiming(1, { duration: 0 }),
        withDelay(
          300,
          withTiming(0, {
            duration: 600,
            easing: Easing.out(Easing.quad),
          })
        )
      );

      counterTranslateY.value = withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(
          300,
          withTiming(-14, {
            duration: 600,
            easing: Easing.out(Easing.quad),
          })
        )
      );

      // Progresso do preenchimento
      const newProgress = newTotal / goalMl;
      progressValue.value = withDelay(
        150,
        withTiming(newProgress, {
          duration: 700,
          easing: Easing.out(Easing.cubic),
        })
      );

      // Onda animada continuamente
      wavePhase.value = withSequence(
        withDelay(
          150,
          withTiming(Math.PI * 4, {
            duration: 1500,
            easing: Easing.linear,
          })
        )
      );
    }, 200);
  }, [currentMl, selectedAmount]);

  // Animated styles
  const panelAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: panelScale.value },
      { translateY: panelTranslateY.value },
    ],
    opacity: panelOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const progressCircleRadius = interpolate(
    progressValue.value,
    [0, 1],
    [BUTTON_RADIUS, 0],
    Extrapolate.CLAMP
  );

  const counterAnimatedStyle = useAnimatedStyle(() => ({
    opacity: counterOpacity.value,
    transform: [{ translateY: counterTranslateY.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    // Nada - é apenas valor para renderizar
  }));

  // Gerar onda SVG
  const generateWavePath = (phase: number): string => {
    const centerX = BUTTON_RADIUS;
    const centerY = BUTTON_RADIUS;
    const amplitude = 2;
    const frequency = 2;

    let pathData = `M 0 ${centerY}`;

    for (let x = 0; x <= BUTTON_SIZE; x += 2) {
      const normalizedX = (x / BUTTON_SIZE) * Math.PI * 2 * frequency;
      const progress = interpolate(progressValue.value, [0, 1], [1, 0.5], Extrapolate.CLAMP);
      const y =
        centerY +
        amplitude * Math.sin(normalizedX + phase) * progress;
      pathData += ` L ${x} ${y}`;
    }

    pathData += ` L ${BUTTON_SIZE} ${BUTTON_SIZE}`;
    pathData += ` L 0 ${BUTTON_SIZE}`;
    pathData += ' Z';

    return pathData;
  };

  // Use animated props para atualizar o caminho da onda em cada frame
  const waveAnimatedProps = useAnimatedProps(() => {
    return {
      d: generateWavePath(wavePhase.value),
    };
  });

  // Use animated props para atualizar o raio do círculo de progresso
  const progressCircleAnimatedProps = useAnimatedProps(() => {
    return {
      r: interpolate(progressValue.value, [0, 1], [0, BUTTON_RADIUS - 4], Extrapolate.CLAMP),
    };
  });

  return (
    <View style={styles.container}>
      {/* Botão Principal Circular */}
      <AnimatedView style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleOpenPanel}
          activeOpacity={0.8}
        >
          {/* SVG: Circle bg + progress circle + onda */}
          <Svg width={BUTTON_SIZE} height={BUTTON_SIZE} viewBox={`0 0 ${BUTTON_SIZE} ${BUTTON_SIZE}`}>
            {/* Background circle */}
            <Circle
              cx={BUTTON_RADIUS}
              cy={BUTTON_RADIUS}
              r={BUTTON_RADIUS - 2}
              fill="rgba(100, 200, 255, 0.15)"
            />

            {/* Progress circle (preenchimento) */}
            <AnimatedCircle
              cx={BUTTON_RADIUS}
              cy={BUTTON_RADIUS}
              animatedProps={progressCircleAnimatedProps}
              fill="rgba(100, 200, 255, 0.6)"
            />

            {/* Wave inside circle */}
            {progressValue.value > 0 && (
              <AnimatedPath
                animatedProps={waveAnimatedProps}
                fill="rgba(100, 200, 255, 0.8)"
              />
            )}
          </Svg>

        </TouchableOpacity>
      </AnimatedView>

      {/* Counter flutuante */}
      <AnimatedView
        style={[
          styles.counterContainer,
          counterAnimatedStyle,
        ]}
      >
        <Text style={styles.counterText}>+{selectedAmount} ml</Text>
      </AnimatedView>

      {/* Painel/Popover */}
      {isPanelOpen && (
        <AnimatedView style={[styles.popover, panelAnimatedStyle]}>
          <View style={styles.popoverHeader}>
            <Text style={styles.popoverTitle}>Water</Text>
          </View>

          {/* Amount selector chips */}
          <View style={styles.chipsContainer}>
            {amounts.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.chip,
                  selectedAmount === amount && styles.chipActive,
                ]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedAmount === amount && styles.chipTextActive,
                  ]}
                >
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleConfirmAdd}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClosePanel}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </AnimatedView>
      )}

      {/* Overlay backdrop */}
      {isPanelOpen && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={handleClosePanel}
          activeOpacity={0}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1000,
  },
  buttonContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  button: {
    flex: 1,
    borderRadius: BUTTON_RADIUS,
    backgroundColor: '#5C51F0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  cupIcon: {
    fontSize: 26,
    position: 'absolute',
  },
  counterContainer: {
    position: 'absolute',
    top: -30,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  counterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  backdrop: {
    position: 'absolute',
    top: -height,
    left: -width,
    width: width * 2,
    height: height * 2,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: -1,
  },
  popover: {
    position: 'absolute',
    top: BUTTON_SIZE + 12,
    right: -40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: 240,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    zIndex: 2000,
  },
  popoverHeader: {
    marginBottom: 16,
  },
  popoverTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipActive: {
    backgroundColor: '#5C51F0',
    borderColor: '#4A3FB5',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  chipTextActive: {
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#5C51F0',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
});
