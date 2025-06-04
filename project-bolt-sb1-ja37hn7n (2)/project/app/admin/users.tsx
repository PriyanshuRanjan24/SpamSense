import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { User, MoreVertical, Shield, Mail } from 'lucide-react-native';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2024-02-20 15:30',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    lastActive: '2024-02-20 14:45',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'inactive',
    lastActive: '2024-02-19 09:15',
  },
];

export default function UsersScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderItem = ({ item }: { item: UserData }) => (
    <View style={[styles.userCard, isDark && styles.userCardDark]}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <View style={[styles.avatar, isDark && styles.avatarDark]}>
            <User size={24} color={isDark ? '#60A5FA' : '#007AFF'} />
          </View>
          <View>
            <Text style={[styles.userName, isDark && styles.textDark]}>{item.name}</Text>
            <Text style={[styles.userEmail, isDark && styles.textDark]}>{item.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        </TouchableOpacity>
      </View>

      <View style={styles.userDetails}>
        <View style={styles.detailItem}>
          <Shield size={16} color={isDark ? '#60A5FA' : '#007AFF'} />
          <Text style={[styles.detailText, isDark && styles.textDark]}>{item.role}</Text>
        </View>
        <View style={styles.detailItem}>
          <Mail size={16} color={isDark ? '#60A5FA' : '#007AFF'} />
          <Text style={[styles.detailText, isDark && styles.textDark]}>
            Last active: {item.lastActive}
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusBadge,
            item.status === 'active' ? styles.statusActive : styles.statusInactive,
          ]}>
          <Text
            style={[
              styles.statusText,
              item.status === 'active' ? styles.statusTextActive : styles.statusTextInactive,
            ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <FlatList
        data={mockUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <Text style={[styles.header, isDark && styles.textDark]}>User Management</Text>
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
  userCard: {
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
  userCardDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarDark: {
    backgroundColor: '#2C2C2E',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  moreButton: {
    padding: 8,
  },
  userDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#059669',
  },
  statusTextInactive: {
    color: '#DC2626',
  },
  textDark: {
    color: '#FFFFFF',
  },
});