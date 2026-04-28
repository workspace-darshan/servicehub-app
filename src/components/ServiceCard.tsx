import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  name: string;
  icon?: string;
  backgroundColor?: string;
  iconColor?: string;
  providerCount?: number;
  onPress: () => void;
}

const SERVICE_ICON_MAP: Record<string, string> = {
  Plumbing: 'water-outline',
  Electrical: 'flash-outline',
  Cleaning: 'sparkles-outline',
  Carpentry: 'hammer-outline',
  Painting: 'color-palette-outline',
  'AC Repair': 'thermometer-outline',
  'Refrigerator Repair': 'snow-outline',
  'Washing Machine': 'refresh-outline',
  'TV Repair': 'tv-outline',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  icon,
  backgroundColor = '#EDE9FE',
  iconColor = '#7C3AED',
  providerCount,
  onPress,
}) => {
  const iconName = icon || SERVICE_ICON_MAP[name] || 'construct-outline';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor }]}>
        <Ionicons name={iconName as any} size={24} color={iconColor} />
      </View>
      <Text style={styles.label} numberOfLines={2}>
        {name}
      </Text>
      {providerCount !== undefined && (
        <Text style={styles.count}>{providerCount} providers</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '22%',
    alignItems: 'center',
    gap: 6,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
    fontWeight: '500',
  },
  count: {
    fontSize: 9,
    color: '#999',
    textAlign: 'center',
  },
});
