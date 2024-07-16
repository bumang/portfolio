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
  output: 'export',
  assetPrefix: isProd ? '/portfolio' : '',
  basePath: isProd ? '/portfolio' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push(
      {
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          svgo: true,
          svgoConfig: {
            plugins:[
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    cleanupIds: false,
                    removeViewBox: false,
                    convertShapeToPath: false
                  }
                }
              },
            ]
          }
        },
      }],
    });

    config.resolve.modules.push(path.resolve('./'));

    return config;
  },
};

export default nextConfig;
