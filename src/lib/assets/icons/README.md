# Icon Spritesheet System

Sistema de mapeamento de ícones para uso eficiente de spritesheets no jogo.

## Visão Geral

Este sistema permite usar ícones individuais a partir de um único arquivo de spritesheet (`rpg-icons.png`), otimizando o carregamento de assets e performance.

## Arquivos

- **`rpg-icons.png`** - Spritesheet com ícones de 32x32 pixels
- **`icon-map.ts`** - Mapeamento de IDs de ícones para posições no grid
- **`/src/lib/components/ui/SpriteIcon.svelte`** - Componente para renderizar ícones

## Uso

### Básico

```svelte
<script>
  import { SpriteIcon } from '$lib/components/ui'
</script>

<SpriteIcon iconId="longsword" />
<SpriteIcon iconId="wooden_shield" />
<SpriteIcon iconId="heart" />
```

### Com Tamanho Customizado

```svelte
<!-- Tamanho padrão: 32px -->
<SpriteIcon iconId="longsword" size={64} />
<SpriteIcon iconId="wooden_shield" size={48} />
<SpriteIcon iconId="heart" size={24} />
```

### Com Classes CSS

```svelte
<SpriteIcon
  iconId="potion_blue"
  class="mr-2 opacity-80"
/>
```

### Com Texto Alternativo

```svelte
<SpriteIcon
  iconId="potion_red"
  alt="Health Potion"
/>
```

## Estrutura do Spritesheet

- **Grid:** 32x32 pixels por ícone
- **Layout:** 16 colunas (512px de largura)
- **Posições:** Indexadas a partir de (0,0) no canto superior esquerdo

## Ícones Mapeados (Completo - 311 ícones)

### Row 0 - Status Effects (11)
- `skull_and_bones`, `poison`, `sleeping_eye`, `silenced`, `cursed`, `dizzy`, `charmed`, `sleeping`, `paralysis`, `burned`, `sweat_drop`

### Row 1 - Body Icons (5)
- `heart`, `lungs`, `stomach`, `brain`, `strong_arm`

### Row 2 - Buffs & Debuffs (7)
- `buff_arrow_1`, `buff_arrow_2`, `buff_arrow_3`, `debuff_arrow_1`, `debuff_arrow_2`, `debuff_arrow_3`, `repeat_arrow`

### Row 3 - Special Moves (16)
- `dripping_blade`, `saber_slash`, `lightning_attack`, `headshot`, `raining_arrows`, `healing`, `heal_injury`, `battle_gear`, `guard`, `ring_of_fire`, `disintegrate`, `fist_hit`, `gust_of_air`, `tremor`, `psychic_waves`, `sunrays`

### Row 4 - Non-Combat Actions (9)
- `square_speech_bubble`, `round_speech_bubble`, `campfire`, `camping_tent`, `blacksmith_forging`, `mining`, `woodcutting`, `spellbook`, `steal`

### Row 5-6 - Weapons (28 total)
- Melee: `wooden_waster`, `longsword`, `enchanted_sword`, `katana`, `gladius`, `saber`, `dagger`, etc.
- Ranged: `bow_and_arrow`, `crossbow`, `slingshot`, `boomerang`
- Magic: `wizard_staff`, `magic_gem_staff_blue/red/green/yellow`
- Shields: `buckler_shield`, `wooden_shield`, `checkered_shield`

### Row 7-8 - Clothing & Armour (26 total)
- Helms, armour, tunics, accessories, gauntlets, boots, jewelry

### Row 9 - Healing Items (16)
- Potions (normal, +1, +2, special brew), bandage

### Row 10-11 - General Items (32 total)
- Tools, instruments, keys, herbs, treasure chest

### Row 12-13 - Resources & Books (32 total)
- Currency, plants, books, scrolls, maps

### Row 14-15 - Food (31 total)
- Fruits, vegetables, meats, provisions

### Row 16 - Fishing Items (15)
- Fishing equipment and various fish

### Row 17 - Resources (11)
- Crafting materials

### Row 18 - Orbs (6)
- Colored magical orbs

### Row 19-21 - Alchemy & Magic (40 total)
- Flasks, cauldron, powders, magic scrolls, weather icons

## Adicionar Novos Ícones

Para mapear novos ícones, edite `icon-map.ts`:

```typescript
export const iconMap = {
  // ... ícones existentes
  'new_icon_name': { row: 5, col: 0 },
} as const
```

### Passos:

1. Identifique a posição do ícone no spritesheet (row, col)
2. Adicione a entrada no `iconMap` com um ID descritivo
3. O TypeScript garantirá type-safety automaticamente

## API do Componente

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `iconId` | `IconId \| string` | - | ID do ícone (obrigatório) |
| `size` | `number` | `32` | Tamanho em pixels |
| `class` | `string` | `''` | Classes CSS adicionais |
| `alt` | `string` | `iconId` | Texto alternativo para acessibilidade |

### Funções Utilitárias

```typescript
import {
  getIconPosition,
  isValidIconId,
  getAllIconIds
} from '$lib/assets/icons/icon-map'

// Obter posição de um ícone
const pos = getIconPosition('longsword') // { row: 5, col: 1 }

// Validar ID de ícone
if (isValidIconId('longsword')) {
  // ID válido
}

// Listar todos os IDs disponíveis
const allIds = getAllIconIds()
```

## Performance

- ✅ **1 Request HTTP** - Apenas um arquivo de spritesheet é carregado
- ✅ **CSS-Based** - Rendering otimizado usando CSS background-position
- ✅ **Type-Safe** - TypeScript garante que apenas IDs válidos são usados
- ✅ **Pixel Perfect** - `image-rendering: pixelated` mantém pixel art nítida

## Comparação: SpriteIcon vs Icon

### SpriteIcon (Este Sistema)
- ✅ Usa assets locais (rpg-icons.png)
- ✅ Performance otimizada (1 arquivo)
- ✅ Funciona offline
- ✅ Controle total sobre os ícones
- ⚠️ Requer mapeamento manual

### Icon (Iconify)
- ✅ 4000+ ícones disponíveis
- ✅ Carregamento sob demanda
- ✅ Não requer mapeamento
- ⚠️ Requer conexão com CDN
- ⚠️ Múltiplos requests HTTP

### Quando Usar Cada Um

**Use SpriteIcon quando:**
- Precisa de ícones específicos do jogo (items, equipamentos)
- Performance é crítica (inventário, batalha)
- Precisa funcionar offline

**Use Icon quando:**
- Precisa de ícones genéricos de UI (settings, close, menu)
- Ícones são usados esporadicamente
- Não há equivalente no spritesheet

## Exemplo Completo

```svelte
<script>
  import { SpriteIcon } from '$lib/components/ui'
</script>

<div class="inventory-slot">
  <!-- Item icon -->
  <SpriteIcon
    iconId="longsword"
    size={48}
    alt="Longsword"
    class="item-icon"
  />

  <!-- Item name -->
  <span class="item-name">Longsword</span>

  <!-- Stats -->
  <div class="item-stats">
    <SpriteIcon iconId="heart" size={16} />
    <span>+10 DMG</span>
  </div>
</div>

<style>
  .inventory-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: var(--color-arcana-bg-elevated);
    border-radius: var(--radius-lg);
  }

  .item-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }
</style>
```

## Contribuindo

Para adicionar mais ícones ao mapeamento:

1. Abra o spritesheet em um editor de imagens
2. Identifique a linha (row) e coluna (col) do ícone
3. Adicione ao `icon-map.ts` com um nome descritivo
4. Atualize esta documentação se necessário

## Licença

Os ícones no spritesheet devem seguir a licença do projeto. Certifique-se de que os assets utilizados são apropriadamente licenciados para uso comercial/não-comercial conforme necessário.
