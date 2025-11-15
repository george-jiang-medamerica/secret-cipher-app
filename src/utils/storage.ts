import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cipher } from '../types';

const CIPHERS_KEY = '@ciphers';

/**
 * Save all ciphers to storage
 */
export const saveCiphers = async (ciphers: Cipher[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(CIPHERS_KEY, JSON.stringify(ciphers));
  } catch (error) {
    console.error('Error saving ciphers:', error);
    throw error;
  }
};

/**
 * Load all ciphers from storage
 */
export const loadCiphers = async (): Promise<Cipher[]> => {
  try {
    const data = await AsyncStorage.getItem(CIPHERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading ciphers:', error);
    return [];
  }
};

/**
 * Add a new cipher
 */
export const addCipher = async (cipher: Cipher): Promise<void> => {
  const ciphers = await loadCiphers();
  ciphers.push(cipher);
  await saveCiphers(ciphers);
};

/**
 * Delete a cipher by ID
 */
export const deleteCipher = async (id: string): Promise<void> => {
  const ciphers = await loadCiphers();
  const filtered = ciphers.filter(c => c.id !== id);
  await saveCiphers(filtered);
};

/**
 * Get a cipher by ID
 */
export const getCipherById = async (id: string): Promise<Cipher | null> => {
  const ciphers = await loadCiphers();
  return ciphers.find(c => c.id === id) || null;
};
