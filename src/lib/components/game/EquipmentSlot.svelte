<script lang="ts">
	import type { EquippableItem } from '$lib/game/items/types'
	import { EquipmentSlot as SlotType } from '$lib/game/items/types'
	import { Icon, SpriteIcon } from '$lib/components/ui'
	import ItemTooltip from './ItemTooltip.svelte'

	interface Props {
		slot: SlotType
		item?: EquippableItem
		onUnequip?: (slot: SlotType) => void
		onDragStart?: (slot: SlotType, item: EquippableItem) => void
		onDrop?: (slot: SlotType, draggedItem: any) => void
		class?: string
	}

	let { slot, item, onUnequip, onDragStart, onDrop, class: className }: Props = $props()

	let showTooltip = $state(false)
	let isDragOver = $state(false)

	function handleMouseEnter() {
		if (!item) return
		showTooltip = true
	}

	function handleMouseLeave() {
		showTooltip = false
	}

	function handleDragStart(e: DragEvent) {
		if (!item || !onDragStart) return
		showTooltip = false
		e.dataTransfer!.effectAllowed = 'move'
		e.dataTransfer!.setData('application/json', JSON.stringify({ type: 'equipment', slot, item }))
		onDragStart(slot, item)
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault()
		e.dataTransfer!.dropEffect = 'move'
		isDragOver = true
	}

	function handleDragLeave() {
		isDragOver = false
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault()
		isDragOver = false

		if (!onDrop) return

		try {
			const data = JSON.parse(e.dataTransfer!.getData('application/json'))
			onDrop(slot, data)
		} catch (error) {
			console.error('Error parsing drag data:', error)
		}
	}

	const slotNames: Record<SlotType, string> = {
		[SlotType.MAIN_HAND]: 'Main Hand',
		[SlotType.OFF_HAND]: 'Off Hand',
		[SlotType.HEAD]: 'Head',
		[SlotType.CHEST]: 'Chest',
		[SlotType.LEGS]: 'Legs',
		[SlotType.FEET]: 'Feet',
		[SlotType.HANDS]: 'Hands',
		[SlotType.NECK]: 'Neck',
		[SlotType.RING_1]: 'Ring 1',
		[SlotType.RING_2]: 'Ring 2',
	}

	const slotIcons: Record<SlotType, string> = {
		[SlotType.MAIN_HAND]: 'game-icons-sword-brandish',
		[SlotType.OFF_HAND]: 'game-icons-round-shield',
		[SlotType.HEAD]: 'game-icons-helmet',
		[SlotType.CHEST]: 'game-icons-chest-armor',
		[SlotType.LEGS]: 'game-icons-leg-armor',
		[SlotType.FEET]: 'game-icons-boots',
		[SlotType.HANDS]: 'game-icons-gauntlet',
		[SlotType.NECK]: 'game-icons-necklace',
		[SlotType.RING_1]: 'game-icons-ring',
		[SlotType.RING_2]: 'game-icons-ring',
	}

	function handleClick() {
		if (item && onUnequip) {
			onUnequip(slot)
		}
	}
</script>

<div
	class="equipment-slot {className || ''}"
	class:has-item={!!item}
	class:empty-slot={!item}
	class:drag-over={isDragOver}
	class:show-tooltip={showTooltip}
	role="button"
	tabindex="0"
	draggable={!!item}
	onclick={handleClick}
	onkeypress={(e) => e.key === 'Enter' && handleClick()}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	ondragstart={handleDragStart}
	ondragover={handleDragOver}
	ondragleave={handleDragLeave}
	ondrop={handleDrop}
>
	<div class="slot-icon">
		{#if item && item.iconId}
			<SpriteIcon iconId={item.iconId} size={40} />
		{:else if item}
			<Icon icon={slotIcons[slot]} size="lg" class="text-arcana-gold-300" />
		{:else}
			<Icon icon={slotIcons[slot]} size="lg" class="text-arcana-text-muted opacity-30" />
		{/if}
	</div>
	<div class="slot-name">
		<span class="arcana-text-xs">{slotNames[slot]}</span>
	</div>
	{#if item}
		<div class="item-name">
			<span class="arcana-text-xs font-medium">{item.name}</span>
		</div>
	{/if}

	{#if showTooltip && item}
		<ItemTooltip {item} />
	{/if}
</div>

<style>
	.equipment-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-md);
		background: var(--color-surface-darker);
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-md);
		min-width: 100px;
		min-height: 100px;
		transition: all 0.2s ease;
		cursor: pointer;
		position: relative;
	}

	.equipment-slot.empty-slot {
		border-style: dashed;
		border-color: var(--color-border);
		background: rgba(0, 0, 0, 0.2);
	}

	.equipment-slot:hover {
		border-color: var(--color-arcana-cyan-500);
		background: var(--color-surface);
		z-index: 10001;
	}

	.equipment-slot.empty-slot:hover {
		border-style: dashed;
		border-color: var(--color-arcana-cyan-500);
		background: var(--color-arcana-cyan-500-alpha-10);
	}

	.equipment-slot.has-item {
		border: 2px solid var(--color-arcana-cyan-500);
		border-style: solid;
		background: linear-gradient(135deg, var(--color-surface-darker) 0%, rgba(20, 184, 166, 0.1) 100%);
	}

	.equipment-slot.has-item:hover {
		border-color: var(--color-arcana-gold-500);
		box-shadow: 0 0 12px rgba(251, 191, 36, 0.4);
		z-index: 10001;
	}

	.equipment-slot.show-tooltip {
		z-index: 10001;
	}

	.equipment-slot.drag-over {
		border-color: var(--color-arcana-magenta-500);
		background: var(--color-arcana-magenta-500-alpha-20);
		box-shadow: 0 0 16px rgba(217, 70, 239, 0.6);
	}

	.slot-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slot-name {
		text-align: center;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 0.7rem;
	}

	.item-name {
		text-align: center;
		color: var(--color-arcana-gold-300);
		position: absolute;
		bottom: 4px;
		left: 4px;
		right: 4px;
		font-size: 0.65rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
