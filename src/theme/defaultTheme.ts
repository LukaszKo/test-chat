import { Theme } from './types';

export const defaultTheme: Theme = {
  colors: {
    primary: '#25D366',
    secondary: '#34B7F1',
    background: '#FFFFFF',
    surface: '#F7F8FA',
    text: '#000000',
    textSecondary: '#667781',
    border: '#E4E6EA',
    success: '#25D366',
    error: '#F02849',
    warning: '#FFAB00',
    messageBubble: {
      sent: '#DCF8C6',
      received: '#FFFFFF',
      sentText: '#000000',
      receivedText: '#000000',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontFamily: 'System',
    fontSize: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 18,
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      small: 16,
      medium: 20,
      large: 24,
    },
  },
};