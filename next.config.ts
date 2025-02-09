import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    responseLimit: false,
    externalResolver: true,
  },
};

export default nextConfig;