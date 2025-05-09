/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF7E2',
          100: '#FCF0C3',
          200: '#F9E18A',
          300: '#F6D351',
          400: '#F3C517',
          500: '#CCA312',
          600: '#A5820E',
          700: '#7E6109',
          800: '#574005',
          900: '#2F2203',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        dark: {
          50: '#EAEAEC',
          100: '#D5D5D9',
          200: '#ABABB3',
          300: '#81818D',
          400: '#575766',
          500: '#2D2D40',
          600: '#242433',
          700: '#1E1E24',
          800: '#17171D',
          900: '#101015',
        },
      },
    },
  },
  plugins: [],
} 