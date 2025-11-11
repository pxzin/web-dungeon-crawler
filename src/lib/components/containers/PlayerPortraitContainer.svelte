<script lang="ts">
	import { onMount } from 'svelte'
	import { Portrait } from '$lib/components/ui'
	import { persistence } from '$lib/persistence/instance'
	import type { Character } from '$lib/game/character'
	import type { PlayerData } from '$lib/persistence/types'

	interface Props {
		size?: 'small' | 'medium' | 'large'
		class?: string
		maxVisibleEffects?: number
	}

	let { size = 'medium', class: className = '', maxVisibleEffects = 3 }: Props = $props()

	let playerData = $state<PlayerData | null>(null)
	let loading = $state(true)

	// Convert PlayerData to Character format for Portrait component
	const character = $derived.by((): Character | null => {
		if (!playerData) return null

		return {
			id: playerData.id,
			name: playerData.name,
			portraitId: playerData.portraitId,
			class: playerData.class,
			level: playerData.stats.level,
			experience: playerData.stats.experience,
			experienceToNextLevel: playerData.stats.experienceToNextLevel,
			health: playerData.resources.health,
			maxHealth: playerData.resources.maxHealth,
			mana: playerData.resources.mana,
			maxMana: playerData.resources.maxMana,
			stamina: playerData.resources.stamina,
			maxStamina: playerData.resources.maxStamina,
			strength: playerData.stats.strength,
			dexterity: playerData.stats.dexterity,
			intelligence: playerData.stats.intelligence,
			vitality: playerData.stats.vitality,
			luck: playerData.stats.luck,
			attack: playerData.stats.attack,
			defense: playerData.stats.defense,
			magicAttack: playerData.stats.magicAttack,
			magicDefense: playerData.stats.magicDefense,
			speed: playerData.stats.speed,
			criticalRate: playerData.stats.criticalRate,
			evasion: playerData.stats.evasion,
			statusEffects: [],
		}
	})

	onMount(async () => {
		await loadPlayerData()
		loading = false
	})

	async function loadPlayerData() {
		const result = await persistence.getPlayerData()
		if (result.success && result.data) {
			playerData = result.data
		}
	}

	// Refresh player data when component becomes visible or on demand
	export function refresh() {
		loadPlayerData()
	}
</script>

{#if loading}
	<div class="loading-placeholder">
		<div class="loading-spinner"></div>
	</div>
{:else if character}
	<Portrait {character} {size} class={className} {maxVisibleEffects} />
{:else}
	<div class="error-message">Failed to load player data</div>
{/if}

<style>
	.loading-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100px;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--color-border);
		border-top-color: var(--color-arcana-cyan-400);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-message {
		padding: var(--spacing-md);
		color: var(--color-arcana-red-400);
		text-align: center;
	}
</style>
