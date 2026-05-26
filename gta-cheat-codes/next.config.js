/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
};

let withPWA;
try {
  withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offline-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
    ],
  });
} catch {
  withPWA = (config) => config;
}

module.exports = withPWA(nextConfig);
