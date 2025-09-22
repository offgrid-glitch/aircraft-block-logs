import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, Text, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { requestCameraPermission, getCameraPermissionStatus } from '@/utils/permissions';
import { strings } from '@/utils/strings';

interface CameraCaptureProps {
  onPhotoTaken: (photoUri: string) => void;
  onCancel?: () => void;
  allowGallery?: boolean;
  title?: string;
}

export default function CameraCapture({
  onPhotoTaken,
  onCancel,
  allowGallery = true,
  title = strings.camera.title,
}: CameraCaptureProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const permission = await getCameraPermissionStatus();
    setHasPermission(permission.granted);
  };

  const requestPermissions = async () => {
    const permission = await requestCameraPermission();
    setHasPermission(permission.granted);
    
    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Camera permission is required to take photos. Please enable it in settings.',
        [{ text: 'OK' }]
      );
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && isReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
          exif: false,
        });
        setCapturedPhoto(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image from gallery.');
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
  };

  const usePhoto = () => {
    if (capturedPhoto) {
      onPhotoTaken(capturedPhoto);
    }
  };

  const flipCamera = () => {
    setType(current => 
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Checking camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text variant="headlineSmall" style={styles.permissionTitle}>
          {strings.camera.permissionDenied}
        </Text>
        <Text variant="bodyLarge" style={styles.permissionText}>
          Camera access is required to capture photos for your aircraft logs.
        </Text>
        <Button 
          mode="contained" 
          onPress={requestPermissions}
          style={styles.permissionButton}
        >
          {strings.camera.permissionRequest}
        </Button>
        {onCancel && (
          <Button 
            mode="outlined" 
            onPress={onCancel}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        )}
      </View>
    );
  }

  if (capturedPhoto) {
    return (
      <View style={styles.previewContainer}>
        <Text variant="headlineSmall" style={styles.title}>
          {title}
        </Text>
        
        {/* TODO: Add Image component to show preview */}
        <View style={styles.imagePlaceholder}>
          <Text>Photo Preview</Text>
          <Text variant="bodySmall">{capturedPhoto}</Text>
        </View>
        
        <View style={styles.previewButtons}>
          <Button 
            mode="outlined" 
            onPress={retakePicture}
            style={styles.previewButton}
          >
            {strings.camera.retakePhoto}
          </Button>
          <Button 
            mode="contained" 
            onPress={usePhoto}
            style={styles.previewButton}
          >
            {strings.camera.usePhoto}
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onCameraReady={() => setIsReady(true)}
      >
        <View style={styles.cameraOverlay}>
          {/* Top controls */}
          <View style={styles.topControls}>
            {onCancel && (
              <IconButton
                icon="close"
                iconColor="#fff"
                size={30}
                onPress={onCancel}
                style={styles.closeButton}
              />
            )}
            <IconButton
              icon="camera-flip"
              iconColor="#fff"
              size={30}
              onPress={flipCamera}
              style={styles.flipButton}
            />
          </View>

          {/* Bottom controls */}
          <View style={styles.bottomControls}>
            {allowGallery && (
              <IconButton
                icon="image"
                iconColor="#fff"
                size={40}
                onPress={pickFromGallery}
                style={styles.galleryButton}
              />
            )}
            
            <IconButton
              icon="camera"
              iconColor="#fff"
              size={60}
              onPress={takePicture}
              disabled={!isReady}
              style={styles.captureButton}
            />
            
            <View style={styles.placeholder} />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  permissionTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  permissionButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginTop: 8,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  flipButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  galleryButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  captureButton: {
    backgroundColor: '#2196F3',
    borderWidth: 4,
    borderColor: '#fff',
  },
  placeholder: {
    width: 56,
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  previewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  previewButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});