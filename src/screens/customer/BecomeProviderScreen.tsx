import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
import { SERVICES } from '../../data/mockData';

const INDIAN_CITIES = ['Palanpur', 'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Mumbai', 'Pune', 'Delhi', 'Jaipur', 'Chandigarh', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
const INDIAN_STATES = ['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'Tamil Nadu', 'West Bengal', 'Punjab', 'Haryana', 'Telangana'];
const SERVICE_RADII = [5, 10, 15, 20, 30, 50];

const STEPS = [
  { key: 'business', label: 'Business', icon: 'business-outline' },
  { key: 'address', label: 'Address', icon: 'location-outline' },
  { key: 'services', label: 'Services', icon: 'construct-outline' },
  { key: 'review', label: 'Review', icon: 'checkmark-circle-outline' },
];

// — Minimal Field Wrapper —
const Field = ({ label, children, required }: any) => (
  <View style={styles.fieldBlock}>
    <Text style={styles.fieldLabel}>{label}{required && <Text style={{ color: Colors.errorRed }}> *</Text>}</Text>
    {children}
  </View>
);

const textInput = (props: any) => (
  <TextInput
    style={styles.input}
    placeholderTextColor={Colors.slate400}
    {...props}
  />
);

// — Picker row (tap to open simple list) —
const PickerRow = ({ value, placeholder, options, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.pickerTrigger} onPress={() => setOpen(true)}>
        <Text style={value ? styles.pickerValueText : styles.pickerPlaceholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={Colors.slate400} />
      </TouchableOpacity>
      <Modal transparent visible={open} animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setOpen(false)} activeOpacity={1}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <Text style={styles.pickerSheetTitle}>{placeholder}</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 320 }}>
              {options.map((opt: string) => (
                <TouchableOpacity
                  key={opt}
                  style={[styles.pickerOption, value === opt && styles.pickerOptionActive]}
                  onPress={() => { onSelect(opt); setOpen(false); }}>
                  <Text style={[styles.pickerOptionText, value === opt && { color: Colors.primary, fontWeight: FontWeight.bold }]}>
                    {opt}
                  </Text>
                  {value === opt && <Ionicons name="checkmark" size={16} color={Colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export const BecomeProviderScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  // Form state
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressLink, setAddressLink] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceArea, setServiceArea] = useState('');
  const [serviceRadius, setServiceRadius] = useState(10);

  const canNext = () => {
    if (step === 0) return businessName.trim().length >= 2 && description.trim().length >= 20;
    if (step === 1) return street.trim() && city && state && zipCode.length === 6;
    if (step === 2) return selectedServices.length > 0 && serviceArea.trim();
    return true;
  };

  const toggleService = (name: string) => {
    setSelectedServices(prev =>
      prev.includes(name) ? prev.filter(s => s !== name) : prev.length < 6 ? [...prev, name] : prev
    );
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessVisible(true);
    }, 1800);
  };

  // — Step Renderers —
  const renderStep0 = () => (
    <View style={{ gap: 4 }}>
      <Field label="Business Name" required>
        {textInput({ value: businessName, onChangeText: setBusinessName, placeholder: 'e.g. Kumar Plumbing Services' })}
      </Field>
      <Field label="Business Description" required>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholderTextColor={Colors.slate400}
          placeholder="Describe your business, expertise, and what makes you stand out... (min 20 characters)"
          multiline
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
          maxLength={500}
        />
        <Text style={styles.charCount}>{description.length}/500</Text>
      </Field>
    </View>
  );

  const renderStep1 = () => (
    <View style={{ gap: 4 }}>
      <Field label="Street Address" required>
        {textInput({ value: street, onChangeText: setStreet, placeholder: '123 Main Street, Area' })}
      </Field>
      <View style={styles.twoCol}>
        <View style={{ flex: 1 }}>
          <Field label="City" required>
            <PickerRow value={city} placeholder="Select City" options={INDIAN_CITIES} onSelect={setCity} />
          </Field>
        </View>
        <View style={{ flex: 1 }}>
          <Field label="State" required>
            <PickerRow value={state} placeholder="Select State" options={INDIAN_STATES} onSelect={setState} />
          </Field>
        </View>
      </View>
      <Field label="ZIP Code" required>
        {textInput({ value: zipCode, onChangeText: setZipCode, placeholder: '385001', keyboardType: 'numeric', maxLength: 6 })}
      </Field>
      <Field label="Google Maps Link (Optional)">
        {textInput({ value: addressLink, onChangeText: setAddressLink, placeholder: 'https://maps.google.com/...' })}
      </Field>
    </View>
  );

  const renderStep2 = () => (
    <View style={{ gap: 4 }}>
      <Field label="Services You Offer" required>
        <Text style={styles.fieldHint}>Select up to 6 services</Text>
        <View style={styles.servicesGrid}>
          {SERVICES.slice(0, 16).map(s => {
            const active = selectedServices.includes(s.name);
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.serviceChip, active && styles.serviceChipActive]}
                onPress={() => toggleService(s.name)}>
                {active && <Ionicons name="checkmark-circle" size={13} color={Colors.primary} />}
                <Text style={[styles.serviceChipText, active && { color: Colors.primary, fontWeight: FontWeight.bold }]}>
                  {s.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Field>

      <Field label="Service Area" required>
        {textInput({ value: serviceArea, onChangeText: setServiceArea, placeholder: 'e.g. Palanpur, Banaskantha' })}
      </Field>

      <Field label="Service Radius">
        <View style={styles.radiusRow}>
          {SERVICE_RADII.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.radiusChip, serviceRadius === r && styles.radiusChipActive]}
              onPress={() => setServiceRadius(r)}>
              <Text style={[styles.radiusChipText, serviceRadius === r && { color: Colors.primary, fontWeight: FontWeight.bold }]}>
                {r} km
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>
    </View>
  );

  const renderStep3 = () => (
    <View style={{ gap: 12 }}>
      <Text style={styles.reviewTitle}>Review Your Details</Text>
      {[
        { icon: 'business-outline', label: 'Business Name', value: businessName },
        { icon: 'document-text-outline', label: 'Description', value: description },
        { icon: 'location-outline', label: 'Address', value: `${street}, ${city}, ${state} - ${zipCode}` },
        { icon: 'construct-outline', label: 'Services', value: selectedServices.join(', ') },
        { icon: 'navigate-circle-outline', label: 'Service Area', value: `${serviceArea} (${serviceRadius} km radius)` },
      ].map(item => (
        <View key={item.label} style={styles.reviewRow}>
          <View style={styles.reviewIcon}>
            <Ionicons name={item.icon as any} size={18} color={Colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.reviewLabel}>{item.label}</Text>
            <Text style={styles.reviewValue} numberOfLines={3}>{item.value || '—'}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 0 ? setStep(step - 1) : navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Become a Provider</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step progress */}
      <View style={styles.stepperWrap}>
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <React.Fragment key={s.key}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, done && styles.stepDone, active && styles.stepActive]}>
                  {done
                    ? <Ionicons name="checkmark" size={14} color={Colors.white} />
                    : <Ionicons name={s.icon as any} size={14} color={active ? Colors.white : Colors.slate400} />}
                </View>
                <Text style={[styles.stepLabel, active && { color: Colors.primary, fontWeight: FontWeight.bold }]}>{s.label}</Text>
              </View>
              {i < STEPS.length - 1 && (
                <View style={[styles.stepConnector, done && { backgroundColor: Colors.primary }]} />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <View style={{ height: 24 }} />

        {/* Navigation buttons */}
        <View style={styles.btnRow}>
          {step > 0 && (
            <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(step - 1)}>
              <Ionicons name="chevron-back" size={18} color={Colors.slate500} />
              <Text style={styles.prevBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          {step < 3 ? (
            <TouchableOpacity
              style={[styles.nextBtn, !canNext() && { opacity: 0.4 }, step === 0 && { flex: 1 }]}
              onPress={() => setStep(step + 1)}
              disabled={!canNext()}>
              <Text style={styles.nextBtnText}>Continue</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading
                ? <ActivityIndicator color={Colors.white} size="small" />
                : <>
                  <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
                  <Text style={styles.nextBtnText}>Submit & Become Provider</Text>
                </>}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Success modal */}
      <Modal transparent visible={successVisible} animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconBg}>
              <Ionicons name="checkmark-circle" size={56} color={Colors.successGreen} />
            </View>
            <Text style={styles.successTitle}>You're now a Provider! 🎉</Text>
            <Text style={styles.successBody}>
              Your provider profile is live. Customers can now discover and enquire about your services.
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => {
                setSuccessVisible(false);
                navigation.replace('ProviderTabs');
              }}>
              <Text style={styles.successBtnText}>Go to Provider Dashboard</Text>
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
  stepperWrap: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 16,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: Colors.surfaceContainerLow, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  stepDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stepActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stepLabel: { fontSize: 9, color: Colors.slate400, fontWeight: FontWeight.medium, textTransform: 'uppercase', letterSpacing: 0.5 },
  stepConnector: { flex: 1, height: 2, backgroundColor: Colors.border, marginBottom: 14, marginHorizontal: 4 },
  scroll: { padding: 20, paddingBottom: 40 },
  fieldBlock: { marginBottom: 18 },
  fieldLabel: {
    fontSize: 11, fontWeight: FontWeight.bold, color: Colors.slate500,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  fieldHint: { fontSize: FontSize.xs, color: Colors.slate400, marginBottom: 10 },
  input: {
    height: 52, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14,
    fontSize: FontSize.base, color: Colors.darkNavy, paddingVertical: 0,
  },
  textarea: { height: 120, paddingTop: 14, textAlignVertical: 'top' },
  charCount: { fontSize: FontSize.xs, color: Colors.slate400, textAlign: 'right', marginTop: 4 },
  twoCol: { flexDirection: 'row', gap: 12 },
  pickerTrigger: {
    height: 52, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  pickerValueText: { fontSize: FontSize.base, color: Colors.darkNavy },
  pickerPlaceholder: { fontSize: FontSize.base, color: Colors.slate400 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  pickerSheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 40,
  },
  pickerHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.border, alignSelf: 'center', marginBottom: 16 },
  pickerSheetTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 12 },
  pickerOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  pickerOptionActive: { backgroundColor: Colors.blue50 },
  pickerOptionText: { fontSize: FontSize.lg, color: Colors.darkNavy },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  serviceChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: BorderRadius.full,
    borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white,
  },
  serviceChipActive: { borderColor: Colors.primary, backgroundColor: Colors.blue50 },
  serviceChipText: { fontSize: FontSize.sm, color: Colors.slate500, fontWeight: FontWeight.medium },
  radiusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  radiusChip: {
    paddingHorizontal: 16, paddingVertical: 9,
    borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.white,
  },
  radiusChipActive: { borderColor: Colors.primary, backgroundColor: Colors.blue50 },
  radiusChipText: { fontSize: FontSize.sm, color: Colors.slate500 },
  reviewTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 4 },
  reviewRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: Colors.white, borderRadius: BorderRadius.md, padding: 14, ...Shadows.card,
  },
  reviewIcon: {
    width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  reviewLabel: { fontSize: 11, fontWeight: FontWeight.bold, color: Colors.slate400, textTransform: 'uppercase', letterSpacing: 0.8 },
  reviewValue: { fontSize: FontSize.base, color: Colors.darkNavy, marginTop: 2, lineHeight: 20 },
  btnRow: { flexDirection: 'row', gap: 12 },
  prevBtn: {
    height: 52, borderRadius: BorderRadius.md, borderWidth: 1.5, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4,
    paddingHorizontal: 20,
  },
  prevBtnText: { fontSize: FontSize.base, color: Colors.slate500, fontWeight: FontWeight.semibold },
  nextBtn: {
    flex: 1, height: 52, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  nextBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  successOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  successCard: {
    backgroundColor: Colors.white, borderRadius: 24, padding: 28, alignItems: 'center', width: '100%',
  },
  successIconBg: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: Colors.completedBg, alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  successTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.extrabold, color: Colors.darkNavy, textAlign: 'center', marginBottom: 10 },
  successBody: { fontSize: FontSize.lg, color: Colors.slate500, textAlign: 'center', lineHeight: 24, marginBottom: 24 },
  successBtn: {
    width: '100%', height: 52, backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center',
  },
  successBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
