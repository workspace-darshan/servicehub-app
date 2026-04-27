import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useAuth } from '../../context/AuthContext';
import { getProviderProfile, ProviderProfile } from '../../services/storage';

const STATS = [
  { icon: 'mail-open-outline', iconBg: '#EDE9FE', iconColor: '#7C3AED', value: '5', label: 'New Enquiries', sub: 'THIS WEEK' },
  { icon: 'star', iconBg: '#FEF9C3', iconColor: '#CA8A04', value: '4.8', label: 'Rating', sub: '32 REVIEWS' },
  { icon: 'eye-outline', iconBg: '#DCFCE7', iconColor: '#16A34A', value: '124', label: 'Profile Views', sub: 'THIS MONTH' },
];

const RECENT_ENQUIRIES = [
  { id: '1', name: 'Amit Kumar', initials: 'AK', service: 'Home Plumbing', date: 'Mar 23, 2026', isNew: true },
  { id: '2', name: 'Sana Reddy', initials: 'SR', service: 'AC Repair', date: 'Mar 22, 2026', isNew: false },
  { id: '3', name: 'Vikram Jha', initials: 'VJ', service: 'Electrician', date: 'Mar 21, 2026', isNew: true },
];

const QUICK_ACTIONS = [
  { icon: 'construct-outline', iconBg: '#EDE9FE', iconColor: '#7C3AED', label: 'Edit Services', screen: 'ProviderEditProfile' },
  { icon: 'person-outline', iconBg: '#E0F2FE', iconColor: '#0284C7', label: 'Update Profile', screen: 'ProviderEditProfile' },
  { icon: 'eye-outline', iconBg: '#DCFCE7', iconColor: '#16A34A', label: 'Public Profile', screen: '' },
  { icon: 'share-social-outline', iconBg: '#FFE4E6', iconColor: '#E11D48', label: 'Share Profile', screen: '' },
];

export const ProviderDashboardScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);

  useEffect(() => {
    loadProviderProfile();
  }, []);

  const loadProviderProfile = async () => {
    const profile = await getProviderProfile();
    setProviderProfile(profile);
  };

  const displayName = user?.name || 'Provider';
  const businessName = providerProfile?.businessName || 'Your Business';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Sticky Header with Blur */}
      <BlurView intensity={100} tint="light" style={[styles.headerAbsolute, { paddingTop: 10 + insets.top }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good morning, {displayName} 👋</Text>
            <Text style={styles.subtitle}>{businessName}</Text>
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
              onPress={() => navigation.navigate('ProviderEditProfile')}>
              <Text style={styles.avatarText}>DP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Stats Cards */}
        <View style={styles.section}>
          <View style={styles.statsRow}>
            {STATS.map(stat => (
              <View key={stat.label} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.iconBg }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statSub}>{stat.sub}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Enquiries */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Enquiries</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProviderEnquiries')}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: 10 }}>
            {RECENT_ENQUIRIES.map(enq => (
              <TouchableOpacity
                key={enq.id}
                style={styles.enquiryCard}
                onPress={() => navigation.navigate('ProviderEnquiries')}
                activeOpacity={0.7}>
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
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map(action => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionCard}
                onPress={() => action.screen && navigation.navigate(action.screen)}
                activeOpacity={0.7}>
                <View style={[styles.actionIcon, { backgroundColor: action.iconBg }]}>
                  <Ionicons name={action.icon as any} size={20} color={action.iconColor} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(245, 244, 240, 0.7)',
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
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
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
  scroll: {
    paddingTop: 100,
    paddingBottom: 100,
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
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    alignItems: 'center',
  },
  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0D0D0D',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D0D0D',
    textAlign: 'center',
    marginTop: 2,
  },
  statSub: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  enquiryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  enquiryAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enquiryAvatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#7C3AED',
  },
  enquiryName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D0D0D',
  },
  enquiryService: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  newBadge: {
    backgroundColor: '#FFF4ED',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#FFD4B3',
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF6B00',
  },
  enquiryDate: {
    fontSize: 10,
    color: '#AAA',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D0D0D',
    textAlign: 'center',
  },
});
