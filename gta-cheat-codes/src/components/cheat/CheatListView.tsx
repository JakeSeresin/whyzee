'use client';
import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { cheats as allCheats } from '@/data/cheats';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useRecent } from '@/components/providers/RecentProvider';
import { useToast } from '@/components/ui/Toast';
import { useDebounce } from '@/hooks/useDebounce';
import { useClipboard } from '@/hooks/useClipboard';
import CheatRow from '@/components/cheat/CheatRow';
import CheatDetailPanel from '@/components/cheat/CheatDetailPanel';
import CategoryPill from '@/components/cheat/CategoryPill';
import type { CheatCategory, CategoryInfo } from '@/types/cheat';

const CATEGORY_META: { category: CheatCategory | 'All'; label: string; icon: string }[] = [
  { category: 'All', label: 'All', icon: '◈' },
  { category: 'Player', label: 'Player', icon: '👤' },
  { category: 'Weapons', label: 'Weapons', icon: '🔫' },
  { category: 'Vehicles', label: 'Vehicles', icon: '🚗' },
  { category: 'World', label: 'World', icon: '🌍' },
  { category: 'Weather', label: 'Weather', icon: '⛈' },
  { category: 'Police', label: 'Police', icon: '🚔' },
  { category: 'Gameplay', label: 'Gameplay', icon: '🎮' },
  { category: 'Fun', label: 'Fun', icon: '🎉' },
];

interface CheatListViewProps {
  gameId?: string;
  headerContent?: React.ReactNode;
}

export default function CheatListView({ gameId, headerContent }: CheatListViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPlatform, setCurrentPlatform] = useState<'pc' | 'ps' | 'xbox'>('pc');
  const [activeCategory, setActiveCategory] = useState<CheatCategory | 'All'>('All');
  const [selectedCheatId, setSelectedCheatId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 250);
  const { favorites, toggleFavorite } = useFavorites();
  const { addRecent } = useRecent();
  const { showToast } = useToast();
  const { copy } = useClipboard();

  const sourcePool = useMemo(
    () => (gameId ? allCheats.filter(c => c.gameId === gameId) : allCheats),
    [gameId]
  );

  const categories: CategoryInfo[] = useMemo(() => {
    return CATEGORY_META.map(m => ({
      ...m,
      count:
        m.category === 'All'
          ? sourcePool.length
          : sourcePool.filter(c => c.category === m.category).length,
    }));
  }, [sourcePool]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return sourcePool.filter(cheat => {
      if (activeCategory !== 'All' && cheat.category !== activeCategory) return false;
      if (q && !cheat.name.toLowerCase().includes(q) && !cheat.effect.toLowerCase().includes(q) && !cheat.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sourcePool, activeCategory, debouncedSearch]);

  const selectedCheat = useMemo(
    () => filtered.find(c => c.id === selectedCheatId) ?? allCheats.find(c => c.id === selectedCheatId) ?? null,
    [selectedCheatId, filtered]
  );

  const handleSelect = (id: string) => {
    setSelectedCheatId(id);
    addRecent(id);
  };

  const handleCopy = async (text: string) => {
    await copy(text);
    showToast('✓ COPIED!');
  };

  return (
    <div className="flex flex-col h-full">
      {headerContent}

      {/* Sticky toolbar */}
      <div className="sticky top-0 z-20 bg-app-bg/95 backdrop-blur border-b border-app-border px-6 py-3 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search 100 cheats..."
              className="w-full bg-surface rounded-lg pl-9 pr-4 py-2 text-sm text-text1 placeholder:text-text3 border border-app-border focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          {/* Platform toggle */}
          <div className="flex bg-surface rounded-lg border border-app-border overflow-hidden flex-shrink-0">
            {(['pc', 'ps', 'xbox'] as const).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPlatform(p)}
                className={`px-3 py-2 text-xs font-mono transition-colors ${
                  currentPlatform === p
                    ? 'bg-accent text-white'
                    : 'text-text2 hover:text-text1'
                }`}
              >
                {p === 'pc' ? 'PC' : p === 'ps' ? 'PS' : 'XB'}
              </button>
            ))}
          </div>
        </div>

        {/* Category pills row */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.filter(c => c.count > 0 || c.category === 'All').map(cat => (
            <CategoryPill
              key={cat.category}
              category={cat}
              isActive={activeCategory === cat.category}
              onClick={() => setActiveCategory(cat.category)}
            />
          ))}
        </div>

        <p className="text-xs text-text2">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Cheat list */}
      <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
        {filtered.map(cheat => (
          <CheatRow
            key={cheat.id}
            cheat={cheat}
            onSelect={handleSelect}
            onToggleFavorite={toggleFavorite}
            onCopy={handleCopy}
            isSelected={selectedCheatId === cheat.id}
            isFavorite={favorites.has(cheat.id)}
            currentPlatform={currentPlatform}
          />
        ))}
        {filtered.length === 0 && (
          <div className="py-16 text-center text-text3 font-mono text-sm">
            No cheats found
          </div>
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
