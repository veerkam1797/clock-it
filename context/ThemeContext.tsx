// Clock It – Master Theme Provider
//
// Responsibility chain:
//   ThemeProvider                   ← owns light/dark state, persists preference
//     └─ PaperProvider              ← feeds MD3 theme to all Paper components
//         └─ StatusBar              ← syncs native bar style to current theme
//             └─ AppShell           ← sets root background + safe-area colour
//                 └─ {children}     ← your entire app
//
// Usage in app/_layout.tsx:
//   import { ThemeProvider } from '@/context/ThemeContext';
//   <ThemeProvider>{/* slot / Stack */}</ThemeProvider>
//
// Usage anywhere in the app:
//   import { useAppTheme } from '@/context/ThemeContext';
//   const { theme, isDark, toggleTheme } = useAppTheme();

import {darkTheme, lightTheme} from '@/constants/theme';
import {StatusBar} from 'expo-status-bar';
import React, {createContext, useContext} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';

// ─── Types ────────────────────────────────────────────────────────────────────

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  /** The fully composed Paper + custom theme object */
  theme: typeof lightTheme;
  /** Shorthand boolean — true when dark mode is active */
  isDark: boolean;
  /** Current preference: 'light' | 'dark' | 'system' */
  mode: ThemeMode;
  /** Toggle between light ↔ dark (sets mode to explicit, not system) */
  toggleTheme: () => void;
  /** Set a specific mode */
  setMode: (mode: ThemeMode) => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'clock_it_theme_mode';

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const systemScheme = useColorScheme();
  const isDark = systemScheme === 'dark';
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{theme, isDark}}>
      <PaperProvider theme={theme}>
        <StatusBar
          style={isDark ? 'light' : 'dark'}
          translucent
          backgroundColor="transparent"
        />
        <View
          style={[styles.shell, {backgroundColor: theme.colors.background}]}>
          {children}
        </View>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// Use this everywhere instead of Paper's useTheme() directly.
// Gives you the theme object PLUS isDark, mode, toggleTheme, setMode.

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
