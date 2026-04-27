import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export const SettingsScreen = ({ navigation }: any) => {
  const [notifs, setNotifs] = useState({
    newEnquiries: true, replies: true, promo: false, email: true,
  });

  const ToggleRow = ({ icon, label, value, onToggle, last }: any) => (
    <View style={[styles.row, last && { borderBottomWidth: 0 }]}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color="#FF6B00" />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value} onValueChange={onToggle}
        trackColor={{ false: '#E5E5E5', true: '#FFD4B3' }}
        thumbColor={value ? '#FF6B00' : '#999'}
      />
    </View>
  );

  const NavRow = ({ icon, label, value, danger, last }: any) => (
    <TouchableOpacity style={[styles.row, last && { borderBottomWidth: 0 }]} activeOpacity={0.65}>
      <View style={[styles.rowIcon, danger && { backgroundColor: '#FEE2E2' }]}>
        <Ionicons name={icon} size={18} color={danger ? '#E11D48' : '#FF6B00'} />
      </View>
      <Text style={[styles.rowLabel, danger && { color: '#E11D48' }]}>{label}</Text>
      {value ? (
        <Text style={styles.rowValue}>{value}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={16} color="#888" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TopBar 
        title="Settings" 
        onBack={() => navigation.goBack()} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.rowGroup}>
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
        <View style={styles.rowGroup}>
          <NavRow icon="language-outline" label="Language" value="English" />
          <NavRow icon="location-outline" label="Location Access" value="Allowed" />
          <NavRow icon="trash-outline" label="Clear Cache" last />
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.rowGroup}>
          <NavRow icon="lock-closed-outline" label="Change Password" />
          <NavRow icon="logo-google" label="Linked Accounts" value="Google" />
          <NavRow icon="warning-outline" label="Delete Account" danger last />
        </View>

        <View style={styles.appInfo}>
          <View style={styles.logoRow}>
            <Ionicons name="flash" size={15} color="#FF6B00" />
            <Text style={styles.appName}>Sevak</Text>
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
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 2,
  },
  rowGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    gap: 11,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFF4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 13,
    color: '#0D0D0D',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  appInfo: {
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  appName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0D0D0D',
    letterSpacing: -0.2,
  },
  version: {
    fontSize: 10,
    color: '#888',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  link: {
    fontSize: 10,
    color: '#FF6B00',
    fontWeight: '600',
  },
  dot: {
    fontSize: 10,
    color: '#888',
  },
});
