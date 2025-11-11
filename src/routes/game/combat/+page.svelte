<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Card, Icon, Portrait } from '$lib/components/ui'
	import { combatStore } from '$lib/stores/combat.svelte'
	import { dungeonStore } from '$lib/stores/dungeon.svelte'
	import { CombatActionType } from '$lib/game/combat/types'
	import type { Combatant } from '$lib/game/combat/types'

	let combat = $derived(combatStore.combat)
	let selectedTarget = $state<string | null>(null)

	// Watch selectedTarget changes
	$effect(() => {
		console.log('[Combat] selectedTarget changed:', selectedTarget)
	})

	onMount(() => {
		console.log('[Combat] Component mounted, combat state:', combat ? {
			id: combat.id,
			state: combat.state,
			player: combat.player.name,
			enemies: combat.enemies.map(e => e.name),
			isPlayerTurn: combatStore.isPlayerTurn(),
		} : 'NO COMBAT')

		// If no active combat, redirect back
		if (!combat) {
			console.log('[Combat] No active combat, redirecting to dungeon')
			goto('/game/dungeon')
		}
	})

	function handleAttack() {
		console.log('[Combat] Attack button clicked, selectedTarget:', selectedTarget)

		if (!combat || !selectedTarget) {
			console.log('[Combat] Cannot attack - combat:', !!combat, 'selectedTarget:', selectedTarget)
			return
		}

		console.log('[Combat] Executing attack action')
		combatStore.executeAction({
			type: CombatActionType.ATTACK,
			actorId: combat.player.id,
			targetId: selectedTarget,
		})

		// Reset selection
		selectedTarget = null
	}

	function handleDefend() {
		if (!combat) return

		combatStore.executeAction({
			type: CombatActionType.DEFEND,
			actorId: combat.player.id,
		})
	}

	function handleFlee() {
		if (!combat) return

		combatStore.executeAction({
			type: CombatActionType.FLEE,
			actorId: combat.player.id,
		})

		// If successful, go back to dungeon
		if (combatStore.isOver()) {
			combatStore.endCombat()
			goto('/game/dungeon')
		}
	}

	function handleCombatEnd() {
		if (!combat) return

		const victory = combat.state === 'victory'

		// End combat
		combatStore.endCombat()

		if (victory) {
			alert('Victory! You defeated all enemies!')
			goto('/game/dungeon')
		} else {
			alert('Defeat... You have been defeated.')
			dungeonStore.endDungeon()
			goto('/game/town-square')
		}
	}

	function getCombatantPortrait(combatant: Combatant) {
		// Convert combatant to Character-like object for Portrait component
		const result = {
			id: combatant.id,
			name: combatant.name,
			portraitId: combatant.portraitId || (combatant.type === 'player' ? 'player_01' : 'goblin_01'),
			level: combatant.level,
			experience: 0,
			experienceToNextLevel: 100,
			health: combatant.currentHp,
			maxHealth: combatant.maxHp,
			mana: combatant.currentMp,
			maxMana: combatant.maxMp,
			strength: combatant.attack,
			dexterity: combatant.speed,
			intelligence: combatant.magicAttack,
			vitality: combatant.defense,
		}

		console.log('[Combat] Converting combatant to portrait:', {
			combatantId: combatant.id,
			combatantName: combatant.name,
			combatantType: combatant.type,
			portraitId: result.portraitId,
			hp: `${combatant.currentHp}/${combatant.maxHp}`,
			mp: `${combatant.currentMp}/${combatant.maxMp}`,
		})

		return result
	}

	$effect(() => {
		// Check if combat ended
		if (combat && combatStore.isOver()) {
			setTimeout(handleCombatEnd, 1500)
		}
	})

	// Auto-process enemy turns
	$effect(() => {
		if (!combat || combatStore.isOver() || combatStore.isPlayerTurn()) return

		console.log('[Combat] Enemy turn detected, processing automatically...')

		// Wait a bit for UI to update, then process enemy turn
		setTimeout(() => {
			if (!combat || combatStore.isOver() || combatStore.isPlayerTurn()) return

			const currentActorId = combat.turnOrder[combat.currentTurnIndex]
			const currentActor = combat.enemies.find((e) => e.id === currentActorId)

			if (currentActor && currentActor.currentHp > 0) {
				console.log('[Combat] Processing turn for:', currentActor.name)
				combatStore.executeAction({
					type: CombatActionType.ATTACK,
					actorId: currentActor.id,
					targetId: combat.player.id,
				})
			}
		}, 1000) // 1 second delay to let player see what's happening
	})
</script>

{#if combat}
	<div class="page-container">
		<div class="container">
			<!-- Combat Header -->
			<Card variant="elevated" class="combat-header">
				<div class="header-content">
					<Icon icon="game-icons-crossed-swords" size="xl" class="text-arcana-red-400" />
					<h1 class="arcana-heading-lg">Combat</h1>
					<div class="turn-indicator">
						{#if combatStore.isPlayerTurn()}
							<span class="arcana-text-sm text-arcana-green-400">Your Turn</span>
						{:else}
							<span class="arcana-text-sm text-arcana-yellow-400">Enemy Turn</span>
						{/if}
					</div>
				</div>
			</Card>

			<!-- Combat Arena -->
			<div class="combat-arena">
				<!-- Player Side -->
				<Card variant="elevated" class="combatant-card player-card">
					<Portrait character={getCombatantPortrait(combat.player)} size="large" />
					<div class="combatant-info">
						<h2 class="arcana-heading-md">{combat.player.name}</h2>
						<div class="health-bar">
							<div class="bar-label">
								<Icon icon="game-icons-health-normal" size="sm" class="text-arcana-red-400" />
								<span class="arcana-text-xs">
									HP: {combat.player.currentHp}/{combat.player.maxHp}
								</span>
							</div>
							<div class="bar-container">
								<div
									class="bar-fill hp"
									style="width: {(combat.player.currentHp / combat.player.maxHp) * 100}%"
								></div>
							</div>
						</div>
						<div class="mana-bar">
							<div class="bar-label">
								<Icon icon="game-icons-crystal-wand" size="sm" class="text-arcana-cyan-400" />
								<span class="arcana-text-xs">
									MP: {combat.player.currentMp}/{combat.player.maxMp}
								</span>
							</div>
							<div class="bar-container">
								<div
									class="bar-fill mp"
									style="width: {(combat.player.currentMp / combat.player.maxMp) * 100}%"
								></div>
							</div>
						</div>
					</div>
				</Card>

				<!-- VS Indicator -->
				<div class="vs-indicator">
					<Icon icon="game-icons-crossed-swords" size="2xl" class="text-arcana-magenta-400" />
				</div>

				<!-- Enemy Side -->
				<div class="enemies-container">
					{#each combat.enemies as enemy}
						<Card
							variant="interactive"
							class="combatant-card enemy-card {selectedTarget === enemy.id ? 'selected' : ''} {enemy.currentHp <= 0 ? 'defeated' : ''}"
							onclick={() => {
								console.log('[Combat] Enemy card clicked:', {
									enemyId: enemy.id,
									enemyName: enemy.name,
									currentHp: enemy.currentHp,
									isAlive: enemy.currentHp > 0,
								})
								if (enemy.currentHp > 0) {
									selectedTarget = enemy.id
									console.log('[Combat] Target selected:', selectedTarget)
								} else {
									console.log('[Combat] Cannot select defeated enemy')
								}
							}}
						>
							<Portrait character={getCombatantPortrait(enemy)} size="medium" />
							<div class="combatant-info">
								<h3 class="arcana-heading-sm">{enemy.name}</h3>
								<div class="health-bar">
									<div class="bar-label">
										<Icon icon="game-icons-health-normal" size="sm" class="text-arcana-red-400" />
										<span class="arcana-text-xs">
											HP: {enemy.currentHp}/{enemy.maxHp}
										</span>
									</div>
									<div class="bar-container">
										<div
											class="bar-fill hp"
											style="width: {(enemy.currentHp / enemy.maxHp) * 100}%"
										></div>
									</div>
								</div>
								{#if selectedTarget === enemy.id}
									<div class="target-badge">
										<Icon icon="game-icons-crosshair" size="sm" />
										<span class="arcana-text-xs">Target</span>
									</div>
								{/if}
							</div>
						</Card>
					{/each}
				</div>
			</div>

			<!-- Action Panel -->
			{#if !combatStore.isOver()}
				<Card variant="elevated" class="action-panel">
					<div class="actions-grid">
						<Button
							variant="danger"
							size="lg"
							disabled={!selectedTarget || !combatStore.isPlayerTurn()}
							onclick={handleAttack}
						>
							<Icon icon="game-icons-sword-brandish" size="md" />
							Attack
						</Button>
						<Button variant="primary" size="lg" disabled={!combatStore.isPlayerTurn()} onclick={handleDefend}>
							<Icon icon="game-icons-shield" size="md" />
							Defend
						</Button>
						<Button variant="secondary" size="lg" disabled>
							<Icon icon="game-icons-fire-spell-cast" size="md" />
							Skills (Soon)
						</Button>
						<Button variant="ghost" size="lg" disabled={!combatStore.isPlayerTurn()} onclick={handleFlee}>
							<Icon icon="game-icons-run" size="md" />
							Flee
						</Button>
					</div>
					{#if !selectedTarget}
						<p class="arcana-text-xs text-arcana-text-muted text-center mt-4">
							Select an enemy to attack
						</p>
					{/if}
				</Card>
			{/if}

			<!-- Combat Log -->
			<Card variant="elevated" class="combat-log">
				<div class="log-header">
					<Icon icon="game-icons-scroll-unfurled" size="sm" class="text-arcana-gold-300" />
					<h3 class="arcana-heading-sm">Combat Log</h3>
				</div>
				<div class="log-content">
					{#each combat.log.slice(-5).reverse() as entry}
						<div class="log-entry arcana-text-xs">{entry}</div>
					{/each}
				</div>
			</Card>
		</div>
	</div>
{/if}

<style>
	.page-container {
		min-height: 100vh;
		padding: var(--spacing-xl);
		background: var(--color-background);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.combat-header {
		padding: var(--spacing-lg);
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		justify-content: center;
	}

	.turn-indicator {
		margin-left: auto;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-md);
	}

	.combat-arena {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: var(--spacing-xl);
		align-items: center;
	}

	.combatant-card {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
	}

	.player-card {
		border: 2px solid var(--color-arcana-green-500);
	}

	.enemy-card {
		cursor: pointer;
		border: 2px solid var(--color-border);
		transition: all 0.2s ease;
	}

	.enemy-card:hover:not(.defeated) {
		border-color: var(--color-arcana-red-500);
		transform: translateY(-4px);
	}

	.enemy-card.selected {
		border-color: var(--color-arcana-red-500);
		box-shadow: 0 0 20px var(--color-arcana-red-500-alpha-50);
	}

	.enemy-card.defeated {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.vs-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.5;
	}

	.enemies-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.combatant-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		text-align: center;
	}

	.health-bar,
	.mana-bar {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.bar-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		justify-content: center;
	}

	.bar-container {
		height: 8px;
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-full);
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		transition: width 0.3s ease;
		border-radius: var(--border-radius-full);
	}

	.bar-fill.hp {
		background: linear-gradient(90deg, var(--color-arcana-red-500), var(--color-arcana-red-400));
	}

	.bar-fill.mp {
		background: linear-gradient(90deg, var(--color-arcana-cyan-500), var(--color-arcana-cyan-400));
	}

	.target-badge {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		justify-content: center;
		color: var(--color-arcana-red-400);
		padding: var(--spacing-xs);
		background: var(--color-arcana-red-500-alpha-10);
		border-radius: var(--border-radius-sm);
	}

	.action-panel {
		padding: var(--spacing-lg);
	}

	.actions-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-md);
	}

	.combat-log {
		padding: var(--spacing-md);
		max-height: 200px;
	}

	.log-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--color-border);
	}

	.log-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		max-height: 120px;
		overflow-y: auto;
	}

	.log-entry {
		padding: var(--spacing-xs);
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-sm);
	}

	@media (max-width: 1024px) {
		.combat-arena {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.vs-indicator {
			order: 2;
		}

		.player-card {
			order: 1;
		}

		.enemies-container {
			order: 3;
		}

		.actions-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
