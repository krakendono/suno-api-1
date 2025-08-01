/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // existing rule
    config.module.rules.push({
      test: /\.(ttf|html)$/i,
      type: 'asset/resource'
    });

    // NEW: avoid bundling heavy browser dependencies on the server
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('rebrowser-playwright-core');
      config.externals.push('@playwright/browser-chromium');
    }

    return config;
  },
  experimental: {
    serverMinification: false
  }
};

export default nextConfig;

