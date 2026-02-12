import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        // Clean Navy + Orange Palette
        chai: {
          navy: '#1A1A3E',      // Deep navy (darkest)
          blue: '#1E4976',       // Medium navy blue
          sky: '#5BC0EB',        // Light sky blue
          amber: '#F5A623',      // Orange (accent only)
          dark: '#0F0F2D',       // Even darker for backgrounds
        },
        // Primary - Sky Blue
        primary: {
          50: '#E8F7FC',
          100: '#D1EFFA',
          200: '#A3DFF5',
          300: '#75CFF0',
          400: '#5BC0EB',
          500: '#47B0DE',
          600: '#3590B8',
          700: '#286F8F',
          800: '#1B4F66',
          900: '#0E2F3D',
          DEFAULT: '#5BC0EB',
        },
        // Accent - Orange (used sparingly)
        accent: {
          50: '#FEF5E7',
          100: '#FDEBD0',
          200: '#FBD7A1',
          300: '#F9C372',
          400: '#F7AF43',
          500: '#F5A623',
          600: '#D48A0F',
          700: '#A36B0C',
          800: '#724C09',
          900: '#412C05',
          DEFAULT: '#F5A623',
        },
        // Navy for backgrounds
        navy: {
          50: '#E6E6ED',
          100: '#CDCDDB',
          200: '#9B9BB7',
          300: '#696993',
          400: '#3D3D6B',
          500: '#1A1A3E',
          600: '#151532',
          700: '#101026',
          800: '#0B0B1A',
          900: '#0F0F2D',
          DEFAULT: '#1A1A3E',
        },
        // EDRON AI Teal accent
        teal: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          DEFAULT: '#10B981',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 166, 35, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 166, 35, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '2xl': '40px',
      },
      boxShadow: {
        'glow-amber': '0 0 20px rgba(245, 166, 35, 0.4)',
        'glow-amber-sm': '0 0 10px rgba(245, 166, 35, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;