import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  primaryColor: string;
  secondaryColor: string;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('primaryColor') || '#3B82F6';
  });

  const [secondaryColor, setSecondaryColor] = useState(() => {
    return localStorage.getItem('secondaryColor') || '#10B981';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    document.documentElement.style.setProperty('--primary-color', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem('secondaryColor', secondaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [secondaryColor]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      primaryColor,
      secondaryColor,
      toggleTheme,
      setPrimaryColor,
      setSecondaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 