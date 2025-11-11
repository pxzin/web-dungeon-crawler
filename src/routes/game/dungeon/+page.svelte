<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { Button, Card, Icon } from '$lib/components/ui'
	import { dungeonStore } from '$lib/stores/dungeon.svelte'
	import { combatStore } from '$lib/stores/combat.svelte'
	import { toastStore } from '$lib/stores/toast.svelte'
	import { persistence } from '$lib/persistence/instance'
	import { TileType } from '$lib/game/dungeon'
	import type { Combatant } from '$lib/game/combat/types'

	let session = $derived(dungeonStore.session)

	onMount(() => {
		// If no active dungeon, redirect to dungeon selection
		if (!session) {
			goto('/game/dungeons')
		}
	})

	function exitDungeon() {
		dungeonStore.endDungeon()
		goto('/game/town-square')
	}

	function proceedToNextFloor() {
		const success = dungeonStore.nextFloor()
		if (!success) {
			// Dungeon complete!
			toastStore.success('Congratulations! You have completed the dungeon!')
			setTimeout(exitDungeon, 2000)
		}
	}

	async function exploreDungeon() {
		// Get unexplored rooms
		const unexploredRooms = dungeonStore.getUnexploredRooms()
		if (unexploredRooms.length === 0) {
			toastStore.warning('All rooms explored! Proceed to next floor or exit.')
			return
		}

		// Pick a random room to explore
		const room = unexploredRooms[Math.floor(Math.random() * unexploredRooms.length)]

		// Explore the room
		const result = dungeonStore.exploreRoom(room.id)

		if (result.hasEnemies) {
			// Start combat!
			const playerResult = await persistence.getPlayerData()
			if (!playerResult.success || !playerResult.data) {
				toastStore.error('Error: Could not load player data')
				return
			}

			const player = playerResult.data

			console.log('[Dungeon] Player data loaded:', {
				id: player.id,
				name: player.name,
				level: player.stats.level,
				health: player.resources.health,
				maxHealth: player.resources.maxHealth,
				mana: player.resources.mana,
				maxMana: player.resources.maxMana,
				portraitId: player.portraitId,
			})

			// Convert player to Combatant
			const playerCombatant: Combatant = {
				id: player.id,
				name: player.name,
				type: 'player',
				level: player.stats.level,
				maxHp: player.resources.maxHealth,
				currentHp: player.resources.health,
				maxMp: player.resources.maxMana,
				currentMp: player.resources.mana,
				attack: player.stats.strength * 2,
				defense: Math.floor(player.stats.vitality * 1.5),
				magicAttack: player.stats.intelligence * 2,
				magicDefense: Math.floor(player.stats.intelligence * 1.5),
				speed: Math.floor(player.stats.dexterity * 1.5),
				criticalRate: Math.floor(player.stats.dexterity * 0.5),
				evasion: Math.floor(player.stats.dexterity * 0.3),
				statusEffects: [],
				portraitId: player.portraitId,
			}

			console.log('[Dungeon] Player combatant created:', {
				id: playerCombatant.id,
				name: playerCombatant.name,
				currentHp: playerCombatant.currentHp,
				maxHp: playerCombatant.maxHp,
				currentMp: playerCombatant.currentMp,
				maxMp: playerCombatant.maxMp,
			})

			// Start combat
			combatStore.startCombat(playerCombatant, result.enemyIds)

			// Navigate to combat
			goto('/game/combat')
		} else {
			// Room is empty
			toastStore.info('The room is empty. You found nothing of interest.')
		}
	}

	// Simple tile character mapping for visualization
	function getTileDisplay(tile: TileType): string {
		switch (tile) {
			case TileType.WALL:
				return '█'
			case TileType.FLOOR:
				return '·'
			case TileType.DOOR:
				return '▓'
			case TileType.CORRIDOR:
				return '·'
			case TileType.ENTRANCE:
				return '↑'
			case TileType.EXIT:
				return '↓'
			case TileType.CHEST:
				return '■'
			case TileType.ENEMY:
				return '☠'
			default:
				return ' '
		}
	}

	function getTileColor(tile: TileType): string {
		switch (tile) {
			case TileType.WALL:
				return 'text-arcana-text-muted'
			case TileType.FLOOR:
				return 'text-arcana-text-muted opacity-30'
			case TileType.CORRIDOR:
				return 'text-arcana-text-muted opacity-30'
			case TileType.DOOR:
				return 'text-arcana-yellow-400'
			case TileType.ENTRANCE:
				return 'text-arcana-green-400'
			case TileType.EXIT:
				return 'text-arcana-cyan-400'
			case TileType.CHEST:
				return 'text-arcana-gold-300'
			case TileType.ENEMY:
				return 'text-arcana-red-400'
			default:
				return 'text-arcana-text'
		}
	}
</script>

{#if session}
	<div class="page-container">
		<div class="container">
			<!-- Header -->
			<Card variant="elevated" class="header-card">
				<div class="header-content">
					<div class="dungeon-info">
						<h1 class="arcana-heading-lg">{session.template.name}</h1>
						<p class="arcana-text-sm text-arcana-text-muted">{session.template.description}</p>
					</div>
					<div class="floor-info">
						<Icon icon="game-icons-stairs" size="lg" class="text-arcana-yellow-400" />
						<span class="arcana-heading-md">
							Floor {session.currentFloor} / {session.template.floorCount}
						</span>
					</div>
				</div>
			</Card>

			<!-- Dungeon Map -->
			<Card variant="elevated" class="map-card">
				<div class="map-header">
					<Icon icon="game-icons-treasure-map" size="lg" class="text-arcana-cyan-400" />
					<h2 class="arcana-heading-md">Dungeon Map</h2>
					<div class="map-stats">
						<span class="arcana-text-xs text-arcana-text-muted">
							{session.dungeon.rooms.length} rooms
						</span>
					</div>
				</div>

				<div class="map-container">
					<div class="map-grid" style="font-family: monospace; line-height: 1;">
						{#each session.dungeon.tiles as row}
							<div class="map-row">
								{#each row as tile}
									<span class="tile {getTileColor(tile)}">{getTileDisplay(tile)}</span>
								{/each}
							</div>
						{/each}
					</div>
				</div>

				<div class="map-legend">
					<div class="legend-item">
						<span class="legend-icon text-arcana-green-400">↑</span>
						<span class="arcana-text-xs">Entrance</span>
					</div>
					<div class="legend-item">
						<span class="legend-icon text-arcana-cyan-400">↓</span>
						<span class="arcana-text-xs">Exit</span>
					</div>
					<div class="legend-item">
						<span class="legend-icon text-arcana-gold-300">■</span>
						<span class="arcana-text-xs">Chest</span>
					</div>
					<div class="legend-item">
						<span class="legend-icon text-arcana-red-400">☠</span>
						<span class="arcana-text-xs">Enemy</span>
					</div>
				</div>
			</Card>

			<!-- Actions -->
			<div class="actions">
				<Card variant="interactive" class="action-card">
					<Icon icon="game-icons-dungeon-gate" size="xl" class="text-arcana-magenta-400" />
					<h3 class="arcana-heading-sm">Explore Dungeon</h3>
					<p class="arcana-text-xs text-arcana-text-muted">
						Navigate through rooms and corridors
					</p>
					<Button variant="primary" fullWidth onclick={exploreDungeon}>
						<Icon icon="game-icons-walking-boot" size="sm" />
						Explore
					</Button>
				</Card>

				{#if session.currentFloor < session.template.floorCount}
					<Card variant="interactive" class="action-card">
						<Icon icon="game-icons-stairs-goal" size="xl" class="text-arcana-cyan-400" />
						<h3 class="arcana-heading-sm">Next Floor</h3>
						<p class="arcana-text-xs text-arcana-text-muted">Descend to floor {session.currentFloor + 1}</p>
						<Button variant="primary" fullWidth onclick={proceedToNextFloor}>
							<Icon icon="game-icons-stairs" size="sm" />
							Proceed
						</Button>
					</Card>
				{:else}
					<Card variant="interactive" class="action-card">
						<Icon icon="game-icons-crowned-skull" size="xl" class="text-arcana-gold-300" />
						<h3 class="arcana-heading-sm">Boss Floor</h3>
						<p class="arcana-text-xs text-arcana-text-muted">Face the dungeon boss</p>
						<Button variant="danger" fullWidth disabled>
							<Icon icon="game-icons-battle-gear" size="sm" />
							Face Boss (Coming Soon)
						</Button>
					</Card>
				{/if}

				<Card variant="interactive" class="action-card">
					<Icon icon="game-icons-exit-door" size="xl" class="text-arcana-red-400" />
					<h3 class="arcana-heading-sm">Leave Dungeon</h3>
					<p class="arcana-text-xs text-arcana-text-muted">Return to town square</p>
					<Button variant="secondary" fullWidth onclick={exitDungeon}>
						<Icon icon="game-icons-return-arrow" size="sm" />
						Exit
					</Button>
				</Card>
			</div>
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
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.header-card {
		padding: var(--spacing-lg);
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.dungeon-info {
		flex: 1;
	}

	.floor-info {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.map-card {
		padding: var(--spacing-lg);
	}

	.map-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
	}

	.map-stats {
		margin-left: auto;
	}

	.map-container {
		background: var(--color-surface-darker);
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-md);
		padding: var(--spacing-md);
		overflow: auto;
		max-height: 500px;
	}

	.map-grid {
		display: inline-block;
		min-width: 100%;
	}

	.map-row {
		white-space: nowrap;
	}

	.tile {
		display: inline-block;
		width: 0.6em;
		text-align: center;
		font-size: 12px;
	}

	.map-legend {
		display: flex;
		gap: var(--spacing-lg);
		margin-top: var(--spacing-md);
		padding: var(--spacing-md);
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-md);
		flex-wrap: wrap;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.legend-icon {
		font-family: monospace;
		font-size: 1.2rem;
		width: 1.5rem;
		text-align: center;
	}

	.actions {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-md);
	}

	.action-card {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		text-align: center;
	}

	@media (max-width: 768px) {
		.header-content {
			flex-direction: column;
			text-align: center;
		}

		.map-container {
			max-height: 300px;
		}

		.tile {
			font-size: 10px;
		}

		.actions {
			grid-template-columns: 1fr;
		}
	}
</style>
