<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button, Card, Icon } from '$lib/components/ui'
	import { LL } from '$lib/i18n/i18n-svelte'

	function returnToTown() {
		goto('/game/town-square')
	}
</script>

<div class="page-container">
	<div class="container">
		<Card variant="elevated" class="text-center">
			<Icon icon="game-icons-dungeon-gate" size="2xl" class="text-arcana-magenta-400 mb-6" />
			<h1 class="arcana-heading-lg mb-4">Dungeons</h1>
			<p class="arcana-text mb-8">
				The dungeon generation system is coming soon. Prepare yourself for procedurally generated challenges!
			</p>
			<Button variant="primary" onclick={returnToTown}>
				← Return to Town Square
			</Button>
		</Card>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl);
	}

	.container {
		max-width: 600px;
		width: 100%;
	}
</style>
