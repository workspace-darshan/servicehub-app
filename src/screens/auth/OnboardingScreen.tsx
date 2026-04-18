import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Find Trusted Professionals',
    body: 'Connect with verified plumbers, electricians, carpenters, and 15+ more service types near you in Palanpur and across Gujarat.',
    icon: 'construct-outline' as const,
    badgeIcon: 'shield-checkmark-outline' as const,
    badgeText: 'Verified Professionals',
    bg: ['#EFF6FF', '#DBEAFE'] as [string, string],
    accent: Colors.primary,
  },
  {
    id: 2,
    title: 'Compare & Choose the Best',
    body: 'Browse provider profiles, check star ratings, read real reviews, and compare experience — all in one place.',
    icon: 'star-outline' as const,
    badgeIcon: 'star' as const,
    badgeText: 'Rated Service Experts',
    bg: ['#F0FDF4', '#DCFCE7'] as [string, string],
    accent: Colors.successGreen,
  },
  {
    id: 3,
    title: 'Service Done. Simple.',
    body: 'Send enquiries, get connected, and rate providers after — making your home services stress-free.',
    icon: 'paper-plane-outline' as const,
    badgeIcon: 'flash-outline' as const,
    badgeText: 'Quick & Easy Process',
    bg: ['#FFF7ED', '#FFEDD5'] as [string, string],
    accent: Colors.accentOrange,
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const isLast = currentSlide === SLIDES.length - 1;
  const slide = SLIDES[currentSlide];

  return (
    <View style={styles.container}>
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
        {/* Large centered Ionicon */}
        <View style={[styles.illustrationIconBg, { backgroundColor: slide.accent + '18', borderColor: slide.accent + '30' }]}>
          <Ionicons name={slide.icon} size={80} color={slide.accent} />
        </View>
        {/* Floating badge */}
        <View style={[styles.floatingBadge, { borderColor: slide.accent + '30' }]}>
          <Ionicons name={slide.badgeIcon} size={13} color={slide.accent} />
          <Text style={{ fontSize: 11, color: slide.accent, fontWeight: FontWeight.semibold }}>
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

const CONTENT_HEIGHT = height * 0.48;
const ILLUS_HEIGHT = height * 0.52;

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
    fontSize: FontSize.base,
    color: Colors.slate500,
    fontWeight: FontWeight.medium,
  },
  illustrationArea: {
    height: ILLUS_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationIconBg: {
    width: 160, height: 160, borderRadius: 80,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
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
    marginTop: -28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
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
    fontSize: FontSize.h1,
    fontWeight: FontWeight.extrabold,
    color: Colors.darkNavy,
    lineHeight: 32,
    marginBottom: 12,
  },
  body: {
    fontSize: FontSize.base,
    color: Colors.slate500,
    lineHeight: 22,
    marginBottom: 32,
  },
  ctaGroup: {
    gap: 12,
  },
  primaryBtn: {
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  secondaryBtn: {
    height: 48,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  navRow: {
    flexDirection: 'row',
    gap: 12,
  },
  backBtn: {
    flex: 0.4,
    height: 48,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.slate500,
  },
  nextBtn: {
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  stepLabel: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 10,
    color: Colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: FontWeight.bold,
  },
});
