<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { playerStore } from '$lib/stores/playerStore.svelte'
	import { Card, Icon } from '$lib/components/ui'

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

	// Area icons mapping
	const areaIcons = {
		dungeons: 'game-icons-dungeon-gate',
		blacksmith: 'game-icons-anvil',
		tavern: 'game-icons-beer-stein',
		market: 'game-icons-shop',
		arena: 'game-icons-crossed-swords',
		character: 'game-icons-player-next',
	}
</script>

{#if playerStore.loading}
	<div class="loading">
		<p class="arcana-text">Loading...</p>
	</div>
{:else if playerStore.player}
	<div class="town-square">
		<div class="container">
			<!-- Title -->
			<div class="text-center mb-12">
				<h1 class="arcana-heading-lg mb-2">Town Square</h1>
				<div class="title-divider"></div>
			</div>

			<!-- Player Info Card -->
			<Card variant="gold" class="mb-8">
				<div class="player-info">
					<div class="player-name">
						<Icon icon="game-icons-player-next" size="xl" class="text-arcana-gold-400" />
						<h2 class="arcana-heading-md">{playerStore.player.name}</h2>
					</div>
					<div class="player-stats">
						<div class="stat-item">
							<Icon icon="game-icons-upgrade" size="md" class="text-arcana-cyan-400" />
							<span class="stat-label">Level</span>
							<span class="stat-value">{playerStore.player.stats.level}</span>
						</div>
						<div class="stat-item">
							<Icon icon="game-icons-two-coins" size="md" class="text-arcana-gold-400" />
							<span class="stat-label">Gold</span>
							<span class="stat-value">{playerStore.player.gold}</span>
						</div>
					</div>
				</div>
			</Card>

			<!-- Areas Grid -->
			<div class="areas-grid">
				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.dungeons} size="2xl" class="text-arcana-magenta-400" />
					</div>
					<h3 class="area-title">Dungeons</h3>
					<p class="area-description">Coming soon...</p>
				</Card>

				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.blacksmith} size="2xl" class="text-arcana-orange-500" />
					</div>
					<h3 class="area-title">Blacksmith</h3>
					<p class="area-description">Coming soon...</p>
				</Card>

				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.tavern} size="2xl" class="text-arcana-gold-400" />
					</div>
					<h3 class="area-title">Tavern</h3>
					<p class="area-description">Coming soon...</p>
				</Card>

				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.market} size="2xl" class="text-arcana-cyan-400" />
					</div>
					<h3 class="area-title">Market</h3>
					<p class="area-description">Coming soon...</p>
				</Card>

				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.arena} size="2xl" class="text-arcana-orange-600" />
					</div>
					<h3 class="area-title">Arena</h3>
					<p class="area-description">Coming soon...</p>
				</Card>

				<Card variant="elevated" class="area-card">
					<div class="area-icon">
						<Icon icon={areaIcons.character} size="2xl" class="text-arcana-gold-300" />
					</div>
					<h3 class="area-title">Character</h3>
					<p class="area-description">Coming soon...</p>
				</Card>
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
		text-align: center;
	}

	.player-name {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md);
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

	:global(.area-card) {
		cursor: pointer;
		text-align: center;
		transition: all var(--transition-base);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-2xl) !important;
	}

	:global(.area-card:hover) {
		transform: translateY(-8px) scale(1.02);
		border-color: var(--color-arcana-gold-600) !important;
		box-shadow:
			var(--shadow-2xl),
			0 0 40px rgba(201, 152, 74, 0.3) !important;
	}

	.area-icon {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-arcana-bg-primary);
		border-radius: var(--radius-full);
		border: 3px solid var(--color-arcana-border-gold);
		box-shadow: var(--shadow-lg);
		transition: all var(--transition-base);
	}

	:global(.area-card:hover) .area-icon {
		transform: scale(1.1) rotate(5deg);
		border-color: var(--color-arcana-gold-500);
		box-shadow: var(--shadow-xl), var(--glow-gold);
	}

	.area-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		margin: 0;
	}

	.area-description {
		font-size: var(--text-sm);
		color: var(--color-arcana-text-muted);
		font-style: italic;
		margin: 0;
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
