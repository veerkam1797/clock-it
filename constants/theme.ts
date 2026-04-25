// Clock It – React Native Paper MD3 Theme
//
// Strategy:
//   colors.ts  →  YOUR source of truth (raw hex values from Figma)
//   theme.ts   →  maps those values into two things simultaneously:
//                   1. Paper's MD3 theme (for all RN Paper components)
//                   2. Your own semantic tokens (for custom components)
//
// Usage:
//   // In _layout.tsx (root)
//   import { PaperProvider } from 'react-native-paper';
//   import { lightTheme, darkTheme } from '@/constants/theme';
//   <PaperProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
//
//   // In any custom component
//   import { useAppTheme } from '@/constants/theme';
//   const theme = useAppTheme();
//   <View style={{ backgroundColor: theme.colors.surface }} />
//   <Text style={{ color: theme.custom.headings }} />

import type { MD3Theme } from 'react-native-paper';
import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { Colors } from './colors';

// ─── 1. Paper MD3 color role mapping ─────────────────────────────────────────
//
// MD3 has specific named roles. Here's what each means and what we map to:
//
//  primary          → main brand colour          → purple[600]
//  onPrimary        → text/icon ON primary bg    → white
//  primaryContainer → tinted bg for chips, FAB   → purple[100]
//  onPrimaryContainer → text on primaryContainer → purple[900]
//
//  secondary        → supporting colour           → purple[400]
//  onSecondary      → text ON secondary bg        → white
//  secondaryContainer → e.g. selected tab bg      → purple[100]
//  onSecondaryContainer → text on it              → purple[700]
//
//  surface          → card, sheet, dialog bg      → white / gray[800]
//  onSurface        → text/icons on surface       → gray[900] / gray[50]
//  surfaceVariant   → slightly tinted surface     → gray[25] / gray[700]
//  onSurfaceVariant → subdued text on it          → gray[500] / gray[300]
//
//  background       → screen background           → base.white / base.black
//  onBackground     → text on background          → gray[900] / gray[25]
//
//  outline          → border, divider             → gray[200]
//  outlineVariant   → subtle divider              → gray[100]
//
//  error            → destructive/error states    → error[500]
//  onError          → text ON error bg            → white
//  errorContainer   → error bg chip               → error[50]
//  onErrorContainer → text on errorContainer      → error[900]

const lightColors: MD3Theme['colors'] = {
  // ── Brand / Primary ──────────────────────────────────────────────────────
  primary: Colors.purple[600],
  onPrimary: '#ffffff',
  primaryContainer: Colors.purple[100],
  onPrimaryContainer: Colors.purple[900],

  // ── Secondary (use for less prominent interactive elements) ───────────────
  secondary: Colors.purple[400],
  onSecondary: '#ffffff',
  secondaryContainer: Colors.purple[100],
  onSecondaryContainer: Colors.purple[700],

  // ── Tertiary (accent — use sparingly, e.g. success highlights) ────────────
  tertiary: Colors.success[600],
  onTertiary: '#ffffff',
  tertiaryContainer: Colors.success[50],
  onTertiaryContainer: Colors.success[900],

  // ── Surface & Background ──────────────────────────────────────────────────
  background: Colors.base.white,
  onBackground: Colors.gray[900],

  surface: '#ffffff',          // Card, BottomSheet, Dialog
  onSurface: Colors.gray[900],
  surfaceVariant: Colors.gray[25],    // Chip bg, segmented button bg
  onSurfaceVariant: Colors.gray[500],

  // ── Outline ───────────────────────────────────────────────────────────────
  outline: Colors.gray[200],   // Text field border, Divider
  outlineVariant: Colors.gray[100],   // Subtle dividers

  // ── Error ─────────────────────────────────────────────────────────────────
  error: Colors.error[500],
  onError: '#ffffff',
  errorContainer: Colors.error[50],
  onErrorContainer: Colors.error[900],

  // ── Inverse (used by Snackbar, Tooltip) ───────────────────────────────────
  inverseSurface: Colors.gray[900],
  inverseOnSurface: Colors.gray[25],
  inversePrimary: Colors.purple[200],

  // ── Elevation overlays (Paper uses these for tonal surfaces) ──────────────
  elevation: {
    level0: 'transparent',
    level1: Colors.gray[25],   // Card resting
    level2: Colors.gray[50],   // FAB resting
    level3: Colors.purple[25], // FAB pressed
    level4: Colors.purple[50], // Navbar
    level5: Colors.purple[100],// Drawer
  },

  // ── Misc ──────────────────────────────────────────────────────────────────
  shadow: Colors.gray[900],
  scrim: Colors.gray[900],   // Modal overlay scrim
  surfaceDisabled: Colors.gray[100],
  onSurfaceDisabled: Colors.gray[300],
  backdrop: Colors.gray[700],   // BottomSheet backdrop
};

const darkColors: MD3Theme['colors'] = {
  primary: Colors.purple[400],
  onPrimary: Colors.purple[900],
  primaryContainer: Colors.purple[700],
  onPrimaryContainer: Colors.purple[100],

  secondary: Colors.purple[300],
  onSecondary: Colors.purple[800],
  secondaryContainer: Colors.purple[700],
  onSecondaryContainer: Colors.purple[100],

  tertiary: Colors.success[400],
  onTertiary: Colors.success[900],
  tertiaryContainer: Colors.success[700],
  onTertiaryContainer: Colors.success[100],

  background: Colors.base.black,
  onBackground: Colors.gray[25],

  surface: Colors.gray[800],
  onSurface: Colors.gray[25],
  surfaceVariant: Colors.gray[700],
  onSurfaceVariant: Colors.gray[300],

  outline: Colors.gray[600],
  outlineVariant: Colors.gray[700],

  error: Colors.error[400],
  onError: Colors.error[900],
  errorContainer: Colors.error[700],
  onErrorContainer: Colors.error[100],

  inverseSurface: Colors.gray[100],
  inverseOnSurface: Colors.gray[800],
  inversePrimary: Colors.purple[600],

  elevation: {
    level0: 'transparent',
    level1: '#1e1a2e',
    level2: '#231e35',
    level3: '#28233d',
    level4: '#2a2540',
    level5: '#2d2844',
  },

  shadow: '#000000',
  scrim: '#000000',
  surfaceDisabled: Colors.gray[700],
  onSurfaceDisabled: Colors.gray[500],
  backdrop: 'rgba(0,0,0,0.6)',
};

// ─── 2. Custom semantic tokens ──────────────────────────────────────────
// These live ALONGSIDE the Paper theme — use for custom components
// that don't use Paper primitives.

type CustomTokens = {
  headings: string;
  body: string;
  subtext: string;
  labels: string;
  border: string;
  divider: string;
  success: string;
  warning: string;
  cardBg: string;
  inputBg: string;
  inputBorder: string;
  inputFocused: string;
  inputError: string;
};

const lightCustom: CustomTokens = {
  headings: Colors.gray[900],
  body: Colors.gray[800],
  subtext: Colors.gray[600],
  labels: Colors.gray[500],
  border: Colors.gray[100],
  divider: Colors.gray[200],
  success: Colors.success[600],
  warning: Colors.warning[500],
  cardBg: '#ffffff',
  inputBg: Colors.gray[25],
  inputBorder: Colors.gray[200],
  inputFocused: Colors.purple[600],
  inputError: Colors.error[500],
};

const darkCustom: CustomTokens = {
  headings: Colors.gray[25],
  body: Colors.gray[50],
  subtext: Colors.gray[300],
  labels: Colors.gray[200],
  border: Colors.gray[700],
  divider: Colors.gray[600],
  success: Colors.success[500],
  warning: Colors.warning[400],
  cardBg: Colors.gray[800],
  inputBg: Colors.gray[700],
  inputBorder: Colors.gray[600],
  inputFocused: Colors.purple[400],
  inputError: Colors.error[400],
};

// ─── 3. Compose final themes ──────────────────────────────────────────────────
// Spread Paper's base theme, override colors, attach custom tokens.

type AppTheme = MD3Theme & { custom: CustomTokens };

export const lightTheme: AppTheme = {
  ...MD3LightTheme,
  colors: lightColors,
  custom: lightCustom,
};

export const darkTheme: AppTheme = {
  ...MD3DarkTheme,
  colors: darkColors,
  custom: darkCustom,
};

// ─── 4. Typed useTheme hook ───────────────────────────────────────────────────
// Always use this instead of Paper's useTheme() directly.
// Gives you full type safety for both Paper colors AND custom tokens.

const useAppTheme = () => useTheme<AppTheme>();