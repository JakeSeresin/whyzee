'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  rainEnabled: boolean;
  toggleRain: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
  rainEnabled: false,
  toggleRain: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [rainEnabled, setRainEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('darkMode');
      const dark = stored === null ? true : JSON.parse(stored) as boolean;
      setIsDark(dark);
      if (!dark) document.documentElement.classList.add('light');
      else document.documentElement.classList.remove('light');

      const rain = localStorage.getItem('weatherEffects');
      if (rain !== null) setRainEnabled(JSON.parse(rain) as boolean);
    } catch { /* ignore */ }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(next));
        if (!next) document.documentElement.classList.add('light');
        else document.documentElement.classList.remove('light');
      }
      return next;
    });
  }, []);

  const toggleRain = useCallback(() => {
    setRainEnabled(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('weatherEffects', JSON.stringify(next));
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, rainEnabled, toggleRain }}>
      {children}
    </ThemeContext.Provider>
  );
}
