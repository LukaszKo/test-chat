import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { Theme } from './types';

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return theme;
};