// constants/shadows.ts
// Clock It – Design System Shadow Tokens
// Sourced from: Figma → Foundations → Effects / Shadows
//
// React Native splits a single CSS box-shadow into separate iOS and Android
// properties. This file handles both automatically.
//
// Usage:
//   import { Shadows } from '@/constants/shadows';
//   <View style={[styles.card, Shadows.md]} />

import { Platform, ViewStyle } from 'react-native';

// ─── Shadow colour base ───────────────────────────────────────────────────────
// Figma uses rgba(16, 24, 40, N) — Gray 900 at varying opacity.
// This matches the design system's neutral shadow tint.

const SHADOW_COLOR = '#101828'; // Gray 900

// ─── Shadow factory ───────────────────────────────────────────────────────────
// iOS uses shadowColor / shadowOffset / shadowOpacity / shadowRadius.
// Android uses elevation (maps to a Material shadow depth).
//
// The elevation values are calibrated to visually match the Figma shadows
// on a typical Android display.

type Shadow = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

const makeShadow = (
  offsetY: number,
  blur: number,
  opacity: number,
  elevation: number
): Shadow =>
  Platform.select({
    ios: {
      shadowColor: SHADOW_COLOR,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: blur,
    },
    android: {
      elevation,
    },
    default: {},
  }) as Shadow;

// ─── Named shadow tokens ──────────────────────────────────────────────────────
// Figma names:  xs → sm → md → lg → xl → 2xl
// Each step is progressively deeper — use the smallest shadow that works.

export const Shadows = {

  // Barely visible — for separating adjacent same-colour surfaces.
  // Use on: bottom nav bar, thin card dividers, input containers.
  xs: makeShadow(1, 2, 0.05, 1),

  // Subtle lift — the most common card shadow.
  // Use on: default cards, list items, profile avatars.
  sm: makeShadow(1, 3, 0.1, 2),

  // Moderate elevation — for interactive cards and bottom sheets.
  // Use on: task cards, expense cards, tap-to-expand sections.
  md: makeShadow(2, 6, 0.12, 4),

  // Strong lift — for modals, action sheets, date pickers.
  // Use on: bottom sheets, full-screen overlays.
  lg: makeShadow(4, 12, 0.14, 8),

  // High elevation — for toasts, tooltips, floating buttons.
  // Use on: FAB clock-in button, snack bars.
  xl: makeShadow(8, 16, 0.16, 12),

  // Maximum elevation — for dialogs and critical modals.
  '2xl': makeShadow(16, 24, 0.18, 20),

} as const;

// ─── Semantic aliases ─────────────────────────────────────────────────────────
// Use these instead of raw levels so that you can update globally later.

export const SemanticShadows = {
  card: Shadows.sm,    // all standard card surfaces
  activeCard: Shadows.md,    // card in pressed / selected state
  input: Shadows.xs,    // focused input container
  bottomSheet: Shadows.lg,    // bottom sheet lifted off the screen
  fab: Shadows.xl,    // floating clock-in button
  modal: Shadows['2xl'],// confirmation dialogs
} as const;

// ─── Inner / inset shadow workaround ─────────────────────────────────────────
// React Native does not support inset shadows natively.
// For a pressed / sunken effect, reduce elevation to 0 and use a
// light border instead:
//
//   pressed: {
//     borderWidth: 1,
//     borderColor: Colors.gray[200],
//     ...Shadows.xs,   // nearly flat
//   }