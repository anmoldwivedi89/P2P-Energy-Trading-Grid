import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  themeMode: 'dark',
  toggleTheme: () => {},
  syncThemeToMode: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('gridp2p_theme_mode') || 'dark';
    }
    return 'dark';
  });

  const applyThemeToDom = (mode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    const isDark = mode === 'dark';
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light-grid');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.classList.remove('light-grid');
        body.setAttribute('data-theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      root.classList.add('light-grid');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.classList.add('light-grid');
        body.setAttribute('data-theme', 'light');
      }
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('gridp2p_theme_mode', mode);
      try {
        localStorage.theme = isDark ? 'dark' : 'light';
      } catch (e) {}
    }
  };

  const syncThemeToMode = (mode) => {
    applyThemeToDom(mode);
    setThemeMode(mode);
  };

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light-grid' : 'dark';
    syncThemeToMode(next);
  };

  useEffect(() => {
    applyThemeToDom(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, syncThemeToMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeProvider;
