/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          500: '#5B21B6',
          600: '#4c1d95',
          700: '#3730a3'
        },
        secondary: {
          400: '#8B5CF6',
          500: '#7c3aed'
        },
        accent: {
          500: '#10B981',
          600: '#059669'
        },
        surface: '#F9FAFB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '8': '8px',
        '12': '12px'
      },
      transitionDuration: {
        '200': '200ms'
      }
    },
  },
  plugins: [],
}