/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'www.aceternity.com'],
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

import withBundleAnalyzer from '@next/bundle-analyzer';

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default analyzer({
  ...nextConfig,
  env: {
    NEXT_PUBLIC_ENV: 'PRODUCTION',
  },
});
