'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { Character } from '@/types/character';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

export default function CharacterDetailModal({ character, onClose }: CharacterDetailModalProps) {
  const statusColor =
    character?.status === 'Alive'
      ? 'bg-green-600/20 text-green-400'
      : character?.status === 'Deceased'
        ? 'bg-red-600/20 text-red-400'
        : 'bg-gray-600/20 text-gray-400';

  return (
    <AnimatePresence>
      {character && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            key="modal-content"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="max-w-2xl w-full bg-surface rounded-2xl p-8 max-h-[85vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded hover:bg-app-border text-text2 transition-colors"
            >
              <FiX size={18} />
            </button>

            {/* Avatar + name */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${character.accentColor}22` }}
              >
                <span className="font-display text-3xl" style={{ color: character.accentColor }}>
                  {character.initials}
                </span>
              </div>
              <div>
                <h2 className="font-display text-3xl text-text1">{character.name}</h2>
                <p className="text-text2 text-sm">{character.alias}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs mt-1 inline-block ${statusColor}`}>
                  {character.status}
                </span>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-2 border-accent pl-4 my-4 italic text-text2 text-sm">
              "{character.quote}"
            </blockquote>

            {/* Bio */}
            <p className="text-text2 leading-relaxed mb-6 text-sm">{character.bio}</p>

            {/* Skills + Affiliations */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-xs font-mono text-text3 uppercase tracking-wider mb-2">SKILLS</h4>
                <ul className="list-disc pl-4 text-sm text-text2 space-y-1">
                  {character.skills.map(s => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-mono text-text3 uppercase tracking-wider mb-2">AFFILIATIONS</h4>
                <ul className="list-disc pl-4 text-sm text-text2 space-y-1">
                  {character.affiliations.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: 'Role', value: character.role },
                { label: 'Gang', value: character.gang },
                { label: 'Vehicle', value: character.vehicle },
                { label: 'Game', value: character.gameLabel },
              ].map(({ label, value }) => (
                <span
                  key={label}
                  className="rounded-full px-3 py-1 text-xs bg-surface2 text-text2 border border-app-border"
                >
                  <span className="text-text3">{label}:</span> {value}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
