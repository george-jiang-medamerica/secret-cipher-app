// Calm Mode - Neurodivergent-friendly color palette
// Based on research: soft blues, low saturation, avoiding pure white/black
// Designed to be calming and reduce sensory overload

export const CALM_COLORS = {
  // Backgrounds
  background: '#f0f4f8',        // Very pale blue-gray
  cardBackground: '#ffffff',     // White for cards with shadows

  // Primary actions (all buttons use same color for consistency)
  primary: '#8db3d4',           // Soft blue
  primaryText: '#3d4852',       // Dark gray text on primary buttons

  // Text
  textPrimary: '#3d4852',       // Main text
  textSecondary: '#6b7280',     // Secondary text
  textTertiary: '#9ca3af',      // Disabled/hints

  // Borders & dividers
  border: '#d1dce5',            // Soft blue-gray

  // Input fields
  inputBackground: '#ffffff',   // White background for inputs
  inputBorder: '#d1dce5',       // Same as border
  inputBorderFocused: '#8db3d4', // Primary color when focused
  inputPlaceholder: '#9ca3af',  // Same as textTertiary

  // States
  success: '#9db89d',           // Soft green (not bright green)
  successText: '#3d4852',       // Dark gray on success
  error: '#d4a5a5',             // Soft rose (not bright red)
  errorText: '#8b4545',         // Darker rose for error text
  warning: '#d4c49d',           // Soft gold (not yellow)
  warningText: '#6b5a3d',       // Darker gold for warning text

  // Special
  qrCodeColor: '#6b8ba8',       // Medium blue for QR codes
  shadowColor: '#000000',       // Black for shadows (with low opacity)

  // Interactive states (for future use)
  primaryHover: '#7ba3c4',      // Slightly darker blue for hover
  primaryDisabled: '#c5d7e5',   // Very light blue for disabled
};

// Playful Mode - Fun and colorful palette
// Goofy, breaks design rules, entertainment-focused

export const PLAYFUL_COLORS = {
  // Backgrounds
  background: '#1a1a2e',        // Dark navy
  cardBackground: '#16213e',     // Darker blue cards

  // Primary actions (vibrant and fun!)
  primary: '#e94560',           // Bright pink/red
  primaryText: '#ffffff',       // Pure white

  // Text
  textPrimary: '#ffffff',       // White text
  textSecondary: '#aaa',        // Light gray
  textTertiary: '#888',         // Medium gray

  // Borders & dividers
  border: '#0f3460',            // Dark blue

  // Input fields
  inputBackground: '#16213e',   // Dark blue
  inputBorder: '#0f3460',       // Dark blue
  inputBorderFocused: '#e94560', // Bright pink when focused
  inputPlaceholder: '#888',     // Medium gray

  // States
  success: '#4ade80',           // Bright green
  successText: '#ffffff',       // White
  error: '#f87171',             // Bright red
  errorText: '#ffffff',         // White
  warning: '#fbbf24',           // Bright yellow
  warningText: '#1a1a2e',       // Dark text on yellow

  // Special
  qrCodeColor: '#e94560',       // Pink QR codes!
  shadowColor: '#000000',       // Black for shadows

  // Interactive states
  primaryHover: '#d43551',      // Darker pink
  primaryDisabled: '#6b2737',   // Muted pink
};

// Default export based on mode (will be dynamically selected)
export const COLORS = CALM_COLORS;

export default COLORS;
