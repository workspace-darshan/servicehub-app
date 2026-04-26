import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TopBar } from '../../components/TopBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LAST_UPDATED = 'April 20, 2026';

const SECTIONS = [
  {
    id: '1',
    icon: 'information-circle-outline' as const,
    title: 'Information We Collect',
    content: `We collect information you provide directly when you create an account, including your name, email address, phone number, and location. When you use our services, we also collect usage data such as search queries, enquiries sent, and interactions with service providers.\n\nWe may also collect device information including your device type, operating system, and unique device identifiers to improve app performance and security.`,
  },
  {
    id: '2',
    icon: 'settings-outline' as const,
    title: 'How We Use Your Information',
    content: `Your information is used to:\n\n• Provide, maintain, and improve our services\n• Match you with relevant service providers in your area\n• Send notifications about enquiry responses and service updates\n• Process transactions and send related information\n• Respond to your comments and questions\n• Monitor and analyze usage patterns to enhance user experience\n• Detect and prevent fraudulent or unauthorized activity`,
  },
  {
    id: '3',
    icon: 'share-social-outline' as const,
    title: 'Information Sharing',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:\n\n• With service providers you choose to contact through our platform\n• With trusted third-party vendors who assist in operating our platform\n• When required by law or to protect our legal rights\n• In connection with a merger, acquisition, or sale of assets\n\nAll third parties are required to maintain the confidentiality of your information.`,
  },
  {
    id: '4',
    icon: 'location-outline' as const,
    title: 'Location Data',
    content: `Sevek uses your location to show relevant service providers near you. Location data is only collected when you grant permission through your device settings.\n\nYou can disable location access at any time through your device settings, though this may limit some features of the app. We do not share precise location data with third parties without your explicit consent.`,
  },
  {
    id: '5',
    icon: 'shield-checkmark-outline' as const,
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:\n\n• SSL/TLS encryption for all data in transit\n• Encrypted storage for sensitive information\n• Regular security audits and vulnerability assessments\n• Strict access controls for our team members\n\nWhile we strive to protect your data, no method of transmission over the internet is 100% secure. We encourage you to use a strong password and keep your account credentials confidential.`,
  },
  {
    id: '6',
    icon: 'time-outline' as const,
    title: 'Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time through the app settings.\n\nSome information may be retained for a limited period after account deletion to comply with legal obligations, resolve disputes, and enforce our agreements.`,
  },
  {
    id: '7',
    icon: 'person-outline' as const,
    title: 'Your Rights',
    content: `You have the right to:\n\n• Access the personal information we hold about you\n• Correct inaccurate or incomplete information\n• Request deletion of your personal data\n• Opt out of marketing communications at any time\n• Withdraw consent for data processing where applicable\n\nTo exercise any of these rights, contact us at privacy@sevek.in or through the Contact Support section in the app.`,
  },
  {
    id: '8',
    icon: 'phone-portrait-outline' as const,
    title: 'Cookies & Tracking',
    content: `Our app may use cookies and similar tracking technologies to enhance your experience, remember your preferences, and analyze usage patterns. You can control cookie settings through your device or browser settings.\n\nWe use analytics tools to understand how users interact with our app. This data is aggregated and anonymized and does not identify individual users.`,
  },
  {
    id: '9',
    icon: 'people-outline' as const,
    title: "Children's Privacy",
    content: `Sevek is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information promptly.\n\nIf you believe a child has provided us with their information, please contact us immediately at privacy@sevek.in.`,
  },
  {
    id: '10',
    icon: 'refresh-outline' as const,
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by sending a notification through the app or by email. Your continued use of Sevek after changes are posted constitutes your acceptance of the updated policy.\n\nWe encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
];

const SectionItem = ({ section }: { section: typeof SECTIONS[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.sectionCard}
      onPress={() => setExpanded(v => !v)}
      activeOpacity={0.75}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconBox}>
          <Ionicons name={section.icon} size={16} color="#FF6B00" />
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#AAAAAA"
        />
      </View>
      {expanded && (
        <Text style={styles.sectionContent}>{section.content}</Text>
      )}
    </TouchableOpacity>
  );
};

export const PrivacyPolicyScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <TopBar title="Privacy Policy" onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconBox}>
            <Ionicons name="shield-checkmark" size={28} color="#FF6B00" />
          </View>
          <Text style={styles.heroTitle}>Your Privacy Matters</Text>
          <Text style={styles.heroSubtitle}>
            Sevek is committed to protecting your personal information and being transparent about how we use it.
          </Text>
          <View style={styles.updatedBadge}>
            <Ionicons name="time-outline" size={12} color="#888" />
            <Text style={styles.updatedText}>Last updated: {LAST_UPDATED}</Text>
          </View>
        </View>

        {/* Expand all toggle */}
        <TouchableOpacity
          style={styles.expandAllBtn}
          onPress={() => setAllExpanded(v => !v)}>
          <Text style={styles.expandAllText}>
            {allExpanded ? 'Collapse All' : 'Expand All'}
          </Text>
          <Ionicons
            name={allExpanded ? 'chevron-up' : 'chevron-down'}
            size={14}
            color="#FF6B00"
          />
        </TouchableOpacity>

        {/* Sections */}
        <View style={styles.sectionsWrap}>
          {SECTIONS.map((section, i) => (
            <ExpandableSection
              key={section.id}
              section={section}
              forceExpanded={allExpanded}
              isLast={i === SECTIONS.length - 1}
            />
          ))}
        </View>

        {/* Contact card */}
        <View style={styles.contactCard}>
          <Ionicons name="mail-outline" size={20} color="#FF6B00" />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactTitle}>Questions about this policy?</Text>
            <Text style={styles.contactSub}>privacy@sevek.in</Text>
          </View>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => navigation.navigate('Contact')}>
            <Text style={styles.contactBtnText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© 2026 Sevek Technologies. All rights reserved.</Text>
      </ScrollView>
    </View>
  );
};

// Separate component to manage individual expand state + forceExpanded override
const ExpandableSection = ({
  section,
  forceExpanded,
  isLast,
}: {
  section: typeof SECTIONS[0];
  forceExpanded: boolean;
  isLast: boolean;
}) => {
  const [localExpanded, setLocalExpanded] = useState(false);
  const isOpen = forceExpanded || localExpanded;

  return (
    <TouchableOpacity
      style={[styles.sectionCard, isLast && { borderBottomWidth: 0 }]}
      onPress={() => setLocalExpanded(v => !v)}
      activeOpacity={0.75}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconBox}>
          <Ionicons name={section.icon} size={15} color="#FF6B00" />
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={15}
          color="#AAAAAA"
        />
      </View>
      {isOpen && (
        <Text style={styles.sectionContent}>{section.content}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F4F0' },
  scrollView: { flex: 1 },
  scroll: { padding: 18, gap: 12 },

  // Hero
  heroCard: {
    backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 20, alignItems: 'center',
    borderWidth: 1, borderColor: '#ECECEC',
  },
  heroIconBox: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#FFF4ED', borderWidth: 2, borderColor: '#FFD4B3',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  heroTitle: {
    fontSize: 18, fontWeight: '700', color: '#0D0D0D',
    letterSpacing: -0.3, marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13, color: '#888', textAlign: 'center',
    lineHeight: 20, marginBottom: 14,
  },
  updatedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#F5F4F0', paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 99, borderWidth: 1, borderColor: '#ECECEC',
  },
  updatedText: { fontSize: 11, color: '#888', fontWeight: '500' },

  // Expand all
  expandAllBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end',
    gap: 5, paddingVertical: 2,
  },
  expandAllText: { fontSize: 12, color: '#FF6B00', fontWeight: '600' },

  // Sections
  sectionsWrap: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    borderWidth: 1, borderColor: '#ECECEC', overflow: 'hidden',
  },
  sectionCard: {
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  sectionIconBox: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: '#FFF4ED', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  sectionTitle: {
    flex: 1, fontSize: 13, fontWeight: '700',
    color: '#0D0D0D', letterSpacing: -0.1,
  },
  sectionContent: {
    fontSize: 12, color: '#555', lineHeight: 20,
    marginTop: 12, paddingLeft: 42,
  },

  // Contact
  contactCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#FFF4ED', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#FFD4B3',
  },
  contactTitle: { fontSize: 13, fontWeight: '700', color: '#0D0D0D' },
  contactSub: { fontSize: 12, color: '#FF6B00', marginTop: 2 },
  contactBtn: {
    backgroundColor: '#FF6B00', paddingHorizontal: 14,
    paddingVertical: 8, borderRadius: 99,
  },
  contactBtnText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  footer: {
    fontSize: 11, color: '#BBBBBB', textAlign: 'center', marginTop: 4,
  },
});
