# Debug Panel / Painel de Depuração

A development-only debug panel for inspecting and manipulating game state in real-time.

Um painel de depuração exclusivo para desenvolvimento que permite inspecionar e manipular o estado do jogo em tempo real.

---

## English Documentation

### Overview

The Debug Panel is a powerful developer tool that provides real-time insights into:
- Player character stats and resources
- Game state and progress
- Persistence layer (localStorage)
- Quick debug actions

### Activation

The panel is **only available in development mode** when:
1. `VITE_DEV_MODE=true` is set in `.env`
2. Running with `pnpm run dev` (development server)

**Production builds automatically exclude this component.**

### How to Use

#### Opening the Panel

- **Keyboard Shortcut**: Press `Ctrl+D` (Windows/Linux) or `Cmd+D` (Mac)
- **Toggle Button**: Click the 🛠️ button in the bottom-right corner

#### Tabs

1. **Character Tab**
   - Player info (name, level, gold)
   - Resources (HP, Mana, Stamina)
   - Base attributes (Strength, Dexterity, Intelligence, Vitality)
   - Combat stats (Attack, Defense, Magic Attack, etc.)
   - Game state (location, playtime, quests)

2. **Storage Tab**
   - Total storage size
   - Raw localStorage data (expandable JSON)
   - Current locale setting

3. **Actions Tab**
   - **Add 1000 Gold**: Instantly adds gold to player
   - **Restore HP/Mana/Stamina**: Fully restores all resources
   - **Export Save Data**: Downloads save data as JSON
   - **Clear All Data**: Wipes all game data (requires confirmation)

#### Features

- **Auto-Refresh**: Data updates every 2 seconds automatically
- **Manual Refresh**: Click the 🔄 button in the header
- **Minimize**: Click ▼ to collapse the panel
- **Drag**: Panel header can be used to move (future feature)

### Adding New Debug Info

When implementing new game systems, add their state to the DebugPanel:

```svelte
<!-- In DebugPanel.svelte, add new state -->
let combatState = $state<CombatState | null>(null)

<!-- Fetch in refreshData() -->
const combatResult = await getCombatState()
if (combatResult.success) {
    combatState = combatResult.data
}

<!-- Display in appropriate tab -->
{#if combatState}
    <div class="section">
        <h4>Combat State</h4>
        <div class="info-grid">
            <div class="info-row">
                <span class="label">Turn:</span>
                <span class="value">{combatState.currentTurn}</span>
            </div>
        </div>
    </div>
{/if}
```

---

## Documentação em Português

### Visão Geral

O Painel de Depuração é uma ferramenta poderosa que fornece informações em tempo real sobre:
- Stats e recursos do personagem do jogador
- Estado e progresso do jogo
- Camada de persistência (localStorage)
- Ações rápidas de debug

### Ativação

O painel está **disponível apenas em modo de desenvolvimento** quando:
1. `VITE_DEV_MODE=true` está configurado no `.env`
2. Executando com `pnpm run dev` (servidor de desenvolvimento)

**Builds de produção excluem automaticamente este componente.**

### Como Usar

#### Abrindo o Painel

- **Atalho de Teclado**: Pressione `Ctrl+D` (Windows/Linux) ou `Cmd+D` (Mac)
- **Botão de Alternância**: Clique no botão 🛠️ no canto inferior direito

#### Abas

1. **Aba Character (Personagem)**
   - Informações do jogador (nome, nível, ouro)
   - Recursos (HP, Mana, Stamina)
   - Atributos base (Força, Destreza, Inteligência, Vitalidade)
   - Stats de combate (Ataque, Defesa, Ataque Mágico, etc.)
   - Estado do jogo (localização, tempo de jogo, quests)

2. **Aba Storage (Armazenamento)**
   - Tamanho total do armazenamento
   - Dados brutos do localStorage (JSON expansível)
   - Configuração de idioma atual

3. **Aba Actions (Ações)**
   - **Add 1000 Gold**: Adiciona ouro instantaneamente ao jogador
   - **Restore HP/Mana/Stamina**: Restaura completamente todos os recursos
   - **Export Save Data**: Baixa os dados de salvamento como JSON
   - **Clear All Data**: Limpa todos os dados do jogo (requer confirmação)

#### Funcionalidades

- **Auto-Atualização**: Dados são atualizados automaticamente a cada 2 segundos
- **Atualização Manual**: Clique no botão 🔄 no cabeçalho
- **Minimizar**: Clique em ▼ para colapsar o painel
- **Arrastar**: Cabeçalho do painel pode ser usado para mover (recurso futuro)

### Adicionando Novas Informações de Debug

Ao implementar novos sistemas do jogo, adicione seu estado ao DebugPanel:

```svelte
<!-- Em DebugPanel.svelte, adicione novo estado -->
let combatState = $state<CombatState | null>(null)

<!-- Busque em refreshData() -->
const combatResult = await getCombatState()
if (combatResult.success) {
    combatState = combatResult.data
}

<!-- Exiba na aba apropriada -->
{#if combatState}
    <div class="section">
        <h4>Estado do Combate</h4>
        <div class="info-grid">
            <div class="info-row">
                <span class="label">Turno:</span>
                <span class="value">{combatState.currentTurn}</span>
            </div>
        </div>
    </div>
{/if}
```

---

## Technical Details / Detalhes Técnicos

### Component Structure

```
src/lib/components/debug/
├── DebugPanel.svelte    # Main panel component
├── README.md            # This file
└── index.ts             # Exports
```

### Integration

The DebugPanel is conditionally imported in `src/routes/+layout.svelte`:

```typescript
const isDevMode = dev && import.meta.env.VITE_DEV_MODE === 'true'

if (isDevMode) {
    import('$lib/components/debug/DebugPanel.svelte').then((module) => {
        DebugPanel = module.default
    })
}
```

This ensures:
- ✅ Zero bundle size impact in production
- ✅ No performance overhead in production
- ✅ Complete tree-shaking of debug code

### Extending the Panel

When adding new game systems, follow this pattern:

1. Add state variables to track new data
2. Fetch data in `refreshData()` function
3. Add new tab if needed, or expand existing tabs
4. Add quick actions for common debug operations
5. Update this README with new features

### Best Practices

- Keep refresh interval at 2 seconds (avoid performance issues)
- Use `$state` runes for reactive data
- Handle null/undefined states gracefully
- Add confirmation dialogs for destructive actions
- Keep UI compact and scrollable
- Use monospace font for technical data
- Provide keyboard shortcuts for common actions

---

## Changelog

### v1.0.0 - Initial Release
- Character inspector with full stats
- Persistence inspector with raw localStorage
- Quick actions (add gold, restore resources, export data, clear data)
- Auto-refresh every 2 seconds
- Keyboard shortcut (Ctrl+D / Cmd+D)
- Minimizable panel
- Three-tab interface
- Development-only, excluded from production builds
