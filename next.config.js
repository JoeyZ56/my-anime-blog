/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
