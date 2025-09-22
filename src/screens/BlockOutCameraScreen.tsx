import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import * as Location from 'expo-location';

import CameraCapture from '@/components/CameraCapture';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { getCurrentTimestamp } from '@/utils/time';
import { strings } from '@/utils/strings';

type BlockOutCameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BlockOutCamera'>;
type BlockOutCameraScreenRouteProp = RouteProp<RootStackParamList, 'BlockOutCamera'>;

export default function BlockOutCameraScreen() {
  const navigation = useNavigation<BlockOutCameraScreenNavigationProp>();
  const route = useRoute<BlockOutCameraScreenRouteProp>();
  const { jobId } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoTaken = async (photoUri: string) => {
    setIsLoading(true);
    try {
      console.log('Block out photo taken:', photoUri);

      // TODO: Update job with block out photo and time
      // const storageService = new LocalStorageService();
      // const job = await storageService.getJob(jobId);
      // if (job) {
      //   job.blockOutPhotos.push(photoUri);
      //   job.blockOutTime = getCurrentTimestamp();
      //   job.updatedAt = getCurrentTimestamp();

      //   // Get current location for block-out
      //   try {
      //     const { status } = await Location.requestForegroundPermissionsAsync();
      //     if (status === 'granted') {
      //       const currentLocation = await Location.getCurrentPositionAsync({});
      //       job.blockOutLocation = {
      //         latitude: currentLocation.coords.latitude,
      //         longitude: currentLocation.coords.longitude,
      //       };
      //     }
      //   } catch (locationError) {
      //     console.error('Error getting location:', locationError);
      //   }

      //   // Mark job as completed if we have both block in and out times
      //   if (job.blockInTime && job.blockOutTime) {
      //     job.status = 'completed';
      //   }

      //   await storageService.updateJob(jobId, job);
      // }

      // Navigate to review and share screen
      navigation.navigate('ReviewShare', { jobId });
    } catch (error) {
      console.error('Error handling block out photo:', error);
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
        title="Block Out - Capture Photo"
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