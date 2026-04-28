import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#E11D48" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry} activeOpacity={0.7}>
          <Ionicons name="refresh-outline" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>{retryLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#F5F4F0',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D0D0D',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
