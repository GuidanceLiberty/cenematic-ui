/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      boxShadow: {
        'green-glow': '0 0 20px rgba(74, 222, 128, 0.8), inset 0 0 10px rgba(74, 222, 128, 0.4)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 10px rgba(74, 222, 128, 0.6)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 25px rgba(74, 222, 128, 0.9)' },
        }
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}