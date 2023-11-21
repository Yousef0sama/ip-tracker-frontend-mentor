/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY
  },
  output: "export",
};

module.exports = nextConfig;
