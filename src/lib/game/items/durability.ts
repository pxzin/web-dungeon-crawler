/**
 * Durability System
 * Handles item durability loss and repair mechanics
 */

import type { EquippableItem, Equipment, RepairCost, Durability } from './types'

/**
 * Durability loss on defeat (25% of max durability)
 */
export const DEFEAT_DURABILITY_LOSS_PERCENT = 0.25

/**
 * Repair cost multiplier based on item value
 */
export const REPAIR_COST_MULTIPLIER = 0.1

/**
 * Apply durability loss to equipped items after defeat
 */
export function applyDefeatDurabilityLoss(equipment: Equipment): Equipment {
	const updatedEquipment: Equipment = {}

	for (const [slot, item] of Object.entries(equipment)) {
		if (item && isEquippableItem(item)) {
			updatedEquipment[slot as keyof Equipment] = applyDurabilityLoss(
				item,
				DEFEAT_DURABILITY_LOSS_PERCENT
			)
		}
	}

	return updatedEquipment
}

/**
 * Apply durability loss to a single item
 */
export function applyDurabilityLoss(
	item: EquippableItem,
	lossPercent: number
): EquippableItem {
	const loss = Math.ceil(item.durability.max * lossPercent)
	const newCurrent = Math.max(0, item.durability.current - loss)

	return {
		...item,
		durability: {
			...item.durability,
			current: newCurrent,
		},
	}
}

/**
 * Check if item is broken (0 durability)
 */
export function isItemBroken(item: EquippableItem): boolean {
	return item.durability.current <= 0
}

/**
 * Get effective stats from item (0 if broken)
 */
export function getEffectiveItemStats(item: EquippableItem): typeof item.stats {
	if (isItemBroken(item)) {
		// Return empty stats object if item is broken
		return {}
	}

	return item.stats
}

/**
 * Calculate repair cost for an item
 */
export function calculateRepairCost(item: EquippableItem): RepairCost {
	const durabilityLost = item.durability.max - item.durability.current

	if (durabilityLost === 0) {
		return {
			gold: 0,
			durabilityRestored: 0,
		}
	}

	// Cost scales with item value and durability lost
	const costPerPoint = item.value * REPAIR_COST_MULTIPLIER
	const totalCost = Math.ceil(durabilityLost * costPerPoint)

	return {
		gold: totalCost,
		durabilityRestored: durabilityLost,
	}
}

/**
 * Repair an item to full durability
 */
export function repairItem(item: EquippableItem): EquippableItem {
	return {
		...item,
		durability: {
			...item.durability,
			current: item.durability.max,
		},
	}
}

/**
 * Get all broken items from equipment
 */
export function getBrokenItems(equipment: Equipment): EquippableItem[] {
	const brokenItems: EquippableItem[] = []

	for (const item of Object.values(equipment)) {
		if (item && isEquippableItem(item) && isItemBroken(item)) {
			brokenItems.push(item)
		}
	}

	return brokenItems
}

/**
 * Get all damaged items from equipment (not at full durability)
 */
export function getDamagedItems(equipment: Equipment): EquippableItem[] {
	const damagedItems: EquippableItem[] = []

	for (const item of Object.values(equipment)) {
		if (
			item &&
			isEquippableItem(item) &&
			item.durability.current < item.durability.max
		) {
			damagedItems.push(item)
		}
	}

	return damagedItems
}

/**
 * Calculate total repair cost for all damaged items
 */
export function calculateTotalRepairCost(equipment: Equipment): number {
	let totalCost = 0

	for (const item of Object.values(equipment)) {
		if (item && isEquippableItem(item)) {
			totalCost += calculateRepairCost(item).gold
		}
	}

	return totalCost
}

/**
 * Repair all items in equipment
 */
export function repairAllItems(equipment: Equipment): Equipment {
	const repairedEquipment: Equipment = {}

	for (const [slot, item] of Object.entries(equipment)) {
		if (item && isEquippableItem(item)) {
			repairedEquipment[slot as keyof Equipment] = repairItem(item)
		}
	}

	return repairedEquipment
}

/**
 * Type guard to check if item is equippable
 */
function isEquippableItem(item: any): item is EquippableItem {
	return item && 'durability' in item && 'stats' in item
}

/**
 * Get durability percentage (0-100)
 */
export function getDurabilityPercent(durability: Durability): number {
	if (durability.max === 0) return 0
	return Math.floor((durability.current / durability.max) * 100)
}

/**
 * Get durability color based on percentage
 */
export function getDurabilityColor(percent: number): string {
	if (percent === 0) return 'text-red-600' // Broken
	if (percent < 25) return 'text-orange-600' // Critical
	if (percent < 50) return 'text-yellow-600' // Low
	if (percent < 75) return 'text-blue-600' // Medium
	return 'text-green-600' // Good
}
