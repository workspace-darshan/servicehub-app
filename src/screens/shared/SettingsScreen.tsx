import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export const SettingsScreen = ({ navigation }: any) => {
  const [notifs, setNotifs] = useState({
    newEnquiries: true, replies: true, promo: false, email: true,
  });

  const ToggleRow = ({ icon, label, value, onToggle, last }: any) => (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={17} color={Colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value} onValueChange={onToggle}
        trackColor={{ false: Colors.slate200, true: Colors.primary + '50' }}
        thumbColor={value ? Colors.primary : Colors.slate400}
      />
    </View>
  );

  const NavRow = ({ icon, label, value, danger, last }: any) => (
    <TouchableOpacity style={[styles.row, last && { borderBottomWidth: 0 }]} activeOpacity={0.65}>
      <View style={[styles.rowIcon, danger && { backgroundColor: '#FEE2E2' }]}>
        <Ionicons name={icon} size={17} color={danger ? Colors.errorRed : Colors.primary} />
      </View>
      <Text style={[styles.rowLabel, danger && { color: Colors.errorRed }]}>{label}</Text>
      {value
        ? <Text style={styles.rowValue}>{value}</Text>
        : <Ionicons name="chevron-forward" size={16} color={Colors.slate300} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.group}>
          <ToggleRow icon="mail-outline" label="New Enquiry Alerts" value={notifs.newEnquiries}
            onToggle={(v: boolean) => setNotifs(p => ({ ...p, newEnquiries: v }))} />
          <ToggleRow icon="chatbubble-outline" label="Provider Replies" value={notifs.replies}
            onToggle={(v: boolean) => setNotifs(p => ({ ...p, replies: v }))} />
          <ToggleRow icon="megaphone-outline" label="Promotional Updates" value={notifs.promo}
            onToggle={(v: boolean) => setNotifs(p => ({ ...p, promo: v }))} />
          <ToggleRow icon="mail-unread-outline" label="Email Notifications" value={notifs.email}
            onToggle={(v: boolean) => setNotifs(p => ({ ...p, email: v }))} last />
        </View>

        <Text style={styles.sectionTitle}>APP PREFERENCES</Text>
        <View style={styles.group}>
          <NavRow icon="language-outline" label="Language" value="English" />
          <NavRow icon="location-outline" label="Location Access" value="Allowed" />
          <NavRow icon="trash-outline" label="Clear Cache" last />
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.group}>
          <NavRow icon="lock-closed-outline" label="Change Password" />
          <NavRow icon="logo-google" label="Linked Accounts" value="Google" />
          <NavRow icon="warning-outline" label="Delete Account" danger last />
        </View>

        <View style={styles.appInfo}>
          <View style={styles.logoRow}>
            <Ionicons name="flash" size={16} color={Colors.primary} />
            <Text style={styles.appName}>ServiceHub</Text>
          </View>
          <Text style={styles.version}>v1.0.0 · Build 100</Text>
          <View style={styles.links}>
            <TouchableOpacity><Text style={styles.link}>Privacy Policy</Text></TouchableOpacity>
            <Text style={styles.dot}>·</Text>
            <TouchableOpacity><Text style={styles.link}>Terms & Conditions</Text></TouchableOpacity>
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
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  scroll: { padding: 20, paddingBottom: 80 },
  sectionTitle: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10, marginTop: 4,
  },
  group: {
    backgroundColor: Colors.white, borderRadius: 14,
    marginBottom: 20, overflow: 'hidden', ...Shadows.card,
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
  rowValue: { fontSize: FontSize.sm, color: Colors.slate500 },
  appInfo: { alignItems: 'center', gap: 6, marginTop: 8 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  appName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  version: { fontSize: FontSize.xs, color: Colors.slate400 },
  links: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  link: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.semibold },
  dot: { fontSize: FontSize.xs, color: Colors.slate400 },
});
