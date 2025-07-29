/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 0.4s ease-out",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#5850ec',
          50: '#f5f7ff',
          100: '#ecf0ff',
          200: '#dfe3ff',
          300: '#c6ceff',
          400: '#a4a9ff',
          500: '#8284ff',
          600: '#5850ec',
          700: '#4f46e5',
          800: '#4338ca',
          900: '#3730a3',
        },
        secondary: {
          DEFAULT: '#64748b',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        'subtle': '0 2px 5px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode variant based on the 'dark' class
}