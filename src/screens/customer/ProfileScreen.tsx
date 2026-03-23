import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const ACCOUNT_ROWS = [
  { icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
  { icon: 'lock-closed-outline', label: 'Change Password', screen: '' },
  { icon: 'notifications-outline', label: 'Notifications', screen: 'Settings' },
  { icon: 'heart-outline', label: 'Saved Providers', screen: '' },
];

const GENERAL_ROWS = [
  { icon: 'help-circle-outline', label: 'How It Works', screen: 'HowItWorks' },
  { icon: 'information-circle-outline', label: 'About ServiceHub', screen: 'About' },
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
        <Ionicons name={item.icon} size={18} color={Colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      <Ionicons name="chevron-forward" size={16} color={Colors.slate300} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header gradient */}
        <LinearGradient
          colors={['#1D4ED8', '#0F172A']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={styles.header}>
          <View style={styles.topBar}>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsBtn}>
              <Ionicons name="settings-outline" size={22} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarArea}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>DP</Text>
            </View>
            <TouchableOpacity style={styles.cameraBtn} onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="camera-outline" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Darshan Patel</Text>
          <Text style={styles.email}>darshan@email.com</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { value: '4', label: 'Enquiries' },
              { value: '3', label: 'Reviews Left' },
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
                <Ionicons name="construct-outline" size={22} color={Colors.accentOrange} />
              </View>
              <View>
                <Text style={styles.bannerTitle}>Become a Provider</Text>
                <Text style={styles.bannerSubtext}>Earn by offering your expertise</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={18} color={Colors.accentOrange} />
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
            <Ionicons name="log-out-outline" size={20} color={Colors.errorRed} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.version}>ServiceHub v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingBottom: 28 },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 20,
  },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  settingsBtn: { width: 40, height: 40, alignItems: 'flex-end', justifyContent: 'center' },
  avatarArea: { alignSelf: 'center', position: 'relative', marginBottom: 12 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 26, fontWeight: FontWeight.bold, color: Colors.white },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.white, textAlign: 'center' },
  email: { fontSize: FontSize.md, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 3 },
  statsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 20, marginHorizontal: 24,
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, paddingVertical: 14,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.white },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.5 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.15)' },
  content: { paddingHorizontal: 20, paddingTop: 22 },
  providerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#FFF7ED', borderRadius: 14, padding: 16,
    borderWidth: 1.5, borderColor: '#FBCF9A', marginBottom: 24,
  },
  providerBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  providerBannerIcon: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: '#FEF3C7',
    alignItems: 'center', justifyContent: 'center',
  },
  bannerTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: '#92400E' },
  bannerSubtext: { fontSize: FontSize.sm, color: Colors.accentOrange, marginTop: 2 },
  sectionTitle: {
    fontSize: 11, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10, marginTop: 4,
  },
  rowGroup: {
    backgroundColor: Colors.white, borderRadius: 14, marginBottom: 20,
    overflow: 'hidden', ...Shadows.card,
  },
  row: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 15,
    borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 12,
  },
  rowIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy, fontWeight: FontWeight.medium },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  logoutText: { fontSize: FontSize.lg, color: Colors.errorRed, fontWeight: FontWeight.bold },
  version: { fontSize: FontSize.xs, color: Colors.slate300, textAlign: 'center', marginTop: 4, marginBottom: 8 },
});
