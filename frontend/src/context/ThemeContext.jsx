import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  themeMode: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('gridp2p_theme_mode') || 'dark';
  });

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'light-grid' : 'dark';
      localStorage.setItem('gridp2p_theme_mode', next);
      return next;
    });
  };

  useEffect(() => {
    localStorage.setItem('gridp2p_theme_mode', themeMode);
    if (themeMode === 'light-grid') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light-grid');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light-grid');
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
