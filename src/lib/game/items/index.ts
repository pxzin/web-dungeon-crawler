/**
 * Items System - Main Entry Point
 * Export all item-related types and utilities
 */

export type {
	BaseItem,
	EquippableItem,
	ConsumableItem,
	Item,
	InventorySlot,
	Equipment,
	ItemStats,
	Durability,
	RepairCost,
	LootEntry,
	LootTable,
} from './types'

export { ItemRarity, ItemType, EquipmentSlot } from './types'

export {
	applyDefeatDurabilityLoss,
	applyDurabilityLoss,
	isItemBroken,
	getEffectiveItemStats,
	calculateRepairCost,
	repairItem,
	getBrokenItems,
	getDamagedItems,
	calculateTotalRepairCost,
	repairAllItems,
	getDurabilityPercent,
	getDurabilityColor,
	DEFEAT_DURABILITY_LOSS_PERCENT,
	REPAIR_COST_MULTIPLIER,
} from './durability'

export {
	ITEMS,
	getItem,
	getAllItems,
	getItemsByType,
	getItemsByRarity,
} from '../../content/items'

export { LOOT_TABLES, getLootTable, getAllLootTables, rollLoot } from '../../content/loot-tables'
