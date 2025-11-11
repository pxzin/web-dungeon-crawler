<script lang="ts">
	import type { Character } from '$lib/game/character/types'
	import type { InventoryManager } from '$lib/game/inventory/manager'
	import { Icon } from '$lib/components/ui'
	import { calculateCharacterStats } from '$lib/game/character/stats-calculator'

	interface Props {
		character: Character
		inventoryManager: InventoryManager
		class?: string
	}

	let { character, inventoryManager, class: className }: Props = $props()

	// Calculate total stats including equipment
	const totalStats = $derived(calculateCharacterStats(character, inventoryManager))

	// Calculate modifiers from total stats
	const strengthMod = $derived(Math.floor((totalStats.strength - 10) / 2))
	const dexterityMod = $derived(Math.floor((totalStats.dexterity - 10) / 2))
	const intelligenceMod = $derived(Math.floor((totalStats.intelligence - 10) / 2))
	const vitalityMod = $derived(Math.floor((totalStats.vitality - 10) / 2))

	// Helper to check if stat has equipment bonus
	function hasBonus(stat: string): boolean {
		return (totalStats.equipmentBonuses[stat as keyof typeof totalStats.equipmentBonuses] || 0) > 0
	}
</script>

<div class="character-stats {className || ''}">
	<div class="stats-section">
		<h3 class="arcana-heading-sm mb-4">Primary Attributes</h3>
		<div class="stats-grid">
			<div class="stat-row">
				<Icon icon="game-icons-muscle-up" size="sm" class="text-arcana-red-400" />
				<span class="stat-label">Strength</span>
				<span class="stat-value" class:has-bonus={hasBonus('strength')}>
					{totalStats.strength}
					{#if hasBonus('strength')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.strength})</span>
					{/if}
				</span>
				<span class="stat-modifier {strengthMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{strengthMod >= 0 ? '+' : ''}{strengthMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-sprint" size="sm" class="text-arcana-yellow-400" />
				<span class="stat-label">Dexterity</span>
				<span class="stat-value" class:has-bonus={hasBonus('dexterity')}>
					{totalStats.dexterity}
					{#if hasBonus('dexterity')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.dexterity})</span>
					{/if}
				</span>
				<span class="stat-modifier {dexterityMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{dexterityMod >= 0 ? '+' : ''}{dexterityMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-magic-swirl" size="sm" class="text-arcana-cyan-400" />
				<span class="stat-label">Intelligence</span>
				<span class="stat-value" class:has-bonus={hasBonus('intelligence')}>
					{totalStats.intelligence}
					{#if hasBonus('intelligence')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.intelligence})</span>
					{/if}
				</span>
				<span class="stat-modifier {intelligenceMod >= 0 ? 'text-arcana-green-400' : 'text-arcana-red-400'}">
					{intelligenceMod >= 0 ? '+' : ''}{intelligenceMod}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-health-normal" size="sm" class="text-arcana-green-400" />
				<span class="stat-label">Vitality</span>
				<span class="stat-value" class:has-bonus={hasBonus('vitality')}>
					{totalStats.vitality}
					{#if hasBonus('vitality')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.vitality})</span>
					{/if}
				</span>
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
				<span class="stat-value" class:has-bonus={hasBonus('hpBonus')}>
					{character.health} / {totalStats.maxHealth}
					{#if hasBonus('hpBonus')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.hpBonus})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-crystal-wand" size="sm" class="text-arcana-cyan-400" />
				<span class="stat-label">MP</span>
				<span class="stat-value" class:has-bonus={hasBonus('mpBonus')}>
					{character.mana} / {totalStats.maxMana}
					{#if hasBonus('mpBonus')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.mpBonus})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-sword-brandish" size="sm" class="text-arcana-red-400" />
				<span class="stat-label">Attack</span>
				<span class="stat-value" class:has-bonus={hasBonus('attack')}>
					{totalStats.attack}
					{#if hasBonus('attack')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.attack})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-shield" size="sm" class="text-arcana-blue-400" />
				<span class="stat-label">Defense</span>
				<span class="stat-value" class:has-bonus={hasBonus('defense')}>
					{totalStats.defense}
					{#if hasBonus('defense')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.defense})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-fire-spell-cast" size="sm" class="text-arcana-magenta-400" />
				<span class="stat-label">Magic Attack</span>
				<span class="stat-value" class:has-bonus={hasBonus('magicAttack')}>
					{totalStats.magicAttack}
					{#if hasBonus('magicAttack')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.magicAttack})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-rosa-shield" size="sm" class="text-arcana-purple-400" />
				<span class="stat-label">Magic Defense</span>
				<span class="stat-value" class:has-bonus={hasBonus('magicDefense')}>
					{totalStats.magicDefense}
					{#if hasBonus('magicDefense')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.magicDefense})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-lightning-bow" size="sm" class="text-arcana-yellow-400" />
				<span class="stat-label">Speed</span>
				<span class="stat-value" class:has-bonus={hasBonus('speed')}>
					{totalStats.speed}
					{#if hasBonus('speed')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.speed})</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-bullseye" size="sm" class="text-arcana-gold-300" />
				<span class="stat-label">Critical Rate</span>
				<span class="stat-value" class:has-bonus={hasBonus('criticalRate')}>
					{totalStats.criticalRate}%
					{#if hasBonus('criticalRate')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.criticalRate}%)</span>
					{/if}
				</span>
			</div>
			<div class="stat-row">
				<Icon icon="game-icons-dodging" size="sm" class="text-arcana-green-400" />
				<span class="stat-label">Evasion</span>
				<span class="stat-value" class:has-bonus={hasBonus('evasion')}>
					{totalStats.evasion}%
					{#if hasBonus('evasion')}
						<span class="bonus-text">(+{totalStats.equipmentBonuses.evasion}%)</span>
					{/if}
				</span>
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

	.stat-value.has-bonus {
		color: var(--color-arcana-green-300);
	}

	.bonus-text {
		font-size: 0.7rem;
		color: var(--color-arcana-green-400);
		margin-left: 4px;
		font-weight: 600;
	}
</style>
