import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'app-bg': 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surface2: 'var(--color-surface2)',
        'app-border': 'var(--color-border)',
        text1: 'var(--color-text)',
        text2: 'var(--color-text2)',
        text3: 'var(--color-text3)',
        accent: '#ff6b00',
        'accent-dim': 'rgba(255,107,0,0.12)',
        'accent-glow': 'rgba(255,107,0,0.35)',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulseDot 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
