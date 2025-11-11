<script lang="ts">
	import SpriteIcon from './SpriteIcon.svelte'

	export interface StatusEffect {
		icon: string // SpriteIcon iconId
		name: string
		description?: string
		duration?: number // Duration in turns, undefined = permanent
		type?: 'buff' | 'debuff' // For styling purposes
	}

	interface Props {
		effects?: StatusEffect[]
		maxVisible?: number
		size?: 'small' | 'medium' | 'large'
		class?: string
	}

	let {
		effects = [],
		maxVisible = 3,
		size = 'medium',
		class: className = '',
	}: Props = $props()

	// Size multipliers
	const sizeMultipliers = {
		small: 0.8,
		medium: 1,
		large: 1.2,
	}
	const multiplier = sizeMultipliers[size]

	// Visible effects and overflow count
	const visibleEffects = $derived(effects.slice(0, maxVisible))
	const overflowCount = $derived(Math.max(0, effects.length - maxVisible))
	const hasOverflow = $derived(overflowCount > 0)

	// State for overflow dialog
	let showOverflowDialog = $state(false)

	// State for hover tooltip
	let showHoverTooltip = $state(false)
	const maxTooltipEffects = 5

	function toggleOverflowDialog() {
		showOverflowDialog = !showOverflowDialog
	}

	function closeOverflowDialog() {
		showOverflowDialog = false
	}

	function showTooltip() {
		if (effects.length > 0) {
			showHoverTooltip = true
		}
	}

	function hideTooltip() {
		showHoverTooltip = false
	}
</script>

<div
	class="status-effects {className}"
	style:--size-multiplier={multiplier}
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
>
	<!-- Visible status slots -->
	{#each visibleEffects as effect, index}
		<div
			class="status-slot"
			class:has-duration={effect.duration !== undefined}
			class:is-buff={effect.type === 'buff'}
			class:is-debuff={effect.type === 'debuff'}
			title={effect.description || effect.name}
		>
			<SpriteIcon iconId={effect.icon} size={20} />
			{#if effect.duration !== undefined}
				<div class="duration-badge">{effect.duration}</div>
			{/if}
		</div>
	{/each}

	<!-- Overflow indicator -->
	{#if hasOverflow}
		<button
			type="button"
			class="overflow-slot"
			onclick={toggleOverflowDialog}
			title="Show all status effects"
		>
			<span class="overflow-text">+{overflowCount}</span>
		</button>
	{/if}

	<!-- Hover Tooltip -->
	{#if showHoverTooltip && effects.length > 0}
		<div class="hover-tooltip">
			<div class="tooltip-header">Status Effects</div>
			<div class="tooltip-list">
				{#each effects.slice(0, maxTooltipEffects) as effect}
					<div class="tooltip-effect-item">
						<div
							class="tooltip-effect-icon"
							class:is-buff={effect.type === 'buff'}
							class:is-debuff={effect.type === 'debuff'}
						>
							<SpriteIcon iconId={effect.icon} size={18} />
							{#if effect.duration !== undefined}
								<span class="tooltip-duration">{effect.duration}</span>
							{/if}
						</div>
						<div class="tooltip-effect-text">
							<div class="tooltip-effect-name">{effect.name}</div>
							{#if effect.description}
								<div class="tooltip-effect-desc">{effect.description}</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			{#if effects.length > maxTooltipEffects}
				<div class="tooltip-footer">
					Click to view all {effects.length} effects
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- Overflow Dialog -->
{#if showOverflowDialog}
	<div class="dialog-overlay" onclick={closeOverflowDialog}>
		<div class="dialog-content" onclick={(e) => e.stopPropagation()}>
			<div class="dialog-header">
				<h3>Status Effects</h3>
				<button type="button" class="close-btn" onclick={closeOverflowDialog}>×</button>
			</div>
			<div class="dialog-body">
				{#each effects as effect}
					<div class="effect-item">
						<div class="effect-icon-wrapper">
							<div
								class="effect-icon"
								class:has-duration={effect.duration !== undefined}
								class:is-buff={effect.type === 'buff'}
								class:is-debuff={effect.type === 'debuff'}
							>
								<SpriteIcon iconId={effect.icon} size={28} />
								{#if effect.duration !== undefined}
									<div class="duration-badge-large">{effect.duration}</div>
								{/if}
							</div>
						</div>
						<div class="effect-details">
							<div class="effect-name">{effect.name}</div>
							{#if effect.description}
								<div class="effect-description">{effect.description}</div>
							{/if}
							{#if effect.duration !== undefined}
								<div class="effect-duration">
									{effect.duration} {effect.duration === 1 ? 'turn' : 'turns'} remaining
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.status-effects {
		position: relative;
		display: flex;
		gap: calc(4px * var(--size-multiplier));
		align-items: center;
	}

	/* Status Slot */
	.status-slot {
		position: relative;
		width: calc(28px * var(--size-multiplier));
		height: calc(28px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: calc(6px * var(--size-multiplier));
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.9);
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
		transition: all 0.2s ease;
		cursor: help;
	}

	.status-slot:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.4);
		transform: translateY(-2px);
	}

	/* Animated border for status with duration */
	.status-slot.has-duration {
		animation: pulse-border 2s ease-in-out infinite;
	}

	.status-slot.is-buff.has-duration {
		border-color: rgba(34, 197, 94, 0.5);
	}

	.status-slot.is-debuff.has-duration {
		border-color: rgba(239, 68, 68, 0.5);
	}

	@keyframes pulse-border {
		0%,
		100% {
			box-shadow: 0 0 0 0 currentColor;
		}
		50% {
			box-shadow: 0 0 8px 2px currentColor;
		}
	}

	/* Duration badge */
	.duration-badge {
		position: absolute;
		bottom: calc(-4px * var(--size-multiplier));
		right: calc(-4px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: calc(4px * var(--size-multiplier));
		padding: calc(1px * var(--size-multiplier)) calc(3px * var(--size-multiplier));
		font-size: calc(9px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-mono);
		line-height: 1;
	}

	/* Overflow slot */
	.overflow-slot {
		width: calc(28px * var(--size-multiplier));
		height: calc(28px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.8);
		border: 1px solid var(--color-arcana-gold-500);
		border-radius: calc(6px * var(--size-multiplier));
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
	}

	.overflow-slot:hover {
		background: rgba(0, 0, 0, 0.9);
		border-color: var(--color-arcana-gold-400);
		transform: translateY(-2px) scale(1.05);
		box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
	}

	.overflow-text {
		font-size: calc(10px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-400);
		font-family: var(--font-mono);
	}

	/* Dialog Overlay */
	.dialog-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		backdrop-filter: blur(4px);
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Dialog Content */
	.dialog-content {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		border: 2px solid var(--color-arcana-gold-500);
		border-radius: calc(12px * var(--size-multiplier));
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
		max-width: calc(400px * var(--size-multiplier));
		max-height: 80vh;
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(16px * var(--size-multiplier));
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.dialog-header h3 {
		font-size: calc(18px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
		margin: 0;
	}

	.close-btn {
		width: calc(32px * var(--size-multiplier));
		height: calc(32px * var(--size-multiplier));
		background: transparent;
		border: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: calc(28px * var(--size-multiplier));
		font-weight: 300;
		line-height: 1;
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-btn:hover {
		color: white;
		transform: scale(1.1);
	}

	.dialog-body {
		padding: calc(16px * var(--size-multiplier));
		max-height: 60vh;
		overflow-y: auto;
	}

	/* Effect Item */
	.effect-item {
		display: flex;
		gap: calc(12px * var(--size-multiplier));
		padding: calc(12px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: calc(8px * var(--size-multiplier));
		margin-bottom: calc(8px * var(--size-multiplier));
		transition: all 0.2s ease;
	}

	.effect-item:last-child {
		margin-bottom: 0;
	}

	.effect-item:hover {
		background: rgba(0, 0, 0, 0.5);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.effect-icon-wrapper {
		flex-shrink: 0;
	}

	.effect-icon {
		position: relative;
		width: calc(40px * var(--size-multiplier));
		height: calc(40px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.6);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: calc(8px * var(--size-multiplier));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.effect-icon.has-duration {
		animation: pulse-border 2s ease-in-out infinite;
	}

	.effect-icon.is-buff {
		border-color: rgba(34, 197, 94, 0.5);
		background: rgba(34, 197, 94, 0.1);
	}

	.effect-icon.is-debuff {
		border-color: rgba(239, 68, 68, 0.5);
		background: rgba(239, 68, 68, 0.1);
	}

	.duration-badge-large {
		position: absolute;
		bottom: calc(-6px * var(--size-multiplier));
		right: calc(-6px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.95);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: calc(6px * var(--size-multiplier));
		padding: calc(2px * var(--size-multiplier)) calc(6px * var(--size-multiplier));
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-mono);
		line-height: 1;
	}

	.effect-details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: calc(4px * var(--size-multiplier));
	}

	.effect-name {
		font-size: calc(14px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-serif);
	}

	.effect-description {
		font-size: calc(12px * var(--size-multiplier));
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.4;
	}

	.effect-duration {
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 600;
		color: var(--color-arcana-gold-400);
		font-family: var(--font-mono);
	}

	/* Scrollbar styling */
	.dialog-body::-webkit-scrollbar {
		width: 8px;
	}

	.dialog-body::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
	}

	.dialog-body::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
	}

	.dialog-body::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	/* Hover Tooltip */
	.hover-tooltip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 0;
		background: rgba(0, 0, 0, 0.95);
		border: 1px solid var(--color-arcana-gold-500);
		border-radius: calc(8px * var(--size-multiplier));
		padding: calc(8px * var(--size-multiplier));
		min-width: 250px;
		max-width: 300px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
		z-index: 99;
		animation: fadeIn 0.2s ease;
		pointer-events: none;
	}

	.tooltip-header {
		font-size: calc(12px * var(--size-multiplier));
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		font-family: var(--font-serif);
		margin-bottom: calc(6px * var(--size-multiplier));
		padding-bottom: calc(4px * var(--size-multiplier));
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.tooltip-list {
		display: flex;
		flex-direction: column;
		gap: calc(6px * var(--size-multiplier));
	}

	.tooltip-effect-item {
		display: flex;
		gap: calc(8px * var(--size-multiplier));
		align-items: flex-start;
	}

	.tooltip-effect-icon {
		position: relative;
		width: calc(24px * var(--size-multiplier));
		height: calc(24px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: calc(4px * var(--size-multiplier));
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.tooltip-effect-icon.is-buff {
		border-color: rgba(34, 197, 94, 0.5);
		background: rgba(34, 197, 94, 0.1);
	}

	.tooltip-effect-icon.is-debuff {
		border-color: rgba(239, 68, 68, 0.5);
		background: rgba(239, 68, 68, 0.1);
	}

	.tooltip-duration {
		position: absolute;
		bottom: calc(-3px * var(--size-multiplier));
		right: calc(-3px * var(--size-multiplier));
		background: rgba(0, 0, 0, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: calc(3px * var(--size-multiplier));
		padding: calc(1px * var(--size-multiplier)) calc(3px * var(--size-multiplier));
		font-size: calc(8px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-mono);
		line-height: 1;
	}

	.tooltip-effect-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: calc(2px * var(--size-multiplier));
	}

	.tooltip-effect-name {
		font-size: calc(11px * var(--size-multiplier));
		font-weight: 700;
		color: white;
		font-family: var(--font-serif);
	}

	.tooltip-effect-desc {
		font-size: calc(10px * var(--size-multiplier));
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.3;
	}

	.tooltip-footer {
		margin-top: calc(6px * var(--size-multiplier));
		padding-top: calc(6px * var(--size-multiplier));
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		font-size: calc(9px * var(--size-multiplier));
		font-weight: 600;
		color: var(--color-arcana-gold-400);
		font-family: var(--font-mono);
		text-align: center;
		font-style: italic;
	}

	/* Tooltip arrow */
	.hover-tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: calc(16px * var(--size-multiplier));
		border: calc(6px * var(--size-multiplier)) solid transparent;
		border-top-color: var(--color-arcana-gold-500);
	}
</style>
