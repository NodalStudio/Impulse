import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Impulse brand colors
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2a4a73',
          dark: '#152a45',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#ddb73a',
          dark: '#a88820',
        },
        cream: {
          DEFAULT: '#faf7f2',
          dark: '#f5f0e8',
        },
        rose: {
          DEFAULT: '#f5e6e0',
          dark: '#edd5cc',
        },
        beige: {
          DEFAULT: '#efe8e1',
          dark: '#e5dbd2',
        },
      },
      fontFamily: {
        cormorant: [
          'Cormorant Garamond',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif',
        ],
        greatvibes: [
          'Great Vibes',
          '"Snell Roundhand"',      // macOS
          '"Segoe Script"',         // Windows
          '"Lucida Handwriting"',   // Windows/macOS
          '"Bradley Hand"',         // macOS
          'cursive',
        ],
        source: [
          'Source Sans 3',
          '"Segoe UI"',             // Windows
          'system-ui',
          '-apple-system',          // macOS/iOS
          'Roboto',                 // Android/Chrome OS
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        montserrat: [
          'Montserrat',
          '"Segoe UI"',
          'system-ui',
          '-apple-system',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'gradient-impulse': 'linear-gradient(135deg, #faf7f2 0%, #f5e6e0 50%, #efe8e1 100%)',
        'gradient-hero': 'linear-gradient(180deg, #faf7f2 0%, #f5e6e0 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
