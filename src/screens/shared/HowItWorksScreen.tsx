import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
import { HOW_IT_WORKS_CUSTOMER, HOW_IT_WORKS_PROVIDER } from '../../data/mockData';

const FAQS = [
  { q: 'Is registration free?', a: 'Yes! Registering as a customer or provider is completely free.' },
  { q: 'How are providers verified?', a: 'Providers submit their details and our team reviews them before marking as Verified.' },
  { q: 'Can I cancel an enquiry?', a: 'Yes, you can cancel a pending enquiry from My Activity within 24 hours.' },
  { q: 'How do reviews work?', a: 'After a completed service, you\'ll be prompted to rate the provider 1–5 stars and write a review.' },
  { q: 'What if a provider doesn\'t respond?', a: 'Contact our support team and we\'ll help you find an alternative quickly.' },
  { q: 'Is my data secure?', a: 'We use industry-standard encryption to protect all personal information.' },
];

type TabKey = 'customer' | 'provider';

const STEP_ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  'Sign Up': 'person-add-outline',
  'Browse Services': 'grid-outline',
  'Find Provider': 'people-outline',
  'Send Enquiry': 'paper-plane-outline',
  'Get Service': 'checkmark-circle-outline',
  'Rate Provider': 'star-outline',
  'Register as Provider': 'business-outline',
  'Set Up Profile': 'create-outline',
  'Get Discovered': 'search-outline',
  'Receive Enquiry': 'mail-outline',
  'Respond & Serve': 'construct-outline',
  'Get Paid': 'card-outline',
};

export const HowItWorksScreen = ({ navigation }: any) => {
  const [tab, setTab] = useState<TabKey>('customer');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const steps = tab === 'customer' ? HOW_IT_WORKS_CUSTOMER : HOW_IT_WORKS_PROVIDER;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TopBar
        title="How It Works"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        bounces={true}
        nestedScrollEnabled={true}
      >
        {/* Tab switcher */}
        <View style={styles.switcher}>
          {(['customer', 'provider'] as TabKey[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.switchTab, tab === t && styles.switchTabActive]}
              onPress={() => setTab(t)}>
              <Ionicons
                name={t === 'customer' ? 'person-outline' : 'construct-outline'}
                size={14}
                color={tab === t ? '#FF6B00' : '#888'}
              />
              <Text style={[styles.switchTabText, tab === t && styles.switchTabTextActive]}>
                {t === 'customer' ? 'For Customers' : 'For Providers'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Steps timeline */}
        <View style={{ gap: 0, marginBottom: 32 }}>
          {steps.map((step: any, index: number) => {
            const iconName = STEP_ICONS[step.title] || 'checkmark-circle-outline';
            return (
              <View key={step.step} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={styles.stepCircle}>
                    <Ionicons name={iconName} size={15} color="#FF6B00" />
                  </View>
                  {index < steps.length - 1 && <View style={styles.stepLine} />}
                </View>
                <View style={styles.stepCard}>
                  <View style={styles.stepNumBadge}>
                    <Text style={styles.stepNum}>{step.step}</Text>
                  </View>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepDesc}>{step.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* FAQ */}
        <Text style={styles.faqHeading}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <TouchableOpacity
            key={i}
            style={styles.faqItem}
            onPress={() => setOpenFaq(openFaq === i ? null : i)}
            activeOpacity={0.75}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Ionicons
                name={openFaq === i ? 'chevron-up' : 'chevron-down'}
                size={15}
                color="#888"
              />
            </View>
            {openFaq === i && <Text style={styles.faqA}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}

        {/* CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <View style={styles.ctaBtns}>
            <TouchableOpacity style={styles.ctaPrimary} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.ctaPrimaryText}>Sign Up Free</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctaSecondary} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.ctaSecondaryText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#F5F4F0', overflow: 'hidden' },
  scrollView: { flex: 1 },
  scroll: {
    padding: 18,
  },
  switcher: {
    flexDirection: 'row', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 4, marginBottom: 22,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  switchTab: {
    flex: 1, height: 38, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, borderRadius: 10,
  },
  switchTabActive: { backgroundColor: '#FFF4ED' },
  switchTabText: { fontSize: 12, color: '#888', fontWeight: '500' },
  switchTabTextActive: { color: '#FF6B00', fontWeight: '700' },
  stepRow: { flexDirection: 'row', gap: 14 },
  stepLeft: { alignItems: 'center', width: 40 },
  stepCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFF4ED', borderWidth: 2, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center',
  },
  stepLine: { width: 2, flex: 1, backgroundColor: '#FFD4B3', marginVertical: 4 },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 12,
  },
  stepNumBadge: {
    alignSelf: 'flex-start', backgroundColor: '#FFF4ED',
    borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2, marginBottom: 5,
  },
  stepNum: { fontSize: 9, fontWeight: '700', color: '#FF6B00', textTransform: 'uppercase', letterSpacing: 0.5 },
  stepTitle: { fontSize: 15, fontWeight: '700', color: '#0D0D0D', letterSpacing: -0.2 },
  stepDesc: { fontSize: 12, color: '#888', marginTop: 3, lineHeight: 17 },
  faqHeading: { fontSize: 17, fontWeight: '700', color: '#0D0D0D', marginBottom: 12, marginTop: 8, letterSpacing: -0.3 },
  faqItem: {
    backgroundColor: '#FFFFFF', borderRadius: 14, marginBottom: 8, padding: 14,
    borderWidth: 1, borderColor: '#ECECEC',
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  faqQ: { flex: 1, fontSize: 13, fontWeight: '600', color: '#0D0D0D', lineHeight: 18 },
  faqA: { fontSize: 12, color: '#888', marginTop: 8, lineHeight: 17 },
  cta: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginTop: 16, alignItems: 'center', borderWidth: 1, borderColor: '#ECECEC' },
  ctaTitle: { fontSize: 16, fontWeight: '700', color: '#0D0D0D', marginBottom: 14, letterSpacing: -0.2 },
  ctaBtns: { flexDirection: 'row', gap: 10, width: '100%' },
  ctaPrimary: {
    flex: 1, height: 48, backgroundColor: '#FF6B00',
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  ctaPrimaryText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  ctaSecondary: {
    flex: 1, height: 48, borderWidth: 1, borderColor: '#FF6B00',
    borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  ctaSecondaryText: { fontSize: 14, fontWeight: '700', color: '#FF6B00' },
});
