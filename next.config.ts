import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["demo-809979.assets.newt.so"],
    unoptimized: true,
  },
  output: 'export', 
  trailingSlash: true,
};

export default nextConfig;
