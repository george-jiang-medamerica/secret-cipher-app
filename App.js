import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CiphersScreen from './src/screens/CiphersScreen';
import CreateCipherScreen from './src/screens/CreateCipherScreen';
import EncodeScreen from './src/screens/EncodeScreen';
import DecodeScreen from './src/screens/DecodeScreen';
import ShareCipherScreen from './src/screens/ShareCipherScreen';
import ScanCipherScreen from './src/screens/ScanCipherScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CreativeUsesScreen from './src/screens/CreativeUsesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f0f4f8',
          },
          headerTintColor: '#3d4852',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
          headerBackTitleVisible: false,
          // Disable all animations for autism-friendly design
          animationEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ciphers"
          component={CiphersScreen}
          options={{ title: 'My Ciphers' }}
        />
        <Stack.Screen
          name="CreateCipher"
          component={CreateCipherScreen}
          options={{ title: 'Create Cipher' }}
        />
        <Stack.Screen
          name="Encode"
          component={EncodeScreen}
          options={{ title: 'Encode Message' }}
        />
        <Stack.Screen
          name="Decode"
          component={DecodeScreen}
          options={{ title: 'Decode Message' }}
        />
        <Stack.Screen
          name="ShareCipher"
          component={ShareCipherScreen}
          options={{ title: 'Share Cipher' }}
        />
        <Stack.Screen
          name="ScanCipher"
          component={ScanCipherScreen}
          options={{ title: 'Scan QR Code', headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="CreativeUses"
          component={CreativeUsesScreen}
          options={{ title: 'Creative Uses' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
