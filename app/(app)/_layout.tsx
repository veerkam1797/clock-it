import {Tabs} from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{title: 'Home', tabBarIcon: () => {}}}
      />
      <Tabs.Screen
        name="attendance"
        options={{title: 'Attendance', tabBarIcon: () => {}}}
      />
      <Tabs.Screen
        name="tasks"
        options={{title: 'Tasks', tabBarIcon: () => {}}}
      />
      <Tabs.Screen
        name="expense"
        options={{title: 'Expenses', tabBarIcon: () => {}}}
      />
      <Tabs.Screen
        name="leave"
        options={{title: 'Leave', tabBarIcon: () => {}}}
      />
    </Tabs>
  );
}
