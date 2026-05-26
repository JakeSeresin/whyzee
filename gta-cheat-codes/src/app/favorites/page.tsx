'use client';
import React, { useState, useMemo } from 'react';
import { FiStar } from 'react-icons/fi';
import { cheats as allCheats } from '@/data/cheats';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useRecent } from '@/components/providers/RecentProvider';
import { useToast } from '@/components/ui/Toast';
import { useClipboard } from '@/hooks/useClipboard';
import CheatRow from '@/components/cheat/CheatRow';
import CheatDetailPanel from '@/components/cheat/CheatDetailPanel';
import EmptyState from '@/components/ui/EmptyState';

export default function FavoritesPage() {
  const [selectedCheatId, setSelectedCheatId] = useState<string | null>(null);
  const [currentPlatform, setCurrentPlatform] = useState<'pc' | 'ps' | 'xbox'>('pc');
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { addRecent } = useRecent();
  const { showToast } = useToast();
  const { copy } = useClipboard();

  const favoriteCheats = useMemo(
    () => allCheats.filter(c => favorites.has(c.id)),
    [favorites]
  );

  const selectedCheat = useMemo(
    () => favoriteCheats.find(c => c.id === selectedCheatId) ?? null,
    [selectedCheatId, favoriteCheats]
  );

  const handleCopy = async (text: string) => {
    await copy(text);
    showToast('✓ COPIED!');
  };

  const handleSelect = (id: string) => {
    setSelectedCheatId(id);
    addRecent(id);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl text-text1">FAVORITES</h1>
          <span className="rounded-full px-2 py-0.5 text-xs bg-accent/20 text-accent font-mono">
            {favoriteCheats.length}
          </span>
        </div>
        {favoriteCheats.length > 0 && (
          <button
            onClick={() => { clearFavorites(); setSelectedCheatId(null); }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors font-body"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
        {favoriteCheats.length === 0 ? (
          <EmptyState
            icon={FiStar}
            title="NO FAVORITES YET"
            subtitle="Tap the star on any cheat to save it here."
          />
        ) : (
          favoriteCheats.map(cheat => (
            <CheatRow
              key={cheat.id}
              cheat={cheat}
              onSelect={handleSelect}
              onToggleFavorite={toggleFavorite}
              onCopy={handleCopy}
              isSelected={selectedCheatId === cheat.id}
              isFavorite={true}
              currentPlatform={currentPlatform}
            />
          ))
        )}
      </div>

      <CheatDetailPanel
        cheat={selectedCheat}
        onClose={() => setSelectedCheatId(null)}
        currentPlatform={currentPlatform}
        onChangePlatform={setCurrentPlatform}
        isFavorite={selectedCheat ? favorites.has(selectedCheat.id) : false}
        onToggleFavorite={toggleFavorite}
        onCopy={handleCopy}
      />
    </div>
  );
}
