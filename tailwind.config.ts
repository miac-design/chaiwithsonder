import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-space-grotesk)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Cosmic Palette
        cosmic: {
          teal: '#2DD4BF',
          purple: '#A78BFA',
          cerulean: '#0891B2',
          indigo: '#1E3A8A',
          navy: '#0F172A',
          deep: '#020617',
        },
        // Primary - now Teal
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2DD4BF',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          DEFAULT: '#2DD4BF',
        },
        // Accent - Purple
        accent: {
          300: '#c4b5fd',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          DEFAULT: '#A78BFA',
        },
        // Secondary - Cerulean
        secondary: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891B2',
          700: '#0e7490',
          DEFAULT: '#0891B2',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(45, 212, 191, 0.6), 0 0 60px rgba(167, 139, 250, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
        '3xl': '64px',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(45, 212, 191, 0.4)',
        'glow-purple': '0 0 20px rgba(167, 139, 250, 0.4)',
        'glow-cosmic': '0 0 30px rgba(45, 212, 191, 0.3), 0 0 60px rgba(167, 139, 250, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;