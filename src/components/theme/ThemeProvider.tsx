import React, { createContext, useMemo } from 'react';
import { Theme, ThemeProviderProps } from './types';
import { defaultTheme } from './defaultTheme';

export const ThemeContext = createContext<Theme>(defaultTheme);

const mergeTheme = (base: Theme, override: Partial<Theme>): Theme => {
  return {
    colors: { ...base.colors, ...override.colors },
    spacing: { ...base.spacing, ...override.spacing },
    borderRadius: { ...base.borderRadius, ...override.borderRadius },
    typography: { ...base.typography, ...override.typography },
  };
};

export const ThemeProvider = ({ children, theme: customTheme }: ThemeProviderProps) => {
  const mergedTheme = useMemo(() => {
    if (!customTheme) return defaultTheme;
    return mergeTheme(defaultTheme, customTheme);
  }, [customTheme]);

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
};
