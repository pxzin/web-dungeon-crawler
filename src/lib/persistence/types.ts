/**
 * Persistence Layer Types
 * Type-safe definitions for game data storage
 */

/**
 * Generic result type for async operations
 */
export type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E }

/**
 * Storage keys for different data types
 */
export enum StorageKey {
	PLAYER_DATA = 'player_data',
	GAME_STATE = 'game_state',
	SETTINGS = 'settings',
	SAVE_SLOTS = 'save_slots',
}

/**
 * Player statistics and attributes
 */
export interface PlayerStats {
	// Base attributes
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
	luck: number

	// Level and progression
	level: number
	experience: number
	experienceToNextLevel: number

	// Resources (max values)
	health: number
	maxHealth: number
	mana: number
	maxMana: number
	stamina: number
	maxStamina: number

	// Combat stats
	attack: number
	defense: number
	magicAttack: number
	magicDefense: number
	speed: number
	criticalRate: number
	evasion: number
}

/**
 * Player resources (health, mana, etc.)
 */
export interface PlayerResources {
	health: number
	maxHealth: number
	mana: number
	maxMana: number
	stamina: number
	maxStamina: number
}

/**
 * Player data structure
 */
export interface PlayerData {
	id: string
	name: string
	portraitId: string
	class?: string // Character class (warrior, mage, rogue, cleric)
	stats: PlayerStats
	resources: PlayerResources
	gold: number
	inventory?: Array<{ itemId: string; quantity: number }>
	equipment?: Record<string, string> // slot -> itemId
	createdAt: number
	updatedAt: number
}

/**
 * Game state (current location, progress, etc.)
 */
export interface GameState {
	playerId: string
	currentLocation: string
	questProgress: Record<string, number>
	discoveredLocations: string[]
	completedQuests: string[]
	playtime: number
	lastSaveAt: number
}

/**
 * Game settings
 */
export interface GameSettings {
	locale: 'en' | 'pt-BR'
	volume: {
		master: number
		music: number
		sfx: number
	}
	graphics: {
		quality: 'low' | 'medium' | 'high'
		particles: boolean
	}
	controls: {
		keyboardEnabled: boolean
		gamepadEnabled: boolean
	}
}

/**
 * Save slot metadata
 */
export interface SaveSlot {
	id: string
	playerName: string
	level: number
	location: string
	playtime: number
	timestamp: number
	thumbnail?: string
}

/**
 * Complete save data
 */
export interface SaveData {
	player: PlayerData
	state: GameState
}
