/**
 * Dungeon Templates
 * All available dungeon configurations
 */

import type { DungeonTemplate } from '$lib/game/dungeon/types'
import { goblinCave } from './goblin-cave'

/**
 * Dungeon templates database
 * Maps dungeon IDs to their template configurations
 */
export const DUNGEON_TEMPLATES = new Map<string, DungeonTemplate>([[goblinCave.id, goblinCave]])

/**
 * Get dungeon template by ID
 */
export function getDungeonTemplate(id: string): DungeonTemplate | undefined {
	return DUNGEON_TEMPLATES.get(id)
}

/**
 * Get all dungeon templates
 */
export function getAllDungeonTemplates(): DungeonTemplate[] {
	return Array.from(DUNGEON_TEMPLATES.values())
}

/**
 * Get dungeons by level range
 */
export function getDungeonsByLevel(playerLevel: number): DungeonTemplate[] {
	return getAllDungeonTemplates().filter(
		(dungeon) =>
			playerLevel >= dungeon.recommendedLevel.min && playerLevel <= dungeon.recommendedLevel.max
	)
}
