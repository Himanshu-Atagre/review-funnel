import type { NextConfig } from "next";

const nextConfig = {
  serverExternalPackages: ["openai"], 
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
