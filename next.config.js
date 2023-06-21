/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  eslint: {
    dirs: ["."],
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
