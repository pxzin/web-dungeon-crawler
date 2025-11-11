<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Card, Icon, Portrait } from '$lib/components/ui'
	import { combatStore } from '$lib/stores/combat.svelte'
	import { dungeonStore } from '$lib/stores/dungeon.svelte'
	import { toastStore } from '$lib/stores/toast.svelte'
	import { persistence } from '$lib/persistence/instance'
	import { CombatActionType } from '$lib/game/combat/types'
	import type { Combatant } from '$lib/game/combat/types'
	import { LL } from '$lib/i18n/i18n-svelte'

	let combat = $derived(combatStore.combat)
	let selectedTarget = $state<string | null>(null)
	let damageAnimation = $state<{ id: string; damage: number; isCritical: boolean } | null>(null)
	let shakeAnimation = $state<string | null>(null)

	onMount(() => {
		// If no active combat, redirect back
		if (!combat) {
			goto('/game/dungeon')
		}
	})

	function handleAttack() {
		if (!combat || !selectedTarget) {
			return
		}

		const targetId = selectedTarget

		combatStore.executeAction({
			type: CombatActionType.ATTACK,
			actorId: combat.player.id,
			targetId: targetId,
		})

		// Show damage animation if attack hit
		const lastLog = combat.log[combat.log.length - 1]
		const damageMatch = lastLog.match(/for (\d+) damage/)
		const isCritical = lastLog.includes('Critical')

		if (damageMatch) {
			const damage = parseInt(damageMatch[1])
			damageAnimation = { id: targetId, damage, isCritical }
			shakeAnimation = targetId

			// Clear animations after delay
			setTimeout(() => {
				damageAnimation = null
				shakeAnimation = null
			}, 1000)
		}

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

		// Check if flee was successful (combat state changed to FLED)
		if (combat.state === 'fled') {
			toastStore.info($LL.game.combat.messages.fledBattle(), 2000)
			setTimeout(() => {
				combatStore.endCombat()
				goto('/game/dungeon')
			}, 1000)
		} else {
			toastStore.warning($LL.game.combat.messages.failedToEscape(), 2000)
		}
	}

	async function handleCombatEnd() {
		if (!combat) return

		const victory = combat.state === 'victory'
		const defeat = combat.state === 'defeat'

		// Save player's current HP/MP
		await savePlayerState()

		if (victory && combat.rewards) {
			// Apply rewards
			await applyRewards(combat.rewards)

			// Show victory message with rewards
			toastStore.success(
				$LL.game.combat.messages.victory({ exp: combat.rewards.experience, gold: combat.rewards.gold }),
				5000
			)

			// Mark room as cleared
			const session = dungeonStore.session
			if (session) {
				// Room is automatically cleared in the store when combat starts
			}

			setTimeout(() => {
				combatStore.endCombat()
				goto('/game/dungeon')
			}, 2000)
		} else if (defeat) {
			toastStore.error($LL.game.combat.messages.defeat(), 3000)

			setTimeout(() => {
				combatStore.endCombat()
				dungeonStore.endDungeon()
				goto('/game/town-square')
			}, 2000)
		} else {
			// Fled
			combatStore.endCombat()
			goto('/game/dungeon')
		}
	}

	async function savePlayerState() {
		if (!combat) return

		const playerResult = await persistence.getPlayerData()
		if (!playerResult.success || !playerResult.data) return

		const playerData = playerResult.data

		// Update resources with current combat values
		playerData.resources.health = Math.max(0, combat.player.currentHp)
		playerData.resources.mana = combat.player.currentMp

		await persistence.setPlayerData(playerData)
	}

	async function applyRewards(rewards: { experience: number; gold: number; items: any[] }) {
		const playerResult = await persistence.getPlayerData()
		if (!playerResult.success || !playerResult.data) return

		const playerData = playerResult.data

		// Add experience
		playerData.stats.experience += rewards.experience

		// Check for level up
		while (playerData.stats.experience >= playerData.stats.experienceToNextLevel) {
			playerData.stats.experience -= playerData.stats.experienceToNextLevel
			playerData.stats.level += 1
			playerData.stats.experienceToNextLevel = Math.floor(playerData.stats.experienceToNextLevel * 1.5)

			// Increase max HP/MP on level up
			playerData.resources.maxHealth += 10
			playerData.resources.maxMana += 5
			playerData.resources.health = playerData.resources.maxHealth
			playerData.resources.mana = playerData.resources.maxMana

			toastStore.success($LL.game.combat.messages.levelUp({ level: playerData.stats.level }), 5000)
		}

		// Add gold
		playerData.gold += rewards.gold

		await persistence.setPlayerData(playerData)
	}

	function getCombatantPortrait(combatant: Combatant) {
		// Convert combatant to Character-like object for Portrait component
		return {
			id: combatant.id,
			name: combatant.name,
			portraitId: combatant.portraitId || (combatant.type === 'player' ? 'player_01' : 'goblin_01'),
			class: combatant.class,
			level: combatant.level,
			experience: 0,
			experienceToNextLevel: 100,
			health: combatant.currentHp,
			maxHealth: combatant.maxHp,
			mana: combatant.currentMp,
			maxMana: combatant.maxMp,
			// Use base attributes if available, otherwise derive from combat stats
			strength: combatant.strength || Math.floor(combatant.attack / 2),
			dexterity: combatant.dexterity || Math.floor(combatant.speed / 1.5),
			intelligence: combatant.intelligence || Math.floor(combatant.magicAttack / 2),
			vitality: combatant.vitality || Math.floor(combatant.defense / 1.5),
		}
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

		// Wait a bit for UI to update, then process enemy turn
		setTimeout(() => {
			if (!combat || combatStore.isOver() || combatStore.isPlayerTurn()) return

			const currentActorId = combat.turnOrder[combat.currentTurnIndex]
			const currentActor = combat.enemies.find((e) => e.id === currentActorId)

			if (currentActor && currentActor.currentHp > 0) {
				combatStore.executeAction({
					type: CombatActionType.ATTACK,
					actorId: currentActor.id,
					targetId: combat.player.id,
				})

				// Show damage animation on player if attack hit
				const lastLog = combat.log[combat.log.length - 1]
				const damageMatch = lastLog.match(/for (\d+) damage/)
				const isCritical = lastLog.includes('Critical')

				if (damageMatch) {
					const damage = parseInt(damageMatch[1])
					damageAnimation = { id: combat.player.id, damage, isCritical }
					shakeAnimation = combat.player.id

					// Clear animations after delay
					setTimeout(() => {
						damageAnimation = null
						shakeAnimation = null
					}, 1000)
				}
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
					<h1 class="arcana-heading-lg">{$LL.game.combat.title()}</h1>
					<div class="turn-indicator">
						{#if combatStore.isPlayerTurn()}
							<span class="arcana-text-sm text-arcana-green-400">{$LL.game.combat.yourTurn()}</span>
						{:else}
							<span class="arcana-text-sm text-arcana-yellow-400">{$LL.game.combat.enemyTurn()}</span>
						{/if}
					</div>
				</div>
			</Card>

			<!-- Combat Arena -->
			<div class="combat-arena">
				<!-- Player Side -->
				<Card
					variant="elevated"
					class="combatant-card player-card {shakeAnimation === combat.player.id ? 'shake' : ''}"
				>
					<Portrait character={getCombatantPortrait(combat.player)} size="large" />
					{#if damageAnimation && damageAnimation.id === combat.player.id}
						<div class="damage-number {damageAnimation.isCritical ? 'critical' : ''}">
							-{damageAnimation.damage}
						</div>
					{/if}
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
							class="combatant-card enemy-card {selectedTarget === enemy.id ? 'selected' : ''} {enemy.currentHp <= 0 ? 'defeated' : ''} {shakeAnimation === enemy.id ? 'shake' : ''}"
							onclick={() => {
								if (enemy.currentHp > 0) {
									selectedTarget = enemy.id
								}
							}}
						>
							<Portrait character={getCombatantPortrait(enemy)} size="medium" />
							{#if damageAnimation && damageAnimation.id === enemy.id}
								<div class="damage-number {damageAnimation.isCritical ? 'critical' : ''}">
									-{damageAnimation.damage}
								</div>
							{/if}
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
										<span class="arcana-text-xs">{$LL.game.combat.target()}</span>
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
							{$LL.game.combat.actions.attack()}
						</Button>
						<Button variant="primary" size="lg" disabled={!combatStore.isPlayerTurn()} onclick={handleDefend}>
							<Icon icon="game-icons-shield" size="md" />
							{$LL.game.combat.actions.defend()}
						</Button>
						<Button variant="secondary" size="lg" disabled>
							<Icon icon="game-icons-fire-spell-cast" size="md" />
							{$LL.game.combat.actions.skills()}
						</Button>
						<Button variant="ghost" size="lg" disabled={!combatStore.isPlayerTurn()} onclick={handleFlee}>
							<Icon icon="game-icons-run" size="md" />
							{$LL.game.combat.actions.flee()}
						</Button>
					</div>
					{#if !selectedTarget}
						<p class="arcana-text-xs text-arcana-text-muted text-center mt-4">
							{$LL.game.combat.selectEnemy()}
						</p>
					{/if}
				</Card>
			{/if}

			<!-- Combat Log -->
			<Card variant="elevated" class="combat-log">
				<div class="log-header">
					<Icon icon="game-icons-scroll-unfurled" size="sm" class="text-arcana-gold-300" />
					<h3 class="arcana-heading-sm">{$LL.game.combat.combatLog()}</h3>
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

	/* Combat Animations */
	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	@keyframes damageFloat {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-40px);
		}
	}

	.shake {
		animation: shake 0.3s ease-in-out;
	}

	.damage-number {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2rem;
		font-weight: bold;
		color: var(--color-arcana-red-400);
		animation: damageFloat 1s ease-out forwards;
		pointer-events: none;
		z-index: 10;
		text-shadow:
			2px 2px 4px rgba(0, 0, 0, 0.8),
			-1px -1px 2px rgba(0, 0, 0, 0.5);
	}

	.damage-number.critical {
		color: var(--color-arcana-gold-300);
		font-size: 2.5rem;
		text-shadow:
			0 0 10px var(--color-arcana-gold-300),
			2px 2px 4px rgba(0, 0, 0, 0.8),
			-1px -1px 2px rgba(0, 0, 0, 0.5);
	}

	.combatant-card {
		position: relative;
	}
</style>
