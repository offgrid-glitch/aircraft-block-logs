export interface Job {
  id: string;
  aircraftId: string;
  tailNumber: string;
  blockInTime?: Date;
  blockOutTime?: Date;
  blockInLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  blockOutLocation?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  blockInPhotos: string[]; // File paths to photos
  blockOutPhotos: string[]; // File paths to photos
  notes: string;
  signature?: string; // Base64 encoded signature image
  createdAt: Date;
  updatedAt: Date;
  status: 'in-progress' | 'completed' | 'draft';
  // Additional fields for form data
  pilotName?: string;
  copilotName?: string;
  flightNumber?: string;
  routeFrom?: string;
  routeTo?: string;
  fuelQuantity?: number;
  passengerCount?: number;
  cargoWeight?: number;
  weatherConditions?: string;
  discrepancies?: string;
  maintenanceNotes?: string;
}

export interface JobSummary {
  id: string;
  aircraftId: string;
  tailNumber: string;
  blockInTime?: Date;
  blockOutTime?: Date;
  status: Job['status'];
  totalBlockTime?: number; // in minutes
}

export type JobFormData = Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>;

export interface ExportFormat {
  format: 'docx' | 'csv' | 'pdf';
  includePhotos: boolean;
  includeSignature: boolean;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
}