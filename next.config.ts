import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flotiq-backend-972-mr-599.dev.cdwv.pl",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
};


export default nextConfig;
