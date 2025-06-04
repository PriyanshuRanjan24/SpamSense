import { View, Text, StyleSheet, FlatList, useColorScheme, Pressable } from 'react-native';
import { useState } from 'react';

const mockHistory = [
  { 
    id: '1', 
    email: 'spam@example.com', 
    date: '2024-02-20', 
    type: 'Spam',
    explanation: 'This email was flagged as spam due to suspicious sender domain, presence of urgent language, and requests for sensitive information.'
  },
  { 
    id: '2', 
    email: 'offers@spam.com', 
    date: '2024-02-19', 
    type: 'Spam',
    explanation: 'Multiple red flags detected: unrealistic promises, excessive use of capital letters, and suspicious links.'
  },
  { 
    id: '3', 
    email: 'lottery@scam.com', 
    date: '2024-02-18', 
    type: 'Spam',
    explanation: 'Classic lottery scam patterns: unexpected prize notification, request for personal details, and poor grammar.'
  },
];

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => setSelectedEmail(selectedEmail === item.id ? null : item.id)}
      style={[
        styles.historyItem,
        isDark && styles.historyItemDark,
      ]}>
      <View style={styles.emailInfo}>
        <Text style={[styles.emailText, isDark && styles.textDark]}>{item.email}</Text>
        <Text style={[styles.dateText, isDark && styles.dateTextDark]}>{item.date}</Text>
      </View>
      <View style={[styles.badge, styles.spamBadge]}>
        <Text style={styles.badgeText}>{item.type}</Text>
      </View>
      {selectedEmail === item.id && (
        <View style={[styles.explanationContainer, isDark && styles.explanationContainerDark]}>
          <Text style={[styles.explanationTitle, isDark && styles.textDark]}>AI Analysis</Text>
          <Text style={[styles.explanationText, isDark && styles.textDark]}>{item.explanation}</Text>
        </View>
      )}
    </Pressable>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={mockHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={[styles.emptyText, isDark && styles.textDark]}>
            No spam emails detected yet
          </Text>
        }
      />
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
  listContainer: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
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
  historyItemDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  emailInfo: {
    flex: 1,
    marginRight: 12,
  },
  emailText: {
    fontSize: 16,
    color: '#1C1C1E',
    marginBottom: 4,
  },
  textDark: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dateTextDark: {
    color: '#A0A0A5',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  spamBadge: {
    backgroundColor: '#FFE5E5',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF3B30',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 16,
    marginTop: 24,
  },
  explanationContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  explanationContainerDark: {
    backgroundColor: '#2C2C2E',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});