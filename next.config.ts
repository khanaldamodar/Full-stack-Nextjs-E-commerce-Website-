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
        hostname: "res.cloudinary.com", // ✅ Cloudinary
      },
      {
        protocol: "https",
        hostname: "example.com", // ✅ Replace or remove this
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // optional for dummy images
      },
    ],
  },
  
};

export default nextConfig;
