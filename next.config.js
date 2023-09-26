/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  images: {
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
