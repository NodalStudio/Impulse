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
        // Impulse brand colors — from Visual Identity guide
        navy: {
          DEFAULT: '#051c3c',
          light: '#0a2d5c',
          dark: '#031225',
        },
        gold: {
          DEFAULT: '#bf8a3d',
          light: '#d4a456',
          dark: '#a07232',
          // Accessible gold for TEXT on light (blush/white) backgrounds:
          // ≥4.5:1 contrast (WCAG AA). The brighter golds above stay for
          // decoration and for text on the dark navy backgrounds.
          deep: '#876318',
        },
        blush: {
          DEFAULT: '#f3e9e5',
          dark: '#ebe0db',
        },
        rose: {
          DEFAULT: '#c4a6a2',
          dark: '#b39490',
          light: '#d4bbb8',
        },
        burgundy: {
          DEFAULT: '#8a181a',
          light: '#a52225',
          dark: '#6e1315',
        },
      },
      fontFamily: {
        tenor: [
          'Tenor Sans',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
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
        script: [
          'Brittany Signature',
          'Great Vibes',
          '"Snell Roundhand"',
          '"Segoe Script"',
          '"Lucida Handwriting"',
          'cursive',
        ],
      },
      backgroundImage: {
        'gradient-impulse': 'linear-gradient(135deg, #f3e9e5 0%, #c4a6a2 100%)',
        'gradient-hero': 'linear-gradient(170deg, #f3e9e5 0%, #ebe0db 60%, #d4bbb8 100%)',
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
