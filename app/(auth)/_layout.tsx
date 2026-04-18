import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="onboarding" screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="verify-otp" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
