// next.config.mjs


logging: {
  fetches: {
    fullUrl: true,
  },
},


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
