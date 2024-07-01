import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: isProd ? 'export' : 'standalone',
  basePath: isProd ? '/concept-ecomm' : '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.modules.push(path.resolve('./'));

    return config;
  },
};

export default nextConfig;
