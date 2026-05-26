'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="credits-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="credits-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="max-w-md w-full bg-surface rounded-2xl overflow-hidden relative"
          >
            {/* Top gradient bar */}
            <div className="h-1 gradient-orange-pink-cyan" />

            <div className="p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded hover:bg-app-border text-text2 transition-colors"
              >
                <FiX size={16} />
              </button>

              <h2 className="font-display text-3xl mb-4 text-text1">CREDITS</h2>
              <p className="text-xs font-mono text-text3 uppercase tracking-widest">DEVELOPED BY</p>
              <h3 className="font-display text-2xl mt-1 text-text1">Yassine Zahir</h3>
              <p className="text-accent text-sm mt-2">Fan-made GTA companion app</p>

              <div className="flex gap-3 mt-6">
                <a
                  href="https://instagram.com/yaszaher_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-[#e1306c]/10 border border-[#e1306c]/30 text-[#e1306c] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#e1306c]/20 transition-colors"
                >
                  <span>📸</span> Instagram
                </a>
                <a
                  href="https://x.com/itswhyzee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <span>𝕏</span> Twitter/X
                </a>
              </div>

              <p className="text-xs text-text3 mt-6 leading-relaxed">
                Not affiliated with Rockstar Games or Take-Two Interactive. All GTA content © Rockstar Games.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
