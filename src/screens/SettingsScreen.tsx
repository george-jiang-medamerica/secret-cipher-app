import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import COLORS from '../constants/colors';

export default function SettingsScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings (read only)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current UI Mode</Text>
        <View style={styles.settingCard}>
          <Text style={styles.settingDescription}>
            Calm Mode: Simple and predictable interface
          </Text>
        </View>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.noteText}>
          This app uses a calm, neurodivergent-friendly design with soft colors, clear text, and no animations.
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  settingDescription: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
  noteSection: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  noteText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    lineHeight: 27,
  },
});
