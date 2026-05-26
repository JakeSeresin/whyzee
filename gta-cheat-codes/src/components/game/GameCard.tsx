'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => router.push(`/game/${game.id}`)}
      className="rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${game.gradientStart}, ${game.gradientEnd})`,
        minHeight: '160px',
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 20px rgba(255,107,0,0.15)',
      }}
      transition={{ duration: 0.18 }}
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: game.accentColor }} />

      <div className="p-5 flex flex-col flex-1">
        <h2
          className="font-display text-2xl leading-none"
          style={{ color: game.accentColor }}
        >
          {game.name}
        </h2>
        <p className="font-mono text-xs text-text2/60 uppercase tracking-wide mt-1">
          {game.city}
        </p>

        <div className="flex-1" />

        <div className="flex justify-between items-center mt-4">
          <span className="font-mono text-xs text-text2">
            {game.isComingSoon ? '0 CODES' : `${game.cheatCount} CODES`}
          </span>
          {game.isComingSoon ? (
            <span className="px-2 py-0.5 rounded-full bg-pink-600/20 text-pink-400 text-xs font-mono">
              UPCOMING
            </span>
          ) : (
            <span className="text-accent text-lg">→</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
