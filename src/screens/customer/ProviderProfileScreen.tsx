import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Hero header */}
      <LinearGradient
        colors={['#1D4ED8', '#0F172A']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.heroContent}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          {provider.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={11} color="#DBEAFE" />
              <Text style={styles.verifiedText}>Verified Pro</Text>
            </View>
          )}
          <Text style={styles.heroName}>{provider.name}</Text>
          <Text style={styles.heroService}>{provider.service}</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { icon: 'star', value: String(provider.rating), label: 'Rating', color: '#FBBF24' },
              { icon: 'chatbubble', value: String(provider.reviews), label: 'Reviews', color: '#DBEAFE' },
              { icon: 'time', value: `${provider.experience}yr`, label: 'Exp', color: '#86EFAC' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.stat}>
                  <Ionicons name={stat.icon as any} size={14} color={stat.color} />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.heroCallBtn}>
              <Ionicons name="call-outline" size={20} color="#FFFFFF" />
              <Text style={styles.heroCallBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heroEnquiryBtn}
              onPress={() => navigation.navigate('SendEnquiry', { provider: { ...provider, initials } })}>
              <Ionicons name="paper-plane-outline" size={18} color="#1D4ED8" />
              <Text style={styles.heroEnquiryBtnText}>Send Enquiry</Text>
            </TouchableOpacity>
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

      {/* Tab Content - Each tab has its own ScrollView */}
      {activeTab === 'About' && (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{ gap: 14 }}>
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
                    <Ionicons name={info.icon as any} size={18} color="#FF6B00" />
                  </View>
                  <Text style={styles.infoLabel}>{info.label}</Text>
                  <Text style={styles.infoValue}>{info.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === 'Services' && (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            <View style={{ gap: 0 }}>
              {MOCK_SERVICES.map((service, i) => (
                <View key={i} style={[styles.serviceRow, i === MOCK_SERVICES.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={styles.serviceDot}>
                    <Ionicons name="checkmark" size={16} color="#FF6B00" />
                  </View>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {activeTab === 'Reviews' && (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}>
          <View style={{ gap: 14 }}>
            {/* Summary */}
            <View style={styles.reviewSummary}>
              <View style={styles.ratingCircle}>
                <Text style={styles.bigRating}>{provider.rating}</Text>
                <StarRow rating={Math.round(provider.rating)} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.totalReviews}>{provider.reviews} Total Reviews</Text>
                <Text style={styles.reviewSubtext}>Based on customer feedback</Text>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      <StarRow rating={review.rating} />
                      <Text style={styles.reviewDate}>• {review.date}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0', flexDirection: 'column' },
  hero: { paddingBottom: 20, flexShrink: 0 },
  backBtn: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 6, width: 60 },
  heroContent: { alignItems: 'center', paddingHorizontal: 24, gap: 4 },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  avatarText: { fontSize: 24, fontWeight: '700' as any, color: '#FFFFFF' },
  verifiedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(219,234,254,0.25)', paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 3,
  },
  verifiedText: { fontSize: 9, color: '#DBEAFE', fontWeight: '700' as any },
  heroName: { fontSize: 19, fontWeight: '700' as any, color: '#FFFFFF', letterSpacing: -0.4 },
  heroService: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 10, backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12, paddingVertical: 10, paddingHorizontal: 8, width: '100%',
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 16, fontWeight: '700' as any, color: '#FFFFFF' },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.15)' },
  heroButtons: {
    flexDirection: 'row', gap: 12, width: '100%', marginTop: 14,
  },
  heroCallBtn: {
    flex: 1, height: 46, borderRadius: 23,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  heroCallBtnText: { fontSize: 15, fontWeight: '700' as any, color: '#FFFFFF' },
  heroEnquiryBtn: {
    flex: 2, height: 46, backgroundColor: '#FFFFFF', borderRadius: 23,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  heroEnquiryBtnText: { fontSize: 15, fontWeight: '700' as any, color: '#1D4ED8' },
  tabs: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#ECECEC',
    flexShrink: 0,  // ← add this
  },
  tab: { flex: 1, height: 44, alignItems: 'center', justifyContent: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#FF6B00' },
  tabText: { fontSize: 13, fontWeight: '600' as any, color: '#888888' },
  tabTextActive: { color: '#FF6B00', fontWeight: '700' as any },
  scroll: { padding: 18, paddingBottom: 100 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#ECECEC' },
  sectionTitle: { fontSize: 18, fontWeight: '700' as any, color: '#0D0D0D', marginBottom: 14, letterSpacing: -0.3 },
  bio: { fontSize: 13, color: '#888888', lineHeight: 20 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  infoCard: {
    width: '47%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14,
    alignItems: 'flex-start', gap: 6, borderWidth: 1, borderColor: '#ECECEC',
  },
  infoIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center',
  },
  infoLabel: { fontSize: 10, fontWeight: '600' as any, color: '#888888', textTransform: 'uppercase', letterSpacing: 0.5 },
  infoValue: { fontSize: 13, fontWeight: '600' as any, color: '#0D0D0D' },
  serviceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#ECECEC'
  },
  serviceDot: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: '#FFF4ED',
    alignItems: 'center', justifyContent: 'center',
  },
  serviceText: { fontSize: 14, color: '#0D0D0D', fontWeight: '600' as any, flex: 1 },
  reviewSummary: {
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20,
    flexDirection: 'row', alignItems: 'center', gap: 16, borderWidth: 1, borderColor: '#ECECEC',
  },
  ratingCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center', gap: 4,
  },
  bigRating: { fontSize: 28, fontWeight: '700' as any, color: '#FF6B00' },
  totalReviews: { fontSize: 15, color: '#0D0D0D', fontWeight: '700' as any },
  reviewSubtext: { fontSize: 12, color: '#888888', marginTop: 2 },
  reviewCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, gap: 12, borderWidth: 1, borderColor: '#ECECEC' },
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  reviewAvatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: '#FFF4ED',
    borderWidth: 2, borderColor: '#FF6B00', alignItems: 'center', justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: 15, fontWeight: '700' as any, color: '#FF6B00' },
  reviewName: { fontSize: 14, fontWeight: '700' as any, color: '#0D0D0D' },
  reviewDate: { fontSize: 11, color: '#888888' },
  reviewComment: { fontSize: 13, color: '#666666', lineHeight: 20, paddingLeft: 54 },
});
