/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/tmp/:path*',
        destination: 'https://ticket.yes24.com/:path*',
      },
    ]
  }
}

module.exports = nextConfig
