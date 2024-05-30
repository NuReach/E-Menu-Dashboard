/** @type {import('next').NextConfig} */
const nextConfig = {
      webpack: (config) => {
        config.externals = [...config.externals, "bcrypt"];
        return config;
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'my-blob-store.public.blob.vercel-storage.com',
            port: '',
          },
        ],
      },
};



export default nextConfig;
