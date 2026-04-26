import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NOTIFICATIONS } from '../../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TYPE_CFG: Record<string, { icon: IoniconName; color: string; bg: string }> = {
  enquiry: { icon: 'mail-outline',          color: '#FF6B00', bg: '#FFF4ED' },
  reply:   { icon: 'chatbubble-outline',    color: '#16A34A', bg: '#DCFCE7' },
  review:  { icon: 'star-outline',          color: '#CA8A04', bg: '#FEF9C3' },
  system:  { icon: 'notifications-outline', color: '#888888', bg: '#F5F4F0' },
};

export const NotificationsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { paddingTop: 14 + insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#0D0D0D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <Text style={styles.groupLabel}>TODAY</Text>
        }
        renderItem={({ item }) => {
          const cfg = TYPE_CFG[item.type] || TYPE_CFG['system'];
          return (
            <TouchableOpacity
              style={[styles.row, !item.read && styles.rowUnread]}
              activeOpacity={0.7}>
              {!item.read && <View style={styles.unreadDot} />}
              <View style={[styles.iconCircle, { backgroundColor: cfg.bg }]}>
                <Ionicons name={cfg.icon} size={20} color={cfg.color} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowBody} numberOfLines={2}>{item.body}</Text>
              </View>
              <Text style={styles.timeAgo}>{item.time}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={56} color="#DDDDDD" />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyBody}>No new notifications right now.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 14,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#ECECEC',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.3 },
  markRead: { fontSize: 12, color: '#FF6B00', fontWeight: '600' },

  groupLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1.5,
    paddingHorizontal: 20, paddingVertical: 14,
  },

  row: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#ECECEC',
    position: 'relative',
  },
  rowUnread: { backgroundColor: '#FFF9F5' },
  unreadDot: {
    position: 'absolute', left: 8, top: '50%',
    width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF6B00',
  },

  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    borderWidth: 1, borderColor: '#ECECEC',
  },

  rowContent: { flex: 1 },
  rowTitle: { fontSize: 14, fontWeight: '700', color: '#0D0D0D', lineHeight: 20 },
  rowBody: { fontSize: 12, color: '#888', marginTop: 3, lineHeight: 18 },
  timeAgo: { fontSize: 11, color: '#AAAAAA', flexShrink: 0, marginTop: 2 },

  empty: { paddingTop: 80, alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D', textAlign: 'center' },
  emptyBody: { fontSize: 13, color: '#888', textAlign: 'center' },
});
