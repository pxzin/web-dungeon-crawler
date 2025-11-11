/**
 * Combat System Types
 * Defines all types related to turn-based combat
 */

/**
 * Combat action types
 */
export enum CombatActionType {
	ATTACK = 'attack',
	DEFEND = 'defend',
	USE_SKILL = 'use_skill',
	USE_ITEM = 'use_item',
	FLEE = 'flee',
}

/**
 * Combat participant (player or enemy)
 */
export interface Combatant {
	id: string
	name: string
	type: 'player' | 'enemy'
	level: number
	currentHp: number
	maxHp: number
	currentMp: number
	maxMp: number
	attack: number
	defense: number
	magicAttack: number
	magicDefense: number
	speed: number
	criticalRate: number
	evasion: number
	statusEffects: StatusEffect[]
	portraitId?: string
}

/**
 * Status effect in combat
 */
export interface StatusEffect {
	id: string
	name: string
	type: 'buff' | 'debuff'
	duration: number
	effects: {
		hpRegen?: number
		mpRegen?: number
		attackModifier?: number
		defenseModifier?: number
		speedModifier?: number
	}
}

/**
 * Combat action
 */
export interface CombatAction {
	type: CombatActionType
	actorId: string
	targetId?: string
	skillId?: string
	itemId?: string
}

/**
 * Combat action result
 */
export interface CombatActionResult {
	success: boolean
	action: CombatAction
	damage?: number
	healing?: number
	isCritical?: boolean
	isMiss?: boolean
	statusEffectApplied?: StatusEffect
	message: string
}

/**
 * Combat turn
 */
export interface CombatTurn {
	turnNumber: number
	activeParticipantId: string
	action?: CombatAction
	result?: CombatActionResult
	timestamp: number
}

/**
 * Combat state
 */
export enum CombatState {
	INITIALIZING = 'initializing',
	PLAYER_TURN = 'player_turn',
	ENEMY_TURN = 'enemy_turn',
	PROCESSING = 'processing',
	VICTORY = 'victory',
	DEFEAT = 'defeat',
	FLED = 'fled',
}

/**
 * Complete combat encounter
 */
export interface Combat {
	id: string
	state: CombatState
	player: Combatant
	enemies: Combatant[]
	turnOrder: string[]
	currentTurnIndex: number
	turns: CombatTurn[]
	log: string[]
	rewards?: CombatRewards
	createdAt: number
	endedAt?: number
}

/**
 * Combat rewards
 */
export interface CombatRewards {
	experience: number
	gold: number
	items: Array<{
		id: string
		name: string
		quantity: number
	}>
}

/**
 * Enemy template
 */
export interface EnemyTemplate {
	id: string
	name: string
	baseLevel: number
	baseStats: {
		hp: number
		mp: number
		attack: number
		defense: number
		magicAttack: number
		magicDefense: number
		speed: number
		criticalRate: number
		evasion: number
	}
	experienceReward: number
	goldReward: number
	lootTable: string[]
}
