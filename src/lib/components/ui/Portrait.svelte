<script lang="ts">
	import { Icon, StatusEffects } from '$lib/components/ui'
	import Tooltip from '$lib/components/ui/Tooltip.svelte'
	import type { StatusEffect } from '$lib/components/ui/StatusEffects.svelte'
	import type { Character } from '$lib/game/character'

	interface Attribute {
		value: number
		modifier?: number
	}

	interface Props {
		character: Character
		size?: 'small' | 'medium' | 'large'
		class?: string
		maxVisibleEffects?: number
	}

	let {
		character,
		size = 'medium',
		class: className = '',
		maxVisibleEffects = 3,
	}: Props = $props()

	// Extract data from character object
	const portraitId = $derived(character.portraitId)
	const playerName = $derived(character.name)
	const playerClass = $derived(character.class || '')
	const classIcon = $derived(character.classIcon || '')
	const classDescription = $derived(character.classDescription || '')
	const health = $derived(character.health)
	const maxHealth = $derived(character.maxHealth)
	const mana = $derived(character.mana)
	const maxMana = $derived(character.maxMana)
	const level = $derived(character.level)
	const experience = $derived(character.experience)
	const maxExperience = $derived(character.experienceToNextLevel)
	const statusEffects = $derived(character.statusEffects || [])

	// Convert attributes to Attribute objects with modifiers
	const strength = $derived<Attribute | undefined>(
		character.strength !== undefined
			? {
					value: character.strength,
					modifier: Math.floor((character.strength - 10) / 2),
			  }
			: undefined
	)
	const dexterity = $derived<Attribute | undefined>(
		character.dexterity !== undefined
			? {
					value: character.dexterity,
					modifier: Math.floor((character.dexterity - 10) / 2),
			  }
			: undefined
	)
	const intelligence = $derived<Attribute | undefined>(
		character.intelligence !== undefined
			? {
					value: character.intelligence,
					modifier: Math.floor((character.intelligence - 10) / 2),
			  }
			: undefined
	)
	const vitality = $derived<Attribute | undefined>(
		character.vitality !== undefined
			? {
					value: character.vitality,
					modifier: Math.floor((character.vitality - 10) / 2),
			  }
			: undefined
	)
	const luck = $derived<Attribute | undefined>(
		character.luck !== undefined
			? {
					value: character.luck,
					modifier: Math.floor((character.luck - 10) / 2),
			  }
			: undefined
	)

	// Compute portrait URL
	const portraitUrl = $derived(`/src/lib/assets/portraits/${portraitId}.png`)

	// Health and mana percentages for bars
	const healthPercent = $derived(maxHealth > 0 ? (health / maxHealth) * 100 : 0)
	const manaPercent = $derived(maxMana > 0 ? (mana / maxMana) * 100 : 0)
	const expPercent = $derived(maxExperience > 0 ? (experience / maxExperience) * 100 : 0)

	// Size multipliers
	const sizeMultipliers = {
		small: 0.7,
		medium: 1,
		large: 1.3,
	}
	const multiplier = sizeMultipliers[size]

	// Calculate circular progress bar path
	const radius = 20
	const circumference = 2 * Math.PI * radius
	const circleOffset = $derived(circumference - (expPercent / 100) * circumference)

	// State for tooltips
	let showCharacterTooltip = $state(false)
	let showExpTooltip = $state(false)
	let showHpTooltip = $state(false)
	let showMpTooltip = $state(false)

	// Helper to format attribute with modifier
	function formatAttribute(attr: Attribute | undefined): string {
		if (!attr) return '-'
		const modifier = attr.modifier ?? 0
		if (modifier === 0) return `${attr.value}`
		const sign = modifier > 0 ? '+' : ''
		return `${attr.value} (${sign}${modifier})`
	}

	// Check if we have any attributes to show
	const hasAttributes = $derived(
		strength !== undefined ||
			dexterity !== undefined ||
			intelligence !== undefined ||
			vitality !== undefined ||
			luck !== undefined
	)
</script>

<div class="portrait-wrapper {className}" style:--size-multiplier={multiplier}>
	<!-- Left Section -->
	<div class="left-section">
		<!-- Top Row: Level/Exp Circle + Class in same block -->
		<div class="top-row-block">
			<!-- Level/Exp Circle -->
			<div
				class="level-exp-circle"
				onmouseenter={() => (showExpTooltip = true)}
				onmouseleave={() => (showExpTooltip = false)}
			>
				<svg class="progress-ring" width="50" height="50" viewBox="0 0 50 50">
					<!-- Background circle -->
					<circle
						class="progress-ring-bg"
						cx="25"
						cy="25"
						r={radius}
						fill="none"
						stroke="rgba(255, 255, 255, 0.1)"
						stroke-width="3"
					/>
					<!-- Progress circle -->
					<circle
						class="progress-ring-circle"
						cx="25"
						cy="25"
						r={radius}
						fill="none"
						stroke="url(#expGradient)"
						stroke-width="3"
						stroke-dasharray={circumference}
						stroke-dashoffset={circleOffset}
						transform="rotate(-90 25 25)"
					/>
					<!-- Gradient definition -->
					<defs>
						<linearGradient id="expGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
							<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
						</linearGradient>
					</defs>
				</svg>
				<div class="level-text">{level}</div>

				<!-- Tooltip -->
				{#if showExpTooltip}
					<Tooltip position="top" sizeMultiplier={multiplier}>
						<div class="tooltip-text">XP: {experience}/{maxExperience}</div>
						<div class="tooltip-remaining">{maxExperience - experience} to next level</div>
					</Tooltip>
				{/if}
			</div>

			<!-- Class Badge -->
			{#if playerClass}
				<div class="class-block">
					{#if classIcon}
						<Icon icon={classIcon} size="sm" />
					{/if}
					<span>{playerClass}</span>
				</div>
			{/if}
		</div>

		<!-- Name Block with HP/MP inside -->
		{#if playerName}
			<div class="name-block">
				<span class="player-name">{playerName}</span>

				<!-- Separator -->
				<div class="separator"></div>

				<!-- HP/MP Bars inside name block -->
				<div class="stats-container">
					<!-- HP Bar -->
					<div
						class="stat-bar-wrapper"
						onmouseenter={() => (showHpTooltip = true)}
						onmouseleave={() => (showHpTooltip = false)}
					>
						<span class="bar-label">HP</span>
						<div class="bar-track">
							<div class="bar-fill hp-bar" style:width="{healthPercent}%"></div>
						</div>
						<!-- HP Tooltip -->
						{#if showHpTooltip}
							<Tooltip position="top" sizeMultiplier={multiplier}>
								<span class="bar-tooltip-text">{health} / {maxHealth}</span>
							</Tooltip>
						{/if}
					</div>

					<!-- MP Bar -->
					<div
						class="stat-bar-wrapper"
						onmouseenter={() => (showMpTooltip = true)}
						onmouseleave={() => (showMpTooltip = false)}
					>
						<span class="bar-label">MP</span>
						<div class="bar-track">
							<div class="bar-fill mp-bar" style:width="{manaPercent}%"></div>
						</div>
						<!-- MP Tooltip -->
						{#if showMpTooltip}
							<Tooltip position="top" sizeMultiplier={multiplier}>
								<span class="bar-tooltip-text">{mana} / {maxMana}</span>
							</Tooltip>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<!-- Status Effects (Buffs/Debuffs) -->
		<StatusEffects effects={statusEffects} maxVisible={maxVisibleEffects} {size} />
	</div>

	<!-- Right Section: Portrait -->
	<div
		class="right-section"
		onmouseenter={() => (showCharacterTooltip = true)}
		onmouseleave={() => (showCharacterTooltip = false)}
	>
		<div class="portrait-frame">
			<img src={portraitUrl} alt={playerName} class="portrait-image" />
		</div>

		<!-- Character Info Tooltip -->
		{#if showCharacterTooltip && (playerClass || hasAttributes)}
			<Tooltip position="right" sizeMultiplier={multiplier}>
				{#if playerClass}
					<div class="character-tooltip-section">
						<div class="character-tooltip-header">
							{#if classIcon}
								<Icon icon={classIcon} size="sm" />
							{/if}
							<span>{playerClass}</span>
						</div>
						{#if classDescription}
							<div class="character-tooltip-desc">{classDescription}</div>
						{/if}
					</div>
				{/if}

				{#if hasAttributes}
					<div class="character-tooltip-section">
						<div class="character-tooltip-subheader">Attributes</div>
						<div class="attributes-grid">
							{#if strength}
								<div class="attribute-row">
									<span class="attribute-label">Strength:</span>
									<span class="attribute-value">{formatAttribute(strength)}</span>
								</div>
							{/if}
							{#if dexterity}
								<div class="attribute-row">
									<span class="attribute-label">Dexterity:</span>
									<span class="attribute-value">{formatAttribute(dexterity)}</span>
								</div>
							{/if}
							{#if intelligence}
								<div class="attribute-row">
									<span class="attribute-label">Intelligence:</span>
									<span class="attribute-value">{formatAttribute(intelligence)}</span>
								</div>
							{/if}
							{#if vitality}
								<div class="attribute-row">
									<span class="attribute-label">Vitality:</span>
									<span class="attribute-value">{formatAttribute(vitality)}</span>
								</div>
							{/if}
							{#if luck}
								<div class="attribute-row">
									<span class="attribute-label">Luck:</span>
									<span class="attribute-value">{formatAttribute(luck)}</span>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</Tooltip>
		{/if}
	</div>
</div>

<style>
	.portrait-wrapper {
		display: flex;
		gap: calc(8px * var(--size-multiplier));
		width: fit-content;
		padding: 0;
	}

	/* ===== LEFT SECTION ===== */
	.left-section {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: calc(4px * var(--size-multiplier));
		min-width: calc(200px * var(--size-multiplier));
	}

	/* Top Row: Level/Exp + Class in same block */
	.top-row-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: calc(6px * var(--size-multiplier));
	}

	/* Level/Exp Circle */
	.level-exp-circle {
		position: relative;
		width: calc(50px * var(--size-multiplier));
		height: calc(50px * var(--size-multiplier));
		flex-shrink: 0;
		cursor: help;
	}

	.progress-ring {
		width: 100%;
		height: 100%;
	}

	.progress-ring-circle {
		transition: stroke-dashoffset 0.5s ease;
	}

	.level-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: calc(18px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
		pointer-events: none;
	}

	/* Tooltip content styling */
	.tooltip-text {
		font-size: calc(12px * var(--size-multiplier));
		font-weight: 600;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-mono);
		margin-bottom: calc(2px * var(--size-multiplier));
	}

	.tooltip-remaining {
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		font-family: var(--font-mono);
	}

	/* Class Block */
	.class-block {
		display: flex;
		align-items: center;
		gap: calc(4px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.7);
		padding: calc(4px * var(--size-multiplier)) calc(8px * var(--size-multiplier));
		border-radius: calc(6px * var(--size-multiplier));
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		width: fit-content;
	}

	.class-block span {
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 600;
		color: white;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Name Block */
	.name-block {
		background: rgba(0, 0, 0, 0.7);
		padding: calc(6px * var(--size-multiplier)) calc(10px * var(--size-multiplier));
		border-radius: calc(6px * var(--size-multiplier));
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		width: 100%;
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: calc(4px * var(--size-multiplier));
	}

	.player-name {
		font-size: calc(14px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-serif);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	/* Separator */
	.separator {
		width: 100%;
		height: 1px;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.3),
			transparent
		);
	}

	/* Stats Container (HP/MP inside name block) */
	.stats-container {
		display: flex;
		flex-direction: column;
		gap: calc(3px * var(--size-multiplier));
	}

	/* Stat Bars */
	.stat-bar-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		gap: calc(6px * var(--size-multiplier));
		width: 100%;
		cursor: help;
	}

	.bar-label {
		font-size: calc(10px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		min-width: calc(22px * var(--size-multiplier));
		font-family: var(--font-mono);
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
		text-align: right;
	}

	.bar-track {
		flex: 1;
		height: calc(12px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.5);
		border-radius: calc(6px * var(--size-multiplier));
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4);
	}

	.bar-fill {
		height: 100%;
		transition: width 0.3s ease;
		box-shadow: 0 0 10px currentColor;
	}

	.hp-bar {
		background: linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
	}

	.mp-bar {
		background: linear-gradient(90deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
	}

	/* Bar Tooltip content styling */
	.bar-tooltip-text {
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 600;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-mono);
	}

	/* ===== RIGHT SECTION: Portrait ===== */
	.right-section {
		position: relative;
		flex-shrink: 0;
	}

	.portrait-frame {
		position: relative;
		width: calc(140px * var(--size-multiplier));
		height: calc(168px * var(--size-multiplier));
		border: calc(2px * var(--size-multiplier)) solid rgba(255, 255, 255, 0.3);
		border-radius: calc(12px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.3);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), inset 0 2px 8px rgba(0, 0, 0, 0.3);
		cursor: help;
		transition: border-color 0.2s ease;
		overflow: hidden;
	}

	.portrait-frame:hover {
		border-color: var(--color-arcana-gold-500);
	}

	.portrait-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		display: block;
	}

	/* Character Tooltip content styling */
	.character-tooltip-section {
		margin-bottom: calc(12px * var(--size-multiplier));
	}

	.character-tooltip-section:last-child {
		margin-bottom: 0;
	}

	.character-tooltip-header {
		display: flex;
		align-items: center;
		gap: calc(6px * var(--size-multiplier));
		font-size: calc(14px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
		margin-bottom: calc(6px * var(--size-multiplier));
	}

	.character-tooltip-desc {
		font-size: calc(11px * var(--size-multiplier));
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.4;
		font-style: italic;
	}

	.character-tooltip-subheader {
		font-size: calc(12px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-400);
		font-family: var(--font-serif);
		margin-bottom: calc(6px * var(--size-multiplier));
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.attributes-grid {
		display: flex;
		flex-direction: column;
		gap: calc(4px * var(--size-multiplier));
	}

	.attribute-row {
		display: flex;
		justify-content: space-between;
		gap: calc(12px * var(--size-multiplier));
		font-size: calc(11px * var(--size-multiplier));
		font-family: var(--font-mono);
	}

	.attribute-label {
		color: rgba(255, 255, 255, 0.7);
		font-weight: 500;
	}

	.attribute-value {
		color: white;
		font-weight: 700;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.portrait-wrapper {
			flex-direction: column-reverse;
			align-items: center;
		}

		.left-section {
			align-items: center;
			width: 100%;
		}

		.top-row-block {
			justify-content: center;
		}

		.name-block {
			text-align: center;
		}
	}
</style>
