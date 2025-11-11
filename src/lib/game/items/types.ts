/**
 * Item System Types
 * Defines all types related to items, equipment, and inventory
 */

/**
 * Item rarity levels
 */
export enum ItemRarity {
	COMMON = 'common',
	UNCOMMON = 'uncommon',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary',
}

/**
 * Item types
 */
export enum ItemType {
	WEAPON = 'weapon',
	ARMOR = 'armor',
	ACCESSORY = 'accessory',
	CONSUMABLE = 'consumable',
	MATERIAL = 'material',
	QUEST = 'quest',
}

/**
 * Equipment slots
 */
export enum EquipmentSlot {
	MAIN_HAND = 'main_hand',
	OFF_HAND = 'off_hand',
	HEAD = 'head',
	CHEST = 'chest',
	LEGS = 'legs',
	FEET = 'feet',
	HANDS = 'hands',
	NECK = 'neck',
	RING_1 = 'ring_1',
	RING_2 = 'ring_2',
}

/**
 * Durability structure
 */
export interface Durability {
	current: number
	max: number
}

/**
 * Item stat bonuses
 */
export interface ItemStats {
	strength?: number
	dexterity?: number
	intelligence?: number
	vitality?: number
	luck?: number
	attack?: number
	defense?: number
	magicAttack?: number
	magicDefense?: number
	speed?: number
	criticalRate?: number
	evasion?: number
	hpBonus?: number
	mpBonus?: number
}

/**
 * Base item interface
 */
export interface BaseItem {
	id: string
	name: string
	description: string
	type: ItemType
	rarity: ItemRarity
	value: number
	stackable: boolean
	maxStack?: number
	iconId?: string
}

/**
 * Equippable item
 */
export interface EquippableItem extends BaseItem {
	type: ItemType.WEAPON | ItemType.ARMOR | ItemType.ACCESSORY
	slot: EquipmentSlot
	requiredLevel: number
	durability: Durability
	stats: ItemStats
}

/**
 * Consumable item
 */
export interface ConsumableItem extends BaseItem {
	type: ItemType.CONSUMABLE
	effect: {
		hpRestore?: number
		mpRestore?: number
		removeStatusEffects?: boolean
		applyStatusEffect?: string
	}
	usableInCombat: boolean
}

/**
 * General item type (union)
 */
export type Item = EquippableItem | ConsumableItem | BaseItem

/**
 * Inventory slot
 */
export interface InventorySlot {
	item: Item
	quantity: number
	isEquipped?: boolean
}

/**
 * Player equipment
 */
export interface Equipment {
	[EquipmentSlot.MAIN_HAND]?: EquippableItem
	[EquipmentSlot.OFF_HAND]?: EquippableItem
	[EquipmentSlot.HEAD]?: EquippableItem
	[EquipmentSlot.CHEST]?: EquippableItem
	[EquipmentSlot.LEGS]?: EquippableItem
	[EquipmentSlot.FEET]?: EquippableItem
	[EquipmentSlot.HANDS]?: EquippableItem
	[EquipmentSlot.NECK]?: EquippableItem
	[EquipmentSlot.RING_1]?: EquippableItem
	[EquipmentSlot.RING_2]?: EquippableItem
}

/**
 * Repair cost calculation
 */
export interface RepairCost {
	gold: number
	durabilityRestored: number
}

/**
 * Loot table entry
 * Defines a possible drop from a monster or chest
 */
export interface LootEntry {
	itemId: string
	quantity: number | [number, number] // Fixed amount or [min, max] range
	chance: number // 0.0 to 1.0 (0% to 100%)
}

/**
 * Loot table
 * Collection of possible drops with probabilities
 */
export interface LootTable {
	id: string
	entries: LootEntry[]
}
