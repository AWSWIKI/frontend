// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    HOST_NAME: process.env.HOST_NAME,
  },
};

export default nextConfig;
