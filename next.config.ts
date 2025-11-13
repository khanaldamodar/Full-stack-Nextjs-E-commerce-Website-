import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", 
      },
      {
        protocol: "https",
        hostname: "example.com", 
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", 
      },
    ],
  },
  
};

export default nextConfig;
