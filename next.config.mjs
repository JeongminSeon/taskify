/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 임시 이미지 사용을 위한 도메인 추가
  images: {
    domains: ["via.placeholder.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
