/**
 * ServiceHub Design System
 * Centralized theme configuration
 */

// Color Tokens
export const Colors = {
  // Primary (Orange)
  primary: '#FF6B00',
  primaryDark: '#E65100',
  primaryLight: '#FFD4B3',
  
  // Secondary (Purple)
  secondary: '#7C3AED',
  secondaryDark: '#5B21B6',
  secondaryLight: '#EDE9FE',

  // Neutrals
  darkNavy: '#0F172A',
  lightNavy: '#1E293B',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate300: '#CBD5E1',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  slate50: '#F8FAFC',

  // Semantic
  accentOrange: '#F97316',
  successGreen: '#22C55E',
  warningYellow: '#EAB308',
  errorRed: '#EF4444',

  // Surfaces
  background: '#F5F4F0',
  card: '#FFFFFF',
  border: '#ECECEC',

  // Status badge colors
  pendingBg: '#FEF9C3',
  pendingText: '#854D0E',
  respondedBg: '#DBEAFE',
  respondedText: '#1D4ED8',
  completedBg: '#DCFCE7',
  completedText: '#15803D',
  cancelledBg: '#FEE2E2',
  cancelledText: '#991B1B',

  // Text
  textPrimary: '#0D0D0D',
  textSecondary: '#888888',
  textMuted: '#AAAAAA',
  textDisabled: '#CCCCCC',
  white: '#FFFFFF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 20,
  xxxl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  xxxl: 20,
  h3: 22,
  h2: 24,
  h1: 28,
  display: 32,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Layout = {
  containerPadding: 18,
  headerHeight: 60,
  tabBarHeight: 70,
  maxWidth: 1200,
};

export const Animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

// Combined theme object
export const theme = {
  colors: Colors,
  spacing: Spacing,
  borderRadius: BorderRadius,
  fontSize: FontSize,
  fontWeight: FontWeight,
  shadows: Shadows,
  layout: Layout,
  animation: Animation,
};

export type Theme = typeof theme;

export default theme;
