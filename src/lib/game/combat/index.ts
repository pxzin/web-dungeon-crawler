/**
 * Combat System - Main Entry Point
 * Export all combat-related types and utilities
 */

export type {
	Combat,
	Combatant,
	CombatAction,
	CombatActionResult,
	CombatTurn,
	CombatRewards,
	StatusEffect,
	EnemyTemplate,
} from './types'

export { CombatState, CombatActionType } from './types'

export { initializeCombat, processCombatAction, processEnemyTurn } from './combat-engine'

export { characterToCombatant } from './character-to-combatant'
