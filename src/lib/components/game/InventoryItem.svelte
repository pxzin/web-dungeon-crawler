<script lang="ts">
	import type { Item, EquippableItem, ConsumableItem } from '$lib/game/items/types'
	import { ItemType } from '$lib/game/items/types'
	import { Icon } from '$lib/components/ui'

	interface Props {
		item: Item
		quantity?: number
		onEquip?: (item: EquippableItem) => void
		onUse?: (item: ConsumableItem) => void
		onDiscard?: (item: Item) => void
		class?: string
	}

	let { item, quantity = 1, onEquip, onUse, onDiscard, class: className }: Props = $props()

	const isEquippable = $derived(
		item.type === ItemType.WEAPON ||
			item.type === ItemType.ARMOR ||
			item.type === ItemType.ACCESSORY
	)
	const isConsumable = $derived(item.type === ItemType.CONSUMABLE)

	function handleClick() {
		if (isEquippable && onEquip) {
			onEquip(item as EquippableItem)
		} else if (isConsumable && onUse) {
			onUse(item as ConsumableItem)
		}
	}

	const rarityColors: Record<string, string> = {
		common: 'text-arcana-text',
		uncommon: 'text-arcana-green-400',
		rare: 'text-arcana-cyan-400',
		epic: 'text-arcana-magenta-400',
		legendary: 'text-arcana-gold-300',
	}
</script>

<div
	class="inventory-item {className || ''} {rarityColors[item.rarity]}"
	role="button"
	tabindex="0"
	onclick={handleClick}
	onkeypress={(e) => e.key === 'Enter' && handleClick()}
	title={item.description}
>
	<div class="item-icon">
		<Icon icon={item.iconId || 'game-icons-cube'} size="md" />
		{#if quantity > 1}
			<span class="quantity-badge arcana-text-xs">{quantity}</span>
		{/if}
	</div>
	<div class="item-details">
		<div class="item-name arcana-text-xs font-medium">{item.name}</div>
		<div class="item-actions">
			{#if isEquippable && onEquip}
				<button class="action-btn arcana-text-xs" onclick={handleClick}>Equip</button>
			{/if}
			{#if isConsumable && onUse}
				<button class="action-btn arcana-text-xs" onclick={handleClick}>Use</button>
			{/if}
			{#if onDiscard}
				<button
					class="action-btn arcana-text-xs text-arcana-red-400"
					onclick={(e) => {
						e.stopPropagation()
						onDiscard?.(item)
					}}
				>
					Discard
				</button>
			{/if}
		</div>
	</div>
</div>

<style>
	.inventory-item {
		display: flex;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm);
		background: var(--color-surface-darker);
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-md);
		transition: all 0.2s ease;
		cursor: pointer;
		position: relative;
	}

	.inventory-item:hover {
		border-color: var(--color-arcana-cyan-500);
		background: var(--color-surface);
		box-shadow: 0 0 8px var(--color-arcana-cyan-500-alpha-30);
	}

	.item-icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-width: 40px;
		min-height: 40px;
	}

	.quantity-badge {
		position: absolute;
		bottom: 0;
		right: 0;
		background: var(--color-arcana-magenta-600);
		color: white;
		border-radius: var(--border-radius-full);
		padding: 2px 6px;
		font-weight: bold;
		line-height: 1;
	}

	.item-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.item-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item-actions {
		display: flex;
		gap: var(--spacing-xs);
		flex-wrap: wrap;
	}

	.action-btn {
		background: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-text-muted);
		padding: 2px 8px;
		border-radius: var(--border-radius-sm);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 0.7rem;
	}

	.action-btn:hover {
		border-color: var(--color-arcana-cyan-500);
		color: var(--color-arcana-cyan-300);
		background: var(--color-arcana-cyan-500-alpha-10);
	}

	.action-btn.text-arcana-red-400:hover {
		border-color: var(--color-arcana-red-500);
		color: var(--color-arcana-red-300);
		background: var(--color-arcana-red-500-alpha-10);
	}
</style>
