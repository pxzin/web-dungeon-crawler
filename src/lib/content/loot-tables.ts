/**
 * Loot Table Content Data
 * Definitions for all loot tables in the game
 */

import type { LootTable } from '$lib/game/items/types'

/**
 * Goblin Common Loot
 * Used by regular goblin enemies (Scout, Brute, Shaman)
 */
const goblinCommonLoot: LootTable = {
	id: 'goblin_common_loot',
	entries: [
		{
			itemId: 'gold_coins',
			quantity: [5, 10], // 5-10 gold coins
			chance: 0.8, // 80% chance
		},
		{
			itemId: 'healing_potion_weak',
			quantity: 1,
			chance: 0.15, // 15% chance
		},
		{
			itemId: 'leather_armor',
			quantity: 1,
			chance: 0.03, // 3% chance
		},
		{
			itemId: 'wooden_shield',
			quantity: 1,
			chance: 0.05, // 5% chance
		},
	],
}

/**
 * Goblin King Loot
 * Better rewards from the boss
 */
const goblinKingLoot: LootTable = {
	id: 'goblin_king_loot',
	entries: [
		{
			itemId: 'gold_coins',
			quantity: [40, 60], // 40-60 gold coins (guaranteed boss reward)
			chance: 1.0, // 100% chance
		},
		{
			itemId: 'short_sword',
			quantity: 1,
			chance: 0.5, // 50% chance
		},
		{
			itemId: 'leather_armor',
			quantity: 1,
			chance: 0.6, // 60% chance
		},
		{
			itemId: 'wooden_shield',
			quantity: 1,
			chance: 0.4, // 40% chance
		},
		{
			itemId: 'healing_potion_weak',
			quantity: [2, 4], // 2-4 potions
			chance: 0.7, // 70% chance
		},
	],
}

/**
 * Loot table database
 * Maps loot table IDs to their definitions
 */
export const LOOT_TABLES = new Map<string, LootTable>([
	[goblinCommonLoot.id, goblinCommonLoot],
	[goblinKingLoot.id, goblinKingLoot],
])

/**
 * Get loot table by ID
 */
export function getLootTable(id: string): LootTable | undefined {
	return LOOT_TABLES.get(id)
}

/**
 * Get all loot tables
 */
export function getAllLootTables(): LootTable[] {
	return Array.from(LOOT_TABLES.values())
}

/**
 * Roll for loot from a loot table
 * Returns array of items that were successfully rolled
 */
export function rollLoot(lootTableId: string): Array<{ itemId: string; quantity: number }> {
	const lootTable = getLootTable(lootTableId)
	if (!lootTable) {
		console.warn(`Loot table not found: ${lootTableId}`)
		return []
	}

	const results: Array<{ itemId: string; quantity: number }> = []

	for (const entry of lootTable.entries) {
		// Roll for this entry
		if (Math.random() <= entry.chance) {
			// Determine quantity
			let quantity: number
			if (typeof entry.quantity === 'number') {
				quantity = entry.quantity
			} else {
				// Random between min and max (inclusive)
				const [min, max] = entry.quantity
				quantity = Math.floor(Math.random() * (max - min + 1)) + min
			}

			results.push({
				itemId: entry.itemId,
				quantity,
			})
		}
	}

	return results
}
