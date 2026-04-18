import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,
  ScrollView, Modal, Animated, PanResponder, useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
import { PROVIDERS } from '../../data/mockData';

const CITIES = ['All Cities', 'Palanpur', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara'];
const MIN_RATINGS = [0, 4.0, 4.5, 4.8];
const EXP_OPTIONS = [0, 2, 5, 10];

const SHEET_HEIGHT = 480;

export const ProviderListingScreen = ({ navigation, route }: any) => {
  const serviceFilter = route?.params?.service || '';
  const [search, setSearch] = useState(serviceFilter);

  // Filter state
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minExp, setMinExp] = useState(0);

  // Draft filter state (inside panel before Apply)
  const [draftCity, setDraftCity] = useState('All Cities');
  const [draftVerified, setDraftVerified] = useState(false);
  const [draftRating, setDraftRating] = useState(0);
  const [draftExp, setDraftExp] = useState(0);

  const [sheetOpen, setSheetOpen] = useState(false);
  const { height: screenHeight } = useWindowDimensions();

  // Animated sheet
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const openSheet = () => {
    // Sync draft with current applied filters
    setDraftCity(selectedCity);
    setDraftVerified(verifiedOnly);
    setDraftRating(minRating);
    setDraftExp(minExp);
    setSheetOpen(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: SHEET_HEIGHT,
      duration: 280,
      useNativeDriver: true,
    }).start(() => setSheetOpen(false));
  };

  const applyFilters = () => {
    setSelectedCity(draftCity);
    setVerifiedOnly(draftVerified);
    setMinRating(draftRating);
    setMinExp(draftExp);
    closeSheet();
  };

  const resetFilters = () => {
    setDraftCity('All Cities');
    setDraftVerified(false);
    setDraftRating(0);
    setDraftExp(0);
  };

  // Drag to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80) {
          closeSheet();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  // Active filter count badge
  const activeCount = [
    selectedCity !== 'All Cities',
    verifiedOnly,
    minRating > 0,
    minExp > 0,
  ].filter(Boolean).length;

  const filtered = PROVIDERS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      || p.service.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === 'All Cities' || p.city === selectedCity;
    const matchVerified = !verifiedOnly || p.verified;
    const matchRating = p.rating >= minRating;
    const matchExp = p.experience >= minExp;
    return matchSearch && matchCity && matchVerified && matchRating && matchExp;
  });

  const renderProvider = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
      activeOpacity={0.85}>
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
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#FBBF24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviews})</Text>
          </View>
        </View>
      </View>
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
      <TopBar
        title="Find Providers"
        subtitle={`${filtered.length} providers available`}
      />

      {/* Search + Filter button row */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={15} color="#bbb" />
          <TextInput
            style={styles.searchInput as any}
            placeholder="Search by name or service..."
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

        {/* Filter button */}
        <TouchableOpacity style={styles.filterBtn} onPress={openSheet} activeOpacity={0.8}>
          <Ionicons name="options-outline" size={18} color={activeCount > 0 ? '#fff' : '#FF6B00'} />
          {activeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Provider list */}
      <FlatList
        data={filtered}
        renderItem={renderProvider}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={56} color="#ccc" />
            <Text style={styles.emptyTitle}>No providers found</Text>
            <Text style={styles.emptyBody}>Try clearing filters or change the city</Text>
          </View>
        }
      />

      {/* Filter bottom sheet */}
      <Modal transparent visible={sheetOpen} animationType="none" onRequestClose={closeSheet}>
        {/* Dim overlay */}
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSheet} />

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          {/* Drag handle */}
          <View {...panResponder.panHandlers} style={styles.dragArea}>
            <View style={styles.handle} />
          </View>

          {/* Sheet header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filter Providers</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetBody}>
            {/* City */}
            <Text style={styles.filterLabel}>CITY</Text>
            <View style={styles.chipWrap}>
              {CITIES.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.filterChip, draftCity === c && styles.filterChipActive]}
                  onPress={() => setDraftCity(c)}>
                  <Text style={[styles.filterChipText, draftCity === c && styles.filterChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Min Rating */}
            <Text style={[styles.filterLabel, { marginTop: 18 }]}>MINIMUM RATING</Text>
            <View style={styles.chipWrap}>
              {MIN_RATINGS.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.filterChip, draftRating === r && styles.filterChipActive]}
                  onPress={() => setDraftRating(r)}>
                  <Ionicons name="star" size={11} color={draftRating === r ? '#FF6B00' : '#AAA'} />
                  <Text style={[styles.filterChipText, draftRating === r && styles.filterChipTextActive]}>
                    {r === 0 ? 'Any' : `${r}+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Min Experience */}
            <Text style={[styles.filterLabel, { marginTop: 18 }]}>EXPERIENCE</Text>
            <View style={styles.chipWrap}>
              {EXP_OPTIONS.map(e => (
                <TouchableOpacity
                  key={e}
                  style={[styles.filterChip, draftExp === e && styles.filterChipActive]}
                  onPress={() => setDraftExp(e)}>
                  <Text style={[styles.filterChipText, draftExp === e && styles.filterChipTextActive]}>
                    {e === 0 ? 'Any' : `${e}+ yrs`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Verified toggle */}
            <Text style={[styles.filterLabel, { marginTop: 18 }]}>VERIFICATION</Text>
            <TouchableOpacity
              style={[styles.toggleRow, draftVerified && styles.toggleRowActive]}
              onPress={() => setDraftVerified(!draftVerified)}
              activeOpacity={0.8}>
              <View style={styles.toggleLeft}>
                <View style={[styles.toggleIcon, draftVerified && styles.toggleIconActive]}>
                  <Ionicons name="shield-checkmark" size={15} color={draftVerified ? '#fff' : '#FF6B00'} />
                </View>
                <View>
                  <Text style={styles.toggleTitle}>Verified Only</Text>
                  <Text style={styles.toggleSub}>Show verified providers only</Text>
                </View>
              </View>
              <View style={[styles.toggleSwitch, draftVerified && styles.toggleSwitchOn]}>
                <View style={[styles.toggleThumb, draftVerified && styles.toggleThumbOn]} />
              </View>
            </TouchableOpacity>
          </ScrollView>

          {/* Apply button */}
          <View style={styles.sheetFooter}>
            <TouchableOpacity style={styles.applyBtn} onPress={applyFilters} activeOpacity={0.85}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
              {activeCount > 0 && (
                <View style={styles.applyBadge}>
                  <Text style={styles.applyBadgeText}>{activeCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },

  // Search row
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, paddingHorizontal: 18, paddingVertical: 12,
  },
  searchWrap: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    height: 44, backgroundColor: '#FFFFFF',
    borderRadius: 14, paddingHorizontal: 14,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  searchInput: {
    flex: 1, fontSize: 13, color: '#0D0D0D',
    height: 44, paddingVertical: 0,
    outlineWidth: 0, outlineStyle: 'none',
  },
  filterBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  badge: {
    position: 'absolute', top: -4, right: -4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#FF6B00', alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 9, fontWeight: '800', color: '#fff' },

  // List
  listContent: { padding: 18, gap: 12, paddingBottom: 100 },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 16, gap: 12,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#FFF0E6', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#FF6B00' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  providerName: { fontSize: 15, fontWeight: '700', color: '#0D0D0D' },
  verifiedBadge: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#FFF0E6', alignItems: 'center', justifyContent: 'center',
  },
  serviceName: { fontSize: 12, color: '#888', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  reviewCount: { fontSize: 11, color: '#888' },
  chips: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, backgroundColor: '#F5F4F0',
  },
  chipText: { fontSize: 11, color: '#666', fontWeight: '500' },
  empty: { paddingTop: 60, alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: '#0D0D0D', textAlign: 'center' },
  emptyBody: { fontSize: 13, color: '#888', textAlign: 'center' },

  // Bottom sheet
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: SHEET_HEIGHT, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  dragArea: {
    width: '100%', paddingVertical: 12, alignItems: 'center',
  },
  handle: {
    width: 36, height: 4, borderRadius: 2, backgroundColor: '#DDDDDD',
  },
  sheetHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.3 },
  resetText: { fontSize: 13, color: '#FF6B00', fontWeight: '600' },
  sheetBody: { padding: 20, paddingBottom: 12 },

  // Filter options
  filterLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
    borderWidth: 1.5, borderColor: '#ECECEC', backgroundColor: '#F5F4F0',
  },
  filterChipActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  filterChipText: { fontSize: 12, color: '#666', fontWeight: '500' },
  filterChipTextActive: { color: '#FF6B00', fontWeight: '700' },

  // Verified toggle row
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#F5F4F0', borderRadius: 14, padding: 14,
    borderWidth: 1.5, borderColor: '#ECECEC',
  },
  toggleRowActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  toggleIconActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  toggleTitle: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  toggleSub: { fontSize: 11, color: '#888', marginTop: 1 },
  toggleSwitch: {
    width: 44, height: 24, borderRadius: 12,
    backgroundColor: '#DDDDDD', justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchOn: { backgroundColor: '#FF6B00' },
  toggleThumb: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbOn: { alignSelf: 'flex-end' },

  // Apply footer
  sheetFooter: {
    padding: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0',
  },
  applyBtn: {
    height: 50, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  applyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  applyBadge: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  applyBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff' },
});
