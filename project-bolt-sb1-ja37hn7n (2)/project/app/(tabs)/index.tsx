import { View, Text, StyleSheet, ScrollView, ActivityIndicator, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export default function DashboardScreen() {
  const [spamCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        // Using a simple image fetch as a connectivity test
        const response = await fetch('https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1&fit=crop&auto=format');
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
        Alert.alert(
          'Network Error',
          'Please check your internet connection and try again.',
          [{ text: 'OK', onPress: () => checkConnection() }]
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.containerDark]}>
        <ActivityIndicator size="large" color={isDark ? '#60A5FA' : '#007AFF'} />
        <Text style={[styles.loadingText, isDark && styles.textDark]}>Loading...</Text>
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={[styles.errorContainer, isDark && styles.containerDark]}>
        <Text style={[styles.errorTitle, isDark && styles.errorTitleDark]}>
          No Internet Connection
        </Text>
        <Text style={[styles.errorText, isDark && styles.textDark]}>
          Please check your network settings and try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.textDark]}>
          Spam Email Detector
        </Text>
      </View>
      
      <View style={[styles.statsCard, isDark && styles.cardDark]}>
        <Text style={[styles.statsLabel, isDark && styles.textDark]}>
          Total Spam Emails Detected
        </Text>
        <Text style={[styles.statsNumber, isDark && styles.statsNumberDark]}>
          {spamCount}
        </Text>
      </View>

      <View style={[styles.infoCard, isDark && styles.cardDark]}>
        <Text style={[styles.infoTitle, isDark && styles.textDark]}>
          How it works
        </Text>
        <Text style={[styles.infoText, isDark && styles.textDark]}>
          Our AI-powered system analyzes your emails in real-time using advanced machine learning algorithms. We check for multiple spam indicators including:
          
          • Suspicious sender domains
          • Unusual email patterns
          • Known spam keywords
          • Malicious links
          • Phishing attempts
          
          The system continuously learns from new patterns to improve detection accuracy.
        </Text>
      </View>
    </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 10,
  },
  errorTitleDark: {
    color: '#FF453A',
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  textDark: {
    color: '#FFFFFF',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerDark: {
    backgroundColor: '#1C1C1E',
    borderBottomColor: '#2C2C2E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  statsCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  statsLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statsNumberDark: {
    color: '#60A5FA',
  },
  infoCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});