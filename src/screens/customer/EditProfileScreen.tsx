import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';

export const EditProfileScreen = ({ navigation }: any) => {
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('+91 9876543210');

  const Field = ({ label, icon, children, half }: any) => (
    <View style={[styles.fieldBlock, half && { flex: 1 }]}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
      <View style={styles.inputRow}>
        {icon && <Ionicons name={icon} size={15} color="#888" style={{ marginRight: 10 }} />}
        {children}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TopBar 
        title="Edit Profile" 
        onBack={() => navigation.goBack()}
        rightIcon="checkmark-circle-outline"
        onRightPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
        {/* Avatar */}
        <View style={styles.avatarArea}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DP</Text>
          </View>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={13} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.photoHint}>Tap to update photo</Text>
        </View>

        {/* Name row */}
        <View style={styles.nameRow}>
          <Field label="FIRST NAME" half>
            <TextInput style={styles.bareInput} defaultValue="Darshan" placeholderTextColor="#888" />
          </Field>
          <Field label="LAST NAME" half>
            <TextInput style={styles.bareInput} defaultValue="Patel" placeholderTextColor="#888" />
          </Field>
        </View>

        <Field label="EMAIL" icon="mail-outline">
          <TextInput
            style={[styles.bareInput, { color: '#888' }]}
            defaultValue="darshan@email.com" editable={false}
          />
          <Ionicons name="lock-closed" size={13} color="#bbb" />
        </Field>

        <Field label="PHONE" icon="phone-portrait-outline">
          <TextInput 
            style={styles.bareInput} 
            value={phone}
            onChangeText={(text) => {
              // Only allow numbers, spaces, +, -, and ()
              const cleaned = text.replace(/[^0-9+\-() ]/g, '');
              setPhone(cleaned);
            }}
            keyboardType="phone-pad" 
            placeholderTextColor="#888" 
          />
        </Field>

        <Field label="CITY" icon="location-outline">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Gujarat" placeholderTextColor="#888" />
        </Field>

        {/* Bio */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>BIO / ABOUT</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Tell providers a bit about yourself..."
            placeholderTextColor="#888"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
            textAlignVertical="top"
          />
        </View>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteRow}>
          <Ionicons name="trash-outline" size={15} color="#E11D48" />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scroll: { padding: 18, paddingBottom: 100 },
  avatarArea: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 76, height: 76, borderRadius: 38, backgroundColor: '#FFF4ED',
    borderWidth: 3, borderColor: '#FFD4B3', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 26, fontWeight: '700', color: '#FF6B00', letterSpacing: -0.3 },
  cameraBtn: {
    position: 'absolute', bottom: 18, right: '36%',
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#FF6B00',
    borderWidth: 2.5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  photoHint: { fontSize: 10, color: '#888', marginTop: 5 },
  nameRow: { flexDirection: 'row', gap: 10 },
  fieldBlock: { marginBottom: 12 },
  fieldLabel: {
    fontSize: 9, fontWeight: '700', color: '#888',
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    height: 48, borderWidth: 1, borderColor: '#ECECEC', borderRadius: 14,
    backgroundColor: '#FFFFFF', paddingHorizontal: 14,
  },
  bareInput: { 
    flex: 1, 
    fontSize: 13, 
    color: '#0D0D0D', 
    height: 48,
    padding: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
    outlineStyle: 'none',
  },
  textarea: {
    height: 100, 
    borderWidth: 1, 
    borderColor: '#ECECEC', 
    borderRadius: 14,
    backgroundColor: '#FFFFFF', 
    paddingHorizontal: 14, 
    paddingTop: 12,
    fontSize: 13, 
    color: '#0D0D0D',
    outlineStyle: 'none',
  },
  saveBtn: {
    height: 48, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7,
    marginBottom: 12, marginTop: 6,
  },
  saveBtnText: { fontSize: 14, fontWeight: '700', color: '#fff', letterSpacing: -0.2 },
  deleteRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 8 },
  deleteText: { fontSize: 13, color: '#E11D48', fontWeight: '600' },
});
