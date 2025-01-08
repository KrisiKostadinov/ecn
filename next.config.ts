import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:3000"],
      bodySizeLimit: "100mb"
    }
  }
};

export default nextConfig;