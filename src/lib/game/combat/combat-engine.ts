/**
 * Combat Engine
 * Core combat mechanics and calculations
 */

import type {
	Combat,
	Combatant,
	CombatAction,
	CombatActionResult,
	CombatTurn,
	CombatRewards,
} from './types'
import { CombatState, CombatActionType } from './types'

/**
 * Initialize a new combat encounter
 */
export function initializeCombat(player: Combatant, enemies: Combatant[]): Combat {
	const participants = [player, ...enemies]

	// Sort by speed (descending) to determine turn order
	const turnOrder = [...participants]
		.sort((a, b) => b.speed - a.speed)
		.map((p) => p.id)

	return {
		id: generateCombatId(),
		state: CombatState.INITIALIZING,
		player,
		enemies,
		turnOrder,
		currentTurnIndex: 0,
		turns: [],
		log: ['Combat started!'],
		createdAt: Date.now(),
	}
}

/**
 * Process a combat action
 */
export function processCombatAction(
	combat: Combat,
	action: CombatAction
): { combat: Combat; result: CombatActionResult } {
	const actor = getCombatant(combat, action.actorId)
	if (!actor) {
		throw new Error(`Actor ${action.actorId} not found`)
	}

	let result: CombatActionResult

	switch (action.type) {
		case CombatActionType.ATTACK:
			result = processAttack(combat, action)
			break
		case CombatActionType.DEFEND:
			result = processDefend(combat, action)
			break
		case CombatActionType.USE_SKILL:
			result = processSkill(combat, action)
			break
		case CombatActionType.USE_ITEM:
			result = processItem(combat, action)
			break
		case CombatActionType.FLEE:
			result = processFlee(combat, action)
			break
		default:
			throw new Error(`Unknown action type: ${action.type}`)
	}

	// Record turn
	const turn: CombatTurn = {
		turnNumber: combat.turns.length + 1,
		activeParticipantId: action.actorId,
		action,
		result,
		timestamp: Date.now(),
	}

	combat.turns.push(turn)

	// Add to combat log
	combat.log.push(result.message)

	// Advance turn
	combat.currentTurnIndex = (combat.currentTurnIndex + 1) % combat.turnOrder.length

	// Check combat end conditions
	checkCombatEnd(combat)

	return { combat, result }
}

/**
 * Process attack action
 */
function processAttack(combat: Combat, action: CombatAction): CombatActionResult {
	if (!action.targetId) {
		throw new Error('Attack requires a target')
	}

	const actor = getCombatant(combat, action.actorId)!
	const target = getCombatant(combat, action.targetId)!

	// Calculate if attack hits
	const hitChance = Math.max(0.5, 1 - target.evasion / 100)
	const hits = Math.random() < hitChance

	if (!hits) {
		return {
			success: true,
			action,
			isMiss: true,
			message: `${actor.name}'s attack missed!`,
		}
	}

	// Calculate if critical
	const isCritical = Math.random() < actor.criticalRate / 100

	// Calculate damage
	const baseDamage = actor.attack - target.defense / 2
	const damage = Math.max(
		1,
		Math.floor(baseDamage * (isCritical ? 2 : 1) * (0.9 + Math.random() * 0.2))
	)

	// Apply damage
	target.currentHp = Math.max(0, target.currentHp - damage)

	return {
		success: true,
		action,
		damage,
		isCritical,
		message: `${actor.name} attacked ${target.name} for ${damage} damage${isCritical ? ' (Critical!)' : ''}!`,
	}
}

/**
 * Process defend action
 */
function processDefend(combat: Combat, action: CombatAction): CombatActionResult {
	const actor = getCombatant(combat, action.actorId)!

	// Defending increases defense temporarily (handled in status effects)
	return {
		success: true,
		action,
		message: `${actor.name} takes a defensive stance!`,
	}
}

/**
 * Process skill action
 */
function processSkill(combat: Combat, action: CombatAction): CombatActionResult {
	const actor = getCombatant(combat, action.actorId)!

	// Placeholder for skill system
	return {
		success: false,
		action,
		message: `${actor.name} tried to use a skill, but skill system is not implemented yet!`,
	}
}

/**
 * Process item action
 */
function processItem(combat: Combat, action: CombatAction): CombatActionResult {
	const actor = getCombatant(combat, action.actorId)!

	// Placeholder for item system
	return {
		success: false,
		action,
		message: `${actor.name} tried to use an item, but item system is not implemented yet!`,
	}
}

/**
 * Process flee action
 */
function processFlee(combat: Combat, action: CombatAction): CombatActionResult {
	const actor = getCombatant(combat, action.actorId)!

	// Flee chance based on speed difference
	const avgEnemySpeed =
		combat.enemies.reduce((sum, e) => sum + e.speed, 0) / combat.enemies.length
	const fleeChance = Math.min(0.9, Math.max(0.1, combat.player.speed / avgEnemySpeed))

	if (Math.random() < fleeChance) {
		combat.state = CombatState.FLED
		return {
			success: true,
			action,
			message: `${actor.name} fled from battle!`,
		}
	}

	return {
		success: false,
		action,
		message: `${actor.name} couldn't escape!`,
	}
}

/**
 * Get combatant by ID
 */
function getCombatant(combat: Combat, id: string): Combatant | undefined {
	if (combat.player.id === id) return combat.player
	return combat.enemies.find((e) => e.id === id)
}

/**
 * Check if combat has ended
 */
function checkCombatEnd(combat: Combat): void {
	// Check if player is defeated
	if (combat.player.currentHp <= 0) {
		combat.state = CombatState.DEFEAT
		combat.endedAt = Date.now()
		return
	}

	// Check if all enemies are defeated
	const allEnemiesDefeated = combat.enemies.every((e) => e.currentHp <= 0)
	if (allEnemiesDefeated) {
		combat.state = CombatState.VICTORY
		combat.endedAt = Date.now()
		combat.rewards = calculateRewards(combat)
		return
	}

	// Continue combat
	const activeId = combat.turnOrder[combat.currentTurnIndex]
	const active = getCombatant(combat, activeId)

	if (active?.type === 'player') {
		combat.state = CombatState.PLAYER_TURN
	} else {
		combat.state = CombatState.ENEMY_TURN
	}
}

/**
 * Calculate combat rewards
 */
function calculateRewards(combat: Combat): CombatRewards {
	let totalExp = 0
	let totalGold = 0

	for (const enemy of combat.enemies) {
		// Base rewards scale with enemy level
		totalExp += enemy.level * 50
		totalGold += enemy.level * 10
	}

	return {
		experience: totalExp,
		gold: totalGold,
		items: [], // Placeholder for loot system
	}
}

/**
 * Generate unique combat ID
 */
function generateCombatId(): string {
	return `combat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * AI turn - select and execute enemy action
 */
export function processEnemyTurn(combat: Combat): { combat: Combat; result: CombatActionResult } {
	const activeId = combat.turnOrder[combat.currentTurnIndex]
	const enemy = combat.enemies.find((e) => e.id === activeId)

	if (!enemy || enemy.currentHp <= 0) {
		// Skip dead enemies
		combat.currentTurnIndex = (combat.currentTurnIndex + 1) % combat.turnOrder.length
		return processEnemyTurn(combat)
	}

	// Simple AI: always attack the player
	const action: CombatAction = {
		type: CombatActionType.ATTACK,
		actorId: enemy.id,
		targetId: combat.player.id,
	}

	return processCombatAction(combat, action)
}
