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
        // Zlaqa / SPEAKUP Brand Palette
        brand: {
          green: {
            DEFAULT: '#6EC000', // Zlaqa Green (Action, Buttons, Accents)
            dark: '#3F7300',    // Green text on white (5.7:1 contrast)
            soft: '#F1F9E4',    // Success states, soft fills
            hover: '#62AD00',   // Primary hover
          },
          violet: {
            DEFAULT: '#6D28D9', // Violet Secondary (Headers, Badges, Links)
            deep: '#5B21B6',    // Dark Violet (Hover / CTA band)
            light: '#EDE9FE',   // Tags, dividers, subtle fills
            soft: '#F5F3FF',    // Card / alternate backgrounds
          },
          ink: '#0B0B0B',       // Primary text & wordmark
          white: '#FFFFFF',     // Base background (70%+)
        },
        // Deep teal brand scales (compatibility mapping)
        teal: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#6D28D9', // Mapped to Violet
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#2E1065',
          950: '#1E0A45',
        },
        // Mint highlight (mapped to Zlaqa Green soft/bright)
        mint: {
          50: '#F1F9E4',
          100: '#E2F3C8',
          200: '#C5E791',
          300: '#A8DB5A',
          400: '#6EC000', // Core Zlaqa Green
          500: '#62AD00',
          600: '#3F7300',
          700: '#305900',
          800: '#213E00',
          900: '#132400',
        },
        // Coral primary action (mapped to Zlaqa Green action)
        coral: {
          50: '#F1F9E4',
          100: '#E2F3C8',
          200: '#C5E791',
          300: '#A8DB5A',
          400: '#7DC814',
          500: '#6EC000', // Core Action Green
          600: '#62AD00',
          700: '#3F7300',
          800: '#305900',
          900: '#213E00',
        },
        // Cream light surface scale (mapped to clean White & soft tints)
        cream: {
          50: '#FFFFFF',
          100: '#FFFFFF', // Clean White default surface
          200: '#F8FAFC',
          300: '#F1F5F9',
          400: '#E2E8F0',
          500: '#CBD5E1',
          600: '#94A3B8',
          700: '#64748B',
          800: '#334155',
          900: '#0F172A',
        },
        // Ink typography scale
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0B0B0B', // Core Ink Black
          950: '#050505',
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
