// app/(app)/_layout.tsx
import {Colors} from '@/constants/colors';
import {Drawables} from '@/constants/drawable';
import {useAppTheme} from '@/context/ThemeContext';
import {Tabs} from 'expo-router';
import {Icon} from 'react-native-paper';

export default function AppLayout() {
  const {theme} = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: theme.colors.primary,
        // tabBarInactiveTintColor: theme.custom.subtext,
        tabBarStyle: {
          backgroundColor: Colors.base.black,
          borderTopColor: theme.custom.border,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={
                focused
                  ? Drawables.bottomNavigation.homeActive
                  : Drawables.bottomNavigation.home
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Attendance',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={
                focused
                  ? Drawables.bottomNavigation.clockActive
                  : Drawables.bottomNavigation.clock
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks" // ✅ Expo Router matches this to tasks/index
        options={{
          title: 'Tasks',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={
                focused
                  ? Drawables.bottomNavigation.tasksActive
                  : Drawables.bottomNavigation.tasks
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="expense" // ✅ matches expense/index
        options={{
          title: 'Expense',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={
                focused
                  ? Drawables.bottomNavigation.expenseActive
                  : Drawables.bottomNavigation.expense
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* ── Hide these from the tab bar — they exist as routes but have no tab ── */}
      <Tabs.Screen name="leave" options={{href: null}} />
      <Tabs.Screen name="notifications" options={{href: null}} />
      <Tabs.Screen name="messages" options={{href: null}} />
    </Tabs>
  );
}
