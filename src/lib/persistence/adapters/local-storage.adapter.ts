/**
 * LocalStorage Adapter Implementation
 * Simple, synchronous storage using browser's localStorage
 * Perfect for small amounts of data (<5MB)
 */

import type { StorageAdapter, StorageAdapterConfig } from '../adapter'
import type { Result, StorageKey } from '../types'

export class LocalStorageAdapter implements StorageAdapter {
	private prefix: string
	private initialized = false

	constructor(private config: StorageAdapterConfig = {}) {
		this.prefix = config.prefix || 'dungeon_crawler_'
	}

	/**
	 * Initialize the adapter
	 * Checks if localStorage is available
	 */
	async init(): Promise<Result<void>> {
		if (this.initialized) {
			return { success: true, data: undefined }
		}

		try {
			// Check if localStorage is available
			if (typeof window === 'undefined' || !window.localStorage) {
				return {
					success: false,
					error: new Error('localStorage is not available'),
				}
			}

			// Test localStorage with a dummy write
			const testKey = `${this.prefix}__test__`
			localStorage.setItem(testKey, 'test')
			localStorage.removeItem(testKey)

			this.initialized = true
			return { success: true, data: undefined }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to initialize localStorage'),
			}
		}
	}

	/**
	 * Get a value from localStorage
	 */
	async get<T>(key: StorageKey | string): Promise<Result<T | null>> {
		try {
			const fullKey = this.getFullKey(key)
			const value = localStorage.getItem(fullKey)

			if (value === null) {
				return { success: true, data: null }
			}

			const parsed = JSON.parse(value) as T
			return { success: true, data: parsed }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to get value from localStorage'),
			}
		}
	}

	/**
	 * Set a value in localStorage
	 */
	async set<T>(key: StorageKey | string, value: T): Promise<Result<void>> {
		try {
			const fullKey = this.getFullKey(key)
			const serialized = JSON.stringify(value)
			localStorage.setItem(fullKey, serialized)
			return { success: true, data: undefined }
		} catch (error) {
			// Handle quota exceeded error
			if (error instanceof Error && error.name === 'QuotaExceededError') {
				return {
					success: false,
					error: new Error('localStorage quota exceeded. Please free up some space.'),
				}
			}

			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to set value in localStorage'),
			}
		}
	}

	/**
	 * Remove a value from localStorage
	 */
	async remove(key: StorageKey | string): Promise<Result<void>> {
		try {
			const fullKey = this.getFullKey(key)
			localStorage.removeItem(fullKey)
			return { success: true, data: undefined }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to remove value from localStorage'),
			}
		}
	}

	/**
	 * Clear all data from localStorage
	 * Only removes keys with our prefix to avoid affecting other apps
	 */
	async clear(): Promise<Result<void>> {
		try {
			const keysResult = await this.keys()
			if (!keysResult.success) {
				return keysResult
			}

			for (const key of keysResult.data) {
				localStorage.removeItem(key)
			}

			return { success: true, data: undefined }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to clear localStorage'),
			}
		}
	}

	/**
	 * Check if a key exists
	 */
	async has(key: StorageKey | string): Promise<Result<boolean>> {
		try {
			const fullKey = this.getFullKey(key)
			const exists = localStorage.getItem(fullKey) !== null
			return { success: true, data: exists }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to check key existence'),
			}
		}
	}

	/**
	 * Get all keys with our prefix
	 */
	async keys(): Promise<Result<string[]>> {
		try {
			const allKeys: string[] = []

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i)
				if (key && key.startsWith(this.prefix)) {
					allKeys.push(key)
				}
			}

			return { success: true, data: allKeys }
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error : new Error('Failed to get keys from localStorage'),
			}
		}
	}

	/**
	 * Get approximate storage size in bytes
	 */
	async getSize(): Promise<Result<number | null>> {
		try {
			let totalSize = 0

			const keysResult = await this.keys()
			if (!keysResult.success) {
				return { success: true, data: null }
			}

			for (const key of keysResult.data) {
				const value = localStorage.getItem(key)
				if (value) {
					// Approximate size: key length + value length in UTF-16
					totalSize += (key.length + value.length) * 2
				}
			}

			return { success: true, data: totalSize }
		} catch (error) {
			return { success: true, data: null }
		}
	}

	/**
	 * Get full key with prefix
	 */
	private getFullKey(key: StorageKey | string): string {
		return `${this.prefix}${key}`
	}
}
