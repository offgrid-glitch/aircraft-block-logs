import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  FAB,
  List,
  Chip,
  Searchbar,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Job, JobSummary } from '@/models/Job';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { formatDateTime, formatBlockTime, isToday } from '@/utils/time';
import { strings } from '@/utils/strings';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeJob, setActiveJob] = useState<JobSummary | null>(null);
  const [recentJobs, setRecentJobs] = useState<JobSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // TODO: Load data from storage service
      // const storageService = new LocalStorageService();
      // const jobs = await storageService.getAllJobs();
      // const active = jobs.find(job => job.status === 'in-progress');
      // const recent = jobs.filter(job => job.status === 'completed').slice(0, 5);
      // setActiveJob(active || null);
      // setRecentJobs(recent);
      
      // Placeholder data for now
      setActiveJob(null);
      setRecentJobs([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewLog = () => {
    navigation.navigate('BlockInCamera');
  };

  const handleContinueLog = () => {
    if (activeJob) {
      navigation.navigate('Form', { jobId: activeJob.id });
    }
  };

  const handleViewJob = (jobId: string) => {
    navigation.navigate('ReviewShare', { jobId });
  };

  const getStatusColor = (status: JobSummary['status']) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'in-progress':
        return '#FF9800';
      case 'draft':
        return '#757575';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status: JobSummary['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'draft':
        return 'Draft';
      default:
        return 'Unknown';
    }
  };

  const filteredJobs = recentJobs.filter(job =>
    job.tailNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.aircraftId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            {strings.home.title}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {strings.home.subtitle}
          </Text>
        </View>

        {/* Quick Action Card */}
        <Card style={styles.actionCard}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleStartNewLog}
              style={styles.newLogButton}
              icon="plus"
              contentStyle={styles.newLogButtonContent}
            >
              {strings.home.newLogButton}
            </Button>
          </Card.Content>
        </Card>

        {/* Active Job */}
        {activeJob && (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text variant="titleLarge">{strings.home.activeLogTitle}</Text>
                <Chip 
                  style={[styles.statusChip, { backgroundColor: getStatusColor(activeJob.status) }]}
                  textStyle={{ color: '#fff' }}
                >
                  {getStatusText(activeJob.status)}
                </Chip>
              </View>
              
              <View style={styles.jobInfo}>
                <Text variant="bodyLarge" style={styles.jobTitle}>
                  {activeJob.tailNumber}
                </Text>
                <Text variant="bodyMedium" style={styles.jobSubtitle}>
                  {activeJob.aircraftId}
                </Text>
                
                {activeJob.blockInTime && (
                  <Text variant="bodyMedium" style={styles.jobTime}>
                    Block In: {formatDateTime(activeJob.blockInTime)}
                  </Text>
                )}
              </View>

              <Button
                mode="outlined"
                onPress={handleContinueLog}
                style={styles.continueButton}
                icon="play"
              >
                {strings.home.continueLog}
              </Button>
            </Card.Content>
          </Card>
        )}

        {/* Recent Jobs */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.home.recentLogsTitle}
            </Text>

            {recentJobs.length > 0 && (
              <Searchbar
                placeholder="Search recent logs..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
              />
            )}

            {filteredJobs.length === 0 ? (
              <View style={styles.emptyState}>
                <Text variant="bodyLarge" style={styles.emptyText}>
                  {recentJobs.length === 0 ? strings.home.noRecentLogs : 'No matching logs found'}
                </Text>
              </View>
            ) : (
              <View style={styles.jobsList}>
                {filteredJobs.map((job) => (
                  <List.Item
                    key={job.id}
                    title={job.tailNumber}
                    description={job.aircraftId}
                    left={() => (
                      <List.Icon 
                        icon="airplane" 
                        color={getStatusColor(job.status)}
                      />
                    )}
                    right={() => (
                      <View style={styles.jobListRight}>
                        {job.blockInTime && job.blockOutTime && (
                          <Text variant="bodySmall" style={styles.blockTime}>
                            {formatBlockTime(job.blockInTime, job.blockOutTime)}
                          </Text>
                        )}
                        <Chip 
                          compact
                          style={[styles.listStatusChip, { backgroundColor: getStatusColor(job.status) }]}
                          textStyle={{ color: '#fff', fontSize: 10 }}
                        >
                          {getStatusText(job.status)}
                        </Chip>
                      </View>
                    )}
                    onPress={() => handleViewJob(job.id)}
                    style={styles.jobListItem}
                  />
                ))}
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Statistics Card - TODO: Implement when storage is ready */}
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Quick Stats
            </Text>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  0
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Today's Logs
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  0
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  This Week
                </Text>
              </View>
              
              <View style={styles.statItem}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  0
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Total Hours
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleStartNewLog}
        label="New Log"
      />
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
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  actionCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  newLogButton: {
    paddingVertical: 8,
  },
  newLogButtonContent: {
    height: 56,
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2196F3',
  },
  statusChip: {
    marginLeft: 8,
  },
  jobInfo: {
    marginBottom: 16,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  jobSubtitle: {
    color: '#666',
    marginTop: 2,
  },
  jobTime: {
    color: '#666',
    marginTop: 4,
  },
  continueButton: {
    marginTop: 8,
  },
  searchbar: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#666',
  },
  jobsList: {
    marginTop: 8,
  },
  jobListItem: {
    paddingHorizontal: 0,
  },
  jobListRight: {
    alignItems: 'flex-end',
  },
  blockTime: {
    color: '#666',
    marginBottom: 4,
  },
  listStatusChip: {
    height: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});