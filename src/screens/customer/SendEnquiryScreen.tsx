import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Modal, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
import { enquiryService } from '../../services';
import * as validation from '../../utils/validation';
import { APP_CONFIG } from '../../config';

export const SendEnquiryScreen = ({ navigation, route }: any) => {
  const providerId = route?.params?.providerId || route?.params?.provider?.id;
  const provider = route?.params?.provider || {
    name: 'Provider', service: 'Service', initials: 'P',
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};

    if (!title.trim() || title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!description.trim() || description.length < APP_CONFIG.MIN_DESCRIPTION_LENGTH) {
      newErrors.description = `Description must be at least ${APP_CONFIG.MIN_DESCRIPTION_LENGTH} characters`;
    }

    if (!customerName.trim() || customerName.length < APP_CONFIG.MIN_NAME_LENGTH) {
      newErrors.customerName = 'Name is required';
    }

    if (!validation.isValidPhone(customerPhone)) {
      newErrors.customerPhone = 'Invalid phone number';
    }

    if (customerEmail && !validation.isValidEmail(customerEmail)) {
      newErrors.customerEmail = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    try {
      setLoading(true);

      const response = await enquiryService.createEnquiry({
        providerId,
        serviceId: provider.serviceId || 'default-service-id',
        title: title.trim(),
        description: description.trim(),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        location: address.trim() || undefined,
        preferredDate: preferredDate.trim() || undefined,
        budget: budget ? parseFloat(budget) : undefined,
      });

      if (response.success) {
        setSuccess(true);
      } else {
        Alert.alert('Error', response.message || 'Failed to send enquiry');
      }
    } catch (err: any) {
      console.error('Error sending enquiry:', err);
      Alert.alert('Error', err.message || 'Failed to send enquiry');
    } finally {
      setLoading(false);
    }
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
        <Field label="TITLE" icon="text-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="e.g. Kitchen Sink Repair"
            placeholderTextColor="#888888"
            value={title}
            onChangeText={setTitle}
          />
        </Field>
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

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
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Field label="YOUR NAME" icon="person-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="Enter your name"
            placeholderTextColor="#888888"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </Field>
        {errors.customerName && <Text style={styles.errorText}>{errors.customerName}</Text>}

        <Field label="YOUR PHONE" icon="call-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="Enter your phone number"
            placeholderTextColor="#888888"
            keyboardType="phone-pad"
            value={customerPhone}
            onChangeText={setCustomerPhone}
          />
        </Field>
        {errors.customerPhone && <Text style={styles.errorText}>{errors.customerPhone}</Text>}

        <Field label="YOUR EMAIL (OPTIONAL)" icon="mail-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="Enter your email"
            placeholderTextColor="#888888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={customerEmail}
            onChangeText={setCustomerEmail}
          />
        </Field>
        {errors.customerEmail && <Text style={styles.errorText}>{errors.customerEmail}</Text>}

        <Field label="PREFERRED DATE" icon="calendar-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="e.g. Mar 25, 2026"
            placeholderTextColor="#888888"
            value={preferredDate}
            onChangeText={setPreferredDate}
          />
        </Field>

        <Field label="BUDGET (OPTIONAL)" icon="cash-outline">
          <TextInput
            style={styles.bareInput}
            placeholder="e.g. 5000"
            placeholderTextColor="#888888"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
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
          style={[styles.submitBtn, (!description.trim() || !customerName.trim() || !customerPhone.trim() || loading) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          disabled={!description.trim() || !customerName.trim() || !customerPhone.trim() || loading}>
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
