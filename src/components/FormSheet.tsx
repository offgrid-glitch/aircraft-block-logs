import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Card, 
  HelperText,
  Divider,
} from 'react-native-paper';

import { Job, JobFormData } from '@/models/Job';
import { strings } from '@/utils/strings';

interface FormSheetProps {
  initialData?: Partial<JobFormData>;
  onSave: (data: JobFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function FormSheet({
  initialData = {},
  onSave,
  onCancel,
  isLoading = false,
}: FormSheetProps) {
  const [formData, setFormData] = useState<JobFormData>({
    aircraftId: initialData.aircraftId || '',
    tailNumber: initialData.tailNumber || '',
    pilotName: initialData.pilotName || '',
    copilotName: initialData.copilotName || '',
    flightNumber: initialData.flightNumber || '',
    routeFrom: initialData.routeFrom || '',
    routeTo: initialData.routeTo || '',
    fuelQuantity: initialData.fuelQuantity || undefined,
    passengerCount: initialData.passengerCount || undefined,
    cargoWeight: initialData.cargoWeight || undefined,
    weatherConditions: initialData.weatherConditions || '',
    notes: initialData.notes || '',
    discrepancies: initialData.discrepancies || '',
    maintenanceNotes: initialData.maintenanceNotes || '',
    ...initialData,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Required fields
    if (!formData.tailNumber?.trim()) {
      newErrors.tailNumber = strings.form.required;
    }
    if (!formData.pilotName?.trim()) {
      newErrors.pilotName = strings.form.required;
    }

    // Numeric validations
    if (formData.fuelQuantity !== undefined && formData.fuelQuantity < 0) {
      newErrors.fuelQuantity = 'Must be a positive number';
    }
    if (formData.passengerCount !== undefined && formData.passengerCount < 0) {
      newErrors.passengerCount = 'Must be a positive number';
    }
    if (formData.cargoWeight !== undefined && formData.cargoWeight < 0) {
      newErrors.cargoWeight = 'Must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    } else {
      Alert.alert('Validation Error', strings.form.validationError);
    }
  };

  const updateField = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {strings.form.title}
          </Text>

          {/* Aircraft Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Aircraft Information
            </Text>
            
            <TextInput
              label={`${strings.form.tailNumber} *`}
              value={formData.tailNumber}
              onChangeText={(text) => updateField('tailNumber', text)}
              error={!!errors.tailNumber}
              style={styles.input}
              mode="outlined"
              placeholder="e.g., N123AB"
            />
            <HelperText type="error" visible={!!errors.tailNumber}>
              {errors.tailNumber}
            </HelperText>

            <TextInput
              label={strings.form.aircraft}
              value={formData.aircraftId}
              onChangeText={(text) => updateField('aircraftId', text)}
              style={styles.input}
              mode="outlined"
              placeholder="e.g., Boeing 737-800"
            />
          </View>

          <Divider style={styles.divider} />

          {/* Crew Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Crew Information
            </Text>
            
            <TextInput
              label={`${strings.form.pilot} *`}
              value={formData.pilotName}
              onChangeText={(text) => updateField('pilotName', text)}
              error={!!errors.pilotName}
              style={styles.input}
              mode="outlined"
              placeholder="Pilot in Command"
            />
            <HelperText type="error" visible={!!errors.pilotName}>
              {errors.pilotName}
            </HelperText>

            <TextInput
              label={strings.form.copilot}
              value={formData.copilotName}
              onChangeText={(text) => updateField('copilotName', text)}
              style={styles.input}
              mode="outlined"
              placeholder="Second in Command"
            />
          </View>

          <Divider style={styles.divider} />

          {/* Flight Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Flight Information
            </Text>
            
            <TextInput
              label={strings.form.flightNumber}
              value={formData.flightNumber}
              onChangeText={(text) => updateField('flightNumber', text)}
              style={styles.input}
              mode="outlined"
              placeholder="e.g., AA123"
            />

            <View style={styles.routeContainer}>
              <TextInput
                label={strings.form.from}
                value={formData.routeFrom}
                onChangeText={(text) => updateField('routeFrom', text)}
                style={[styles.input, styles.routeInput]}
                mode="outlined"
                placeholder="LAX"
              />
              <TextInput
                label={strings.form.to}
                value={formData.routeTo}
                onChangeText={(text) => updateField('routeTo', text)}
                style={[styles.input, styles.routeInput]}
                mode="outlined"
                placeholder="JFK"
              />
            </View>
          </View>

          <Divider style={styles.divider} />

          {/* Operations Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Operations Information
            </Text>
            
            <TextInput
              label={strings.form.fuel}
              value={formData.fuelQuantity?.toString() || ''}
              onChangeText={(text) => updateField('fuelQuantity', text ? parseFloat(text) : undefined)}
              error={!!errors.fuelQuantity}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              placeholder="Gallons"
            />
            <HelperText type="error" visible={!!errors.fuelQuantity}>
              {errors.fuelQuantity}
            </HelperText>

            <TextInput
              label={strings.form.passengers}
              value={formData.passengerCount?.toString() || ''}
              onChangeText={(text) => updateField('passengerCount', text ? parseInt(text) : undefined)}
              error={!!errors.passengerCount}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              placeholder="Number of passengers"
            />
            <HelperText type="error" visible={!!errors.passengerCount}>
              {errors.passengerCount}
            </HelperText>

            <TextInput
              label={strings.form.cargo}
              value={formData.cargoWeight?.toString() || ''}
              onChangeText={(text) => updateField('cargoWeight', text ? parseFloat(text) : undefined)}
              error={!!errors.cargoWeight}
              style={styles.input}
              mode="outlined"
              keyboardType="numeric"
              placeholder="Pounds"
            />
            <HelperText type="error" visible={!!errors.cargoWeight}>
              {errors.cargoWeight}
            </HelperText>
          </View>

          <Divider style={styles.divider} />

          {/* Additional Information */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Additional Information
            </Text>
            
            <TextInput
              label={strings.form.weather}
              value={formData.weatherConditions}
              onChangeText={(text) => updateField('weatherConditions', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={2}
              placeholder="Current weather conditions"
            />

            <TextInput
              label={strings.form.notes}
              value={formData.notes}
              onChangeText={(text) => updateField('notes', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="General notes and observations"
            />

            <TextInput
              label={strings.form.discrepancies}
              value={formData.discrepancies}
              onChangeText={(text) => updateField('discrepancies', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Any discrepancies or issues noted"
            />

            <TextInput
              label={strings.form.maintenance}
              value={formData.maintenanceNotes}
              onChangeText={(text) => updateField('maintenanceNotes', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Maintenance notes and requirements"
            />
          </View>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSave}
          loading={isLoading}
          disabled={isLoading}
          style={styles.saveButton}
        >
          {strings.form.save}
        </Button>
        
        {onCancel && (
          <Button
            mode="outlined"
            onPress={onCancel}
            disabled={isLoading}
            style={styles.cancelButton}
          >
            {strings.form.cancel}
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
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#2196F3',
  },
  input: {
    marginBottom: 8,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  divider: {
    marginVertical: 16,
  },
  buttonContainer: {
    padding: 16,
    paddingTop: 0,
  },
  saveButton: {
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 32,
  },
});