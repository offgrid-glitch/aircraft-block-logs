import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import SignatureCanvas from 'react-native-signature-canvas';

import { strings } from '@/utils/strings';

interface SignaturePadProps {
  onSignatureCapture: (signature: string) => void;
  onCancel?: () => void;
  initialSignature?: string;
  title?: string;
}

export default function SignaturePad({
  onSignatureCapture,
  onCancel,
  initialSignature,
  title = strings.signature.title,
}: SignaturePadProps) {
  const signatureRef = useRef<any>(null);
  const [hasSignature, setHasSignature] = useState(!!initialSignature);

  const handleSignature = (signature: string) => {
    setHasSignature(true);
    onSignatureCapture(signature);
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
    setHasSignature(false);
  };

  const handleSave = () => {
    if (hasSignature) {
      signatureRef.current?.readSignature();
    }
  };

  const handleEmpty = () => {
    setHasSignature(false);
  };

  const handleBegin = () => {
    // Called when user starts signing
  };

  const handleEnd = () => {
    // Called when user finishes a stroke
    setHasSignature(true);
  };

  // Configuration for the signature canvas
  const webStyle = `
    .m-signature-pad {
      box-shadow: none;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }
    .m-signature-pad--body {
      border: none;
    }
    .m-signature-pad--footer {
      display: none;
    }
    body,html {
      width: 100%; 
      height: 100%;
      margin: 0;
      padding: 0;
    }
  `;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {title}
          </Text>
          
          <Text variant="bodyMedium" style={styles.instruction}>
            {strings.signature.sign}
          </Text>

          <View style={styles.signatureContainer}>
            <SignatureCanvas
              ref={signatureRef}
              onOK={handleSignature}
              onEmpty={handleEmpty}
              onBegin={handleBegin}
              onEnd={handleEnd}
              descriptionText=""
              clearText={strings.signature.clear}
              confirmText={strings.signature.save}
              webStyle={webStyle}
              autoClear={false}
              imageType="image/png"
              style={styles.signature}
              backgroundColor="#ffffff"
              penColor="#000000"
              trimWhitespace={true}
              minWidth={2}
              maxWidth={4}
              canvasProps={{
                width: 300,
                height: 200,
              }}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleClear}
              style={styles.clearButton}
              icon="eraser"
            >
              {strings.signature.clear}
            </Button>
            
            <Button
              mode="contained"
              onPress={handleSave}
              disabled={!hasSignature}
              style={styles.saveButton}
              icon="check"
            >
              {strings.signature.save}
            </Button>
          </View>

          {onCancel && (
            <Button
              mode="text"
              onPress={onCancel}
              style={styles.cancelButton}
            >
              {strings.common.cancel}
            </Button>
          )}
        </Card.Content>
      </Card>

      {/* Signature Guidelines */}
      <Card style={styles.guidelinesCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.guidelinesTitle}>
            Signature Guidelines
          </Text>
          
          <Text variant="bodyMedium" style={styles.guidelineText}>
            • Use your finger or stylus to sign in the box above
          </Text>
          <Text variant="bodyMedium" style={styles.guidelineText}>
            • Sign clearly and legibly
          </Text>
          <Text variant="bodyMedium" style={styles.guidelineText}>
            • Tap "Clear" to start over if needed
          </Text>
          <Text variant="bodyMedium" style={styles.guidelineText}>
            • Tap "Save" when you're satisfied with your signature
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  signatureContainer: {
    height: 220,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 20,
    overflow: 'hidden',
  },
  signature: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
  },
  cancelButton: {
    alignSelf: 'center',
  },
  guidelinesCard: {
    elevation: 2,
  },
  guidelinesTitle: {
    marginBottom: 12,
    color: '#2196F3',
  },
  guidelineText: {
    marginBottom: 4,
    color: '#666',
  },
});