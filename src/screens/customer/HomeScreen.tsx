import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SectionHeader } from '../../components/ui';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { SERVICES } from '../../data/mockData';

const WHY_CHOOSE = [
  { icon: 'shield-checkmark-outline', title: 'Verified Pros', desc: 'Background-checked professionals' },
  { icon: 'star-outline', title: 'Top Rated', desc: 'Rated by real customers' },
  { icon: 'chatbubble-ellipses-outline', title: 'Responsive', desc: 'Quick reply guarantee' },
  { icon: 'flash-outline', title: 'Fast', desc: 'Same-day availability' },
];

const HOW_IT_WORKS = [
  { step: '1', label: 'Sign Up', icon: 'person-add-outline', desc: 'Create your free account', color: '#3B82F6' },
  { step: '2', label: 'Search', icon: 'search-outline', desc: 'Find the right service', color: '#8B5CF6' },
  { step: '3', label: 'Enquire', icon: 'paper-plane-outline', desc: 'Send your request', color: '#EC4899' },
  { step: '4', label: 'Rate', icon: 'star-outline', desc: 'Share your experience', color: '#F59E0B' },
];

const SERVICE_TAGS = ['Plumber', 'Electrician', 'Cleaning', 'AC Repair', 'Painting', 'Carpenter'];

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Good morning, Darshan 👋</Text>
          <TouchableOpacity style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.slate500} />
            <Text style={styles.city}>Palanpur, Gujarat</Text>
            <Text style={styles.changeCity}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={22} color={Colors.darkNavy} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.avatarText}>DP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.8}>
          <Ionicons name="search-outline" size={18} color={Colors.slate400} />
          <Text style={styles.searchPlaceholder}>Search services or providers...</Text>
          <View style={styles.filterBtn}>
            <Ionicons name="options-outline" size={16} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Popular tags */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          style={styles.tagsScroll}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingRight: 20 }}>
          {SERVICE_TAGS.map(tag => (
            <TouchableOpacity
              key={tag}
              style={styles.tag}
              onPress={() => navigation.navigate('Providers', { service: tag })}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>

          {/* Our Services */}
          <SectionHeader title="Our Services" onViewAll={() => navigation.navigate('AllServices')} />
          <View style={styles.serviceGrid}>
            {SERVICES.slice(0, 6).map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate('Providers', { service: service.name })}
                activeOpacity={0.85}>
                <View style={styles.serviceIconBg}>
                  <Ionicons name={serviceIcon(service.name)} size={26} color={Colors.primary} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceTagline}>{service.tagline}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* How It Works */}
          <SectionHeader title="How It Works" />
          <View style={styles.howItWorksContainer}>
            {HOW_IT_WORKS.map((step, index) => (
              <React.Fragment key={step.step}>
                <TouchableOpacity style={styles.howCard} activeOpacity={0.85}>
                  <LinearGradient
                    colors={[step.color, step.color + 'DD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.howStepBadge}>
                    <Text style={styles.howStepNum}>{step.step}</Text>
                  </LinearGradient>
                  <View style={[styles.howIconBg, { backgroundColor: step.color + '15' }]}>
                    <Ionicons name={step.icon as any} size={28} color={step.color} />
                  </View>
                  <Text style={styles.howLabel}>{step.label}</Text>
                  <Text style={styles.howDesc}>{step.desc}</Text>
                </TouchableOpacity>
                {index < HOW_IT_WORKS.length - 1 && (
                  <View style={styles.howConnector}>
                    <Ionicons name="chevron-forward" size={16} color={Colors.slate300} />
                  </View>
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Why Choose Us */}
          <View style={{ marginTop: 24 }}>
            <SectionHeader title="Why Choose Us" />
            <View style={styles.whyGrid}>
              {WHY_CHOOSE.map(item => (
                <View key={item.title} style={styles.whyCard}>
                  <View style={styles.whyIconBg}>
                    <Ionicons name={item.icon as any} size={22} color={Colors.primary} />
                  </View>
                  <Text style={styles.whyTitle}>{item.title}</Text>
                  <Text style={styles.whyDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Provider banner */}
          <LinearGradient
            colors={['#1D4ED8', '#0F172A']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.providerBanner}>
            <View style={styles.bannerLeft}>
              <Ionicons name="construct-outline" size={28} color="rgba(255,255,255,0.8)" />
              <View>
                <Text style={styles.bannerTitle}>Are You a Professional?</Text>
                <Text style={styles.bannerSub}>Grow your business with ServiceHub</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bannerBtn}
              onPress={() => navigation.navigate('BecomeProvider')}>
              <Text style={styles.bannerBtnText}>Join Now</Text>
              <Ionicons name="arrow-forward" size={15} color={Colors.primary} />
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </ScrollView>
    </View>
  );
};

// Map service name to an Ionicons icon name
function serviceIcon(name: string): any {
  const map: Record<string, string> = {
    Plumbing: 'water-outline',
    Electrical: 'flash-outline',
    Cleaning: 'sparkles-outline',
    Carpentry: 'hammer-outline',
    Painting: 'color-palette-outline',
    'AC Repair': 'thermometer-outline',
    'Refrigerator Repair': 'snow-outline',
    'Washing Machine': 'refresh-outline',
    'TV Repair': 'tv-outline',
    'CCTV Installation': 'videocam-outline',
    'Inverter Repair': 'battery-charging-outline',
    'RO/Water Purifier': 'water-outline',
    'Geyser Repair': 'flame-outline',
    'Bathroom Cleaning': 'water-outline',
    'Kitchen Cleaning': 'restaurant-outline',
    'Sofa Cleaning': 'bed-outline',
    'Pest Control': 'bug-outline',
    'Laptop Repair': 'laptop-outline',
    'Mobile Repair': 'phone-portrait-outline',
    Locksmith: 'key-outline',
  };
  return (map[name] || 'construct-outline') as any;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 12,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  greeting: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  city: { fontSize: FontSize.sm, color: Colors.slate500 },
  changeCity: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semibold, marginLeft: 4 },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { position: 'relative', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  notifDot: {
    position: 'absolute', top: 8, right: 8, width: 8, height: 8,
    borderRadius: 4, backgroundColor: Colors.errorRed, borderWidth: 1.5, borderColor: Colors.white,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.blue50,
    borderWidth: 2, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: FontWeight.bold, color: Colors.primary },
  scroll: { paddingBottom: 100 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    height: 50, backgroundColor: Colors.white,
    marginHorizontal: 20, marginVertical: 14,
    borderRadius: BorderRadius.full, paddingHorizontal: 16,
    borderWidth: 1.5, borderColor: Colors.border, ...Shadows.card,
  },
  searchPlaceholder: { flex: 1, fontSize: FontSize.base, color: Colors.slate400 },
  filterBtn: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
  },
  tagsScroll: { marginBottom: 16 },
  tag: {
    paddingHorizontal: 14, paddingVertical: 7, backgroundColor: Colors.white,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.border,
  },
  tagText: { fontSize: FontSize.sm, color: Colors.lightNavy, fontWeight: FontWeight.medium },
  content: { paddingHorizontal: 20 },
  serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  serviceCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 16,
    padding: 16, ...Shadows.card,
  },
  serviceIconBg: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  serviceName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  serviceTagline: { fontSize: FontSize.xs, color: Colors.slate500, marginTop: 3, lineHeight: 16 },
  howItWorksContainer: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 28,
    paddingHorizontal: 4,
  },
  howCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 16, padding: 14,
    alignItems: 'center', gap: 8, ...Shadows.card, minHeight: 160,
  },
  howConnector: {
    width: 20, alignItems: 'center', justifyContent: 'center',
    marginHorizontal: -4,
  },
  howStepBadge: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.card,
  },
  howStepNum: { fontSize: FontSize.base, fontWeight: FontWeight.extrabold, color: Colors.white },
  howIconBg: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  howLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.darkNavy, textAlign: 'center' },
  howDesc: { fontSize: 10, color: Colors.slate500, textAlign: 'center', lineHeight: 14 },
  whyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  whyCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 16, padding: 16, ...Shadows.card,
  },
  whyIconBg: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  whyTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  whyDesc: { fontSize: FontSize.xs, color: Colors.slate500, marginTop: 3, lineHeight: 16 },
  providerBanner: {
    borderRadius: 18, padding: 20, marginBottom: 24,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  bannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  bannerTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.white },
  bannerSub: { fontSize: FontSize.xs, color: 'rgba(255,255,255,0.6)', marginTop: 3 },
  bannerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 14, paddingVertical: 9,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md,
  },
  bannerBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.primary },
});
