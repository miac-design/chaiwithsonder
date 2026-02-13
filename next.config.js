/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    enabled: false, // disables Turbopack, uses Webpack instead
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/initials/svg',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
