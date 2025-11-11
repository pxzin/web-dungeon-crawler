<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Button, Card, Icon, Portrait } from '$lib/components/ui'
	import { EquipmentSlot, InventoryItem, CharacterStats } from '$lib/components/game'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { createInventory } from '$lib/hooks/useInventory.svelte'
	import { persistence } from '$lib/game/persistence/adapter'
	import type { Character } from '$lib/game/character/types'
	import type { EquippableItem, ConsumableItem } from '$lib/game/items/types'
	import { EquipmentSlot as SlotType } from '$lib/game/items/types'
	import { getItem } from '$lib/game/items'

	// Inventory state
	const inventoryManager = createInventory()

	// Character state
	let character = $state<Character | null>(null)
	let loading = $state(true)

	// Derived character with equipment bonuses applied
	const enhancedCharacter = $derived.by(() => {
		if (!character) return null

		const equipStats = inventoryManager.getEquipmentStats()

		return {
			...character,
			strength: character.strength + (equipStats.strength || 0),
			dexterity: character.dexterity + (equipStats.dexterity || 0),
			intelligence: character.intelligence + (equipStats.intelligence || 0),
			vitality: character.vitality + (equipStats.vitality || 0),
			maxHealth: character.maxHealth + (equipStats.hpBonus || 0),
			maxMana: character.maxMana + (equipStats.mpBonus || 0),
		}
	})

	onMount(async () => {
		// Load player data
		const result = await persistence.getPlayer()
		if (result.success && result.data) {
			character = result.data
		}

		// Demo: Add some items to inventory for testing
		const sword = getItem('short_sword')
		const shield = getItem('wooden_shield')
		const armor = getItem('leather_armor')
		const potion = getItem('healing_potion_weak')

		if (sword) inventoryManager.addItem(sword, 1)
		if (shield) inventoryManager.addItem(shield, 1)
		if (armor) inventoryManager.addItem(armor, 1)
		if (potion) inventoryManager.addItem(potion, 5)

		loading = false
	})

	function returnToTown() {
		goto('/game/town-square')
	}

	function handleEquipItem(item: EquippableItem) {
		inventoryManager.equipItem(item)
	}

	function handleUnequipItem(slot: SlotType) {
		inventoryManager.unequipItem(slot)
	}

	function handleUseItem(item: ConsumableItem) {
		inventoryManager.useItem(item)
	}

	function handleDiscardItem(item: any) {
		if (confirm(`Are you sure you want to discard ${item.name}?`)) {
			inventoryManager.discardItem(item, 1)
		}
	}
</script>

<div class="page-container">
	{#if loading}
		<div class="loading">
			<Icon icon="game-icons-hourglass" size="2xl" class="text-arcana-cyan-400 animate-pulse" />
			<p class="arcana-text">Loading character...</p>
		</div>
	{:else if !character}
		<Card variant="elevated" class="text-center">
			<Icon icon="game-icons-player-next" size="2xl" class="text-arcana-gold-300 mb-6" />
			<h1 class="arcana-heading-lg mb-4">No Character Found</h1>
			<p class="arcana-text mb-8">Please create a character first.</p>
			<Button variant="primary" onclick={() => goto('/character-creation')}>
				Create Character
			</Button>
		</Card>
	{:else}
		<div class="container">
			<!-- Header -->
			<div class="header">
				<div class="header-left">
					<Button variant="ghost" onclick={returnToTown}>
						<Icon icon="game-icons-return-arrow" size="sm" />
						← Town Square
					</Button>
				</div>
				<h1 class="arcana-heading-xl">Character</h1>
				<div class="header-right"></div>
			</div>

			<!-- Main Grid -->
			<div class="main-grid">
				<!-- Left Column: Equipment -->
				<Card variant="elevated" class="equipment-panel">
					<div class="panel-header">
						<Icon icon="game-icons-armor-vest" size="lg" class="text-arcana-gold-300" />
						<h2 class="arcana-heading-md">Equipment</h2>
					</div>

					<div class="character-preview">
						{#if enhancedCharacter}
							<Portrait character={enhancedCharacter} size="large" />
						{/if}
					</div>

					<div class="equipment-grid">
						<!-- Weapon Slots -->
						<div class="equipment-row">
							<EquipmentSlot
								slot={SlotType.MAIN_HAND}
								item={inventoryManager.equipment[SlotType.MAIN_HAND]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.OFF_HAND}
								item={inventoryManager.equipment[SlotType.OFF_HAND]}
								onUnequip={handleUnequipItem}
							/>
						</div>

						<!-- Armor Slots -->
						<div class="equipment-column">
							<EquipmentSlot
								slot={SlotType.HEAD}
								item={inventoryManager.equipment[SlotType.HEAD]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.CHEST}
								item={inventoryManager.equipment[SlotType.CHEST]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.LEGS}
								item={inventoryManager.equipment[SlotType.LEGS]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.FEET}
								item={inventoryManager.equipment[SlotType.FEET]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.HANDS}
								item={inventoryManager.equipment[SlotType.HANDS]}
								onUnequip={handleUnequipItem}
							/>
						</div>

						<!-- Accessory Slots -->
						<div class="equipment-column">
							<EquipmentSlot
								slot={SlotType.NECK}
								item={inventoryManager.equipment[SlotType.NECK]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.RING_1}
								item={inventoryManager.equipment[SlotType.RING_1]}
								onUnequip={handleUnequipItem}
							/>
							<EquipmentSlot
								slot={SlotType.RING_2}
								item={inventoryManager.equipment[SlotType.RING_2]}
								onUnequip={handleUnequipItem}
							/>
						</div>
					</div>
				</Card>

				<!-- Middle Column: Inventory -->
				<Card variant="elevated" class="inventory-panel">
					<div class="panel-header">
						<Icon icon="game-icons-swap-bag" size="lg" class="text-arcana-cyan-400" />
						<h2 class="arcana-heading-md">Inventory</h2>
						<span class="arcana-text-sm text-arcana-text-muted">
							{inventoryManager.inventory.length} items
						</span>
					</div>

					<div class="inventory-grid">
						{#each inventoryManager.inventory as slot}
							<InventoryItem
								item={slot.item}
								quantity={slot.quantity}
								onEquip={handleEquipItem}
								onUse={handleUseItem}
								onDiscard={handleDiscardItem}
							/>
						{:else}
							<div class="empty-state">
								<Icon
									icon="game-icons-empty-wood-bucket"
									size="xl"
									class="text-arcana-text-muted opacity-50"
								/>
								<p class="arcana-text-muted">Your inventory is empty</p>
							</div>
						{/each}
					</div>
				</Card>

				<!-- Right Column: Stats -->
				<Card variant="elevated" class="stats-panel">
					<div class="panel-header">
						<Icon icon="game-icons-stats-up" size="lg" class="text-arcana-magenta-400" />
						<h2 class="arcana-heading-md">Statistics</h2>
					</div>

					{#if enhancedCharacter}
						<CharacterStats character={enhancedCharacter} />
					{/if}
				</Card>
			</div>
		</div>
	{/if}
</div>

<style>
	.page-container {
		min-height: 100vh;
		padding: var(--spacing-xl);
		background: var(--color-background);
	}

	.loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		gap: var(--spacing-lg);
	}

	.container {
		max-width: 1600px;
		margin: 0 auto;
		width: 100%;
	}

	.header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		margin-bottom: var(--spacing-xl);
	}

	.header-left {
		justify-self: start;
	}

	.header-right {
		justify-self: end;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr 1fr;
		gap: var(--spacing-lg);
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
	}

	.character-preview {
		display: flex;
		justify-content: center;
		margin-bottom: var(--spacing-lg);
	}

	.equipment-panel,
	.inventory-panel,
	.stats-panel {
		padding: var(--spacing-lg);
		max-height: calc(100vh - 200px);
		overflow-y: auto;
	}

	.equipment-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.equipment-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
	}

	.equipment-column {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.inventory-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		max-height: calc(100vh - 350px);
		overflow-y: auto;
		padding-right: var(--spacing-xs);
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-2xl);
		gap: var(--spacing-md);
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.main-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.equipment-panel,
		.inventory-panel,
		.stats-panel {
			max-height: none;
		}
	}

	@media (max-width: 768px) {
		.header {
			grid-template-columns: 1fr;
			text-align: center;
			gap: var(--spacing-md);
		}

		.header-left {
			justify-self: center;
		}

		.equipment-row {
			grid-template-columns: 1fr;
		}
	}
</style>
