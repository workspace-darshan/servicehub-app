// Sevak Design System — Color Tokens
export const Colors = {
  // Primary
  primary: '#1D4ED8',
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',

  // Neutrals
  darkNavy: '#0F172A',
  lightNavy: '#1E293B',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate300: '#CBD5E1',
  slate200: '#E2E8F0',
  slate100: '#F1F5F9',
  slate50: '#F8FAFC',

  // Blue tints
  blue50: '#EFF6FF',
  blue200: '#BFDBFE',

  // Semantic
  accentOrange: '#F97316',
  successGreen: '#22C55E',
  warningYellow: '#EAB308',
  errorRed: '#EF4444',

  // Surfaces
  background: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',

  // Status badge colors
  pendingBg: '#FEF9C3',
  pendingText: '#854D0E',
  respondedBg: '#DBEAFE',
  respondedText: '#1D4ED8',
  completedBg: '#DCFCE7',
  completedText: '#15803D',
  cancelledBg: '#FEE2E2',
  cancelledText: '#991B1B',

  // Backgrounds for surface hierarchy
  surfaceContainer: '#E5EEFF',
  surfaceContainerLow: '#EFF4FF',
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerHigh: '#DCE9FF',
  surfaceContainerHighest: '#D3E4FE',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#1E293B',
  textMuted: '#64748B',
  textDisabled: '#94A3B8',
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
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 24,
  xxxl: 28,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 16,
  xxl: 18,
  xxxl: 20,
  h2: 22,
  h1: 26,
  display: 28,
  hero: 32,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  nav: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const BOTTOM_NAV_HEIGHT = 70;
