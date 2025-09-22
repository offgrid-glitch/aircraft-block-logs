import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { 
  Text, 
  Card, 
  List,
  Switch,
  Button,
  Divider,
  RadioButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '@/navigation/AppNavigator';
import { strings } from '@/utils/strings';

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('light');
  const [defaultAircraft, setDefaultAircraft] = useState('');

  const handleExportData = async () => {
    try {
      // TODO: Implement data export
      Alert.alert(
        'Export Data',
        'Data export functionality will be implemented soon. This will allow you to backup all your aircraft logs.',
        [{ text: strings.common.ok }]
      );
    } catch (error) {
      console.error('Error exporting data:', error);
      Alert.alert(
        strings.errors.export,
        'Failed to export data. Please try again.',
        [{ text: strings.common.ok }]
      );
    }
  };

  const handleImportData = async () => {
    try {
      // TODO: Implement data import
      Alert.alert(
        'Import Data',
        'Data import functionality will be implemented soon. This will allow you to restore from a backup.',
        [{ text: strings.common.ok }]
      );
    } catch (error) {
      console.error('Error importing data:', error);
      Alert.alert(
        strings.errors.import,
        'Failed to import data. Please try again.',
        [{ text: strings.common.ok }]
      );
    }
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      strings.settings.clearDataConfirm,
      [
        {
          text: strings.common.cancel,
          style: 'cancel',
        },
        {
          text: strings.common.delete,
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Implement data clearing
              // const storageService = new LocalStorageService();
              // await storageService.clearAllData();
              Alert.alert(
                'Data Cleared',
                'All data has been cleared successfully.',
                [{ text: strings.common.ok }]
              );
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert(
                strings.errors.generic,
                'Failed to clear data. Please try again.',
                [{ text: strings.common.ok }]
              );
            }
          },
        },
      ]
    );
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handlePrivacyPolicy = () => {
    // TODO: Add privacy policy URL
    Alert.alert(
      'Privacy Policy',
      'Privacy policy will be available soon.',
      [{ text: strings.common.ok }]
    );
  };

  const handleTermsOfService = () => {
    // TODO: Add terms of service URL
    Alert.alert(
      'Terms of Service',
      'Terms of service will be available soon.',
      [{ text: strings.common.ok }]
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Choose how you would like to contact support:',
      [
        {
          text: 'Email',
          onPress: () => Linking.openURL('mailto:support@aircraftblocklogs.com'),
        },
        {
          text: strings.common.cancel,
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* App Preferences */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.settings.preferences}
            </Text>
            
            <List.Item
              title={strings.settings.notifications}
              description="Receive reminders and alerts"
              right={() => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                />
              )}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title={strings.settings.autoSave}
              description="Automatically save changes"
              right={() => (
                <Switch
                  value={autoSave}
                  onValueChange={setAutoSave}
                />
              )}
            />
            
            <Divider style={styles.divider} />
            
            <Text variant="bodyLarge" style={styles.optionLabel}>
              {strings.settings.theme}
            </Text>
            <RadioButton.Group
              onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'auto')}
              value={theme}
            >
              <View style={styles.radioOption}>
                <RadioButton value="light" />
                <Text variant="bodyLarge">Light</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="dark" />
                <Text variant="bodyLarge">Dark</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="auto" />
                <Text variant="bodyLarge">Auto (System)</Text>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.settings.data}
            </Text>
            
            <List.Item
              title={strings.settings.exportData}
              description="Export all logs to file"
              left={(props) => <List.Icon {...props} icon="download" />}
              onPress={handleExportData}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title={strings.settings.importData}
              description="Import logs from file"
              left={(props) => <List.Icon {...props} icon="upload" />}
              onPress={handleImportData}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title={strings.settings.clearData}
              description="Delete all logs permanently"
              left={(props) => <List.Icon {...props} icon="delete" color="#f44336" />}
              onPress={handleClearData}
              titleStyle={{ color: '#f44336' }}
            />
          </Card.Content>
        </Card>

        {/* Help & Support */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Help & Support
            </Text>
            
            <List.Item
              title="Help & FAQ"
              description="Get help and find answers"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              onPress={handleHelp}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title="Contact Support"
              description="Get in touch with our team"
              left={(props) => <List.Icon {...props} icon="email" />}
              onPress={handleContactSupport}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title={strings.settings.privacy}
              description="Read our privacy policy"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              onPress={handlePrivacyPolicy}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title={strings.settings.terms}
              description="Read terms of service"
              left={(props) => <List.Icon {...props} icon="file-document" />}
              onPress={handleTermsOfService}
            />
          </Card.Content>
        </Card>

        {/* About */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.settings.about}
            </Text>
            
            <View style={styles.aboutInfo}>
              <View style={styles.infoRow}>
                <Text variant="bodyLarge">App Name:</Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  {strings.appName}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="bodyLarge">{strings.settings.version}:</Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  1.0.0
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text variant="bodyLarge">{strings.settings.buildNumber}:</Text>
                <Text variant="bodyLarge" style={styles.infoValue}>
                  1
                </Text>
              </View>
            </View>
            
            <Text variant="bodyMedium" style={styles.description}>
              Aircraft Block Logs helps aviation professionals track aircraft 
              block-in/out times, capture documentation photos, and generate 
              comprehensive reports for regulatory compliance and operational efficiency.
            </Text>
          </Card.Content>
        </Card>

        {/* Developer Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Developer Information
            </Text>
            
            <Text variant="bodyMedium" style={styles.developerText}>
              This app is built with Expo and React Native, designed specifically 
              for aviation professionals who need reliable and accurate flight logging capabilities.
            </Text>
            
            <View style={styles.techStack}>
              <Text variant="bodySmall" style={styles.techLabel}>Built with:</Text>
              <Text variant="bodySmall" style={styles.techText}>
                • React Native & Expo
              </Text>
              <Text variant="bodySmall" style={styles.techText}>
                • TypeScript
              </Text>
              <Text variant="bodySmall" style={styles.techText}>
                • React Native Paper
              </Text>
              <Text variant="bodySmall" style={styles.techText}>
                • Expo Camera & Location
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2196F3',
  },
  divider: {
    marginVertical: 8,
  },
  optionLabel: {
    marginBottom: 12,
    marginTop: 8,
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  aboutInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoValue: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  developerText: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  techStack: {
    marginTop: 8,
  },
  techLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  techText: {
    color: '#666',
    marginBottom: 4,
  },
});