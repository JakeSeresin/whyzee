'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getFavorites, setFavorites as saveFavorites, clearFavorites as clearFavStorage } from '@/lib/storage';

interface FavoritesContextType {
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: new Set(),
  toggleFavorite: () => {},
  clearFavorites: () => {},
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ids = getFavorites();
    setFavorites(new Set(ids));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveFavorites(Array.from(next));
      return next;
    });
  }, []);

  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    clearFavStorage();
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}
