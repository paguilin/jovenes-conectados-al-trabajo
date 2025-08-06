const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Soporte para SSR y rutas dinámicas en Firebase Functions

  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    return config;
  },

  images: {
    domains: ['firebasestorage.googleapis.com'],
    // En SSR no necesitas 'unoptimized' salvo que estés exportando
  },
};

module.exports = nextConfig;