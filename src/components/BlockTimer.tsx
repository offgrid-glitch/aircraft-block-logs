import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, Chip } from 'react-native-paper';
import * as Location from 'expo-location';

import { formatTime, formatDuration, getCurrentTimestamp } from '@/utils/time';
import { strings } from '@/utils/strings';

interface BlockTimerProps {
  jobId?: string;
  onBlockIn?: (timestamp: Date, location?: Location.LocationObject) => void;
  onBlockOut?: (timestamp: Date, location?: Location.LocationObject) => void;
  onCapturePhoto?: (type: 'block-in' | 'block-out') => void;
  initialBlockInTime?: Date;
  initialBlockOutTime?: Date;
}

export default function BlockTimer({
  jobId,
  onBlockIn,
  onBlockOut,
  onCapturePhoto,
  initialBlockInTime,
  initialBlockOutTime,
}: BlockTimerProps) {
  const [blockInTime, setBlockInTime] = useState<Date | null>(initialBlockInTime || null);
  const [blockOutTime, setBlockOutTime] = useState<Date | null>(initialBlockOutTime || null);
  const [currentTime, setCurrentTime] = useState<Date>(getCurrentTimestamp());
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimestamp());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Get current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission not granted');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLocationError(null);
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Failed to get location');
    }
  };

  const handleBlockIn = () => {
    const timestamp = getCurrentTimestamp();
    setBlockInTime(timestamp);
    onBlockIn?.(timestamp, location || undefined);
  };

  const handleBlockOut = () => {
    const timestamp = getCurrentTimestamp();
    setBlockOutTime(timestamp);
    onBlockOut?.(timestamp, location || undefined);
  };

  const getElapsedTime = (): string => {
    if (!blockInTime) return '0m';
    
    const endTime = blockOutTime || currentTime;
    const elapsedMinutes = Math.floor((endTime.getTime() - blockInTime.getTime()) / (1000 * 60));
    return formatDuration(elapsedMinutes);
  };

  const isBlockedIn = blockInTime !== null;
  const isBlockedOut = blockOutTime !== null;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {strings.blockTimer.timer}
          </Text>
          
          {/* Current Time */}
          <View style={styles.timeSection}>
            <Text variant="titleMedium">Current Time</Text>
            <Text variant="bodyLarge" style={styles.timeText}>
              {formatTime(currentTime)}
            </Text>
          </View>

          {/* Block In Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium">{strings.blockTimer.blockIn}</Text>
              <Chip icon="airplane-landing" mode={isBlockedIn ? 'flat' : 'outlined'}>
                {isBlockedIn ? 'Completed' : 'Pending'}
              </Chip>
            </View>
            
            {blockInTime ? (
              <Text variant="bodyLarge" style={styles.timeText}>
                {formatTime(blockInTime)}
              </Text>
            ) : (
              <Button 
                mode="contained" 
                onPress={handleBlockIn}
                style={styles.button}
                icon="airplane-landing"
              >
                {strings.blockTimer.blockIn}
              </Button>
            )}
            
            {isBlockedIn && (
              <Button
                mode="outlined"
                onPress={() => onCapturePhoto?.('block-in')}
                style={styles.photoButton}
                icon="camera"
              >
                {strings.blockTimer.capturePhoto}
              </Button>
            )}
          </View>

          {/* Block Out Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium">{strings.blockTimer.blockOut}</Text>
              <Chip icon="airplane-takeoff" mode={isBlockedOut ? 'flat' : 'outlined'}>
                {isBlockedOut ? 'Completed' : 'Pending'}
              </Chip>
            </View>
            
            {blockOutTime ? (
              <Text variant="bodyLarge" style={styles.timeText}>
                {formatTime(blockOutTime)}
              </Text>
            ) : (
              <Button 
                mode="contained" 
                onPress={handleBlockOut}
                disabled={!isBlockedIn}
                style={styles.button}
                icon="airplane-takeoff"
              >
                {strings.blockTimer.blockOut}
              </Button>
            )}
            
            {isBlockedIn && !isBlockedOut && (
              <Button
                mode="outlined"
                onPress={() => onCapturePhoto?.('block-out')}
                style={styles.photoButton}
                icon="camera"
              >
                {strings.blockTimer.capturePhoto}
              </Button>
            )}
          </View>

          {/* Elapsed Time */}
          {isBlockedIn && (
            <View style={styles.section}>
              <Text variant="titleMedium">{strings.blockTimer.elapsed}</Text>
              <Text variant="headlineMedium" style={styles.elapsedText}>
                {getElapsedTime()}
              </Text>
            </View>
          )}

          {/* Location */}
          <View style={styles.section}>
            <Text variant="titleMedium">{strings.blockTimer.location}</Text>
            {location ? (
              <Text variant="bodyMedium">
                {location.coords.latitude.toFixed(6)}, {location.coords.longitude.toFixed(6)}
              </Text>
            ) : locationError ? (
              <Text variant="bodyMedium" style={styles.errorText}>
                {locationError}
              </Text>
            ) : (
              <Text variant="bodyMedium" style={styles.loadingText}>
                {strings.blockTimer.locationLoading}
              </Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  timeSection: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  elapsedText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
    marginTop: 8,
  },
  button: {
    marginVertical: 8,
  },
  photoButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#f44336',
  },
  loadingText: {
    color: '#757575',
  },
});