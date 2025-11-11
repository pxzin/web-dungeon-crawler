<script lang="ts">
	import { goto } from '$app/navigation'
	import { Button, Card, Icon } from '$lib/components/ui'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { getAllDungeonTemplates, getDungeonTemplate } from '$lib/game/dungeon'
	import { dungeonStore } from '$lib/stores/dungeon.svelte'

	const dungeons = getAllDungeonTemplates()

	function returnToTown() {
		goto('/game/town-square')
	}

	function enterDungeon(dungeonId: string) {
		const template = getDungeonTemplate(dungeonId)
		if (!template) {
			console.error('Dungeon template not found:', dungeonId)
			return
		}

		// Start dungeon session
		dungeonStore.startDungeon(template)

		// Navigate to dungeon
		goto('/game/dungeon')
	}
</script>

<div class="page-container">
	<div class="container">
		<div class="header">
			<h1 class="arcana-heading-xl mb-2">{$LL.game.dungeons.title()}</h1>
			<p class="arcana-text-muted mb-8">{$LL.game.dungeons.subtitle()}</p>
		</div>

		<div class="dungeon-list">
			{#each dungeons as dungeon}
				<Card variant="interactive" class="dungeon-card">
					<div class="dungeon-header">
						<Icon
							icon={dungeon.iconId || 'game-icons-dungeon-gate'}
							size="xl"
							class="text-arcana-magenta-400"
						/>
						<div class="dungeon-info">
							<h2 class="arcana-heading-md mb-1">{dungeon.name}</h2>
							<p class="arcana-text-sm text-arcana-text-muted">{dungeon.description}</p>
						</div>
					</div>

					<div class="dungeon-stats">
						<div class="stat">
							<Icon icon="game-icons-level-four" size="sm" class="text-arcana-cyan-400" />
							<span class="arcana-text-sm">
								{$LL.game.dungeons.level()} {dungeon.recommendedLevel.min}-{dungeon.recommendedLevel.max}
							</span>
						</div>
						<div class="stat">
							<Icon icon="game-icons-stairs" size="sm" class="text-arcana-yellow-400" />
							<span class="arcana-text-sm">{dungeon.floorCount} {$LL.game.dungeons.floors()}</span>
						</div>
					</div>

					<Button variant="primary" fullWidth onclick={() => enterDungeon(dungeon.id)}>
						{$LL.game.dungeons.enterDungeon()}
					</Button>
				</Card>
			{/each}
		</div>

		<div class="footer">
			<Button variant="secondary" onclick={returnToTown}>
				← {$LL.game.dungeons.returnToTown()}
			</Button>
		</div>
	</div>
</div>

<style>
	.page-container {
		min-height: 100vh;
		padding: var(--spacing-xl);
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		width: 100%;
	}

	.header {
		text-align: center;
		margin-bottom: var(--spacing-xl);
	}

	.dungeon-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-xl);
	}

	.dungeon-card {
		padding: var(--spacing-lg);
	}

	.dungeon-header {
		display: flex;
		gap: var(--spacing-md);
		align-items: flex-start;
		margin-bottom: var(--spacing-md);
	}

	.dungeon-info {
		flex: 1;
	}

	.dungeon-stats {
		display: flex;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-md);
	}

	.stat {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.footer {
		text-align: center;
	}

	@media (max-width: 768px) {
		.dungeon-header {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.dungeon-stats {
			flex-direction: column;
			gap: var(--spacing-sm);
		}
	}
</style>
