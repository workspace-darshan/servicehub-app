import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform, ActivityIndicator, TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../constants/theme';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('CustomerTabs');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={styles.logoIconBg}>
            <Ionicons name="flash" size={28} color={Colors.primary} />
          </View>
          <Text style={styles.logoText}>ServiceHub</Text>
        </View>

        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subheading}>Sign in to continue</Text>

        <View style={{ height: 32 }} />

        {/* Email */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>EMAIL</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color={Colors.slate400} style={styles.inputIcon} />
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
        </View>

        {/* Password */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.slate400} style={styles.inputIcon} />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={Colors.slate400}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.bareInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={18} color={Colors.slate400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Remember + Forgot */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && <Ionicons name="checkmark" size={11} color={Colors.white} />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 24 }} />

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}>
          {loading
            ? <ActivityIndicator color={Colors.white} size="small" />
            : <Text style={styles.primaryBtnText}>Sign In</Text>}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Google */}
        <TouchableOpacity style={styles.googleBtn} activeOpacity={0.85}>
          <Ionicons name="logo-google" size={20} color="#EA4335" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Register link */}
        <View style={styles.registerRow}>
          <Text style={styles.registerLabel}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  logoArea: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32, gap: 10 },
  logoIconBg: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: Colors.blue50, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.blue200,
  },
  logoText: { fontSize: 22, fontWeight: FontWeight.bold, color: Colors.darkNavy, letterSpacing: 0.3 },
  heading: { fontSize: FontSize.h1, fontWeight: FontWeight.extrabold, color: Colors.darkNavy, textAlign: 'center' },
  subheading: { fontSize: FontSize.lg, color: Colors.slate400, textAlign: 'center', marginTop: 6 },
  fieldWrapper: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 11, fontWeight: FontWeight.bold, color: Colors.slate400,
    textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: Colors.border, borderRadius: BorderRadius.md,
    backgroundColor: Colors.white, paddingHorizontal: 14, height: 52,
  },
  inputIcon: { marginRight: 10 },
  bareInput: {
    flex: 1, fontSize: FontSize.base, color: Colors.darkNavy,
    borderWidth: 0, height: 52, padding: 0, backgroundColor: 'transparent',
  },
  eyeBtn: { padding: 4 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: {
    width: 18, height: 18, borderRadius: 5,
    borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  rememberText: { fontSize: FontSize.md, color: Colors.slate500 },
  forgotText: { fontSize: FontSize.md, color: Colors.primary, fontWeight: FontWeight.semibold },
  primaryBtn: {
    height: 54, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryBtnText: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 0.3 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontSize: FontSize.sm, color: Colors.slate400, fontWeight: FontWeight.medium },
  googleBtn: {
    height: 52, borderRadius: BorderRadius.md, borderWidth: 1.5, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  googleText: { fontSize: FontSize.lg, color: Colors.darkNavy, fontWeight: FontWeight.semibold },
  registerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  registerLabel: { fontSize: FontSize.base, color: Colors.slate500 },
  registerLink: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.bold },
});
