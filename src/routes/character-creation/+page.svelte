<script lang="ts">
	import { goto } from '$app/navigation'
	import { LL } from '$lib/i18n/i18n-svelte'
	import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'
	import {
		CharacterClass,
		AttributeName,
		CLASS_BASE_STATS,
		MIN_ATTRIBUTE_VALUE,
		MAX_ATTRIBUTE_VALUE,
		calculateRemainingPoints,
		validateCharacterName,
		type CharacterCreationData,
		type CharacterCreationErrors,
	} from '$lib/game/character'
	import { onMount } from 'svelte'

	// Persistence service
	const persistence = createPersistenceService(new LocalStorageAdapter())

	// Form state
	let formData = $state<CharacterCreationData>({
		name: '',
		class: null,
		attributes: {
			strength: MIN_ATTRIBUTE_VALUE,
			dexterity: MIN_ATTRIBUTE_VALUE,
			intelligence: MIN_ATTRIBUTE_VALUE,
			vitality: MIN_ATTRIBUTE_VALUE,
		},
	})

	let errors = $state<CharacterCreationErrors>({})
	let isSubmitting = $state(false)

	// Computed values
	let remainingPoints = $derived(calculateRemainingPoints(formData.attributes))
	let canSubmit = $derived(
		formData.name.trim().length >= 3 && formData.class !== null && remainingPoints === 0
	)

	// Initialize persistence
	onMount(async () => {
		await persistence.init()
	})

	// Handle class selection
	function selectClass(characterClass: CharacterClass) {
		formData.class = characterClass

		// Apply base stats for the selected class
		const baseStats = CLASS_BASE_STATS[characterClass]
		formData.attributes = { ...baseStats.attributes }
	}

	// Handle attribute increment
	function incrementAttribute(attr: AttributeName) {
		if (remainingPoints > 0 && formData.attributes[attr] < MAX_ATTRIBUTE_VALUE) {
			formData.attributes[attr]++
		}
	}

	// Handle attribute decrement
	function decrementAttribute(attr: AttributeName) {
		if (formData.attributes[attr] > MIN_ATTRIBUTE_VALUE) {
			formData.attributes[attr]--
		}
	}

	// Validate form
	function validateForm(): boolean {
		const newErrors: CharacterCreationErrors = {}

		// Validate name
		const nameError = validateCharacterName(formData.name)
		if (nameError) {
			newErrors.name = nameError
		}

		// Validate class selection
		if (!formData.class) {
			newErrors.class = 'classRequired'
		}

		// Validate attribute points
		if (remainingPoints !== 0) {
			newErrors.attributes = 'mustSpendAllPoints'
		}

		errors = newErrors
		return Object.keys(newErrors).length === 0
	}

	// Handle form submission
	async function handleSubmit() {
		if (!validateForm() || isSubmitting) return

		isSubmitting = true

		try {
			// Create the player
			const result = await persistence.createPlayer(formData.name.trim())

			if (!result.success) {
				console.error('Failed to create player:', result.error)
				return
			}

			// Update player stats based on selected class and attributes
			const player = result.data
			player.stats = {
				...player.stats,
				...formData.attributes,
			}

			// Calculate derived stats based on class
			if (formData.class) {
				const baseStats = CLASS_BASE_STATS[formData.class]
				player.stats.health = baseStats.health
				player.stats.maxHealth = baseStats.health
				player.resources.health = baseStats.health

				player.stats.mana = baseStats.mana
				player.stats.maxMana = baseStats.mana
				player.resources.mana = baseStats.mana

				player.stats.stamina = baseStats.stamina
				player.stats.maxStamina = baseStats.stamina
				player.resources.stamina = baseStats.stamina

				// Calculate derived combat stats
				player.stats.attack = player.stats.strength * 2
				player.stats.defense = player.stats.vitality * 1.5
				player.stats.magicAttack = player.stats.intelligence * 2
				player.stats.magicDefense = player.stats.intelligence * 1.5
				player.stats.speed = player.stats.dexterity * 1.5
				player.stats.criticalRate = player.stats.dexterity * 0.5
				player.stats.evasion = player.stats.dexterity * 0.3
			}

			// Save the updated player data
			const saveResult = await persistence.setPlayerData(player)

			if (!saveResult.success) {
				console.error('Failed to save player:', saveResult.error)
				return
			}

			// Create initial game state
			const gameState = {
				playerId: player.id,
				currentLocation: 'town_square',
				questProgress: {},
				discoveredLocations: ['town_square'],
				completedQuests: [],
				playtime: 0,
				lastSaveAt: Date.now(),
			}

			const stateResult = await persistence.setGameState(gameState)

			if (!stateResult.success) {
				console.error('Failed to save game state:', stateResult.error)
				return
			}

			// Navigate to town square
			await goto('/game/town-square')
		} catch (error) {
			console.error('Error creating character:', error)
		} finally {
			isSubmitting = false
		}
	}

	// Get translated class name
	function getClassName(characterClass: CharacterClass): string {
		return $LL.game.characterCreation.classes[characterClass]()
	}

	// Get translated class description
	function getClassDescription(characterClass: CharacterClass): string {
		return $LL.game.characterCreation.classDescriptions[characterClass]()
	}

	// Get translated attribute name
	function getAttributeName(attr: AttributeName): string {
		return $LL.game.stats[attr]()
	}

	// Get translated validation error
	function getValidationError(key: string): string {
		const validation = $LL.game.characterCreation.validation
		switch (key) {
			case 'nameRequired':
				return validation.nameRequired()
			case 'nameTooShort':
				return validation.nameTooShort()
			case 'nameTooLong':
				return validation.nameTooLong()
			case 'classRequired':
				return validation.classRequired()
			case 'mustSpendAllPoints':
				return validation.mustSpendAllPoints()
			default:
				return key
		}
	}
</script>

<div class="character-creation">
	<div class="container">
		<h1 class="title">{$LL.game.characterCreation.title()}</h1>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<!-- Character Name -->
			<section class="section">
				<h2 class="section-title">{$LL.game.characterCreation.characterName()}</h2>
				<input
					type="text"
					bind:value={formData.name}
					placeholder={$LL.game.characterCreation.namePlaceholder()}
					class="input"
					class:error={errors.name}
					maxlength={20}
				/>
				{#if errors.name}
					<p class="error-message">{getValidationError(errors.name)}</p>
				{/if}
			</section>

			<!-- Class Selection -->
			<section class="section">
				<h2 class="section-title">{$LL.game.characterCreation.selectClass()}</h2>
				<div class="class-grid">
					{#each Object.values(CharacterClass) as characterClass}
						<button
							type="button"
							class="class-card"
							class:selected={formData.class === characterClass}
							onclick={() => selectClass(characterClass)}
						>
							<h3 class="class-name">{getClassName(characterClass)}</h3>
							<p class="class-description">{getClassDescription(characterClass)}</p>
						</button>
					{/each}
				</div>
				{#if errors.class}
					<p class="error-message">{getValidationError(errors.class)}</p>
				{/if}
			</section>

			<!-- Attribute Distribution -->
			{#if formData.class}
				<section class="section">
					<div class="section-header">
						<h2 class="section-title">{$LL.game.characterCreation.distributePoints()}</h2>
						<div class="points-display">
							<span class="points-label">{$LL.game.characterCreation.pointsAvailable()}:</span>
							<span class="points-value" class:warning={remainingPoints > 0}>
								{$LL.game.characterCreation.pointsRemaining({ points: remainingPoints })}
							</span>
						</div>
					</div>

					<div class="attributes-grid">
						{#each Object.values(AttributeName) as attr}
							<div class="attribute-row">
								<span class="attribute-name">{getAttributeName(attr)}</span>
								<div class="attribute-controls">
									<button
										type="button"
										class="btn-attribute"
										disabled={formData.attributes[attr] <= MIN_ATTRIBUTE_VALUE}
										onclick={() => decrementAttribute(attr)}
									>
										-
									</button>
									<span class="attribute-value">{formData.attributes[attr]}</span>
									<button
										type="button"
										class="btn-attribute"
										disabled={remainingPoints <= 0 || formData.attributes[attr] >= MAX_ATTRIBUTE_VALUE}
										onclick={() => incrementAttribute(attr)}
									>
										+
									</button>
								</div>
							</div>
						{/each}
					</div>

					{#if errors.attributes}
						<p class="error-message">{getValidationError(errors.attributes)}</p>
					{/if}
				</section>
			{/if}

			<!-- Appearance Placeholder -->
			<section class="section">
				<div class="appearance-placeholder">
					<p>{$LL.game.characterCreation.appearancePlaceholder()}</p>
				</div>
			</section>

			<!-- Submit Button -->
			<div class="actions">
				<button
					type="submit"
					class="btn-primary"
					disabled={!canSubmit || isSubmitting}
				>
					{isSubmitting ? '...' : $LL.game.characterCreation.startAdventure()}
				</button>
			</div>
		</form>
	</div>
</div>

<style>
	.character-creation {
		min-height: 100vh;
		background: linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-primary-900) 100%);
		padding: var(--spacing-xl) var(--spacing-md);
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
	}

	.title {
		font-size: 2.5rem;
		font-weight: bold;
		text-align: center;
		color: var(--color-primary-100);
		margin-bottom: var(--spacing-xl);
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.section {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		padding: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.section-title {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-primary-200);
		margin-bottom: var(--spacing-md);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-md);
		flex-wrap: wrap;
		gap: var(--spacing-sm);
	}

	.input {
		width: 100%;
		padding: var(--spacing-md);
		font-size: 1rem;
		border: 2px solid var(--color-neutral-600);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-neutral-100);
		transition: border-color 0.3s;
	}

	.input:focus {
		outline: none;
		border-color: var(--color-primary-500);
	}

	.input.error {
		border-color: var(--color-accent-500);
	}

	.class-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-md);
	}

	.class-card {
		background: rgba(255, 255, 255, 0.05);
		border: 2px solid var(--color-neutral-600);
		border-radius: 8px;
		padding: var(--spacing-md);
		cursor: pointer;
		transition: all 0.3s;
		text-align: left;
	}

	.class-card:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-2px);
	}

	.class-card.selected {
		border-color: var(--color-primary-500);
		background: rgba(var(--color-primary-500-rgb), 0.2);
	}

	.class-name {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-primary-300);
		margin-bottom: var(--spacing-xs);
	}

	.class-description {
		font-size: 0.875rem;
		color: var(--color-neutral-300);
		line-height: 1.4;
	}

	.points-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-sm) var(--spacing-md);
		background: rgba(255, 255, 255, 0.05);
		border-radius: 8px;
	}

	.points-label {
		color: var(--color-neutral-300);
		font-size: 0.875rem;
	}

	.points-value {
		color: var(--color-primary-400);
		font-weight: 600;
		font-size: 1rem;
	}

	.points-value.warning {
		color: var(--color-accent-400);
	}

	.attributes-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.attribute-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-sm);
		background: rgba(255, 255, 255, 0.03);
		border-radius: 6px;
	}

	.attribute-name {
		color: var(--color-neutral-200);
		font-weight: 500;
		font-size: 1rem;
	}

	.attribute-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.btn-attribute {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-primary-600);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1.25rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-attribute:hover:not(:disabled) {
		background: var(--color-primary-500);
		transform: scale(1.1);
	}

	.btn-attribute:disabled {
		background: var(--color-neutral-700);
		cursor: not-allowed;
		opacity: 0.5;
	}

	.attribute-value {
		min-width: 40px;
		text-align: center;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-primary-300);
	}

	.appearance-placeholder {
		text-align: center;
		padding: var(--spacing-xl);
		color: var(--color-neutral-400);
		font-style: italic;
	}

	.actions {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-xl);
	}

	.btn-primary {
		padding: var(--spacing-md) var(--spacing-xl);
		font-size: 1.125rem;
		font-weight: 600;
		background: var(--color-primary-600);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
		min-width: 200px;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-500);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(var(--color-primary-500-rgb), 0.4);
	}

	.btn-primary:disabled {
		background: var(--color-neutral-700);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.error-message {
		color: var(--color-accent-400);
		font-size: 0.875rem;
		margin-top: var(--spacing-sm);
	}

	@media (max-width: 640px) {
		.title {
			font-size: 2rem;
		}

		.class-grid {
			grid-template-columns: 1fr;
		}

		.section-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
