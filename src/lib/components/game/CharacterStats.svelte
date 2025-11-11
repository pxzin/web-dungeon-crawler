<script lang="ts">
	import type { Character } from '$lib/game/character/types'
	import { Icon } from '$lib/components/ui'

	interface Props {
		character: Character
		class?: string
	}

	let { character, class: className }: Props = $props()

	// Calculate modifiers
	const strengthMod = $derived(Math.floor((character.strength - 10) / 2))
	const dexterityMod = $derived(Math.floor((character.dexterity - 10) / 2))
	const intelligenceMod = $derived(Math.floor((character.intelligence - 10) / 2))
	const vitalityMod = $derived(Math.floor((character.vitality - 10) / 2))

	// Calculate derived stats (simplified - should match game logic)
	const attack = $derived(character.strength * 2 + character.level)
	const defense = $derived(Math.floor(character.vitality * 1.5 + character.level * 0.5))
	const magicAttack = $derived(character.intelligence * 2 + character.level)
	const magicDefense = $derived(Math.floor(character.intelligence * 1.5 + character.level * 0.5))
	const speed = $derived(Math.floor(character.dexterity * 1.5 + character.level * 0.3))
	const criticalRate = $derived(Math.floor(character.dexterity * 0.5 + character.level * 0.2))
	const evasion = $derived(Math.floor(character.dexterity * 0.3 + character.level * 0.1))
</script>

<div class="character-stats {className || ''}">
	<div class="stats-section">
		<h3 class="arcana-heading-sm mb-4">Primary Attributes</h3>
		<div class="stats-grid">
			<div class="stat-row">
				<Icon icon="game-icons-muscle-up" size="sm" class="text-arcana-red-400" />
				<span class="stat-label">Strength</span>
				<span class="stat-value">{character.strength}</span>
				<span class="stat-modifier {strengthMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{strengthMod >= 0 ? '+' : ''}{strengthMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-sprint" size="sm" class="text-arcana-yellow-400" />
				<span class="stat-label">Dexterity</span>
				<span class="stat-value">{character.dexterity}</span>
				<span class="stat-modifier {dexterityMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{dexterityMod >= 0 ? '+' : ''}{dexterityMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-magic-swirl" size="sm" class="text-arcana-cyan-400" />
				<span class="stat-label">Intelligence</span>
				<span class="stat-value">{character.intelligence}</span>
				<span class="stat-modifier {intelligenceMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{intelligenceMod >= 0 ? '+' : ''}{intelligenceMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-health-normal" size="sm" class="text-arcana-green-400" />
				<span class="stat-label">Vitality</span>
				<span class="stat-value">{character.vitality}</span>
				<span class="stat-modifier {vitalityMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{vitalityMod >= 0 ? '+' : ''}{vitalityMod}
				</span>
			</div>
		</div>
	</div>

	<div class="stats-section">
		<h3 class="arcana-heading-sm mb-4">Combat Stats</h3>
		<div class="stats-grid">
			<div class="stat-row">
				<Icon icon="game-icons-health-increase" size="sm" class="text-arcana-red-400" />
				<span class="stat-label">HP</span>
				<span class="stat-value">{character.health} / {character.maxHealth}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-crystal-wand" size="sm" class="text-arcana-cyan-400" />
				<span class="stat-label">MP</span>
				<span class="stat-value">{character.mana} / {character.maxMana}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-sword-brandish" size="sm" class="text-arcana-red-400" />
				<span class="stat-label">Attack</span>
				<span class="stat-value">{attack}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-shield" size="sm" class="text-arcana-blue-400" />
				<span class="stat-label">Defense</span>
				<span class="stat-value">{defense}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-fire-spell-cast" size="sm" class="text-arcana-magenta-400" />
				<span class="stat-label">Magic Attack</span>
				<span class="stat-value">{magicAttack}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-rosa-shield" size="sm" class="text-arcana-purple-400" />
				<span class="stat-label">Magic Defense</span>
				<span class="stat-value">{magicDefense}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-lightning-bow" size="sm" class="text-arcana-yellow-400" />
				<span class="stat-label">Speed</span>
				<span class="stat-value">{speed}</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-bullseye" size="sm" class="text-arcana-gold-300" />
				<span class="stat-label">Critical Rate</span>
				<span class="stat-value">{criticalRate}%</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-dodging" size="sm" class="text-arcana-green-400" />
				<span class="stat-label">Evasion</span>
				<span class="stat-value">{evasion}%</span>
			</div>
		</div>
	</div>
</div>

<style>
	.character-stats {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.stats-section {
		padding: var(--spacing-md);
		background: var(--color-surface-darker);
		border-radius: var(--border-radius-md);
		border: 1px solid var(--color-border);
	}

	.stats-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.stat-row {
		display: grid;
		grid-template-columns: auto 1fr auto auto;
		gap: var(--spacing-sm);
		align-items: center;
		padding: var(--spacing-xs);
		background: var(--color-surface);
		border-radius: var(--border-radius-sm);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.stat-value {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text);
		text-align: right;
	}

	.stat-modifier {
		font-size: 0.75rem;
		font-weight: 600;
		min-width: 2rem;
		text-align: right;
	}
</style>
