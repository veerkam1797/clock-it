import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const unstable_settings = {
  anchor: '(app)',
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
