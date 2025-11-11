/**
 * Character to Combatant Converter
 * Converts a Character with equipment to a Combatant for combat
 */

import type { Combatant } from './types'
import type { Character } from '$lib/game/character/types'
import type { InventoryManager } from '$lib/hooks/useInventory.svelte'
import { calculateCharacterStats } from '$lib/game/character/stats-calculator'

/**
 * Convert a Character (with equipment) to a Combatant for combat
 */
export function characterToCombatant(
	character: Character,
	inventoryManager: InventoryManager
): Combatant {
	// Calculate stats including equipment bonuses
	const totalStats = calculateCharacterStats(character, inventoryManager)

	return {
		id: character.id,
		name: character.name,
		type: 'player',
		class: character.class,
		level: character.level,
		maxHp: totalStats.maxHealth,
		currentHp: character.health,
		maxMp: totalStats.maxMana,
		currentMp: character.mana,
		attack: totalStats.attack,
		defense: totalStats.defense,
		magicAttack: totalStats.magicAttack,
		magicDefense: totalStats.magicDefense,
		speed: totalStats.speed,
		criticalRate: totalStats.criticalRate,
		evasion: totalStats.evasion,
		statusEffects: [],
		portraitId: character.portraitId,
		// Base attributes with equipment bonuses for UI
		strength: totalStats.strength,
		dexterity: totalStats.dexterity,
		intelligence: totalStats.intelligence,
		vitality: totalStats.vitality,
	}
}
