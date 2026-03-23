import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const TABS = ['About', 'Services', 'Reviews'];

const MOCK_REVIEWS = [
  { id: '1', name: 'Amit Sharma', rating: 5, date: 'Mar 2026', comment: 'Excellent work! Fixed the leak quickly and professionally.' },
  { id: '2', name: 'Priya Mehta', rating: 4, date: 'Feb 2026', comment: 'Good service, arrived on time. Would recommend.' },
  { id: '3', name: 'Vikram Joshi', rating: 5, date: 'Jan 2026', comment: 'Very skilled and trustworthy. My go-to plumber.' },
];

const MOCK_SERVICES = [
  'Pipe Installation & Repair', 'Leak Detection & Fix', 'Bathroom Fitting',
  'Kitchen Plumbing', 'Drainage Cleaning', 'Water Tank Installation',
];

const StarRow = ({ rating }: { rating: number }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1, 2, 3, 4, 5].map(s => (
      <Ionicons key={s} name={s <= rating ? 'star' : 'star-outline'} size={13} color="#FBBF24" />
    ))}
  </View>
);

export const ProviderProfileScreen = ({ navigation, route }: any) => {
  const provider = route?.params?.provider || {
    name: 'Rajesh Kumar', service: 'Plumber',
    city: 'Palanpur', rating: 4.9, reviews: 32, experience: 8, verified: true,
    bio: 'Expert in residential and commercial plumbing. 8+ years of experience across Gujarat. Specializes in pipeline installation, leak repair, and bathroom fittings with guaranteed workmanship.',
  };

  const [activeTab, setActiveTab] = useState('About');
  const initials = provider.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero header */}
      <LinearGradient
        colors={['#1D4ED8', '#0F172A']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          {provider.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={12} color={Colors.primary} />
              <Text style={styles.verifiedText}>Verified Pro</Text>
            </View>
          )}
          <Text style={styles.heroName}>{provider.name}</Text>
          <Text style={styles.heroService}>{provider.service}</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { icon: 'star', value: String(provider.rating), label: 'Rating', color: '#FBBF24' },
              { icon: 'chatbubble', value: String(provider.reviews), label: 'Reviews', color: Colors.blue200 },
              { icon: 'time', value: `${provider.experience}yr`, label: 'Exp', color: '#86EFAC' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.stat}>
                  <Ionicons name={stat.icon as any} size={16} color={stat.color} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ABOUT */}
        {activeTab === 'About' && (
          <View style={{ gap: 16 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.bio}>{provider.bio}</Text>
            </View>

            {/* Info grid */}
            <View style={styles.infoGrid}>
              {[
                { icon: 'location-outline', label: 'Location', value: provider.city },
                { icon: 'construct-outline', label: 'Service', value: provider.service },
                { icon: 'time-outline', label: 'Experience', value: `${provider.experience} years` },
                { icon: 'language-outline', label: 'Languages', value: 'Hindi, Gujarati' },
                { icon: 'sunny-outline', label: 'Work Days', value: 'Mon – Sat' },
                { icon: 'alarm-outline', label: 'Hours', value: '9:00 AM – 7:00 PM' },
              ].map(info => (
                <View key={info.label} style={styles.infoCard}>
                  <View style={styles.infoIcon}>
                    <Ionicons name={info.icon as any} size={18} color={Colors.primary} />
                  </View>
                  <Text style={styles.infoLabel}>{info.label}</Text>
                  <Text style={styles.infoValue}>{info.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* SERVICES */}
        {activeTab === 'Services' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            {MOCK_SERVICES.map((service, i) => (
              <View key={i} style={styles.serviceRow}>
                <View style={styles.serviceDot}>
                  <Ionicons name="checkmark" size={14} color={Colors.primary} />
                </View>
                <Text style={styles.serviceText}>{service}</Text>
              </View>
            ))}
          </View>
        )}

        {/* REVIEWS */}
        {activeTab === 'Reviews' && (
          <View style={{ gap: 12 }}>
            {/* Summary */}
            <View style={styles.reviewSummary}>
              <Text style={styles.bigRating}>{provider.rating}</Text>
              <View style={{ alignItems: 'center', gap: 6 }}>
                <StarRow rating={Math.round(provider.rating)} />
                <Text style={styles.totalReviews}>{provider.reviews} reviews</Text>
              </View>
            </View>
            {MOCK_REVIEWS.map(review => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewName}>{review.name}</Text>
                    <StarRow rating={review.rating} />
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTAs */}
      <View style={styles.stickyBar}>
        <TouchableOpacity style={styles.callBtn}>
          <Ionicons name="call-outline" size={20} color={Colors.primary} />
          <Text style={styles.callBtnText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.enquiryBtn}
          onPress={() => navigation.navigate('SendEnquiry', { provider: { ...provider, initials } })}>
          <Ionicons name="paper-plane-outline" size={18} color={Colors.white} />
          <Text style={styles.enquiryBtnText}>Send Enquiry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: { paddingBottom: 28 },
  backBtn: { paddingHorizontal: 20, paddingTop: 52, paddingBottom: 8, width: 60 },
  heroContent: { alignItems: 'center', paddingHorizontal: 24, gap: 6 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  avatarText: { fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(219,234,254,0.25)', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 4,
  },
  verifiedText: { fontSize: 11, color: Colors.blue200, fontWeight: FontWeight.bold },
  heroName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.white },
  heroService: { fontSize: FontSize.base, color: 'rgba(255,255,255,0.65)' },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 14, backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14, paddingVertical: 12, paddingHorizontal: 8, width: '100%',
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.15)' },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  tab: { flex: 1, height: 46, alignItems: 'center', justifyContent: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: Colors.primary },
  tabText: { fontSize: FontSize.base, fontWeight: FontWeight.medium, color: Colors.slate500 },
  tabTextActive: { color: Colors.primary, fontWeight: FontWeight.bold },
  scroll: { padding: 20, paddingBottom: 40 },
  section: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, ...Shadows.card },
  sectionTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 10 },
  bio: { fontSize: FontSize.base, color: Colors.slate500, lineHeight: 22 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  infoCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 14, padding: 14,
    alignItems: 'flex-start', gap: 6, ...Shadows.card,
  },
  infoIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400, textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.darkNavy },
  serviceRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  serviceDot: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center',
  },
  serviceText: { fontSize: FontSize.base, color: Colors.darkNavy, fontWeight: FontWeight.medium },
  reviewSummary: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', gap: 20, ...Shadows.card,
  },
  bigRating: { fontSize: 44, fontWeight: FontWeight.extrabold, color: Colors.darkNavy },
  totalReviews: { fontSize: FontSize.sm, color: Colors.slate400 },
  reviewCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 16, gap: 10, ...Shadows.card },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: Colors.blue50,
    borderWidth: 1.5, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.primary },
  reviewName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 3 },
  reviewDate: { fontSize: FontSize.xs, color: Colors.slate400 },
  reviewComment: { fontSize: FontSize.base, color: Colors.slate500, lineHeight: 20 },
  stickyBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: 12, padding: 16, paddingBottom: 28,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
    ...Shadows.nav,
  },
  callBtn: {
    flex: 1, height: 52, borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.primary,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  callBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.primary },
  enquiryBtn: {
    flex: 2, height: 52, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  enquiryBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
