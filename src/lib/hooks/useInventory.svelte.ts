/**
 * Inventory Management Hook
 * Manages player inventory and equipment state
 */

import type { Item, EquippableItem, ConsumableItem, Equipment, InventorySlot } from '$lib/game/items/types'
import { EquipmentSlot as SlotType } from '$lib/game/items/types'

/**
 * Create inventory manager
 */
export function createInventory() {
	// State
	let equipment = $state<Equipment>({})
	let inventory = $state<InventorySlot[]>([])

	/**
	 * Add item to inventory
	 */
	function addItem(item: Item, quantity: number = 1) {
		// Check if item is stackable
		if (item.stackable) {
			const existingSlot = inventory.find((slot) => slot.item.id === item.id)
			if (existingSlot) {
				existingSlot.quantity += quantity
				return
			}
		}

		// Add new slot
		inventory.push({ item, quantity })
	}

	/**
	 * Remove item from inventory
	 */
	function removeItem(item: Item, quantity: number = 1): boolean {
		const slotIndex = inventory.findIndex((slot) => slot.item.id === item.id)
		if (slotIndex === -1) return false

		const slot = inventory[slotIndex]
		if (slot.quantity <= quantity) {
			// Remove entire slot
			inventory.splice(slotIndex, 1)
		} else {
			// Decrease quantity
			slot.quantity -= quantity
		}

		return true
	}

	/**
	 * Equip item
	 */
	function equipItem(item: EquippableItem): boolean {
		const slot = item.slot

		// Check if there's already an item in that slot
		const currentItem = equipment[slot]
		if (currentItem) {
			// Unequip current item first
			addItem(currentItem, 1)
		}

		// Remove from inventory
		if (!removeItem(item, 1)) {
			return false
		}

		// Equip the item
		equipment[slot] = item

		return true
	}

	/**
	 * Unequip item
	 */
	function unequipItem(slot: SlotType): boolean {
		const item = equipment[slot]
		if (!item) return false

		// Add to inventory
		addItem(item, 1)

		// Remove from equipment
		delete equipment[slot]

		return true
	}

	/**
	 * Use consumable item
	 */
	function useItem(item: ConsumableItem): boolean {
		// TODO: Apply item effects to character
		console.log('Using item:', item.name, 'Effect:', item.effect)

		// Remove from inventory
		return removeItem(item, 1)
	}

	/**
	 * Discard item
	 */
	function discardItem(item: Item, quantity: number = 1): boolean {
		return removeItem(item, quantity)
	}

	/**
	 * Get total stat bonuses from equipment
	 */
	function getEquipmentStats() {
		const stats = {
			strength: 0,
			dexterity: 0,
			intelligence: 0,
			vitality: 0,
			luck: 0,
			attack: 0,
			defense: 0,
			magicAttack: 0,
			magicDefense: 0,
			speed: 0,
			criticalRate: 0,
			evasion: 0,
			hpBonus: 0,
			mpBonus: 0,
		}

		for (const item of Object.values(equipment)) {
			if (!item) continue

			const itemStats = item.stats
			for (const [key, value] of Object.entries(itemStats)) {
				if (value !== undefined && key in stats) {
					stats[key as keyof typeof stats] += value
				}
			}
		}

		return stats
	}

	return {
		get equipment() {
			return equipment
		},
		get inventory() {
			return inventory
		},
		addItem,
		removeItem,
		equipItem,
		unequipItem,
		useItem,
		discardItem,
		getEquipmentStats,
	}
}

export type InventoryManager = ReturnType<typeof createInventory>
