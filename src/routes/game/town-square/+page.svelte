<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { playerStore } from '$lib/stores/playerStore.svelte'

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
</script>

{#if playerStore.loading}
	<div class="loading">
		<p>Loading...</p>
	</div>
{:else if playerStore.player}
	<div class="town-square">
		<div class="container">
			<h1 class="title">Town Square</h1>

			<!-- Player Info -->
			<div class="player-info">
				<h2>{playerStore.player.name}</h2>
				<p>Level: {playerStore.player.stats.level}</p>
				<p>Gold: {playerStore.player.gold}</p>
			</div>

			<!-- Placeholder Areas -->
			<div class="areas-grid">
				<div class="area-card">
					<h3>Dungeons</h3>
					<p>Coming soon...</p>
				</div>

				<div class="area-card">
					<h3>Blacksmith</h3>
					<p>Coming soon...</p>
				</div>

				<div class="area-card">
					<h3>Tavern</h3>
					<p>Coming soon...</p>
				</div>

				<div class="area-card">
					<h3>Market</h3>
					<p>Coming soon...</p>
				</div>

				<div class="area-card">
					<h3>Arena</h3>
					<p>Coming soon...</p>
				</div>

				<div class="area-card">
					<h3>Character</h3>
					<p>Coming soon...</p>
				</div>
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
		background: var(--color-neutral-900);
		color: var(--color-neutral-100);
	}

	.town-square {
		min-height: 100vh;
		background: linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-primary-900) 100%);
		padding: var(--spacing-xl) var(--spacing-md);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.title {
		font-size: 2.5rem;
		font-weight: bold;
		text-align: center;
		color: var(--color-primary-100);
		margin-bottom: var(--spacing-xl);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.player-info {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-align: center;
		color: var(--color-neutral-100);
	}

	.player-info h2 {
		font-size: 1.5rem;
		color: var(--color-primary-300);
		margin-bottom: var(--spacing-sm);
	}

	.areas-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.area-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: var(--spacing-xl);
		border: 2px solid var(--color-neutral-600);
		cursor: pointer;
		transition: all 0.3s;
		text-align: center;
	}

	.area-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary-500);
		box-shadow: 0 8px 24px rgba(var(--color-primary-500-rgb), 0.3);
	}

	.area-card h3 {
		font-size: 1.5rem;
		color: var(--color-primary-300);
		margin-bottom: var(--spacing-sm);
	}

	.area-card p {
		color: var(--color-neutral-400);
		font-style: italic;
	}

	@media (max-width: 640px) {
		.title {
			font-size: 2rem;
		}

		.areas-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
