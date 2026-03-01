import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/globalStyles';

export const StatusBarTop = () => {
  return (
    <View style={styles.statusBarContainer}>
      <Text style={styles.timeText}>9:41</Text>
      <View style={styles.statusIcons}>
        <Text style={styles.statusIcon}>📶</Text>
        <Text style={styles.statusIcon}>📡</Text>
        <Text style={styles.statusIcon}>🔋</Text>
      </View>
    </View>
  );
};
