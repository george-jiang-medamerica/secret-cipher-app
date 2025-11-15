import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { File, Paths } from 'expo-file-system';
import { Cipher } from '../types';
import { exportCipher } from '../utils/cipherUtils';
import CipherIcon from '../components/CipherIcon';
import COLORS from '../constants/colors';

export default function ShareCipherScreen({ route, navigation }: any) {
  const cipher: Cipher = route.params?.cipher;
  const qrCodeRef = useRef<any>();

  if (!cipher) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No cipher selected</Text>
      </View>
    );
  }

  const cipherData = exportCipher(cipher);

  const handleShareText = async () => {
    try {
      await Share.share({
        message: `Join me on Secret Cipher! Use this cipher to send me encoded messages:\n\nCipher: ${cipher.name}\nData: ${cipherData}`,
        title: `Share ${cipher.name} Cipher`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share cipher');
    }
  };

  const handleSaveImage = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please grant permission to save images');
        return;
      }

      // Use toDataURL with error handling
      if (!qrCodeRef.current) {
        Alert.alert('Error', 'QR code not ready. Please try again.');
        return;
      }

      qrCodeRef.current.toDataURL(async (data: string) => {
        try {
          if (!data) {
            Alert.alert('Error', 'Failed to generate QR code image');
            return;
          }

          // Use the new File API with Paths
          const fileName = `${cipher.name}_qr.png`;
          const file = new File(Paths.document, fileName);

          // Create the file
          await file.create();

          // Write the base64 data
          await file.write(data, { encoding: 'base64' });

          // Save to media library using the file's uri
          const asset = await MediaLibrary.createAssetAsync(file.uri);
          await MediaLibrary.createAlbumAsync('Secret Cipher', asset, false);

          Alert.alert('Success', 'QR code saved to your photo gallery!');
        } catch (innerError) {
          console.error('Error saving QR code:', innerError);
          Alert.alert('Error', 'Failed to save QR code to gallery');
        }
      });
    } catch (error) {
      console.error('Error in handleSaveImage:', error);
      Alert.alert('Error', 'Failed to save QR code');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Share With A Friend</Text>

      <View style={styles.cipherInfo}>
        <CipherIcon cipher={cipher} size={48} />
        <Text style={styles.cipherName}>{cipher.name}</Text>
      </View>

      <View style={styles.instructionsContainer}>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionNumber}>1.</Text>
          <Text style={styles.instructionText}>Have your friend install this app.</Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionNumber}>2.</Text>
          <Text style={styles.instructionText}>Have your friend scan this QR code to get the cipher into their app.</Text>
        </View>
        <View style={styles.instructionItem}>
          <Text style={styles.instructionNumber}>3.</Text>
          <Text style={styles.instructionText}>Done! You can communicate with each other using the shared cipher.</Text>
        </View>
      </View>

      <View style={styles.qrContainer}>
        <QRCode
          value={cipherData}
          size={250}
          backgroundColor="white"
          color={COLORS.qrCodeColor}
          getRef={qrCodeRef}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={handleShareText}
        >
          <Text style={styles.shareButtonText}>Share via SMS/Email</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveImage}
        >
          <Text style={styles.saveButtonText}>Save As Image</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>Important</Text>
        <Text style={styles.warningText}>
          Anyone with this QR code can decode your messages. Only share with trusted friends.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.doneButtonText}>I am Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  cipherInfo: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 24,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cipherName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 12,
  },
  instructionsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  instructionNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: 12,
    minWidth: 30,
  },
  instructionText: {
    flex: 1,
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    width: '100%',
  },
  shareButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
    justifyContent: 'center',
  },
  shareButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  warningBox: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.warning,
    width: '100%',
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.errorText,
    textAlign: 'center',
    marginTop: 50,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 8,
    minHeight: 60,
  },
  doneButtonText: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
});
