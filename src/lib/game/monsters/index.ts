/**
 * Monsters System - Main Entry Point
 * Export all monster-related types and data
 */

export type { Monster, MonsterStats, MonsterInstance } from './types'

export {
	MONSTERS,
	getMonster,
	getAllMonsters,
	getMonstersByLevel,
	getBossMonsters,
} from '$lib/content/monsters'
