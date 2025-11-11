<script lang="ts">
	import { goto } from '$app/navigation'
	import { onMount } from 'svelte'
	import { Button, Card, Icon, Portrait } from '$lib/components/ui'
	import { EquipmentSlot, InventoryItem, CharacterStats } from '$lib/components/game'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { createInventory } from '$lib/hooks/useInventory.svelte'
	import { persistence } from '$lib/persistence/instance'
	import type { PlayerData } from '$lib/persistence/types'
	import type { Character } from '$lib/game/character/types'
	import type { EquippableItem, ConsumableItem } from '$lib/game/items/types'
	import { EquipmentSlot as SlotType } from '$lib/game/items/types'
	import { getItem } from '$lib/game/items'

	// Inventory state
	const inventoryManager = createInventory()

	// Player data state
	let playerData = $state<PlayerData | null>(null)
	let loading = $state(true)

	// Convert PlayerData to Character format (same as PlayerPortraitContainer)
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
		const result = await persistence.getPlayerData()
		if (result.success && result.data) {
			playerData = result.data

			// Load inventory from saved data
			if (playerData.inventory) {
				for (const slot of playerData.inventory) {
					const item = getItem(slot.itemId)
					if (item) {
						inventoryManager.addItem(item, slot.quantity)
					}
				}
			}

			// Load equipment from saved data
			if (playerData.equipment) {
				for (const [slotKey, itemId] of Object.entries(playerData.equipment)) {
					const item = getItem(itemId)
					if (item) {
						inventoryManager.addItem(item, 1)
						inventoryManager.equipItem(item as EquippableItem)
					}
				}
			}

			// Demo: Add some items to inventory for testing (only if inventory is empty)
			if (!playerData.inventory || playerData.inventory.length === 0) {
				const sword = getItem('short_sword')
				const shield = getItem('wooden_shield')
				const armor = getItem('leather_armor')
				const potion = getItem('healing_potion_weak')

				if (sword) inventoryManager.addItem(sword, 1)
				if (shield) inventoryManager.addItem(shield, 1)
				if (armor) inventoryManager.addItem(armor, 1)
				if (potion) inventoryManager.addItem(potion, 5)
			}
		}

		loading = false
	})

	function returnToTown() {
		goto('/game/town-square')
	}

	async function handleEquipItem(item: EquippableItem) {
		inventoryManager.equipItem(item)
		await saveInventoryAndEquipment()
	}

	async function handleUnequipItem(slot: SlotType) {
		inventoryManager.unequipItem(slot)
		await saveInventoryAndEquipment()
	}

	async function saveInventoryAndEquipment() {
		if (!playerData) return

		// Save inventory
		playerData.inventory = inventoryManager.inventory.map((slot) => ({
			itemId: slot.item.id,
			quantity: slot.quantity,
		}))

		// Save equipment
		playerData.equipment = {}
		for (const [slot, item] of Object.entries(inventoryManager.equipment)) {
			if (item) {
				playerData.equipment[slot] = item.id
			}
		}

		console.log('💾 Saving inventory and equipment:', {
			inventory: playerData.inventory,
			equipment: playerData.equipment
		})

		const result = await persistence.setPlayerData(playerData)
		console.log('✅ Save result:', result)
	}

	async function handleUseItem(item: ConsumableItem) {
		if (!playerData) return

		// Apply item effects to player data
		const effect = item.effect
		let updated = false

		if (effect.hpRestore) {
			const newHealth = Math.min(
				playerData.resources.health + effect.hpRestore,
				playerData.resources.maxHealth
			)
			playerData.resources.health = newHealth
			updated = true
		}

		if (effect.mpRestore) {
			const newMana = Math.min(
				playerData.resources.mana + effect.mpRestore,
				playerData.resources.maxMana
			)
			playerData.resources.mana = newMana
			updated = true
		}

		// Remove item from inventory
		inventoryManager.useItem(item)

		// Save updated player data (both resources and inventory)
		if (updated) {
			await saveInventoryAndEquipment()
		}
	}

	async function handleDiscardItem(item: any) {
		if (confirm($LL.game.character.discardConfirm({ itemName: item.name }))) {
			inventoryManager.discardItem(item, 1)
			await saveInventoryAndEquipment()
		}
	}

	// Drag and drop state
	let draggedItem = $state<any>(null)
	let isTrashHovered = $state(false)

	function handleDragStartInventory(item: any) {
		draggedItem = item
	}

	function handleDragStartEquipment(slot: SlotType, item: EquippableItem) {
		draggedItem = { type: 'equipment', slot, item }
	}

	async function handleDropOnEquipment(targetSlot: SlotType, dragData: any) {
		if (!dragData) return

		// If dragging from inventory
		if (dragData.type === 'inventory' && dragData.item) {
			const item = dragData.item as EquippableItem
			// Check if item can be equipped in target slot
			if (item.slot === targetSlot) {
				await handleEquipItem(item)
			}
		}
		// If dragging from another equipment slot
		else if (dragData.type === 'equipment' && dragData.item) {
			const item = dragData.item as EquippableItem
			const sourceSlot = dragData.slot

			// Swap items if both are equipment
			if (item.slot === targetSlot && sourceSlot !== targetSlot) {
				const targetItem = inventoryManager.equipment[targetSlot]

				// Unequip source item
				inventoryManager.unequipItem(sourceSlot)

				// If target slot has item, unequip it
				if (targetItem) {
					inventoryManager.unequipItem(targetSlot)
					// Equip target item in source slot if compatible
					if (targetItem.slot === sourceSlot) {
						inventoryManager.equipItem(targetItem)
					}
				}

				// Equip source item in target slot
				inventoryManager.equipItem(item)

				await saveInventoryAndEquipment()
			}
		}

		draggedItem = null
	}

	function handleTrashDragOver(e: DragEvent) {
		e.preventDefault()
		e.dataTransfer!.dropEffect = 'move'
		isTrashHovered = true
	}

	function handleTrashDragLeave() {
		isTrashHovered = false
	}

	async function handleTrashDrop(e: DragEvent) {
		e.preventDefault()
		isTrashHovered = false

		try {
			const data = JSON.parse(e.dataTransfer!.getData('application/json'))

			// Get the item to discard
			let itemToDiscard = null
			if (data.type === 'inventory') {
				itemToDiscard = data.item
			} else if (data.type === 'equipment') {
				itemToDiscard = data.item
				// First unequip the item
				inventoryManager.unequipItem(data.slot)
			}

			if (itemToDiscard) {
				if (confirm($LL.game.character.discardConfirm({ itemName: itemToDiscard.name }))) {
					inventoryManager.discardItem(itemToDiscard, 1)
					await saveInventoryAndEquipment()
				} else {
					// If user cancelled, re-equip if it was from equipment
					if (data.type === 'equipment') {
						inventoryManager.equipItem(data.item)
						await saveInventoryAndEquipment()
					}
				}
			}
		} catch (error) {
			console.error('Error handling trash drop:', error)
		}

		draggedItem = null
	}
</script>

<div class="page-container">
	{#if loading}
		<div class="loading">
			<Icon icon="game-icons-hourglass" size="2xl" class="text-arcana-cyan-400 animate-pulse" />
			<p class="arcana-text">{$LL.game.character.loadingCharacter()}</p>
		</div>
	{:else if !character}
		<Card variant="elevated" class="text-center">
			<Icon icon="game-icons-player-next" size="2xl" class="text-arcana-gold-300 mb-6" />
			<h1 class="arcana-heading-lg mb-4">{$LL.game.character.noCharacterFound()}</h1>
			<p class="arcana-text mb-8">{$LL.game.character.createCharacterFirst()}</p>
			<Button variant="primary" onclick={() => goto('/character-creation')}>
				{$LL.game.characterCreation.createCharacter()}
			</Button>
		</Card>
	{:else}
		<div class="container">
			<!-- Header -->
			<div class="header">
				<div class="header-left">
					<Button variant="ghost" onclick={returnToTown}>
						<Icon icon="game-icons-return-arrow" size="sm" />
						← {$LL.game.townSquare.title()}
					</Button>
				</div>
				<h1 class="arcana-heading-xl">{$LL.game.character.inventory()}</h1>
				<div class="header-right">
					{#if enhancedCharacter}
						<div class="header-portrait">
							<Portrait character={enhancedCharacter} size="small" />
						</div>
					{/if}
				</div>
			</div>

			<!-- Main Grid: Inventory Panel + Stats -->
			<div class="main-grid">
				<!-- Inventory Panel (2/3 width) -->
				<Card variant="elevated" class="inventory-container">
					<!-- Equipment Paperdoll Layout -->
					<div class="paperdoll-layout">
						<!-- Row 1: Head, Neck -->
						<div class="slot-position head-slot">
							<EquipmentSlot
								slot={SlotType.HEAD}
								item={inventoryManager.equipment[SlotType.HEAD]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Head</span>
						</div>

						<div class="slot-position neck-slot">
							<EquipmentSlot
								slot={SlotType.NECK}
								item={inventoryManager.equipment[SlotType.NECK]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Neck</span>
						</div>

						<!-- Row 2: Arms (Hands), Chest, Hands (Off-Hand) -->
						<div class="slot-position hands-slot">
							<EquipmentSlot
								slot={SlotType.HANDS}
								item={inventoryManager.equipment[SlotType.HANDS]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Arms</span>
						</div>

						<div class="slot-position chest-slot">
							<EquipmentSlot
								slot={SlotType.CHEST}
								item={inventoryManager.equipment[SlotType.CHEST]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Chest</span>
						</div>

						<div class="slot-position off-hand-slot">
							<EquipmentSlot
								slot={SlotType.OFF_HAND}
								item={inventoryManager.equipment[SlotType.OFF_HAND]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Hands</span>
						</div>

						<!-- Row 3: Weapon (Main Hand), Legs -->
						<div class="slot-position main-hand-slot">
							<EquipmentSlot
								slot={SlotType.MAIN_HAND}
								item={inventoryManager.equipment[SlotType.MAIN_HAND]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Weapon</span>
						</div>

						<div class="slot-position legs-slot">
							<EquipmentSlot
								slot={SlotType.LEGS}
								item={inventoryManager.equipment[SlotType.LEGS]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Legs</span>
						</div>

						<!-- Row 4: Feet, Ring -->
						<div class="slot-position feet-slot">
							<EquipmentSlot
								slot={SlotType.FEET}
								item={inventoryManager.equipment[SlotType.FEET]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Feet</span>
						</div>

						<div class="slot-position ring2-slot">
							<EquipmentSlot
								slot={SlotType.RING_2}
								item={inventoryManager.equipment[SlotType.RING_2]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Ring</span>
						</div>

						<!-- Ring 1 (Hidden) -->
						<div class="slot-position ring1-slot">
							<EquipmentSlot
								slot={SlotType.RING_1}
								item={inventoryManager.equipment[SlotType.RING_1]}
								onUnequip={handleUnequipItem}
								onDragStart={handleDragStartEquipment}
								onDrop={handleDropOnEquipment}
								class="compact-slot"
							/>
							<span class="slot-label-inside">Ring</span>
						</div>

						<!-- Gold Display -->
						<div class="gold-display">
							<Icon icon="game-icons-gold-bar" size="sm" class="text-arcana-gold-300" />
							<span class="arcana-text-sm text-arcana-gold-300 font-semibold">
								{playerData?.gold ?? 0} Gold
							</span>
						</div>
					</div>

					<!-- Bag Grid -->
					<div class="bag-section">
						<div class="bag-header">
							<Icon icon="game-icons-swap-bag" size="md" class="text-arcana-cyan-400" />
							<span class="arcana-text-sm text-arcana-text-muted">
								{$LL.game.character.itemsCount({ count: inventoryManager.inventory.length })} / 32
							</span>
						</div>
						<div class="bag-grid">
							{#each inventoryManager.inventory as slot}
								<InventoryItem
									item={slot.item}
									quantity={slot.quantity}
									onEquip={handleEquipItem}
									onUse={handleUseItem}
									onDiscard={handleDiscardItem}
									onDragStart={handleDragStartInventory}
								/>
							{/each}
							<!-- Empty slots to fill the grid -->
							{#each Array(Math.max(0, 32 - inventoryManager.inventory.length)) as _}
								<div class="empty-slot"></div>
							{/each}
						</div>
					</div>

					<!-- Trash Area -->
					<div
						class="trash-area"
						class:trash-active={isTrashHovered}
						ondragover={handleTrashDragOver}
						ondragleave={handleTrashDragLeave}
						ondrop={handleTrashDrop}
					>
						<Icon
							icon="game-icons-trash-can"
							size="lg"
							class={isTrashHovered ? 'text-arcana-red-300' : 'text-arcana-red-400'}
						/>
						<span class="arcana-text-xs text-arcana-text-muted">
							{isTrashHovered ? 'Release to discard' : 'Drop items here to discard'}
						</span>
					</div>
				</Card>

				<!-- Stats Panel (1/3 width) -->
				<Card variant="elevated" class="stats-panel">
					<div class="panel-header">
						<Icon icon="game-icons-stats-up" size="lg" class="text-arcana-magenta-400" />
						<h2 class="arcana-heading-md">{$LL.game.character.statistics()}</h2>
					</div>

					{#if enhancedCharacter}
						<CharacterStats character={enhancedCharacter} {inventoryManager} />
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

	.header-portrait {
		transform: scale(0.9);
	}

	.main-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
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

	/* Inventory Container */
	.inventory-container {
		padding: var(--spacing-lg);
		background: linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%);
		backdrop-filter: blur(10px);
	}

	/* Paperdoll Layout */
	.paperdoll-layout {
		position: relative;
		width: 100%;
		max-width: 420px;
		height: 420px;
		margin: 0 auto var(--spacing-xl) auto;
		background:
			radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 60%),
			url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23222233" width="100" height="100"/><rect fill="%23111122" x="50" width="50" height="50"/><rect fill="%23111122" y="50" width="50" height="50"/></svg>');
		background-size: 100%, 20px 20px;
		border: 2px solid var(--color-border);
		border-radius: var(--border-radius-lg);
		padding: var(--spacing-md);
	}

	.slot-position {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
		z-index: 1;
	}

	.slot-position:has(.equipment-slot:hover),
	.slot-position:has(.equipment-slot.show-tooltip) {
		z-index: 10001 !important;
	}

	.slot-label-inside {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.55rem;
		font-weight: 600;
		color: var(--color-arcana-gold-500);
		opacity: 0.5;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
		pointer-events: none;
		z-index: 1;
	}

	/* Slot Positions - Grid Layout 3x4 */
	/* Row 1 */
	.head-slot {
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.neck-slot {
		top: 20px;
		right: 20px;
	}

	/* Row 2 */
	.hands-slot {
		top: 110px;
		left: 20px;
	}

	.chest-slot {
		top: 110px;
		left: 50%;
		transform: translateX(-50%);
	}

	.off-hand-slot {
		top: 110px;
		right: 20px;
	}

	/* Row 3 */
	.main-hand-slot {
		top: 200px;
		left: 20px;
	}

	.legs-slot {
		top: 200px;
		left: 50%;
		transform: translateX(-50%);
	}

	/* Row 4 */
	.feet-slot {
		top: 290px;
		left: 50%;
		transform: translateX(-50%);
	}

	.ring2-slot {
		top: 290px;
		right: 20px;
	}

	.ring1-slot {
		display: none; /* Hidden as per reference */
	}

	.gold-display {
		position: absolute;
		bottom: 10px;
		right: 10px;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid var(--color-arcana-gold-500);
		border-radius: var(--border-radius-md);
	}

	/* Bag Section */
	.bag-section {
		margin-top: var(--spacing-lg);
		padding-top: var(--spacing-lg);
		border-top: 2px solid var(--color-border);
	}

	.bag-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-bottom: var(--spacing-md);
	}

	.bag-grid {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 4px;
		padding: var(--spacing-sm);
		background: rgba(0, 0, 0, 0.2);
		border-radius: var(--border-radius-md);
	}

	.empty-slot {
		aspect-ratio: 1;
		background: rgba(0, 0, 0, 0.3);
		border: 1px dashed rgba(255, 255, 255, 0.1);
		border-radius: var(--border-radius-sm);
		min-height: 48px;
	}

	.empty-bag {
		grid-column: 1 / -1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl);
	}

	/* Trash Area */
	.trash-area {
		margin-top: var(--spacing-lg);
		padding: var(--spacing-md);
		background: rgba(239, 68, 68, 0.1);
		border: 2px dashed var(--color-arcana-red-500);
		border-radius: var(--border-radius-md);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-xs);
		transition: all 0.2s ease;
	}

	.trash-area:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: var(--color-arcana-red-400);
	}

	.trash-area.trash-active {
		background: rgba(239, 68, 68, 0.3);
		border-color: var(--color-arcana-red-300);
		border-style: solid;
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
		transform: scale(1.05);
	}

	/* Stats Panel */
	.stats-panel {
		padding: var(--spacing-lg);
		max-height: calc(100vh - 200px);
		overflow-y: auto;
	}

	/* Compact Slot Styling */
	:global(.compact-slot) {
		min-width: 60px !important;
		min-height: 60px !important;
		padding: var(--spacing-xs) !important;
	}

	:global(.compact-slot .slot-name),
	:global(.compact-slot .item-name) {
		display: none !important;
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.main-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.stats-panel {
			max-height: none;
		}

		.paperdoll-layout {
			max-width: 100%;
			height: 380px;
		}

		.bag-grid {
			grid-template-columns: repeat(6, 1fr);
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

		.paperdoll-layout {
			height: 320px;
		}

		.bag-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
