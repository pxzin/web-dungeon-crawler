/**
 * Persistence System - Main Entry Point
 * Export all persistence-related types and classes
 */

// Core types
export type {
	Result,
	StorageKey,
	PlayerData,
	PlayerStats,
	PlayerResources,
	GameState,
	GameSettings,
	SaveSlot,
	SaveData,
} from './types'

export { StorageKey } from './types'

// Adapter interface and config
export type { StorageAdapter, StorageAdapterConfig } from './adapter'

// Storage adapters
export { LocalStorageAdapter } from './adapters/local-storage.adapter'

// Persistence service
export { PersistenceService, createPersistenceService } from './persistence.service'
