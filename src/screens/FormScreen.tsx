import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import FormSheet from '@/components/FormSheet';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Job, JobFormData } from '@/models/Job';
import { getCurrentTimestamp } from '@/utils/time';
import { strings } from '@/utils/strings';

type FormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Form'>;
type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

export default function FormScreen() {
  const navigation = useNavigation<FormScreenNavigationProp>();
  const route = useRoute<FormScreenRouteProp>();
  const { jobId } = route.params;

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    setIsLoading(true);
    try {
      // TODO: Load job from storage
      // const storageService = new LocalStorageService();
      // const loadedJob = await storageService.getJob(jobId);
      // setJob(loadedJob);

      // Placeholder for now - create a minimal job structure
      const placeholderJob: Job = {
        id: jobId,
        tailNumber: '',
        aircraftId: '',
        blockInTime: getCurrentTimestamp(),
        blockInPhotos: [],
        blockOutPhotos: [],
        notes: '',
        status: 'in-progress',
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      setJob(placeholderJob);
    } catch (error) {
      console.error('Error loading job:', error);
      Alert.alert(
        strings.errors.generic,
        'Failed to load job data. Please try again.',
        [
          {
            text: strings.common.ok,
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (formData: JobFormData) => {
    if (!job) return;

    setIsSaving(true);
    try {
      // Update job with form data
      const updatedJob: Job = {
        ...job,
        ...formData,
        updatedAt: getCurrentTimestamp(),
      };

      // TODO: Save to storage
      // const storageService = new LocalStorageService();
      // await storageService.updateJob(jobId, updatedJob);

      setJob(updatedJob);

      // Navigate to block out camera if we have block in data
      if (updatedJob.blockInTime && !updatedJob.blockOutTime) {
        navigation.navigate('BlockOutCamera', { jobId });
      } else {
        // Navigate to review if job is complete
        navigation.navigate('ReviewShare', { jobId });
      }
    } catch (error) {
      console.error('Error saving job:', error);
      Alert.alert(
        strings.errors.generic,
        'Failed to save job data. Please try again.',
        [{ text: strings.common.ok }]
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Changes',
      'Are you sure you want to cancel? Your changes will be lost.',
      [
        {
          text: strings.common.no,
          style: 'cancel',
        },
        {
          text: strings.common.yes,
          onPress: () => navigation.goBack(),
          style: 'destructive',
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          {/* TODO: Add loading spinner */}
        </View>
      </SafeAreaView>
    );
  }

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          {/* TODO: Add error state */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FormSheet
        initialData={job}
        onSave={handleSave}
        onCancel={handleCancel}
        isLoading={isSaving}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});