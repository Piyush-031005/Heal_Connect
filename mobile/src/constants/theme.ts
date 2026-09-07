import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#ffffff',
    background: '#1A0B2E',
    backgroundElement: '#2D1B4E',
    backgroundSelected: '#4A2A85',
    textSecondary: '#D5B6DC',
    primary: '#FAD058',
    secondary: '#B79AE6',
    accent: '#4ECDC4',
    border: '#3F226A',
  },
  dark: {
    text: '#ffffff',
    background: '#1A0B2E',
    backgroundElement: '#2D1B4E',
    backgroundSelected: '#4A2A85',
    textSecondary: '#D5B6DC',
    primary: '#FAD058',
    secondary: '#B79AE6',
    accent: '#4ECDC4',
    border: '#3F226A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;