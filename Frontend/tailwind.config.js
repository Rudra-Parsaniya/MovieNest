/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        oliveLight: '#6B8E23',
        oliveDark: '#556B2F',
      },
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
