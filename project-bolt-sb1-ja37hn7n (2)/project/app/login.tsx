import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Lock, User } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const email = username === 'admin' ? 'admin@example.com' : 'user@example.com';
      const actualPassword = username === 'admin' ? 'admin1234' : 'user1234';

      if (password !== '1234') {
        throw new Error('Invalid credentials');
      }

      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: actualPassword
      });

      if (signInError) throw signInError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      if (profile.role === 'admin') {
        router.replace('/admin/');
      } else {
        router.replace('/(tabs)');
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg' }}
          style={styles.headerImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>Spam Email Detector</Text>
        <Text style={styles.subtitle}>Admin & User Portal</Text>
      </View>

      <View style={[styles.formContainer, isDark && styles.formContainerDark]}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <View style={styles.inputIcon}>
            <User size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
          </View>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="Username (admin or user)"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError(null);
            }}
            autoCapitalize="none"
            editable={!isLoading}
          />
        </View>

        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <View style={styles.inputIcon}>
            <Lock size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
          </View>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="Password (1234)"
            placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(null);
            }}
            secureTextEntry
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.helpText}>
          <Text style={[styles.helpTextContent, isDark && styles.helpTextDark]}>
            Default credentials:{'\n'}
            Username: "admin" or "user"{'\n'}
            Password: "1234"
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  header: {
    height: 280,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  formContainerDark: {
    backgroundColor: '#1C1C1E',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputContainerDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3A3A3C',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputDark: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  helpTextContent: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  helpTextDark: {
    color: '#A0A0A5',
  },
});