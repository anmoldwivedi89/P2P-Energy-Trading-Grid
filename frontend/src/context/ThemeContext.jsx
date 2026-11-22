import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  themeMode: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('gridp2p_theme_mode') || 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;
      root.classList.add('theme-transitioning');
      if (body) body.classList.add('theme-transitioning');

      if (window.__themeTransitionTimeout) {
        clearTimeout(window.__themeTransitionTimeout);
      }
      window.__themeTransitionTimeout = setTimeout(() => {
        root.classList.remove('theme-transitioning');
        if (body) body.classList.remove('theme-transitioning');
      }, 450);
    }

    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'light-grid' : 'dark';
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('gridp2p_theme_mode', next);
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('gridp2p_theme_mode', themeMode);
    }
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const body = document.body;
      if (themeMode === 'light-grid') {
        root.classList.remove('dark');
        root.classList.add('light-grid');
        root.setAttribute('data-theme', 'light');
        if (body) {
          body.classList.remove('dark');
          body.classList.add('light-grid');
          body.setAttribute('data-theme', 'light');
        }
      } else {
        root.classList.add('dark');
        root.classList.remove('light-grid');
        root.setAttribute('data-theme', 'dark');
        if (body) {
          body.classList.add('dark');
          body.classList.remove('light-grid');
          body.setAttribute('data-theme', 'dark');
        }
      }
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
