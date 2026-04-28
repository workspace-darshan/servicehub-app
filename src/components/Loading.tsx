import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  fullScreen = true,
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color="#FF6B00" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: '#F5F4F0',
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
});
