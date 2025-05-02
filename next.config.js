const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@/components": path.resolve(__dirname, "components"),
      "@/public": path.resolve(__dirname, "public"),
      "@/utils": path.resolve(__dirname, "utils"),
      "@/constants": path.resolve(__dirname, "constants"),
    };
    return config;
  },
};
