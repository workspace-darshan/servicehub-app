import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, BorderRadius } from '../../constants/theme';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={Colors.darkNavy} />
      </TouchableOpacity>

      <View style={styles.content}>
        {!sent ? (
          <>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-open-outline" size={36} color={Colors.primary} />
            </View>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Text style={styles.subheading}>
              Enter your registered email and we'll send you a reset link.
            </Text>

            <View style={{ height: 28 }} />

            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={17} color={Colors.slate400} style={{ marginRight: 10 }} />
              <TextInput
                placeholder="your@email.com"
                placeholderTextColor={Colors.slate400}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.bareInput}
              />
            </View>

            <View style={{ height: 24 }} />

            <TouchableOpacity
              style={[styles.submitBtn, (!email.trim() || loading) && { opacity: 0.5 }]}
              onPress={handleSubmit}
              disabled={!email.trim() || loading}>
              {loading
                ? <ActivityIndicator color={Colors.white} />
                : <Text style={styles.submitText}>Send Reset Link</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backToLogin}
              onPress={() => navigation.navigate('Login')}>
              <Ionicons name="arrow-back" size={15} color={Colors.primary} />
              <Text style={styles.backToLoginText}>Back to Sign In</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={[styles.iconCircle, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="checkmark-circle-outline" size={36} color="#22C55E" />
            </View>
            <Text style={styles.heading}>Check Your Email</Text>
            <Text style={styles.subheading}>
              We've sent a password reset link to{'\n'}<Text style={{ color: Colors.primary, fontWeight: FontWeight.bold }}>{email}</Text>
            </Text>
            <View style={{ height: 32 }} />
            <TouchableOpacity style={styles.submitBtn} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.submitText}>Back to Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  backBtn: { paddingTop: 52, paddingHorizontal: 20, width: 60, height: 88, justifyContent: 'flex-end' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20, alignItems: 'center' },
  iconCircle: {
    width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.blue50,
    alignItems: 'center', justifyContent: 'center', marginBottom: 24,
    borderWidth: 2, borderColor: Colors.blue200,
  },
  heading: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy, textAlign: 'center' },
  subheading: { fontSize: FontSize.base, color: Colors.slate500, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  fieldLabel: {
    alignSelf: 'flex-start', fontSize: 10, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    width: '100%', height: 48, borderWidth: 1.5, borderColor: Colors.border,
    borderRadius: BorderRadius.md, paddingHorizontal: 14, backgroundColor: Colors.white,
  },
  bareInput: { flex: 1, fontSize: FontSize.base, color: Colors.darkNavy, borderWidth: 0, padding: 0, height: 48, backgroundColor: 'transparent', outlineStyle: 'none' },
  submitBtn: {
    width: '100%', height: 48, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  submitText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 0.3 },
  backToLogin: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 20 },
  backToLoginText: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.semibold },
});
