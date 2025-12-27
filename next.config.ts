import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output as static export for Vercel
  output: "export",
  // Image optimization settings for static export
  images: {
    unoptimized: true,
  },
  // Trailing slash for static export
  trailingSlash: true,
};

export default nextConfig;
