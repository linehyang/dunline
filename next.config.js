/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

//next/image를 사용하여 외부 이미지를 가져올때  Error: Invalid src prop "" on `next/image를 방지하기 위한 코드
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["img-api.neople.co.kr"],
  },
};
