'use client';
import React, { useState } from 'react';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { FavoritesProvider } from '@/components/providers/FavoritesProvider';
import { RecentProvider } from '@/components/providers/RecentProvider';
import { ToastProvider } from '@/components/ui/Toast';
import Sidebar from '@/components/layout/Sidebar';
import StatusBar from '@/components/layout/StatusBar';
import RainOverlay from '@/components/layout/RainOverlay';
import BootLoader from '@/components/layout/BootLoader';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <BootLoader onComplete={() => setBooted(true)} />

      <RainOverlay />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main
        className="md:ml-64 mb-7 h-[calc(100vh-28px)] overflow-y-auto"
        style={{ background: 'var(--color-bg)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <StatusBar onMenuToggle={() => setSidebarOpen(prev => !prev)} />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The ultimate offline GTA cheat code encyclopedia — 100 cheats for PC, PlayStation, and Xbox across all Grand Theft Auto games." />
        <meta name="theme-color" content="#ff6b00" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <title>GTA Cheat Codes</title>
        {/* Anti-FOUC script — runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var dark = localStorage.getItem('darkMode');
                  if (dark === 'false') {
                    document.documentElement.classList.add('light');
                  }
                  var fs = localStorage.getItem('fontSize');
                  if (fs) {
                    document.documentElement.style.setProperty('--font-size', fs + 'px');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            <RecentProvider>
              <ToastProvider>
                <AppShell>{children}</AppShell>
              </ToastProvider>
            </RecentProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
