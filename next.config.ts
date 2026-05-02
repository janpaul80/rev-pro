import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trustProxy: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rev-pro.dev',
      },
    ],
  },
};

export default nextConfig;
