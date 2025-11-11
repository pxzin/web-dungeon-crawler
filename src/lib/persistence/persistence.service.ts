/**
 * Persistence Service
 * High-level API for game data persistence
 * Uses the Adapter Pattern to allow easy migration between storage backends
 */

import type { StorageAdapter } from './adapter'
import { StorageKey } from './types'
import type {
	Result,
	PlayerData,
	GameState,
	GameSettings,
	SaveSlot,
	SaveData,
} from './types'

/**
 * PersistenceService provides high-level getters and setters for game data
 * It abstracts the underlying storage implementation, allowing easy migration
 * from localStorage to IndexedDB, Firebase, or any other backend
 */
export class PersistenceService {
	private adapter: StorageAdapter
	private initialized = false

	/**
	 * Create a new PersistenceService with the given storage adapter
	 * @param adapter - The storage adapter to use (LocalStorage, IndexedDB, etc.)
	 */
	constructor(adapter: StorageAdapter) {
		this.adapter = adapter
	}

	/**
	 * Initialize the persistence service
	 * Must be called before any other operations
	 */
	async init(): Promise<Result<void>> {
		if (this.initialized) {
			return { success: true, data: undefined }
		}

		const result = await this.adapter.init()
		if (!result.success) {
			return result
		}

		this.initialized = true
		return { success: true, data: undefined }
	}

	/**
	 * Check if the service is initialized
	 */
	private checkInitialized(): Result<void> {
		if (!this.initialized) {
			return {
				success: false,
				error: new Error('PersistenceService not initialized. Call init() first.'),
			}
		}
		return { success: true, data: undefined }
	}

	// ============================================================================
	// PLAYER DATA OPERATIONS
	// ============================================================================

	/**
	 * Get player data
	 * @returns Player data or null if not found
	 */
	async getPlayerData(): Promise<Result<PlayerData | null>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.get<PlayerData>(StorageKey.PLAYER_DATA)
	}

	/**
	 * Save player data
	 * @param playerData - Player data to save
	 */
	async setPlayerData(playerData: PlayerData): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		// Update the timestamp
		playerData.updatedAt = Date.now()

		return await this.adapter.set(StorageKey.PLAYER_DATA, playerData)
	}

	/**
	 * Create a new player
	 * @param name - Player name
	 * @returns The created player data
	 */
	async createPlayer(name: string): Promise<Result<PlayerData>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		const now = Date.now()
		const playerData: PlayerData = {
			id: `player_${now}`,
			name,
			stats: {
				// Base attributes
				strength: 10,
				dexterity: 10,
				intelligence: 10,
				vitality: 10,
				luck: 10,
				// Level and progression
				level: 1,
				experience: 0,
				experienceToNextLevel: 100,
				// Resources
				health: 100,
				maxHealth: 100,
				mana: 50,
				maxMana: 50,
				stamina: 100,
				maxStamina: 100,
				// Combat stats
				attack: 20,
				defense: 15,
				magicAttack: 20,
				magicDefense: 15,
				speed: 15,
				criticalRate: 5,
				evasion: 3,
			},
			resources: {
				health: 100,
				maxHealth: 100,
				mana: 50,
				maxMana: 50,
				stamina: 100,
				maxStamina: 100,
			},
			gold: 0,
			createdAt: now,
			updatedAt: now,
		}

		const saveResult = await this.setPlayerData(playerData)
		if (!saveResult.success) return saveResult

		return { success: true, data: playerData }
	}

	/**
	 * Delete player data
	 */
	async deletePlayerData(): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.remove(StorageKey.PLAYER_DATA)
	}

	// ============================================================================
	// GAME STATE OPERATIONS
	// ============================================================================

	/**
	 * Get current game state
	 * @returns Game state or null if not found
	 */
	async getGameState(): Promise<Result<GameState | null>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.get<GameState>(StorageKey.GAME_STATE)
	}

	/**
	 * Save game state
	 * @param gameState - Game state to save
	 */
	async setGameState(gameState: GameState): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		// Update the timestamp
		gameState.lastSaveAt = Date.now()

		return await this.adapter.set(StorageKey.GAME_STATE, gameState)
	}

	/**
	 * Delete game state
	 */
	async deleteGameState(): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.remove(StorageKey.GAME_STATE)
	}

	// ============================================================================
	// SETTINGS OPERATIONS
	// ============================================================================

	/**
	 * Get game settings
	 * @returns Game settings or default settings if not found
	 */
	async getSettings(): Promise<Result<GameSettings>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		const result = await this.adapter.get<GameSettings>(StorageKey.SETTINGS)

		if (!result.success) return result

		// Return default settings if none exist
		if (result.data === null) {
			const defaultSettings: GameSettings = {
				locale: 'en',
				volume: {
					master: 0.7,
					music: 0.5,
					sfx: 0.7,
				},
				graphics: {
					quality: 'medium',
					particles: true,
				},
				controls: {
					keyboardEnabled: true,
					gamepadEnabled: true,
				},
			}
			return { success: true, data: defaultSettings }
		}

		return { success: true, data: result.data }
	}

	/**
	 * Save game settings
	 * @param settings - Settings to save
	 */
	async setSettings(settings: GameSettings): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.set(StorageKey.SETTINGS, settings)
	}

	/**
	 * Update specific settings without replacing all settings
	 * @param updates - Partial settings to update
	 */
	async updateSettings(updates: Partial<GameSettings>): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		const currentSettings = await this.getSettings()
		if (!currentSettings.success) return currentSettings

		const updatedSettings: GameSettings = {
			...currentSettings.data,
			...updates,
		}

		return await this.setSettings(updatedSettings)
	}

	// ============================================================================
	// SAVE SLOT OPERATIONS
	// ============================================================================

	/**
	 * Get all save slots
	 * @returns Array of save slots or empty array if none exist
	 */
	async getSaveSlots(): Promise<Result<SaveSlot[]>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		const result = await this.adapter.get<SaveSlot[]>(StorageKey.SAVE_SLOTS)

		if (!result.success) return result

		return { success: true, data: result.data || [] }
	}

	/**
	 * Get a specific save slot
	 * @param slotId - The save slot ID
	 * @returns The save slot or null if not found
	 */
	async getSaveSlot(slotId: string): Promise<Result<SaveSlot | null>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		const slotsResult = await this.getSaveSlots()
		if (!slotsResult.success) return slotsResult

		const slot = slotsResult.data.find((s) => s.id === slotId)
		return { success: true, data: slot || null }
	}

	/**
	 * Save the complete game state to a save slot
	 * @param slotId - The save slot ID (1-5 for example)
	 * @returns The created/updated save slot
	 */
	async saveGame(slotId: string): Promise<Result<SaveSlot>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		// Get current player data
		const playerResult = await this.getPlayerData()
		if (!playerResult.success) return playerResult
		if (!playerResult.data) {
			return { success: false, error: new Error('No player data to save') }
		}

		// Get current game state
		const stateResult = await this.getGameState()
		if (!stateResult.success) return stateResult
		if (!stateResult.data) {
			return { success: false, error: new Error('No game state to save') }
		}

		// Create the complete save data
		const saveData: SaveData = {
			player: playerResult.data,
			state: stateResult.data,
		}

		// Save to the specific slot
		const slotKey = `${StorageKey.SAVE_SLOTS}_${slotId}`
		const saveResult = await this.adapter.set(slotKey, saveData)
		if (!saveResult.success) return saveResult

		// Create/update the save slot metadata
		const now = Date.now()
		const saveSlot: SaveSlot = {
			id: slotId,
			playerName: playerResult.data.name,
			level: playerResult.data.stats.level,
			location: stateResult.data.currentLocation,
			playtime: stateResult.data.playtime,
			timestamp: now,
		}

		// Update the save slots list
		const slotsResult = await this.getSaveSlots()
		if (!slotsResult.success) return slotsResult

		const slots = slotsResult.data.filter((s) => s.id !== slotId)
		slots.push(saveSlot)
		slots.sort((a, b) => b.timestamp - a.timestamp) // Most recent first

		const updateSlotsResult = await this.adapter.set(StorageKey.SAVE_SLOTS, slots)
		if (!updateSlotsResult.success) return updateSlotsResult

		return { success: true, data: saveSlot }
	}

	/**
	 * Load a game from a save slot
	 * @param slotId - The save slot ID
	 */
	async loadGame(slotId: string): Promise<Result<SaveData>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		// Load the save data from the slot
		const slotKey = `${StorageKey.SAVE_SLOTS}_${slotId}`
		const saveDataResult = await this.adapter.get<SaveData>(slotKey)

		if (!saveDataResult.success) return saveDataResult
		if (!saveDataResult.data) {
			return { success: false, error: new Error(`Save slot ${slotId} not found`) }
		}

		// Restore player data
		const playerResult = await this.setPlayerData(saveDataResult.data.player)
		if (!playerResult.success) return playerResult

		// Restore game state
		const stateResult = await this.setGameState(saveDataResult.data.state)
		if (!stateResult.success) return stateResult

		return { success: true, data: saveDataResult.data }
	}

	/**
	 * Delete a save slot
	 * @param slotId - The save slot ID to delete
	 */
	async deleteSaveSlot(slotId: string): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		// Delete the save data
		const slotKey = `${StorageKey.SAVE_SLOTS}_${slotId}`
		const deleteDataResult = await this.adapter.remove(slotKey)
		if (!deleteDataResult.success) return deleteDataResult

		// Update the save slots list
		const slotsResult = await this.getSaveSlots()
		if (!slotsResult.success) return slotsResult

		const slots = slotsResult.data.filter((s) => s.id !== slotId)
		const updateSlotsResult = await this.adapter.set(StorageKey.SAVE_SLOTS, slots)
		if (!updateSlotsResult.success) return updateSlotsResult

		return { success: true, data: undefined }
	}

	// ============================================================================
	// UTILITY OPERATIONS
	// ============================================================================

	/**
	 * Clear all game data
	 * WARNING: This will delete everything!
	 */
	async clearAllData(): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.clear()
	}

	/**
	 * Get the total storage size in bytes
	 * @returns Size in bytes or null if not supported
	 */
	async getStorageSize(): Promise<Result<number | null>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.getSize()
	}

	/**
	 * Check if a save exists in the current session
	 * @returns True if player data exists
	 */
	async hasSaveData(): Promise<Result<boolean>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		return await this.adapter.has(StorageKey.PLAYER_DATA)
	}

	/**
	 * Export all game data as JSON
	 * Useful for backup or migration
	 */
	async exportData(): Promise<Result<string>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		try {
			const playerResult = await this.getPlayerData()
			const stateResult = await this.getGameState()
			const settingsResult = await this.getSettings()
			const slotsResult = await this.getSaveSlots()

			const exportData = {
				player: playerResult.success ? playerResult.data : null,
				state: stateResult.success ? stateResult.data : null,
				settings: settingsResult.success ? settingsResult.data : null,
				saveSlots: slotsResult.success ? slotsResult.data : [],
				exportedAt: Date.now(),
			}

			const json = JSON.stringify(exportData, null, 2)
			return { success: true, data: json }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to export data'),
			}
		}
	}

	/**
	 * Import game data from JSON
	 * WARNING: This will overwrite current data!
	 * @param json - JSON string exported from exportData()
	 */
	async importData(json: string): Promise<Result<void>> {
		const initCheck = this.checkInitialized()
		if (!initCheck.success) return initCheck

		try {
			const importData = JSON.parse(json)

			if (importData.player) {
				const playerResult = await this.setPlayerData(importData.player)
				if (!playerResult.success) return playerResult
			}

			if (importData.state) {
				const stateResult = await this.setGameState(importData.state)
				if (!stateResult.success) return stateResult
			}

			if (importData.settings) {
				const settingsResult = await this.setSettings(importData.settings)
				if (!settingsResult.success) return settingsResult
			}

			if (importData.saveSlots) {
				const slotsResult = await this.adapter.set(StorageKey.SAVE_SLOTS, importData.saveSlots)
				if (!slotsResult.success) return slotsResult
			}

			return { success: true, data: undefined }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to import data'),
			}
		}
	}
}

/**
 * Create a PersistenceService with the default adapter (LocalStorage)
 * @returns A new PersistenceService instance
 */
export function createPersistenceService(adapter: StorageAdapter): PersistenceService {
	return new PersistenceService(adapter)
}
