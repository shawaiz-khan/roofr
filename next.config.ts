import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  runtime: "edge",
  maxDuration: 15,
  api: {
    responseLimit: false,
    externalResolver: true,
  },
};

export default nextConfig;