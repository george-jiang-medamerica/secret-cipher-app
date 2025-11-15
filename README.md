# 🔐 Secret Cipher App

A fun mobile app for creating and sharing secret messages with friends using custom ciphers!

## Features

✨ **MVP Features (Implemented)**
- ✅ Create simple substitution ciphers with custom names and icons
- ✅ Encrypt text messages with your ciphers
- ✅ Decrypt messages from friends
- ✅ Share ciphers via QR codes
- ✅ Scan QR codes to import ciphers
- ✅ Store multiple ciphers locally
- ✅ Fun emoji prefixes for encrypted messages
- ✅ Copy encrypted text to clipboard
- ✅ Auto-detect encrypted messages in clipboard

## Tech Stack

- **React Native** with **Expo**
- **React Navigation** for screen navigation
- **AsyncStorage** for local data persistence
- **expo-camera** for QR code scanning
- **react-native-qrcode-svg** for QR code generation
- **expo-clipboard** for clipboard operations
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)

### Installation

1. Navigate to the project directory:
   ```bash
   cd secret-cipher-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Scan the QR code with Expo Go app on your phone

### Running on Specific Platforms

```bash
# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## How to Use

1. **Create a Cipher**: Tap "NEW CIPHER" and give it a name and icon
2. **Encrypt Messages**: Select a cipher, type your message, and tap "ENCRYPT"
3. **Share the Cipher**: Tap the 📤 icon next to your cipher to generate a QR code
4. **Friend Scans QR**: Your friend scans the QR code to import your cipher
5. **Decrypt Messages**: Paste the encrypted message and tap "DECRYPT"

## Project Structure

```
secret-cipher-app/
├── src/
│   ├── screens/         # All app screens
│   │   ├── HomeScreen.tsx
│   │   ├── CreateCipherScreen.tsx
│   │   ├── EncryptScreen.tsx
│   │   ├── DecryptScreen.tsx
│   │   ├── ShareCipherScreen.tsx
│   │   └── ScanCipherScreen.tsx
│   ├── utils/           # Utility functions
│   │   ├── cipherUtils.ts    # Cipher encryption/decryption logic
│   │   └── storage.ts        # AsyncStorage helpers
│   └── types/           # TypeScript type definitions
│       └── index.ts
├── App.js              # Main app component with navigation
└── app.json           # Expo configuration
```

## Security Note

⚠️ **This app is for FUN only!** The ciphers used are simple substitution ciphers and are NOT cryptographically secure. Do not use this app for real secrets or sensitive information. It's designed as a playful toy for small groups of friends.

## Future Ideas

See `cipher-app-ideas.md` for potential future features:
- Themed cipher packs
- Visual cipher creation (swipe patterns, colors)
- Challenge mode (crack the cipher!)
- Cipher strength meter
- Photo encryption
- Disappearing messages

## Contributing

This is a personal project, but feel free to fork and modify for your own use!

## License

MIT License - Feel free to use this for learning and fun!
