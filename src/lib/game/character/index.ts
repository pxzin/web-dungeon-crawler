/**
 * Character System - Main Entry Point
 * Export all character-related types, constants, and utilities
 */

// Types
export type {
	CharacterAttributes,
	ClassBaseStats,
	CharacterCreationData,
	CharacterCreationErrors,
	Character,
} from './types'

export { CharacterClass, AttributeName } from './types'

// Constants and utilities
export {
	TOTAL_ATTRIBUTE_POINTS,
	MIN_ATTRIBUTE_VALUE,
	MAX_ATTRIBUTE_VALUE,
	NAME_MIN_LENGTH,
	NAME_MAX_LENGTH,
	CLASS_BASE_STATS,
	calculateAttributePoints,
	calculateRemainingPoints,
	validateCharacterName,
} from './constants'
