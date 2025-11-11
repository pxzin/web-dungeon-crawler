/**
 * Storage Adapter Pattern
 * Abstract interface for different storage backends
 * Allows easy migration from localStorage to IndexedDB, Firebase, etc.
 */

import type { Result, StorageKey } from './types'

/**
 * Base storage adapter interface
 * All storage implementations must implement this interface
 */
export interface StorageAdapter {
	/**
	 * Initialize the storage adapter
	 * Called once when the adapter is first used
	 */
	init(): Promise<Result<void>>

	/**
	 * Get a value from storage
	 * @param key - Storage key
	 * @returns The stored value or null if not found
	 */
	get<T>(key: StorageKey | string): Promise<Result<T | null>>

	/**
	 * Set a value in storage
	 * @param key - Storage key
	 * @param value - Value to store
	 */
	set<T>(key: StorageKey | string, value: T): Promise<Result<void>>

	/**
	 * Remove a value from storage
	 * @param key - Storage key
	 */
	remove(key: StorageKey | string): Promise<Result<void>>

	/**
	 * Clear all data from storage
	 * Use with caution!
	 */
	clear(): Promise<Result<void>>

	/**
	 * Check if a key exists in storage
	 * @param key - Storage key
	 */
	has(key: StorageKey | string): Promise<Result<boolean>>

	/**
	 * Get all keys in storage
	 */
	keys(): Promise<Result<string[]>>

	/**
	 * Get storage size in bytes (if supported)
	 */
	getSize(): Promise<Result<number | null>>
}

/**
 * Storage adapter configuration
 */
export interface StorageAdapterConfig {
	/**
	 * Prefix for all storage keys
	 * Helps avoid conflicts with other apps
	 */
	prefix?: string

	/**
	 * Enable compression for stored data
	 */
	compress?: boolean

	/**
	 * Enable encryption for sensitive data
	 */
	encrypt?: boolean

	/**
	 * Custom serialization/deserialization
	 */
	serializer?: {
		serialize: <T>(value: T) => string
		deserialize: <T>(value: string) => T
	}
}
