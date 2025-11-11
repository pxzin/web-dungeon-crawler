/**
 * Item Content Data
 * Definitions for all items in the game
 */

import {
	ItemType,
	ItemRarity,
	EquipmentSlot,
	type EquippableItem,
	type ConsumableItem,
	type BaseItem,
	type Item,
} from '$lib/game/items/types'

/**
 * Weapons
 */

const shortSword: EquippableItem = {
	id: 'short_sword',
	name: 'Short Sword',
	description: 'A basic iron short sword. Reliable for beginners.',
	type: ItemType.WEAPON,
	rarity: ItemRarity.COMMON,
	value: 50,
	stackable: false,
	iconId: 'longsword',
	slot: EquipmentSlot.MAIN_HAND,
	requiredLevel: 1,
	durability: {
		current: 50,
		max: 50,
	},
	stats: {
		attack: 8,
		criticalRate: 5,
	},
}

/**
 * Armor
 */

const woodenShield: EquippableItem = {
	id: 'wooden_shield',
	name: 'Wooden Shield',
	description: 'A simple wooden shield. Better than nothing.',
	type: ItemType.ARMOR,
	rarity: ItemRarity.COMMON,
	value: 30,
	stackable: false,
	iconId: 'wooden_shield',
	slot: EquipmentSlot.OFF_HAND,
	requiredLevel: 1,
	durability: {
		current: 40,
		max: 40,
	},
	stats: {
		defense: 5,
	},
}

const leatherArmor: EquippableItem = {
	id: 'leather_armor',
	name: 'Leather Armor',
	description: 'Light leather armor. Provides basic protection without hindering movement.',
	type: ItemType.ARMOR,
	rarity: ItemRarity.COMMON,
	value: 80,
	stackable: false,
	iconId: 'leather_armour',
	slot: EquipmentSlot.CHEST,
	requiredLevel: 1,
	durability: {
		current: 60,
		max: 60,
	},
	stats: {
		defense: 8,
		evasion: 2,
	},
}

/**
 * Consumables
 */

const healingPotionWeak: ConsumableItem = {
	id: 'healing_potion_weak',
	name: 'Weak Healing Potion',
	description: 'A small vial of red liquid. Restores a small amount of health.',
	type: ItemType.CONSUMABLE,
	rarity: ItemRarity.COMMON,
	value: 15,
	stackable: true,
	maxStack: 99,
	iconId: 'potion_red',
	effect: {
		hpRestore: 30,
	},
	usableInCombat: true,
}

/**
 * Special Items (Virtual Currency)
 */

const goldCoins: BaseItem = {
	id: 'gold_coins',
	name: 'Gold Coins',
	description: 'The standard currency of the realm.',
	type: ItemType.MATERIAL,
	rarity: ItemRarity.COMMON,
	value: 1,
	stackable: true,
	maxStack: 999999,
	iconId: 'gold_coin_stack',
}

/**
 * Item database
 * Maps item IDs to their definitions
 */
export const ITEMS = new Map<string, Item>([
	[shortSword.id, shortSword],
	[woodenShield.id, woodenShield],
	[leatherArmor.id, leatherArmor],
	[healingPotionWeak.id, healingPotionWeak],
	[goldCoins.id, goldCoins],
])

/**
 * Get item by ID
 */
export function getItem(id: string): Item | undefined {
	return ITEMS.get(id)
}

/**
 * Get all items
 */
export function getAllItems(): Item[] {
	return Array.from(ITEMS.values())
}

/**
 * Get items by type
 */
export function getItemsByType(type: ItemType): Item[] {
	return getAllItems().filter((item) => item.type === type)
}

/**
 * Get items by rarity
 */
export function getItemsByRarity(rarity: ItemRarity): Item[] {
	return getAllItems().filter((item) => item.rarity === rarity)
}
