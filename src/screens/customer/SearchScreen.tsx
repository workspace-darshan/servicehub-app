import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SERVICES, PROVIDERS } from '../../data/mockData';

const screenWidth = Dimensions.get('window').width;
const numColumns = 5;
const horizontalPadding = 36;
const gap = 10;
const totalGaps = gap * (numColumns - 1);
const availableWidth = screenWidth - horizontalPadding - totalGaps;
const itemWidth = Math.floor(availableWidth / numColumns);

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
  { bg: '#EDE9FE', icon: '#7C3AED' }, { bg: '#FEF9C3', icon: '#CA8A04' },
  { bg: '#DCFCE7', icon: '#16A34A' }, { bg: '#FFE4E6', icon: '#E11D48' },
  { bg: '#E0F2FE', icon: '#0284C7' }, { bg: '#FEF3C7', icon: '#D97706' },
  { bg: '#F3E8FF', icon: '#9333EA' }, { bg: '#F0FDF4', icon: '#15803D' },
  { bg: '#DBEAFE', icon: '#3B82F6' }, { bg: '#FEE2E2', icon: '#EF4444' },
  { bg: '#FCE7F3', icon: '#D946EF' }, { bg: '#D1FAE5', icon: '#10B981' },
  { bg: '#FED7AA', icon: '#F97316' }, { bg: '#E0E7FF', icon: '#6366F1' },
  { bg: '#FEF08A', icon: '#EAB308' }, { bg: '#BFDBFE', icon: '#2563EB' },
  { bg: '#FECACA', icon: '#DC2626' }, { bg: '#BBF7D0', icon: '#16A34A' },
  { bg: '#FBCFE8', icon: '#DB2777' }, { bg: '#E0F2FE', icon: '#06B6D4' },
];

const getIcon = (name: string) => SERVICE_ICON_MAP[name] || 'construct-outline';
const getColorSet = (index: number) => SERVICE_COLORS[index % SERVICE_COLORS.length];

export const SearchScreen = ({ navigation, route }: any) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showAllServices, setShowAllServices] = useState(false);
  const searchRef = useRef<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (route?.params?.focus) {
      setTimeout(() => searchRef.current?.focus(), 150);
    }
  }, [route?.params?.focus]);

  const filtered = SERVICES.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    return matchSearch && matchCat;
  });

  const initialServices = filtered.slice(0, 10); // 2 rows of 5
  const displayServices = showAllServices ? filtered : initialServices;

  // Build rows of 5
  const rows: typeof filtered[] = [];
  for (let i = 0; i < displayServices.length; i += numColumns) {
    rows.push(displayServices.slice(i, i + numColumns));
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Search Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#0D0D0D" />
        </TouchableOpacity>

        {/* Search bar with left border accent */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={16} color="#888" />
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            placeholder="Search services or providers..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          <View style={styles.divider} />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.micBtn}>
              <Ionicons name="close-circle" size={18} color="#888" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic-outline" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {/* Category chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, category === cat && styles.catChipActive]}
              onPress={() => setCategory(cat)}>
              <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity
              onPress={() => setShowAllServices(!showAllServices)}
              style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>
                {showAllServices ? 'Show less ↑' : 'View all →'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Service grid rows */}
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.serviceRow}>
              {row.map((item, index) => {
                const colorSet = getColorSet(rowIndex * numColumns + index);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.serviceCard, { width: itemWidth }]}
                    onPress={() => navigation.navigate('Providers', { service: item.name })}
                    activeOpacity={0.7}>
                    <View style={[styles.iconBg, { backgroundColor: colorSet.bg }]}>
                      <Ionicons name={getIcon(item.name) as any} size={20} color={colorSet.icon} />
                    </View>
                    <Text style={styles.serviceName} numberOfLines={2}>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={40} color="#ccc" />
              <Text style={styles.emptyTitle}>No services found</Text>
              <Text style={styles.emptyBody}>Try a different search or category</Text>
            </View>
          )}
        </View>

        {/* Top Rated Providers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Rated Providers</Text>
          {PROVIDERS.slice(0, 3).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.providerCard}
              onPress={() => navigation.navigate('ProviderProfile', { providerId: item.id })}
              activeOpacity={0.85}>
              <View style={styles.providerAvatar}>
                <Text style={styles.providerInitials}>{item.initials}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{item.name}</Text>
                <Text style={styles.providerService}>{item.service}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={11} color="#FFB800" />
                  <Text style={styles.providerRating}>{item.rating}</Text>
                  <Text style={styles.providerReviews}>({item.reviews} reviews)</Text>
                  {item.verified && (
                    <Ionicons name="shield-checkmark" size={11} color="#16A34A" />
                  )}
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingBottom: 6,
    backgroundColor: '#F5F4F0',
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 12,
  },
  searchLeftBorder: {
    display: 'none',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0D0D0D',
    height: 46,
    paddingVertical: 0,
    paddingHorizontal: 8,
    outlineStyle: 'none',
  } as any,
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#ECECEC',
    marginHorizontal: 8,
  },
  micBtn: {
    width: 20,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { paddingBottom: 20 },
  catRow: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 10,
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
  catText: { fontSize: 12, fontWeight: '500', color: '#666' },
  catTextActive: { color: '#fff' },
  section: { paddingHorizontal: 18, marginBottom: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0D0D0D',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  viewAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#FFF4ED',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD4B3',
  },
  viewAllText: { fontSize: 11, fontWeight: '600', color: '#FF6B00' },
  serviceRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  serviceCard: { alignItems: 'center' },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  },
  empty: { paddingVertical: 40, alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: '#0D0D0D' },
  emptyBody: { fontSize: 12, color: '#888' },
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    gap: 12,
  },
  providerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF4ED',
    borderWidth: 2,
    borderColor: '#FFD4B3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerInitials: { fontSize: 15, fontWeight: '700', color: '#FF6B00' },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 14, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.2 },
  providerService: { fontSize: 12, color: '#888', marginTop: 1 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  providerRating: { fontSize: 12, fontWeight: '600', color: '#0D0D0D' },
  providerReviews: { fontSize: 11, color: '#888' },
});
