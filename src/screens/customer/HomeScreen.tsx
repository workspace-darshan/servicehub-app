import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { SERVICES } from '../../data/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 36; // 18px margin on each side

const CATEGORIES = ['All', 'Plumber', 'Electrician', 'Cleaning'];

const PROMOTIONAL_BANNERS = [
  {
    id: 1,
    colors: ['#FF5500', '#FF9A3C'],
    tag: 'WEEKEND OFFER',
    title: '50% Cashback',
    subtitle: 'On all services booked this weekend',
  },
  {
    id: 2,
    colors: ['#EC4899', '#F472B6'],
    tag: 'NEW USER',
    title: 'First Booking Free',
    subtitle: 'Get your first service absolutely free',
  },
  {
    id: 3,
    colors: ['#8B5CF6', '#A78BFA'],
    tag: 'SPECIAL DEAL',
    title: 'Refer & Earn ₹500',
    subtitle: 'Invite friends and get rewards',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    num: '1',
    title: 'Create your account',
    desc: 'Sign up in 30 seconds — name, phone & location.',
    icon: 'person-add-outline',
    color: '#FF6B00',
    bgColor: '#FFF0E6',
  },
  {
    num: '2',
    title: 'Find the right service',
    desc: 'Browse verified pros, filter by rating & slot.',
    icon: 'search-outline',
    color: '#9333EA',
    bgColor: '#F3E8FF',
  },
  {
    num: '3',
    title: 'Send your enquiry',
    desc: 'Describe issue, pick a time, get confirmed fast.',
    icon: 'paper-plane-outline',
    color: '#0284C7',
    bgColor: '#E0F2FE',
  },
  {
    num: '4',
    title: 'Job done!',
    desc: 'Rate your pro & track bookings in one place.',
    icon: 'checkmark-circle-outline',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    isDone: true,
  },
];

const WHY_CHOOSE = [
  { icon: 'shield-checkmark-outline', title: 'Verified Pros', desc: 'Background-checked professionals', color: '#7C3AED', bg: '#EDE9FE' },
  { icon: 'star-outline', title: 'Top Rated', desc: 'Rated by real customers', color: '#CA8A04', bg: '#FEF9C3' },
  { icon: 'chatbubble-ellipses-outline', title: 'Responsive', desc: 'Quick reply guarantee', color: '#16A34A', bg: '#DCFCE7' },
  { icon: 'flash-outline', title: 'Fast', desc: 'Same-day availability', color: '#E11D48', bg: '#FFE4E6' },
];

const SERVICE_COLORS = [
  { bg: '#EDE9FE', icon: '#7C3AED' },
  { bg: '#FEF9C3', icon: '#CA8A04' },
  { bg: '#DCFCE7', icon: '#16A34A' },
  { bg: '#FFE4E6', icon: '#E11D48' },
  { bg: '#E0F2FE', icon: '#0284C7' },
  { bg: '#FEF3C7', icon: '#D97706' },
  { bg: '#F3E8FF', icon: '#9333EA' },
  { bg: '#F0FDF4', icon: '#15803D' },
];

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

export const HomeScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerScrollRef = useRef<ScrollView>(null);

  // Auto-scroll banners every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % PROMOTIONAL_BANNERS.length;
        bannerScrollRef.current?.scrollTo({
          x: nextIndex * SCREEN_WIDTH,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual scroll
  const handleBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setCurrentBannerIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Sticky Header with Blur */}
      <BlurView intensity={80} tint="light" style={styles.header}>
        {/* Top Row */}
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning, Darshan 👋</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color="#FF6B00" />
              <Text style={styles.locationText}>Palanpur, Gujarat · </Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.notifBtn}
              onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={18} color="#0D0D0D" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.avatarText}>DP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Row */}
        <View style={styles.searchRow}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.8}>
            <Ionicons name="search-outline" size={15} color="#bbb" />
            <Text style={styles.searchPlaceholder}>Search services or providers...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Category Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCategory === cat && styles.chipActive]}
              onPress={() => setSelectedCategory(cat)}>
              <Text style={[styles.chipText, selectedCategory === cat && styles.chipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BlurView>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        {/* Promotional Banner Slider */}
        <View style={styles.bannerContainer}>
          <ScrollView
            ref={bannerScrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={SCREEN_WIDTH}
            snapToAlignment="start">
            {PROMOTIONAL_BANNERS.map((banner) => (
              <View key={banner.id} style={styles.bannerSlide}>
                <LinearGradient
                  colors={banner.colors as [string, string, ...string[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.banner}>
                  <View style={styles.bannerCircle1} />
                  <View style={styles.bannerCircle2} />
                  <View style={styles.bannerTag}>
                    <Text style={styles.bannerTagText}>{banner.tag}</Text>
                  </View>
                  <Text style={styles.bannerTitle}>{banner.title}</Text>
                  <Text style={styles.bannerSub}>{banner.subtitle}</Text>
                  <TouchableOpacity style={styles.bannerCta}>
                    <Text style={styles.bannerCtaText}>Book now</Text>
                    <Ionicons name="arrow-forward" size={12} color="#FF6B00" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View style={styles.dotsContainer}>
            {PROMOTIONAL_BANNERS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentBannerIndex === index && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllServices')}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.serviceGrid}>
            {SERVICES.slice(0, 8).map((service, index) => {
              const colorSet = SERVICE_COLORS[index % SERVICE_COLORS.length];
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate('Providers', { service: service.name })}
                  activeOpacity={0.7}>
                  <View style={[styles.serviceBox, { backgroundColor: colorSet.bg }]}>
                    <Ionicons
                      name={(SERVICE_ICON_MAP[service.name] || 'construct-outline') as any}
                      size={24}
                      color={colorSet.icon}
                    />
                  </View>
                  <Text style={styles.serviceLabel}>{service.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>How it works</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3 easy steps</Text>
            </View>
          </View>
          <View style={styles.hiwWrap}>
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <View key={step.num} style={styles.hiwStep}>
                <View style={styles.hiwLeft}>
                  <View style={[styles.hiwNum, { backgroundColor: step.color }]}>
                    <Text style={styles.hiwNumText}>{step.num}</Text>
                  </View>
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <LinearGradient
                      colors={[step.color, HOW_IT_WORKS_STEPS[index + 1].color]}
                      style={styles.hiwLine}
                    />
                  )}
                </View>
                <View style={[
                  styles.hiwCard,
                  step.isDone && { backgroundColor: '#F0FDF4', borderColor: '#DCFCE7' }
                ]}>
                  <View style={[styles.hiwIconWrap, { backgroundColor: step.bgColor }]}>
                    <Ionicons name={step.icon as any} size={20} color={step.color} />
                  </View>
                  <Text style={[styles.hiwCardTitle, step.isDone && { color: '#15803D' }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.hiwCardSub, step.isDone && { color: '#1ca14dff' }]}>
                    {step.desc}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Why choose us</Text>
          </View>
          <View style={styles.whyGrid}>
            {WHY_CHOOSE.map((item) => (
              <View key={item.title} style={styles.whyCard}>
                <View style={[styles.whyIcon, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <Text style={styles.whyTitle}>{item.title}</Text>
                <Text style={styles.whySub}>{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Provider Banner */}
        <View style={styles.proBanner}>
          <View style={styles.proIcon}>
            <Ionicons name="lock-closed-outline" size={20} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.proTitle}>Are you a professional?</Text>
            <Text style={styles.proSub}>Grow your business with Sevek</Text>
          </View>
          <TouchableOpacity
            style={styles.proBtn}
            onPress={() => navigation.navigate('BecomeProvider')}>
            <Text style={styles.proBtnText}>Join now →</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4F0',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F4F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  locationText: {
    fontSize: 12,
    color: '#888',
  },
  changeText: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  notifBtn: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ECECEC',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 7,
    width: 7,
    height: 7,
    backgroundColor: '#FF6B00',
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#F5F4F0',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#FF6B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: '#bbb',
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#0D0D0D',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 10,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECECEC',
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#0D0D0D',
    borderColor: '#0D0D0D',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  chipTextActive: {
    color: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerContainer: {
    marginTop: 14,
    position: 'relative',
  },
  bannerSlide: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 18,
  },
  banner: {
    borderRadius: 24,
    padding: 20,
    paddingHorizontal: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerCircle1: {
    position: 'absolute',
    right: -22,
    top: -22,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bannerCircle2: {
    position: 'absolute',
    right: 44,
    bottom: -38,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  bannerTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 8,
  },
  bannerTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: '#fff',
  },
  bannerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  bannerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.82)',
    marginTop: 5,
  },
  bannerCta: {
    marginTop: 14,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerCtaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B00',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D1D1D1',
  },
  dotActive: {
    width: 20,
    backgroundColor: '#FF6B00',
  },
  section: {
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.3,
  },
  viewAll: {
    fontSize: 12,
    color: '#FF6B00',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#FFF0E6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF6B00',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceItem: {
    width: '22%',
    alignItems: 'center',
    gap: 6,
  },
  serviceBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceLabel: {
    fontSize: 10,
    color: '#555',
    textAlign: 'center',
    lineHeight: 13,
    fontWeight: '500',
  },
  hiwWrap: {
    flexDirection: 'column',
    gap: 0,
  },
  hiwStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingBottom: 20,
  },
  hiwLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 32,
  },
  hiwNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiwNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  hiwLine: {
    width: 2,
    flex: 1,
    minHeight: 30,
    marginTop: 4,
    borderRadius: 2,
  },
  hiwCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 13,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  hiwIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: -30,
    marginTop: -5,
  },
  hiwCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D0D0D',
    marginBottom: 4,
  },
  hiwCardSub: {
    fontSize: 11,
    color: '#888',
    lineHeight: 16,
  },
  whyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  whyCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  whyIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  whyTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  whySub: {
    fontSize: 10,
    color: '#999',
    marginTop: 3,
    lineHeight: 14,
  },
  proBanner: {
    marginHorizontal: 18,
    marginTop: 22,
    backgroundColor: '#0D0D0D',
    borderRadius: 22,
    padding: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FF6B00',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  proSub: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  proBtn: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  proBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
});
