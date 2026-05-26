'use client';
import React from 'react';
import { FiMenu } from 'react-icons/fi';

interface StatusBarProps {
  onMenuToggle: () => void;
}

export default function StatusBar({ onMenuToggle }: StatusBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-7 bg-surface/95 backdrop-blur-sm border-t border-app-border flex items-center justify-between px-4 z-30">
      <div className="flex items-center gap-2">
        {/* Hamburger on mobile */}
        <button
          onClick={onMenuToggle}
          className="md:hidden text-text2 hover:text-text1 transition-colors mr-1"
          aria-label="Toggle menu"
        >
          <FiMenu size={14} />
        </button>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
        <span className="text-xs text-text2 font-mono tracking-wider">
          OFFLINE · ALL DATA LOCAL
        </span>
      </div>
      <span className="text-xs text-text2 font-mono hidden sm:block">
        100 CHEATS · 9 CHARACTERS · 9 GAMES | GTA CHEAT CODES v1.0
      </span>
    </div>
  );
}
