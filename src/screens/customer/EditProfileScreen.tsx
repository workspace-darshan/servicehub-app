import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

export const EditProfileScreen = ({ navigation }: any) => {
  const [bio, setBio] = useState('');

  const Field = ({ label, icon, children, half }: any) => (
    <View style={[styles.fieldBlock, half && { flex: 1 }]}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarArea}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>DP</Text>
          </View>
          <TouchableOpacity style={styles.cameraBtn}>
            <Ionicons name="camera-outline" size={14} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.photoHint}>Tap to update photo</Text>
        </View>

        {/* Name row */}
        <View style={styles.nameRow}>
          <Field label="FIRST NAME" half>
            <TextInput style={styles.bareInput} defaultValue="Darshan" placeholderTextColor={Colors.slate400} />
          </Field>
          <Field label="LAST NAME" half>
            <TextInput style={styles.bareInput} defaultValue="Patel" placeholderTextColor={Colors.slate400} />
          </Field>
        </View>

        <Field label="EMAIL" icon="mail-outline">
          <TextInput
            style={[styles.bareInput, { color: Colors.slate400 }]}
            defaultValue="darshan@email.com" editable={false}
          />
          <Ionicons name="lock-closed" size={14} color={Colors.slate300} />
        </Field>

        <Field label="PHONE" icon="phone-portrait-outline">
          <TextInput style={styles.bareInput} defaultValue="+91 9876543210" keyboardType="phone-pad" placeholderTextColor={Colors.slate400} />
        </Field>

        <Field label="CITY" icon="location-outline">
          <TextInput style={styles.bareInput} defaultValue="Palanpur, Gujarat" placeholderTextColor={Colors.slate400} />
        </Field>

        {/* Bio */}
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>BIO / ABOUT</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Tell providers a bit about yourself..."
            placeholderTextColor={Colors.slate400}
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
            textAlignVertical="top"
          />
        </View>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteRow}>
          <Ionicons name="trash-outline" size={16} color={Colors.errorRed} />
          <Text style={styles.deleteText}>Delete Account</Text>
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
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  saveText: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.bold },
  scroll: { padding: 24, paddingBottom: 60 },
  avatarArea: { alignItems: 'center', marginBottom: 28 },
  avatar: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.blue50,
    borderWidth: 3, borderColor: Colors.blue200, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 28, fontWeight: FontWeight.bold, color: Colors.primary },
  cameraBtn: {
    position: 'absolute', bottom: 24, right: '34%',
    width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.primary,
    borderWidth: 2, borderColor: Colors.white, alignItems: 'center', justifyContent: 'center',
  },
  photoHint: { fontSize: FontSize.xs, color: Colors.slate400, marginTop: 6 },
  nameRow: { flexDirection: 'row', gap: 12 },
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
  saveBtn: {
    height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginBottom: 16,
  },
  saveBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  deleteRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 8 },
  deleteText: { fontSize: FontSize.base, color: Colors.errorRed, fontWeight: FontWeight.semibold },
});
