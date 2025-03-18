/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['play.google.com', 'developer.apple.com', 'upload.wikimedia.org'],
    // Try disabling unoptimized to see if that makes a difference:
    // unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    appDir: true
  },
  webpack: (config, { dev, isServer }) => {
    // Enable importing SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,  // process JS/TSX files
      use: ['@svgr/webpack'],
    });
    if (dev && !isServer) {
      config.ignoreWarnings = [
        { message: /Fast Refresh had to perform a full reload/ },
      ];
    }
    return config;
  }
};

module.exports = nextConfig;
