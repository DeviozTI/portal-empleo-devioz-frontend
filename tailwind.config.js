/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade00: 'fade00 2s infinite',
        pulse00: 'pulse00 2s infinite',
      },
      keyframes: {
        pulse00: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.01)' },
          '100%': { transform: 'scale(1)' },
        },
        fade00: {
          '0%': { background: '#252525' },
          '50%': { background: '#000000' },
          '100%': { background: '#353535' },
        },
      },
    },
  },
  plugins: [],
}