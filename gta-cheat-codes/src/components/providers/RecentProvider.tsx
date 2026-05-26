'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getRecent, addRecent as addRecentStorage, clearRecent as clearRecentStorage } from '@/lib/storage';

interface RecentContextType {
  recent: string[];
  addRecent: (id: string) => void;
  clearRecent: () => void;
}

const RecentContext = createContext<RecentContextType>({
  recent: [],
  addRecent: () => {},
  clearRecent: () => {},
});

export function useRecent() {
  return useContext(RecentContext);
}

export function RecentProvider({ children }: { children: React.ReactNode }) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(getRecent());
  }, []);

  const addRecent = useCallback((id: string) => {
    addRecentStorage(id);
    setRecent(getRecent());
  }, []);

  const clearRecent = useCallback(() => {
    clearRecentStorage();
    setRecent([]);
  }, []);

  return (
    <RecentContext.Provider value={{ recent, addRecent, clearRecent }}>
      {children}
    </RecentContext.Provider>
  );
}
