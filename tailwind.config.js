/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: {
          blue: '#1C94FC',
          purple: '#9C44FC',
          pink: '#FC5EF0',
        },
        task: {
          gray: '#BDCBDE',
          red: '#F71118',
          blue: '#1C94FC',
          green: '#2CC55D',
          yellow: '#F2BD09',
          purple: '#9C44FC',
          pink: '#FC5EF0',
          orange: '#FB4935',
        },
      },
    },
  },
  plugins: [],
};
