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
	visitedRooms: Set<string>
	clearedRooms: Set<string>
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

			// Populate enemies in rooms (except entrance and exit)
			let firstEnemyRoomAssigned = false
			for (const room of dungeon.rooms) {
				if (room.hasEntrance || room.hasExit) continue

				// First floor: only ONE room with a single easy Goblin Scout
				if (floor === 1) {
					if (!firstEnemyRoomAssigned) {
						room.enemies = [
							{
								x: room.centerX,
								y: room.centerY,
								enemyType: 'goblin_scout',
								level: 1,
							},
						]
						firstEnemyRoomAssigned = true
					}
					// All other rooms on floor 1 are empty - skip enemy assignment
					continue
				}

				// For floors 2+: 70% chance of having enemies
				if (Math.random() < 0.7) {
					const enemyCount = Math.floor(Math.random() * 3) + 1 // 1-3 enemies
					room.enemies = []

					for (let i = 0; i < enemyCount; i++) {
						const randomMonster =
							template.possibleMonsters[
								Math.floor(Math.random() * template.possibleMonsters.length)
							]
						room.enemies.push({
							x: room.centerX,
							y: room.centerY,
							enemyType: randomMonster,
							level: floor,
						})
					}
				}
			}

			currentSession = {
				template,
				dungeon,
				currentFloor: floor,
				visitedRooms: new Set<string>(),
				clearedRooms: new Set<string>(),
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
				visitedRooms: new Set<string>(),
				clearedRooms: new Set<string>(),
			}

			return true
		},

		/**
		 * Explore a room
		 */
		exploreRoom(roomId: string): { hasEnemies: boolean; enemyIds: string[] } {
			if (!currentSession) return { hasEnemies: false, enemyIds: [] }

			const room = currentSession.dungeon.rooms.find((r) => r.id === roomId)
			if (!room) return { hasEnemies: false, enemyIds: [] }

			// Mark as visited
			currentSession.visitedRooms.add(roomId)

			// Check if already cleared
			if (currentSession.clearedRooms.has(roomId)) {
				return { hasEnemies: false, enemyIds: [] }
			}

			// Check if room has enemies
			if (room.enemies && room.enemies.length > 0) {
				const enemyIds = room.enemies.map((e) => e.enemyType)
				return { hasEnemies: true, enemyIds }
			}

			// No enemies, mark as cleared
			currentSession.clearedRooms.add(roomId)
			return { hasEnemies: false, enemyIds: [] }
		},

		/**
		 * Mark room as cleared after combat
		 */
		clearRoom(roomId: string) {
			if (!currentSession) return
			currentSession.clearedRooms.add(roomId)
		},

		/**
		 * Get unexplored rooms
		 */
		getUnexploredRooms() {
			if (!currentSession) return []
			return currentSession.dungeon.rooms.filter((r) => !currentSession.visitedRooms.has(r.id))
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
