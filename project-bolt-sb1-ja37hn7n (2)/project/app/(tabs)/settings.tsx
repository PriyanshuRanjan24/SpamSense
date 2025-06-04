import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { useState } from 'react';
import {
  Bell,
  Moon,
  Shield,
  Upload,
  Users,
  Globe,
  Cloud,
  Filter,
  Mail,
  ChevronRight,
  Languages
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);
  const [backupEnabled, setBackupEnabled] = useState(true);
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
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Preferences</Text>
        
        {renderSettingItem(
          <Bell size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Notifications',
          'Choose how you want to be notified',
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}

        {renderSettingItem(
          <Moon size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Dark Mode',
          'Switch between light and dark themes',
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}

        {renderSettingItem(
          <Shield size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Auto-delete Spam',
          'Automatically remove detected spam',
          <Switch
            value={autoDelete}
            onValueChange={setAutoDelete}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Data Management</Text>
        
        {renderSettingItem(
          <Upload size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Export Reports',
          'Download spam detection logs',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <Cloud size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Cloud Backup',
          'Sync settings across devices',
          <Switch
            value={backupEnabled}
            onValueChange={setBackupEnabled}
            trackColor={{ false: '#D1D1D6', true: isDark ? '#60A5FA' : '#007AFF' }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>Configuration</Text>
        
        {renderSettingItem(
          <Filter size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Custom Filters',
          'Manage spam detection rules',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <Mail size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Email Accounts',
          'Manage connected accounts',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <Languages size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Language',
          'Change app language',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>About</Text>
        
        {renderSettingItem(
          <Users size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'User Roles',
          'Manage access permissions',
          <ChevronRight size={20} color={isDark ? '#60A5FA' : '#007AFF'} />
        )}

        {renderSettingItem(
          <Globe size={24} color={isDark ? '#60A5FA' : '#007AFF'} />,
          'Version',
          '1.0.0',
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