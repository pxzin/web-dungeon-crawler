/**
 * Dungeon System - Main Entry Point
 * Export all dungeon-related types and utilities
 */

export type {
	Dungeon,
	DungeonConfig,
	DungeonTemplate,
	Room,
	EnemySpawn,
	ChestSpawn,
	DifficultyConfig,
} from './types'

export { TileType, DungeonDifficulty } from './types'

export { generateDungeon, getTileChar, printDungeon } from './generator'

export {
	DUNGEON_TEMPLATES,
	getDungeonTemplate,
	getAllDungeonTemplates,
	getDungeonsByLevel,
} from '../../content/dungeons'
