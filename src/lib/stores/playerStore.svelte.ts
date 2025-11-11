/**
 * Player Store - Global Reactive State
 * Manages player data across the application using Svelte 5 runes
 */

import type { PlayerData } from '$lib/persistence'
import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'

const persistence = createPersistenceService(new LocalStorageAdapter())

// Global player state using Svelte 5 runes
let playerState = $state<PlayerData | null>(null)
let loadingState = $state(true)
let errorState = $state<string | null>(null)

/**
 * Player Store API
 */
export const playerStore = {
	// Getters - return reactive state
	get player() {
		return playerState
	},
	get loading() {
		return loadingState
	},
	get error() {
		return errorState
	},

	/**
	 * Initialize the store and load player data
	 */
	async init() {
		loadingState = true
		errorState = null

		try {
			await persistence.init()
			const result = await persistence.getPlayerData()

			if (result.success && result.data) {
				playerState = result.data
			} else {
				playerState = null
			}
		} catch (err) {
			errorState = err instanceof Error ? err.message : 'Unknown error'
			playerState = null
		} finally {
			loadingState = false
		}
	},

	/**
	 * Reload player data from persistence
	 */
	async reload() {
		try {
			const result = await persistence.getPlayerData()
			if (result.success && result.data) {
				playerState = result.data
			}
		} catch (err) {
			errorState = err instanceof Error ? err.message : 'Failed to reload player data'
		}
	},

	/**
	 * Update player data (partial update)
	 */
	async update(updates: Partial<PlayerData>) {
		if (!playerState) return

		// Merge updates with existing data
		playerState = { ...playerState, ...updates }

		// Persist to storage
		await persistence.setPlayerData(playerState)
	},

	/**
	 * Set entire player data
	 */
	async set(player: PlayerData) {
		playerState = player
		await persistence.setPlayerData(player)
	},

	/**
	 * Update player gold
	 */
	async updateGold(amount: number) {
		if (!playerState) return

		playerState.gold = amount
		await persistence.setPlayerData(playerState)
	},

	/**
	 * Add gold to player
	 */
	async addGold(amount: number) {
		if (!playerState) return

		playerState.gold += amount
		await persistence.setPlayerData(playerState)
	},

	/**
	 * Update player resources (health, mana, stamina)
	 */
	async updateResources(resources: Partial<PlayerData['resources']>) {
		if (!playerState) return

		playerState.resources = { ...playerState.resources, ...resources }
		await persistence.setPlayerData(playerState)
	},

	/**
	 * Restore all resources to max
	 */
	async restoreResources() {
		if (!playerState) return

		playerState.resources.health = playerState.resources.maxHealth
		playerState.resources.mana = playerState.resources.maxMana
		playerState.resources.stamina = playerState.resources.maxStamina

		// Also update stats (legacy support)
		playerState.stats.health = playerState.stats.maxHealth
		playerState.stats.mana = playerState.stats.maxMana
		playerState.stats.stamina = playerState.stats.maxStamina

		await persistence.setPlayerData(playerState)
	},

	/**
	 * Clear player data
	 */
	async clear() {
		playerState = null
		await persistence.clearAllData()
	},
}
