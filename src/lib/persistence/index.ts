/**
 * Persistence System - Main Entry Point
 * Export all persistence-related types and classes
 */

// Core types
export { StorageKey } from './types'

export type {
	Result,
	PlayerData,
	PlayerStats,
	PlayerResources,
	GameState,
	GameSettings,
	SaveSlot,
	SaveData,
} from './types'

// Adapter interface and config
export type { StorageAdapter, StorageAdapterConfig } from './adapter'

// Storage adapters
export { LocalStorageAdapter } from './adapters/local-storage.adapter'

// Persistence service
export { PersistenceService, createPersistenceService } from './persistence.service'
