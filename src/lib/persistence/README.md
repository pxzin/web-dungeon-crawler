# Persistence System / Sistema de Persistência

A flexible, type-safe persistence layer using the Adapter Pattern for easy migration between storage backends.

Um sistema de persistência flexível e type-safe usando o padrão Adapter para fácil migração entre diferentes backends de armazenamento.

---

## English Documentation

### Overview

The persistence system is built with three main layers:

1. **Types Layer** (`types.ts`) - TypeScript interfaces and enums for all game data
2. **Adapter Layer** (`adapter.ts`, `adapters/`) - Abstract interface and implementations for different storage backends
3. **Service Layer** (`persistence.service.ts`) - High-level API with getters/setters for game operations

### Architecture Benefits

- ✅ **Easy Migration**: Switch from localStorage to IndexedDB, Firebase, or any backend by just changing the adapter
- ✅ **Type Safety**: Full TypeScript support with autocomplete
- ✅ **Error Handling**: `Result<T>` type for functional error handling
- ✅ **Testability**: Mock adapters for testing
- ✅ **Extensibility**: Add new storage backends without changing service code

### Quick Start

```typescript
import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'

// 1. Create an adapter
const adapter = new LocalStorageAdapter({
	prefix: 'my_game_',
})

// 2. Create the persistence service
const persistence = createPersistenceService(adapter)

// 3. Initialize (required before use)
await persistence.init()

// 4. Use the service!
const result = await persistence.createPlayer('Hero')
if (result.success) {
	console.log('Player created:', result.data)
}
```

### Usage Examples

#### Creating a New Player

```typescript
// Create a new player with default stats
const result = await persistence.createPlayer('Adventurer')

if (result.success) {
	console.log('Player ID:', result.data.id)
	console.log('Level:', result.data.stats.level) // 1
	console.log('Gold:', result.data.gold) // 0
}
```

#### Saving and Loading Player Data

```typescript
// Get current player
const playerResult = await persistence.getPlayerData()

if (playerResult.success && playerResult.data) {
	const player = playerResult.data

	// Update player stats
	player.gold += 100
	player.stats.experience += 50

	// Save changes
	const saveResult = await persistence.setPlayerData(player)
	if (saveResult.success) {
		console.log('Player data saved!')
	}
}
```

#### Managing Game State

```typescript
// Create game state
const gameState = {
	playerId: 'player_123',
	currentLocation: 'dungeon_entrance',
	questProgress: {
		'quest_1': 1,
		'quest_2': 0,
	},
	playtime: 3600, // seconds
	lastSaveAt: Date.now(),
}

await persistence.setGameState(gameState)

// Load game state
const stateResult = await persistence.getGameState()
if (stateResult.success && stateResult.data) {
	console.log('Current location:', stateResult.data.currentLocation)
}
```

#### Save Slots Management

```typescript
// Save game to slot 1
const saveResult = await persistence.saveGame('slot_1')

if (saveResult.success) {
	console.log('Game saved to slot:', saveResult.data.id)
	console.log('Player:', saveResult.data.playerName)
	console.log('Level:', saveResult.data.level)
}

// Get all save slots
const slotsResult = await persistence.getSaveSlots()
if (slotsResult.success) {
	for (const slot of slotsResult.data) {
		console.log(`${slot.playerName} - Level ${slot.level} - ${slot.location}`)
	}
}

// Load game from slot
const loadResult = await persistence.loadGame('slot_1')
if (loadResult.success) {
	console.log('Game loaded!')
	console.log('Player:', loadResult.data.player.name)
	console.log('Location:', loadResult.data.state.currentLocation)
}

// Delete a save slot
await persistence.deleteSaveSlot('slot_1')
```

#### Settings Management

```typescript
// Get settings (returns defaults if none exist)
const settingsResult = await persistence.getSettings()
if (settingsResult.success) {
	console.log('Volume:', settingsResult.data.volume.master)
	console.log('Language:', settingsResult.data.locale)
}

// Update specific settings
await persistence.updateSettings({
	locale: 'pt-BR',
	volume: {
		master: 0.8,
		music: 0.6,
		sfx: 0.8,
	},
})

// Save complete settings
const settings = {
	locale: 'en' as const,
	volume: { master: 1.0, music: 0.7, sfx: 0.9 },
	graphics: { quality: 'high' as const, particles: true, fullscreen: false },
	controls: { keyboardEnabled: true, gamepadEnabled: true, touchEnabled: true },
}

await persistence.setSettings(settings)
```

#### Error Handling

```typescript
const result = await persistence.getPlayerData()

if (!result.success) {
	console.error('Error:', result.error.message)
	// Handle error appropriately
	return
}

// Safe to use result.data here
const player = result.data
if (player) {
	console.log('Player found:', player.name)
} else {
	console.log('No player data exists')
}
```

#### Export/Import Data

```typescript
// Export all data to JSON (for backup)
const exportResult = await persistence.exportData()
if (exportResult.success) {
	const json = exportResult.data
	// Save to file, send to server, etc.
	localStorage.setItem('backup', json)
}

// Import data from JSON
const json = localStorage.getItem('backup')
if (json) {
	const importResult = await persistence.importData(json)
	if (importResult.success) {
		console.log('Data imported successfully!')
	}
}
```

#### Using in Svelte Components

```svelte
<script lang="ts">
	import { onMount } from 'svelte'
	import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'
	import type { PlayerData } from '$lib/persistence'

	let persistence = $state(createPersistenceService(new LocalStorageAdapter()))
	let player = $state<PlayerData | null>(null)
	let loading = $state(true)

	onMount(async () => {
		// Initialize persistence
		await persistence.init()

		// Check if save exists
		const hasData = await persistence.hasSaveData()

		if (hasData.success && hasData.data) {
			// Load existing player
			const result = await persistence.getPlayerData()
			if (result.success) {
				player = result.data
			}
		}

		loading = false
	})

	async function createNewGame() {
		const result = await persistence.createPlayer('Hero')
		if (result.success) {
			player = result.data
		}
	}

	async function saveGame() {
		const result = await persistence.saveGame('auto_save')
		if (result.success) {
			alert('Game saved!')
		}
	}
</script>

{#if loading}
	<p>Loading...</p>
{:else if player}
	<div>
		<h1>{player.name}</h1>
		<p>Level: {player.stats.level}</p>
		<p>Gold: {player.gold}</p>
		<button onclick={saveGame}>Save Game</button>
	</div>
{:else}
	<button onclick={createNewGame}>New Game</button>
{/if}
```

### Future: Adding New Adapters

To add a new storage backend (e.g., IndexedDB), just implement the `StorageAdapter` interface:

```typescript
import type { StorageAdapter, StorageAdapterConfig } from '$lib/persistence'

export class IndexedDBAdapter implements StorageAdapter {
	async init(): Promise<Result<void>> {
		// Initialize IndexedDB
	}

	async get<T>(key: string): Promise<Result<T | null>> {
		// Get from IndexedDB
	}

	async set<T>(key: string, value: T): Promise<Result<void>> {
		// Save to IndexedDB
	}

	// ... implement other methods
}

// Use it!
const adapter = new IndexedDBAdapter()
const persistence = createPersistenceService(adapter)
```

---

## Documentação em Português

### Visão Geral

O sistema de persistência é construído com três camadas principais:

1. **Camada de Tipos** (`types.ts`) - Interfaces TypeScript e enums para todos os dados do jogo
2. **Camada de Adaptadores** (`adapter.ts`, `adapters/`) - Interface abstrata e implementações para diferentes backends de armazenamento
3. **Camada de Serviço** (`persistence.service.ts`) - API de alto nível com getters/setters para operações do jogo

### Benefícios da Arquitetura

- ✅ **Migração Fácil**: Troque do localStorage para IndexedDB, Firebase, ou qualquer backend apenas mudando o adaptador
- ✅ **Type Safety**: Suporte completo ao TypeScript com autocomplete
- ✅ **Tratamento de Erros**: Tipo `Result<T>` para tratamento funcional de erros
- ✅ **Testabilidade**: Mock adapters para testes
- ✅ **Extensibilidade**: Adicione novos backends de armazenamento sem alterar o código do serviço

### Início Rápido

```typescript
import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'

// 1. Criar um adaptador
const adapter = new LocalStorageAdapter({
	prefix: 'meu_jogo_',
})

// 2. Criar o serviço de persistência
const persistence = createPersistenceService(adapter)

// 3. Inicializar (obrigatório antes do uso)
await persistence.init()

// 4. Use o serviço!
const result = await persistence.createPlayer('Herói')
if (result.success) {
	console.log('Jogador criado:', result.data)
}
```

### Exemplos de Uso

#### Criando um Novo Jogador

```typescript
// Criar um novo jogador com atributos padrão
const result = await persistence.createPlayer('Aventureiro')

if (result.success) {
	console.log('ID do Jogador:', result.data.id)
	console.log('Nível:', result.data.stats.level) // 1
	console.log('Ouro:', result.data.gold) // 0
}
```

#### Salvando e Carregando Dados do Jogador

```typescript
// Obter jogador atual
const playerResult = await persistence.getPlayerData()

if (playerResult.success && playerResult.data) {
	const player = playerResult.data

	// Atualizar atributos do jogador
	player.gold += 100
	player.stats.experience += 50

	// Salvar mudanças
	const saveResult = await persistence.setPlayerData(player)
	if (saveResult.success) {
		console.log('Dados do jogador salvos!')
	}
}
```

#### Gerenciando Estado do Jogo

```typescript
// Criar estado do jogo
const gameState = {
	playerId: 'player_123',
	currentLocation: 'entrada_masmorra',
	questProgress: {
		'quest_1': 1,
		'quest_2': 0,
	},
	playtime: 3600, // segundos
	lastSaveAt: Date.now(),
}

await persistence.setGameState(gameState)

// Carregar estado do jogo
const stateResult = await persistence.getGameState()
if (stateResult.success && stateResult.data) {
	console.log('Localização atual:', stateResult.data.currentLocation)
}
```

#### Gerenciamento de Slots de Salvamento

```typescript
// Salvar jogo no slot 1
const saveResult = await persistence.saveGame('slot_1')

if (saveResult.success) {
	console.log('Jogo salvo no slot:', saveResult.data.id)
	console.log('Jogador:', saveResult.data.playerName)
	console.log('Nível:', saveResult.data.level)
}

// Obter todos os slots de salvamento
const slotsResult = await persistence.getSaveSlots()
if (slotsResult.success) {
	for (const slot of slotsResult.data) {
		console.log(`${slot.playerName} - Nível ${slot.level} - ${slot.location}`)
	}
}

// Carregar jogo de um slot
const loadResult = await persistence.loadGame('slot_1')
if (loadResult.success) {
	console.log('Jogo carregado!')
	console.log('Jogador:', loadResult.data.player.name)
	console.log('Localização:', loadResult.data.state.currentLocation)
}

// Deletar um slot de salvamento
await persistence.deleteSaveSlot('slot_1')
```

#### Gerenciamento de Configurações

```typescript
// Obter configurações (retorna padrões se não existirem)
const settingsResult = await persistence.getSettings()
if (settingsResult.success) {
	console.log('Volume:', settingsResult.data.volume.master)
	console.log('Idioma:', settingsResult.data.locale)
}

// Atualizar configurações específicas
await persistence.updateSettings({
	locale: 'pt-BR',
	volume: {
		master: 0.8,
		music: 0.6,
		sfx: 0.8,
	},
})
```

#### Tratamento de Erros

```typescript
const result = await persistence.getPlayerData()

if (!result.success) {
	console.error('Erro:', result.error.message)
	// Tratar erro apropriadamente
	return
}

// Seguro usar result.data aqui
const player = result.data
if (player) {
	console.log('Jogador encontrado:', player.name)
} else {
	console.log('Nenhum dado de jogador existe')
}
```

#### Usando em Componentes Svelte

```svelte
<script lang="ts">
	import { onMount } from 'svelte'
	import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'
	import type { PlayerData } from '$lib/persistence'

	let persistence = $state(createPersistenceService(new LocalStorageAdapter()))
	let player = $state<PlayerData | null>(null)
	let loading = $state(true)

	onMount(async () => {
		// Inicializar persistência
		await persistence.init()

		// Verificar se o salvamento existe
		const hasData = await persistence.hasSaveData()

		if (hasData.success && hasData.data) {
			// Carregar jogador existente
			const result = await persistence.getPlayerData()
			if (result.success) {
				player = result.data
			}
		}

		loading = false
	})

	async function createNewGame() {
		const result = await persistence.createPlayer('Herói')
		if (result.success) {
			player = result.data
		}
	}

	async function saveGame() {
		const result = await persistence.saveGame('auto_save')
		if (result.success) {
			alert('Jogo salvo!')
		}
	}
</script>

{#if loading}
	<p>Carregando...</p>
{:else if player}
	<div>
		<h1>{player.name}</h1>
		<p>Nível: {player.stats.level}</p>
		<p>Ouro: {player.gold}</p>
		<button onclick={saveGame}>Salvar Jogo</button>
	</div>
{:else}
	<button onclick={createNewGame}>Novo Jogo</button>
{/if}
```

### Futuro: Adicionando Novos Adaptadores

Para adicionar um novo backend de armazenamento (ex: IndexedDB), apenas implemente a interface `StorageAdapter`:

```typescript
import type { StorageAdapter, StorageAdapterConfig } from '$lib/persistence'

export class IndexedDBAdapter implements StorageAdapter {
	async init(): Promise<Result<void>> {
		// Inicializar IndexedDB
	}

	async get<T>(key: string): Promise<Result<T | null>> {
		// Obter do IndexedDB
	}

	async set<T>(key: string, value: T): Promise<Result<void>> {
		// Salvar no IndexedDB
	}

	// ... implementar outros métodos
}

// Use-o!
const adapter = new IndexedDBAdapter()
const persistence = createPersistenceService(adapter)
```

---

## API Reference

### PersistenceService

| Method | Description (EN) | Descrição (PT-BR) |
|--------|------------------|-------------------|
| `init()` | Initialize the service | Inicializar o serviço |
| `getPlayerData()` | Get player data | Obter dados do jogador |
| `setPlayerData(data)` | Save player data | Salvar dados do jogador |
| `createPlayer(name)` | Create new player | Criar novo jogador |
| `deletePlayerData()` | Delete player data | Deletar dados do jogador |
| `getGameState()` | Get game state | Obter estado do jogo |
| `setGameState(state)` | Save game state | Salvar estado do jogo |
| `deleteGameState()` | Delete game state | Deletar estado do jogo |
| `getSettings()` | Get settings | Obter configurações |
| `setSettings(settings)` | Save settings | Salvar configurações |
| `updateSettings(partial)` | Update specific settings | Atualizar configurações específicas |
| `getSaveSlots()` | Get all save slots | Obter todos os slots de salvamento |
| `getSaveSlot(id)` | Get specific save slot | Obter slot específico |
| `saveGame(slotId)` | Save game to slot | Salvar jogo no slot |
| `loadGame(slotId)` | Load game from slot | Carregar jogo do slot |
| `deleteSaveSlot(id)` | Delete save slot | Deletar slot de salvamento |
| `clearAllData()` | Clear all data | Limpar todos os dados |
| `getStorageSize()` | Get storage size | Obter tamanho do armazenamento |
| `hasSaveData()` | Check if save exists | Verificar se salvamento existe |
| `exportData()` | Export to JSON | Exportar para JSON |
| `importData(json)` | Import from JSON | Importar do JSON |

### StorageAdapter Interface

All adapters must implement / Todos adaptadores devem implementar:

- `init(): Promise<Result<void>>`
- `get<T>(key): Promise<Result<T | null>>`
- `set<T>(key, value): Promise<Result<void>>`
- `remove(key): Promise<Result<void>>`
- `clear(): Promise<Result<void>>`
- `has(key): Promise<Result<boolean>>`
- `keys(): Promise<Result<string[]>>`
- `getSize(): Promise<Result<number | null>>`
