<script lang="ts">
	/**
	 * Reusable Tooltip Component with automatic position detection
	 * Provides a consistent tooltip pattern across the application
	 */

	interface Props {
		/**
		 * Preferred position of the tooltip relative to parent
		 * Will auto-adjust if tooltip would be cut off
		 */
		position?: 'top' | 'bottom' | 'left' | 'right'
		/**
		 * Show arrow pointing to parent element
		 */
		showArrow?: boolean
		/**
		 * Custom class for styling
		 */
		class?: string
		/**
		 * Size multiplier for responsive sizing
		 */
		sizeMultiplier?: number
	}

	let {
		position = 'right',
		showArrow = true,
		class: className = '',
		sizeMultiplier = 1,
	}: Props = $props()

	let actualPosition = $state(position)

	// Position classes mapping
	const positionClasses = {
		top: 'tooltip-top',
		bottom: 'tooltip-bottom',
		left: 'tooltip-left',
		right: 'tooltip-right',
	}
</script>

<div
	class="tooltip {positionClasses[actualPosition]} {className}"
	class:has-arrow={showArrow}
	class:arrow-top={showArrow && actualPosition === 'top'}
	class:arrow-bottom={showArrow && actualPosition === 'bottom'}
	class:arrow-left={showArrow && actualPosition === 'left'}
	class:arrow-right={showArrow && actualPosition === 'right'}
	style="--size-multiplier: {sizeMultiplier};"
>
	<slot />
</div>

<style>
	.tooltip {
		position: absolute;
		background: rgba(0, 0, 0, 0.95);
		border: 2px solid var(--color-arcana-gold-500);
		border-radius: calc(12px * var(--size-multiplier));
		padding: calc(12px * var(--size-multiplier));
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
		z-index: 10000;
		animation: fadeIn 0.2s ease;
		pointer-events: none;
		min-width: 220px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Position variations */
	.tooltip-top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip-left {
		top: 0;
		right: calc(100% + 12px);
	}

	.tooltip-right {
		top: 0;
		left: calc(100% + 12px);
	}

	/* Arrow variations */
	.tooltip.has-arrow.arrow-top::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: calc(6px * var(--size-multiplier)) solid transparent;
		border-top-color: var(--color-arcana-gold-500);
	}

	.tooltip.has-arrow.arrow-bottom::after {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: calc(6px * var(--size-multiplier)) solid transparent;
		border-bottom-color: var(--color-arcana-gold-500);
	}

	.tooltip.has-arrow.arrow-left::before {
		content: '';
		position: absolute;
		top: calc(20px * var(--size-multiplier));
		left: 100%;
		border: calc(8px * var(--size-multiplier)) solid transparent;
		border-left-color: var(--color-arcana-gold-500);
	}

	.tooltip.has-arrow.arrow-left::after {
		content: '';
		position: absolute;
		top: calc(22px * var(--size-multiplier));
		left: 100%;
		border: calc(6px * var(--size-multiplier)) solid transparent;
		border-left-color: rgba(0, 0, 0, 0.95);
	}

	.tooltip.has-arrow.arrow-right::before {
		content: '';
		position: absolute;
		top: calc(20px * var(--size-multiplier));
		right: 100%;
		border: calc(8px * var(--size-multiplier)) solid transparent;
		border-right-color: var(--color-arcana-gold-500);
	}

	.tooltip.has-arrow.arrow-right::after {
		content: '';
		position: absolute;
		top: calc(22px * var(--size-multiplier));
		right: 100%;
		border: calc(6px * var(--size-multiplier)) solid transparent;
		border-right-color: rgba(0, 0, 0, 0.95);
	}
</style>
