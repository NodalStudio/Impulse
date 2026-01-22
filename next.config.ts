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

  // Uncomment and set basePath if deploying to github.com/username/repo-name
  // basePath: '/Impulse',
}

export default nextConfig
