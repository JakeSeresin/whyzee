'use client';
import React from 'react';
import { motion } from 'framer-motion';
import type { CategoryInfo } from '@/types/cheat';

interface CategoryPillProps {
  category: CategoryInfo;
  isActive: boolean;
  onClick: () => void;
}

export default function CategoryPill({ category, isActive, onClick }: CategoryPillProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
        isActive
          ? 'bg-accent text-white'
          : 'bg-surface2 text-text2 hover:bg-app-border'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <span>{category.icon}</span>
      <span>{category.label}</span>
      <span className={`text-xs ${isActive ? 'text-white/70' : 'text-text3'}`}>
        ({category.count})
      </span>
    </motion.button>
  );
}
