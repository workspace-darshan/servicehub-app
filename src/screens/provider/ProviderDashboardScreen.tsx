import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STATS = [
  { icon: 'mail-open-outline', iconColor: Colors.primary, value: '5', label: 'New Enquiries', sub: 'This week' },
  { icon: 'star', iconColor: '#FBBF24', value: '4.8', label: 'Rating', sub: '32 reviews' },
  { icon: 'eye-outline', iconColor: '#22C55E', value: '124', label: 'Profile Views', sub: 'This month' },
];

const RECENT_ENQUIRIES = [
  { id: '1', name: 'Amit Kumar', initials: 'AK', service: 'Home Plumbing', date: 'Mar 23, 2026', isNew: true },
  { id: '2', name: 'Sana Reddy', initials: 'SR', service: 'AC Repair', date: 'Mar 22, 2026', isNew: false },
  { id: '3', name: 'Vikram Jha', initials: 'VJ', service: 'Electrician', date: 'Mar 21, 2026', isNew: true },
];

const QUICK_ACTIONS = [
  { icon: 'construct-outline', label: 'Edit Services', screen: 'ProviderEditProfile' },
  { icon: 'person-outline', label: 'Update Profile', screen: 'ProviderEditProfile' },
  { icon: 'eye-outline', label: 'Public Profile', screen: '' },
  { icon: 'share-social-outline', label: 'Share Profile', screen: '' },
];

export const ProviderDashboardScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: 14 + insets.top }]}>
        <View>
          <Text style={styles.headerTitle}>Provider Hub</Text>
          <Text style={styles.headerSub}>GOOD MORNING</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={22} color={Colors.darkNavy} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Greeting */}
        <Text style={styles.greeting}>Hello, Darshan 👋</Text>

        {/* Stats */}
        <ScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          style={{ marginBottom: 28 }}>
          {STATS.map(stat => (
            <View key={stat.label} style={styles.statCard}>
              <View style={[styles.statAccentBar, { backgroundColor: stat.iconColor }]} />
              <View style={[styles.statIconBg, { backgroundColor: stat.iconColor + '18' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statSub}>{stat.sub}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.content}>

          {/* Recent Enquiries */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Enquiries</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProviderEnquiries')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10, marginBottom: 28 }}>
            {RECENT_ENQUIRIES.map(enq => (
              <TouchableOpacity
                key={enq.id}
                style={styles.enquiryCard}
                onPress={() => navigation.navigate('ProviderEnquiries')}
                activeOpacity={0.85}>
                <View style={styles.enquiryAvatar}>
                  <Text style={styles.enquiryAvatarText}>{enq.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.enquiryName}>{enq.name}</Text>
                  <Text style={styles.enquiryService}>{enq.service}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 6 }}>
                  {enq.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>New</Text>
                    </View>
                  )}
                  <Text style={styles.enquiryDate}>{enq.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionCard}
                onPress={() => action.screen && navigation.navigate(action.screen)}
                activeOpacity={0.8}>
                <View style={styles.actionIconBg}>
                  <Ionicons name={action.icon as any} size={22} color={Colors.primary} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  headerSub: { fontSize: 10, color: Colors.slate400, fontWeight: FontWeight.bold, letterSpacing: 1.5, marginTop: 2 },
  notifBtn: { position: 'relative', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  notifDot: {
    position: 'absolute', top: 8, right: 8, width: 8, height: 8,
    borderRadius: 4, backgroundColor: Colors.errorRed, borderWidth: 1.5, borderColor: Colors.white,
  },
  scroll: { paddingBottom: 100 },
  greeting: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy, paddingHorizontal: 20, paddingVertical: 20 },
  statCard: {
    width: 155, backgroundColor: Colors.white, borderRadius: 16,
    padding: 16, position: 'relative', overflow: 'hidden', ...Shadows.card,
  },
  statAccentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
  statIconBg: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { fontSize: 26, fontWeight: FontWeight.extrabold, color: Colors.darkNavy },
  statLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.darkNavy, marginTop: 2 },
  statSub: { fontSize: 10, color: Colors.slate400, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  content: { paddingHorizontal: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 12 },
  viewAll: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semibold },
  enquiryCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.white, borderRadius: 14, padding: 14, ...Shadows.card,
  },
  enquiryAvatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.blue50,
    borderWidth: 1.5, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  enquiryAvatarText: { fontSize: 14, fontWeight: FontWeight.bold, color: Colors.primary },
  enquiryName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  enquiryService: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 2 },
  newBadge: {
    backgroundColor: '#FFF7ED', borderRadius: BorderRadius.full,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: '#FED7AA',
  },
  newBadgeText: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.accentOrange },
  enquiryDate: { fontSize: 10, color: Colors.slate400 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 16,
    padding: 18, alignItems: 'center', gap: 10, ...Shadows.card,
  },
  actionIconBg: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.darkNavy, textAlign: 'center' },
});
