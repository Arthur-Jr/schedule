/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tvmaze.com',
        port: '',
        pathname: '/uploads/images/**',
      }
    ]
  },
  env: {
    SERIES_API_URL: process.env.SERIES_API_URL,
  }
}

module.exports = nextConfig
