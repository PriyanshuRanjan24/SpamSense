import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Activity, History, Settings, Shield } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: isDark ? '#60A5FA' : '#007AFF',
        tabBarInactiveTintColor: isDark ? '#6B7280' : '#8E8E93',
        tabBarStyle: {
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#2C2C2E' : '#E5E5EA',
        },
        headerStyle: {
          backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#000000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <Shield size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="monitor"
        options={{
          title: 'Monitor',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}