import { View, Text, StyleSheet, RefreshControl, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useState, useCallback } from 'react';
import { Check, X, AlertTriangle, Shield } from 'lucide-react-native';
import { format } from 'date-fns';

interface SpamEmail {
  id: string;
  subject: string;
  sender: string;
  timestamp: Date;
  confidence: number;
  explanation: string;
}

const mockEmails: SpamEmail[] = [
  {
    id: '1',
    subject: 'Urgent: Your Account Needs Attention',
    sender: 'security@fakebank.com',
    timestamp: new Date(),
    confidence: 0.95,
    explanation: 'High-risk indicators detected: Urgent language, suspicious sender domain, request for immediate action.',
  },
  {
    id: '2',
    subject: 'You Won The Lottery!',
    sender: 'prize@winnings.scam',
    timestamp: new Date(Date.now() - 3600000),
    confidence: 0.98,
    explanation: 'Classic lottery scam patterns: Unsolicited prize notification, suspicious domain, requests for personal information.',
  },
];

export default function MonitorScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [emails, setEmails] = useState<SpamEmail[]>(mockEmails);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAction = (id: string, action: 'safe' | 'spam' | 'report') => {
    setEmails(current => current.filter(email => email.id !== id));
    // Here you would typically make an API call to update the status
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return '#DC2626';
    if (confidence >= 0.7) return '#F59E0B';
    return '#10B981';
  };

  return (
    <ScrollView
      style={[styles.container, isDark && styles.containerDark]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.header}>
        <Shield size={24} color={isDark ? '#60A5FA' : '#007AFF'} />
        <Text style={[styles.headerText, isDark && styles.textDark]}>
          Real-time Spam Monitor
        </Text>
      </View>

      {emails.map(email => (
        <View key={email.id} style={[styles.emailCard, isDark && styles.emailCardDark]}>
          <View style={styles.emailHeader}>
            <Text style={[styles.subject, isDark && styles.textDark]} numberOfLines={1}>
              {email.subject}
            </Text>
            <View style={[styles.confidenceBadge, { backgroundColor: getConfidenceColor(email.confidence) + '20' }]}>
              <Text style={[styles.confidenceText, { color: getConfidenceColor(email.confidence) }]}>
                {Math.round(email.confidence * 100)}% Spam
              </Text>
            </View>
          </View>

          <Text style={[styles.sender, isDark && styles.textDark]} numberOfLines={1}>
            From: {email.sender}
          </Text>
          
          <Text style={[styles.timestamp, isDark && styles.textDark]}>
            {format(email.timestamp, 'PPp')}
          </Text>

          <View style={styles.explanationContainer}>
            <AlertTriangle size={16} color={isDark ? '#60A5FA' : '#007AFF'} />
            <Text style={[styles.explanation, isDark && styles.textDark]}>
              {email.explanation}
            </Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.safeButton]}
              onPress={() => handleAction(email.id, 'safe')}>
              <Check size={20} color="#10B981" />
              <Text style={styles.actionButtonText}>Mark Safe</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.spamButton]}
              onPress={() => handleAction(email.id, 'spam')}>
              <X size={20} color="#DC2626" />
              <Text style={styles.actionButtonText}>Confirm Spam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.reportButton]}
              onPress={() => handleAction(email.id, 'report')}>
              <AlertTriangle size={20} color="#F59E0B" />
              <Text style={styles.actionButtonText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {emails.length === 0 && (
        <View style={styles.emptyState}>
          <Shield size={48} color={isDark ? '#60A5FA' : '#007AFF'} />
          <Text style={[styles.emptyStateText, isDark && styles.textDark]}>
            No suspicious emails detected
          </Text>
        </View>
      )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1C1C1E',
  },
  emailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emailCardDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sender: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  explanationContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  explanation: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  safeButton: {
    backgroundColor: '#D1FAE5',
  },
  spamButton: {
    backgroundColor: '#FEE2E2',
  },
  reportButton: {
    backgroundColor: '#FEF3C7',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    textAlign: 'center',
  },
  textDark: {
    color: '#FFFFFF',
  },
});