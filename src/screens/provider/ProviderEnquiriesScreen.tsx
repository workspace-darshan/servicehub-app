import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

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
  New: { color: '#FF6B00', bg: '#FFF4ED', icon: 'sparkles-outline' },
  Replied: { color: '#7C3AED', bg: '#EDE9FE', icon: 'chatbubble-outline' },
  Closed: { color: '#888', bg: '#F5F4F0', icon: 'checkmark-circle-outline' },
};

const TABS = ['New', 'Replied', 'All'];

export const ProviderEnquiriesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All');
  const insets = useSafeAreaInsets();

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
          <Ionicons name="construct-outline" size={11} color="#7C3AED" />
          <Text style={styles.serviceChipText}>{item.service}</Text>
        </View>

        {/* Message */}
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

        {/* Preferred slot */}
        <View style={styles.slotRow}>
          <View style={styles.slotItem}>
            <Ionicons name="calendar-outline" size={13} color="#888" />
            <Text style={styles.slotText}>{item.preferredDate}</Text>
          </View>
          <View style={styles.slotItem}>
            <Ionicons name="time-outline" size={13} color="#888" />
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
              <Ionicons name="send-outline" size={15} color="#fff" />
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
      
      {/* Header with Blur */}
      <BlurView intensity={100} tint="light" style={[styles.headerAbsolute, { paddingTop: 10 + insets.top }]}>
        <View style={styles.headerContent}>
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
      </BlurView>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingTop: 100, 
          paddingHorizontal: 18, 
          paddingBottom: 100,
          gap: 12,
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="mail-open-outline" size={56} color="#CCC" />
            <Text style={styles.emptyTitle}>No enquiries here</Text>
          </View>
        }
      />
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  headerTitle: { 
    flex: 1, 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#0D0D0D',
    letterSpacing: -0.4,
  },
  newCountBadge: {
    backgroundColor: '#FFF4ED', 
    paddingHorizontal: 10, 
    paddingVertical: 4,
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#FFD4B3',
  },
  newCountText: { fontSize: 10, fontWeight: '700', color: '#FF6B00' },
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },
  tab: { 
    paddingHorizontal: 18, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  tabActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#888' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 16, 
    gap: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#EDE9FE',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#7C3AED' },
  customerName: { fontSize: 14, fontWeight: '700', color: '#0D0D0D' },
  date: { fontSize: 10, color: '#AAA', marginTop: 2 },
  statusBadge: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4,
    paddingHorizontal: 8, 
    paddingVertical: 5, 
    borderRadius: 20,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  serviceChip: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5, 
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE', 
    paddingHorizontal: 10, 
    paddingVertical: 5,
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#D8B4FE',
  },
  serviceChipText: { fontSize: 11, fontWeight: '700', color: '#7C3AED' },
  message: { fontSize: 13, color: '#666', lineHeight: 19 },
  slotRow: {
    flexDirection: 'row', 
    gap: 16, 
    backgroundColor: '#F5F4F0',
    borderRadius: 12, 
    padding: 10,
  },
  slotItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  slotText: { fontSize: 12, color: '#0D0D0D', fontWeight: '500' },
  actions: {
    flexDirection: 'row', 
    gap: 10, 
    paddingTop: 10,
    borderTopWidth: 1, 
    borderTopColor: '#ECECEC',
  },
  viewBtn: {
    flex: 1, 
    height: 40, 
    borderRadius: 12,
    borderWidth: 1.5, 
    borderColor: '#ECECEC', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  viewBtnText: { fontSize: 13, fontWeight: '600', color: '#555' },
  replyBtn: {
    flex: 1, 
    height: 40, 
    backgroundColor: '#FF6B00', 
    borderRadius: 12,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 6,
  },
  replyBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  empty: { paddingTop: 60, alignItems: 'center', gap: 10 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D' },
});
