import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const OFFERED_SERVICES = ['Plumbing', 'Bathroom Fitting', 'Pipe Installation', 'Leak Repair', 'Drainage Cleaning'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const LANGUAGES = ['English', 'Hindi', 'Gujarati', 'Marathi'];

export const ProviderEditProfileScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [startTime, setStartTime] = useState('9:00 AM');
  const [endTime, setEndTime] = useState('6:00 PM');
  const [selectedLanguages, setSelectedLanguages] = useState(['English', 'Hindi']);
  const [photos, setPhotos] = useState([1, 2, 3]); // Mock photo IDs
  const insets = useSafeAreaInsets();

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.goBack(); }, 1200);
  };

  const Row = ({ icon, label, children }: any) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        {icon && <Ionicons name={icon} size={16} color="#888" style={{ marginRight: 10 }} />}
        {children}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header with Blur */}
      <BlurView intensity={100} tint="light" style={[styles.headerAbsolute, { paddingTop: 10 + insets.top }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#0D0D0D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 40 }} />
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarArea}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={14} />
          </TouchableOpacity>
          <Text style={styles.photoHint}>Business photo / logo</Text>
        </View>

        <Text style={styles.sectionTitle}>Business Information</Text>
        <Row icon="business-outline" label="BUSINESS NAME">
          <TextInput style={styles.bareInput} defaultValue="Rajesh Kumar Plumbing" placeholderTextColor="#AAA" />
        </Row>

        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>BUSINESS DESCRIPTION</Text>
          <TextInput
            style={styles.textarea}
            defaultValue="Expert in residential and commercial plumbing with 8+ years of experience."
            multiline numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#AAA"
          />
        </View>

        <Row icon="phone-portrait-outline" label="CONTACT PHONE">
          <TextInput style={styles.bareInput} defaultValue="+91 9876543210" keyboardType="phone-pad" placeholderTextColor="#AAA" />
        </Row>

        <Row icon="location-outline" label="CITY">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Gujarat" placeholderTextColor="#AAA" />
        </Row>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Services Offered</Text>
        <View style={styles.servicesWrap}>
          {OFFERED_SERVICES.map(s => (
            <TouchableOpacity key={s} style={styles.serviceChip}>
              <Text style={styles.serviceChipText}>{s}</Text>
              <Ionicons name="close" size={13} color="#7C3AED" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addChip}>
            <Ionicons name="add" size={16} color="#7C3AED" />
            <Text style={styles.addChipText}>Add Service</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Service Area</Text>
        <Row icon="navigate-circle-outline" label="SERVICE AREA">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Banaskantha" placeholderTextColor="#AAA" />
        </Row>
        <Row icon="expand-outline" label="RADIUS">
          <TextInput style={styles.bareInput} defaultValue="10 km" keyboardType="numeric" placeholderTextColor="#AAA" />
        </Row>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Working Hours</Text>
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>WORKING DAYS</Text>
          <View style={styles.daysWrap}>
            {DAYS.map(day => (
              <TouchableOpacity
                key={day}
                style={[styles.dayChip, selectedDays.includes(day) && styles.dayChipActive]}
                onPress={() => {
                  setSelectedDays(prev =>
                    prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                  );
                }}>
                <Text style={[styles.dayChipText, selectedDays.includes(day) && styles.dayChipTextActive]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.twoCol}>
          <View style={{ flex: 1 }}>
            <Row icon="time-outline" label="START TIME">
              <TextInput style={styles.bareInput} value={startTime} onChangeText={setStartTime} placeholderTextColor="#AAA" />
            </Row>
          </View>
          <View style={{ flex: 1 }}>
            <Row icon="time-outline" label="END TIME">
              <TextInput style={styles.bareInput} value={endTime} onChangeText={setEndTime} placeholderTextColor="#AAA" />
            </Row>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Languages</Text>
        <View style={styles.servicesWrap}>
          {LANGUAGES.map(lang => {
            const isSelected = selectedLanguages.includes(lang);
            return (
              <TouchableOpacity
                key={lang}
                style={[styles.serviceChip, !isSelected && styles.serviceChipInactive]}
                onPress={() => {
                  setSelectedLanguages(prev =>
                    prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
                  );
                }}>
                <Text style={[styles.serviceChipText, !isSelected && styles.serviceChipTextInactive]}>
                  {lang}
                </Text>
                {isSelected && <Ionicons name="checkmark" size={13} color="#7C3AED" />}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Photo Gallery</Text>
        <View style={styles.photoGallery}>
          {photos.map(photo => (
            <View key={photo} style={styles.photoBox}>
              <View style={styles.photoPlaceholder}>
                <Ionicons name="image-outline" size={32} color="#CCC" />
              </View>
              <TouchableOpacity 
                style={styles.removePhotoBtn}
                onPress={() => setPhotos(prev => prev.filter(p => p !== photo))}>
                <Ionicons name="close-circle" size={20} color="#E11D48" />
              </TouchableOpacity>
            </View>
          ))}
          {photos.length < 6 && (
            <TouchableOpacity 
              style={styles.addPhotoBox}
              onPress={() => setPhotos(prev => [...prev, Math.max(...prev, 0) + 1])}>
              <Ionicons name="add-circle-outline" size={32} color="#7C3AED" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <>
              <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </>}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  headerAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(245, 244, 240, 0.7)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#0D0D0D',
    letterSpacing: -0.3,
  },
  scroll: { paddingTop: 100, padding: 18, paddingBottom: 100 },
  avatarArea: { alignItems: 'center', marginBottom: 24 },
  avatar: {
    width: 88, 
    height: 88, 
    borderRadius: 44, 
    backgroundColor: '#EDE9FE',
    borderWidth: 3, 
    borderColor: '#D8B4FE', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: '#7C3AED' },
  cameraBtn: {
    position: 'absolute', 
    bottom: 22, 
    right: '36%',
    width: 30, 
    height: 30, 
    borderRadius: 15, 
    backgroundColor: '#FF6B00',
    borderWidth: 2, 
    borderColor: '#fff', 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  photoHint: { fontSize: 11, color: '#888', marginTop: 6 },
  sectionTitle: {
    fontSize: 11, 
    fontWeight: '700', 
    color: '#888',
    textTransform: 'uppercase', 
    letterSpacing: 1.2, 
    marginBottom: 14,
  },
  fieldBlock: { marginBottom: 14 },
  fieldLabel: {
    fontSize: 10, 
    fontWeight: '700', 
    color: '#888',
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 7,
  },
  inputRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    height: 48, 
    borderWidth: 1.5, 
    borderColor: '#ECECEC', 
    borderRadius: 12,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 14,
    outlineStyle: 'none',
  } as any,
  bareInput: { 
    flex: 1, 
    fontSize: 13, 
    color: '#0D0D0D',
    outlineStyle: 'none',
  } as any,
  textarea: {
    height: 110, 
    borderWidth: 1.5, 
    borderColor: '#ECECEC', 
    borderRadius: 12,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 14, 
    paddingTop: 14,
    fontSize: 13, 
    color: '#0D0D0D',
    outlineStyle: 'none',
  } as any,
  servicesWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  serviceChip: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6,
    backgroundColor: '#EDE9FE', 
    paddingHorizontal: 12, 
    paddingVertical: 8,
    borderRadius: 20, 
    borderWidth: 1.5, 
    borderColor: '#D8B4FE',
  },
  serviceChipText: { fontSize: 12, color: '#7C3AED', fontWeight: '600' },
  addChip: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5,
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 20,
    borderWidth: 1.5, 
    borderColor: '#ECECEC', 
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
  },
  addChipText: { fontSize: 12, color: '#7C3AED', fontWeight: '600' },
  twoCol: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  daysWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dayChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    backgroundColor: '#FFFFFF',
  },
  dayChipActive: {
    backgroundColor: '#EDE9FE',
    borderColor: '#D8B4FE',
  },
  dayChipText: { fontSize: 12, color: '#888', fontWeight: '600' },
  dayChipTextActive: { color: '#7C3AED' },
  serviceChipInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#ECECEC',
  },
  serviceChipTextInactive: { color: '#888' },
  photoGallery: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 14 },
  photoBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    position: 'relative',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  addPhotoBox: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  addPhotoText: { fontSize: 11, color: '#7C3AED', fontWeight: '600' },
  saveBtn: {
    height: 48, 
    backgroundColor: '#FF6B00', 
    borderRadius: 14,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 8,
  },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
