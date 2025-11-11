/**
 * Combat Engine Internationalization Helper
 * Provides translation functions for combat messages
 */

import { get } from 'svelte/store'
import { LL } from '$lib/i18n/i18n-svelte'

/**
 * Get translated combat log message
 */
export function getCombatMessage(key: string, params?: Record<string, any>): string {
	const translations = get(LL)

	// Access the combat.log translations
	const message = (translations.game.combat.log as any)[key]

	if (!message) {
		console.warn(`Combat translation missing for key: ${key}`)
		return key
	}

	// If it's a function (has parameters), call it with params
	if (typeof message === 'function') {
		return message(params || {})
	}

	// If it's a simple string, return it
	return message
}

/**
 * Combat message builder helpers
 */
export const CombatMessages = {
	combatStarted: () => getCombatMessage('combatStarted'),

	attackMissed: (attacker: string) =>
		getCombatMessage('attackMissed', { attacker }),

	attackHit: (attacker: string, target: string, damage: number) =>
		getCombatMessage('attackHit', { attacker, target, damage }),

	attackCritical: (attacker: string, target: string, damage: number) =>
		getCombatMessage('attackCritical', { attacker, target, damage }),

	defend: (actor: string, amount: number) =>
		getCombatMessage('defend', { actor, amount }),

	fled: (actor: string) =>
		getCombatMessage('fled', { actor }),

	couldntEscape: (actor: string) =>
		getCombatMessage('couldntEscape', { actor }),

	buffsWornOff: (actor: string) =>
		getCombatMessage('buffsWornOff', { actor }),

	skillNotImplemented: (actor: string) =>
		getCombatMessage('skillNotImplemented', { actor }),

	itemNotImplemented: (actor: string) =>
		getCombatMessage('itemNotImplemented', { actor }),
}
