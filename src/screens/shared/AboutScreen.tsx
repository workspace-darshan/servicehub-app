import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const VALUES = [
  { icon: 'shield-checkmark-outline', title: 'Trust & Transparency', desc: 'Verified professionals and honest service standards.' },
  { icon: 'people-outline', title: 'Community First', desc: 'Building local economies and connecting neighborhoods.' },
  { icon: 'star-outline', title: 'Quality Assured', desc: 'Rating-based system ensuring service excellence.' },
  { icon: 'leaf-outline', title: 'Sustainability', desc: 'Reducing service waste through smarter connections.' },
];

const SERVICE_AREAS = ['Palanpur', 'Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Gandhinagar', 'Mehsana', 'Junagadh'];

export const AboutScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        {/* Hero */}
        <LinearGradient colors={['#1D4ED8', '#0F172A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.logoCircle}>
            <Ionicons name="flash" size={30} color={Colors.primary} />
          </View>
          <Text style={styles.heroTitle}>ServiceHub</Text>
          <Text style={styles.heroTagline}>B2B Service Marketplace · India</Text>
          <Text style={styles.heroSub}>Connecting customers with verified local professionals since 2024</Text>
          <View style={styles.statsRow}>
            {[{ value: '200+', label: 'Providers' }, { value: '1K+', label: 'Enquiries' }, { value: '4.8', label: 'Avg Rating' }].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={styles.statDiv} />}
                <View style={styles.stat}>
                  <Text style={styles.statVal}>{s.value}</Text>
                  <Text style={styles.statLab}>{s.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.content}>
          {/* Mission */}
          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Ionicons name="rocket-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Our Mission</Text>
            <Text style={styles.sectionBody}>
              ServiceHub connects urban Indian households and businesses with verified, skilled home service professionals — making quality services accessible, affordable, and dependable across Gujarat and beyond.
            </Text>
          </View>

          {/* Values */}
          <Text style={styles.heading}>Our Values</Text>
          <View style={styles.valuesGrid}>
            {VALUES.map(v => (
              <View key={v.title} style={styles.valueCard}>
                <View style={styles.valueIcon}>
                  <Ionicons name={v.icon as any} size={22} color={Colors.primary} />
                </View>
                <Text style={styles.valueTitle}>{v.title}</Text>
                <Text style={styles.valueDesc}>{v.desc}</Text>
              </View>
            ))}
          </View>

          {/* Service Areas */}
          <Text style={styles.heading}>Service Areas</Text>
          <View style={styles.areasWrap}>
            {SERVICE_AREAS.map(area => (
              <View key={area} style={styles.areaChip}>
                <Ionicons name="location-outline" size={12} color={Colors.primary} />
                <Text style={styles.areaText}>{area}</Text>
              </View>
            ))}
          </View>

          {/* Contact info */}
          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Ionicons name="call-outline" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            {[
              { icon: 'globe-outline', value: 'staging-hub.vercel.app' },
              { icon: 'mail-outline', value: 'hello@servicehub.in' },
              { icon: 'call-outline', value: '(+91) 0192-181272' },
              { icon: 'location-outline', value: 'Palanpur, Gujarat 385001' },
            ].map(item => (
              <View key={item.value} style={styles.contactRow}>
                <Ionicons name={item.icon as any} size={15} color={Colors.primary} />
                <Text style={styles.contactText}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { paddingBottom: 32 },
  backBtn: { paddingHorizontal: 20, paddingTop: 52, paddingBottom: 16, width: 62 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.white, textAlign: 'center' },
  heroTagline: { fontSize: FontSize.sm, color: Colors.blue200, textAlign: 'center', marginTop: 4, fontWeight: FontWeight.semibold },
  heroSub: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 8, paddingHorizontal: 32, lineHeight: 22 },
  statsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20, backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20, borderRadius: 14, paddingVertical: 14,
  },
  stat: { flex: 1, alignItems: 'center', gap: 4 },
  statVal: { fontSize: FontSize.xxl, fontWeight: FontWeight.extrabold, color: Colors.white },
  statLab: { fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 },
  statDiv: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.15)' },
  content: { padding: 20, gap: 28 },
  section: { backgroundColor: Colors.white, borderRadius: 16, padding: 18, ...Shadows.card },
  sectionIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 8 },
  sectionBody: { fontSize: FontSize.base, color: Colors.slate500, lineHeight: 22 },
  heading: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  valuesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  valueCard: { width: '47%', backgroundColor: Colors.white, borderRadius: 16, padding: 16, ...Shadows.card },
  valueIcon: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  valueTitle: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  valueDesc: { fontSize: FontSize.xs, color: Colors.slate500, marginTop: 4, lineHeight: 16 },
  areasWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  areaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.white,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.border, ...Shadows.card,
  },
  areaText: { fontSize: FontSize.sm, color: Colors.darkNavy, fontWeight: FontWeight.medium },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  contactText: { fontSize: FontSize.base, color: Colors.darkNavy },
});
