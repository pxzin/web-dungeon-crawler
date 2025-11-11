<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'

	const persistence = createPersistenceService(new LocalStorageAdapter())

	let hasSaveData = $state(false)
	let loading = $state(true)

	onMount(async () => {
		await persistence.init()

		const result = await persistence.hasSaveData()
		if (result.success) {
			hasSaveData = result.data
		}

		loading = false
	})

	async function startNewGame() {
		await goto('/character-creation')
	}

	async function continueGame() {
		await goto('/game/town-square')
	}

	console.log($LL.game.title())
</script>

<div class="home">
	<div class="container">
		<h1 class="title">{$LL.game.title()}</h1>

		{#if loading}
			<div class="loading">
				<p>Loading...</p>
			</div>
		{:else}
			<div class="menu">
				<button class="menu-button" onclick={startNewGame}>
					{$LL.game.ui.newGame()}
				</button>

				{#if hasSaveData}
					<button class="menu-button" onclick={continueGame}>
						{$LL.game.ui.continue()}
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.home {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-primary-900) 100%);
		padding: var(--spacing-xl) var(--spacing-md);
	}

	.container {
		text-align: center;
		max-width: 600px;
		width: 100%;
	}

	.title {
		font-size: 3.5rem;
		font-weight: bold;
		color: var(--color-primary-100);
		margin-bottom: var(--spacing-2xl);
		text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
		letter-spacing: 2px;
	}

	.loading {
		color: var(--color-neutral-300);
		font-size: 1.25rem;
	}

	.menu {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		align-items: center;
	}

	.menu-button {
		width: 100%;
		max-width: 400px;
		padding: var(--spacing-lg) var(--spacing-xl);
		font-size: 1.5rem;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		color: var(--color-primary-200);
		border: 2px solid var(--color-primary-600);
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.menu-button:hover {
		background: var(--color-primary-600);
		color: white;
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(var(--color-primary-500-rgb), 0.4);
	}

	.menu-button:active {
		transform: translateY(-2px);
	}

	@media (max-width: 640px) {
		.title {
			font-size: 2.5rem;
		}

		.menu-button {
			font-size: 1.25rem;
		}
	}
</style>
