import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 1000,         // 1초마다 파일 변경 체크
        aggregateTimeout: 300 // 변경 후 빌드 전 대기 시간
      };
    }
    return config;
  },
};

export default nextConfig;
