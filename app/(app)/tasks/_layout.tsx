// app/(app)/tasks/_layout.tsx
import {Stack} from 'expo-router';

export default function TasksLayout() {
  return <Stack screenOptions={{headerShown: false}} />;
}
