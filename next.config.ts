import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.fbcdn.net", // Allow all Facebook CDN subdomains
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com", // Facebook profile images
      },
    ],
  },
};

export default nextConfig;
