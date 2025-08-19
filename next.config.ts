import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PORT: '8080',
  },
  // Performance optimizations
  experimental: {
    // Enable Turbopack optimizations
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Faster builds
  swcMinify: true,
};

export default nextConfig;
