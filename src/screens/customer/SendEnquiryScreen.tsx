import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';

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
        {icon && <Ionicons name={icon} size={17} color="#888888" style={{ marginRight: 10 }} />}
        {children}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />

      {/* Top Bar */}
      <TopBar
        title="Send Enquiry"
        subtitle={`To ${provider.name}`}
        onBack={() => navigation.goBack()}
      />

      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}>
        {/* Provider mini card */}
        <View style={styles.providerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{provider.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.providerName}>{provider.name}</Text>
            <Text style={styles.providerService}>{provider.service}</Text>
          </View>
          <Ionicons name="shield-checkmark" size={18} color="#FF6B00" />
        </View>

        {/* Service */}
        <Field label="SERVICE TYPE" icon="construct-outline">
          <TextInput
            style={styles.bareInput}
            defaultValue={provider.service}
            placeholderTextColor="#888888"
          />
        </Field>

        {/* Description */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>DESCRIBE YOUR REQUIREMENT <Text style={{ color: '#EF4444' }}>*</Text></Text>
          <TextInput
            style={styles.textarea}
            placeholder="e.g. My kitchen sink is leaking and needs replacement urgently..."
            placeholderTextColor="#888888"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </View>

        <Field label="PREFERRED DATE" icon="calendar-outline">
          <TextInput style={styles.bareInput} placeholder="e.g. Mar 25, 2026" placeholderTextColor="#888888" />
        </Field>

        <Field label="PREFERRED TIME" icon="time-outline">
          <TextInput style={styles.bareInput} placeholder="e.g. 10:00 AM" placeholderTextColor="#888888" />
        </Field>

        <Field label="YOUR ADDRESS" icon="location-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="Enter your service address..."
            placeholderTextColor="#888888"
            value={address}
            onChangeText={setAddress}
          />
        </Field>

        {/* Photo upload */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>PHOTOS (OPTIONAL)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Ionicons name="camera-outline" size={28} color="#888888" />
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
            ? <ActivityIndicator color="#FFFFFF" size="small" />
            : <>
              <Ionicons name="paper-plane-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>Send Enquiry</Text>
            </>}
        </TouchableOpacity>
      </ScrollView>

      {/* Success modal */}
      <Modal transparent visible={success} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconBg}>
              <Ionicons name="checkmark-circle" size={56} color="#16A34A" />
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scroll: { padding: 18, paddingBottom: 100 },
  providerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 20,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  avatar: {
    width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFF4ED',
    borderWidth: 2, borderColor: '#FF6B00', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 14, fontWeight: '700' as any, color: '#FF6B00' },
  providerName: { fontSize: 15, fontWeight: '700' as any, color: '#0D0D0D' },
  providerService: { fontSize: 12, color: '#888888', marginTop: 2 },
  fieldBlock: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 10, fontWeight: '600' as any, color: '#888888',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    height: 48, borderWidth: 1, borderColor: '#ECECEC', borderRadius: 14,
    backgroundColor: '#FFFFFF', paddingHorizontal: 14,
  },
  bareInput: {
    flex: 1, fontSize: 13, color: '#0D0D0D',
    outlineWidth: 0,
  },
  textarea: {
    height: 120, borderWidth: 1, borderColor: '#ECECEC', borderRadius: 14,
    backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingTop: 14,
    fontSize: 13, color: '#0D0D0D',
    outlineWidth: 0,
  },
  uploadBox: {
    borderWidth: 1.5, borderColor: '#ECECEC', borderStyle: 'dashed',
    borderRadius: 14, padding: 20, alignItems: 'center', gap: 6,
    backgroundColor: '#FFFFFF',
  },
  uploadText: { fontSize: 13, fontWeight: '600' as any, color: '#888888' },
  uploadHint: { fontSize: 11, color: '#888888' },
  submitBtn: {
    height: 48, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  submitBtnText: { fontSize: 15, fontWeight: '700' as any, color: '#FFFFFF' },
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  successCard: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 28,
    alignItems: 'center', width: '100%', maxWidth: 400,
  },
  successIconBg: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  successTitle: {
    fontSize: 22, fontWeight: '700' as any, color: '#0D0D0D',
    marginBottom: 10, letterSpacing: -0.4,
  },
  successBody: {
    fontSize: 13, color: '#888888', textAlign: 'center',
    lineHeight: 20, marginBottom: 24,
  },
  successBtn: {
    width: '100%', height: 48, backgroundColor: '#FF6B00',
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  successBtnText: { fontSize: 15, fontWeight: '700' as any, color: '#FFFFFF' },
});
