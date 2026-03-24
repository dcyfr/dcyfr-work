import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: { dirs: ['app', 'components', 'lib'] },
};

export default nextConfig;
