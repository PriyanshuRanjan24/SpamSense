import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { supabase } from '@/lib/supabase';
import { View, ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';

export default function RootLayout() {
  useFrameworkReady();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading indicator while checking auth state
  if (isAuthenticated === null) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.loadingContainerDark]}>
        <ActivityIndicator size="large" color={isDark ? '#60A5FA' : '#007AFF'} />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="login" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
          </>
        )}
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
  },
  loadingContainerDark: {
    backgroundColor: '#000000',
  },
});