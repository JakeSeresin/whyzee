'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { games } from '@/data/games';
import CheatListView from '@/components/cheat/CheatListView';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';

  const game = games.find(g => g.id === id);

  if (!game) {
    if (typeof window !== 'undefined') router.replace('/');
    return null;
  }

  // GTA VI special view
  if (game.id === 'gta6' && game.isComingSoon) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-full text-center px-6 py-12"
        style={{ background: 'linear-gradient(135deg, #0a0010, #180028)' }}
      >
        <p className="font-mono text-sm text-pink-400/60 tracking-widest uppercase">
          Rockstar Games · Nov 19, 2026
        </p>
        <h1
          className="font-display text-shadow-glow mt-4 text-pink-600"
          style={{ fontSize: 'clamp(4rem, 12vw, 8rem)', lineHeight: 1 }}
        >
          GTA VI
        </h1>
        <p className="font-mono text-lg text-pink-400/80 tracking-wider uppercase mt-2">
          Leonida State · Coming Soon
        </p>

        <div className="mt-8">
          <CountdownTimer />
        </div>

        <div className="bg-pink-900/10 border border-pink-500/10 rounded-2xl p-6 max-w-md mt-8 text-left space-y-2 text-text2 text-sm">
          <p>🌴 Leonida State setting</p>
          <p>👩 First female protagonist: Lucia Caminos</p>
          <p>👨 Male co-protagonist: Jason Duval</p>
          <p>🗺 Largest open world in GTA history</p>
        </div>

        <p className="font-mono text-xs text-text3 mt-8">
          CHEAT CODES WILL BE ADDED ON RELEASE
        </p>

        <Link
          href="/"
          className="text-accent text-sm mt-6 hover:underline font-mono"
        >
          ← BACK TO ALL GAMES
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <CheatListView
        gameId={game.id}
        headerContent={
          <div className="px-6 pt-6 pb-4">
            <button
              onClick={() => router.back()}
              className="text-xs font-mono text-text3 hover:text-text2 mb-3 transition-colors"
            >
              ← BACK
            </button>
            <h1 className="font-display text-3xl text-text1">{game.name}</h1>
            <p className="font-mono text-text2 text-sm mt-0.5">{game.city}</p>
            <div className="h-1 mt-2 rounded-full" style={{ backgroundColor: game.accentColor, maxWidth: '80px' }} />
          </div>
        }
      />
    </div>
  );
}
