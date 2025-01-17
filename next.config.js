const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['admiral'],
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.alias['@/components'] = path.join(
      __dirname,
      'src/app/_components'
    );
    config.resolve.alias['@/hooks'] = path.join(__dirname, 'src/app/_hooks');
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  productionBrowserSourceMaps: true,
  rewrites: async () => {
    return [
      {
        source: '/health',
        destination: '/api/health',
      },
    ];
  },
};

// Configuration object tells the next-pwa plugin
const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the PWA files
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

module.exports = withPWA(nextConfig);
