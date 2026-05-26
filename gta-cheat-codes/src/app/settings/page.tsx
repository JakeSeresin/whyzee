'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useFavorites } from '@/components/providers/FavoritesProvider';
import { useRecent } from '@/components/providers/RecentProvider';
import { useToast } from '@/components/ui/Toast';
import { cheats } from '@/data/cheats';
import { games } from '@/data/games';
import { exportToTextFile } from '@/lib/export';
import { getSetting, setSetting } from '@/lib/storage';
import CreditsModal from '@/components/ui/CreditsModal';

function ToggleSwitch({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-10 h-5 rounded-full transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${checked ? 'bg-accent' : 'bg-app-border'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { isDark, toggleTheme, rainEnabled, toggleRain } = useTheme();
  const { favorites, clearFavorites } = useFavorites();
  const { recent, clearRecent } = useRecent();
  const { showToast } = useToast();
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [defaultPlatform, setDefaultPlatform] = useState<'pc' | 'ps' | 'xbox'>('pc');
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    setDefaultPlatform(getSetting<'pc' | 'ps' | 'xbox'>('defaultPlatform', 'pc'));
    setFontSize(getSetting<number>('fontSize', 16));
  }, []);

  const handlePlatformChange = (p: 'pc' | 'ps' | 'xbox') => {
    setDefaultPlatform(p);
    setSetting('defaultPlatform', p);
  };

  const handleFontSize = (val: number) => {
    setFontSize(val);
    setSetting('fontSize', val);
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--font-size', `${val}px`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="font-display text-4xl text-text1">SETTINGS</h1>

      {/* Appearance Card */}
      <div className="bg-surface rounded-xl p-5 space-y-4 border border-app-border">
        <h2 className="font-mono text-xs text-text3 uppercase tracking-wider">Appearance & Behavior</h2>

        {/* Dark mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text1 font-body font-medium text-sm">Dark Mode</p>
            <p className="text-text3 text-xs mt-0.5">Toggle light/dark theme</p>
          </div>
          <ToggleSwitch checked={isDark} onChange={toggleTheme} />
        </div>

        {/* Rain */}
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-body font-medium text-sm ${!isDark ? 'text-text3' : 'text-text1'}`}>
              Rain & Lightning
            </p>
            <p className="text-text3 text-xs mt-0.5">Atmospheric rain effect (dark mode only)</p>
          </div>
          <ToggleSwitch checked={rainEnabled} onChange={toggleRain} disabled={!isDark} />
        </div>

        {/* Default Platform */}
        <div>
          <p className="text-text1 font-body font-medium text-sm mb-2">Default Platform</p>
          <div className="flex bg-surface2 rounded-lg border border-app-border overflow-hidden">
            {(['pc', 'ps', 'xbox'] as const).map(p => (
              <button
                key={p}
                onClick={() => handlePlatformChange(p)}
                className={`flex-1 py-2 text-xs font-mono transition-colors ${
                  defaultPlatform === p ? 'bg-accent text-white' : 'text-text2 hover:text-text1'
                }`}
              >
                {p === 'pc' ? 'PC' : p === 'ps' ? 'PlayStation' : 'Xbox'}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-text1 font-body font-medium text-sm">Font Size</p>
            <span className="text-xs font-mono text-accent">{fontSize}px</span>
          </div>
          <input
            type="range"
            min={12}
            max={18}
            step={1}
            value={fontSize}
            onChange={e => handleFontSize(Number(e.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-text2 text-sm mt-2" style={{ fontSize }}>
            Preview: GTA Cheat Codes — The best cheats in one place.
          </p>
        </div>
      </div>

      {/* Data Card */}
      <div className="bg-surface rounded-xl p-5 space-y-4 border border-app-border">
        <h2 className="font-mono text-xs text-text3 uppercase tracking-wider">Data</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-text1 font-body font-medium text-sm">Favorites</p>
            <p className="text-text3 text-xs">{favorites.size} saved cheats</p>
          </div>
          <button
            onClick={() => { clearFavorites(); showToast('Favorites cleared'); }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-text1 font-body font-medium text-sm">History</p>
            <p className="text-text3 text-xs">{recent.length} recently viewed</p>
          </div>
          <button
            onClick={() => { clearRecent(); showToast('History cleared'); }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Clear
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-text1 font-body font-medium text-sm">Export All Cheats</p>
            <p className="text-text3 text-xs">Download as .txt file</p>
          </div>
          <button
            onClick={() => { exportToTextFile(cheats, games); showToast('✓ Export started'); }}
            className="text-sm text-accent hover:text-accent/80 transition-colors font-mono"
          >
            Export .txt
          </button>
        </div>
      </div>

      {/* About Card */}
      <div className="bg-surface rounded-xl p-5 text-center border border-app-border">
        <h2 className="font-display text-2xl text-text1">GTA Cheat Codes</h2>
        <p className="text-text2 text-sm mt-1">Developed by Yassine Zahir</p>
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {['◉ Offline', '◈ No Accounts', '★ 100 Cheats', '👤 9 Characters'].map(badge => (
            <span key={badge} className="rounded-full px-3 py-1 text-xs bg-surface2 text-text2 border border-app-border">
              {badge}
            </span>
          ))}
        </div>
        <button
          onClick={() => setCreditsOpen(true)}
          className="mt-4 text-accent text-sm hover:underline font-mono"
        >
          ◆ VIEW CREDITS
        </button>
      </div>

      <CreditsModal isOpen={creditsOpen} onClose={() => setCreditsOpen(false)} />
    </div>
  );
}
