import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
