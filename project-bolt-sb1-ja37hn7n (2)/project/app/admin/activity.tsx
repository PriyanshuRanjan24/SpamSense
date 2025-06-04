import { View, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { Activity, AlertTriangle, CheckCircle, User } from 'lucide-react-native';

interface LogEntry {
  id: string;
  type: 'scan' | 'detection' | 'report';
  user: string;
  action: string;
  timestamp: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    type: 'scan',
    user: 'user@example.com',
    action: 'Scanned 50 emails',
    timestamp: '2024-02-20 14:30',
  },
  {
    id: '2',
    type: 'detection',
    user: 'admin@example.com',
    action: 'Detected 3 spam emails',
    timestamp: '2024-02-20 14:15',
  },
  {
    id: '3',
    type: 'report',
    user: 'user2@example.com',
    action: 'Reported false positive',
    timestamp: '2024-02-20 14:00',
  },
];

export default function ActivityScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'scan':
        return <Activity size={20} color={isDark ? '#60A5FA' : '#007AFF'} />;
      case 'detection':
        return <AlertTriangle size={20} color="#DC2626" />;
      case 'report':
        return <CheckCircle size={20} color="#10B981" />;
      default:
        return <User size={20} color={isDark ? '#60A5FA' : '#007AFF'} />;
    }
  };

  const renderItem = ({ item }: { item: LogEntry }) => (
    <View style={[styles.logItem, isDark && styles.logItemDark]}>
      <View style={styles.iconContainer}>
        {getActivityIcon(item.type)}
      </View>
      <View style={styles.logContent}>
        <Text style={[styles.actionText, isDark && styles.textDark]}>{item.action}</Text>
        <Text style={[styles.userText, isDark && styles.textDark]}>{item.user}</Text>
        <Text style={[styles.timestamp, isDark && styles.timestampDark]}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={mockLogs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={[styles.header, isDark && styles.textDark]}>System Activity Log</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: '#1C1C1E',
  },
  listContainer: {
    padding: 16,
  },
  logItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logItemDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logContent: {
    flex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  timestampDark: {
    color: '#6B7280',
  },
  textDark: {
    color: '#FFFFFF',
  },
});