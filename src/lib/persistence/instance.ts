/**
 * Global Persistence Instance
 * Pre-configured singleton instance for the entire app
 */

import { LocalStorageAdapter, createPersistenceService } from './index'

// Create adapter
const adapter = new LocalStorageAdapter({
	prefix: 'dungeon_crawler_',
})

// Create persistence service instance
const persistenceService = createPersistenceService(adapter)

// Initialize on module load (async but fire-and-forget)
persistenceService.init().catch((err) => {
	console.error('Failed to initialize persistence:', err)
})

// Export initialized instance
export const persistence = persistenceService

// Debug log
console.log('Persistence instance created:', {
	hasGetPlayerData: typeof persistence.getPlayerData === 'function',
})
