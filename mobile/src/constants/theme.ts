import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#2A1658',
    background: '#F9F5FF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E9D5FF',
    textSecondary: '#6B5C8A',
    primary: '#8A2BE2',
    secondary: '#B79AE6',
    accent: '#4ECDC4',
    border: '#E9D5FF',
  },
  dark: {
    text: '#2A1658',
    background: '#F9F5FF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E9D5FF',
    textSecondary: '#6B5C8A',
    primary: '#8A2BE2',
    secondary: '#B79AE6',
    accent: '#4ECDC4',
    border: '#E9D5FF',
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