import type { Config } from 'tailwindcss';

const DETECTION_BAR_SIZE = [
  [8, 48, 16, 72, 24, 8],
  [8, 24, 48, 32, 48, 8],
  [8, 40, 12, 24, 16, 8],
  [8, 32, 64, 32, 8, 8],
  [8, 72, 32, 72, 68, 8],
  [8, 64, 20, 40, 48, 8],
  [8, 28, 36, 16, 20, 8],
  [8, 48, 12, 32, 24, 8],
  [8, 24, 48, 28, 52, 8],
];

const DetectionBarKeyFrames = DETECTION_BAR_SIZE.map((bar, index) => {
  return {
    ['dv' + index]: {
      '20%': { height: bar[1] },
      '40%': { height: bar[2] },
      '60%': { height: bar[3] },
      '80%': { height: bar[4] },
    },
  };
});

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
      red: '#FF2E00',
      darkgray: '#202229',
      pink: '#8B177E',
      green: '#00FFA3',
    },
    fontFamily: {
      sans: ['SpoqaHanSansNeo', 'sans-serif'],
      samlip: ['SDSamliphopangche', 'serif'],
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.625rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3.125rem',
    },
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain',
      '2x': '200%',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, #322323 0deg, #293E5B 302.4deg, #322323 360deg)',
      },
      transitionDelay: {
        '1000': '1000ms',
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        wiggle: {
          '20%': { backgroundImage: 'url("/images/wiggle2.png")' },
          '40%': { backgroundImage: 'url("/images/wiggle3.png")' },
          '60%': { backgroundImage: 'url("/images/wiggle4.png")' },
          '80%': { backgroundImage: 'url("/images/wiggle5.png")' },
        },
        ...DetectionBarKeyFrames[0],
        ...DetectionBarKeyFrames[1],
        ...DetectionBarKeyFrames[2],
        ...DetectionBarKeyFrames[3],
        ...DetectionBarKeyFrames[4],
        ...DetectionBarKeyFrames[5],
        ...DetectionBarKeyFrames[6],
        ...DetectionBarKeyFrames[7],
        ...DetectionBarKeyFrames[8],
        loading1: {
          '10%': { backgroundColor: '#32c5ff' },
          '40%': { height: '90px' },
        },
        loading2: {
          '10%': { backgroundColor: '#32c5ff' },
          '60%': { height: '90px' },
        },
        loading3: {
          '10%': { backgroundColor: '#32c5ff' },
          '80%': { height: '90px' },
        },
        scorebox: {
          '0%': { width: '0.5rem', height: '5rem', fontSize: '1.5rem' },
          '100%': { width: '0.25rem', height: '2.5rem', fontSize: '1rem' },
        },
        moveleft: {
          '0%': { transform: 'translateX(80%)' },
          '100%': { transform: 'translateX(0)' },
        },
        movetop: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        movebottom: {
          '0%': { transform: 'translateY(-150%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        blink: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideup: 'slideup 0.5s',
        wiggle: 'wiggle 1.8s ease infinite',
        dv0: 'dv0 1.8s ease-out infinite',
        dv1: 'dv1 1.8s ease-out infinite',
        dv2: 'dv2 1.8s ease-out infinite',
        dv3: 'dv3 1.8s ease-out infinite',
        dv4: 'dv4 1.8s ease-out infinite',
        dv5: 'dv5 1.8s ease-out infinite',
        dv6: 'dv6 1.8s ease-out infinite',
        dv7: 'dv7 1.8s ease-out infinite',
        dv8: 'dv8 1.8s ease-out infinite',
        scorebox: 'scorebox 1s ease-in-out',
        moveleft: 'moveleft 1s ease-in-out',
        movetop: 'movetop 1s ease-in-out',
        movebottom: 'movebottom 1.5s ease-in-out',
        blink: 'blink 2s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
