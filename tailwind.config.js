/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#1E293B',
        },
        'surface-raised': {
          DEFAULT: '#F1F5F9',
          dark: '#334155',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },

        'text-primary': {
          DEFAULT: '#1E293B',
          dark: '#F1F5F9',
        },
        'text-secondary': {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        'text-muted': {
          DEFAULT: '#94A3B8',
          dark: '#475569',
        },

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
