/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
      {
        protocol: 'http', // Jodi kono image http link hoy, tar jonno
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;