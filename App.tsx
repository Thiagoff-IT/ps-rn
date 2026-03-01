import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DashboardScreen, HistoryScreen } from './src/screens';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'history'>('dashboard');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {activeScreen === 'dashboard' ? <DashboardScreen /> : <HistoryScreen />}

        {/* Bottom Navigation */}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={[styles.navItem, activeScreen === 'dashboard' && styles.navItemActive]}
            onPress={() => setActiveScreen('dashboard')}
          >
            <Text style={[styles.navIcon, activeScreen === 'dashboard' && styles.navIconActive]}>
              🏠
            </Text>
            <Text style={[styles.navLabel, activeScreen === 'dashboard' && styles.navLabelActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeScreen === 'history' && styles.navItemActive]}
            onPress={() => setActiveScreen('history')}
          >
            <Text style={[styles.navIcon, activeScreen === 'history' && styles.navIconActive]}>
              📊
            </Text>
            <Text style={[styles.navLabel, activeScreen === 'history' && styles.navLabelActive]}>
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingVertical: 8,
    paddingHorizontal: 20,
    gap: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  navItemActive: {
    backgroundColor: '#F5F5F5',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    fontSize: 26,
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#5C51F0',
    fontWeight: '700',
  },
});
