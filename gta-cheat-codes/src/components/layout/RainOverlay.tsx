'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

interface Drop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export default function RainOverlay() {
  const { isDark, rainEnabled } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dropsRef = useRef<Drop[]>([]);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!isDark || !rainEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init drops
    dropsRef.current = Array.from({ length: 130 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      length: 14 + Math.random() * 22,
      speed: 9 + Math.random() * 10,
      opacity: 0.08 + Math.random() * 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const drop of dropsRef.current) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.length * 0.15, drop.y + drop.length);
        ctx.strokeStyle = `rgba(160, 210, 255, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    // Lightning
    const doLightning = () => {
      setFlash(true);
      setTimeout(() => setFlash(false), 90);
      if (Math.random() > 0.5) {
        setTimeout(() => {
          setFlash(true);
          setTimeout(() => setFlash(false), 90);
        }, 160);
      }
    };

    const scheduleNextFlash = () => {
      const delay = (5 + Math.random() * 12) * 1000;
      return setTimeout(() => {
        doLightning();
        lightningRef.current = scheduleNextFlash();
      }, delay);
    };

    const lightningRef = { current: scheduleNextFlash() };

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(lightningRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isDark, rainEnabled]);

  if (!isDark || !rainEnabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none"
      />
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}
            className="fixed inset-0 bg-white/15 z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
}
