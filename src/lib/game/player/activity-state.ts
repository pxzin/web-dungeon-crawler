/**
 * Player Activity State Management
 * Manages player activity states to prevent conflicting actions
 */

/**
 * Possible player activity states
 */
export enum PlayerActivityState {
	IDLE = 'idle',
	IN_DUNGEON = 'in_dungeon',
	IN_COMBAT = 'in_combat',
	SHOPPING = 'shopping',
	CRAFTING = 'crafting',
	IN_TAVERN = 'in_tavern',
	IN_ARENA = 'in_arena',
	MANAGING_CHARACTER = 'managing_character',
}

/**
 * Route to state mapping
 * Maps application routes to their corresponding player states
 */
export const ROUTE_STATE_MAP: Record<string, PlayerActivityState> = {
	'/game/town-square': PlayerActivityState.IDLE,
	'/game/dungeons': PlayerActivityState.IN_DUNGEON,
	'/game/combat': PlayerActivityState.IN_COMBAT,
	'/game/market': PlayerActivityState.SHOPPING,
	'/game/blacksmith': PlayerActivityState.CRAFTING,
	'/game/tavern': PlayerActivityState.IN_TAVERN,
	'/game/arena': PlayerActivityState.IN_ARENA,
	'/game/character': PlayerActivityState.MANAGING_CHARACTER,
}

/**
 * State transition rules
 * Defines which states can transition to which other states
 */
export const STATE_TRANSITIONS: Record<
	PlayerActivityState,
	PlayerActivityState[]
> = {
	[PlayerActivityState.IDLE]: [
		PlayerActivityState.IN_DUNGEON,
		PlayerActivityState.SHOPPING,
		PlayerActivityState.CRAFTING,
		PlayerActivityState.IN_TAVERN,
		PlayerActivityState.IN_ARENA,
		PlayerActivityState.MANAGING_CHARACTER,
	],
	[PlayerActivityState.IN_DUNGEON]: [
		PlayerActivityState.IN_COMBAT,
		PlayerActivityState.IDLE, // Can return to town
	],
	[PlayerActivityState.IN_COMBAT]: [
		PlayerActivityState.IN_DUNGEON, // After combat
		PlayerActivityState.IDLE, // Fled or defeated
	],
	[PlayerActivityState.SHOPPING]: [PlayerActivityState.IDLE],
	[PlayerActivityState.CRAFTING]: [PlayerActivityState.IDLE],
	[PlayerActivityState.IN_TAVERN]: [PlayerActivityState.IDLE],
	[PlayerActivityState.IN_ARENA]: [
		PlayerActivityState.IN_COMBAT,
		PlayerActivityState.IDLE,
	],
	[PlayerActivityState.MANAGING_CHARACTER]: [PlayerActivityState.IDLE],
}

/**
 * Player State Service
 * Manages and validates player activity state transitions
 */
export class PlayerStateService {
	private currentState: PlayerActivityState = PlayerActivityState.IDLE

	/**
	 * Get the current player state
	 */
	getState(): PlayerActivityState {
		return this.currentState
	}

	/**
	 * Set the player state
	 * @param newState The new state to transition to
	 * @returns true if transition was successful, false otherwise
	 */
	setState(newState: PlayerActivityState): boolean {
		if (this.canTransition(newState)) {
			this.currentState = newState
			return true
		}
		return false
	}

	/**
	 * Check if a transition to a new state is valid
	 * @param newState The state to check
	 * @returns true if transition is allowed, false otherwise
	 */
	canTransition(newState: PlayerActivityState): boolean {
		const allowedTransitions = STATE_TRANSITIONS[this.currentState]
		return allowedTransitions.includes(newState)
	}

	/**
	 * Get the redirect route for the current state
	 * @returns The route path for the current state
	 */
	getRedirectRoute(): string {
		const route = Object.entries(ROUTE_STATE_MAP).find(
			([_, state]) => state === this.currentState
		)
		return route ? route[0] : '/game/town-square'
	}

	/**
	 * Get the state for a given route
	 * @param route The route path
	 * @returns The corresponding player state or IDLE if not found
	 */
	getStateForRoute(route: string): PlayerActivityState {
		return ROUTE_STATE_MAP[route] ?? PlayerActivityState.IDLE
	}

	/**
	 * Reset state to IDLE
	 */
	reset(): void {
		this.currentState = PlayerActivityState.IDLE
	}

	/**
	 * Force set state (bypass validation)
	 * Use with caution - only for special cases
	 */
	forceState(newState: PlayerActivityState): void {
		this.currentState = newState
	}
}

// Export singleton instance
export const playerStateService = new PlayerStateService()
