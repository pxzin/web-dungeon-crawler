/**
 * Character System Types
 * Defines all types related to character creation and management
 */

/**
 * Available character classes
 */
export enum CharacterClass {
	WARRIOR = 'warrior',
	MAGE = 'mage',
	ROGUE = 'rogue',
	CLERIC = 'cleric',
}

/**
 * Base attribute names
 * These are the primary stats that define a character
 */
export enum AttributeName {
	STRENGTH = 'strength',
	DEXTERITY = 'dexterity',
	INTELLIGENCE = 'intelligence',
	VITALITY = 'vitality',
}

/**
 * Character attributes (stats)
 */
export interface CharacterAttributes {
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
}

/**
 * Base stats for each character class
 * These are the starting values when a class is selected
 */
export interface ClassBaseStats {
	attributes: CharacterAttributes
	health: number
	mana: number
	stamina: number
}

/**
 * Character creation form data
 */
export interface CharacterCreationData {
	name: string
	portraitId: string
	class: CharacterClass | null
	attributes: CharacterAttributes
}

/**
 * Validation errors for character creation
 */
export interface CharacterCreationErrors {
	name?: string
	class?: string
	attributes?: string
}
