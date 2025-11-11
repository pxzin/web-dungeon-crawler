/**
 * Dungeon Store
 * Manages the current active dungeon session
 */

import type { Dungeon, DungeonTemplate } from '$lib/game/dungeon/types'
import { generateDungeon } from '$lib/game/dungeon'

/**
 * Dungeon session state
 */
interface DungeonSession {
	template: DungeonTemplate
	dungeon: Dungeon
	currentFloor: number
}

/**
 * Create dungeon store
 */
function createDungeonStore() {
	let currentSession = $state<DungeonSession | null>(null)

	return {
		get session() {
			return currentSession
		},

		/**
		 * Start a new dungeon session
		 */
		startDungeon(template: DungeonTemplate, floor: number = 1) {
			// Generate the dungeon
			const dungeon = generateDungeon({
				...template.generationConfig,
				dungeonLevel: floor,
				seed: Date.now(), // Random seed for each session
			})

			currentSession = {
				template,
				dungeon,
				currentFloor: floor,
			}

			console.log('Started dungeon session:', template.name, 'Floor', floor)
		},

		/**
		 * Move to next floor
		 */
		nextFloor() {
			if (!currentSession) return false

			const nextFloorNum = currentSession.currentFloor + 1
			if (nextFloorNum > currentSession.template.floorCount) {
				// Dungeon complete
				return false
			}

			// Generate next floor
			const dungeon = generateDungeon({
				...currentSession.template.generationConfig,
				dungeonLevel: nextFloorNum,
				seed: Date.now(),
			})

			currentSession = {
				...currentSession,
				dungeon,
				currentFloor: nextFloorNum,
			}

			return true
		},

		/**
		 * End current dungeon session
		 */
		endDungeon() {
			currentSession = null
			console.log('Ended dungeon session')
		},

		/**
		 * Check if a dungeon is active
		 */
		isActive(): boolean {
			return currentSession !== null
		},
	}
}

export const dungeonStore = createDungeonStore()
