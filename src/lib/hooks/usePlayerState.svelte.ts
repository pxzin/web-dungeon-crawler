/**
 * Player State Hook
 * Svelte 5 rune-based hook for managing player activity state
 */

import { playerStateService, PlayerActivityState } from '$lib/game/player'

/**
 * Create a reactive player state manager
 */
export function usePlayerState() {
	let currentState = $state(playerStateService.getState())

	return {
		get state() {
			return currentState
		},

		setState(newState: PlayerActivityState): boolean {
			const success = playerStateService.setState(newState)
			if (success) {
				currentState = newState
			}
			return success
		},

		canTransition(newState: PlayerActivityState): boolean {
			return playerStateService.canTransition(newState)
		},

		getRedirectRoute(): string {
			return playerStateService.getRedirectRoute()
		},

		getStateForRoute(route: string): PlayerActivityState {
			return playerStateService.getStateForRoute(route)
		},

		reset(): void {
			playerStateService.reset()
			currentState = PlayerActivityState.IDLE
		},

		forceState(newState: PlayerActivityState): void {
			playerStateService.forceState(newState)
			currentState = newState
		},
	}
}
