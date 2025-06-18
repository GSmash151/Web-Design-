// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // This is where Tailwind will look for classes to compile.
  // Ensure these paths correctly point to your components, pages, and app directories.
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Add src if you have files there
  ],
  theme: {
    extend: {
      // Define your custom neumorphic shadow styles here
      boxShadow: {
        'neumorphic-dark': '9px 9px 18px #0d0d0d, -9px -9px 18px #131313',
        'inner-neumorphic-dark': 'inset 5px 5px 10px #0d0d0d, inset -5px -5px 10px #131313',
        'neumorphic-button-dark': '6px 6px 12px #0d0d0d, -6px -6px 12px #131313',
        'neumorphic-button-hover-dark': '3px 3px 6px #0d0d0d, -3px -3px 6px #131313',
      },
      // You can add other custom theme properties here (colors, fonts, etc.)
    },
  },
  plugins: [], // For Tailwind CSS v4, core plugins are often not listed here explicitly
};

export default config;