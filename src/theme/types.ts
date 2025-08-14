export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  messageBubble: {
    sent: string;
    received: string;
    sentText: string;
    receivedText: string;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
  fontWeight: {
    normal: '400' | 'normal';
    medium: '500' | 'medium';
    bold: '700' | 'bold';
  };
  lineHeight: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
}