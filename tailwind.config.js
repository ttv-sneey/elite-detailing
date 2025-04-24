/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0eefc',
          200: '#bfdaf9',
          300: '#90c0f4',
          400: '#5a9fee',
          500: '#4285f4',
          600: '#2a6cde',
          700: '#1d58c0',
          800: '#1a4da1',
          900: '#193e7d',
        }
      },
      spacing: {
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};