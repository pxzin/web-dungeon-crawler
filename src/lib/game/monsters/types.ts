/**
 * Monster System Types
 * Defines all types related to monsters and enemies
 */

/**
 * Monster stats structure
 */
export interface MonsterStats {
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
}

/**
 * Monster definition/template
 */
export interface Monster {
	id: string
	name: string
	level: number
	portraitId?: string
	stats: MonsterStats
	abilities: string[]
	lootTableId: string
	// Derived combat stats (calculated from base stats)
	health: number
	mana: number
	attack: number
	defense: number
	magicAttack: number
	magicDefense: number
	speed: number
	criticalRate: number
	evasion: number
	// Additional metadata
	description?: string
	isBoss?: boolean
	experienceReward: number
	goldReward: number
}

/**
 * Monster instance (spawned in dungeon/combat)
 */
export interface MonsterInstance extends Monster {
	instanceId: string
	currentHealth: number
	currentMana: number
	statusEffects: Array<{
		id: string
		name: string
		duration: number
	}>
}
