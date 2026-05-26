'use client';
import React from 'react';
import GameCard from '@/components/game/GameCard';
import { games } from '@/data/games';

export default function HomePage() {
  return (
    <div className="px-6 pt-6 pb-6">
      <h1 className="font-display text-4xl text-text1 mb-6">ALL GAMES</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
