import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

export const SendEnquiryScreen = ({ navigation, route }: any) => {
  const provider = route?.params?.provider || {
    name: 'Rajesh Kumar', service: 'Plumber', initials: 'RK',
  };

  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  const Field = ({ label, icon, children }: any) => (
    <View style={styles.fieldBlock}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
      <View style={styles.inputRow}>
        {icon && <Ionicons name={icon} size={17} color={Colors.slate400} style={{ marginRight: 10 }} />}
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
        <Text style={styles.headerTitle}>Send Enquiry</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Provider mini card */}
        <View style={styles.providerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{provider.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerService}>{provider.service}</Text>
          </View>
          <Ionicons name="shield-checkmark" size={18} color={Colors.primary} />
        </View>

        {/* Service */}
        <Field label="SERVICE TYPE" icon="construct-outline">
          <TextInput
            style={styles.bareInput}
            defaultValue={provider.service}
            placeholderTextColor={Colors.slate400}
          />
        </Field>

        {/* Description */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>DESCRIBE YOUR REQUIREMENT <Text style={{ color: Colors.errorRed }}>*</Text></Text>
          <TextInput
            style={styles.textarea}
            placeholder="e.g. My kitchen sink is leaking and needs replacement urgently..."
            placeholderTextColor={Colors.slate400}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        <Field label="PREFERRED DATE" icon="calendar-outline">
          <TextInput style={styles.bareInput} placeholder="e.g. Mar 25, 2026" placeholderTextColor={Colors.slate400} />
        </Field>

        <Field label="PREFERRED TIME" icon="time-outline">
          <TextInput style={styles.bareInput} placeholder="e.g. 10:00 AM" placeholderTextColor={Colors.slate400} />
        </Field>

        <Field label="YOUR ADDRESS" icon="location-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="Enter your service address..."
            placeholderTextColor={Colors.slate400}
            value={address}
            onChangeText={setAddress}
          />
        </Field>

        {/* Photo upload */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>PHOTOS (OPTIONAL)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="camera-outline" size={28} color={Colors.slate400} />
            <Text style={styles.uploadText}>Add up to 3 photos</Text>
            <Text style={styles.uploadHint}>JPG, PNG · Max 5MB each</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 16 }} />

        <TouchableOpacity
          style={[styles.submitBtn, (!description.trim() || loading) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={!description.trim() || loading}>
          {loading
            ? <ActivityIndicator color={Colors.white} size="small" />
            : <>
              <Ionicons name="paper-plane-outline" size={18} color={Colors.white} />
              <Text style={styles.submitBtnText}>Send Enquiry</Text>
            </>}
        </TouchableOpacity>
      </ScrollView>

      {/* Success modal */}
      <Modal transparent visible={success} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconBg}>
              <Ionicons name="checkmark-circle" size={56} color={Colors.successGreen} />
            </View>
            <Text style={styles.successTitle}>Enquiry Sent!</Text>
            <Text style={styles.successBody}>
              {provider.name} will contact you soon. You'll get a notification when they respond.
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => { setSuccess(false); navigation.navigate('Activity'); }}>
              <Text style={styles.successBtnText}>View My Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scroll: { padding: 20, paddingBottom: 60 },
  providerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.white, borderRadius: 14, padding: 14, marginBottom: 20, ...Shadows.card,
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: Colors.blue50,
    borderWidth: 2, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: FontWeight.bold, color: Colors.primary },
  providerName: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  providerService: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 2 },
  fieldBlock: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    height: 52, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14,
  },
  bareInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy },
  textarea: {
    height: 120, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14, paddingTop: 14,
    fontSize: FontSize.base, color: Colors.darkNavy,
  },
  uploadBox: {
    borderWidth: 1.5, borderColor: Colors.border, borderStyle: 'dashed',
    borderRadius: BorderRadius.md, padding: 20, alignItems: 'center', gap: 6,
  },
  uploadText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.slate500 },
  uploadHint: { fontSize: FontSize.xs, color: Colors.slate400 },
  submitBtn: {
    height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  submitBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  successCard: { backgroundColor: Colors.white, borderRadius: 24, padding: 28, alignItems: 'center', width: '100%' },
  successIconBg: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  successTitle: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy, marginBottom: 10 },
  successBody: { fontSize: FontSize.base, color: Colors.slate500, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  successBtn: {
    width: '100%', height: 52, backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center',
  },
  successBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
