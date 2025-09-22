import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { 
  Text, 
  Card, 
  List,
  Button,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { strings } from '@/utils/strings';

export default function HelpScreen() {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@aircraftblocklogs.com?subject=Support Request');
  };

  const handleReportBug = () => {
    Linking.openURL('mailto:support@aircraftblocklogs.com?subject=Bug Report');
  };

  const handleRequestFeature = () => {
    Linking.openURL('mailto:support@aircraftblocklogs.com?subject=Feature Request');
  };

  const handleOpenDocumentation = () => {
    // TODO: Add documentation URL
    Linking.openURL('https://aircraftblocklogs.com/docs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Getting Started */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.help.gettingStarted}
            </Text>
            
            <Text variant="bodyMedium" style={styles.description}>
              Welcome to Aircraft Block Logs! This app helps you track aircraft 
              block-in/out times, capture documentation photos, and generate reports.
            </Text>
            
            <Text variant="titleMedium" style={styles.stepTitle}>
              Quick Start Guide:
            </Text>
            
            <View style={styles.step}>
              <Text variant="bodyMedium" style={styles.stepNumber}>1.</Text>
              <Text variant="bodyMedium" style={styles.stepText}>
                Tap "Start New Log" on the home screen
              </Text>
            </View>
            
            <View style={styles.step}>
              <Text variant="bodyMedium" style={styles.stepNumber}>2.</Text>
              <Text variant="bodyMedium" style={styles.stepText}>
                Capture a photo when blocking in
              </Text>
            </View>
            
            <View style={styles.step}>
              <Text variant="bodyMedium" style={styles.stepNumber}>3.</Text>
              <Text variant="bodyMedium" style={styles.stepText}>
                Fill in the flight details form
              </Text>
            </View>
            
            <View style={styles.step}>
              <Text variant="bodyMedium" style={styles.stepNumber}>4.</Text>
              <Text variant="bodyMedium" style={styles.stepText}>
                Capture a photo when blocking out
              </Text>
            </View>
            
            <View style={styles.step}>
              <Text variant="bodyMedium" style={styles.stepNumber}>5.</Text>
              <Text variant="bodyMedium" style={styles.stepText}>
                Review and share your completed log
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Frequently Asked Questions */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.help.faq}
            </Text>
            
            <View style={styles.faqItem}>
              <Text variant="titleMedium" style={styles.faqQuestion}>
                What is block time?
              </Text>
              <Text variant="bodyMedium" style={styles.faqAnswer}>
                Block time is the time from when an aircraft first moves from the gate 
                (block out) until it stops at the destination gate (block in). This is 
                different from flight time, which only counts when the aircraft is airborne.
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.faqItem}>
              <Text variant="titleMedium" style={styles.faqQuestion}>
                Why do I need to take photos?
              </Text>
              <Text variant="bodyMedium" style={styles.faqAnswer}>
                Photos provide visual documentation of the aircraft condition at block-in 
                and block-out times. This can be important for maintenance tracking, 
                insurance claims, and regulatory compliance.
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.faqItem}>
              <Text variant="titleMedium" style={styles.faqQuestion}>
                Can I edit a completed log?
              </Text>
              <Text variant="bodyMedium" style={styles.faqAnswer}>
                Yes, you can edit most fields in a completed log by going to the Logs 
                tab, finding your log, and tapping the edit icon. However, timestamps 
                should only be edited if there was an error in recording.
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.faqItem}>
              <Text variant="titleMedium" style={styles.faqQuestion}>
                How do I export my logs?
              </Text>
              <Text variant="bodyMedium" style={styles.faqAnswer}>
                From any completed log, use the Review & Share screen to export in 
                PDF, Word, or CSV format. You can also export all your data from 
                the Settings screen.
              </Text>
            </View>
            
            <Divider style={styles.divider} />
            
            <View style={styles.faqItem}>
              <Text variant="titleMedium" style={styles.faqQuestion}>
                Is my data secure?
              </Text>
              <Text variant="bodyMedium" style={styles.faqAnswer}>
                Yes, all your data is stored locally on your device. Nothing is sent 
                to external servers unless you explicitly choose to share or export 
                your logs.
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Features */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Key Features
            </Text>
            
            <List.Item
              title="Block Time Tracking"
              description="Accurate timing of aircraft movements"
              left={(props) => <List.Icon {...props} icon="clock" />}
            />
            
            <List.Item
              title="Photo Documentation"
              description="Visual records of aircraft condition"
              left={(props) => <List.Icon {...props} icon="camera" />}
            />
            
            <List.Item
              title="Flight Details"
              description="Comprehensive flight information forms"
              left={(props) => <List.Icon {...props} icon="airplane" />}
            />
            
            <List.Item
              title="Location Tracking"
              description="GPS coordinates for block locations"
              left={(props) => <List.Icon {...props} icon="map-marker" />}
            />
            
            <List.Item
              title="Report Generation"
              description="Export logs in multiple formats"
              left={(props) => <List.Icon {...props} icon="file-document" />}
            />
            
            <List.Item
              title="Data Management"
              description="Search, filter, and organize your logs"
              left={(props) => <List.Icon {...props} icon="database" />}
            />
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Support & Feedback
            </Text>
            
            <Text variant="bodyMedium" style={styles.description}>
              We're here to help! If you have questions, encounter issues, or 
              have suggestions for improvements, please don't hesitate to reach out.
            </Text>
            
            <View style={styles.supportButtons}>
              <Button
                mode="contained"
                onPress={handleContactSupport}
                style={styles.supportButton}
                icon="email"
              >
                {strings.help.contact}
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleReportBug}
                style={styles.supportButton}
                icon="bug"
              >
                {strings.help.reportBug}
              </Button>
              
              <Button
                mode="outlined"
                onPress={handleRequestFeature}
                style={styles.supportButton}
                icon="lightbulb"
              >
                {strings.help.requestFeature}
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Tips */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Pro Tips
            </Text>
            
            <View style={styles.tip}>
              <Text variant="bodyMedium" style={styles.tipIcon}>💡</Text>
              <Text variant="bodyMedium" style={styles.tipText}>
                Enable auto-save in Settings to automatically save your progress 
                as you fill out forms.
              </Text>
            </View>
            
            <View style={styles.tip}>
              <Text variant="bodyMedium" style={styles.tipIcon}>📱</Text>
              <Text variant="bodyMedium" style={styles.tipText}>
                Take clear, well-lit photos for better documentation. The app 
                works best with good lighting conditions.
              </Text>
            </View>
            
            <View style={styles.tip}>
              <Text variant="bodyMedium" style={styles.tipIcon}>🔍</Text>
              <Text variant="bodyMedium" style={styles.tipText}>
                Use the search function in the Logs tab to quickly find specific 
                aircraft or flights.
              </Text>
            </View>
            
            <View style={styles.tip}>
              <Text variant="bodyMedium" style={styles.tipIcon}>💾</Text>
              <Text variant="bodyMedium" style={styles.tipText}>
                Regularly export your data as a backup. You can import it later 
                if needed.
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Version Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Version Information
            </Text>
            
            <View style={styles.versionInfo}>
              <Text variant="bodyMedium">App Version: 1.0.0</Text>
              <Text variant="bodyMedium">Build: 1</Text>
              <Text variant="bodyMedium">Last Updated: {new Date().toLocaleDateString()}</Text>
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
  description: {
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  stepTitle: {
    marginBottom: 12,
    marginTop: 8,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  stepNumber: {
    fontWeight: 'bold',
    marginRight: 8,
    color: '#2196F3',
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    color: '#666',
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    marginBottom: 8,
    color: '#333',
  },
  faqAnswer: {
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    marginVertical: 16,
  },
  supportButtons: {
    marginTop: 16,
  },
  supportButton: {
    marginBottom: 12,
  },
  tip: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    color: '#666',
    lineHeight: 20,
  },
  versionInfo: {
    alignItems: 'center',
  },
});