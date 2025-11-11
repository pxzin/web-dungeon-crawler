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

/**
 * Full character data for display purposes
 * Combines player data with additional UI information
 */
export interface Character {
	id: string
	name: string
	portraitId: string
	class?: string
	classIcon?: string
	classDescription?: string
	level: number
	experience: number
	experienceToNextLevel: number
	health: number
	maxHealth: number
	mana: number
	maxMana: number
	stamina?: number
	maxStamina?: number
	// Attributes
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
	luck?: number
	// Combat stats (optional)
	attack?: number
	defense?: number
	magicAttack?: number
	magicDefense?: number
	speed?: number
	criticalRate?: number
	evasion?: number
	// Status effects
	statusEffects?: Array<{
		id: string
		name: string
		icon: string
		type: 'buff' | 'debuff'
		duration?: number
		description: string
	}>
}
