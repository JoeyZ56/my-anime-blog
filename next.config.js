/** @type {import('next').NextConfig} */
const path = require("path");
require("dotenv").config();
const nextConfig = {
  images: {
    domains: ["*", "wallpapercave.com", "images4.fanpop.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    MONGO_URI: process.env.MONGO_URI,
  },
  webpack(config, options) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  },
};

module.exports = nextConfig;
