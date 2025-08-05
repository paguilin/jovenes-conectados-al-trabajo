import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ Necesario para deploy en Cloud Functions v2

  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;