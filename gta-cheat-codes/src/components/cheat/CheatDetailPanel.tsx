'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiCopy, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { Cheat } from '@/types/cheat';
import { games } from '@/data/games';

interface CheatDetailPanelProps {
  cheat: Cheat | null;
  onClose: () => void;
  currentPlatform: 'pc' | 'ps' | 'xbox';
  onChangePlatform: (p: 'pc' | 'ps' | 'xbox') => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string) => void;
}

const PLATFORMS: { key: 'pc' | 'ps' | 'xbox'; label: string }[] = [
  { key: 'pc', label: 'PC' },
  { key: 'ps', label: 'PlayStation' },
  { key: 'xbox', label: 'Xbox' },
];

function getCode(cheat: Cheat, platform: 'pc' | 'ps' | 'xbox'): string {
  if (platform === 'pc') return cheat.pcCode;
  if (platform === 'ps') return cheat.playstationCode;
  return cheat.xboxCode;
}

export default function CheatDetailPanel({
  cheat,
  onClose,
  currentPlatform,
  onChangePlatform,
  isFavorite,
  onToggleFavorite,
  onCopy,
}: CheatDetailPanelProps) {
  const [allPlatformsOpen, setAllPlatformsOpen] = useState(false);

  const game = cheat ? games.find(g => g.id === cheat.gameId) : null;
  const code = cheat ? getCode(cheat, currentPlatform) : '';

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {cheat && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {cheat && (
          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-surface shadow-2xl z-40 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-app-border relative">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => onToggleFavorite(cheat.id)}
                  className="p-1.5 rounded hover:bg-app-border transition-colors"
                >
                  <FiStar
                    size={16}
                    fill={isFavorite ? '#ff6b00' : 'none'}
                    color={isFavorite ? '#ff6b00' : 'currentColor'}
                  />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded hover:bg-app-border transition-colors text-text2"
                >
                  <FiX size={16} />
                </button>
              </div>
              <p
                className="text-xs font-mono uppercase tracking-wider mb-1"
                style={{ color: game?.accentColor ?? '#ff6b00' }}
              >
                {game?.name ?? ''}
              </p>
              <h2 className="font-display text-2xl text-text1 pr-16">{cheat.name}</h2>
              <p className="text-text2 text-sm mt-0.5">{cheat.effect}</p>
            </div>

            {/* Platform tabs */}
            <div className="flex border-b border-app-border">
              {PLATFORMS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onChangePlatform(key)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    currentPlatform === key
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-text3 hover:text-text2'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Code display */}
            <div className="p-4">
              <div className="bg-surface2 rounded-lg p-4">
                <p className="font-mono text-lg text-center break-all text-text1 leading-relaxed">
                  {code}
                </p>
              </div>
              <button
                onClick={() => onCopy(code)}
                className="w-full mt-3 py-2.5 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <FiCopy size={14} />
                COPY CODE
              </button>
            </div>

            {/* All platforms accordion */}
            <div className="px-4 mb-2">
              <button
                onClick={() => setAllPlatformsOpen(p => !p)}
                className="w-full flex items-center justify-between py-2 text-sm text-text2 hover:text-text1 transition-colors"
              >
                <span className="font-mono text-xs uppercase tracking-wider">All Platforms</span>
                {allPlatformsOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
              </button>
              <AnimatePresence>
                {allPlatformsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pb-2">
                      {PLATFORMS.map(({ key, label }) => {
                        const c = getCode(cheat, key);
                        return (
                          <div key={key} className="bg-surface2 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-mono text-text3 uppercase">{label}</span>
                              <button
                                onClick={() => onCopy(c)}
                                className="p-1 rounded hover:bg-app-border text-text3 hover:text-text2 transition-colors"
                              >
                                <FiCopy size={12} />
                              </button>
                            </div>
                            <p className="font-mono text-sm text-text1 break-all">{c}</p>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="px-4 pb-4">
              <p className="text-sm text-text2 leading-relaxed">{cheat.description}</p>
            </div>

            {/* Warning */}
            {cheat.hasAchievementWarning && (
              <div className="mx-4 mb-4 p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
                <p className="text-red-400 text-sm">⚠ DISABLES ACHIEVEMENTS</p>
              </div>
            )}

            <div className="flex-1" />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
