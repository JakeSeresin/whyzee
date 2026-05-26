'use client';
import React from 'react';
import { motion } from 'framer-motion';
import type { Character } from '@/types/character';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const statusColor =
    character.status === 'Alive'
      ? 'bg-green-600/20 text-green-400'
      : character.status === 'Deceased'
        ? 'bg-red-600/20 text-red-400'
        : 'bg-gray-600/20 text-gray-400';

  return (
    <motion.div
      onClick={onClick}
      className="rounded-xl bg-surface2 p-5 border-l-4 cursor-pointer"
      style={{ borderColor: character.accentColor }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${character.accentColor}22` }}
        >
          <span className="font-display text-lg" style={{ color: character.accentColor }}>
            {character.initials}
          </span>
        </div>
        <span className="font-mono text-xs" style={{ color: character.accentColor }}>
          {character.gameLabel}
        </span>
      </div>

      <h3 className="font-display text-xl mt-2 text-text1">{character.name}</h3>

      <div className="flex gap-2 mt-1 flex-wrap">
        <span className="rounded-full px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400">
          {character.role}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs ${statusColor}`}>
          {character.status}
        </span>
      </div>

      <p className="text-sm text-text2 mt-2 line-clamp-2">{character.bio}</p>
      <p className="italic text-text2/70 text-sm mt-1 truncate">"{character.quote}"</p>
    </motion.div>
  );
}
