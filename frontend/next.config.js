/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // useEffect 두 번 호출 방지
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/:path*`,
      },
    ];
  },
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
  output: 'standalone',
};

module.exports = nextConfig;
