import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import ReviewShare from '@/components/ReviewShare';
import SignaturePad from '@/components/SignaturePad';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { Job, ExportFormat } from '@/models/Job';
import { generateDOCXReport, generatePDFReport } from '@/utils/docxExport';
import { exportJobToCSV } from '@/utils/csvExport';
import { getCurrentTimestamp } from '@/utils/time';
import { strings } from '@/utils/strings';

type ReviewShareScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReviewShare'>;
type ReviewShareScreenRouteProp = RouteProp<RootStackParamList, 'ReviewShare'>;

export default function ReviewShareScreen() {
  const navigation = useNavigation<ReviewShareScreenNavigationProp>();
  const route = useRoute<ReviewShareScreenRouteProp>();
  const { jobId } = route.params;

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);

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

      // Placeholder job for now
      const placeholderJob: Job = {
        id: jobId,
        tailNumber: 'N123AB',
        aircraftId: 'Boeing 737-800',
        blockInTime: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
        blockOutTime: new Date(),
        blockInPhotos: ['photo1.jpg'],
        blockOutPhotos: ['photo2.jpg'],
        notes: 'Sample flight log',
        status: 'completed',
        createdAt: new Date(Date.now() - 120 * 60 * 1000),
        updatedAt: new Date(),
        pilotName: 'John Doe',
        flightNumber: 'AA123',
        routeFrom: 'LAX',
        routeTo: 'JFK',
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

  const handleExport = async (format: ExportFormat) => {
    if (!job) return;

    setIsExporting(true);
    try {
      let filePath: string;

      switch (format.format) {
        case 'pdf':
          filePath = await generatePDFReport(job, {
            includePhotos: format.includePhotos,
            includeSignature: format.includeSignature,
          });
          break;
        case 'docx':
          filePath = await generateDOCXReport(job, {
            includePhotos: format.includePhotos,
            includeSignature: format.includeSignature,
          });
          break;
        case 'csv':
          filePath = await exportJobToCSV(job);
          break;
        default:
          throw new Error(`Unsupported export format: ${format.format}`);
      }

      Alert.alert(
        strings.review.exportSuccess,
        `Report saved successfully.`,
        [{ text: strings.common.ok }]
      );
    } catch (error) {
      console.error('Error exporting report:', error);
      Alert.alert(
        strings.review.exportError,
        'Failed to generate report. This feature is not yet implemented.',
        [{ text: strings.common.ok }]
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async (format: ExportFormat) => {
    if (!job) return;

    try {
      // TODO: Implement sharing functionality
      console.log('Sharing report:', format);
      Alert.alert(
        'Share Feature',
        'Sharing functionality will be implemented soon.',
        [{ text: strings.common.ok }]
      );
    } catch (error) {
      console.error('Error sharing report:', error);
      Alert.alert(
        strings.review.exportError,
        'Failed to share report. Please try again.',
        [{ text: strings.common.ok }]
      );
    }
  };

  const handleEdit = () => {
    navigation.navigate('Form', { jobId });
  };

  const handleSignatureCapture = async (signature: string) => {
    if (!job) return;

    try {
      // TODO: Save signature to job
      // const storageService = new LocalStorageService();
      // const updatedJob = { ...job, signature, updatedAt: getCurrentTimestamp() };
      // await storageService.updateJob(jobId, updatedJob);
      // setJob(updatedJob);

      setShowSignaturePad(false);
      Alert.alert(
        'Signature Saved',
        'Your signature has been saved to the job.',
        [{ text: strings.common.ok }]
      );
    } catch (error) {
      console.error('Error saving signature:', error);
      Alert.alert(
        strings.errors.generic,
        'Failed to save signature. Please try again.',
        [{ text: strings.common.ok }]
      );
    }
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

  if (showSignaturePad) {
    return (
      <SafeAreaView style={styles.container}>
        <SignaturePad
          onSignatureCapture={handleSignatureCapture}
          onCancel={() => setShowSignaturePad(false)}
          initialSignature={job.signature}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ReviewShare
        job={job}
        onExport={handleExport}
        onShare={handleShare}
        onEdit={handleEdit}
        isExporting={isExporting}
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