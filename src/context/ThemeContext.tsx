import React, { createContext, useState, useContext } from 'react';

type Theme = 'Light' | 'Dark';
type Background = 'Default' | 'Light Wood' | 'Dark Wood' | 'White Marble' | 'Black Marble';

interface ThemeContextProps {
  theme: Theme;
  background: Background;
  toggleTheme: () => void;
  setBackground: (bg: Background) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('Light');
  const [background, setBackground] = useState<Background>('Default');

  const toggleTheme = () => setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'));

  return (
    <ThemeContext.Provider value={{ theme, background, toggleTheme, setBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

