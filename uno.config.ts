import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: false,
    }),
    presetIcons({
      // Using CDN to load icons on-demand (no package installation required)
      // Supports all Iconify icon collections
      cdn: 'https://esm.sh/',
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // Recommended collections for fantasy RPG:
      // - game-icons: RPG and fantasy themed icons (https://game-icons.net/)
      // - mdi: Material Design Icons - general purpose
      // - lucide: Modern, clean icon set
      // Usage: i-game-icons-sword, i-mdi-heart, i-lucide-shield
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  theme: {
    colors: {
      // Arcana Dark Fantasy Theme - Inspired by mystical RPG aesthetics
      // Base backgrounds - Deep navy/purple
      arcana: {
        bg: {
          primary: 'var(--color-arcana-bg-primary, #1a1d2e)',
          secondary: 'var(--color-arcana-bg-secondary, #252842)',
          elevated: 'var(--color-arcana-bg-elevated, #2d3250)',
        },
        // Golden/Amber accents - Primary actions and highlights
        gold: {
          50: 'var(--color-arcana-gold-50, #fef8e7)',
          100: 'var(--color-arcana-gold-100, #fcefc7)',
          200: 'var(--color-arcana-gold-200, #f9e29c)',
          300: 'var(--color-arcana-gold-300, #f0c78a)',
          400: 'var(--color-arcana-gold-400, #e6b973)',
          500: 'var(--color-arcana-gold-500, #d4a574)',
          600: 'var(--color-arcana-gold-600, #c9984a)',
          700: 'var(--color-arcana-gold-700, #a67c3a)',
          800: 'var(--color-arcana-gold-800, #86632e)',
          900: 'var(--color-arcana-gold-900, #6b4f24)',
        },
        // Cyan/Blue - Magical effects and abilities
        cyan: {
          50: 'var(--color-arcana-cyan-50, #e0f7fa)',
          100: 'var(--color-arcana-cyan-100, #b2ebf2)',
          200: 'var(--color-arcana-cyan-200, #80deea)',
          300: 'var(--color-arcana-cyan-300, #5dade2)',
          400: 'var(--color-arcana-cyan-400, #4ecdc4)',
          500: 'var(--color-arcana-cyan-500, #3ab7b7)',
          600: 'var(--color-arcana-cyan-600, #2a9d8f)',
          700: 'var(--color-arcana-cyan-700, #1e7e72)',
          800: 'var(--color-arcana-cyan-800, #155e56)',
          900: 'var(--color-arcana-cyan-900, #0d3f3b)',
        },
        // Magenta/Pink - Skill highlights and special effects
        magenta: {
          50: 'var(--color-arcana-magenta-50, #fce4ec)',
          100: 'var(--color-arcana-magenta-100, #f8bbd0)',
          200: 'var(--color-arcana-magenta-200, #f48fb1)',
          300: 'var(--color-arcana-magenta-300, #f06292)',
          400: 'var(--color-arcana-magenta-400, #ec407a)',
          500: 'var(--color-arcana-magenta-500, #e91e63)',
          600: 'var(--color-arcana-magenta-600, #d946ef)',
          700: 'var(--color-arcana-magenta-700, #c2185b)',
          800: 'var(--color-arcana-magenta-800, #a1134e)',
          900: 'var(--color-arcana-magenta-900, #880e4f)',
        },
        // Orange/Red - Danger, warnings, and fire effects
        orange: {
          50: 'var(--color-arcana-orange-50, #fff3e0)',
          100: 'var(--color-arcana-orange-100, #ffe0b2)',
          200: 'var(--color-arcana-orange-200, #ffcc80)',
          300: 'var(--color-arcana-orange-300, #ffb74d)',
          400: 'var(--color-arcana-orange-400, #ffa726)',
          500: 'var(--color-arcana-orange-500, #ff9800)',
          600: 'var(--color-arcana-orange-600, #ff6b35)',
          700: 'var(--color-arcana-orange-700, #e65100)',
          800: 'var(--color-arcana-orange-800, #bf360c)',
          900: 'var(--color-arcana-orange-900, #8b2500)',
        },
        // Text colors
        text: {
          primary: 'var(--color-arcana-text-primary, #e8dcc4)',
          secondary: 'var(--color-arcana-text-secondary, #b8a994)',
          muted: 'var(--color-arcana-text-muted, #8a7d6f)',
          white: 'var(--color-arcana-text-white, #ffffff)',
          gold: 'var(--color-arcana-text-gold, #f0c78a)',
        },
        // Border colors
        border: {
          default: 'var(--color-arcana-border-default, #3d4266)',
          gold: 'var(--color-arcana-border-gold, #c9984a)',
          glow: 'var(--color-arcana-border-glow, #5d6ab8)',
        },
      },
      // Legacy semantic tokens (kept for backward compatibility)
      primary: {
        50: 'var(--color-primary-50, #fef8e7)',
        100: 'var(--color-primary-100, #fcefc7)',
        200: 'var(--color-primary-200, #f9e29c)',
        300: 'var(--color-primary-300, #f0c78a)',
        400: 'var(--color-primary-400, #e6b973)',
        500: 'var(--color-primary-500, #d4a574)',
        600: 'var(--color-primary-600, #c9984a)',
        700: 'var(--color-primary-700, #a67c3a)',
        800: 'var(--color-primary-800, #86632e)',
        900: 'var(--color-primary-900, #6b4f24)',
      },
      secondary: {
        50: 'var(--color-secondary-50, #e0f7fa)',
        100: 'var(--color-secondary-100, #b2ebf2)',
        200: 'var(--color-secondary-200, #80deea)',
        300: 'var(--color-secondary-300, #5dade2)',
        400: 'var(--color-secondary-400, #4ecdc4)',
        500: 'var(--color-secondary-500, #3ab7b7)',
        600: 'var(--color-secondary-600, #2a9d8f)',
        700: 'var(--color-secondary-700, #1e7e72)',
        800: 'var(--color-secondary-800, #155e56)',
        900: 'var(--color-secondary-900, #0d3f3b)',
      },
      accent: {
        50: 'var(--color-accent-50, #fce4ec)',
        100: 'var(--color-accent-100, #f8bbd0)',
        200: 'var(--color-accent-200, #f48fb1)',
        300: 'var(--color-accent-300, #f06292)',
        400: 'var(--color-accent-400, #ec407a)',
        500: 'var(--color-accent-500, #e91e63)',
        600: 'var(--color-accent-600, #d946ef)',
        700: 'var(--color-accent-700, #c2185b)',
        800: 'var(--color-accent-800, #a1134e)',
        900: 'var(--color-accent-900, #880e4f)',
      },
      neutral: {
        50: 'var(--color-neutral-50, #e8dcc4)',
        100: 'var(--color-neutral-100, #d4c9b0)',
        200: 'var(--color-neutral-200, #b8a994)',
        300: 'var(--color-neutral-300, #9d8d78)',
        400: 'var(--color-neutral-400, #8a7d6f)',
        500: 'var(--color-neutral-500, #71675c)',
        600: 'var(--color-neutral-600, #5a524a)',
        700: 'var(--color-neutral-700, #3d4266)',
        800: 'var(--color-neutral-800, #252842)',
        900: 'var(--color-neutral-900, #1a1d2e)',
      },
    },
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    spacing: {
      xs: 'var(--spacing-xs, 0.25rem)',
      sm: 'var(--spacing-sm, 0.5rem)',
      md: 'var(--spacing-md, 1rem)',
      lg: 'var(--spacing-lg, 1.5rem)',
      xl: 'var(--spacing-xl, 2rem)',
      '2xl': 'var(--spacing-2xl, 3rem)',
    },
  },

  shortcuts: {
    // Arcana Button - Hero variant as default
    'arcana-btn': 'px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer relative overflow-hidden',
    'arcana-btn-hero': 'arcana-btn min-w-80 text-xl font-bold font-serif border-3 border-arcana-gold-800',

    // Arcana Card Variants
    'arcana-card': 'bg-arcana-bg-secondary rounded-2xl shadow-xl border border-arcana-border-default p-6 backdrop-blur-sm',
    'arcana-card-elevated': 'arcana-card bg-arcana-bg-elevated shadow-2xl border-arcana-border-glow',
    'arcana-card-gold': 'arcana-card border-2 border-arcana-gold-600 shadow-arcana-gold-900/30',
    'arcana-card-sm': 'arcana-card p-4',
    'arcana-card-lg': 'arcana-card p-8',

    // Arcana Text Styles
    'arcana-heading': 'font-serif text-arcana-gold-300 font-bold',
    'arcana-heading-lg': 'arcana-heading text-4xl md:text-5xl',
    'arcana-heading-md': 'arcana-heading text-2xl md:text-3xl',
    'arcana-heading-sm': 'arcana-heading text-xl md:text-2xl',
    'arcana-text': 'text-arcana-text-primary',
    'arcana-text-muted': 'text-arcana-text-muted',
    'arcana-text-gold': 'text-arcana-text-gold',

    // Layout helpers
    'center': 'flex items-center justify-center',
    'center-col': 'flex flex-col items-center justify-center',
    'container-fluid': 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },

  safelist: [
    // Add classes that should always be included
  ],

  content: {
    filesystem: [
      'src/**/*.{html,js,ts,jsx,tsx,vue,svelte}',
    ],
  },
})
