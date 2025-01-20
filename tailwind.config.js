/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3074CA',
        secondary: '#AB1414',
        tertiary: '#3074CA',
        success: '#00C853',
        warning: '#FFC400',
        indigo: {
          900: '#3074CA',
          800: '#3074CA',
        },
      },
      keyframes: {
        swing: {
          '0%,100%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
        },
      },
      animation: {
        swing: 'swing 1s infinite',
      },
    },
  },
  plugins: [],
};
// extend: {
// colors: {
//   primary: '#E01010',
//   secondary: '#D10058',
//   tertiary: '#A22E83',
//   quaternary: '#65478E',
//   violet: '#ffff',
// },
// },
