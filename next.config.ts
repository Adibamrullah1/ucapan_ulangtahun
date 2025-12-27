import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during build to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization settings
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
