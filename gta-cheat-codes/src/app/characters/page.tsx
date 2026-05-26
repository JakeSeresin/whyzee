'use client';
import React, { useState, useMemo } from 'react';
import { FiSearch } from 'react-icons/fi';
import { characters } from '@/data/characters';
import { games } from '@/data/games';
import { useDebounce } from '@/hooks/useDebounce';
import CharacterCard from '@/components/character/CharacterCard';
import CharacterDetailModal from '@/components/character/CharacterDetailModal';
import type { Character } from '@/types/character';

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGameId, setSelectedGameId] = useState<string>('all');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 250);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return characters.filter(char => {
      if (selectedGameId !== 'all' && char.gameId !== selectedGameId) return false;
      if (q && !char.name.toLowerCase().includes(q) && !char.gameLabel.toLowerCase().includes(q) && !char.role.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [debouncedSearch, selectedGameId]);

  return (
    <div>
      <div className="px-6 pt-6 pb-4">
        <h1 className="font-display text-4xl text-text1 mb-4">CHARACTERS</h1>

        {/* Toolbar */}
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search characters..."
              className="w-full bg-surface rounded-lg pl-9 pr-4 py-2 text-sm text-text1 placeholder:text-text3 border border-app-border focus:outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <select
            value={selectedGameId}
            onChange={e => setSelectedGameId(e.target.value)}
            className="bg-surface text-text1 text-sm px-3 py-2 rounded-lg border border-app-border focus:outline-none focus:border-accent/50"
          >
            <option value="all">All Games</option>
            {games.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        {filtered.map(char => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => setSelectedCharacter(char)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-text3 font-mono text-sm">
            No characters found
          </div>
        )}
      </div>

      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}
