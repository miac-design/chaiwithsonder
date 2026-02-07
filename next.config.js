/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
          remotePatterns: [
            {
                      protocol: 'https',
                      hostname: '**',
            },
                ],
    },
    eslint: {
          ignoreDuringBuilds: true,
    },
    // Removed turbopack.enabled — not a valid next.config key in Next.js 15.3+
    // Turbopack is enabled via CLI flag: next dev --turbopack
};

module.exports = nextConfig;
