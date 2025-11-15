import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import COLORS from '../constants/colors';

interface UseCase {
  id: string;
  icon: string;
  title: string;
  description: string;
  example: string;
}

const USE_CASES: UseCase[] = [
  {
    id: '1',
    icon: '🔐🔐',
    title: 'Double-Layer Encryption',
    description: 'Encode your message twice using different ciphers for extra security',
    example: 'Example: "Hello" → (Pi Cipher) → "82556" → (Golden Ratio) → "16180"',
  },
  {
    id: '2',
    icon: '📓',
    title: 'Secret Diary Entries',
    description: 'Keep a private journal that only you can read',
    example: 'Write your thoughts, encode them with your personal cipher, and store them safely',
  },
  {
    id: '4',
    icon: '💌',
    title: 'Secret Messages Between Friends',
    description: 'Share a cipher with your best friend and send private messages',
    example: 'Send encoded notes or plan secret birthday surprises together',
  },
  {
    id: '6',
    icon: '🔑',
    title: 'Password Hints',
    description: 'Store password hints in encoded form (not the actual passwords!)',
    example: 'Encode reminders about which password you used where - safer than plain text',
  },
];

export default function CreativeUsesScreen({ navigation }: any) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const tutorialSteps = [
    {
      title: 'Step 1: Encode with First Cipher',
      description: 'Start with your original message',
      visual: '📝 "Hello Friend" → 🥧 Pi Cipher',
      result: 'Result: "82556 31415"',
    },
    {
      title: 'Step 2: Copy the Encoded Message',
      description: 'Copy the encoded result to your clipboard',
      visual: '📋 Copy: "82556 31415"',
      result: 'Now you have the first layer of encoding!',
    },
    {
      title: 'Step 3: Encode Again with Second Cipher',
      description: 'Paste the encoded message and encode it again with a different cipher',
      visual: '"82556 31415" → 🌻 Golden Ratio',
      result: 'Final Result: "16180 31415"',
    },
    {
      title: 'Step 4: Share the Sequence',
      description: 'Tell your friend which ciphers to use and in what order',
      visual: '📱 "Use Pi, then Golden Ratio"',
      result: 'Your friend decodes in reverse: Golden Ratio first, then Pi!',
    },
  ];

  const renderUseCase = (useCase: UseCase) => (
    <View key={useCase.id} style={styles.useCaseCard}>
      <Text style={styles.useCaseIcon}>{useCase.icon}</Text>
      <View style={styles.useCaseContent}>
        <Text style={styles.useCaseTitle}>{useCase.title}</Text>
        <Text style={styles.useCaseDescription}>{useCase.description}</Text>
        <View style={styles.exampleBox}>
          <Text style={styles.exampleText}>{useCase.example}</Text>
        </View>
      </View>
    </View>
  );

  const handleNextStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      setShowTutorial(false);
      setTutorialStep(0);
    }
  };

  const handlePrevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Creative Ways to Use This App</Text>
      <Text style={styles.subtitle}>
        Get inspired! Here are some fun and practical ways to use Secret Cipher
      </Text>

      {/* Pro Tip Highlight */}
      <View style={styles.proTipCard}>
        <Text style={styles.proTipBadge}>⭐ PRO TIP</Text>
        <Text style={styles.proTipTitle}>Multi-Layer Encoding</Text>
        <Text style={styles.proTipDescription}>
          For maximum security, encode your message multiple times using different ciphers!
        </Text>
        <View style={styles.flowDiagram}>
          <Text style={styles.flowText}>Message → Cipher 1 → Cipher 2 → Super Secret! 🔒</Text>
        </View>
        <TouchableOpacity
          style={styles.tutorialButton}
          onPress={() => setShowTutorial(true)}
        >
          <Text style={styles.tutorialButtonText}>Start Interactive Tutorial</Text>
        </TouchableOpacity>
      </View>

      {/* Use Cases */}
      <View style={styles.useCasesSection}>
        <Text style={styles.sectionTitle}>Popular Use Cases</Text>
        {USE_CASES.map(renderUseCase)}
      </View>

      {/* Try It Button */}
      <TouchableOpacity
        style={styles.tryButton}
        onPress={() => navigation.navigate('Encode')}
      >
        <Text style={styles.tryButtonText}>Try Encoding Now!</Text>
      </TouchableOpacity>

      {/* Tutorial Modal */}
      <Modal
        visible={showTutorial}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowTutorial(false);
          setTutorialStep(0);
        }}
      >
        <View style={styles.tutorialOverlay}>
          <View style={styles.tutorialModal}>
            <Text style={styles.tutorialTitle}>Multi-Cipher Tutorial</Text>
            <Text style={styles.tutorialProgress}>
              Step {tutorialStep + 1} of {tutorialSteps.length}
            </Text>

            <View style={styles.tutorialContent}>
              <Text style={styles.tutorialStepTitle}>
                {tutorialSteps[tutorialStep].title}
              </Text>
              <Text style={styles.tutorialStepDescription}>
                {tutorialSteps[tutorialStep].description}
              </Text>

              <View style={styles.tutorialVisual}>
                <Text style={styles.tutorialVisualText}>
                  {tutorialSteps[tutorialStep].visual}
                </Text>
              </View>

              <View style={styles.tutorialResult}>
                <Text style={styles.tutorialResultText}>
                  {tutorialSteps[tutorialStep].result}
                </Text>
              </View>
            </View>

            <View style={styles.tutorialButtons}>
              {tutorialStep > 0 && (
                <TouchableOpacity
                  style={styles.tutorialBackButton}
                  onPress={handlePrevStep}
                >
                  <Text style={styles.tutorialBackButtonText}>← Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.tutorialNextButton,
                  tutorialStep === 0 && styles.tutorialNextButtonFull,
                ]}
                onPress={handleNextStep}
              >
                <Text style={styles.tutorialNextButtonText}>
                  {tutorialStep === tutorialSteps.length - 1 ? 'Got It!' : 'Next →'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.tutorialCloseButton}
              onPress={() => {
                setShowTutorial(false);
                setTutorialStep(0);
              }}
            >
              <Text style={styles.tutorialCloseButtonText}>Close</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 32,
    lineHeight: 27,
  },
  proTipCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 24,
    borderRadius: 8,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  proTipBadge: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  proTipTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  proTipDescription: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 27,
  },
  flowDiagram: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  flowText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  tutorialButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  tutorialButtonText: {
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: '600',
  },
  useCasesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  useCaseCard: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  useCaseIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  useCaseContent: {
    flex: 1,
  },
  useCaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  useCaseDescription: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 24,
  },
  exampleBox: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  exampleText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 21,
  },
  tryButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 60,
  },
  tryButtonText: {
    color: COLORS.primaryText,
    fontSize: 20,
    fontWeight: '600',
  },
  tutorialOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tutorialModal: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxWidth: 500,
  },
  tutorialTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  tutorialProgress: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  tutorialContent: {
    marginBottom: 24,
  },
  tutorialStepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  tutorialStepDescription: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 20,
    lineHeight: 27,
  },
  tutorialVisual: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  tutorialVisualText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  tutorialResult: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
  },
  tutorialResultText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  tutorialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tutorialBackButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  tutorialBackButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  tutorialNextButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minHeight: 60,
  },
  tutorialNextButtonFull: {
    flex: 1,
  },
  tutorialNextButtonText: {
    color: COLORS.primaryText,
    fontSize: 18,
    fontWeight: '600',
  },
  tutorialCloseButton: {
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    minHeight: 60,
  },
  tutorialCloseButtonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
});
