import { Job } from '@/models/Job';
import { formatDateTime, formatBlockTime } from './time';

/**
 * Generate CSV data from a single job
 */
export function generateJobCSV(job: Job): string {
  const headers = [
    'Job ID',
    'Aircraft ID',
    'Tail Number',
    'Block In Time',
    'Block Out Time',
    'Block Time (minutes)',
    'Block In Location',
    'Block Out Location',
    'Pilot Name',
    'Co-pilot Name',
    'Flight Number',
    'Route From',
    'Route To',
    'Fuel Quantity',
    'Passenger Count',
    'Cargo Weight',
    'Weather Conditions',
    'Notes',
    'Discrepancies',
    'Maintenance Notes',
    'Status',
    'Created At',
    'Updated At',
  ];

  const row = [
    job.id,
    job.aircraftId,
    job.tailNumber,
    job.blockInTime ? formatDateTime(job.blockInTime) : '',
    job.blockOutTime ? formatDateTime(job.blockOutTime) : '',
    job.blockInTime && job.blockOutTime ? 
      String(Math.floor((job.blockOutTime.getTime() - job.blockInTime.getTime()) / (1000 * 60))) : '',
    job.blockInLocation ? `${job.blockInLocation.latitude}, ${job.blockInLocation.longitude}` : '',
    job.blockOutLocation ? `${job.blockOutLocation.latitude}, ${job.blockOutLocation.longitude}` : '',
    job.pilotName || '',
    job.copilotName || '',
    job.flightNumber || '',
    job.routeFrom || '',
    job.routeTo || '',
    job.fuelQuantity ? String(job.fuelQuantity) : '',
    job.passengerCount ? String(job.passengerCount) : '',
    job.cargoWeight ? String(job.cargoWeight) : '',
    job.weatherConditions || '',
    job.notes || '',
    job.discrepancies || '',
    job.maintenanceNotes || '',
    job.status,
    formatDateTime(job.createdAt),
    formatDateTime(job.updatedAt),
  ];

  // Escape quotes and wrap fields containing commas or quotes
  const escapedRow = row.map(field => {
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  });

  return [headers.join(','), escapedRow.join(',')].join('\n');
}

/**
 * Generate CSV data from multiple jobs
 */
export function generateJobsCSV(jobs: Job[]): string {
  if (jobs.length === 0) {
    return 'No jobs to export';
  }

  const headers = [
    'Job ID',
    'Aircraft ID',
    'Tail Number',
    'Block In Time',
    'Block Out Time',
    'Block Time (minutes)',
    'Block In Location',
    'Block Out Location',
    'Pilot Name',
    'Co-pilot Name',
    'Flight Number',
    'Route From',
    'Route To',
    'Fuel Quantity',
    'Passenger Count',
    'Cargo Weight',
    'Weather Conditions',
    'Notes',
    'Discrepancies',
    'Maintenance Notes',
    'Status',
    'Created At',
    'Updated At',
  ];

  const rows = jobs.map(job => {
    const row = [
      job.id,
      job.aircraftId,
      job.tailNumber,
      job.blockInTime ? formatDateTime(job.blockInTime) : '',
      job.blockOutTime ? formatDateTime(job.blockOutTime) : '',
      job.blockInTime && job.blockOutTime ? 
        String(Math.floor((job.blockOutTime.getTime() - job.blockInTime.getTime()) / (1000 * 60))) : '',
      job.blockInLocation ? `${job.blockInLocation.latitude}, ${job.blockInLocation.longitude}` : '',
      job.blockOutLocation ? `${job.blockOutLocation.latitude}, ${job.blockOutLocation.longitude}` : '',
      job.pilotName || '',
      job.copilotName || '',
      job.flightNumber || '',
      job.routeFrom || '',
      job.routeTo || '',
      job.fuelQuantity ? String(job.fuelQuantity) : '',
      job.passengerCount ? String(job.passengerCount) : '',
      job.cargoWeight ? String(job.cargoWeight) : '',
      job.weatherConditions || '',
      job.notes || '',
      job.discrepancies || '',
      job.maintenanceNotes || '',
      job.status,
      formatDateTime(job.createdAt),
      formatDateTime(job.updatedAt),
    ];

    // Escape quotes and wrap fields containing commas or quotes
    return row.map(field => {
      const stringField = String(field);
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    });
  });

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

/**
 * Save CSV data to file
 * TODO: Implement using expo-file-system
 */
export async function saveCSVToFile(csvData: string, filename: string): Promise<string> {
  try {
    // TODO: Implement using expo-file-system
    console.log('Saving CSV to file:', filename);
    console.log('CSV data length:', csvData.length);
    
    // Placeholder implementation
    throw new Error('CSV file saving not yet implemented');
    
    // Future implementation:
    // const fileUri = FileSystem.documentDirectory + filename;
    // await FileSystem.writeAsStringAsync(fileUri, csvData, {
    //   encoding: FileSystem.EncodingType.UTF8,
    // });
    // return fileUri;
    
  } catch (error) {
    console.error('Error saving CSV file:', error);
    throw error;
  }
}

/**
 * Export jobs to CSV file
 * TODO: Complete implementation with file system operations
 */
export async function exportJobsToCSV(
  jobs: Job[], 
  filename: string = `aircraft-logs-${new Date().toISOString().split('T')[0]}.csv`
): Promise<string> {
  try {
    const csvData = generateJobsCSV(jobs);
    const filePath = await saveCSVToFile(csvData, filename);
    return filePath;
  } catch (error) {
    console.error('Error exporting jobs to CSV:', error);
    throw error;
  }
}

/**
 * Export single job to CSV file
 */
export async function exportJobToCSV(
  job: Job,
  filename: string = `aircraft-log-${job.id}.csv`
): Promise<string> {
  try {
    const csvData = generateJobCSV(job);
    const filePath = await saveCSVToFile(csvData, filename);
    return filePath;
  } catch (error) {
    console.error('Error exporting job to CSV:', error);
    throw error;
  }
}

/**
 * Share CSV file using native sharing
 */
export async function shareCSVFile(filePath: string, title: string = 'Aircraft Block Logs'): Promise<void> {
  try {
    // TODO: Implement using expo-sharing
    console.log('Sharing CSV file:', filePath);
    
    // Placeholder implementation
    throw new Error('CSV file sharing not yet implemented');
    
    // Future implementation:
    // await Sharing.shareAsync(filePath, {
    //   mimeType: 'text/csv',
    //   dialogTitle: title,
    // });
    
  } catch (error) {
    console.error('Error sharing CSV file:', error);
    throw error;
  }
}