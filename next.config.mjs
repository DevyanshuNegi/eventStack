/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        // customKey: process.env.keyName, // pulls from .env file
        
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    images: {
        domains: ['picsum.photos', 'res.cloudinary.com'],
    },
};

export default nextConfig;