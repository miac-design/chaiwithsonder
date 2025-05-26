/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    enabled: false, // disables Turbopack, uses Webpack instead
  },
};
module.exports = nextConfig; 