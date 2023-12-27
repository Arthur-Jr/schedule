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
    REGISTER_PAGE_URL: process.env.REGISTER_PAGE_URL,
    LOGIN_BACKEND_URL: process.env.LOGIN_BACKEND_URL,
    JWT_KEY: process.env.JWT_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  }
}

module.exports = nextConfig
