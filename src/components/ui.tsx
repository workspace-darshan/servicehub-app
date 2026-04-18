import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../constants/theme';

// ═══════════════════════════════════════════════
// PRIMARY BUTTON
// ═══════════════════════════════════════════════
interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'lg' | 'sm';
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'lg',
  style,
}) => {
  const height = size === 'lg' ? 48 : 40;

  const bgColor =
    variant === 'primary'
      ? disabled
        ? Colors.slate400
        : Colors.primary
      : 'transparent';

  const borderColor =
    variant === 'secondary' ? Colors.primary : 'transparent';

  const textColor =
    variant === 'primary'
      ? Colors.white
      : variant === 'danger'
      ? Colors.errorRed
      : Colors.primary;

  const borderWidth = variant === 'secondary' ? 1.5 : 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.button,
        {
          height,
          backgroundColor: bgColor,
          borderColor,
          borderWidth,
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text style={[styles.buttonText, { color: textColor, fontSize: size === 'sm' ? 14 : 16 }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// ═══════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════
type StatusType = 'Pending' | 'Responded' | 'Completed' | 'Cancelled' | 'New' | 'Replied' | 'Closed';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config: Record<StatusType, { bg: string; text: string }> = {
    Pending: { bg: Colors.pendingBg, text: Colors.pendingText },
    New: { bg: '#FFF7ED', text: '#C2410C' },
    Responded: { bg: Colors.respondedBg, text: Colors.respondedText },
    Replied: { bg: Colors.completedBg, text: Colors.completedText },
    Completed: { bg: Colors.completedBg, text: Colors.completedText },
    Cancelled: { bg: Colors.cancelledBg, text: Colors.cancelledText },
    Closed: { bg: Colors.slate100, text: Colors.slate500 },
  };

  const { bg, text } = config[status] || config.Pending;

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color: text }]}>{status}</Text>
    </View>
  );
};

// ═══════════════════════════════════════════════
// CHIP / TAG
// ═══════════════════════════════════════════════
interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const Chip: React.FC<ChipProps> = ({ label, active = false, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
    style={[
      styles.chip,
      active && { backgroundColor: Colors.primary, borderColor: Colors.primary },
    ]}>
    <Text style={[styles.chipText, active && { color: Colors.white }]}>{label}</Text>
  </TouchableOpacity>
);

// ═══════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════
interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onViewAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {onViewAll && (
      <TouchableOpacity onPress={onViewAll}>
        <Text style={styles.viewAll}>View All →</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ═══════════════════════════════════════════════
// AVATAR
// ═══════════════════════════════════════════════
interface AvatarProps {
  initials: string;
  size?: number;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, size = 48, color = Colors.primary }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Colors.blue50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: Colors.blue200,
    }}>
    <Text
      style={{
        fontSize: size * 0.33,
        fontWeight: FontWeight.bold,
        color,
      }}>
      {initials}
    </Text>
  </View>
);

// ═══════════════════════════════════════════════
// DIVIDER
// ═══════════════════════════════════════════════
export const Divider = () => (
  <View style={{ height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md }} />
);

// ═══════════════════════════════════════════════
// STAR RATING
// ═══════════════════════════════════════════════
interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviews, size = 'md' }) => {
  const starSize = size === 'sm' ? 12 : 14;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: starSize + 2, color: Colors.warningYellow }}>{'★'.repeat(Math.floor(rating))}</Text>
      <Text style={{ fontSize: starSize, fontWeight: FontWeight.bold, color: Colors.darkNavy }}>{rating}</Text>
      {reviews !== undefined && (
        <Text style={{ fontSize: starSize - 1, color: Colors.slate500 }}>({reviews} reviews)</Text>
      )}
    </View>
  );
};

// ═══════════════════════════════════════════════
// VERIFIED BADGE
// ═══════════════════════════════════════════════
export const VerifiedBadge = () => (
  <View style={styles.verifiedBadge}>
    <Text style={{ fontSize: 10, color: Colors.successGreen, marginRight: 2 }}>✓</Text>
    <Text style={styles.verifiedText}>Verified</Text>
  </View>
);

// ═══════════════════════════════════════════════
// INPUT FIELD
// ═══════════════════════════════════════════════
import { TextInput, TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  leftIcon?: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  leftIcon,
  error,
  style,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={{ marginBottom: Spacing.md }}>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          focused && { borderColor: Colors.primary },
          error ? { borderColor: Colors.errorRed } : {},
        ]}>
        {leftIcon && (
          <Text style={styles.inputIcon}>{leftIcon}</Text>
        )}
        <TextInput
          style={[styles.inputField, !!leftIcon && { paddingLeft: Spacing.sm }, style]}
          placeholderTextColor={Colors.slate400}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// ═══════════════════════════════════════════════
// BOTTOM NAV BAR (shared component)
// ═══════════════════════════════════════════════
interface BottomNavBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  isProvider?: boolean;
}

const CUSTOMER_TABS = [
  { key: 'Home', label: 'Home', icon: '🏠' },
  { key: 'Services', label: 'Services', icon: '⚙️' },
  { key: 'Providers', label: 'Providers', icon: '👥' },
  { key: 'Activity', label: 'Activity', icon: '🕐' },
  { key: 'Profile', label: 'Profile', icon: '👤' },
];

const PROVIDER_TABS = [
  { key: 'Dashboard', label: 'Dashboard', icon: '📊' },
  { key: 'Enquiries', label: 'Enquiries', icon: '📩' },
  { key: 'Services', label: 'Services', icon: '⚙️' },
  { key: 'Profile', label: 'Profile', icon: '👤' },
  { key: 'Settings', label: 'Settings', icon: '⚙️' },
];

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xl,
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: Colors.blue50,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.blue200,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.darkNavy,
  },
  viewAll: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  verifiedText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.successGreen,
  },
  inputLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.slate500,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  inputIcon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },
  inputField: {
    flex: 1,
    fontSize: FontSize.lg,
    color: Colors.darkNavy,
    height: '100%',
    outlineStyle: 'none',
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.errorRed,
    marginTop: 4,
  },
});
