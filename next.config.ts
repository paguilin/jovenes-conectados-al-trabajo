import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
 
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignora warnings de ESLint en build
  },
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // ✅ Permite imágenes externas desde Firebase Storage
  },
};

export default nextConfig;