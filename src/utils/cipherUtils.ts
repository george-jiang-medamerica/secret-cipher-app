import { Cipher } from '../types';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,!?\'"';

/**
 * Generate a random substitution cipher mapping
 */
export const generateRandomCipher = (): { [key: string]: string } => {
  const chars = ALPHABET.split('');
  const shuffled = [...chars].sort(() => Math.random() - 0.5);

  const mapping: { [key: string]: string } = {};
  chars.forEach((char, index) => {
    mapping[char] = shuffled[index];
  });

  return mapping;
};

/**
 * Encode a message using a cipher
 */
export const encode = (message: string, cipher: Cipher): string => {
  return message
    .split('')
    .map(char => cipher.mapping[char] || char)
    .join('');
};

/**
 * Decode a message using a cipher
 */
export const decode = (encodedMessage: string, cipher: Cipher): string => {
  // Create reverse mapping
  const reverseMapping: { [key: string]: string } = {};
  Object.entries(cipher.mapping).forEach(([key, value]) => {
    reverseMapping[value] = key;
  });

  return encodedMessage
    .split('')
    .map(char => reverseMapping[char] || char)
    .join('');
};

/**
 * Export cipher as JSON string for QR code
 */
export const exportCipher = (cipher: Cipher): string => {
  return JSON.stringify(cipher);
};

/**
 * Import cipher from JSON string
 */
export const importCipher = (jsonString: string): Cipher => {
  return JSON.parse(jsonString);
};

/**
 * Add emoji prefix to encoded message
 */
export const formatEncodedMessage = (encoded: string, cipherId: string): string => {
  return `🔐 ${encoded}`;
};

/**
 * Remove emoji prefix from message
 */
export const cleanEncodedMessage = (message: string): string => {
  return message.replace(/^🔐\s*/, '');
};
