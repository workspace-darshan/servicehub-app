import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';

const SUBJECTS = ['General', 'Provider Issue', 'Technical', 'Billing', 'Other'];

const CONTACT_ITEMS = [
  { icon: 'call-outline', label: 'Phone', value: '(+91) 0192-181272', tappable: true },
  { icon: 'mail-outline', label: 'Email', value: 'hello@sevek.in', tappable: true },
  { icon: 'location-outline', label: 'Address', value: 'Palanpur, Banaskantha, Gujarat 385001', tappable: false },
];

export const ContactScreen = ({ navigation }: any) => {
  const [subject, setSubject] = useState('General');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height }]}>
      <StatusBar style="dark" />
      <TopBar title="Contact Us" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        bounces={true}
      >
        {/* Contact Info Cards */}
        <Text style={styles.sectionHeading}>Get In Touch</Text>
        {CONTACT_ITEMS.map((c, i) => (
          <TouchableOpacity
            key={c.label}
            style={styles.contactCard}
            disabled={!c.tappable}
            activeOpacity={c.tappable ? 0.7 : 1}
          >
            <View style={styles.contactIconBox}>
              <Ionicons name={c.icon as any} size={18} color="#FF6B00" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactLabel}>{c.label}</Text>
              <Text style={[styles.contactValue, c.tappable && { color: '#FF6B00' }]}>
                {c.value}
              </Text>
            </View>
            {c.tappable && (
              <Ionicons name="chevron-forward" size={15} color="#C8C8C8" />
            )}
          </TouchableOpacity>
        ))}

        {/* WhatsApp */}
        <TouchableOpacity style={styles.whatsappCard} activeOpacity={0.8}>
          <View style={styles.whatsappIconBox}>
            <Ionicons name="logo-whatsapp" size={20} color="#22C55E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={[styles.contactValue, { color: '#22C55E' }]}>Chat with us instantly</Text>
          </View>
          <Ionicons name="chevron-forward" size={15} color="#C8C8C8" />
        </TouchableOpacity>

        {/* Message Form */}
        <Text style={[styles.sectionHeading, { marginTop: 8 }]}>Send a Message</Text>

        {/* Subject chips */}
        <Text style={styles.fieldLabel}>SUBJECT</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {SUBJECTS.map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, subject === s && styles.chipActive]}
              onPress={() => setSubject(s)}
            >
              <Text style={[styles.chipText, subject === s && styles.chipTextActive]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Message input */}
        <Text style={styles.fieldLabel}>MESSAGE</Text>
        <TextInput
          style={styles.textarea}
          placeholder="Describe your query or issue..."
          placeholderTextColor="#AAAAAA"
          multiline
          numberOfLines={5}
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />

        {/* Send Button */}
        <TouchableOpacity
          style={[styles.sendBtn, sent && styles.sendBtnSuccess]}
          onPress={() => { setSent(true); }}
          disabled={sent}
          activeOpacity={0.85}
        >
          <Ionicons
            name={sent ? 'checkmark-circle' : 'send-outline'}
            size={18}
            color="#fff"
          />
          <Text style={styles.sendBtnText}>{sent ? 'Message Sent!' : 'Send Message'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0', overflow: 'hidden' },
  scrollView: { flex: 1 },
  scroll: { padding: 18, gap: 10 },

  sectionHeading: {
    fontSize: 17, fontWeight: '700', color: '#0D0D0D',
    marginBottom: 4, marginTop: 4, letterSpacing: -0.3,
  },

  // Contact cards
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  contactIconBox: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFF4ED', borderWidth: 2, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  whatsappCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  whatsappIconBox: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F0FDF4', borderWidth: 2, borderColor: '#BBF7D0',
    alignItems: 'center', justifyContent: 'center',
  },
  contactLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 2,
  },
  contactValue: {
    fontSize: 13, fontWeight: '600', color: '#0D0D0D',
  },

  // Form
  fieldLabel: {
    fontSize: 10, fontWeight: '700', color: '#AAAAAA',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: 4,
  },
  chipsRow: { flexDirection: 'row', gap: 8, paddingBottom: 14 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 99,
    backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#ECECEC',
  },
  chipActive: { borderColor: '#FF6B00', backgroundColor: '#FFF4ED' },
  chipText: { fontSize: 12, color: '#888', fontWeight: '500' },
  chipTextActive: { color: '#FF6B00', fontWeight: '700' },

  textarea: {
    height: 120, borderWidth: 1.5, borderColor: '#ECECEC',
    borderRadius: 14, paddingHorizontal: 14, paddingTop: 12,
    fontSize: 13, color: '#0D0D0D', backgroundColor: '#FFFFFF',
    marginBottom: 4,
    outlineWidth: 0, outlineStyle: 'none',
  } as any,
  sendBtn: {
    height: 50, backgroundColor: '#FF6B00', borderRadius: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendBtnSuccess: { backgroundColor: '#22C55E' },
  sendBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
