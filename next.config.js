/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
