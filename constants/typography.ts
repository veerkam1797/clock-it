// constants/typography.ts
// Clock It – Design System Typography Tokens
// Sourced from: Figma → Foundations → Typography
// Font: Inter (loaded via expo-font)

import { Platform } from 'react-native';

// ─── Font Family ────────────────────────────────────────────────────────────

export const FontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

// ─── Font Size Scale ─────────────────────────────────────────────────────────
// Maps directly to the type scale shown in Figma Foundation → Typography

export const FontSize = {
  xs: 10,   // captions, badges
  sm: 12,   // helper text, hints, labels below inputs
  base: 14,   // body text, list items
  md: 16,   // subheadings, input text
  lg: 18,   // section titles
  xl: 20,   // screen titles
  '2xl': 24,  // large headings
  '3xl': 30,  // hero headings
  '4xl': 36,  // display
} as const;

// ─── Line Height Scale ────────────────────────────────────────────────────────

export const LineHeight = {
  xs: 14,
  sm: 18,
  base: 20,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 32,
  '3xl': 38,
  '4xl': 44,
} as const;

// ─── Letter Spacing ───────────────────────────────────────────────────────────

export const LetterSpacing = {
  tighter: -0.4,
  tight: -0.2,
  normal: 0,
  wide: 0.2,
  wider: 0.4,
  widest: 0.8,   // used for ALL CAPS labels
} as const;

// ─── Composite Text Styles ────────────────────────────────────────────────────
// Ready-to-spread objects — use with StyleSheet.create()
// Example: ...Typography.heading1

export const Typography = {

  // ── Display ──────────────────────────────────────────────────────────────
  display: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['4xl'],
    lineHeight: LineHeight['4xl'],
    letterSpacing: LetterSpacing.tight,
  },

  // ── Headings ─────────────────────────────────────────────────────────────
  heading1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['3xl'],
    lineHeight: LineHeight['3xl'],
    letterSpacing: LetterSpacing.tight,
  },
  heading2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize['2xl'],
    lineHeight: LineHeight['2xl'],
    letterSpacing: LetterSpacing.tight,
  },
  heading3: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xl,
    lineHeight: LineHeight.xl,
    letterSpacing: LetterSpacing.normal,
  },
  heading4: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    lineHeight: LineHeight.lg,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Body ─────────────────────────────────────────────────────────────────
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    letterSpacing: LetterSpacing.normal,
  },
  bodyLargeMedium: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    letterSpacing: LetterSpacing.normal,
  },
  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  },
  bodyMedium: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  },
  bodySemiBold: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Labels ────────────────────────────────────────────────────────────────
  // Used above inputs, in form fields, nav tabs
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.normal,
  },
  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs + 4,
    letterSpacing: LetterSpacing.wide,
  },

  // ── Helper / Hint ─────────────────────────────────────────────────────────
  // Text below inputs — matches Figma Input anatomy "Hint text"
  hint: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Caption ───────────────────────────────────────────────────────────────
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: LineHeight.xs,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Buttons ───────────────────────────────────────────────────────────────
  buttonLarge: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    lineHeight: LineHeight.md,
    letterSpacing: LetterSpacing.normal,
  },
  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: LineHeight.base,
    letterSpacing: LetterSpacing.normal,
  },
  buttonSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.sm,
    lineHeight: LineHeight.sm,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Navigation tabs ───────────────────────────────────────────────────────
  tabLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: 14,
    letterSpacing: LetterSpacing.normal,
  },

  // ── Overline (ALL CAPS label above a section) ─────────────────────────────
  overline: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xs,
    lineHeight: 14,
    letterSpacing: LetterSpacing.widest,
    textTransform: 'uppercase' as const,
  },
} as const;

// ─── Platform-aware font fix ─────────────────────────────────────────────────
// Android renders Inter slightly larger than iOS — use this wrapper
// when you notice size discrepancies across platforms.

export const platformFontSize = (size: number): number =>
  Platform.OS === 'android' ? size - 0.5 : size;