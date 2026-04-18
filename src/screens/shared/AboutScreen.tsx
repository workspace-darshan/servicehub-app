import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';

const VALUES = [
  { icon: 'shield-checkmark-outline', title: 'Trust & Transparency', desc: 'Verified professionals and honest service standards.' },
  { icon: 'people-outline', title: 'Community First', desc: 'Building local economies and connecting neighborhoods.' },
  { icon: 'star-outline', title: 'Quality Assured', desc: 'Rating-based system ensuring service excellence.' },
  { icon: 'leaf-outline', title: 'Sustainability', desc: 'Reducing service waste through smarter connections.' },
];

const SERVICE_AREAS = ['Palanpur', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Gandhinagar', 'Mehsana', 'Junagadh'];

const STATS = [
  { value: '200+', label: 'Providers', icon: 'people-outline' },
  { value: '1K+', label: 'Enquiries', icon: 'paper-plane-outline' },
  { value: '4.8', label: 'Avg Rating', icon: 'star-outline' },
];

const CONTACT_INFO = [
  { icon: 'globe-outline', value: 'staging-hub.vercel.app' },
  { icon: 'mail-outline', value: 'hello@sevek.in' },
  { icon: 'call-outline', value: '(+91) 0192-181272' },
  { icon: 'location-outline', value: 'Palanpur, Gujarat 385001' },
];

export const AboutScreen = ({ navigation }: any) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height }]}>
      <StatusBar style="dark" />
      <TopBar title="About Sevek" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        bounces={true}
      >
        {/* Brand Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.logoCircle}>
            <Ionicons name="flash" size={26} color="#FF6B00" />
          </View>
          <Text style={styles.brandName}>Sevek</Text>
          <Text style={styles.brandTagline}>B2B Service Marketplace · India</Text>
          <Text style={styles.brandSub}>
            Connecting customers with verified local professionals since 2024
          </Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Mission */}
        <Text style={styles.sectionHeading}>Our Mission</Text>
        <View style={styles.card}>
          <View style={styles.cardIconRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="rocket-outline" size={17} color="#FF6B00" />
            </View>
            <Text style={styles.cardTitle}>Why We Exist</Text>
          </View>
          <Text style={styles.cardBody}>
            Sevek connects urban Indian households and businesses with verified, skilled home service
            professionals — making quality services accessible, affordable, and dependable across
            Gujarat and beyond.
          </Text>
        </View>

        {/* Values */}
        <Text style={styles.sectionHeading}>Our Values</Text>
        <View style={styles.valuesGrid}>
          {VALUES.map(v => (
            <View key={v.title} style={styles.valueCard}>
              <View style={styles.iconCircle}>
                <Ionicons name={v.icon as any} size={17} color="#FF6B00" />
              </View>
              <Text style={styles.valueTitle}>{v.title}</Text>
              <Text style={styles.valueDesc}>{v.desc}</Text>
            </View>
          ))}
        </View>

        {/* Service Areas */}
        <Text style={styles.sectionHeading}>Service Areas</Text>
        <View style={styles.areasWrap}>
          {SERVICE_AREAS.map(area => (
            <View key={area} style={styles.areaChip}>
              <Ionicons name="location-outline" size={12} color="#FF6B00" />
              <Text style={styles.areaText}>{area}</Text>
            </View>
          ))}
        </View>

        {/* Get in Touch */}
        <Text style={styles.sectionHeading}>Get in Touch</Text>
        <View style={styles.card}>
          {CONTACT_INFO.map((item, i) => (
            <View
              key={item.value}
              style={[styles.contactRow, i === CONTACT_INFO.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon as any} size={14} color="#FF6B00" />
              </View>
              <Text style={styles.contactText}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Version badge */}
        <Text style={styles.version}>Sevek v1.0.0 · Made in India 🇮🇳</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#F5F4F0', overflow: 'hidden' },
  scrollView: { flex: 1 },
  scroll: { padding: 18, gap: 10 },

  sectionHeading: {
    fontSize: 17, fontWeight: '700', color: '#0D0D0D',
    marginBottom: 4, marginTop: 4, letterSpacing: -0.3,
  },

  // Hero card
  heroCard: {
    backgroundColor: '#FFFFFF', borderRadius: 18,
    borderWidth: 1, borderColor: '#ECECEC',
    alignItems: 'center', padding: 22, marginBottom: 4,
  },
  logoCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#FFF4ED', borderWidth: 2, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  brandName: { fontSize: 24, fontWeight: '800', color: '#0D0D0D', letterSpacing: -0.5 },
  brandTagline: { fontSize: 12, color: '#FF6B00', fontWeight: '600', marginTop: 3 },
  brandSub: {
    fontSize: 12, color: '#888', textAlign: 'center',
    marginTop: 8, lineHeight: 18, paddingHorizontal: 12,
  },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 18, width: '100%',
    backgroundColor: '#F5F4F0', borderRadius: 14, paddingVertical: 14,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0D0D0D', letterSpacing: -0.5 },
  statLabel: { fontSize: 10, color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 26, backgroundColor: '#ECECEC' },

  // Shared card
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 14,
    borderWidth: 1, borderColor: '#ECECEC', padding: 14,
  },
  cardIconRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#0D0D0D' },
  cardBody: { fontSize: 13, color: '#666', lineHeight: 20 },

  // Icon circle (shared)
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },

  // Values grid
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  valueCard: {
    width: '47.5%', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#ECECEC', gap: 8,
  },
  valueTitle: { fontSize: 12, fontWeight: '700', color: '#0D0D0D' },
  valueDesc: { fontSize: 11, color: '#888', lineHeight: 15 },

  // Service areas
  areasWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  areaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7,
    backgroundColor: '#FFFFFF', borderRadius: 99,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  areaText: { fontSize: 12, color: '#0D0D0D', fontWeight: '500' },

  // Contact rows
  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  contactText: { fontSize: 13, color: '#0D0D0D', fontWeight: '500', flex: 1 },

  // Footer
  version: {
    fontSize: 11, color: '#BBBBBB', textAlign: 'center',
    marginTop: 8, letterSpacing: 0.3,
  },
});
