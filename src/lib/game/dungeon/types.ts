/**
 * Dungeon System Types
 * Defines all types related to dungeon generation and exploration
 */

/**
 * Dungeon tile types
 */
export enum TileType {
	EMPTY = 0,
	FLOOR = 1,
	WALL = 2,
	DOOR = 3,
	CORRIDOR = 4,
	ENTRANCE = 5,
	EXIT = 6,
	CHEST = 7,
	ENEMY = 8,
}

/**
 * Room structure
 */
export interface Room {
	id: string
	x: number
	y: number
	width: number
	height: number
	centerX: number
	centerY: number
	connected: boolean
	hasEntrance?: boolean
	hasExit?: boolean
	enemies?: EnemySpawn[]
	chests?: ChestSpawn[]
}

/**
 * Enemy spawn point
 */
export interface EnemySpawn {
	x: number
	y: number
	enemyType: string
	level: number
}

/**
 * Chest spawn point
 */
export interface ChestSpawn {
	x: number
	y: number
	lootTable: string
	rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
}

/**
 * Dungeon configuration
 */
export interface DungeonConfig {
	width: number
	height: number
	minRooms: number
	maxRooms: number
	minRoomSize: number
	maxRoomSize: number
	dungeonLevel: number
	seed?: number
}

/**
 * Complete dungeon structure
 */
export interface Dungeon {
	id: string
	config: DungeonConfig
	tiles: TileType[][]
	rooms: Room[]
	entrance: { x: number; y: number }
	exit: { x: number; y: number }
	explored: boolean[][]
	playerPosition?: { x: number; y: number }
	createdAt: number
}

/**
 * Dungeon difficulty levels
 */
export enum DungeonDifficulty {
	EASY = 'easy',
	NORMAL = 'normal',
	HARD = 'hard',
	NIGHTMARE = 'nightmare',
}

/**
 * Difficulty configuration
 */
export interface DifficultyConfig {
	enemyCount: number
	enemyLevelModifier: number
	chestCount: number
	chestRarityBonus: number
}

/**
 * Dungeon template configuration
 * High-level configuration for a specific dungeon type
 */
export interface DungeonTemplate {
	id: string
	name: string
	description: string
	recommendedLevel: {
		min: number
		max: number
	}
	floorCount: number
	possibleMonsters: string[] // Monster IDs
	boss?: string // Boss monster ID
	theme?: string
	iconId?: string
	generationConfig: DungeonConfig
}
