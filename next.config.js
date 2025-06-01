/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    // Disable webpack caching in development
    if (dev) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;