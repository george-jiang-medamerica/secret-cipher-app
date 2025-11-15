import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Keyboard,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { Cipher } from '../types';
import { loadCiphers } from '../utils/storage';
import { encode, formatEncodedMessage } from '../utils/cipherUtils';
import CipherIcon from '../components/CipherIcon';
import COLORS from '../constants/colors';

export default function EncodeScreen({ navigation }: any) {
  const [message, setMessage] = useState('');
  const [encodedMessage, setEncodedMessage] = useState('');
  const [ciphers, setCiphers] = useState<Cipher[]>([]);
  const [selectedCipher, setSelectedCipher] = useState<Cipher | null>(null);
  const [showCipherPicker, setShowCipherPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadCiphersFromStorage();
    }, [])
  );

  const loadCiphersFromStorage = async () => {
    const loadedCiphers = await loadCiphers();
    setCiphers(loadedCiphers);
    if (loadedCiphers.length > 0 && !selectedCipher) {
      setSelectedCipher(loadedCiphers[0]);
    }
  };

  const handleEncode = () => {
    setErrorMessage('');

    if (!message.trim()) {
      setErrorMessage('Please enter a message to encode');
      return;
    }

    if (!selectedCipher) {
      setErrorMessage('Please select a cipher');
      return;
    }

    const encoded = encode(message, selectedCipher);
    const formatted = formatEncodedMessage(encoded, selectedCipher.id);
    setEncodedMessage(formatted);
  };

  const handleCopy = async () => {
    if (!encodedMessage) return;

    await Clipboard.setStringAsync(encodedMessage);
    Alert.alert('Copied', 'Encoded message copied to clipboard');
  };

  const handlePaste = async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    setMessage(clipboardContent);
    setErrorMessage('');
  };

  const handleReset = () => {
    setMessage('');
    setEncodedMessage('');
    setErrorMessage('');
  };

  const renderCipherItem = ({ item }: { item: Cipher }) => (
    <TouchableOpacity
      style={[
        styles.cipherPickerItem,
        selectedCipher?.id === item.id && styles.cipherPickerItemSelected,
      ]}
      onPress={() => {
        setSelectedCipher(item);
        setShowCipherPicker(false);
        setEncodedMessage('');
      }}
    >
      <View style={styles.cipherPickerIconContainer}>
        <CipherIcon cipher={item} size={28} />
      </View>
      <Text style={styles.cipherPickerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Encode Message</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Choose which cipher to use</Text>
        <TouchableOpacity
          style={styles.cipherSelector}
          onPress={() => setShowCipherPicker(true)}
        >
          {selectedCipher ? (
            <>
              <View style={styles.cipherSelectorIconContainer}>
                <CipherIcon cipher={selectedCipher} size={28} />
              </View>
              <Text style={styles.cipherSelectorText}>{selectedCipher.name}</Text>
            </>
          ) : (
            <Text style={styles.cipherSelectorText}>Select a cipher</Text>
          )}
          <Text style={styles.cipherSelectorArrow}>▼</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Type your message</Text>
          <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
            <Text style={styles.pasteButtonText}>Paste from Clipboard</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.messageInput}
          placeholder="Example: Hello friend"
          placeholderTextColor={COLORS.inputPlaceholder}
          value={message}
          onChangeText={(text) => {
            setMessage(text);
            setErrorMessage('');
          }}
          multiline
          numberOfLines={4}
          blurOnSubmit={true}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.encodeButton} onPress={handleEncode}>
        <Text style={styles.encodeButtonText}>Encode Message</Text>
      </TouchableOpacity>

      {encodedMessage && (
        <View style={styles.resultSection}>
          <Text style={styles.resultLabel}>Your message in secret code</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText} selectable>
              {encodedMessage}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
              <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Start Over</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Send this to someone. They need your cipher to read it.
          </Text>

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              Note: This is for learning and fun, not for real secrets.
            </Text>
          </View>
        </View>
      )}

      <Modal
        visible={showCipherPicker}
        transparent
        animationType="none"
        onRequestClose={() => setShowCipherPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Cipher</Text>
            <FlatList
              data={ciphers}
              renderItem={renderCipherItem}
              keyExtractor={(item) => item.id}
              style={styles.cipherPickerList}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCipherPicker(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: 32,
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pasteButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pasteButtonText: {
    color: COLORS.primaryText,
    fontSize: 16,
    fontWeight: '600',
  },
  cipherSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  cipherSelectorIconContainer: {
    marginRight: 12,
  },
  cipherSelectorText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    flex: 1,
  },
  cipherSelectorArrow: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  messageInput: {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.textPrimary,
    fontSize: 18,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.inputBorder,
    minHeight: 100,
    lineHeight: 27,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.errorText,
    marginTop: 8,
  },
  encodeButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  encodeButtonText: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
  resultSection: {
    marginTop: 32,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  resultBox: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  resultText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    lineHeight: 27,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  copyButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  copyButtonText: {
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: '600',
  },
  resetButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  resetButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: 16,
    lineHeight: 27,
  },
  disclaimer: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  disclaimerText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 24,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  cipherPickerList: {
    marginBottom: 20,
  },
  cipherPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  cipherPickerItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBackground,
  },
  cipherPickerIconContainer: {
    marginRight: 12,
  },
  cipherPickerName: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  modalCloseButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  modalCloseButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
});
