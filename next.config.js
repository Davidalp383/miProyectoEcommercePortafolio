/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,

  // ✅ App Router está habilitado por defecto desde Next.js 13.4+
  // No es necesario 'experimental.appDir: true' → ¡elimínalo!
  
  images: {
    domains: ["res.cloudinary.com"],
  },

  // ✅ Otras configuraciones opcionales que podrías considerar:
  // trailingSlash: false,
  // poweredByHeader: false,
};

// ✅ Envuelve la configuración con bundleAnalyzer
module.exports = withBundleAnalyzer(nextConfig);