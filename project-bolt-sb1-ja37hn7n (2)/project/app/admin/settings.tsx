import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { useState } from 'react';
import {
  Shield,
  Bell,
  Database,
  Lock,
  Mail,
  Users,
  AlertTriangle,
  Settings as SettingsIcon,
  ChevronRight
} from 'lucide-react-native';

export default function AdminSettingsScreen() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    description?: string,
    action?: React.ReactNode
  ) => (
    <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
      <View style={styles.settingContent}>
        <View style={styles.settingIcon}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, isDark && styles.textDark]}>{title}</Text>
          {description && (
            <Text style={[styles.settingDescription, isDark && styles.descriptionDark]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      {action}
    </View>
  );

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>System Settings</Text>
        
        {renderSettingItem(
          <Shield size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Maintenance Mode',
          'Take system offline for updates',
          <Switch
            value={maintenanceMode}
            onValueChange={setMaintenanceMode}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}

        {renderSettingItem(
          <Bell size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Email Notifications',
          'System alerts and reports',
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Security</Text>
        
        {renderSettingItem(
          <Lock size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Access Control',
          'Manage admin permissions',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <Users size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'User Authentication',
          'Security policies and 2FA',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Data Management</Text>
        
        {renderSettingItem(
          <Database size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Database Backup',
          'Automatic system backups',
          <Switch
            value={autoBackup}
            onValueChange={setAutoBackup}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}

        {renderSettingItem(
          <Mail size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Email Templates',
          'Customize system emails',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Advanced</Text>
        
        {renderSettingItem(
          <AlertTriangle size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'System Logs',
          'View error and activity logs',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <SettingsIcon size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'API Configuration',
          'Manage API settings and keys',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}
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
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItemDark: {
    backgroundColor: '#1C1C1E',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.05,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  textDark: {
    color: '#FFFFFF',
  },
  descriptionDark: {
    color: '#A0A0A5',
  },
});