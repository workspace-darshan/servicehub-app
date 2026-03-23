import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { ENQUIRIES } from '../../data/mockData';

const STATUS_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  Pending: { icon: 'time-outline', color: '#92400E', bg: '#FEF3C7' },
  Responded: { icon: 'chatbubble-outline', color: Colors.primary, bg: Colors.blue50 },
  Completed: { icon: 'checkmark-circle-outline', color: '#166534', bg: '#DCFCE7' },
  Cancelled: { icon: 'close-circle-outline', color: Colors.errorRed, bg: '#FEE2E2' },
  New: { icon: 'sparkles-outline', color: Colors.accentOrange, bg: '#FFF7ED' },
};

const TABS = ['Active', 'Completed', 'All'];

export const MyActivityScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = ENQUIRIES.filter(e => {
    if (activeTab === 'Active') return e.status === 'Pending' || e.status === 'Responded';
    if (activeTab === 'Completed') return e.status === 'Completed';
    return true;
  });

  const renderItem = ({ item }: any) => {
    const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG['Pending'];
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.85}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View style={styles.serviceIconBg}>
            <Ionicons name="construct-outline" size={20} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.serviceName}>{item.service}</Text>
            <Text style={styles.providerName}>{item.provider}</Text>
          </View>
          {/* Status badge */}
          <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
            <Ionicons name={cfg.icon as any} size={12} color={cfg.color} />
            <Text style={[styles.statusText, { color: cfg.color }]}>{item.status}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={13} color={Colors.slate400} />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
          {item.hasReply && (
            <TouchableOpacity style={styles.replyBadge}>
              <Ionicons name="chatbubble-outline" size={12} color={Colors.primary} />
              <Text style={styles.replyText}>View reply</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Activity</Text>
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
        contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="mail-open-outline" size={56} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>No enquiries yet</Text>
            <Text style={styles.emptyBody}>Browse services to send your first enquiry</Text>
            <TouchableOpacity
              style={styles.browseBtn}
              onPress={() => navigation.navigate('AllServices')}>
              <Text style={styles.browseBtnText}>Browse Services</Text>
              <Ionicons name="arrow-forward" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  headerTitle: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy },
  tabs: {
    flexDirection: 'row', backgroundColor: Colors.white,
    paddingHorizontal: 20, paddingBottom: 12, paddingTop: 4, gap: 8,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  tab: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: BorderRadius.full, backgroundColor: Colors.surfaceContainerLow,
  },
  tabActive: { backgroundColor: Colors.primary },
  tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  tabTextActive: { color: Colors.white },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, gap: 10, ...Shadows.card },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  serviceIconBg: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center',
  },
  serviceName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  providerName: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 2 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 5, borderRadius: BorderRadius.full,
  },
  statusText: { fontSize: 11, fontWeight: FontWeight.bold },
  description: { fontSize: FontSize.sm, color: Colors.slate500, lineHeight: 19 },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dateText: { fontSize: FontSize.sm, color: Colors.slate400 },
  replyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: Colors.blue50, paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.blue200,
  },
  replyText: { fontSize: FontSize.xs, color: Colors.primary, fontWeight: FontWeight.semibold },
  empty: { paddingTop: 60, alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, textAlign: 'center' },
  emptyBody: { fontSize: FontSize.base, color: Colors.slate500, textAlign: 'center' },
  browseBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8,
    height: 48, backgroundColor: Colors.primary, paddingHorizontal: 24, borderRadius: BorderRadius.md,
  },
  browseBtnText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.white },
});
