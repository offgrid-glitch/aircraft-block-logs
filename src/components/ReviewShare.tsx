import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Button, 
  Text, 
  Card, 
  Chip,
  Switch,
  RadioButton,
  Divider,
} from 'react-native-paper';

import { Job, ExportFormat } from '@/models/Job';
import { formatDateTime, formatBlockTime } from '@/utils/time';
import { strings } from '@/utils/strings';

interface ReviewShareProps {
  job: Job;
  onExport: (format: ExportFormat) => void;
  onShare: (format: ExportFormat) => void;
  onEdit?: () => void;
  isExporting?: boolean;
}

export default function ReviewShare({
  job,
  onExport,
  onShare,
  onEdit,
  isExporting = false,
}: ReviewShareProps) {
  const [exportFormat, setExportFormat] = useState<'docx' | 'csv' | 'pdf'>('pdf');
  const [includePhotos, setIncludePhotos] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);

  const handleExport = () => {
    const format: ExportFormat = {
      format: exportFormat,
      includePhotos,
      includeSignature,
    };
    onExport(format);
  };

  const handleShare = () => {
    const format: ExportFormat = {
      format: exportFormat,
      includePhotos,
      includeSignature,
    };
    onShare(format);
  };

  const getStatusColor = (status: Job['status']) => {
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

  const getStatusText = (status: Job['status']) => {
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

  return (
    <ScrollView style={styles.container}>
      {/* Job Summary */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {strings.review.summary}
          </Text>
          
          <View style={styles.summaryRow}>
            <Text variant="titleMedium">Status</Text>
            <Chip 
              style={[styles.statusChip, { backgroundColor: getStatusColor(job.status) }]}
              textStyle={{ color: '#fff' }}
            >
              {getStatusText(job.status)}
            </Chip>
          </View>

          <View style={styles.summaryRow}>
            <Text variant="bodyLarge">Aircraft:</Text>
            <Text variant="bodyLarge" style={styles.summaryValue}>
              {job.tailNumber}
            </Text>
          </View>

          {job.aircraftId && (
            <View style={styles.summaryRow}>
              <Text variant="bodyLarge">Type:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {job.aircraftId}
              </Text>
            </View>
          )}

          {job.pilotName && (
            <View style={styles.summaryRow}>
              <Text variant="bodyLarge">Pilot:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {job.pilotName}
              </Text>
            </View>
          )}

          {job.flightNumber && (
            <View style={styles.summaryRow}>
              <Text variant="bodyLarge">Flight:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {job.flightNumber}
              </Text>
            </View>
          )}

          {job.routeFrom && job.routeTo && (
            <View style={styles.summaryRow}>
              <Text variant="bodyLarge">Route:</Text>
              <Text variant="bodyLarge" style={styles.summaryValue}>
                {job.routeFrom} → {job.routeTo}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Block Times */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Block Times
          </Text>
          
          <View style={styles.timeRow}>
            <Text variant="bodyLarge">Block In:</Text>
            <Text variant="bodyLarge" style={styles.timeValue}>
              {job.blockInTime ? formatDateTime(job.blockInTime) : 'Not recorded'}
            </Text>
          </View>

          <View style={styles.timeRow}>
            <Text variant="bodyLarge">Block Out:</Text>
            <Text variant="bodyLarge" style={styles.timeValue}>
              {job.blockOutTime ? formatDateTime(job.blockOutTime) : 'Not recorded'}
            </Text>
          </View>

          {job.blockInTime && job.blockOutTime && (
            <View style={styles.timeRow}>
              <Text variant="bodyLarge">Total Time:</Text>
              <Text variant="titleMedium" style={[styles.timeValue, styles.totalTime]}>
                {formatBlockTime(job.blockInTime, job.blockOutTime)}
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Photos */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            {strings.review.photos}
          </Text>
          
          <View style={styles.photoSection}>
            <Text variant="bodyLarge">Block In Photos:</Text>
            <Text variant="bodyMedium" style={styles.photoCount}>
              {job.blockInPhotos.length} photo(s)
            </Text>
          </View>

          <View style={styles.photoSection}>
            <Text variant="bodyLarge">Block Out Photos:</Text>
            <Text variant="bodyMedium" style={styles.photoCount}>
              {job.blockOutPhotos.length} photo(s)
            </Text>
          </View>

          {/* TODO: Add photo thumbnails */}
          {(job.blockInPhotos.length > 0 || job.blockOutPhotos.length > 0) && (
            <View style={styles.photoPlaceholder}>
              <Text variant="bodyMedium">Photo thumbnails will be displayed here</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      {/* Signature */}
      {job.signature && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {strings.review.signature}
            </Text>
            
            {/* TODO: Display signature image */}
            <View style={styles.signaturePlaceholder}>
              <Text variant="bodyMedium">Signature will be displayed here</Text>
            </View>
          </Card.Content>
        </Card>
      )}

      {/* Export Options */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Export Options
          </Text>
          
          {/* Format Selection */}
          <Text variant="bodyLarge" style={styles.optionLabel}>
            {strings.review.exportFormat}
          </Text>
          <RadioButton.Group
            onValueChange={(value) => setExportFormat(value as 'docx' | 'csv' | 'pdf')}
            value={exportFormat}
          >
            <View style={styles.radioOption}>
              <RadioButton value="pdf" />
              <Text variant="bodyLarge">PDF Document</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="docx" />
              <Text variant="bodyLarge">Word Document</Text>
            </View>
            <View style={styles.radioOption}>
              <RadioButton value="csv" />
              <Text variant="bodyLarge">CSV Spreadsheet</Text>
            </View>
          </RadioButton.Group>

          <Divider style={styles.divider} />

          {/* Include Options */}
          <View style={styles.switchOption}>
            <Text variant="bodyLarge">{strings.review.includePhotos}</Text>
            <Switch
              value={includePhotos}
              onValueChange={setIncludePhotos}
            />
          </View>

          <View style={styles.switchOption}>
            <Text variant="bodyLarge">{strings.review.includeSignature}</Text>
            <Switch
              value={includeSignature}
              onValueChange={setIncludeSignature}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleExport}
          loading={isExporting}
          disabled={isExporting}
          style={styles.exportButton}
          icon="download"
        >
          {isExporting ? strings.review.generating : strings.review.generateReport}
        </Button>

        <Button
          mode="outlined"
          onPress={handleShare}
          disabled={isExporting}
          style={styles.shareButton}
          icon="share"
        >
          {strings.review.share}
        </Button>

        {onEdit && (
          <Button
            mode="text"
            onPress={onEdit}
            disabled={isExporting}
            style={styles.editButton}
            icon="pencil"
          >
            Edit Job
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#2196F3',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: 'bold',
  },
  statusChip: {
    marginLeft: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeValue: {
    fontWeight: 'bold',
  },
  totalTime: {
    color: '#2196F3',
    fontSize: 18,
  },
  photoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoCount: {
    color: '#666',
  },
  photoPlaceholder: {
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  signaturePlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  exportButton: {
    marginBottom: 12,
  },
  shareButton: {
    marginBottom: 12,
  },
  editButton: {
    marginBottom: 32,
  },
});