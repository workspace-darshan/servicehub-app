import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius, Shadows } from '../../constants/theme';
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How It Works</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Tab switcher */}
        <View style={styles.switcher}>
          {(['customer', 'provider'] as TabKey[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.switchTab, tab === t && styles.switchTabActive]}
              onPress={() => setTab(t)}>
              <Ionicons
                name={t === 'customer' ? 'person-outline' : 'construct-outline'}
                size={15}
                color={tab === t ? Colors.primary : Colors.slate500}
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
                    <Ionicons name={iconName} size={16} color={Colors.primary} />
                  </View>
                  {index < steps.length - 1 && <View style={styles.stepLine} />}
                </View>
                <View style={styles.stepContent}>
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
                size={16}
                color={Colors.slate400}
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
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 52, paddingBottom: 14,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  scroll: { padding: 20, paddingBottom: 60 },
  switcher: {
    flexDirection: 'row', backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 14, padding: 4, marginBottom: 28,
  },
  switchTab: {
    flex: 1, height: 42, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, borderRadius: 10,
  },
  switchTabActive: { backgroundColor: Colors.white, ...Shadows.card },
  switchTabText: { fontSize: FontSize.sm, color: Colors.slate500, fontWeight: FontWeight.medium },
  switchTabTextActive: { color: Colors.primary, fontWeight: FontWeight.bold },
  stepRow: { flexDirection: 'row', gap: 16 },
  stepLeft: { alignItems: 'center', width: 44 },
  stepCircle: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: Colors.blue50, borderWidth: 2, borderColor: Colors.blue200,
    alignItems: 'center', justifyContent: 'center',
  },
  stepLine: { width: 2, flex: 1, backgroundColor: Colors.blue200, marginVertical: 4 },
  stepContent: { flex: 1, paddingBottom: 24, paddingTop: 8 },
  stepNumBadge: {
    alignSelf: 'flex-start', backgroundColor: Colors.primary + '15',
    borderRadius: BorderRadius.full, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 6,
  },
  stepNum: { fontSize: 10, fontWeight: FontWeight.bold, color: Colors.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  stepTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.darkNavy },
  stepDesc: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 4, lineHeight: 19 },
  faqHeading: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 14 },
  faqItem: {
    backgroundColor: Colors.white, borderRadius: 14, marginBottom: 8, padding: 16, ...Shadows.card,
  },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  faqQ: { flex: 1, fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.darkNavy, lineHeight: 20 },
  faqA: { fontSize: FontSize.sm, color: Colors.slate500, marginTop: 10, lineHeight: 19 },
  cta: { backgroundColor: Colors.white, borderRadius: 18, padding: 22, marginTop: 20, alignItems: 'center', ...Shadows.card },
  ctaTitle: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.darkNavy, marginBottom: 16 },
  ctaBtns: { flexDirection: 'row', gap: 12, width: '100%' },
  ctaPrimary: {
    flex: 1, height: 50, backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center',
  },
  ctaPrimaryText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.white },
  ctaSecondary: {
    flex: 1, height: 50, borderWidth: 1.5, borderColor: Colors.primary,
    borderRadius: BorderRadius.md, alignItems: 'center', justifyContent: 'center',
  },
  ctaSecondaryText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: Colors.primary },
});
