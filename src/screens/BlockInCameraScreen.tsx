import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';

import CameraCapture from '@/components/CameraCapture';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Job } from '@/models/Job';
import { getCurrentTimestamp } from '@/utils/time';
import { strings } from '@/utils/strings';

type BlockInCameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BlockInCamera'>;
type BlockInCameraScreenRouteProp = RouteProp<RootStackParamList, 'BlockInCamera'>;

export default function BlockInCameraScreen() {
  const navigation = useNavigation<BlockInCameraScreenNavigationProp>();
  const route = useRoute<BlockInCameraScreenRouteProp>();
  const { jobId } = route.params || {};

  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoTaken = async (photoUri: string) => {
    setIsLoading(true);
    try {
      // TODO: Save photo and create/update job
      console.log('Photo taken:', photoUri);
      
      if (jobId) {
        // Update existing job with photo
        // const storageService = new LocalStorageService();
        // const job = await storageService.getJob(jobId);
        // if (job) {
        //   job.blockInPhotos.push(photoUri);
        //   await storageService.updateJob(jobId, job);
        // }
        navigation.navigate('Form', { jobId });
      } else {
        // Create new job
        const newJob: Partial<Job> = {
          id: `job_${Date.now()}`, // TODO: Use proper UUID
          tailNumber: '', // Will be filled in form
          aircraftId: '',
          blockInTime: getCurrentTimestamp(),
          blockInPhotos: [photoUri],
          blockOutPhotos: [],
          notes: '',
          status: 'in-progress',
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        };

        // Get current location for block-in
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const currentLocation = await Location.getCurrentPositionAsync({});
            newJob.blockInLocation = {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            };
          }
        } catch (locationError) {
          console.error('Error getting location:', locationError);
        }

        // TODO: Save job to storage
        // const storageService = new LocalStorageService();
        // await storageService.saveJob(newJob as Job);

        navigation.navigate('Form', { jobId: newJob.id! });
      }
    } catch (error) {
      console.error('Error handling photo:', error);
      Alert.alert(
        strings.errors.generic,
        'Failed to save photo. Please try again.',
        [{ text: strings.common.ok }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraCapture
        onPhotoTaken={handlePhotoTaken}
        onCancel={handleCancel}
        title="Block In - Capture Photo"
        allowGallery={true}
      />
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          {/* TODO: Add loading spinner */}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});