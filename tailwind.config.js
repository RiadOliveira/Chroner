/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        accent: {
          blue: '#1C94FC',
          purple: '#9C44FC',
          pink: '#FC5EF0',
        },
      },
      fontFamily: {
        primary: ['FunnelDisplay', 'sans-serif'],
        secondary: ['SpaceGrotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
