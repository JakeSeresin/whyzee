'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';

const TARGET = new Date('2026-11-19T00:00:00');

export default function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET);

  const boxes = [
    { value: days, label: 'DAYS' },
    { value: hours, label: 'HOURS' },
    { value: minutes, label: 'MINS' },
    { value: seconds, label: 'SECS' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {boxes.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-pink-900/30 border border-pink-500/20 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="font-display text-3xl md:text-4xl text-pink-400"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-pink-400/60 font-mono mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
