import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCOUNT_ROWS = [
  { icon: 'person-outline',        label: 'Edit Profile',      screen: 'EditProfile' },
  { icon: 'lock-closed-outline',   label: 'Change Password',   screen: '' },
  { icon: 'notifications-outline', label: 'Notifications',     screen: 'Notifications' },
  { icon: 'bookmark-outline',      label: 'Saved Providers',   screen: 'Saved' },
];

const GENERAL_ROWS = [
  { icon: 'help-circle-outline',        label: 'How It Works',      screen: 'HowItWorks' },
  { icon: 'information-circle-outline', label: 'About Sevak',       screen: 'About' },
  { icon: 'shield-outline',             label: 'Privacy Policy',    screen: 'PrivacyPolicy' },
  { icon: 'call-outline',               label: 'Contact Support',   screen: 'Contact' },
];

export const ProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const renderRow = (item: any, index: number, arr: any[]) => (
    <TouchableOpacity
      key={item.label}
      style={[styles.row, index === arr.length - 1 && { borderBottomWidth: 0 }]}
      onPress={() => item.screen && navigation.navigate(item.screen)}
      activeOpacity={0.6}>
      <View style={styles.rowIcon}>
        <Ionicons name={item.icon} size={17} color="#FF6B00" />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={15} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <LinearGradient
          colors={['#FF6B00', '#FF9A3C']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 10 }]}>

          {/* Top row — settings only, no redundant "Profile" title */}
          <View style={styles.topBar}>
            <View />
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={20} color="rgba(255,255,255,0.85)" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarArea}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DP</Text>
            </View>
            <TouchableOpacity
              style={styles.cameraBtn}
              onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="camera-outline" size={13} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>Darshan Patel</Text>
          <Text style={styles.email}>darshan@email.com</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { value: '4',    label: 'Enquiries' },
              { value: '3',    label: 'Reviews' },
              { value: '2026', label: 'Since' },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <View style={styles.statDivider} />}
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>

          {/* Become a Provider */}
          <TouchableOpacity
            style={styles.providerBanner}
            onPress={() => navigation.navigate('BecomeProvider')}
            activeOpacity={0.85}>
            <View style={styles.providerBannerLeft}>
              <View style={styles.providerBannerIcon}>
                <Ionicons name="construct-outline" size={20} color="#FF6B00" />
              </View>
              <View>
                <Text style={styles.bannerTitle}>Become a Provider</Text>
                <Text style={styles.bannerSubtext}>Earn by offering your expertise</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={16} color="#FF6B00" />
          </TouchableOpacity>

          {/* Account group */}
          <Text style={styles.groupLabel}>Account</Text>
          <View style={styles.rowGroup}>
            {ACCOUNT_ROWS.map((item, i, arr) => renderRow(item, i, arr))}
          </View>

          {/* General group */}
          <Text style={styles.groupLabel}>General</Text>
          <View style={styles.rowGroup}>
            {GENERAL_ROWS.map((item, i, arr) => renderRow(item, i, arr))}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => navigation.replace('Login')}>
            <Ionicons name="log-out-outline" size={18} color="#E11D48" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.version}>Sevak v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scroll: { paddingBottom: 110 },

  // Header
  header: { paddingBottom: 18 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 6,
  },
  settingsBtn: {
    width: 36, height: 36,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarArea: { alignSelf: 'center', position: 'relative', marginBottom: 8 },
  avatar: {
    width: 68, height: 68, borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#0D0D0D', borderWidth: 2, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 17, fontWeight: '700', color: '#fff', textAlign: 'center', letterSpacing: -0.3 },
  email: { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 2 },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 12, marginHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, paddingVertical: 10,
  },
  stat: { flex: 1, alignItems: 'center', gap: 1 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#fff', letterSpacing: -0.3 },
  statLabel: {
    fontSize: 9, color: 'rgba(255,255,255,0.65)',
    textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600',
  },
  statDivider: { width: 1, height: 22, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Content
  content: { paddingHorizontal: 16, paddingTop: 14 },

  providerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF4ED', borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: '#FFD4B3', marginBottom: 14,
  },
  providerBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  providerBannerIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#FFE8D6', alignItems: 'center', justifyContent: 'center',
  },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  bannerSubtext: { fontSize: 11, color: '#888', marginTop: 1 },

  groupLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 6, marginTop: 2, paddingLeft: 2,
  },
  rowGroup: {
    backgroundColor: '#FFFFFF', borderRadius: 14, marginBottom: 12,
    overflow: 'hidden', borderWidth: 1, borderColor: '#ECECEC',
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 13, paddingVertical: 11,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0', gap: 10,
  },
  rowIcon: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 13, color: '#0D0D0D', fontWeight: '500' },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingVertical: 10, marginTop: 2,
  },
  logoutText: { fontSize: 13, color: '#E11D48', fontWeight: '700' },
  version: { fontSize: 10, color: '#BBBBBB', textAlign: 'center', marginTop: 6 },
});
