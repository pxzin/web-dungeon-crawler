<script lang="ts">
	import { Icon } from '$lib/components/ui'
	import type { CharacterClass } from '$lib/game/character'

	interface Props {
		characterClass: CharacterClass
		selected?: boolean
		onclick?: () => void
		className?: string
		description?: string
		title?: string
	}

	let {
		characterClass,
		selected = false,
		onclick,
		className = '',
		description = '',
		title = '',
	}: Props = $props()

	// Map character classes to game-icons
	const classIconMap: Record<CharacterClass, string> = {
		warrior: 'game-icons-sword-brandish',
		mage: 'game-icons-crystal-wand',
		rogue: 'game-icons-hood',
		cleric: 'game-icons-prayer-beads',
	}

	// Map character classes to icon colors
	const classColorMap: Record<CharacterClass, string> = {
		warrior: 'text-arcana-orange-500',
		mage: 'text-arcana-cyan-400',
		rogue: 'text-arcana-magenta-400',
		cleric: 'text-arcana-gold-400',
	}

	const icon = classIconMap[characterClass]
	const iconColor = classColorMap[characterClass]
</script>

<button
	type="button"
	class="class-badge {selected ? 'class-badge-selected' : ''} {className}"
	{onclick}
>
	<!-- Icon Circle -->
	<div class="class-icon-wrapper">
		<Icon {icon} size="3xl" class={iconColor} />
	</div>

	<!-- Class Name -->
	<h3 class="class-name">
		{title}
	</h3>

	<!-- Description -->
	{#if description}
		<p class="class-description">
			{description}
		</p>
	{/if}

	<!-- Selection Indicator -->
	{#if selected}
		<div class="selected-badge">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
				<path
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				/>
			</svg>
		</div>
	{/if}
</button>

<style>
	.class-badge {
		position: relative;
		background: var(--color-arcana-bg-elevated);
		border: 3px solid var(--color-arcana-border-default);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-2xl);
		cursor: pointer;
		transition: all var(--transition-base);
		text-align: center;
		overflow: hidden;
		width: 100%;
	}

	.class-badge::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(201, 152, 74, 0.05), transparent);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	.class-badge:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: var(--color-arcana-gold-600);
		box-shadow:
			var(--shadow-2xl),
			0 0 40px rgba(201, 152, 74, 0.3),
			inset 0 0 20px rgba(201, 152, 74, 0.1);
	}

	.class-badge:hover::before {
		opacity: 1;
	}

	.class-badge-selected {
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

	.class-badge-selected::before {
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
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transform: translateX(-100%) rotate(45deg);
		transition: transform 0.6s;
	}

	.class-badge:hover .class-icon-wrapper {
		transform: scale(1.1) rotate(5deg);
		border-color: var(--color-arcana-gold-500);
		box-shadow:
			var(--shadow-xl),
			0 0 30px rgba(201, 152, 74, 0.5),
			inset 0 2px 12px rgba(0, 0, 0, 0.4);
	}

	.class-badge:hover .class-icon-wrapper::after {
		transform: translateX(100%) rotate(45deg);
	}

	.class-badge-selected .class-icon-wrapper {
		background: var(--color-arcana-gold-900);
		border-color: var(--color-arcana-gold-400);
		box-shadow:
			var(--shadow-xl),
			0 0 40px rgba(201, 152, 74, 0.6);
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
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>
