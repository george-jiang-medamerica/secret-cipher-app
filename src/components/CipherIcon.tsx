import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Cipher } from '../types';

interface CipherIconProps {
  cipher: Cipher;
  size?: number;
}

export default function CipherIcon({ cipher, size = 32 }: CipherIconProps) {
  if (cipher.iconType === 'image' && cipher.imageUri) {
    return (
      <Image
        source={{ uri: cipher.imageUri }}
        style={[
          styles.image,
          { width: size, height: size, borderRadius: size / 6 },
        ]}
      />
    );
  }

  return (
    <Text style={[styles.emoji, { fontSize: size }]}>
      {cipher.icon}
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  emoji: {
    // fontSize is set dynamically
  },
});
