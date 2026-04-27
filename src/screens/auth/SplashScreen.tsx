import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { getHasSeenOnboarding } from '../../services/storage';

const { height } = Dimensions.get('window');

export const SplashScreen = ({ navigation }: any) => {
  const { isAuthenticated, user } = useAuth();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleTranslateY = useRef(new Animated.Value(16)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const loaderRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Subtitle animation (200ms delay)
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(subtitleOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(subtitleTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

    // Loader animation (400ms delay)
    setTimeout(() => {
      Animated.timing(loaderOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Spinning animation
      const spin = () => {
        loaderRotation.setValue(0);
        Animated.timing(loaderRotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(spin);
      };
      spin();
    }, 400);

    // Navigate after 2.5 seconds
    const timer = setTimeout(async () => {
      // Check if user is already logged in
      if (isAuthenticated && user) {
        // Navigate to appropriate home screen
        if (user.isProvider) {
          navigation.replace('ProviderTabs');
        } else {
          navigation.replace('CustomerTabs');
        }
      } else {
        // Check if user has seen onboarding
        const hasSeenOnboarding = await getHasSeenOnboarding();
        if (hasSeenOnboarding) {
          navigation.replace('Login');
        } else {
          navigation.replace('Onboarding');
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);

  const spin = loaderRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#0F172A', '#1D4ED8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.container}>
      <StatusBar style="light" />

      {/* Ambient glows */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      {/* Center content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            transform: [{ translateY: logoTranslateY }],
            alignItems: 'center',
          }}>
          <Text style={styles.logo}>Sevak</Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: subtitleOpacity,
              transform: [{ translateY: subtitleTranslateY }],
            },
          ]}>
          Connect. Service. Trust.
        </Animated.Text>

        {/* Loader */}
        <Animated.View style={{ opacity: loaderOpacity, marginTop: 56, alignItems: 'center' }}>
          <Animated.View style={[styles.loaderRing, { transform: [{ rotate: spin }] }]} />
          <Text style={styles.loadingText}>INITIALIZING</Text>
        </Animated.View>
      </View>

      {/* Version */}
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0 · Sevak Technologies © 2024</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowTop: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(183, 196, 255, 0.15)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(78, 222, 163, 0.08)',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
    marginTop: 8,
    letterSpacing: 0.8,
  },
  loaderRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    borderTopColor: Colors.white,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 3,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  version: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 0.5,
  },
});
