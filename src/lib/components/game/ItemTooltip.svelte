<script lang="ts">
	import type { Item, EquippableItem } from '$lib/game/items/types'
	import { ItemType } from '$lib/game/items/types'
	import { Icon, SpriteIcon } from '$lib/components/ui'
	import Tooltip from '$lib/components/ui/Tooltip.svelte'

	interface Props {
		item: Item
		class?: string
	}

	let { item, class: className }: Props = $props()

	const isEquippable = $derived(
		item.type === ItemType.WEAPON || item.type === ItemType.ARMOR || item.type === ItemType.ACCESSORY
	)

	const rarityColors: Record<string, string> = {
		common: 'border-arcana-text-muted',
		uncommon: 'border-arcana-green-400',
		rare: 'border-arcana-cyan-400',
		epic: 'border-arcana-magenta-400',
		legendary: 'border-arcana-gold-300',
	}

	const rarityLabels: Record<string, string> = {
		common: 'Common',
		uncommon: 'Uncommon',
		rare: 'Rare',
		epic: 'Epic',
		legendary: 'Legendary',
	}

	const equippableItem = $derived(isEquippable ? (item as EquippableItem) : null)
</script>

<Tooltip position="right" class="{rarityColors[item.rarity]} {className || ''}">
<div class="item-tooltip-content">
	<!-- Header -->
	<div class="tooltip-header">
		<div class="item-icon-container">
			{#if item.iconId}
				<SpriteIcon iconId={item.iconId} size={48} />
			{:else}
				<Icon icon="game-icons-cube" size="xl" class="text-arcana-gold-300" />
			{/if}
		</div>
		<div class="item-title">
			<h3 class="arcana-heading-sm {(rarityColors[item.rarity] || '').replace('border', 'text')}">{item.name}</h3>
			<p class="arcana-text-xs text-arcana-text-muted uppercase tracking-wide">
				{rarityLabels[item.rarity] || item.rarity}
			</p>
		</div>
	</div>

	<!-- Type & Slot -->
	<div class="tooltip-section">
		<div class="info-row">
			<Icon icon="game-icons-sword-array" size="sm" class="text-arcana-cyan-400" />
			<span class="arcana-text-sm">{item.type}</span>
		</div>
		{#if equippableItem}
			<div class="info-row">
				<Icon icon="game-icons-armor-vest" size="sm" class="text-arcana-cyan-400" />
				<span class="arcana-text-sm">{equippableItem.slot}</span>
			</div>
		{/if}
	</div>

	<!-- Description -->
	<div class="tooltip-section">
		<p class="arcana-text-sm text-arcana-text-muted italic">{item.description}</p>
	</div>

	<!-- Stats for Equippable Items -->
	{#if equippableItem && equippableItem.stats}
		<div class="tooltip-section stats-section">
			<h4 class="arcana-heading-xs mb-2">Bonuses</h4>
			<div class="stats-grid">
				{#if equippableItem.stats.strength}
					<div class="stat-bonus">
						<Icon icon="game-icons-muscle-up" size="sm" class="text-arcana-red-400" />
						<span class="arcana-text-sm">Strength</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.strength}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.dexterity}
					<div class="stat-bonus">
						<Icon icon="game-icons-sprint" size="sm" class="text-arcana-yellow-400" />
						<span class="arcana-text-sm">Dexterity</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.dexterity}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.intelligence}
					<div class="stat-bonus">
						<Icon icon="game-icons-magic-swirl" size="sm" class="text-arcana-cyan-400" />
						<span class="arcana-text-sm">Intelligence</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.intelligence}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.vitality}
					<div class="stat-bonus">
						<Icon icon="game-icons-health-normal" size="sm" class="text-arcana-green-400" />
						<span class="arcana-text-sm">Vitality</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.vitality}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.attack}
					<div class="stat-bonus">
						<Icon icon="game-icons-sword-brandish" size="sm" class="text-arcana-red-400" />
						<span class="arcana-text-sm">Attack</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.attack}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.defense}
					<div class="stat-bonus">
						<Icon icon="game-icons-shield" size="sm" class="text-arcana-blue-400" />
						<span class="arcana-text-sm">Defense</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.defense}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.hpBonus}
					<div class="stat-bonus">
						<Icon icon="game-icons-health-increase" size="sm" class="text-arcana-red-400" />
						<span class="arcana-text-sm">HP</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.hpBonus}
						</span>
					</div>
				{/if}
				{#if equippableItem.stats.mpBonus}
					<div class="stat-bonus">
						<Icon icon="game-icons-crystal-wand" size="sm" class="text-arcana-cyan-400" />
						<span class="arcana-text-sm">MP</span>
						<span class="arcana-text-sm text-arcana-green-400 font-semibold">
							+{equippableItem.stats.mpBonus}
						</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Durability for Equippable Items -->
	{#if equippableItem && equippableItem.durability !== undefined}
		<div class="tooltip-section">
			<div class="durability-bar">
				<div class="durability-label">
					<Icon icon="game-icons-cracked-shield" size="sm" class="text-arcana-orange-400" />
					<span class="arcana-text-xs">Durability</span>
					<span class="arcana-text-xs font-medium">
						{equippableItem.durability.current} / {equippableItem.durability.max}
					</span>
				</div>
				<div class="durability-progress">
					<div
						class="durability-fill"
						style="width: {(equippableItem.durability.current / equippableItem.durability.max) * 100}%"
					></div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Value -->
	<div class="tooltip-section">
		<div class="value-row">
			<Icon icon="game-icons-gold-bar" size="sm" class="text-arcana-gold-300" />
			<span class="arcana-text-sm">Value</span>
			<span class="arcana-text-sm text-arcana-gold-300 font-semibold">{item.value} gold</span>
		</div>
	</div>
</div>
</Tooltip>

<style>
	.item-tooltip-content {
		min-width: 280px;
		max-width: 320px;
	}

	.tooltip-header {
		display: flex;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
	}

	.item-icon-container {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--border-radius-md);
	}

	.item-title {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.tooltip-section {
		margin-bottom: var(--spacing-md);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
	}

	.tooltip-section:last-child {
		margin-bottom: 0;
		padding-bottom: 0;
		border-bottom: none;
	}

	.info-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-xs);
	}

	.info-row:last-child {
		margin-bottom: 0;
	}

	.stats-section {
		background: var(--color-surface);
		padding: var(--spacing-sm);
		border-radius: var(--border-radius-md);
		border-bottom: 1px solid var(--color-border);
	}

	.stats-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.stat-bonus {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: var(--spacing-xs);
		align-items: center;
	}

	.durability-bar {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.durability-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.durability-progress {
		height: 6px;
		background: var(--color-surface);
		border-radius: var(--border-radius-full);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}

	.durability-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-arcana-orange-500), var(--color-arcana-gold-400));
		transition: width 0.3s ease;
	}

	.value-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.value-row span:last-child {
		margin-left: auto;
	}
</style>
