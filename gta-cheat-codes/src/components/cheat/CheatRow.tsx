'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiCopy } from 'react-icons/fi';
import type { Cheat } from '@/types/cheat';
import CodeChip from './CodeChip';

interface CheatRowProps {
  cheat: Cheat;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string) => void;
  isSelected: boolean;
  isFavorite: boolean;
  currentPlatform: 'pc' | 'ps' | 'xbox';
}

function getPlatformCode(cheat: Cheat, platform: string): string {
  if (platform === 'pc') return cheat.pcCode;
  if (platform === 'ps') return cheat.playstationCode;
  return cheat.xboxCode;
}

export default function CheatRow({
  cheat,
  onSelect,
  onToggleFavorite,
  onCopy,
  isSelected,
  isFavorite,
  currentPlatform,
}: CheatRowProps) {
  return (
    <motion.div
      onClick={() => onSelect(cheat.id)}
      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer gap-3 transition-colors ${
        isSelected
          ? 'bg-accent-dim border-l-2 border-accent'
          : 'hover:bg-surface2'
      }`}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-semibold font-body text-text1 truncate text-sm">{cheat.name}</p>
        <p className="text-xs text-text2 truncate">{cheat.effect}</p>
      </div>

      <div className="hidden sm:block flex-shrink-0">
        <CodeChip code={getPlatformCode(cheat, currentPlatform)} />
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={e => { e.stopPropagation(); onToggleFavorite(cheat.id); }}
          className="p-1.5 rounded hover:bg-app-border transition-colors"
          aria-label="Toggle favorite"
        >
          <FiStar
            size={14}
            fill={isFavorite ? '#ff6b00' : 'none'}
            color={isFavorite ? '#ff6b00' : 'currentColor'}
            className={isFavorite ? '' : 'text-text3'}
          />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={e => { e.stopPropagation(); onCopy(getPlatformCode(cheat, currentPlatform)); }}
          className="p-1.5 rounded hover:bg-app-border transition-colors text-text3 hover:text-text2"
          aria-label="Copy code"
        >
          <FiCopy size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
}
