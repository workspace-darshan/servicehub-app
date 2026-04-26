import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Simple register — customer only
export const RegisterScreen = ({ navigation }: any) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('CustomerTabs');
    }, 1500);
  };

  const Field = ({ label, icon, ...props }: any) => (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={icon} size={17} color={Colors.slate400} style={{ marginRight: 10 }} />
        <TextInput placeholderTextColor={Colors.slate400} style={styles.bareInput} {...props} />
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <TouchableOpacity style={[styles.backBtn, { paddingTop: 10 + insets.top }]} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
        </TouchableOpacity>

        <View style={styles.titleArea}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subheading}>Join Sevek free</Text>
        </View>

        {/* Name Row */}
        <View style={styles.nameRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>FIRST NAME</Text>
              <View style={styles.inputRow}>
                <TextInput placeholder="Darshan" placeholderTextColor={Colors.slate400} style={styles.bareInput} />
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.fieldWrapper}>
              <Text style={styles.fieldLabel}>LAST NAME</Text>
              <View style={styles.inputRow}>
                <TextInput placeholder="Patel" placeholderTextColor={Colors.slate400} style={styles.bareInput} />
              </View>
            </View>
          </View>
        </View>

        <Field label="EMAIL" icon="mail-outline" placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" />

        {/* Phone */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
          <View style={styles.inputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
              <Ionicons name="chevron-down" size={12} color={Colors.slate500} />
            </View>
            <View style={styles.phoneDivider} />
            <TextInput placeholder="9876543210" placeholderTextColor={Colors.slate400} keyboardType="phone-pad" style={[styles.bareInput, { marginLeft: 8 }]} />
          </View>
        </View>

        {/* Password */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={17} color={Colors.slate400} style={{ marginRight: 10 }} />
            <TextInput placeholder="Create a strong password" placeholderTextColor={Colors.slate400} secureTextEntry={!showPassword} style={styles.bareInput} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={17} color={Colors.slate400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={16} color={Colors.primary} />
          <Text style={styles.infoNoteText}>
            You'll register as a customer. Want to offer services? Visit Profile → Become a Provider after signing in.
          </Text>
        </View>

        {/* Terms */}
        <TouchableOpacity style={styles.termsRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed && <Ionicons name="checkmark" size={12} color={Colors.white} />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

        <TouchableOpacity
          style={[styles.primaryBtn, (!agreed || loading) && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={!agreed || loading}
          activeOpacity={0.85}>
          {loading
            ? <ActivityIndicator color={Colors.white} size="small" />
            : <Text style={styles.primaryBtnText}>Create Account</Text>}
        </TouchableOpacity>

        <View style={styles.loginRow}>
          <Text style={styles.loginLabel}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 48 },
  backBtn: { 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    marginBottom: 10,
    marginLeft: -0,
  },
  titleArea: { marginBottom: 32 },
  heading: { 
    fontSize: 24, 
    fontWeight: FontWeight.bold, 
    color: Colors.darkNavy,
    marginBottom: 4,
  },
  subheading: { 
    fontSize: FontSize.base, 
    color: Colors.slate500, 
    marginTop: 2,
  },
  nameRow: { flexDirection: 'row', gap: 12 },
  fieldWrapper: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 10, 
    fontWeight: FontWeight.bold, 
    color: Colors.slate500,
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14, height: 48,
  },
  bareInput: {
    flex: 1, fontSize: FontSize.base, color: Colors.darkNavy,
    borderWidth: 0, height: 48, padding: 0, backgroundColor: 'transparent',
  },
  countryCode: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingRight: 10 },
  countryCodeText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: Colors.darkNavy },
  phoneDivider: { width: 1, height: 20, backgroundColor: Colors.border },
  infoNote: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: Colors.blue50, borderRadius: BorderRadius.sm,
    padding: 12, marginBottom: 16, borderWidth: 1, borderColor: Colors.blue200,
  },
  infoNoteText: { flex: 1, fontSize: FontSize.md, color: Colors.primary, lineHeight: 19 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  checkbox: {
    width: 20, height: 20, borderRadius: 5, borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', marginTop: 1,
  },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  termsText: { flex: 1, fontSize: FontSize.md, color: Colors.slate500, lineHeight: 20 },
  termsLink: { color: Colors.primary, fontWeight: FontWeight.semibold },
  primaryBtn: {
    height: 48, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 0.3 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  loginLabel: { fontSize: FontSize.base, color: Colors.slate500 },
  loginLink: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.bold },
});
