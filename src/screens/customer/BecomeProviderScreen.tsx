import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, ActivityIndicator, Modal, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
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

// ── Field wrapper ─────────────────────────────────────────
const Field = ({ label, children, required, hint }: any) => (
  <View style={styles.fieldBlock}>
    <Text style={styles.fieldLabel}>
      {label}
      {required && <Text style={{ color: '#EF4444' }}> *</Text>}
    </Text>
    {hint && <Text style={styles.fieldHint}>{hint}</Text>}
    {children}
  </View>
);

// ── Picker ────────────────────────────────────────────────
const PickerRow = ({ value, placeholder, options, onSelect }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity style={styles.pickerTrigger} onPress={() => setOpen(true)}>
        <Text style={value ? styles.pickerValue : styles.pickerPlaceholder}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={15} color="#AAAAAA" />
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
                  <Text style={[styles.pickerOptionText, value === opt && styles.pickerOptionTextActive]}>
                    {opt}
                  </Text>
                  {value === opt && <Ionicons name="checkmark" size={16} color="#FF6B00" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// ── Main Screen ───────────────────────────────────────────
export const BecomeProviderScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

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
    setTimeout(() => { setLoading(false); setSuccessVisible(true); }, 1800);
  };

  // ── Step renderers ──────────────────────────────────────
  const renderStep0 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Tell us about your business</Text>
      <Text style={styles.stepSubtitle}>This information helps customers understand your services better</Text>

      <Field label="Business Name" required>
        <TextInput
          style={styles.input}
          value={businessName}
          onChangeText={setBusinessName}
          placeholder="e.g. Kumar Plumbing Services"
          placeholderTextColor="#AAAAAA"
        />
        {businessName.trim().length > 0 && businessName.trim().length < 2 && (
          <Text style={styles.errorText}>Minimum 2 characters required</Text>
        )}
      </Field>

      <Field label="Business Description" required>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Describe your business, expertise, and what makes you stand out... (min 20 characters)"
          placeholderTextColor="#AAAAAA"
          multiline
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
          textAlignVertical="top"
          maxLength={500}
        />
        <View style={styles.charCountRow}>
          {description.trim().length > 0 && description.trim().length < 20 && (
            <Text style={styles.errorText}>At least 20 characters required</Text>
          )}
          <Text style={[styles.charCount, { marginLeft: 'auto' }]}>{description.length}/500</Text>
        </View>
      </Field>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Where is your business?</Text>
      <Text style={styles.stepSubtitle}>This helps customers find you in their area</Text>

      <Field label="Street Address" required>
        <TextInput
          style={styles.input}
          value={street}
          onChangeText={setStreet}
          placeholder="123 Main Street, Area"
          placeholderTextColor="#AAAAAA"
        />
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
        <TextInput
          style={styles.input}
          value={zipCode}
          onChangeText={setZipCode}
          placeholder="385001"
          placeholderTextColor="#AAAAAA"
          keyboardType="numeric"
          maxLength={6}
        />
        {zipCode.length > 0 && zipCode.length !== 6 && (
          <Text style={styles.errorText}>ZIP code must be 6 digits</Text>
        )}
      </Field>

      <Field label="Google Maps Link (Optional)">
        <TextInput
          style={styles.input}
          value={addressLink}
          onChangeText={setAddressLink}
          placeholder="https://maps.google.com/..."
          placeholderTextColor="#AAAAAA"
        />
      </Field>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>What services do you provide?</Text>
      <Text style={styles.stepSubtitle}>Select up to 6 services you offer</Text>

      <Field label="Services You Offer" required hint={`${selectedServices.length}/6 selected`}>
        <View style={styles.servicesGrid}>
          {SERVICES.slice(0, 16).map(s => {
            const active = selectedServices.includes(s.name);
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => toggleService(s.name)}>
                {active && <Ionicons name="checkmark-circle" size={12} color="#FF6B00" />}
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{s.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedServices.length === 0 && (
          <Text style={styles.errorText}>Please select at least one service</Text>
        )}
      </Field>

      <Field label="Service Area" required>
        <TextInput
          style={styles.input}
          value={serviceArea}
          onChangeText={setServiceArea}
          placeholder="e.g. Palanpur, Banaskantha"
          placeholderTextColor="#AAAAAA"
        />
      </Field>

      <Field label="Service Radius" hint="How far are you willing to travel?">
        <View style={styles.radiusRow}>
          {SERVICE_RADII.map(r => (
            <TouchableOpacity
              key={r}
              style={[styles.chip, serviceRadius === r && styles.chipActive]}
              onPress={() => setServiceRadius(r)}>
              <Text style={[styles.chipText, serviceRadius === r && styles.chipTextActive]}>{r} km</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Field>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Review Your Details</Text>
      <Text style={styles.stepSubtitle}>Verify all information before submitting</Text>

      {[
        { icon: 'business-outline', label: 'Business Name', value: businessName },
        { icon: 'document-text-outline', label: 'Description', value: description },
        { icon: 'location-outline', label: 'Address', value: `${street}, ${city}, ${state} - ${zipCode}` },
        { icon: 'construct-outline', label: 'Services', value: selectedServices.join(', ') },
        { icon: 'navigate-circle-outline', label: 'Service Area', value: `${serviceArea} (${serviceRadius} km radius)` },
      ].map(item => (
        <View key={item.label} style={styles.reviewRow}>
          <View style={styles.reviewIconBox}>
            <Ionicons name={item.icon as any} size={16} color="#FF6B00" />
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
    <View style={[styles.container, { height }]}>
      <StatusBar style="dark" />
      <TopBar
        title="Become a Provider"
        onBack={() => step > 0 ? setStep(step - 1) : navigation.goBack()}
      />

      {/* Step indicator */}
      <View style={styles.stepper}>
        {STEPS.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <React.Fragment key={s.key}>
              <View style={styles.stepItem}>
                <View style={[styles.stepDot, active && styles.stepDotActive, done && styles.stepDotDone]}>
                  {done
                    ? <Ionicons name="checkmark" size={13} color="#fff" />
                    : <Text style={[styles.stepDotNum, active && { color: '#fff' }]}>{i + 1}</Text>
                  }
                </View>
                <Text style={[styles.stepItemLabel, active && styles.stepItemLabelActive, done && styles.stepItemLabelDone]}>
                  {s.label}
                </Text>
              </View>
              {i < STEPS.length - 1 && (
                <View style={[styles.stepConnector, done && styles.stepConnectorDone]} />
              )}
            </React.Fragment>
          );
        })}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        {/* Buttons */}
        <View style={styles.btnRow}>
          {step > 0 && (
            <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(step - 1)}>
              <Ionicons name="chevron-back" size={17} color="#555" />
              <Text style={styles.prevBtnText}>Back</Text>
            </TouchableOpacity>
          )}
          {step < 3 ? (
            <TouchableOpacity
              style={[styles.nextBtn, !canNext() && { opacity: 0.4 }, step === 0 && { flex: 1 }]}
              onPress={() => setStep(step + 1)}
              disabled={!canNext()}>
              <Text style={styles.nextBtnText}>Continue</Text>
              <Ionicons name="chevron-forward" size={17} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextBtn, loading && { opacity: 0.7 }]}
              onPress={handleSubmit}
              disabled={loading}>
              {loading
                ? <ActivityIndicator color="#fff" size="small" />
                : <>
                  <Ionicons name="checkmark-circle-outline" size={17} color="#fff" />
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
            <View style={styles.successIconBox}>
              <Ionicons name="checkmark-circle" size={52} color="#22C55E" />
            </View>
            <Text style={styles.successTitle}>You're now a Provider! 🎉</Text>
            <Text style={styles.successBody}>
              Your provider profile is live. Customers can now discover and enquire about your services.
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => { setSuccessVisible(false); navigation.replace('ProviderTabs'); }}>
              <Text style={styles.successBtnText}>Go to Provider Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0', overflow: 'hidden' },
  scrollView: { flex: 1 },
  scroll: { padding: 18 },

  // ── Stepper ───────────────────────────────────────────
  stepper: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 18, paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#ECECEC',
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepDot: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#F5F4F0', borderWidth: 1.5, borderColor: '#ECECEC',
    alignItems: 'center', justifyContent: 'center',
  },
  stepDotActive: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  stepDotDone: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  stepDotNum: { fontSize: 11, fontWeight: '700', color: '#AAAAAA' },
  stepItemLabel: { fontSize: 9, fontWeight: '600', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: 0.4 },
  stepItemLabelActive: { color: '#FF6B00' },
  stepItemLabelDone: { color: '#FF6B00' },
  stepConnector: { flex: 1, height: 2, backgroundColor: '#ECECEC', marginBottom: 14 },
  stepConnectorDone: { backgroundColor: '#FF6B00' },

  // ── Step content ──────────────────────────────────────
  stepContent: { gap: 2, marginBottom: 20 },
  stepTitle: { fontSize: 18, fontWeight: '700', color: '#0D0D0D', marginBottom: 4, letterSpacing: -0.3 },
  stepSubtitle: { fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 16 },

  // ── Fields ────────────────────────────────────────────
  fieldBlock: { marginBottom: 16 },
  fieldLabel: { fontSize: 10, fontWeight: '700', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  fieldHint: { fontSize: 11, color: '#AAAAAA', marginBottom: 8, marginTop: -2 },
  input: {
    height: 48, borderWidth: 1.5, borderColor: '#ECECEC', borderRadius: 12,
    backgroundColor: '#FFFFFF', paddingHorizontal: 14,
    fontSize: 13, color: '#0D0D0D',
    outlineWidth: 0, outlineStyle: 'none',
  } as any,
  textarea: { height: 110, paddingTop: 12, textAlignVertical: 'top' },
  charCount: { fontSize: 11, color: '#AAAAAA', textAlign: 'right', marginTop: 4 },
  charCountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  errorText: { fontSize: 11, color: '#EF4444', marginTop: 4 },
  twoCol: { flexDirection: 'row', gap: 10 },

  // ── Picker ────────────────────────────────────────────
  pickerTrigger: {
    height: 48, borderWidth: 1.5, borderColor: '#ECECEC', borderRadius: 12,
    backgroundColor: '#FFFFFF', paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    outlineWidth: 0, outlineStyle: 'none',
  } as any,
  pickerValue: { fontSize: 13, color: '#0D0D0D' },
  pickerPlaceholder: { fontSize: 13, color: '#AAAAAA' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  pickerSheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 22, borderTopRightRadius: 22,
    padding: 20, paddingBottom: 40,
  },
  pickerHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: '#ECECEC', alignSelf: 'center', marginBottom: 14 },
  pickerSheetTitle: { fontSize: 15, fontWeight: '700', color: '#0D0D0D', marginBottom: 12 },
  pickerOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  pickerOptionActive: { backgroundColor: '#FFF4ED' },
  pickerOptionText: { fontSize: 14, color: '#0D0D0D' },
  pickerOptionTextActive: { color: '#FF6B00', fontWeight: '700' },

  // ── Chips ─────────────────────────────────────────────
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  radiusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 13, paddingVertical: 8, borderRadius: 99,
    borderWidth: 1.5, borderColor: '#ECECEC', backgroundColor: '#FFFFFF',
  },
  chipActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  chipText: { fontSize: 12, color: '#888', fontWeight: '500' },
  chipTextActive: { color: '#FF6B00', fontWeight: '700' },

  // ── Review rows ───────────────────────────────────────
  reviewRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#ECECEC', marginBottom: 10,
  },
  reviewIconBox: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#FFF4ED', borderWidth: 1.5, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  reviewLabel: { fontSize: 10, fontWeight: '700', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: 0.6 },
  reviewValue: { fontSize: 13, color: '#0D0D0D', marginTop: 3, lineHeight: 18 },

  // ── Buttons ───────────────────────────────────────────
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 8 },
  prevBtn: {
    height: 50, borderRadius: 14, borderWidth: 1.5, borderColor: '#ECECEC',
    backgroundColor: '#FFFFFF', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 4, paddingHorizontal: 18,
  },
  prevBtnText: { fontSize: 13, color: '#555', fontWeight: '600' },
  nextBtn: {
    flex: 1, height: 50, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  nextBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // ── Success modal ─────────────────────────────────────
  successOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  successCard: {
    backgroundColor: '#FFFFFF', borderRadius: 22, padding: 28,
    alignItems: 'center', width: '100%',
  },
  successIconBox: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: '#F0FDF4', borderWidth: 2, borderColor: '#BBF7D0',
    alignItems: 'center', justifyContent: 'center', marginBottom: 18,
  },
  successTitle: { fontSize: 20, fontWeight: '800', color: '#0D0D0D', textAlign: 'center', marginBottom: 8, letterSpacing: -0.4 },
  successBody: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20, marginBottom: 22 },
  successBtn: {
    width: '100%', height: 50, backgroundColor: '#FF6B00',
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  successBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
