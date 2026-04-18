import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SERVICES } from '../../data/mockData';
import { TopBar } from '../../components/TopBar';

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

const SERVICE_COLORS = [
  { bg: '#EDE9FE', icon: '#7C3AED' },
  { bg: '#FEF9C3', icon: '#CA8A04' },
  { bg: '#DCFCE7', icon: '#16A34A' },
  { bg: '#FFE4E6', icon: '#E11D48' },
  { bg: '#E0F2FE', icon: '#0284C7' },
  { bg: '#FEF3C7', icon: '#D97706' },
  { bg: '#F3E8FF', icon: '#9333EA' },
  { bg: '#F0FDF4', icon: '#15803D' },
  { bg: '#DBEAFE', icon: '#3B82F6' },
  { bg: '#FEE2E2', icon: '#EF4444' },
  { bg: '#FCE7F3', icon: '#D946EF' },
  { bg: '#D1FAE5', icon: '#10B981' },
  { bg: '#FED7AA', icon: '#F97316' },
  { bg: '#E0F2FE', icon: '#06B6D4' },
  { bg: '#E0E7FF', icon: '#6366F1' },
  { bg: '#FEF08A', icon: '#EAB308' },
  { bg: '#BFDBFE', icon: '#2563EB' },
  { bg: '#FECACA', icon: '#DC2626' },
  { bg: '#BBF7D0', icon: '#16A34A' },
  { bg: '#FBCFE8', icon: '#DB2777' },
];

const getIcon = (name: string) => SERVICE_ICON_MAP[name] || 'construct-outline';
const getColorSet = (index: number) => SERVICE_COLORS[index % SERVICE_COLORS.length];

const screenWidth = Dimensions.get('window').width;
const numColumns = 6;
const gap = 6;
const horizontalPadding = 40; // 20px on each side
const totalGaps = gap * (numColumns - 1);
const availableWidth = screenWidth - horizontalPadding - totalGaps;
const itemWidth = Math.floor(availableWidth / numColumns);

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

      <TopBar
        title="All Services"
        subtitle={`${filtered.length} services available`}
      />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={15} color="#bbb" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#888" />
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
        numColumns={6}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const colorSet = getColorSet(index);
          return (
            <TouchableOpacity
              style={[styles.serviceCard, { width: itemWidth }]}
              onPress={() => navigation.navigate('Providers', { service: item.name })}
              activeOpacity={0.7}>
              <View style={[styles.iconBg, { backgroundColor: colorSet.bg }]}>
                <Ionicons name={getIcon(item.name) as any} size={20} color={colorSet.icon} />
              </View>
              <Text style={styles.serviceName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No services found</Text>
            <Text style={styles.emptyBody}>Try a different search or category</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: '#F5F4F0',
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.4,
  },
  headerCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0D0D0D',
    height: 44,
    paddingVertical: 0,
    outlineWidth: 0,
    outlineStyle: 'none',
  } as any,
  catRow: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  catChipActive: {
    backgroundColor: '#0D0D0D',
    borderColor: '#0D0D0D',
  },
  catText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  catTextActive: {
    color: '#fff',
  },
  grid: {
    padding: 20,
    paddingBottom: 100,
  },
  columnWrapper: {
    gap: 6,
    marginBottom: 14,
  },
  serviceCard: {
    alignItems: 'center',
    marginBottom: 0,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 10,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
    width: '100%',
    paddingHorizontal: 2,
  },
  empty: {
    paddingTop: 80,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  emptyBody: {
    fontSize: 13,
    color: '#888',
  },
});
