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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URI}/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
