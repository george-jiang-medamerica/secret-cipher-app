import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Cipher } from '../types';
import { generateRandomCipher } from '../utils/cipherUtils';
import { addCipher } from '../utils/storage';
import COLORS from '../constants/colors';
import { MATH_CONSTANTS, generateMathCipherMapping, MathConstant } from '../utils/mathConstants';

// Simple icons for autism-friendly design
const SIMPLE_ICONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '★', '●', '■'];
// Colorful emojis for traditional design
const EMOJI_ICONS = ['🔐', '🤫', '🕵️', '🎭', '👾', '🦄', '🌟', '🔮', '🎪', '🎨', '🎲', '🎯'];

// Use SIMPLE_ICONS for autism-friendly design, or EMOJI_ICONS for traditional
const ICON_OPTIONS = EMOJI_ICONS; // Change to SIMPLE_ICONS for autism-friendly numbers

export default function CreateCipherScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🔐');
  const [iconType, setIconType] = useState<'emoji' | 'image'>('emoji');
  const [customImageUri, setCustomImageUri] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      setErrorMessage('Please allow access to your photo library to select an image');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets[0]) {
      setCustomImageUri(result.assets[0].uri);
      setIconType('image');
      setSelectedIcon('');
      setErrorMessage('');
    }
  };

  const handleCreateMathCipher = async (mathConstant: MathConstant) => {
    const cipher: Cipher = {
      id: Date.now().toString(),
      name: mathConstant.name,
      icon: mathConstant.icon,
      iconType: 'emoji',
      mapping: generateMathCipherMapping(mathConstant.digits),
      createdAt: Date.now(),
    };

    try {
      await addCipher(cipher);
      Alert.alert(
        'Cipher Created',
        `${mathConstant.symbol} (${mathConstant.name}) cipher has been created!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create cipher. Please try again.');
    }
  };

  const handleCreate = async () => {
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter a name for your cipher');
      return;
    }

    const cipher: Cipher = {
      id: Date.now().toString(),
      name: name.trim(),
      icon: iconType === 'emoji' ? selectedIcon : '📷',
      iconType,
      imageUri: iconType === 'image' ? customImageUri || undefined : undefined,
      mapping: generateRandomCipher(),
      createdAt: Date.now(),
    };

    try {
      await addCipher(cipher);
      navigation.goBack();
    } catch (error) {
      setErrorMessage('Failed to create cipher. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create New Cipher</Text>
      <Text style={styles.subtitle}>
        Your cipher will use a random pattern to scramble messages
      </Text>

      <View style={styles.section}>
        <Text style={styles.label}>Quick Create - Mathematical Constants</Text>
        <Text style={styles.mathDescription}>
          1-click instant ciphers based on famous mathematical numbers
        </Text>
        <View style={styles.mathGrid}>
          {MATH_CONSTANTS.map((constant) => (
            <TouchableOpacity
              key={constant.symbol}
              style={styles.mathButton}
              onPress={() => handleCreateMathCipher(constant)}
            >
              <Text style={styles.mathIcon}>{constant.icon}</Text>
              <Text style={styles.mathSymbol}>{constant.symbol}</Text>
              <Text style={styles.mathName}>{constant.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.label}>Name your cipher</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: Isabella Cipher"
          placeholderTextColor={COLORS.inputPlaceholder}
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrorMessage('');
          }}
          maxLength={30}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Choose a picture for cipher</Text>
        <View style={styles.iconGrid}>
          {ICON_OPTIONS.map((icon) => (
            <TouchableOpacity
              key={icon}
              style={[
                styles.iconButton,
                iconType === 'emoji' && selectedIcon === icon && styles.iconButtonSelected,
              ]}
              onPress={() => {
                setSelectedIcon(icon);
                setIconType('emoji');
                setCustomImageUri(null);
              }}
            >
              <Text style={styles.iconText}>{icon}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerButtonText}>Use Custom Picture</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.previewSection}>
        <Text style={styles.previewLabel}>Preview (this is how it looks)</Text>
        <View style={styles.preview}>
          {iconType === 'image' && customImageUri ? (
            <Image source={{ uri: customImageUri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.previewIcon}>{selectedIcon}</Text>
          )}
          <Text style={styles.previewName}>
            {name.trim() || 'My Cipher'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>OK - Save This Cipher</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 32,
    lineHeight: 27,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.textPrimary,
    fontSize: 18,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    minHeight: 60,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.errorText,
    marginTop: 8,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  iconButton: {
    width: 70,
    height: 70,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  iconButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBackground,
  },
  iconText: {
    fontSize: 32,
    color: COLORS.textPrimary,
  },
  imagePickerButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  imagePickerButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  previewSection: {
    marginBottom: 32,
  },
  previewLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  previewIcon: {
    fontSize: 40,
    marginRight: 15,
    color: COLORS.textPrimary,
  },
  previewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  previewName: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  createButtonText: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  mathDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 24,
  },
  mathGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  mathButton: {
    width: '48%',
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    minHeight: 120,
    justifyContent: 'center',
  },
  mathIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  mathSymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  mathName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.border,
    marginVertical: 24,
    borderRadius: 1,
  },
});
