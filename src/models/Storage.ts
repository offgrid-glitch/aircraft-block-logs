import { Job, JobSummary } from './Job';

export interface StorageService {
  // Job operations
  saveJob(job: Job): Promise<void>;
  getJob(id: string): Promise<Job | null>;
  getAllJobs(): Promise<JobSummary[]>;
  deleteJob(id: string): Promise<void>;
  updateJob(id: string, updates: Partial<Job>): Promise<void>;
  
  // Search and filter
  searchJobs(query: string): Promise<JobSummary[]>;
  getJobsByDateRange(startDate: Date, endDate: Date): Promise<JobSummary[]>;
  getJobsByAircraft(aircraftId: string): Promise<JobSummary[]>;
  getJobsByStatus(status: Job['status']): Promise<JobSummary[]>;
  
  // File operations
  savePhoto(photoUri: string, jobId: string, type: 'block-in' | 'block-out'): Promise<string>;
  deletePhoto(photoPath: string): Promise<void>;
  saveSignature(signatureData: string, jobId: string): Promise<string>;
  
  // Data management
  exportData(format: 'json' | 'csv'): Promise<string>;
  importData(data: string, format: 'json' | 'csv'): Promise<void>;
  clearAllData(): Promise<void>;
  
  // Settings
  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;
  deleteSetting(key: string): Promise<void>;
}

// TODO: Implement SQLite-based storage service
// This will use expo-sqlite for local storage
// Consider implementing:
// - Database schema migrations
// - Backup/restore functionality
// - Offline-first design with sync capabilities
// - Data encryption for sensitive information
// - Automatic cleanup of old photos and data

export class LocalStorageService implements StorageService {
  // Placeholder implementation - to be implemented later
  
  async saveJob(job: Job): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async getJob(id: string): Promise<Job | null> {
    throw new Error('Method not implemented.');
  }
  
  async getAllJobs(): Promise<JobSummary[]> {
    throw new Error('Method not implemented.');
  }
  
  async deleteJob(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async updateJob(id: string, updates: Partial<Job>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async searchJobs(query: string): Promise<JobSummary[]> {
    throw new Error('Method not implemented.');
  }
  
  async getJobsByDateRange(startDate: Date, endDate: Date): Promise<JobSummary[]> {
    throw new Error('Method not implemented.');
  }
  
  async getJobsByAircraft(aircraftId: string): Promise<JobSummary[]> {
    throw new Error('Method not implemented.');
  }
  
  async getJobsByStatus(status: Job['status']): Promise<JobSummary[]> {
    throw new Error('Method not implemented.');
  }
  
  async savePhoto(photoUri: string, jobId: string, type: 'block-in' | 'block-out'): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
  async deletePhoto(photoPath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async saveSignature(signatureData: string, jobId: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
  async exportData(format: 'json' | 'csv'): Promise<string> {
    throw new Error('Method not implemented.');
  }
  
  async importData(data: string, format: 'json' | 'csv'): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async clearAllData(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async getSetting(key: string): Promise<string | null> {
    throw new Error('Method not implemented.');
  }
  
  async setSetting(key: string, value: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  async deleteSetting(key: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}