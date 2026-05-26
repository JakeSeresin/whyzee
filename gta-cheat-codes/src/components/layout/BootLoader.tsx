'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> Initializing GTA Cheat Codes database...',
  '> Loading GTA III cheats... OK',
  '> Loading Vice City cheats... OK',
  '> Loading San Andreas cheats... OK',
  '> Loading GTA IV cheats... OK',
  '> Loading GTA V cheats... OK',
  '> Loading character profiles... OK',
  '> All 100 cheats ready. Enjoy!',
];

interface BootLoaderProps {
  onComplete: () => void;
}

export default function BootLoader({ onComplete }: BootLoaderProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    if (typeof window !== 'undefined' && sessionStorage.getItem('booted')) {
      onComplete();
      return;
    }
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(() => {
              if (typeof window !== 'undefined') sessionStorage.setItem('booted', '1');
              onComplete();
            }, 600);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 280);
    return () => clearInterval(interval);
  }, [onComplete]);

  const progress = Math.min((visibleLines / BOOT_LINES.length) * 100, 100);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="bootloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col justify-center px-8 md:px-16"
          style={{ background: '#09090e' }}
        >
          <button
            onClick={() => { setDone(true); onComplete(); }}
            className="absolute bottom-8 right-8 text-sm opacity-50 hover:opacity-100 font-mono text-text2 transition-opacity"
          >
            SKIP
          </button>

          <div className="max-w-2xl w-full">
            <div className="mb-8 space-y-2">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-sm text-green-400/80"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="w-full bg-white/5 rounded-full h-1 mb-6 overflow-hidden">
              <motion.div
                className="h-1 bg-accent rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>

            <AnimatePresence>
              {visibleLines >= BOOT_LINES.length && (
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-4xl text-accent"
                  style={{ textShadow: '0 0 40px rgba(255,107,0,0.5)' }}
                >
                  GTA CHEAT CODES
                </motion.h1>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
