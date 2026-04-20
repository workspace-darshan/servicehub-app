import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { NOTIFICATIONS } from '../../data/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TYPE_CFG: Record<string, { icon: IoniconName; color: string; bg: string }> = {
  enquiry: { icon: 'mail-outline', color: Colors.primary, bg: Colors.blue50 },
  reply: { icon: 'chatbubble-outline', color: '#166534', bg: '#DCFCE7' },
  review: { icon: 'star-outline', color: '#854D0E', bg: '#FEF9C3' },
  system: { icon: 'notifications-outline', color: Colors.slate500, bg: Colors.surfaceContainerLow },
};

export const NotificationsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={[styles.header, { paddingTop: 14 + insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
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
              activeOpacity={0.75}>
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
            <Ionicons name="notifications-off-outline" size={56} color={Colors.slate300} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyBody}>No new notifications right now.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  markRead: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semibold },
  groupLabel: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.5, paddingHorizontal: 20, paddingVertical: 14,
  },
  row: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
    position: 'relative',
  },
  rowUnread: { backgroundColor: '#F8FAFF' },
  unreadDot: {
    position: 'absolute', left: 8, top: '50%',
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary,
  },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  rowContent: { flex: 1 },
  rowTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy, lineHeight: 20 },
  rowBody: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 3, lineHeight: 18 },
  timeAgo: { fontSize: FontSize.xs, color: Colors.slate400, flexShrink: 0, marginTop: 2 },
  empty: { paddingTop: 80, alignItems: 'center', gap: 10, paddingHorizontal: 40 },
  emptyTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, textAlign: 'center' },
  emptyBody: { fontSize: FontSize.base, color: Colors.slate500, textAlign: 'center' },
});
