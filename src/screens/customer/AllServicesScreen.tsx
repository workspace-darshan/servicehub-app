import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { SERVICES } from '../../data/mockData';

const CATEGORIES = ['All', 'Repair', 'Cleaning', 'Installation', 'Other'];

const SERVICE_ICON_MAP: Record<string, string> = {
  Plumbing: 'water-outline', Electrical: 'flash-outline', Cleaning: 'sparkles-outline',
  Carpentry: 'hammer-outline', Painting: 'color-palette-outline', 'AC Repair': 'thermometer-outline',
  'Refrigerator Repair': 'snow-outline', 'Washing Machine': 'refresh-outline', 'TV Repair': 'tv-outline',
  'CCTV Installation': 'videocam-outline', 'Inverter Repair': 'battery-charging-outline',
  'RO/Water Purifier': 'water-outline', 'Geyser Repair': 'flame-outline',
  'Bathroom Cleaning': 'water-outline', 'Kitchen Cleaning': 'restaurant-outline',
  'Sofa Cleaning': 'bed-outline', 'Pest Control': 'bug-outline', 'Laptop Repair': 'laptop-outline',
  'Mobile Repair': 'phone-portrait-outline', Locksmith: 'key-outline',
};
const getIcon = (name: string) => SERVICE_ICON_MAP[name] || 'construct-outline';

export const AllServicesScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = SERVICES.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    return matchSearch && matchCat;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Services</Text>
        <Text style={styles.headerCount}>{filtered.length} services</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={Colors.slate400} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
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

      {/* Categories */}
      <View style={styles.catRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, category === cat && styles.catChipActive]}
            onPress={() => setCategory(cat)}>
            <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('Providers', { service: item.name })}
            activeOpacity={0.85}>
            <View style={styles.iconBg}>
              <Ionicons name={getIcon(item.name) as any} size={26} color={Colors.primary} />
            </View>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceTagline} numberOfLines={2}>{item.tagline}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.catBadge}>{item.category}</Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.slate400} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptyBody}>Try a different search or category</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy },
  headerCount: { fontSize: FontSize.sm, color: Colors.slate400 },
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    height: 52, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
    paddingHorizontal: 20,
  },
  searchInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy, height: 52, paddingVertical: 0 },
  catRow: {
    flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingVertical: 12,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  catChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceContainerLow },
  catChipActive: { backgroundColor: Colors.primary },
  catText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  catTextActive: { color: Colors.white },
  grid: { padding: 20, gap: 12, paddingBottom: 100 },
  serviceCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 16, padding: 16, ...Shadows.card,
  },
  iconBg: {
    width: 50, height: 50, borderRadius: 14, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  serviceName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  serviceTagline: { fontSize: FontSize.xs, color: Colors.slate500, marginTop: 4, lineHeight: 16 },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  catBadge: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  empty: { paddingTop: 80, alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  emptyBody: { fontSize: FontSize.base, color: Colors.slate500 },
});
