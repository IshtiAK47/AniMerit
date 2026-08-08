import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "img1.ak.crunchyroll.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "*.anilist.co",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
      {
        protocol: "https",
        hostname: "s1.anilist.co",
      },
      {
        protocol: "https",
        hostname: "s2.anilist.co",
      },
      {
        protocol: "https",
        hostname: "s3.anilist.co",
      },
    ],
  },
};

export default nextConfig;
