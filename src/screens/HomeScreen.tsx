import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Cipher } from '../types';
import { loadCiphers } from '../utils/storage';
import { CALM_COLORS } from '../constants/colors';

const COLORS = CALM_COLORS;

export default function HomeScreen({ navigation }: any) {
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

  const hasCiphers = ciphers.length > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Secret Agent Home</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>What would you like to do?</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Button 1: Create Cipher */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateCipher')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonNumber}>1</Text>
          <Text style={styles.buttonTitle}>Create a New Cipher</Text>
          <Text style={styles.buttonDescription}>Make a new secret code</Text>
        </TouchableOpacity>

        {/* Button 2: Encode Message */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(hasCiphers ? 'Encode' : 'Ciphers')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonNumber}>2</Text>
          <Text style={styles.buttonTitle}>Encode a Message</Text>
          <Text style={styles.buttonDescription}>Turn normal text into secret code</Text>
        </TouchableOpacity>

        {/* Button 3: Decode Message */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(hasCiphers ? 'Decode' : 'Ciphers')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonNumber}>3</Text>
          <Text style={styles.buttonTitle}>Decode a Message</Text>
          <Text style={styles.buttonDescription}>Turn secret code into normal text</Text>
        </TouchableOpacity>

        {/* Button 4: View Ciphers */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Ciphers')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonNumber}>4</Text>
          <Text style={styles.buttonTitle}>View My Ciphers</Text>
          <Text style={styles.buttonDescription}>
            {hasCiphers
              ? `See all ${ciphers.length} cipher${ciphers.length !== 1 ? 's' : ''}`
              : 'You have no ciphers yet'
            }
          </Text>
        </TouchableOpacity>

        {/* Button 5: Creative Uses */}
        <TouchableOpacity
          style={[styles.button, styles.creativeUsesButton]}
          onPress={() => navigation.navigate('CreativeUses')}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonNumber}>💡</Text>
          <Text style={styles.buttonTitle}>Creative Uses & Tips</Text>
          <Text style={styles.buttonDescription}>
            Learn fun ways to use your ciphers and discover multi-layer encoding
          </Text>
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>Note: Educational Use Only</Text>
        <Text style={styles.disclaimerText}>
          This app uses simple substitution ciphers for fun and learning. It is not suitable for protecting sensitive information.
        </Text>
      </View>
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
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  settingsButton: {
    padding: 8,
  },
  settingsButtonText: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.cardBackground,
    padding: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 120,
  },
  buttonNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 12,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  buttonDescription: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
  creativeUsesButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  disclaimer: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  disclaimerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
});
