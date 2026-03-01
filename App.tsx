import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 40; // track margin
const SLIDER_HEIGHT = 60;

export default function App() {
  const overlayTranslate = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [overlayVisible, setOverlayVisible] = useState(false);

  const sliderX = useRef(new Animated.Value(0)).current;
  const [sliderValue, setSliderValue] = useState(1);
  const lastX = useRef(0);
  const numberScale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sliderX.setOffset(lastX.current);
        sliderX.setValue(0);
      },
      onPanResponderMove: (e, gestureState) => {
        const max = SLIDER_WIDTH - 40;
        let x = lastX.current + gestureState.dx;
        if (x < 0) x = 0;
        if (x > max) x = max;
        sliderX.setValue(x);
        const percent = x / max;
        const value = Math.round(percent * 9) + 1;
        if (value !== sliderValue) {
          setSliderValue(value);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const max = SLIDER_WIDTH - 40;
        let x = lastX.current + gestureState.dx;
        if (x < 0) x = 0;
        if (x > max) x = max;
        lastX.current = x;
        sliderX.flattenOffset();
        Animated.spring(sliderX, {
          toValue: x,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const sliderOpacity = useRef(new Animated.Value(0)).current;

  const openOverlay = () => {
    setOverlayVisible(true);
    Animated.spring(overlayTranslate, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      // after overlay visible animate slider
      Animated.timing(sliderOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const closeOverlay = () => {
    Animated.spring(overlayTranslate, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: true,
    }).start(() => {
      setOverlayVisible(false);
      sliderOpacity.setValue(0);
    });
  };

  // animate number when sliderValue changes
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(numberScale, {
        toValue: 1.4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(numberScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }, [sliderValue]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openOverlay}>
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
      {overlayVisible && (
        <Animated.View
          style={[
            styles.overlay,
            { transform: [{ translateY: overlayTranslate }] },
          ]}
        >
          <Text style={styles.overlayTitle}>Select a number</Text>
          <Animated.View style={[styles.sliderContainer, { opacity: sliderOpacity }]}> 
            {/* optional row of numbers */}
            <View style={styles.numbersRow}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <Text
                  key={n}
                  style={[
                    styles.numberLabel,
                    sliderValue === n && styles.numberLabelActive,
                  ]}
                >
                  {n}
                </Text>
              ))}
            </View>
            <View style={styles.track} />
            <Animated.View
              style={[
                styles.knob,
                { transform: [{ translateX: sliderX }] },
              ]}
              {...panResponder.panHandlers}
            >
              <Animated.Text
                style={[
                  styles.knobText,
                  { transform: [{ scale: numberScale }] },
                ]}
              >
                {sliderValue}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
          <TouchableOpacity style={styles.closeButton} onPress={closeOverlay}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#007aff',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  overlayTitle: { fontSize: 18, marginBottom: 20 },
  sliderContainer: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: 4,
    width: SLIDER_WIDTH,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  knob: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  knobText: { color: '#fff', fontWeight: 'bold' },
  closeButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#ff3b30',
    borderRadius: 8,
  },
  closeText: { color: '#fff' },
  numbersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SLIDER_WIDTH,
    marginBottom: 8,
  },
  numberLabel: {
    fontSize: 12,
    color: '#888',
  },
  numberLabelActive: {
    color: '#007aff',
    fontWeight: 'bold',
  },
});
