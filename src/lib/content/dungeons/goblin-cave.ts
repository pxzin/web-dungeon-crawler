/**
 * Goblin Cave - First Dungeon
 * A damp and dark cave infested with goblin raiders
 */

import type { DungeonTemplate } from '$lib/game/dungeon/types'

/**
 * Goblin Cave Dungeon Configuration
 */
export const goblinCave: DungeonTemplate = {
	id: 'goblin_cave',
	name: 'Caverna dos Goblins',
	description: 'Uma caverna úmida e escura, infestada de goblins saqueadores.',
	recommendedLevel: {
		min: 1,
		max: 5,
	},
	floorCount: 3,
	possibleMonsters: [
		'goblin_scout', // Common, fast enemy
		'goblin_brute', // Stronger, slower enemy
		'goblin_shaman', // Magic user
	],
	boss: 'goblin_king',
	theme: 'cave',
	iconId: 'location_cave',
	generationConfig: {
		width: 60,
		height: 60,
		minRooms: 8,
		maxRooms: 12,
		minRoomSize: 6,
		maxRoomSize: 12,
		dungeonLevel: 1,
	},
}
