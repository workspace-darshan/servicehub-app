import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { PROVIDERS } from '../../data/mockData';

const CITIES = ['All Cities', 'Palanpur', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara'];

export const ProviderListingScreen = ({ navigation, route }: any) => {
  const serviceFilter = route?.params?.service || '';
  const [search, setSearch] = useState(serviceFilter);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filtered = PROVIDERS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      || p.service.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === 'All Cities' || p.city === selectedCity;
    const matchVerified = !verifiedOnly || p.verified;
    return matchSearch && matchCity && matchVerified;
  });

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
                <Ionicons name="shield-checkmark" size={11} color={Colors.primary} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.serviceName}>{item.service}</Text>
          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews} reviews)</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.slate300} />
      </View>

      {/* Chips */}
      <View style={styles.chips}>
        <View style={styles.chip}>
          <Ionicons name="location-outline" size={12} color={Colors.slate500} />
          <Text style={styles.chipText}>{item.city}</Text>
        </View>
        <View style={styles.chip}>
          <Ionicons name="time-outline" size={12} color={Colors.slate500} />
          <Text style={styles.chipText}>{item.experience} yrs exp</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Providers</Text>
        <Text style={styles.count}>{filtered.length}</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={Colors.slate400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or service..."
          placeholderTextColor={Colors.slate400}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.slate400} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CITIES}
          keyExtractor={c => c}
          contentContainerStyle={{ paddingLeft: 20, gap: 8, paddingRight: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.cityChip, selectedCity === item && styles.cityChipActive]}
              onPress={() => setSelectedCity(item)}>
              <Text style={[styles.cityChipText, selectedCity === item && { color: Colors.white }]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={[styles.verifiedBtn, verifiedOnly && styles.verifiedBtnActive]}
          onPress={() => setVerifiedOnly(!verifiedOnly)}>
          <Ionicons name="shield-checkmark-outline" size={14} color={verifiedOnly ? Colors.white : Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderProvider}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={56} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>No providers found</Text>
            <Text style={styles.emptyBody}>Try clearing filters or change the city</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  headerTitle: { flex: 1, fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  count: {
    fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.bold,
    backgroundColor: Colors.blue50, paddingHorizontal: 10, paddingVertical: 4, borderRadius: BorderRadius.full,
  },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    height: 52, backgroundColor: Colors.white,
    paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy, height: 52, paddingVertical: 0 },
  filterRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  cityChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow, borderWidth: 1.5, borderColor: Colors.border,
  },
  cityChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  cityChipText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  verifiedBtn: {
    width: 38, height: 38, borderRadius: 10, marginRight: 20,
    borderWidth: 1.5, borderColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  verifiedBtnActive: { backgroundColor: Colors.primary },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, gap: 12, ...Shadows.card },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.blue50,
    borderWidth: 2, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 15, fontWeight: FontWeight.bold, color: Colors.primary },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 2 },
  providerName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.blue50, paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.blue200,
  },
  verifiedText: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.primary, lineHeight: 12 },
  serviceName: { fontSize: FontSize.sm, color: Colors.slate500 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  ratingText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  reviewCount: { fontSize: FontSize.xs, color: Colors.slate400 },
  chips: { flexDirection: 'row', gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow,
  },
  chipText: { fontSize: FontSize.xs, color: Colors.slate500, fontWeight: FontWeight.medium },
  empty: { paddingTop: 60, alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, textAlign: 'center' },
  emptyBody: { fontSize: FontSize.base, color: Colors.slate500, textAlign: 'center' },
});
