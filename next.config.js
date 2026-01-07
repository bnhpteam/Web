/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@rive-app/react-canvas'] // 将 Rive 添加到外部包列表，避免 SSR 问题
  },

  async rewrites() {
    return [
      {
        source: '/prod-api/:path*',
        destination: process.env.API_BASE_URL || 'http://admin/prod-api/:path*'
      }
    ]
  },

  ...(process.env.NODE_ENV === 'development' && {
    swcMinify: false,
    productionBrowserSourceMaps: true
  }),
}

module.exports = nextConfig
