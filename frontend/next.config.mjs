/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['images.unsplash.com','assets.aceternity.com','www.aceternity.com'],
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', 
        port: '', 
        pathname: '**', 
      },
    ]
  }
};

export default nextConfig;
