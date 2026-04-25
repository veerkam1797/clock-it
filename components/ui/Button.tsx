// components/ui/Button.tsx
// Clock It – Button Component
//
// Covers all three Figma button types:
//   Button - Text            → label only
//   Button - Text and Symbol → label + leading icon
//   Button - Symbol          → icon only
//
// Variants (maps to Figma "Type" property):
//   filled   → solid purple background  (primary CTA — Clock In, Submit, Save)
//   outlined → border, transparent bg   (secondary action — Cancel, Back)
//   ghost    → no border, no bg         (tertiary / inline — Skip, View All)
//
// Sizes:
//   sm  → 36px height  (compact rows, chips)
//   md  → 44px height  (standard — most screens)
//   lg  → 52px height  (onboarding CTA, full-width primary actions)
//
// Usage:
//   <Button label="Clock In" onPress={handleClockIn} />
//   <Button label="Submit" variant="outlined" size="lg" fullWidth />
//   <Button label="Add Task" icon="plus" onPress={handleAdd} />
//   <Button icon="arrow-right" iconOnly onPress={handleNext} />
//   <Button label="Saving…" loading />
//   <Button label="Disabled" disabled />

import {Colors} from '@/constants/colors';
import {Typography} from '@/constants/typography';
import {useAppTheme} from '@/context/ThemeContext';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'filled' | 'outlined' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  // Content
  label?: string; // text shown inside button
  icon?: string; // MaterialCommunityIcons name
  iconOnly?: boolean; // true → render icon with no label

  // Appearance
  variant?: ButtonVariant; // default: 'filled'
  size?: ButtonSize; // default: 'md'
  fullWidth?: boolean; // stretches to container width

  // State
  disabled?: boolean;
  loading?: boolean; // shows spinner, disables press

  // Events
  onPress?: () => void;

  // Escape hatch for one-off overrides
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const SIZE = {
  sm: {height: 36, paddingH: 12, iconSize: 16, borderRadius: 24 / 2, gap: 6},
  md: {height: 44, paddingH: 16, iconSize: 18, borderRadius: 36 / 2, gap: 8},
  lg: {height: 52, paddingH: 20, iconSize: 20, borderRadius: 48 / 2, gap: 10},
} as const;

const LABEL_STYLE: Record<ButtonSize, TextStyle> = {
  sm: Typography.buttonSmall,
  md: Typography.button,
  lg: Typography.buttonLarge,
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Button({
  label,
  icon,
  iconOnly = false,
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onPress,
  style,
  labelStyle,
}: ButtonProps) {
  const {theme} = useAppTheme();
  const colors = theme.colors;
  const custom = theme.custom;

  const isDisabled = disabled || loading;
  const s = SIZE[size];

  // ── Derive colours from variant ──────────────────────────────────────────
  const variantStyles = getVariantStyles(variant, colors, custom, isDisabled);
  const isFilled = variant === 'filled';

  // ── Container ─────────────────────────────────────────────────────────────
  const containerStyle: ViewStyle = {
    height: s.height,
    paddingHorizontal: iconOnly ? 0 : s.paddingH,
    width: iconOnly ? s.height : fullWidth ? '100%' : undefined,
    borderRadius: s.borderRadius,
    borderWidth: variant === 'outlined' ? 1.5 : 0,
    borderColor: variantStyles.borderColor,
    // Filled variant uses gradient instead of flat backgroundColor
    backgroundColor: isFilled ? 'transparent' : variantStyles.backgroundColor,
    opacity: isDisabled ? 0.48 : 1,
    overflow: 'hidden', // clip gradient to borderRadius
  };

  // Gradient stops: light at top → dark at bottom
  // Light mode: purple[400] → purple[700]
  // Dark mode:  purple[300] → purple[600]
  const gradientColors = theme.dark
    ? [Colors.purple[400], Colors.purple[600]]
    : [Colors.purple[400], Colors.purple[700]];

  // ── Shared inner content ──────────────────────────────────────────────────
  const innerContent = loading ? (
    <ActivityIndicator size="small" color={variantStyles.contentColor} />
  ) : (
    <View style={[styles.row, {gap: s.gap}]}>
      {/* Leading icon — shown when icon prop is passed */}
      {icon && (
        <MaterialCommunityIcons
          name={icon as any}
          size={s.iconSize}
          color={variantStyles.contentColor}
        />
      )}

      {/* Label — hidden in iconOnly mode */}
      {!iconOnly && label && (
        <Text
          style={[
            LABEL_STYLE[size],
            {color: variantStyles.contentColor},
            labelStyle,
          ]}
          numberOfLines={1}>
          {label}
        </Text>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[styles.base, containerStyle, style]}>
      {/* Gradient background for filled variant */}
      {isFilled && (
        <LinearGradient
          colors={gradientColors as [string, string]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={StyleSheet.absoluteFill}
        />
      )}
      {innerContent}
    </TouchableOpacity>
  );
}

// ─── Variant colour resolver ──────────────────────────────────────────────────

function getVariantStyles(
  variant: ButtonVariant,
  colors: any,
  custom: any,
  isDisabled: boolean,
) {
  switch (variant) {
    case 'filled':
      return {
        backgroundColor: colors.primary, // purple[600]
        borderColor: 'transparent',
        contentColor: colors.onPrimary, // white
      };

    case 'outlined':
      return {
        backgroundColor: 'transparent',
        borderColor: colors.primary, // purple[600] border
        contentColor: colors.primary, // purple[600] text + icon
      };

    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        contentColor: colors.primary, // purple[600] text + icon
      };
  }
}

// ─── Base styles ──────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start', // shrink-wrap unless fullWidth is set
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
