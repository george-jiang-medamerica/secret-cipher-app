import { useAppSettings } from '../contexts/AppSettingsContext';
import { CALM_COLORS, PLAYFUL_COLORS } from '../constants/colors';

export function useThemeColors() {
  const { uiMode } = useAppSettings();
  return uiMode === 'calm' ? CALM_COLORS : PLAYFUL_COLORS;
}
