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
export const TOTAL_ATTRIBUTE_POINTS = 27  // Increased from 20 to match stronger base stats

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
			strength: 9,  // High physical power (increased from 7)
			dexterity: 5,  // Increased from 4
			intelligence: 3,
			vitality: 8,  // High durability (increased from 6)
		},
		health: 150,  // Increased from 120
		mana: 30,
		stamina: 100,
	},
	[CharacterClass.MAGE]: {
		attributes: {
			strength: 4,  // Increased from 3
			dexterity: 5,  // Increased from 4
			intelligence: 10,  // High magical power (increased from 8)
			vitality: 6,  // Increased from 5
		},
		health: 100,  // Increased from 80
		mana: 120,  // Increased from 100
		stamina: 80,
	},
	[CharacterClass.ROGUE]: {
		attributes: {
			strength: 7,  // Increased from 5
			dexterity: 10,  // High agility (increased from 8)
			intelligence: 5,  // Increased from 4
			vitality: 5,  // Increased from 3
		},
		health: 110,  // Increased from 90
		mana: 50,
		stamina: 120,
	},
	[CharacterClass.CLERIC]: {
		attributes: {
			strength: 5,  // Increased from 4
			dexterity: 5,  // Increased from 4
			intelligence: 8,  // Good magical power (increased from 6)
			vitality: 7,  // Good durability (increased from 6)
		},
		health: 120,  // Increased from 100
		mana: 100,  // Increased from 80
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
