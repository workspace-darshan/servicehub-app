import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const ACCOUNT_ROWS = [
  { icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
  { icon: 'lock-closed-outline', label: 'Change Password', screen: '' },
  { icon: 'notifications-outline', label: 'Notifications', screen: 'Settings' },
  { icon: 'bookmark-outline', label: 'Saved Providers', screen: 'Saved' },
];

const GENERAL_ROWS = [
  { icon: 'help-circle-outline', label: 'How It Works', screen: 'HowItWorks' },
  { icon: 'information-circle-outline', label: 'About Sevek', screen: 'About' },
  { icon: 'shield-outline', label: 'Privacy Policy', screen: '' },
  { icon: 'document-text-outline', label: 'Terms & Conditions', screen: '' },
  { icon: 'call-outline', label: 'Contact Support', screen: 'Contact' },
];

export const ProfileScreen = ({ navigation }: any) => {
  const renderRow = (item: any, index: number, arr: any[]) => (
    <TouchableOpacity
      key={item.label}
      style={[styles.row, index === arr.length - 1 && { borderBottomWidth: 0 }]}
      onPress={() => item.screen && navigation.navigate(item.screen)}
      activeOpacity={0.6}>
      <View style={styles.rowIcon}>
        <Ionicons name={item.icon} size={18} color="#FF6B00" />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={16} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header gradient */}
        <LinearGradient
          colors={['#FF6B00', '#FF9A3C'] as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}>
          <View style={styles.topBar}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={22} color="rgba(255,255,255,0.9)" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarArea}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DP</Text>
            </View>
            <TouchableOpacity style={styles.cameraBtn} onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="camera-outline" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Darshan Patel</Text>
          <Text style={styles.email}>darshan@email.com</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { value: '4', label: 'Enquiries' },
              { value: '3', label: 'Reviews' },
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

          {/* Become a Provider banner */}
          <TouchableOpacity
            style={styles.providerBanner}
            onPress={() => navigation.navigate('BecomeProvider')}
            activeOpacity={0.85}>
            <View style={styles.providerBannerLeft}>
              <View style={styles.providerBannerIcon}>
                <Ionicons name="construct-outline" size={22} color="#FF6B00" />
              </View>
              <View>
                <Text style={styles.bannerTitle}>Become a Provider</Text>
                <Text style={styles.bannerSubtext}>Earn by offering your expertise</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#FF6B00" />
          </TouchableOpacity>

          {/* Account */}
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.rowGroup}>
            {ACCOUNT_ROWS.map((item, i, arr) => renderRow(item, i, arr))}
          </View>

          {/* General */}
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.rowGroup}>
            {GENERAL_ROWS.map((item, i, arr) => renderRow(item, i, arr))}
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Login')}>
            <Ionicons name="log-out-outline" size={20} color="#E11D48" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.version}>Sevek v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  header: { paddingBottom: 20 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: -0.4 },
  settingsBtn: { width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  avatarArea: { alignSelf: 'center', position: 'relative', marginBottom: 8 },
  avatar: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#fff' },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#0D0D0D', borderWidth: 2.5, borderColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: 18, fontWeight: '700', color: '#fff', textAlign: 'center', letterSpacing: -0.3 },
  email: { fontSize: 12, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 2 },
  statsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 14, marginHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 14, paddingVertical: 10,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statValue: { fontSize: 17, fontWeight: '700', color: '#fff', letterSpacing: -0.3 },
  statLabel: { fontSize: 9, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
  statDivider: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { paddingHorizontal: 18, paddingTop: 16 },
  providerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF4ED', borderRadius: 16, padding: 13,
    borderWidth: 1, borderColor: '#ECECEC', marginBottom: 18,
  },
  providerBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  providerBannerIcon: {
    width: 38, height: 38, borderRadius: 11, backgroundColor: '#FFF0E6',
    alignItems: 'center', justifyContent: 'center',
  },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.2 },
  bannerSubtext: { fontSize: 10, color: '#888', marginTop: 1 },
  sectionTitle: {
    fontSize: 10, fontWeight: '700', color: '#888',
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, marginTop: 2,
  },
  rowGroup: {
    backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 16,
    overflow: 'hidden', borderWidth: 1, borderColor: '#ECECEC',
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#ECECEC', gap: 11,
  },
  rowIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 13, color: '#0D0D0D', fontWeight: '500' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 12, marginTop: 4 },
  logoutText: { fontSize: 14, color: '#E11D48', fontWeight: '700' },
  version: { fontSize: 10, color: '#888', textAlign: 'center', marginTop: 6, marginBottom: 8 },
});
