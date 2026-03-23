import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const OFFERED_SERVICES = ['Plumbing', 'Bathroom Fitting', 'Pipe Installation', 'Leak Repair', 'Drainage Cleaning'];

export const ProviderEditProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.goBack(); }, 1200);
  };

  const Row = ({ icon, label, children }: any) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        {icon && <Ionicons name={icon} size={16} color={Colors.slate400} style={{ marginRight: 10 }} />}
        {children}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Provider Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarArea}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={14} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.photoHint}>Business photo / logo</Text>
        </View>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <Row icon="business-outline" label="BUSINESS NAME">
          <TextInput style={styles.bareInput} defaultValue="Rajesh Kumar Plumbing" placeholderTextColor={Colors.slate400} />
        </Row>

        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>BUSINESS DESCRIPTION</Text>
          <TextInput
            style={styles.textarea}
            defaultValue="Expert in residential and commercial plumbing with 8+ years of experience."
            multiline numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={Colors.slate400}
          />
        </View>

        <Row icon="phone-portrait-outline" label="CONTACT PHONE">
          <TextInput style={styles.bareInput} defaultValue="+91 9876543210" keyboardType="phone-pad" placeholderTextColor={Colors.slate400} />
        </Row>

        <Row icon="location-outline" label="CITY">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Gujarat" placeholderTextColor={Colors.slate400} />
        </Row>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Services Offered</Text>
        <View style={styles.servicesWrap}>
          {OFFERED_SERVICES.map(s => (
            <TouchableOpacity key={s} style={styles.serviceChip}>
              <Text style={styles.serviceChipText}>{s}</Text>
              <Ionicons name="close" size={13} color={Colors.primary} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addChip}>
            <Ionicons name="add" size={16} color={Colors.primary} />
            <Text style={styles.addChipText}>Add Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Service Area</Text>
        <Row icon="navigate-circle-outline" label="SERVICE AREA">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Banaskantha" placeholderTextColor={Colors.slate400} />
        </Row>
        <Row icon="expand-outline" label="RADIUS">
          <TextInput style={styles.bareInput} defaultValue="10 km" keyboardType="numeric" placeholderTextColor={Colors.slate400} />
        </Row>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}>
          {loading
            ? <ActivityIndicator color={Colors.white} />
            : <>
              <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </>}
        </TouchableOpacity>
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
  headerTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  scroll: { padding: 20, paddingBottom: 60 },
  avatarArea: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.blue50,
    borderWidth: 3, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: FontWeight.bold, color: Colors.primary },
  cameraBtn: {
    position: 'absolute', bottom: 22, right: '36%',
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.primary,
    borderWidth: 2, borderColor: Colors.white, alignItems: 'center', justifyContent: 'center',
  },
  photoHint: { fontSize: FontSize.xs, color: Colors.slate400, marginTop: 6 },
  sectionTitle: {
    fontSize: 11, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14,
  },
  fieldBlock: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 7,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    height: 52, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14,
  },
  bareInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy },
  textarea: {
    height: 110, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14, paddingTop: 14,
    fontSize: FontSize.base, color: Colors.darkNavy,
  },
  servicesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  serviceChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.blue50, paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.blue200,
  },
  serviceChipText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semibold },
  addChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed',
  },
  addChipText: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: FontWeight.semibold },
  saveBtn: {
    height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  saveBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
