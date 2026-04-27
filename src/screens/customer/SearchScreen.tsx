import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
  Dimensions, Modal, Animated, PanResponder,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SERVICES, PROVIDERS } from '../../data/mockData';

const { height } = Dimensions.get('window');

const SHEET_HEIGHT = height * 0.75;
const SHEET_EXPANDED_HEIGHT = height * 0.95;

const screenWidth = Dimensions.get('window').width;
const numColumns = 5;
const horizontalPadding = 36;
const gap = 10;
const totalGaps = gap * (numColumns - 1);
const availableWidth = screenWidth - horizontalPadding - totalGaps;
const itemWidth = Math.floor(availableWidth / numColumns);

const CITIES = ['All Cities', 'Palanpur', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara'];
const MIN_RATINGS = [0, 4.0, 4.5, 4.8];
const EXP_OPTIONS = [0, 2, 5, 10];

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

const MAX_RECENT = 8;

const DEFAULT_RECENT: string[] = [];

const TRENDING = ['Pest Control', 'Carpentry', 'Painting', 'CCTV Installation', 'Geyser Repair'];

const getIcon = (name: string) => SERVICE_ICON_MAP[name] || 'construct-outline';
const getColorSet = (index: number) => SERVICE_COLORS[index % SERVICE_COLORS.length];

export const SearchScreen = ({ navigation, route }: any) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showAllServices, setShowAllServices] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(DEFAULT_RECENT);
  const [isFocused, setIsFocused] = useState(false);

  // Filter state
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minExp, setMinExp] = useState(0);
  const [draftCity, setDraftCity] = useState('All Cities');
  const [draftVerified, setDraftVerified] = useState(false);
  const [draftRating, setDraftRating] = useState(0);
  const [draftExp, setDraftExp] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const searchRef = useRef<any>(null);
  const insets = useSafeAreaInsets();

  const activeCount = [
    selectedCity !== 'All Cities', verifiedOnly, minRating > 0, minExp > 0,
  ].filter(Boolean).length;

  const [isExpanded, setIsExpanded] = useState(false);
  const sheetHeight = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  const openSheet = () => {
    setDraftCity(selectedCity); setDraftVerified(verifiedOnly);
    setDraftRating(minRating); setDraftExp(minExp);
    setSheetOpen(true);
    setIsExpanded(false);
    Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 65, friction: 11 }).start();
    sheetHeight.setValue(SHEET_HEIGHT);
  };

  const closeSheet = () => {
    Animated.timing(translateY, { toValue: SHEET_HEIGHT, duration: 280, useNativeDriver: true })
      .start(() => {
        setSheetOpen(false);
        setIsExpanded(false);
        sheetHeight.setValue(SHEET_HEIGHT);
      });
  };

  const expandSheet = () => {
    setIsExpanded(true);
    Animated.spring(sheetHeight, { 
      toValue: SHEET_EXPANDED_HEIGHT, 
      useNativeDriver: false,
      tension: 65,
      friction: 11
    }).start();
  };

  const collapseSheet = () => {
    setIsExpanded(false);
    Animated.spring(sheetHeight, { 
      toValue: SHEET_HEIGHT, 
      useNativeDriver: false, 
      tension: 65, 
      friction: 11 
    }).start();
  };

  const applyFilters = () => {
    setSelectedCity(draftCity); setVerifiedOnly(draftVerified);
    setMinRating(draftRating); setMinExp(draftExp);
    closeSheet();
  };

  const resetFilters = () => {
    setDraftCity('All Cities'); setDraftVerified(false);
    setDraftRating(0); setDraftExp(0);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        if (isExpanded) {
          // When expanded, only allow dragging down to collapse
          if (g.dy > 0) {
            const newHeight = SHEET_EXPANDED_HEIGHT - g.dy;
            if (newHeight >= SHEET_HEIGHT) {
              sheetHeight.setValue(newHeight);
            }
          }
        } else {
          // When collapsed, allow dragging up to expand or down to close
          if (g.dy < 0) {
            // Dragging up to expand
            const newHeight = SHEET_HEIGHT + Math.abs(g.dy);
            if (newHeight <= SHEET_EXPANDED_HEIGHT) {
              sheetHeight.setValue(newHeight);
            }
          } else if (g.dy > 0) {
            // Dragging down to close
            translateY.setValue(g.dy);
          }
        }
      },
      onPanResponderRelease: (_, g) => {
        if (isExpanded) {
          // When expanded, check if dragging down enough to collapse
          if (g.dy > 100) {
            collapseSheet();
          } else {
            // Snap back to expanded
            Animated.spring(sheetHeight, { 
              toValue: SHEET_EXPANDED_HEIGHT, 
              useNativeDriver: false 
            }).start();
          }
        } else {
          // When collapsed
          if (g.dy < -100) {
            // Dragged up enough to expand
            expandSheet();
          } else if (g.dy > 80) {
            // Dragged down enough to close
            closeSheet();
          } else if (g.dy < 0) {
            // Snap back to collapsed height
            Animated.spring(sheetHeight, { 
              toValue: SHEET_HEIGHT, 
              useNativeDriver: false 
            }).start();
          } else {
            // Snap back to collapsed position
            Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
          }
        }
      },
    })
  ).current;

  useEffect(() => {
    if (route?.params?.focus) {
      setTimeout(() => searchRef.current?.focus(), 150);
    }
    if (route?.params?.service) {
      setSearch(route.params.service);
      addRecent(route.params.service);
    }
    if (route?.params?.showAllServices) {
      setShowAllServices(true);
    }
  }, [route?.params?.focus, route?.params?.service, route?.params?.showAllServices]);

  const addRecent = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(r => r.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, MAX_RECENT);
    });
  };

  const removeRecent = (term: string) => {
    setRecentSearches(prev => prev.filter(r => r !== term));
    // Keep the input focused to prevent panel from closing
    setTimeout(() => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    }, 50);
  };

  const handleSubmit = () => {
    if (search.trim()) {
      addRecent(search.trim());
      searchRef.current?.blur();
    }
  };

  const applySearch = (term: string) => {
    setSearch(term);
    addRecent(term);
    setIsFocused(false);
    searchRef.current?.blur();
  };

  const showRecentPanel = isFocused && search.length === 0;

  // Filter providers based on search text + active filters + selected service
  const filteredProviders = PROVIDERS.filter(p => {
    const matchSearch = search.length === 0
      || p.name.toLowerCase().includes(search.toLowerCase())
      || p.service.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === 'All Cities' || p.city === selectedCity;
    const matchVerified = !verifiedOnly || p.verified;
    const matchRating = p.rating >= minRating;
    const matchExp = p.experience >= minExp;
    return matchSearch && matchCity && matchVerified && matchRating && matchExp;
  });

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

        {/* Search bar */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={16} color="#888" />
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            placeholder="Search services or providers..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
            onSubmitEditing={handleSubmit}
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

        {/* Filter button */}
        <TouchableOpacity
          style={[styles.filterBtn, activeCount > 0 && styles.filterBtnActive]}
          onPress={openSheet}
          activeOpacity={0.8}>
          <Ionicons name="options-outline" size={18} color={activeCount > 0 ? '#fff' : '#FF6B00'} />
          {activeCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Recent searches panel — shown when focused + empty */}
      {showRecentPanel && (
        <View 
          style={styles.recentPanel}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => false}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentLabel}>Recent</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity 
                onPressIn={(e) => {
                  e.stopPropagation();
                  setRecentSearches([]);
                  // Keep the input focused to prevent panel from closing
                  setTimeout(() => {
                    if (searchRef.current) {
                      searchRef.current.focus();
                    }
                  }, 50);
                }}
                activeOpacity={0.7}>
                <Text style={styles.clearAll}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>
          {recentSearches.length > 0 ? (
            <>
              {recentSearches.map(term => (
                <View key={term} style={styles.recentRow}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}
                    onPressIn={(e) => {
                      e.stopPropagation();
                      applySearch(term);
                    }}
                    activeOpacity={0.7}>
                    <Ionicons name="time-outline" size={15} color="#AAAAAA" />
                    <Text style={styles.recentTerm}>{term}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPressIn={(e) => {
                      e.stopPropagation();
                      removeRecent(term);
                    }}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="close" size={14} color="#CCCCCC" />
                  </TouchableOpacity>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.noRecentText}>No recent searches</Text>
          )}

          {/* Trending */}
          <View style={[styles.recentHeader, { marginTop: 12 }]}>
            <Text style={styles.recentLabel}>Trending</Text>
          </View>
          <View style={styles.trendingWrap}>
            {TRENDING.map(term => (
              <TouchableOpacity
                key={term}
                style={styles.trendingChip}
                onPressIn={(e) => {
                  e.stopPropagation();
                  applySearch(term);
                }}
                activeOpacity={0.7}>
                <Ionicons name="trending-up-outline" size={12} color="#FF6B00" />
                <Text style={styles.trendingText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {/* Category chips + Services — only when no search active */}
        {search.length === 0 && (
          <>
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
              {rows.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.serviceRow}>
                  {row.map((item, index) => {
                    const colorSet = getColorSet(rowIndex * numColumns + index);
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.serviceCard, { width: itemWidth }]}
                        onPress={() => {
                          setSearch(item.name);
                          addRecent(item.name);
                        }}
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
            </View>
          </>
        )}

        {/* Providers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {search.length > 0 ? `Providers for "${search}"` : 'All Providers'}
            </Text>
            <Text style={styles.providerCount}>{filteredProviders.length} found</Text>
          </View>

          {filteredProviders.length > 0 ? filteredProviders.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.providerCard}
              onPress={() => navigation.navigate('ProviderProfile', { provider: item })}
              activeOpacity={0.85}>
              <View style={styles.providerAvatar}>
                <Text style={styles.providerInitials}>{item.initials}</Text>
              </View>
              <View style={styles.providerInfo}>
                <View style={styles.providerNameRow}>
                  <Text style={styles.providerName}>{item.name}</Text>
                  {item.verified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="shield-checkmark" size={10} color="#FF6B00" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.providerService}>{item.service} · {item.city}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={11} color="#FBBF24" />
                  <Text style={styles.providerRating}>{item.rating}</Text>
                  <Text style={styles.providerReviews}>({item.reviews} reviews)</Text>
                  <Text style={styles.expText}>{item.experience} yrs exp</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#CCC" />
            </TouchableOpacity>
          )) : (
            <View style={styles.empty}>
              <Ionicons name="people-outline" size={40} color="#ccc" />
              <Text style={styles.emptyTitle}>No providers found</Text>
              <Text style={styles.emptyBody}>Try a different search or clear filters</Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Filter bottom sheet */}
      <Modal transparent visible={sheetOpen} animationType="none" onRequestClose={closeSheet}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeSheet} />
        <Animated.View style={[styles.sheet, { height: sheetHeight, transform: [{ translateY }] }]}>
          <View {...panResponder.panHandlers} style={styles.dragArea}>
            <View style={styles.handle} />
          </View>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Filter Providers</Text>
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetBody}>
            <Text style={styles.filterLabel}>CITY</Text>
            
            {/* City Search Input */}
            <View style={styles.citySearchRow}>
              <Ionicons name="search-outline" size={16} color="#888" />
              <TextInput
                style={styles.citySearchInput}
                placeholder="Search city..."
                placeholderTextColor="#AAA"
                value={citySearch}
                onChangeText={setCitySearch}
              />
              {citySearch.length > 0 && (
                <TouchableOpacity onPress={() => setCitySearch('')}>
                  <Ionicons name="close-circle" size={16} color="#888" />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.chipWrap}>
              {CITIES.filter(c => 
                c.toLowerCase().includes(citySearch.toLowerCase())
              ).map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.filterChip, draftCity === c && styles.filterChipActive]}
                  onPress={() => setDraftCity(c)}>
                  <Text style={[styles.filterChipText, draftCity === c && styles.filterChipTextActive]}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
  scroll: { paddingTop: 16, paddingBottom: 20 },
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
  },
  viewAllBtn: {
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
  providerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  providerName: { fontSize: 14, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.2 },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#FFF4ED', paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 99, borderWidth: 1, borderColor: '#FFD4B3',
  },
  verifiedText: { fontSize: 9, fontWeight: '700', color: '#FF6B00' },
  providerService: { fontSize: 12, color: '#888', marginBottom: 3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  providerRating: { fontSize: 12, fontWeight: '600', color: '#0D0D0D' },
  providerReviews: { fontSize: 11, color: '#888' },
  expText: { fontSize: 11, color: '#AAAAAA', marginLeft: 4 },
  providerCount: {
    fontSize: 11, color: '#888', fontWeight: '500',
    backgroundColor: '#F5F4F0', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 99, borderWidth: 1, borderColor: '#ECECEC',
  },

  // Recent searches panel
  recentPanel: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 4,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 100,
  },
  recentHeader: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 8,
  },
  recentLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1,
  },
  clearAll: { fontSize: 11, color: '#FF6B00', fontWeight: '600' },
  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: '#F5F4F0',
  },
  recentTerm: { flex: 1, fontSize: 13, color: '#0D0D0D', fontWeight: '500' },
  noRecentText: { 
    fontSize: 13, 
    color: '#999', 
    textAlign: 'center', 
    paddingVertical: 20 
  },
  trendingWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  trendingChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7,
    backgroundColor: '#FFF4ED', borderRadius: 99,
    borderWidth: 1, borderColor: '#FFD4B3',
  },
  trendingText: { fontSize: 12, color: '#FF6B00', fontWeight: '600' },

  // Filter button
  filterBtn: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  filterBtnActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  filterBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center',
  },
  filterBadgeText: { fontSize: 9, fontWeight: '800', color: '#fff' },

  // Bottom sheet
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: height * 0.75, backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden',
  },
  dragArea: { width: '100%', paddingVertical: 12, alignItems: 'center' },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: '#DDDDDD' },
  sheetHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  sheetTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.3 },
  resetText: { fontSize: 13, color: '#FF6B00', fontWeight: '600' },
  sheetBody: { padding: 20, paddingBottom: 12 },
  filterLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
  },
  citySearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F4F0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
    gap: 8,
  },
  citySearchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0D0D0D',
    padding: 0,
    outlineStyle: 'none',
  } as any,
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99,
    borderWidth: 1.5, borderColor: '#ECECEC', backgroundColor: '#F5F4F0',
  },
  filterChipActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  filterChipText: { fontSize: 12, color: '#666', fontWeight: '500' },
  filterChipTextActive: { color: '#FF6B00', fontWeight: '700' },
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
    backgroundColor: '#DDDDDD', justifyContent: 'center', paddingHorizontal: 2,
  },
  toggleSwitchOn: { backgroundColor: '#FF6B00' },
  toggleThumb: {
    width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 2, elevation: 2,
  },
  toggleThumbOn: { alignSelf: 'flex-end' },
  sheetFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  applyBtn: {
    height: 50, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  applyBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  applyBadge: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  applyBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff' },
});
