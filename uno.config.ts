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
      cdn: 'https://esm.sh/',
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  theme: {
    colors: {
      // Semantic color tokens - placeholder for future theme system
      primary: {
        50: 'var(--color-primary-50, #f0f9ff)',
        100: 'var(--color-primary-100, #e0f2fe)',
        200: 'var(--color-primary-200, #bae6fd)',
        300: 'var(--color-primary-300, #7dd3fc)',
        400: 'var(--color-primary-400, #38bdf8)',
        500: 'var(--color-primary-500, #0ea5e9)',
        600: 'var(--color-primary-600, #0284c7)',
        700: 'var(--color-primary-700, #0369a1)',
        800: 'var(--color-primary-800, #075985)',
        900: 'var(--color-primary-900, #0c4a6e)',
      },
      secondary: {
        50: 'var(--color-secondary-50, #faf5ff)',
        100: 'var(--color-secondary-100, #f3e8ff)',
        200: 'var(--color-secondary-200, #e9d5ff)',
        300: 'var(--color-secondary-300, #d8b4fe)',
        400: 'var(--color-secondary-400, #c084fc)',
        500: 'var(--color-secondary-500, #a855f7)',
        600: 'var(--color-secondary-600, #9333ea)',
        700: 'var(--color-secondary-700, #7e22ce)',
        800: 'var(--color-secondary-800, #6b21a8)',
        900: 'var(--color-secondary-900, #581c87)',
      },
      accent: {
        50: 'var(--color-accent-50, #fff7ed)',
        100: 'var(--color-accent-100, #ffedd5)',
        200: 'var(--color-accent-200, #fed7aa)',
        300: 'var(--color-accent-300, #fdba74)',
        400: 'var(--color-accent-400, #fb923c)',
        500: 'var(--color-accent-500, #f97316)',
        600: 'var(--color-accent-600, #ea580c)',
        700: 'var(--color-accent-700, #c2410c)',
        800: 'var(--color-accent-800, #9a3412)',
        900: 'var(--color-accent-900, #7c2d12)',
      },
      neutral: {
        50: 'var(--color-neutral-50, #fafafa)',
        100: 'var(--color-neutral-100, #f4f4f5)',
        200: 'var(--color-neutral-200, #e4e4e7)',
        300: 'var(--color-neutral-300, #d4d4d8)',
        400: 'var(--color-neutral-400, #a1a1aa)',
        500: 'var(--color-neutral-500, #71717a)',
        600: 'var(--color-neutral-600, #52525b)',
        700: 'var(--color-neutral-700, #3f3f46)',
        800: 'var(--color-neutral-800, #27272a)',
        900: 'var(--color-neutral-900, #18181b)',
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
    // Button variants
    'btn': 'px-4 py-2 rounded font-medium transition-colors cursor-pointer',
    'btn-primary': 'btn bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    'btn-secondary': 'btn bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
    'btn-outline': 'btn border-2 border-primary-600 text-primary-600 hover:bg-primary-50',

    // Card component
    'card': 'bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6',
    'card-sm': 'card p-4',
    'card-lg': 'card p-8',

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
