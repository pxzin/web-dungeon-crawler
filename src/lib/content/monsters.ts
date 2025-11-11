/**
 * Monster Content Data
 * Definitions for all monsters in the game
 */

import type { Monster } from '$lib/game/monsters/types'

/**
 * Calculate derived combat stats from base stats
 */
function calculateMonsterStats(
	level: number,
	stats: { strength: number; dexterity: number; intelligence: number; vitality: number }
): {
	health: number
	mana: number
	attack: number
	defense: number
	magicAttack: number
	magicDefense: number
	speed: number
	criticalRate: number
	evasion: number
} {
	const levelMultiplier = 1 + level * 0.1

	return {
		health: Math.floor((stats.vitality * 10 + level * 5) * levelMultiplier),
		mana: Math.floor((stats.intelligence * 5 + level * 3) * levelMultiplier),
		attack: Math.floor((stats.strength * 2 + level) * levelMultiplier),
		defense: Math.floor((stats.vitality * 1.5 + level * 0.5) * levelMultiplier),
		magicAttack: Math.floor((stats.intelligence * 2 + level) * levelMultiplier),
		magicDefense: Math.floor((stats.intelligence * 1.5 + level * 0.5) * levelMultiplier),
		speed: Math.floor((stats.dexterity * 1.5 + level * 0.3) * levelMultiplier),
		criticalRate: Math.floor(stats.dexterity * 0.5 + level * 0.2),
		evasion: Math.floor(stats.dexterity * 0.3 + level * 0.1),
	}
}

/**
 * Goblin Scout - Weak and fast common enemy
 */
const goblinScout: Monster = {
	id: 'goblin_scout',
	name: 'Goblin Scout',
	level: 1,
	portraitId: 'monster_goblin_scout',
	stats: {
		strength: 6,
		dexterity: 10,
		intelligence: 4,
		vitality: 7,
	},
	abilities: ['basic_attack', 'quick_strike'],
	lootTableId: 'goblin_common_loot',
	description: 'A small, swift goblin scout. Quick but fragile.',
	isBoss: false,
	experienceReward: 25,
	goldReward: 5,
	...calculateMonsterStats(1, { strength: 6, dexterity: 10, intelligence: 4, vitality: 7 }),
}

/**
 * Goblin Brute - Stronger with more health
 */
const goblinBrute: Monster = {
	id: 'goblin_brute',
	name: 'Goblin Brute',
	level: 2,
	portraitId: 'monster_goblin_brute',
	stats: {
		strength: 12,
		dexterity: 6,
		intelligence: 3,
		vitality: 14,
	},
	abilities: ['basic_attack', 'power_strike'],
	lootTableId: 'goblin_common_loot',
	description: 'A hulking goblin warrior. Slow but powerful.',
	isBoss: false,
	experienceReward: 40,
	goldReward: 8,
	...calculateMonsterStats(2, { strength: 12, dexterity: 6, intelligence: 3, vitality: 14 }),
}

/**
 * Goblin Shaman - Can use simple magic abilities
 */
const goblinShaman: Monster = {
	id: 'goblin_shaman',
	name: 'Goblin Shaman',
	level: 3,
	portraitId: 'monster_goblin_shaman',
	stats: {
		strength: 5,
		dexterity: 8,
		intelligence: 12,
		vitality: 9,
	},
	abilities: ['basic_attack', 'fire_bolt', 'minor_heal'],
	lootTableId: 'goblin_common_loot',
	description: 'A cunning goblin spellcaster. Uses fire magic and can heal allies.',
	isBoss: false,
	experienceReward: 60,
	goldReward: 12,
	...calculateMonsterStats(3, { strength: 5, dexterity: 8, intelligence: 12, vitality: 9 }),
}

/**
 * Goblin King - Boss of the Goblin Cave
 */
const goblinKing: Monster = {
	id: 'goblin_king',
	name: 'Goblin King',
	level: 5,
	portraitId: 'monster_goblin_king',
	stats: {
		strength: 16,
		dexterity: 12,
		intelligence: 10,
		vitality: 20,
	},
	abilities: ['basic_attack', 'power_strike', 'rally_troops', 'crushing_blow'],
	lootTableId: 'goblin_king_loot',
	description:
		'The tyrannical ruler of the goblin cave. A formidable warrior who commands his subjects with an iron fist.',
	isBoss: true,
	experienceReward: 200,
	goldReward: 50,
	...calculateMonsterStats(5, { strength: 16, dexterity: 12, intelligence: 10, vitality: 20 }),
}

/**
 * Monster database
 * Maps monster IDs to their definitions
 */
export const MONSTERS = new Map<string, Monster>([
	[goblinScout.id, goblinScout],
	[goblinBrute.id, goblinBrute],
	[goblinShaman.id, goblinShaman],
	[goblinKing.id, goblinKing],
])

/**
 * Get monster by ID
 */
export function getMonster(id: string): Monster | undefined {
	return MONSTERS.get(id)
}

/**
 * Get all monsters
 */
export function getAllMonsters(): Monster[] {
	return Array.from(MONSTERS.values())
}

/**
 * Get monsters by level range
 */
export function getMonstersByLevel(minLevel: number, maxLevel: number): Monster[] {
	return getAllMonsters().filter((m) => m.level >= minLevel && m.level <= maxLevel)
}

/**
 * Get boss monsters
 */
export function getBossMonsters(): Monster[] {
	return getAllMonsters().filter((m) => m.isBoss)
}
