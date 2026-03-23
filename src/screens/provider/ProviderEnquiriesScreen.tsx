import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const ENQUIRIES = [
  {
    id: '1', name: 'Amit Kumar', initials: 'AK', service: 'Home Plumbing',
    date: 'Mar 23, 2026', preferredDate: 'Mar 25', preferredTime: '10:00 AM',
    status: 'New', message: 'My kitchen sink is leaking badly and needs replacement urgently.',
  },
  {
    id: '2', name: 'Sana Reddy', initials: 'SR', service: 'Electrician Consult',
    date: 'Mar 22, 2026', preferredDate: 'Mar 24', preferredTime: '2:00 PM',
    status: 'Replied', message: 'Lights flickering in living room. Checked the MCB and it seems fine.',
  },
  {
    id: '3', name: 'Vikram Jha', initials: 'VJ', service: 'AC Repair',
    date: 'Mar 21, 2026', preferredDate: 'Mar 23', preferredTime: '11:00 AM',
    status: 'New', message: 'AC cooling not working after summer service. Gas refill likely needed.',
  },
  {
    id: '4', name: 'Priya Shah', initials: 'PS', service: 'Bathroom Fitting',
    date: 'Mar 19, 2026', preferredDate: 'Mar 20', preferredTime: '9:00 AM',
    status: 'Closed', message: 'Need new shower head installation and bathroom tap replacement.',
  },
];

const STATUS_CFG: Record<string, { color: string; bg: string; icon: string }> = {
  New: { color: Colors.accentOrange, bg: '#FFF7ED', icon: 'sparkles-outline' },
  Replied: { color: Colors.primary, bg: Colors.blue50, icon: 'chatbubble-outline' },
  Closed: { color: Colors.slate400, bg: Colors.background, icon: 'checkmark-circle-outline' },
};

const TABS = ['New', 'Replied', 'All'];

export const ProviderEnquiriesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = ENQUIRIES.filter(e => {
    if (activeTab === 'New') return e.status === 'New';
    if (activeTab === 'Replied') return e.status === 'Replied';
    return true;
  });

  const newCount = ENQUIRIES.filter(e => e.status === 'New').length;

  const renderItem = ({ item }: any) => {
    const cfg = STATUS_CFG[item.status] || STATUS_CFG['Closed'];
    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.cardHead}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.customerName}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
            <Ionicons name={cfg.icon as any} size={11} color={cfg.color} />
            <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
          </View>
        </View>

        {/* Service chip */}
        <View style={styles.serviceChip}>
          <Ionicons name="construct-outline" size={11} color={Colors.primary} />
          <Text style={styles.serviceChipText}>{item.service}</Text>
        </View>

        {/* Message */}
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

        {/* Preferred slot */}
        <View style={styles.slotRow}>
          <View style={styles.slotItem}>
            <Ionicons name="calendar-outline" size={13} color={Colors.slate400} />
            <Text style={styles.slotText}>{item.preferredDate}</Text>
          </View>
          <View style={styles.slotItem}>
            <Ionicons name="time-outline" size={13} color={Colors.slate400} />
            <Text style={styles.slotText}>{item.preferredTime}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View Details</Text>
          </TouchableOpacity>
          {item.status === 'New' && (
            <TouchableOpacity style={styles.replyBtn}>
              <Ionicons name="send-outline" size={15} color={Colors.white} />
              <Text style={styles.replyBtnText}>Reply</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enquiries</Text>
        {newCount > 0 && (
          <View style={styles.newCountBadge}>
            <Text style={styles.newCountText}>{newCount} new</Text>
          </View>
        )}
      </View>

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

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="mail-open-outline" size={56} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>No enquiries here</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { flex: 1, fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy },
  newCountBadge: {
    backgroundColor: Colors.accentOrange + '20', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.accentOrange + '50',
  },
  newCountText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.accentOrange },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.white,
    paddingHorizontal: 20, paddingBottom: 12, gap: 8,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  tab: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceContainerLow },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  tabTextActive: { color: Colors.white },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, gap: 10, ...Shadows.card },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.blue50,
    borderWidth: 1.5, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: FontWeight.bold, color: Colors.primary },
  customerName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  date: { fontSize: FontSize.xs, color: Colors.slate400, marginTop: 2 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: BorderRadius.full,
  },
  statusText: { fontSize: 10, fontWeight: FontWeight.bold },
  serviceChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start',
    backgroundColor: Colors.blue50, paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.blue200,
  },
  serviceChipText: { fontSize: FontSize.xs, fontWeight: FontWeight.bold, color: Colors.primary },
  message: { fontSize: FontSize.sm, color: Colors.slate500, lineHeight: 19 },
  slotRow: {
    flexDirection: 'row', gap: 16, backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm, padding: 10,
  },
  slotItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  slotText: { fontSize: FontSize.sm, color: Colors.lightNavy },
  actions: {
    flexDirection: 'row', gap: 10, paddingTop: 10,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  viewBtn: {
    flex: 1, height: 40, borderRadius: BorderRadius.md,
    borderWidth: 1.5, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center',
  },
  viewBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  replyBtn: {
    flex: 1, height: 40, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  replyBtnText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: Colors.white },
  empty: { paddingTop: 60, alignItems: 'center', gap: 10 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
});
