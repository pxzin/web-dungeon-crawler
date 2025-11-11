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
	import { Button, Card, Input } from '$lib/components/ui'

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
		// Players can lower any attribute to 1 to redistribute points freely
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

	// Class emoji icons (fallback visual)
	const classEmojis: Record<CharacterClass, string> = {
		[CharacterClass.WARRIOR]: '⚔️',
		[CharacterClass.MAGE]: '🔮',
		[CharacterClass.ROGUE]: '🗡️',
		[CharacterClass.CLERIC]: '✨',
	}
</script>

<div class="character-creation">
	<div class="container-fluid max-w-5xl">
		<!-- Title -->
		<div class="text-center mb-12">
			<h1 class="arcana-heading-lg mb-2">
				{$LL.game.characterCreation.title()}
			</h1>
			<div class="title-divider"></div>
		</div>

		<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
			<!-- Character Name -->
			<Card variant="elevated" class="mb-8">
				<h2 class="arcana-heading-sm mb-6 text-center">
					{$LL.game.characterCreation.characterName()}
				</h2>
				<div class="max-w-md mx-auto">
					<Input
						bind:value={formData.name}
						placeholder={$LL.game.characterCreation.namePlaceholder()}
						maxlength={20}
						error={errors.name ? getValidationError(errors.name) : ''}
						class="character-name-input"
					/>
				</div>
			</Card>

			<!-- Class Selection -->
			<Card variant="elevated" class="mb-8">
				<h2 class="arcana-heading-sm mb-6 text-center">
					{$LL.game.characterCreation.selectClass()}
				</h2>
				<div class="class-grid">
					{#each Object.values(CharacterClass) as characterClass}
						<button
							type="button"
							class="class-card {formData.class === characterClass ? 'class-card-selected' : ''}"
							onclick={() => selectClass(characterClass)}
						>
							<!-- Icon Circle -->
							<div class="class-icon-wrapper">
								<span class="class-emoji">{classEmojis[characterClass]}</span>
							</div>

							<!-- Class Name -->
							<h3 class="class-name">
								{getClassName(characterClass)}
							</h3>

							<!-- Description -->
							<p class="class-description">
								{getClassDescription(characterClass)}
							</p>

							<!-- Selection Indicator -->
							{#if formData.class === characterClass}
								<div class="selected-badge">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
										<path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
									</svg>
								</div>
							{/if}
						</button>
					{/each}
				</div>
				{#if errors.class}
					<p class="text-arcana-orange-500 text-sm mt-6 text-center font-semibold">
						{getValidationError(errors.class)}
					</p>
				{/if}
			</Card>

			<!-- Attribute Distribution -->
			{#if formData.class}
				<Card variant="gold" class="mb-8">
					<!-- Header with Points -->
					<div class="flex justify-between items-center mb-8 pb-4 border-b-2 border-arcana-border-gold/30">
						<h2 class="arcana-heading-sm">
							{$LL.game.characterCreation.distributePoints()}
						</h2>
						<div class="points-badge {remainingPoints > 0 ? 'points-warning' : ''}">
							<span class="points-label">
								{$LL.game.characterCreation.pointsAvailable()}:
							</span>
							<span class="points-value">
								{remainingPoints}
							</span>
						</div>
					</div>

					<!-- Attributes Grid -->
					<div class="attributes-container">
						{#each Object.values(AttributeName) as attr}
							<div class="attribute-row">
								<!-- Attribute Name -->
								<div class="attribute-label">
									<span class="attribute-name">
										{getAttributeName(attr)}
									</span>
								</div>

								<!-- Controls -->
								<div class="attribute-controls">
									<button
										type="button"
										class="btn-attr"
										disabled={formData.attributes[attr] <= MIN_ATTRIBUTE_VALUE}
										onclick={() => decrementAttribute(attr)}
										aria-label="Decrease {attr}"
									>
										−
									</button>

									<div class="attribute-value-display">
										<span class="attribute-value">{formData.attributes[attr]}</span>
									</div>

									<button
										type="button"
										class="btn-attr"
										disabled={remainingPoints <= 0 || formData.attributes[attr] >= MAX_ATTRIBUTE_VALUE}
										onclick={() => incrementAttribute(attr)}
										aria-label="Increase {attr}"
									>
										+
									</button>
								</div>
							</div>
						{/each}
					</div>

					{#if errors.attributes}
						<p class="text-arcana-orange-500 text-sm mt-6 text-center font-semibold">
							{getValidationError(errors.attributes)}
						</p>
					{/if}
				</Card>
			{/if}

			<!-- Submit Button -->
			<div class="flex justify-center mt-10">
				<Button
					variant="primary"
					size="lg"
					fullWidth={false}
					disabled={!canSubmit || isSubmitting}
					type="submit"
					class="submit-button"
				>
					{#if isSubmitting}
						<span class="loading-spinner"></span>
						<span>{$LL.game.ui.loading()}</span>
					{:else}
						<span class="submit-icon">⚔️</span>
						<span>{$LL.game.characterCreation.startAdventure()}</span>
					{/if}
				</Button>
			</div>
		</form>
	</div>
</div>

<style>
	.character-creation {
		min-height: 100vh;
		padding: var(--spacing-3xl) var(--spacing-md);
	}

	/* Title */
	.title-divider {
		width: 120px;
		height: 3px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--color-arcana-gold-500),
			transparent
		);
		margin: 0 auto;
		border-radius: 2px;
	}

	/* Class Selection */
	.class-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	.class-card {
		position: relative;
		background: var(--color-arcana-bg-elevated);
		border: 3px solid var(--color-arcana-border-default);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-2xl);
		cursor: pointer;
		transition: all var(--transition-base);
		text-align: center;
		overflow: hidden;
	}

	.class-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(201, 152, 74, 0.05),
			transparent
		);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.class-card:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: var(--color-arcana-gold-600);
		box-shadow:
			var(--shadow-2xl),
			0 0 40px rgba(201, 152, 74, 0.3),
			inset 0 0 20px rgba(201, 152, 74, 0.1);
	}

	.class-card:hover::before {
		opacity: 1;
	}

	.class-card-selected {
		border-color: var(--color-arcana-gold-500) !important;
		background: linear-gradient(
			135deg,
			var(--color-arcana-bg-elevated),
			rgba(201, 152, 74, 0.1)
		);
		box-shadow:
			var(--shadow-2xl),
			0 0 60px rgba(201, 152, 74, 0.4),
			inset 0 0 30px rgba(201, 152, 74, 0.15);
	}

	.class-card-selected::before {
		opacity: 1;
	}

	.class-icon-wrapper {
		width: 120px;
		height: 120px;
		margin: 0 auto var(--spacing-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-arcana-bg-primary);
		border-radius: var(--radius-full);
		border: 4px solid var(--color-arcana-gold-700);
		box-shadow:
			var(--shadow-lg),
			inset 0 2px 8px rgba(0, 0, 0, 0.3);
		transition: all var(--transition-base);
		position: relative;
		overflow: hidden;
	}

	.class-icon-wrapper::after {
		content: '';
		position: absolute;
		inset: -50%;
		background: linear-gradient(
			45deg,
			transparent,
			rgba(255, 255, 255, 0.1),
			transparent
		);
		transform: translateX(-100%) rotate(45deg);
		transition: transform 0.6s;
	}

	.class-card:hover .class-icon-wrapper {
		transform: scale(1.1) rotate(5deg);
		border-color: var(--color-arcana-gold-500);
		box-shadow:
			var(--shadow-xl),
			0 0 30px rgba(201, 152, 74, 0.5),
			inset 0 2px 12px rgba(0, 0, 0, 0.4);
	}

	.class-card:hover .class-icon-wrapper::after {
		transform: translateX(100%) rotate(45deg);
	}

	.class-card-selected .class-icon-wrapper {
		background: var(--color-arcana-gold-900);
		border-color: var(--color-arcana-gold-400);
		box-shadow:
			var(--shadow-xl),
			0 0 40px rgba(201, 152, 74, 0.6);
	}

	.class-emoji {
		font-size: 3.5rem;
		line-height: 1;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.class-name {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		margin-bottom: var(--spacing-md);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.class-description {
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-arcana-text-secondary);
	}

	.selected-badge {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		width: 40px;
		height: 40px;
		background: var(--color-arcana-gold-600);
		border-radius: var(--radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-arcana-bg-primary);
		box-shadow: var(--shadow-lg), var(--glow-gold);
		animation: badgePulse 2s ease-in-out infinite;
	}

	@keyframes badgePulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}

	/* Attributes */
	.points-badge {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		background: var(--color-arcana-bg-primary);
		padding: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--radius-xl);
		border: 2px solid var(--color-arcana-border-gold);
		box-shadow: var(--shadow-md);
	}

	.points-badge.points-warning {
		border-color: var(--color-arcana-orange-500);
		background: rgba(255, 107, 53, 0.1);
	}

	.points-label {
		font-size: var(--text-sm);
		color: var(--color-arcana-text-secondary);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.points-value {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
		min-width: 2ch;
		text-align: center;
	}

	.points-warning .points-value {
		color: var(--color-arcana-orange-400);
		animation: pointsPulse 1s ease-in-out infinite;
	}

	@keyframes pointsPulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.15); }
	}

	.attributes-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.attribute-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		background: var(--color-arcana-bg-primary);
		border-radius: var(--radius-xl);
		border: 2px solid var(--color-arcana-border-default);
		transition: all var(--transition-fast);
	}

	.attribute-row:hover {
		border-color: var(--color-arcana-gold-700);
		box-shadow: var(--shadow-md), inset 0 0 20px rgba(201, 152, 74, 0.05);
		transform: translateX(4px);
	}

	.attribute-label {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.attribute-name {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-arcana-text-primary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.attribute-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.btn-attr {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-arcana-gold-600);
		color: var(--color-arcana-bg-primary);
		border: none;
		border-radius: var(--radius-lg);
		font-size: var(--text-2xl);
		font-weight: 700;
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-md);
		font-family: var(--font-sans);
		line-height: 1;
	}

	.btn-attr:hover:not(:disabled) {
		background: var(--color-arcana-gold-500);
		transform: scale(1.1);
		box-shadow: var(--shadow-lg), var(--glow-gold);
	}

	.btn-attr:active:not(:disabled) {
		transform: scale(0.95);
	}

	.btn-attr:disabled {
		background: var(--color-arcana-border-default);
		cursor: not-allowed;
		opacity: 0.3;
	}

	.attribute-value-display {
		min-width: 64px;
		text-align: center;
		background: var(--color-arcana-bg-elevated);
		border-radius: var(--radius-lg);
		padding: var(--spacing-sm) var(--spacing-md);
		border: 2px solid var(--color-arcana-border-gold);
	}

	.attribute-value {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
	}

	/* Character Name Input Enhancement */
	:global(.character-name-input input) {
		text-align: center;
		font-size: var(--text-xl) !important;
		font-family: var(--font-serif) !important;
		font-weight: 600 !important;
		padding: var(--spacing-lg) var(--spacing-xl) !important;
		border: 3px solid var(--color-arcana-gold-700) !important;
		background: var(--color-arcana-bg-primary) !important;
		box-shadow:
			inset 0 2px 8px rgba(0, 0, 0, 0.3),
			0 0 0 1px rgba(201, 152, 74, 0.2),
			var(--shadow-lg) !important;
		transition: all var(--transition-base) !important;
	}

	:global(.character-name-input input:focus) {
		border-color: var(--color-arcana-gold-500) !important;
		box-shadow:
			inset 0 2px 8px rgba(0, 0, 0, 0.3),
			0 0 0 3px rgba(201, 152, 74, 0.3),
			0 0 20px rgba(201, 152, 74, 0.4),
			var(--shadow-xl) !important;
		transform: translateY(-2px);
	}

	:global(.character-name-input input::placeholder) {
		color: var(--color-arcana-text-muted) !important;
		opacity: 0.6;
	}

	/* Submit Button Enhancement */
	:global(.submit-button) {
		min-width: 320px;
		font-size: var(--text-xl) !important;
		font-weight: 700 !important;
		padding: var(--spacing-lg) var(--spacing-2xl) !important;
		position: relative;
		overflow: hidden;
		border: 3px solid var(--color-arcana-gold-800) !important;
		background: linear-gradient(135deg, var(--color-arcana-gold-600), var(--color-arcana-gold-700)) !important;
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.3),
			0 8px 16px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(201, 152, 74, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
		transition: all var(--transition-base) !important;
	}

	:global(.submit-button::before) {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transition: left 0.5s;
	}

	:global(.submit-button:not(:disabled):hover) {
		transform: translateY(-3px) !important;
		border-color: var(--color-arcana-gold-600) !important;
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.5),
			0 12px 24px rgba(0, 0, 0, 0.5),
			0 0 40px rgba(201, 152, 74, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
	}

	:global(.submit-button:not(:disabled):hover::before) {
		left: 100%;
	}

	:global(.submit-button:not(:disabled):active) {
		transform: translateY(-1px) !important;
	}

	:global(.submit-button:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
		border-color: var(--color-arcana-border-default) !important;
		background: var(--color-arcana-bg-secondary) !important;
		box-shadow: var(--shadow-md) !important;
	}

	.submit-icon {
		font-size: 1.5em;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
	}

	.loading-spinner {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 3px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* Responsive */
	@media (max-width: 768px) {
		.character-creation {
			padding: var(--spacing-2xl) var(--spacing-md);
		}

		.class-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
		}

		.attribute-row {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
			text-align: center;
		}

		.attribute-label {
			justify-content: center;
		}

		.attribute-controls {
			justify-content: center;
		}

		.points-badge {
			flex-direction: column;
			text-align: center;
		}

		:global(.submit-button) {
			min-width: 100%;
		}
	}
</style>
