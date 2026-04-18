import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius } from '../../constants/theme';

const RECENT = ['Plumber', 'AC Repair', 'Electrician'];
const POPULAR = [
  { icon: 'water-outline', label: 'Plumbing' },
  { icon: 'flash-outline', label: 'Electrical' },
  { icon: 'sparkles-outline', label: 'Cleaning' },
  { icon: 'thermometer-outline', label: 'AC Repair' },
  { icon: 'color-palette-outline', label: 'Painting' },
  { icon: 'hammer-outline', label: 'Carpentry' },
];
const SERVICE_RESULTS = [
  { icon: 'water-outline', name: 'Plumbing', providers: 14 },
  { icon: 'flash-outline', name: 'Electrical', providers: 9 },
  { icon: 'sparkles-outline', name: 'Cleaning', providers: 7 },
];
const PROVIDER_RESULTS = [
  { name: 'Rajesh Kumar', service: 'Plumber', rating: 4.9, city: 'Palanpur', initials: 'RK' },
  { name: 'Suresh Patel', service: 'Electrician', rating: 4.7, city: 'Ahmedabad', initials: 'SP' },
];

export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* Search bar header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={17} color={Colors.slate400} />
          <TextInput
            autoFocus
            style={styles.searchInput}
            placeholder="Search services or providers..."
            placeholderTextColor={Colors.slate400}
            value={query}
            onChangeText={setQuery}
          />
          {hasQuery && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={17} color={Colors.slate400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {!hasQuery ? (
          <>
            {/* Recent searches */}
            <Text style={styles.sectionLabel}>RECENT SEARCHES</Text>
            {RECENT.map(r => (
              <TouchableOpacity key={r} style={styles.recentRow} onPress={() => setQuery(r)}>
                <Ionicons name="time-outline" size={16} color={Colors.slate400} />
                <Text style={styles.recentText}>{r}</Text>
                <TouchableOpacity onPress={() => { }}>
                  <Ionicons name="close" size={14} color={Colors.slate300} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            {/* Popular */}
            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>POPULAR SERVICES</Text>
            <View style={styles.popularGrid}>
              {POPULAR.map(s => (
                <TouchableOpacity
                  key={s.label}
                  style={styles.popularChip}
                  onPress={() => setQuery(s.label)}>
                  <Ionicons name={s.icon as any} size={15} color={Colors.primary} />
                  <Text style={styles.popularText}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <>
            {/* Service results */}
            <Text style={styles.sectionLabel}>SERVICES</Text>
            {SERVICE_RESULTS.filter(s => s.name.toLowerCase().includes(query.toLowerCase())).map(s => (
              <TouchableOpacity
                key={s.name}
                style={styles.resultRow}
                onPress={() => navigation.navigate('Providers', { service: s.name })}>
                <View style={styles.resultIcon}>
                  <Ionicons name={s.icon as any} size={20} color={Colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>{s.name}</Text>
                  <Text style={styles.resultMeta}>{s.providers} providers available</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.slate300} />
              </TouchableOpacity>
            ))}

            {/* Provider results */}
            <Text style={[styles.sectionLabel, { marginTop: 20 }]}>PROVIDERS</Text>
            {PROVIDER_RESULTS.map(p => (
              <TouchableOpacity
                key={p.name}
                style={styles.resultRow}
                onPress={() => navigation.navigate('ProviderProfile', { provider: p })}>
                <View style={styles.providerAvatar}>
                  <Text style={styles.providerAvatarText}>{p.initials}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.resultName}>{p.name}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.resultMeta}>{p.service}</Text>
                    <Text style={styles.dot}>·</Text>
                    <Ionicons name="star" size={11} color="#FBBF24" />
                    <Text style={styles.resultMeta}>{p.rating}</Text>
                    <Text style={styles.dot}>·</Text>
                    <Text style={styles.resultMeta}>{p.city}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.slate300} />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center' },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    height: 48, backgroundColor: Colors.white, borderRadius: BorderRadius.md,
    paddingHorizontal: 14, borderWidth: 1.5, borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy, height: 48, padding: 0, outlineStyle: 'none' },
  scroll: { padding: 20, paddingBottom: 60 },
  sectionLabel: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12,
  },
  recentRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  recentText: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  popularChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 9, backgroundColor: Colors.blue50,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.blue200,
  },
  popularText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: Colors.primary },
  resultRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  resultIcon: {
    width: 42, height: 42, borderRadius: 12, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center',
  },
  resultName: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.darkNavy },
  resultMeta: { fontSize: FontSize.xs, color: Colors.slate500 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  dot: { fontSize: FontSize.xs, color: Colors.slate300 },
  providerAvatar: {
    width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.blue50,
    borderWidth: 1.5, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  providerAvatarText: { fontSize: 13, fontWeight: FontWeight.bold, color: Colors.primary },
});
