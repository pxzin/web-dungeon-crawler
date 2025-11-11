# Arcana Design System

Dark fantasy RPG design system inspired by mystical game interfaces.

Sistema de design dark fantasy para RPG inspirado em interfaces místicas de jogos.

---

## English Documentation

### Overview

The Arcana Design System provides a cohesive set of components, colors, typography, and patterns for building the dungeon crawler game interface. It captures the essence of dark fantasy aesthetics with golden accents, mystical glows, and a rich color palette.

### Design Principles

1. **Dark Fantasy Aesthetic**: Deep navy/purple backgrounds with golden highlights
2. **Visual Hierarchy**: Clear distinction between primary, secondary, and accent elements
3. **Tactile Feedback**: Hover states, transitions, and glow effects for interactivity
4. **Accessibility**: Sufficient contrast ratios and keyboard navigation support
5. **Responsiveness**: Mobile-first approach with fluid layouts

---

## Color Palette

### Background Colors
- `--color-arcana-bg-primary`: #1a1d2e (Main background)
- `--color-arcana-bg-secondary`: #252842 (Cards and panels)
- `--color-arcana-bg-elevated`: #2d3250 (Elevated elements)

### Gold/Amber (Primary Actions)
- Range: `--color-arcana-gold-50` to `--color-arcana-gold-900`
- Main: `--color-arcana-gold-600` (#c9984a)
- Use: Buttons, highlights, important UI elements

### Cyan/Blue (Magic & Abilities)
- Range: `--color-arcana-cyan-50` to `--color-arcana-cyan-900`
- Main: `--color-arcana-cyan-600` (#2a9d8f)
- Use: Mana bars, magical effects, secondary actions

### Magenta/Pink (Special Effects)
- Range: `--color-arcana-magenta-50` to `--color-arcana-magenta-900`
- Main: `--color-arcana-magenta-600` (#d946ef)
- Use: Critical hits, special abilities, enchantments

### Orange/Red (Danger & Health)
- Range: `--color-arcana-orange-50` to `--color-arcana-orange-900`
- Main: `--color-arcana-orange-600` (#ff6b35)
- Use: Health bars, warnings, fire effects

### Text Colors
- `--color-arcana-text-primary`: #e8dcc4 (Main text)
- `--color-arcana-text-secondary`: #b8a994 (Secondary text)
- `--color-arcana-text-muted`: #8a7d6f (Disabled/muted text)
- `--color-arcana-text-gold`: #f0c78a (Highlighted text)

---

## Typography

### Fonts
- **Serif (Headings)**: 'Cinzel' - For titles and important headings
- **Sans (Body)**: 'Inter' - For body text and UI elements
- **Mono (Code)**: System monospace - For technical/debug info

### Font Sizes
```css
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
--text-5xl: 3rem      /* 48px */
```

### UnoCSS Utility Classes
- `arcana-heading` - Base heading style (serif, gold, bold)
- `arcana-heading-lg` - Large heading (text-4xl md:text-5xl)
- `arcana-heading-md` - Medium heading (text-2xl md:text-3xl)
- `arcana-heading-sm` - Small heading (text-xl md:text-2xl)
- `arcana-text` - Primary text color
- `arcana-text-muted` - Muted text color
- `arcana-text-gold` - Gold highlighted text

---

## Components

### Button

Flexible button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `disabled`: boolean (default: false)
- `fullWidth`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `onclick`: (e: MouseEvent) => void
- `class`: string

**Usage:**
```svelte
<script>
  import { Button } from '$lib/components/ui'
</script>

<Button variant="primary" size="lg">
  Start Adventure
</Button>

<Button variant="outline" onclick={() => console.log('clicked')}>
  Cancel
</Button>
```

**UnoCSS Shortcuts:**
- `arcana-btn-primary` - Golden primary button
- `arcana-btn-secondary` - Cyan secondary button
- `arcana-btn-danger` - Orange danger button
- `arcana-btn-outline` - Outlined gold button
- `arcana-btn-ghost` - Ghost/text-only button

---

### Card

Container component for panels, dialogs, and content sections.

**Props:**
- `variant`: 'default' | 'elevated' | 'gold' (default: 'default')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `class`: string
- `children`: Snippet (main content)
- `header`: Snippet (optional header)
- `footer`: Snippet (optional footer)

**Usage:**
```svelte
<script>
  import { Card } from '$lib/components/ui'
</script>

<Card variant="elevated">
  {#snippet header()}
    <h3>Card Title</h3>
  {/snippet}

  <p>Card content goes here</p>

  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>
```

**UnoCSS Shortcuts:**
- `arcana-card` - Base card style
- `arcana-card-elevated` - Elevated card with enhanced shadow
- `arcana-card-gold` - Card with gold border
- `arcana-card-sm` - Small padding
- `arcana-card-lg` - Large padding

---

### Input

Styled text input with label, error, and hint support.

**Props:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' (default: 'text')
- `value`: string | number (bindable)
- `placeholder`: string
- `disabled`: boolean
- `required`: boolean
- `label`: string (optional)
- `error`: string (optional - displays error message)
- `hint`: string (optional - displays hint text)
- `class`: string
- Standard HTML input attributes (min, max, pattern, etc.)

**Usage:**
```svelte
<script>
  import { Input } from '$lib/components/ui'

  let name = $state('')
  let error = $state('')
</script>

<Input
  bind:value={name}
  label="Character Name"
  placeholder="Enter name"
  required
  error={error}
  hint="3-20 characters"
/>
```

**UnoCSS Shortcuts:**
- `arcana-input` - Styled input field

---

### Modal

Dialog/modal component with backdrop and animations.

**Props:**
- `isOpen`: boolean (bindable)
- `onClose`: () => void
- `title`: string (optional)
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `closeOnBackdrop`: boolean (default: true)
- `closeOnEscape`: boolean (default: true)
- `showCloseButton`: boolean (default: true)
- `class`: string
- `children`: Snippet (main content)
- `header`: Snippet (optional custom header)
- `footer`: Snippet (optional footer)

**Usage:**
```svelte
<script>
  import { Modal, Button } from '$lib/components/ui'

  let isOpen = $state(false)
</script>

<Button onclick={() => isOpen = true}>Open Modal</Button>

<Modal bind:isOpen title="Confirm Action" size="md">
  <p>Are you sure you want to continue?</p>

  {#snippet footer()}
    <Button variant="outline" onclick={() => isOpen = false}>Cancel</Button>
    <Button variant="primary" onclick={() => isOpen = false}>Confirm</Button>
  {/snippet}
</Modal>
```

---

### Icon

Icon component using Iconify with UnoCSS preset-icons.

**Props:**
- `icon`: string (format: 'collection-name-icon-name')
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'md')
- `color`: string (UnoCSS color class)
- `class`: string

**Usage:**
```svelte
<script>
  import { Icon } from '$lib/components/ui'
</script>

<!-- RPG/Fantasy icons from game-icons -->
<Icon icon="game-icons-sword-brandish" size="lg" />
<Icon icon="game-icons-crystal-wand" size="xl" class="text-arcana-cyan-400" />

<!-- Material Design Icons -->
<Icon icon="mdi-heart" color="arcana-orange-500" />

<!-- Lucide icons -->
<Icon icon="lucide-shield" size="2xl" />
```

**Recommended Icon Collections:**
- `game-icons`: 4000+ RPG and fantasy themed icons (https://game-icons.net/)
- `mdi`: Material Design Icons - general purpose
- `lucide`: Modern, clean icon set

**Common Icons:**
- Warrior: `game-icons-sword-brandish`
- Mage: `game-icons-crystal-wand`
- Rogue: `game-icons-hood`
- Cleric: `game-icons-prayer-beads`
- Strength: `game-icons-muscle-up`
- Dexterity: `game-icons-agility`
- Intelligence: `game-icons-brain`
- Health: `game-icons-health-normal`
- Shield: `lucide-shield`
- Plus/Minus: `lucide-plus`, `lucide-minus`

---

## Effects & Animations

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.25)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.6)
```

### Glow Effects
```css
--glow-gold: 0 0 20px rgba(201, 152, 74, 0.4)
--glow-cyan: 0 0 20px rgba(42, 157, 143, 0.4)
--glow-magenta: 0 0 20px rgba(217, 70, 239, 0.4)
```

### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Border Radius
```css
--radius-sm: 0.375rem   /* 6px */
--radius-md: 0.5rem     /* 8px */
--radius-lg: 0.75rem    /* 12px */
--radius-xl: 1rem       /* 16px */
--radius-2xl: 1.5rem    /* 24px */
--radius-full: 9999px   /* Circular */
```

---

## Best Practices

1. **Use Semantic Colors**: Prefer Arcana color tokens over arbitrary hex values
2. **Consistent Spacing**: Use spacing tokens (--spacing-xs to --spacing-4xl)
3. **Component Composition**: Build complex UIs by combining base components
4. **Accessibility**: Always include proper ARIA labels and keyboard navigation
5. **Performance**: Icons load on-demand via CDN, no bundle bloat
6. **Responsive**: Test components at mobile, tablet, and desktop sizes

---

## Extending the Design System

When adding new components:

1. Follow existing naming conventions (`arcana-*`)
2. Use design tokens from `app.css` and `uno.config.ts`
3. Include both EN and PT-BR documentation
4. Add TypeScript types for all props
5. Support Svelte 5 runes ($state, $derived, $props)
6. Include usage examples in this README

---

## Documentação em Português

### Visão Geral

O Arcana Design System fornece um conjunto coeso de componentes, cores, tipografia e padrões para construir a interface do jogo dungeon crawler. Captura a essência da estética dark fantasy com acentos dourados, brilhos místicos e uma paleta de cores rica.

### Princípios de Design

1. **Estética Dark Fantasy**: Fundos navy/roxo profundo com destaques dourados
2. **Hierarquia Visual**: Distinção clara entre elementos primários, secundários e de destaque
3. **Feedback Tátil**: Estados hover, transições e efeitos de brilho para interatividade
4. **Acessibilidade**: Taxas de contraste suficientes e suporte à navegação por teclado
5. **Responsividade**: Abordagem mobile-first com layouts fluidos

### Componentes Principais

#### Button (Botão)
Componente de botão flexível com múltiplas variantes e tamanhos.

#### Card (Cartão)
Componente de container para painéis, diálogos e seções de conteúdo.

#### Input (Campo de Entrada)
Input de texto estilizado com suporte para rótulo, erro e dica.

#### Modal (Modal)
Componente de diálogo/modal com backdrop e animações.

#### Icon (Ícone)
Componente de ícone usando Iconify com preset-icons do UnoCSS.

### Coleções de Ícones Recomendadas

- `game-icons`: 4000+ ícones temáticos de RPG e fantasia
- `mdi`: Material Design Icons - propósito geral
- `lucide`: Conjunto moderno e limpo de ícones

---

## Changelog

### v1.0.0 - Initial Release (2025-01-10)

**Components:**
- ✅ Button - Multiple variants (primary, secondary, danger, outline, ghost)
- ✅ Card - Container with header/footer support
- ✅ Input - Text input with validation states
- ✅ Modal - Dialog component with animations
- ✅ Icon - Iconify integration with 4000+ fantasy icons

**Design Tokens:**
- ✅ Arcana color palette (gold, cyan, magenta, orange)
- ✅ Typography system (Cinzel + Inter fonts)
- ✅ Spacing scale (xs to 4xl)
- ✅ Shadow and glow effects
- ✅ Transition timings

**Infrastructure:**
- ✅ UnoCSS theme configuration
- ✅ Global CSS variables
- ✅ Component shortcuts
- ✅ Icon collections (game-icons, mdi, lucide)

**Completed Refactors:**
- ✅ Character Creation screen using new Design System
- ✅ All components following Arcana aesthetic
- ✅ Type-safe props with Svelte 5 runes
- ✅ Bilingual documentation (EN + PT-BR)
