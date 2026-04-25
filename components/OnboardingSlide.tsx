// app/(auth)/OnboardingSlide.tsx
// Clock It – Onboarding FlatList Item
//
// This is the renderItem component for the onboarding FlatList.
// One instance = one slide. The parent (onboarding.tsx) passes
// the slide data as props and handles all navigation logic.
//
// Slot into onboarding.tsx like this:
//
//   <FlatList
//     data={slides}
//     keyExtractor={(item) => item.id.toString()}
//     renderItem={({ item }) => <OnboardingSlide {...item} />}
//     horizontal
//     pagingEnabled
//     showsHorizontalScrollIndicator={false}
//   />

import {Typography} from '@/constants/typography';
import {useAppTheme} from '@/context/ThemeContext';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SlideData {
  id: number;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// ─── Component ────────────────────────────────────────────────────────────────

export function OnboardingSlide({image, title, subtitle}: SlideData) {
  const {theme} = useAppTheme();

  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: theme.custom.headings}]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, {color: theme.custom.subtext}]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  imageContainer: {
    height: SCREEN_HEIGHT * 0.65,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12, 
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    padding: 24,
    alignItems: 'center',
    gap: 16,
  },

  title: {
    ...Typography.heading1,
    textAlign: 'center',
  },

  subtitle: {
    ...Typography.bodyLarge,
    textAlign: 'center',
    // maxWidth: SCREEN_WIDTH * 0.75,
  },
});
