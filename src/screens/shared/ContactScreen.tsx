import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';

const SUBJECTS = ['General', 'Provider Issue', 'Technical', 'Billing', 'Other'];

export const ContactScreen = ({ navigation }: any) => {
  const [subject, setSubject] = useState('General');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Contact links */}
        <View style={styles.card}>
          {[
            { icon: 'call-outline', label: 'Phone', value: '(+91) 0192-181272', tappable: true },
            { icon: 'mail-outline', label: 'Email', value: 'hello@servicehub.in', tappable: true },
            { icon: 'location-outline', label: 'Address', value: 'Palanpur, Banaskantha, Gujarat 385001', tappable: false },
          ].map((c, i, arr) => (
            <TouchableOpacity
              key={c.label}
              style={[styles.contactRow, i === arr.length - 1 && { borderBottomWidth: 0 }]}
              disabled={!c.tappable}>
              <View style={styles.contactIcon}>
                <Ionicons name={c.icon as any} size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>{c.label}</Text>
                <Text style={[styles.contactValue, c.tappable && { color: Colors.primary }]}>{c.value}</Text>
              </View>
              {c.tappable && <Ionicons name="chevron-forward" size={15} color={Colors.slate300} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.formTitle}>Send a Message</Text>

          {/* Subject chips */}
          <Text style={styles.fieldLabel}>SUBJECT</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 16 }}>
            {SUBJECTS.map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.subjectChip, subject === s && styles.subjectChipActive]}
                onPress={() => setSubject(s)}>
                <Text style={[styles.subjectChipText, subject === s && { color: Colors.primary, fontWeight: FontWeight.bold }]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.fieldLabel}>MESSAGE</Text>
          <TextInput
            style={styles.textarea}
            placeholder="Describe your query or issue..."
            placeholderTextColor={Colors.slate400}
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.sendBtn, sent && { backgroundColor: Colors.successGreen }]}
            onPress={() => setSent(true)}
            disabled={sent}>
            <Ionicons name={sent ? 'checkmark-circle' : 'send-outline'} size={18} color={Colors.white} />
            <Text style={styles.sendBtnText}>{sent ? 'Message Sent!' : 'Send Message'}</Text>
          </TouchableOpacity>
        </View>

        {/* WhatsApp */}
        <TouchableOpacity style={styles.whatsappBtn}>
          <Ionicons name="logo-whatsapp" size={22} color={Colors.white} />
          <Text style={styles.whatsappText}>Chat on WhatsApp</Text>
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
  scroll: { padding: 20, gap: 16, paddingBottom: 60 },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, ...Shadows.card },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  contactIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
  },
  contactLabel: { fontSize: FontSize.xs, color: Colors.slate400, fontWeight: FontWeight.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  contactValue: { fontSize: FontSize.base, color: Colors.darkNavy, marginTop: 2, fontWeight: FontWeight.medium },
  formTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 14 },
  fieldLabel: {
    fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  subjectChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceContainerLow, borderWidth: 1.5, borderColor: Colors.border,
  },
  subjectChipActive: { borderColor: Colors.primary, backgroundColor: Colors.blue50 },
  subjectChipText: { fontSize: FontSize.sm, color: Colors.slate500 },
  textarea: {
    height: 120, borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    paddingHorizontal: 14, paddingTop: 12, fontSize: FontSize.base, color: Colors.darkNavy,
    marginBottom: 16,
  },
  sendBtn: {
    height: 52, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
  whatsappBtn: {
    height: 54, backgroundColor: '#22C55E', borderRadius: BorderRadius.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  whatsappText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white },
});
