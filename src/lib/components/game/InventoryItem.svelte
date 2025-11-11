<script lang="ts">
	import type { Item, EquippableItem, ConsumableItem } from '$lib/game/items/types'
	import { ItemType } from '$lib/game/items/types'
	import { Icon, SpriteIcon } from '$lib/components/ui'
	import ItemTooltip from './ItemTooltip.svelte'

	interface Props {
		item: Item
		quantity?: number
		onEquip?: (item: EquippableItem) => void
		onUse?: (item: ConsumableItem) => void
		onDiscard?: (item: Item) => void
		onDragStart?: (item: Item) => void
		class?: string
	}

	let { item, quantity = 1, onEquip, onUse, onDiscard, onDragStart, class: className }: Props = $props()

	let showTooltip = $state(false)

	function handleMouseEnter() {
		showTooltip = true
	}

	function handleMouseLeave() {
		showTooltip = false
	}

	function handleDragStart(e: DragEvent) {
		if (!item || !onDragStart) return
		showTooltip = false
		e.dataTransfer!.effectAllowed = 'move'
		e.dataTransfer!.setData('application/json', JSON.stringify({ type: 'inventory', item }))
		onDragStart(item)
	}

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

	function handleRightClick(e: MouseEvent) {
		e.preventDefault()
		if (onDiscard) {
			onDiscard(item)
		}
	}

	// Rarity border colors
	const rarityBorders: Record<string, string> = {
		common: 'var(--color-border)',
		uncommon: 'var(--color-arcana-green-500)',
		rare: 'var(--color-arcana-cyan-500)',
		epic: 'var(--color-arcana-magenta-500)',
		legendary: 'var(--color-arcana-gold-500)',
	}
</script>

<div
	class="inventory-item {className || ''}"
	class:has-item={!!item}
	role="button"
	tabindex="0"
	draggable={!!item}
	onclick={handleClick}
	oncontextmenu={handleRightClick}
	onkeypress={(e) => e.key === 'Enter' && handleClick()}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	ondragstart={handleDragStart}
	style:border-color={rarityBorders[item.rarity] || rarityBorders.common}
>
	<div class="item-icon">
		{#if item.iconId}
			<SpriteIcon iconId={item.iconId} size={32} />
		{:else}
			<Icon icon="game-icons-cube" size="md" class="text-arcana-gold-300" />
		{/if}
	</div>

	{#if quantity > 1}
		<span class="quantity-badge arcana-text-xs">{quantity}</span>
	{/if}

	{#if showTooltip}
		<ItemTooltip {item} />
	{/if}
</div>

<style>
	.inventory-item {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		padding: var(--spacing-xs);
		background: var(--color-surface-darker);
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-sm);
		transition: all 0.2s ease;
		cursor: pointer;
		min-height: 48px;
	}

	.inventory-item:hover {
		background: var(--color-surface);
		box-shadow: 0 0 12px rgba(251, 191, 36, 0.4);
		transform: translateY(-2px);
		z-index: 10001;
	}

	.inventory-item.has-item {
		background: linear-gradient(135deg, var(--color-surface-darker) 0%, rgba(212, 175, 55, 0.05) 100%);
	}

	.item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.quantity-badge {
		position: absolute;
		bottom: 2px;
		right: 2px;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		border: 1px solid var(--color-arcana-magenta-500);
		border-radius: var(--border-radius-sm);
		padding: 1px 4px;
		font-weight: 700;
		line-height: 1;
		font-size: 0.65rem;
		font-family: var(--font-mono);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
	}
</style>
