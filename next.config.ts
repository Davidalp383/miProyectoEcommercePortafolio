/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
});

module.exports = nextConfig;
