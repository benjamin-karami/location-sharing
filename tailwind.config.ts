import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#f6c160',
          600: '#e0b058',
        },
        secondary: {
          500: '#f6b060',
          600: '#db9c53',
        },
        background: {
          700: '#292929',
          800: '#1a1a1a',
        },
        gray: {
          300: '#f8f9fa',
          400: '#adb5bd',
        },
      },
    },
  },
  plugins: [],
};
export default config;
