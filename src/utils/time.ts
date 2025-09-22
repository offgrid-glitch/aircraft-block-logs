import { format, differenceInMinutes, differenceInHours, parseISO } from 'date-fns';

/**
 * Format a date for display in the UI
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
}

/**
 * Format date for short display (just date)
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

/**
 * Format time for display
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm');
}

/**
 * Format time for 12-hour display
 */
export function formatTime12Hour(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'h:mm a');
}

/**
 * Calculate block time in minutes between two dates
 */
export function calculateBlockTimeMinutes(blockIn: Date | string, blockOut: Date | string): number {
  const blockInDate = typeof blockIn === 'string' ? parseISO(blockIn) : blockIn;
  const blockOutDate = typeof blockOut === 'string' ? parseISO(blockOut) : blockOut;
  
  return differenceInMinutes(blockOutDate, blockInDate);
}

/**
 * Calculate block time in hours between two dates
 */
export function calculateBlockTimeHours(blockIn: Date | string, blockOut: Date | string): number {
  const blockInDate = typeof blockIn === 'string' ? parseISO(blockIn) : blockIn;
  const blockOutDate = typeof blockOut === 'string' ? parseISO(blockOut) : blockOut;
  
  return differenceInHours(blockOutDate, blockInDate);
}

/**
 * Format block time duration for display
 */
export function formatBlockTime(blockIn: Date | string, blockOut: Date | string): string {
  const minutes = calculateBlockTimeMinutes(blockIn, blockOut);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format duration in minutes to human readable format
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Get current timestamp as Date object
 */
export function getCurrentTimestamp(): Date {
  return new Date();
}

/**
 * Get current timestamp as ISO string
 */
export function getCurrentTimestampISO(): string {
  return new Date().toISOString();
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is within a specific range
 */
export function isDateInRange(date: Date | string, startDate: Date, endDate: Date): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return dateObj >= startDate && dateObj <= endDate;
}

/**
 * Get the start of today
 */
export function getStartOfToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/**
 * Get the end of today
 */
export function getEndOfToday(): Date {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return today;
}