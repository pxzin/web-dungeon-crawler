/**
 * Character Stats Calculator
 * Calculates character stats including equipment bonuses
 */

import type { Character } from './types'
import type { EquippableItem, ItemStats } from '$lib/game/items/types'
import type { InventoryManager } from '$lib/hooks/useInventory.svelte'

export interface CalculatedStats {
	// Base attributes with equipment bonuses
	strength: number
	dexterity: number
	intelligence: number
	vitality: number
	luck: number

	// Derived combat stats
	maxHealth: number
	maxMana: number
	attack: number
	defense: number
	magicAttack: number
	magicDefense: number
	speed: number
	criticalRate: number
	evasion: number

	// Equipment bonuses (for display)
	equipmentBonuses: ItemStats
}

/**
 * Calculate total stats from all equipped items
 */
export function calculateEquipmentStats(equipment: Record<string, EquippableItem>): ItemStats {
	const totalStats: ItemStats = {}

	for (const item of Object.values(equipment)) {
		if (!item || !item.stats) continue

		// Sum all stat bonuses
		for (const [stat, value] of Object.entries(item.stats)) {
			if (typeof value === 'number') {
				totalStats[stat as keyof ItemStats] = (totalStats[stat as keyof ItemStats] || 0) + value
			}
		}
	}

	return totalStats
}

/**
 * Calculate character's total stats including equipment
 */
export function calculateCharacterStats(
	character: Character,
	inventoryManager: InventoryManager
): CalculatedStats {
	// Get equipment bonuses
	const equipmentBonuses = calculateEquipmentStats(inventoryManager.equipment)

	// Calculate total attributes (base + equipment)
	const strength = character.strength + (equipmentBonuses.strength || 0)
	const dexterity = character.dexterity + (equipmentBonuses.dexterity || 0)
	const intelligence = character.intelligence + (equipmentBonuses.intelligence || 0)
	const vitality = character.vitality + (equipmentBonuses.vitality || 0)
	const luck = (character.luck || 0) + (equipmentBonuses.luck || 0)

	// Calculate derived stats
	const vitalityBonus = Math.floor((vitality - 10) / 2)
	const intelligenceBonus = Math.floor((intelligence - 10) / 2)

	// Base HP/MP from character, plus vitality/intelligence bonuses, plus equipment bonuses
	const maxHealth =
		character.maxHealth + vitalityBonus * 5 + (equipmentBonuses.hpBonus || 0)
	const maxMana =
		character.maxMana + intelligenceBonus * 3 + (equipmentBonuses.mpBonus || 0)

	// Combat stats (base calculation + equipment bonuses)
	const attack =
		strength * 2 + character.level + (equipmentBonuses.attack || 0)
	const defense =
		Math.floor(vitality * 1.5 + character.level * 0.5) +
		(equipmentBonuses.defense || 0)
	const magicAttack =
		intelligence * 2 + character.level + (equipmentBonuses.magicAttack || 0)
	const magicDefense =
		Math.floor(intelligence * 1.5 + character.level * 0.5) +
		(equipmentBonuses.magicDefense || 0)
	const speed =
		Math.floor(dexterity * 1.5 + character.level * 0.3) +
		(equipmentBonuses.speed || 0)
	const criticalRate =
		Math.floor(dexterity * 0.5 + character.level * 0.2 + luck * 0.3) +
		(equipmentBonuses.criticalRate || 0)
	const evasion =
		Math.floor(dexterity * 0.3 + character.level * 0.1 + luck * 0.2) +
		(equipmentBonuses.evasion || 0)

	return {
		strength,
		dexterity,
		intelligence,
		vitality,
		luck,
		maxHealth,
		maxMana,
		attack,
		defense,
		magicAttack,
		magicDefense,
		speed,
		criticalRate,
		evasion,
		equipmentBonuses,
	}
}
