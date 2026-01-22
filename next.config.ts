import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  // (no server to optimize images at runtime)
  images: {
    unoptimized: true,
  },

  // Enable React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Turbopack configuration (moved from experimental in Next.js 16)
  turbopack: {
    // Turbopack is now the default bundler
  },

  // Set basePath and assetPrefix for GitHub Pages deployment
  basePath: '/Impulse',
  assetPrefix: '/Impulse',
}

export default nextConfig
