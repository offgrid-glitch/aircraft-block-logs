import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

export interface PermissionStatus {
  granted: boolean;
  canAskAgain: boolean;
  status: string;
}

export interface AppPermissions {
  camera: PermissionStatus;
  location: PermissionStatus;
  mediaLibrary: PermissionStatus;
}

/**
 * Request camera permission
 */
export async function requestCameraPermission(): Promise<PermissionStatus> {
  try {
    const permission = await Camera.requestCameraPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
      status: permission.status,
    };
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    };
  }
}

/**
 * Request location permission
 */
export async function requestLocationPermission(): Promise<PermissionStatus> {
  try {
    const permission = await Location.requestForegroundPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
      status: permission.status,
    };
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    };
  }
}

/**
 * Request media library permission
 */
export async function requestMediaLibraryPermission(): Promise<PermissionStatus> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
      status: permission.status,
    };
  } catch (error) {
    console.error('Error requesting media library permission:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    };
  }
}

/**
 * Check current camera permission status
 */
export async function getCameraPermissionStatus(): Promise<PermissionStatus> {
  try {
    const permission = await Camera.getCameraPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
      status: permission.status,
    };
  } catch (error) {
    console.error('Error getting camera permission status:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    };
  }
}

/**
 * Check current location permission status
 */
export async function getLocationPermissionStatus(): Promise<PermissionStatus> {
  try {
    const permission = await Location.getForegroundPermissionsAsync();
    return {
      granted: permission.granted,
      canAskAgain: permission.canAskAgain,
      status: permission.status,
    };
  } catch (error) {
    console.error('Error getting location permission status:', error);
    return {
      granted: false,
      canAskAgain: false,
      status: 'denied',
    };
  }
}

/**
 * Check all app permissions at once
 */
export async function checkAllPermissions(): Promise<AppPermissions> {
  const [camera, location, mediaLibrary] = await Promise.all([
    getCameraPermissionStatus(),
    getLocationPermissionStatus(),
    requestMediaLibraryPermission(),
  ]);

  return {
    camera,
    location,
    mediaLibrary,
  };
}

/**
 * Request all necessary permissions for the app
 */
export async function requestAllPermissions(): Promise<AppPermissions> {
  const [camera, location, mediaLibrary] = await Promise.all([
    requestCameraPermission(),
    requestLocationPermission(),
    requestMediaLibraryPermission(),
  ]);

  return {
    camera,
    location,
    mediaLibrary,
  };
}