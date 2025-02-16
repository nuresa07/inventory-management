/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-s3-inventorymanagement-system.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**"
      }
    ]
  },
  reactStrictMode: true,

};

export default nextConfig;