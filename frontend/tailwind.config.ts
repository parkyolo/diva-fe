import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blue: '#043dae',
      gray: '#c9c9c9',
      skyblue: '#32c5ff',
      'bg-black': '#111318',
      white: '#f3f3f3',
      'btn-black': '#1f2021',
    },
    fontFamily: {
      sans: ['SpoqaHanSansNeo', 'sans-serif'],
      samlip: ['SDSamliphopangche', 'serif'],
    },
    fontSize: {
      sm: '12px',
      base: '16px',
      xl: '20px',
      '2xl': '26px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '50px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, #322323 0deg, #293E5B 302.4deg, #322323 360deg)',
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        slideup: 'slideup 0.5s',
      },
    },
  },
  plugins: [],
};
export default config;
