<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { playerStore } from '$lib/stores/playerStore.svelte'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { Card, Icon, AreaCard, Portrait, LanguageSwitcher } from '$lib/components/ui'

	onMount(async () => {
		// Initialize player store if not already loaded
		if (playerStore.player === null) {
			await playerStore.init()
		}

		// If no player found after init, redirect to character creation
		if (!playerStore.player) {
			await goto('/character-creation')
		}
	})

	// Area configuration with navigation and availability
	interface Area {
		id: string
		icon: string
		iconColor: string
		available: boolean
		route?: string
	}

	const areas: Area[] = [
		{
			id: 'dungeons',
			icon: 'game-icons-dungeon-gate',
			iconColor: 'text-arcana-magenta-400',
			available: true, // Enabled - Navigation ready
			route: '/game/dungeons',
		},
		{
			id: 'blacksmith',
			icon: 'game-icons-anvil',
			iconColor: 'text-arcana-orange-500',
			available: true, // Enabled - Navigation ready
			route: '/game/blacksmith',
		},
		{
			id: 'tavern',
			icon: 'game-icons-beer-stein',
			iconColor: 'text-arcana-gold-400',
			available: true, // Enabled - Navigation ready
			route: '/game/tavern',
		},
		{
			id: 'market',
			icon: 'game-icons-shop',
			iconColor: 'text-arcana-cyan-400',
			available: true, // Enabled - Navigation ready
			route: '/game/market',
		},
		{
			id: 'arena',
			icon: 'game-icons-crossed-swords',
			iconColor: 'text-arcana-orange-600',
			available: true, // Enabled - Navigation ready
			route: '/game/arena',
		},
		{
			id: 'character',
			icon: 'game-icons-player-next',
			iconColor: 'text-arcana-gold-300',
			available: true, // Enabled - Navigation ready
			route: '/game/character',
		},
	]

	function handleAreaClick(area: Area) {
		if (area.available && area.route) {
			goto(area.route)
		}
	}
</script>

{#if playerStore.loading}
	<div class="loading">
		<p class="arcana-text">{$LL.game.ui.loading()}</p>
	</div>
{:else if playerStore.player}
	<div class="town-square">
		<!-- Language Switcher (Fixed Position) -->
		<div class="language-switcher-wrapper">
			<LanguageSwitcher variant="default" />
		</div>

		<div class="container">
			<!-- Title -->
			<div class="text-center mb-12">
				<h1 class="arcana-heading-lg mb-2">{$LL.game.townSquare.title()}</h1>
				<div class="title-divider"></div>
			</div>

			<!-- Player Info Card -->
			<Card variant="gold" class="mb-8">
				<div class="player-info">
					<!-- Player Portrait -->
					<div class="player-portrait">
						<Portrait
							character={{
								id: playerStore.player.id,
								name: playerStore.player.name,
								portraitId: playerStore.player.portraitId,
								class: 'Warrior',
								classIcon: 'game-icons-sword-brandish',
								classDescription: 'A mighty warrior skilled in melee combat and heavy armor',
								level: playerStore.player.stats.level,
								experience: playerStore.player.stats.experience,
								experienceToNextLevel: playerStore.player.stats.experienceToNextLevel,
								health: playerStore.player.resources.health,
								maxHealth: playerStore.player.resources.maxHealth,
								mana: playerStore.player.resources.mana,
								maxMana: playerStore.player.resources.maxMana,
								strength: playerStore.player.stats.strength,
								dexterity: playerStore.player.stats.dexterity,
								intelligence: playerStore.player.stats.intelligence,
								vitality: playerStore.player.stats.vitality,
								luck: playerStore.player.stats.luck,
							}}
							size="medium"
						/>
					</div>

					<!-- Player Stats -->
					<div class="player-stats">
						<div class="stat-item">
							<Icon icon="game-icons-upgrade" size="md" class="text-arcana-cyan-400" />
							<span class="stat-label">{$LL.game.ui.level()}</span>
							<span class="stat-value">{playerStore.player.stats.level}</span>
						</div>
						<div class="stat-item">
							<Icon icon="game-icons-two-coins" size="md" class="text-arcana-gold-400" />
							<span class="stat-label">{$LL.game.townSquare.gold()}</span>
							<span class="stat-value">{playerStore.player.gold}</span>
						</div>
					</div>
				</div>
			</Card>

			<!-- Areas Grid -->
			<div class="areas-grid">
				{#each areas as area}
					<AreaCard
						icon={area.icon}
						iconColor={area.iconColor}
						title={$LL.game.townSquare.areas[area.id].title()}
						description={$LL.game.townSquare.areas[area.id].description()}
						available={area.available}
						onclick={() => handleAreaClick(area)}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background: var(--color-arcana-bg-primary);
	}

	.town-square {
		min-height: 100vh;
		padding: var(--spacing-3xl) var(--spacing-md);
		position: relative;
	}

	/* Language Switcher Fixed Position */
	.language-switcher-wrapper {
		position: fixed;
		top: var(--spacing-lg);
		right: var(--spacing-lg);
		z-index: 50;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Title divider */
	.title-divider {
		width: 120px;
		height: 3px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--color-arcana-gold-500),
			transparent
		);
		margin: 0 auto;
		border-radius: 2px;
	}

	/* Player Info Card */
	.player-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
		align-items: center;
	}

	.player-portrait {
		display: flex;
		justify-content: center;
	}

	.player-stats {
		display: flex;
		justify-content: center;
		gap: var(--spacing-2xl);
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		min-width: 100px;
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-arcana-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.stat-value {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
	}

	/* Areas Grid */
	.areas-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.town-square {
			padding: var(--spacing-2xl) var(--spacing-md);
		}

		.player-stats {
			gap: var(--spacing-lg);
		}

		.areas-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin: 0 auto;
		}
	}
</style>
