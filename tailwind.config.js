/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6B21A8',
        blackMetal: '#1C1C1E',
        white: '#FFFFFF',
        accent: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        source: ['"Source Sans Pro"', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
