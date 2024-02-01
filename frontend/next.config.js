/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // useEffect 두 번 호출 방지
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: '@svgr/webpack',
    });
    config.module.rules.push({
      test: /\.(wav)$/,
      use: {
        loader: 'file-loader',
      },
    });
    return config;
  },
};

module.exports = nextConfig;
