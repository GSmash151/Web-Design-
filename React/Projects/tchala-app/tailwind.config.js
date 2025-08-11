/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",    
  ],
  theme: {
   extend: {
      boxShadow: {
        'neumorphic-dark': '9px 9px 18px #0d0d0d, -9px -9px 18px #131313',
        'inner-neumorphic-dark': 'inset 5px 5px 10px #0d0d0d, inset -5px -5px 10px #131313',
        'neumorphic-button-dark': '6px 6px 12px #0d0d0d, -6px -6px 12px #131313',
        'neumorphic-button-hover-dark': '3px 3px 6px #0d0d0d, -3px -3px 6px #131313',
      },
      // ... other extends if any
    },
  },
  plugins: [],
}

