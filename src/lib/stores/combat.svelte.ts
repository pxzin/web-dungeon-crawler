/**
 * Combat Store
 * Manages active combat state
 */

import type { Combat, Combatant, CombatAction } from '$lib/game/combat/types'
import { CombatState } from '$lib/game/combat/types'
import { initializeCombat, processCombatAction, processEnemyTurn } from '$lib/game/combat'
import { getMonster } from '$lib/game/monsters'
import type { Monster } from '$lib/game/monsters/types'

/**
 * Create combat store
 */
function createCombatStore() {
	let activeCombat = $state<Combat | null>(null)

	return {
		get combat() {
			return activeCombat
		},

		/**
		 * Start a new combat encounter
		 */
		startCombat(player: Combatant, enemyIds: string[]) {
			// Load enemy data and convert to Combatants
			const enemies: Combatant[] = enemyIds
				.map((id) => {
					const monster = getMonster(id)
					if (!monster) return null

					return monsterToCombatant(monster)
				})
				.filter((e): e is Combatant => e !== null)

			if (enemies.length === 0) {
				console.error('No valid enemies found')
				return
			}

			// Initialize combat
			activeCombat = initializeCombat(player, enemies)
		},

		/**
		 * Execute a combat action
		 */
		executeAction(action: CombatAction) {
			if (!activeCombat) return

			// Process player action
			const result = processCombatAction(activeCombat, action)
			activeCombat = result.combat

			// If combat is still ongoing and it's enemy turn, process enemy actions
			if (!this.isOver() && !this.isPlayerTurn()) {
				// Process all enemy turns
				const aliveEnemies = activeCombat.enemies.filter((e) => e.currentHp > 0)
				for (const enemy of aliveEnemies) {
					if (this.isOver()) break

					const enemyResult = processEnemyTurn(activeCombat)
					activeCombat = enemyResult.combat
				}
			}

			// Check if combat is over
			if (this.isOver()) {
				console.log('Combat ended:', activeCombat.state)
			}
		},

		/**
		 * Check if it's player's turn
		 */
		isPlayerTurn(): boolean {
			if (!activeCombat) return false
			const currentActorId = activeCombat.turnOrder[activeCombat.currentTurnIndex]
			return currentActorId === activeCombat.player.id
		},

		/**
		 * Check if combat is over
		 */
		isOver(): boolean {
			if (!activeCombat) return true
			return (
				activeCombat.state === CombatState.VICTORY ||
				activeCombat.state === CombatState.DEFEAT ||
				activeCombat.state === CombatState.FLED
			)
		},

		/**
		 * End combat and clean up
		 */
		endCombat() {
			activeCombat = null
		},
	}
}

/**
 * Convert Monster to Combatant
 */
function monsterToCombatant(monster: Monster): Combatant {
	return {
		id: `enemy_${monster.id}_${Date.now()}`,
		name: monster.name,
		type: 'enemy',
		level: monster.level,
		maxHp: monster.health,
		currentHp: monster.health,
		maxMp: monster.mana,
		currentMp: monster.mana,
		attack: monster.attack,
		defense: monster.defense,
		magicAttack: monster.magicAttack,
		magicDefense: monster.magicDefense,
		speed: monster.speed,
		criticalRate: monster.criticalRate,
		evasion: monster.evasion,
		statusEffects: [],
		portraitId: monster.portraitId || 'goblin_01',
	}
}

export const combatStore = createCombatStore()
