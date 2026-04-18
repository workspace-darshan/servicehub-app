import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
import { PROVIDERS } from '../../data/mockData';

// Mock saved providers (first 4 from PROVIDERS)
const SAVED_PROVIDERS = PROVIDERS.slice(0, 4);

export const SavedProvidersScreen = ({ navigation }: any) => {
  const [savedProviders, setSavedProviders] = useState(SAVED_PROVIDERS);

  const handleRemove = (id: string) => {
    setSavedProviders(prev => prev.filter(p => p.id !== id));
  };

  const renderProvider = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
      activeOpacity={0.85}>
      {/* Avatar + Info */}
      <View style={styles.cardTop}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.nameRow}>
            <Text style={styles.providerName}>{item.name}</Text>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={10} color="#FF6B00" />
              </View>
            )}
          </View>
          <Text style={styles.serviceName}>{item.service}</Text>
          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews})</Text>
          </View>
        </View>
        {/* Remove button */}
        <TouchableOpacity 
          style={styles.removeBtn}
          onPress={() => handleRemove(item.id)}>
          <Ionicons name="bookmark" size={20} color="#FF6B00" />
        </TouchableOpacity>
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <View style={styles.chip}>
          <Ionicons name="location" size={11} color="#888" />
          <Text style={styles.chipText}>{item.city}</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="briefcase" size={11} color="#888" />
          <Text style={styles.chipText}>{item.experience} yrs</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="checkmark-circle" size={11} color="#16A34A" />
          <Text style={styles.chipText}>Available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Bar */}
      <TopBar
        title="Saved Providers"
        subtitle={`${savedProviders.length} providers saved`}
      />

      <FlatList
        data={savedProviders}
        renderItem={renderProvider}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Ionicons name="bookmark-outline" size={56} color="#888888" />
            </View>
            <Text style={styles.emptyTitle}>No Saved Providers</Text>
            <Text style={styles.emptyBody}>
              Save your favorite providers for quick access. Tap the bookmark icon on any provider profile.
            </Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('AllServices')}>
              <Text style={styles.browseBtnText}>Browse Services</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F0',
  },
  listContent: {
    padding: 18,
    gap: 12,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B00',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  reviewCount: {
    fontSize: 11,
    color: '#888',
  },
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#F5F4F0',
  },
  chipText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  empty: {
    paddingTop: 80,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D0D0D',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  emptyBody: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    height: 48,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  browseBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
