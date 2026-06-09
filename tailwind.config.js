/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fef08a', // yellow-200
          DEFAULT: '#facc15', // yellow-400
          dark: '#eab308', // yellow-500
        },
        secondary: {
          light: '#67e8f9', // cyan-300
          DEFAULT: '#06b6d4', // cyan-500
          dark: '#0891b2', // cyan-600
        },
        accent: {
          light: '#fbcfe8', // pink-200
          DEFAULT: '#f472b6', // pink-400
          dark: '#db2777', // pink-600
        },
        success: '#22c55e',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fredoka One', 'Nunito', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
}
