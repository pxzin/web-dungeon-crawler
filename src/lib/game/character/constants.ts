/**
 * Character System Constants
 * Game balance numbers and base stats for character classes
 */

import type { ClassBaseStats } from './types'
import { CharacterClass } from './types'

/**
 * Total attribute points available for distribution
 * during character creation
 */
export const TOTAL_ATTRIBUTE_POINTS = 20

/**
 * Minimum attribute value
 * Players can lower attributes to this value when redistributing points
 */
export const MIN_ATTRIBUTE_VALUE = 1

/**
 * Maximum attribute value during character creation
 */
export const MAX_ATTRIBUTE_VALUE = 15

/**
 * Character name validation
 */
export const NAME_MIN_LENGTH = 3
export const NAME_MAX_LENGTH = 20

/**
 * Base stats for each character class
 * These define the starting values when a player selects a class
 */
export const CLASS_BASE_STATS: Record<CharacterClass, ClassBaseStats> = {
	[CharacterClass.WARRIOR]: {
		attributes: {
			strength: 7,  // High physical power
			dexterity: 4,
			intelligence: 3,
			vitality: 6,  // High durability
		},
		health: 120,
		mana: 30,
		stamina: 100,
	},
	[CharacterClass.MAGE]: {
		attributes: {
			strength: 3,
			dexterity: 4,
			intelligence: 8,  // High magical power
			vitality: 5,
		},
		health: 80,
		mana: 100,
		stamina: 80,
	},
	[CharacterClass.ROGUE]: {
		attributes: {
			strength: 5,
			dexterity: 8,  // High agility
			intelligence: 4,
			vitality: 3,
		},
		health: 90,
		mana: 50,
		stamina: 120,
	},
	[CharacterClass.CLERIC]: {
		attributes: {
			strength: 4,
			dexterity: 4,
			intelligence: 6,  // Good magical power
			vitality: 6,      // Good durability
		},
		health: 100,
		mana: 80,
		stamina: 90,
	},
}

/**
 * Calculate total points spent on attributes
 */
export function calculateAttributePoints(attributes: {
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
}): number {
	return attributes.strength + attributes.dexterity + attributes.intelligence + attributes.vitality
}

/**
 * Calculate remaining attribute points
 */
export function calculateRemainingPoints(attributes: {
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
}): number {
	return TOTAL_ATTRIBUTE_POINTS - calculateAttributePoints(attributes)
}

/**
 * Validate character name
 */
export function validateCharacterName(name: string): string | null {
	if (!name || name.trim().length === 0) {
		return 'nameRequired'
	}

	if (name.trim().length < NAME_MIN_LENGTH) {
		return 'nameTooShort'
	}

	if (name.trim().length > NAME_MAX_LENGTH) {
		return 'nameTooLong'
	}

	return null
}
