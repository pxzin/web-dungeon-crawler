<script lang="ts">
	import type { EquippableItem } from '$lib/game/items/types'
	import { EquipmentSlot as SlotType } from '$lib/game/items/types'
	import { Icon } from '$lib/components/ui'

	interface Props {
		slot: SlotType
		item?: EquippableItem
		onUnequip?: (slot: SlotType) => void
		class?: string
	}

	let { slot, item, onUnequip, class: className }: Props = $props()

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

<div class="equipment-slot {className || ''}" class:has-item={!!item} role="button" tabindex="0" onclick={handleClick} onkeypress={(e) => e.key === 'Enter' && handleClick()}>
	<div class="slot-icon">
		{#if item}
			<Icon icon={item.iconId || slotIcons[slot]} size="lg" class="text-arcana-gold-300" />
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

	.equipment-slot:hover {
		border-color: var(--color-arcana-cyan-500);
		background: var(--color-surface);
	}

	.equipment-slot.has-item:hover {
		border-color: var(--color-arcana-magenta-500);
		box-shadow: 0 0 12px var(--color-arcana-magenta-500-alpha-30);
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
