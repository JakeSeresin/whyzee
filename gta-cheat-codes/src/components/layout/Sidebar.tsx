'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiGrid, FiList, FiUsers, FiStar, FiClock, FiSettings } from 'react-icons/fi';
import { games } from '@/data/games';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/', icon: FiGrid, label: 'All Games' },
  { href: '/cheats', icon: FiList, label: 'All Cheats' },
  { href: '/characters', icon: FiUsers, label: 'Characters' },
  { href: '/favorites', icon: FiStar, label: 'Favorites' },
  { href: '/recent', icon: FiClock, label: 'Recently Viewed' },
];

const [creditsOpen, setCreditsOpen] = [false, () => {}];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showCredits, setShowCredits] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-full w-64 bg-surface z-30 flex flex-col
          border-r border-app-border
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-4 border-b border-app-border">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center flex-shrink-0">
            <span className="font-display text-white text-sm">G</span>
          </div>
          <span className="font-display text-accent text-base tracking-wider leading-none">
            GTA CHEAT CODES
          </span>
        </div>

        {/* Nav */}
        <nav className="px-2 py-3 space-y-0.5">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-accent-dim text-accent'
                    : 'text-text2 hover:bg-app-border hover:text-text1'
                }`}
              >
                <Icon size={16} />
                <span className="font-body font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="border-t border-app-border mx-4 mt-1" />

        {/* Games list */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <p className="text-xs text-text3 uppercase tracking-wider font-mono px-2 pt-2 pb-2">
            Games
          </p>
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => { router.push(`/game/${game.id}`); onClose(); }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-app-border cursor-pointer transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: game.accentColor }}
              />
              <span className="text-sm font-body text-text2 flex-1 text-left truncate">{game.name}</span>
              {game.isComingSoon && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-600/20 text-red-400 font-mono">
                  SOON
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-app-border flex items-center justify-between">
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-2 text-sm transition-colors ${
              pathname === '/settings' ? 'text-accent' : 'text-text3 hover:text-text2'
            }`}
          >
            <FiSettings size={15} />
            <span className="font-body">Settings</span>
          </Link>
          <button
            onClick={() => setShowCredits(true)}
            className="text-xs text-text3 hover:text-accent transition-colors font-mono"
          >
            ◆ CREDITS
          </button>
        </div>
      </aside>
    </>
  );
}
