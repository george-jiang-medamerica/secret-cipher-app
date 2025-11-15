import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Cipher } from '../types';
import { loadCiphers, deleteCipher } from '../utils/storage';
import CipherIcon from '../components/CipherIcon';
import COLORS from '../constants/colors';

export default function CiphersScreen({ navigation }: any) {
  const [ciphers, setCiphers] = useState<Cipher[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadCiphersFromStorage();
    }, [])
  );

  const loadCiphersFromStorage = async () => {
    const loadedCiphers = await loadCiphers();
    setCiphers(loadedCiphers);
  };

  const handleDeleteCipher = (id: string, name: string) => {
    Alert.alert(
      'Delete Cipher',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'No - Cancel', style: 'cancel' },
        {
          text: 'Yes - I am sure',
          style: 'destructive',
          onPress: async () => {
            await deleteCipher(id);
            loadCiphersFromStorage();
          },
        },
      ]
    );
  };

  const renderCipherItem = ({ item }: { item: Cipher }) => (
    <View style={styles.cipherItem}>
      <View style={styles.cipherInfo}>
        <CipherIcon cipher={item} size={32} />
        <Text style={styles.cipherName}>{item.name}</Text>
      </View>
      <View style={styles.cipherActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ShareCipher', { cipher: item })}
        >
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteCipher(item.id, item.name)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Ciphers</Text>

      {ciphers.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>You have no cipher (secret code) yet</Text>
          <Text style={styles.emptySubtext}>Create your first cipher</Text>
        </View>
      ) : (
        <FlatList
          data={ciphers}
          renderItem={renderCipherItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={() => navigation.navigate('CreateCipher')}
        >
          <Text style={styles.buttonText}>Create New Cipher</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.scanButton]}
          onPress={() => navigation.navigate('ScanCipher')}
        >
          <Text style={styles.buttonText}>Scan To Import New Cipher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 20,
    marginBottom: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  cipherItem: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cipherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cipherName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 12,
    flex: 1,
  },
  cipherActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 50,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryText,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.error,
    minHeight: 50,
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.errorText,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 16,
  },
  button: {
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  createButton: {
    backgroundColor: COLORS.primary,
  },
  scanButton: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
});
