/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Deep teal brand scales
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0F766E', // Primary brand teal
          700: '#0D625C',
          800: '#0B4D49',
          900: '#0A2A2B', // Deep teal surface
          950: '#051819',
        },
        // Mint highlight
        mint: {
          50: '#F4FDFB',
          100: '#E6FAF6',
          200: '#C2F4EB',
          300: '#9EEEDE',
          400: '#7FE0CF', // Core mint
          500: '#4DD3BC',
          600: '#28B89F',
          700: '#1E8F7C',
          800: '#186F60',
          900: '#13584D',
        },
        // Coral primary action & offline event accent
        coral: {
          50: '#FFF5F2',
          100: '#FFE9E4',
          200: '#FFD3C9',
          300: '#FFB2A2',
          400: '#FF947E',
          500: '#FF7A5C', // Core Coral CTA
          600: '#F05F3E',
          700: '#D44424',
          800: '#B03318',
          900: '#8C2914',
        },
        // Cream light surface scale
        cream: {
          50: '#FCFAF7',
          100: '#F7F3EA', // Core cream surface
          200: '#EFE8D8',
          300: '#E4DAC3',
          400: '#D5C7A8',
          500: '#C2B08B',
          600: '#A6926B',
          700: '#867451',
          800: '#68593E',
          900: '#4D422E',
        },
        // Ink typography scale
        ink: {
          50: '#F2F6F7',
          100: '#E0E8EA',
          200: '#BDCFD3',
          300: '#95B1B7',
          400: '#6C8E96',
          500: '#4C6F77',
          600: '#38545A',
          700: '#283D42',
          800: '#1B2C2F',
          900: '#12262A', // Core Ink Text
          950: '#091517',
        },
        // CSS Variable Bindings
        background: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        'surface-elevated': 'var(--bg-surface-elevated)',
        'surface-muted': 'var(--bg-surface-muted)',
        foreground: 'var(--text-primary)',
        'foreground-muted': 'var(--text-muted)',
        'foreground-faint': 'var(--text-faint)',
        border: 'var(--border-line)',
        'border-subtle': 'var(--border-subtle)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', '"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        normal: '0',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.12em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'glow-teal': '0 0 32px -8px rgba(15, 118, 110, 0.35)',
        'glow-coral': '0 0 32px -8px rgba(255, 122, 92, 0.45)',
        'glow-mint': '0 0 32px -8px rgba(127, 224, 207, 0.4)',
        'subtle-card': '0 20px 40px -15px rgba(18, 38, 42, 0.05)',
        'elevated-card': '0 25px 60px -20px rgba(18, 38, 42, 0.1)',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.98)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
