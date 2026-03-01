import React from 'react';
import { View, ViewProps } from 'react-native';

interface GradientBackgroundProps extends ViewProps {
  children?: React.ReactNode;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          backgroundColor: '#5C51F0',
        },
        style,
      ]}
    >
      {/* Top gradient overlay - lighter */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          backgroundColor: '#7B68D6',
          opacity: 0.4,
        }}
      />
      {/* Bottom gradient overlay - darker */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          backgroundColor: '#4A3FB5',
          opacity: 0.3,
        }}
      />
      {children}
    </View>
  );
};
