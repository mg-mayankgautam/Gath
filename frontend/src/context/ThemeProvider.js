import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Client-side only
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        setDarkMode(savedMode === 'true');
      } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(systemPrefersDark);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', darkMode);
    }
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('darkMode')) {
        setDarkMode(mediaQuery.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);