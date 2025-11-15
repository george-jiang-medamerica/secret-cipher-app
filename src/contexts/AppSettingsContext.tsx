import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UIMode = 'calm' | 'playful';

interface AppSettings {
  uiMode: UIMode;
  setUIMode: (mode: UIMode) => void;
}

const AppSettingsContext = createContext<AppSettings | undefined>(undefined);

const SETTINGS_KEY = '@app_settings';

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const [uiMode, setUIModeState] = useState<UIMode>('calm');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem(SETTINGS_KEY);
      if (saved) {
        const settings = JSON.parse(saved);
        setUIModeState(settings.uiMode || 'calm');
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const setUIMode = async (mode: UIMode) => {
    try {
      setUIModeState(mode);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify({ uiMode: mode }));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  return (
    <AppSettingsContext.Provider value={{ uiMode, setUIMode }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within AppSettingsProvider');
  }
  return context;
}
