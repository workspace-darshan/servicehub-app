import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

const { height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Find Trusted Service Providers',
    body: 'Browse verified professionals for all your home service needs.',
    bg: ['#FF6B00', '#FF9A3C'] as [string, string],
    accent: '#FF6B00',
    badgeIcon: 'shield-checkmark',
    badgeText: 'Verified Pros',
    image: require('../../../assets/steps/TrustedProfessionals.png'),
  },
  {
    id: 2,
    title: 'Book Services Instantly',
    body: 'Send enquiries and get quick responses from service providers.',
    bg: ['#9333EA', '#A78BFA'] as [string, string],
    accent: '#9333EA',
    badgeIcon: 'flash',
    badgeText: 'Fast Response',
    image: require('../../../assets/steps/ServiceSample.png'),
  },
  {
    id: 3,
    title: 'Track & Review',
    body: 'Manage your bookings and share feedback to help the community.',
    bg: ['#16A34A', '#4ADE80'] as [string, string],
    accent: '#16A34A',
    badgeIcon: 'star',
    badgeText: 'Top Rated',
    image: require('../../../assets/steps/CompareChoose.png'),
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = SLIDES[currentSlide];
  const isLast = currentSlide === SLIDES.length - 1;

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Skip button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Illustration area */}
      <LinearGradient
        colors={slide.bg}
        style={styles.illustrationArea}>
        <Image
          source={slide.image}
          style={styles.illustrationImage}
          resizeMode="cover"
        />
        
        {/* Floating badge */}
        <View style={[styles.floatingBadge, { borderColor: slide.accent + '30' }]}>
          <Ionicons name={slide.badgeIcon as any} size={13} color={slide.accent} />
          <Text style={{ fontSize: 11, color: slide.accent, fontWeight: '600' }}>
            {slide.badgeText}
          </Text>
        </View>
      </LinearGradient>

      {/* Content card */}
      <View style={styles.contentCard}>
        {/* Indicators */}
        <View style={styles.indicators}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentSlide
                  ? [styles.dotActive, { backgroundColor: slide.accent }]
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <Text style={styles.heading}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>

        {/* CTA */}
        {isLast ? (
          <View style={styles.ctaGroup}>
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: Colors.primary }]}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>Get Started — Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.85}>
              <Text style={styles.secondaryBtnText}>I Already Have an Account</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.navRow}>
            {currentSlide > 0 && (
              <TouchableOpacity
                style={styles.backBtn}
                onPress={handleBack}>
                <Text style={styles.backBtnText}>← Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.nextBtn, { flex: currentSlide > 0 ? 0.55 : 1, backgroundColor: Colors.primary }]}
              onPress={handleNext}
              activeOpacity={0.85}>
              <Text style={styles.nextBtnText}>Next →</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.stepLabel}>Step {currentSlide + 1} of {SLIDES.length}</Text>
      </View>
    </View>
  );
};

const CONTENT_HEIGHT = height * 0.42;
const ILLUS_HEIGHT = height * 0.58;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  skipBtn: {
    position: 'absolute',
    top: 52,
    right: 24,
    zIndex: 20,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  illustrationArea: {
    height: ILLUS_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  floatingBadge: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  contentCard: {
    backgroundColor: Colors.white,
    marginTop: 0,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 20,
    minHeight: CONTENT_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 6,
  },
  indicators: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 24,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.slate300,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.darkNavy,
    lineHeight: 32,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 14,
    color: Colors.slate500,
    lineHeight: 22,
    marginBottom: 32,
  },
  ctaGroup: {
    gap: 12,
  },
  primaryBtn: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  secondaryBtn: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  navRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backBtn: {
    flex: 0.4,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.slate500,
  },
  nextBtn: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  stepLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 10,
    color: Colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
});
