import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  List,
  Chip,
  Searchbar,
  Divider,
  Menu,
  IconButton,
  FAB,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { JobSummary } from '@/models/Job';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { formatDateTime, formatBlockTime, isToday } from '@/utils/time';
import { strings } from '@/utils/strings';

type LogsListScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type FilterType = 'all' | 'completed' | 'in-progress' | 'draft';
type SortType = 'newest' | 'oldest' | 'aircraft' | 'duration';

export default function LogsListScreen() {
  const navigation = useNavigation<LogsListScreenNavigationProp>();
  
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('newest');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [jobs, searchQuery, filter, sort]);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      // TODO: Load jobs from storage
      // const storageService = new LocalStorageService();
      // const allJobs = await storageService.getAllJobs();
      // setJobs(allJobs);

      // Placeholder data for now
      const placeholderJobs: JobSummary[] = [
        {
          id: '1',
          aircraftId: 'Boeing 737-800',
          tailNumber: 'N123AB',
          blockInTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
          blockOutTime: new Date(Date.now() - 22 * 60 * 60 * 1000),
          status: 'completed',
          totalBlockTime: 120,
        },
        {
          id: '2',
          aircraftId: 'Airbus A320',
          tailNumber: 'N456CD',
          blockInTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
          status: 'in-progress',
        },
        {
          id: '3',
          aircraftId: 'Boeing 777',
          tailNumber: 'N789EF',
          status: 'draft',
        },
      ];
      setJobs(placeholderJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      Alert.alert(
        strings.errors.generic,
        'Failed to load logs. Please try again.',
        [{ text: strings.common.ok }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...jobs];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.tailNumber.toLowerCase().includes(query) ||
        job.aircraftId.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(job => job.status === filter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case 'newest':
          return (b.blockInTime?.getTime() || b.blockInTime?.getTime() || 0) - 
                 (a.blockInTime?.getTime() || a.blockInTime?.getTime() || 0);
        case 'oldest':
          return (a.blockInTime?.getTime() || a.blockInTime?.getTime() || 0) - 
                 (b.blockInTime?.getTime() || b.blockInTime?.getTime() || 0);
        case 'aircraft':
          return a.tailNumber.localeCompare(b.tailNumber);
        case 'duration':
          return (b.totalBlockTime || 0) - (a.totalBlockTime || 0);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  };

  const handleNewLog = () => {
    navigation.navigate('BlockInCamera', {});
  };

  const handleViewJob = (jobId: string) => {
    navigation.navigate('ReviewShare', { jobId });
  };

  const handleEditJob = (jobId: string) => {
    navigation.navigate('Form', { jobId });
  };

  const handleDeleteJob = (jobId: string, tailNumber: string) => {
    Alert.alert(
      'Delete Log',
      `Are you sure you want to delete the log for ${tailNumber}? This action cannot be undone.`,
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
              // TODO: Delete job from storage
              // const storageService = new LocalStorageService();
              // await storageService.deleteJob(jobId);
              setJobs(prev => prev.filter(job => job.id !== jobId));
              Alert.alert(
                'Log Deleted',
                'The log has been deleted successfully.',
                [{ text: strings.common.ok }]
              );
            } catch (error) {
              console.error('Error deleting job:', error);
              Alert.alert(
                strings.errors.generic,
                'Failed to delete log. Please try again.',
                [{ text: strings.common.ok }]
              );
            }
          },
        },
      ]
    );
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

  const getFilterText = (filterType: FilterType) => {
    switch (filterType) {
      case 'all':
        return strings.logs.filterAll;
      case 'completed':
        return strings.logs.filterCompleted;
      case 'in-progress':
        return strings.logs.filterInProgress;
      case 'draft':
        return strings.logs.filterDraft;
      default:
        return strings.logs.filterAll;
    }
  };

  const getSortText = (sortType: SortType) => {
    switch (sortType) {
      case 'newest':
        return 'Newest First';
      case 'oldest':
        return 'Oldest First';
      case 'aircraft':
        return 'Aircraft';
      case 'duration':
        return 'Duration';
      default:
        return 'Newest First';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {strings.logs.title}
        </Text>
        
        <Searchbar
          placeholder={strings.logs.searchPlaceholder}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.filtersRow}>
          <Menu
            visible={showFilterMenu}
            onDismiss={() => setShowFilterMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowFilterMenu(true)}
                icon="filter"
                style={styles.filterButton}
              >
                {getFilterText(filter)}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setFilter('all');
                setShowFilterMenu(false);
              }}
              title={strings.logs.filterAll}
            />
            <Menu.Item
              onPress={() => {
                setFilter('completed');
                setShowFilterMenu(false);
              }}
              title={strings.logs.filterCompleted}
            />
            <Menu.Item
              onPress={() => {
                setFilter('in-progress');
                setShowFilterMenu(false);
              }}
              title={strings.logs.filterInProgress}
            />
            <Menu.Item
              onPress={() => {
                setFilter('draft');
                setShowFilterMenu(false);
              }}
              title={strings.logs.filterDraft}
            />
          </Menu>

          <Menu
            visible={showSortMenu}
            onDismiss={() => setShowSortMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowSortMenu(true)}
                icon="sort"
                style={styles.sortButton}
              >
                {getSortText(sort)}
              </Button>
            }
          >
            <Menu.Item
              onPress={() => {
                setSort('newest');
                setShowSortMenu(false);
              }}
              title="Newest First"
            />
            <Menu.Item
              onPress={() => {
                setSort('oldest');
                setShowSortMenu(false);
              }}
              title="Oldest First"
            />
            <Menu.Item
              onPress={() => {
                setSort('aircraft');
                setShowSortMenu(false);
              }}
              title="Aircraft"
            />
            <Menu.Item
              onPress={() => {
                setSort('duration');
                setShowSortMenu(false);
              }}
              title="Duration"
            />
          </Menu>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadJobs} />
        }
      >
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              {jobs.length === 0 ? strings.logs.noLogs : 'No matching logs found'}
            </Text>
            {jobs.length === 0 && (
              <Button
                mode="contained"
                onPress={handleNewLog}
                style={styles.emptyButton}
                icon="plus"
              >
                Create Your First Log
              </Button>
            )}
          </View>
        ) : (
          <View style={styles.jobsList}>
            {filteredJobs.map((job) => (
              <Card key={job.id} style={styles.jobCard}>
                <List.Item
                  title={job.tailNumber}
                  description={job.aircraftId}
                  left={() => (
                    <List.Icon 
                      icon="airplane" 
                      color={getStatusColor(job.status)}
                    />
                  )}
                  right={() => (
                    <View style={styles.jobActions}>
                      <IconButton
                        icon="pencil"
                        size={20}
                        onPress={() => handleEditJob(job.id)}
                      />
                      <IconButton
                        icon="delete"
                        size={20}
                        onPress={() => handleDeleteJob(job.id, job.tailNumber)}
                      />
                    </View>
                  )}
                  onPress={() => handleViewJob(job.id)}
                />
                
                <View style={styles.jobDetails}>
                  <Chip 
                    style={[styles.statusChip, { backgroundColor: getStatusColor(job.status) }]}
                    textStyle={{ color: '#fff' }}
                  >
                    {getStatusText(job.status)}
                  </Chip>
                  
                  {job.blockInTime && (
                    <Text variant="bodySmall" style={styles.jobTime}>
                      Block In: {formatDateTime(job.blockInTime)}
                    </Text>
                  )}
                  
                  {job.blockOutTime && (
                    <Text variant="bodySmall" style={styles.jobTime}>
                      Block Out: {formatDateTime(job.blockOutTime)}
                    </Text>
                  )}
                  
                  {job.blockInTime && job.blockOutTime && (
                    <Text variant="bodySmall" style={styles.blockTime}>
                      Duration: {formatBlockTime(job.blockInTime, job.blockOutTime)}
                    </Text>
                  )}
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleNewLog}
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
  header: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
    marginBottom: 16,
  },
  searchbar: {
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    marginRight: 8,
  },
  sortButton: {
    flex: 1,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyButton: {
    marginTop: 16,
  },
  jobsList: {
    padding: 16,
  },
  jobCard: {
    marginBottom: 12,
    elevation: 2,
  },
  jobActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetails: {
    padding: 16,
    paddingTop: 0,
  },
  statusChip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  jobTime: {
    color: '#666',
    marginBottom: 2,
  },
  blockTime: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});