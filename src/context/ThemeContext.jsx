// src/context/ThemeContext.jsx
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext();

/**
 * ThemeProvider
 * - Provides { theme, setTheme, toggleTheme }
 * - Persists to localStorage under key "theme"
 * - Applies "dark" class on <html> when theme === 'dark'
 */
export function ThemeProvider({ children, defaultTheme = 'dark' }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (e) {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
