<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'hero' | 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
		size?: 'sm' | 'md' | 'lg'
		disabled?: boolean
		fullWidth?: boolean
		type?: 'button' | 'submit' | 'reset'
		onclick?: (e: MouseEvent) => void
		class?: string
		children?: Snippet
	}

	let {
		variant = 'hero',
		size = 'md',
		disabled = false,
		fullWidth = false,
		type = 'button',
		onclick,
		class: className = '',
		children,
	}: Props = $props()

	const variantClasses = {
		hero: 'variant-hero',
		primary: 'variant-primary',
		secondary: 'variant-secondary',
		danger: 'variant-danger',
		outline: 'variant-outline',
		ghost: 'variant-ghost',
	}

	const sizeClasses = {
		sm: 'btn-size-sm',
		md: 'btn-size-md',
		lg: 'btn-size-lg',
	}

	const widthClass = fullWidth ? 'full-width' : ''

	const combinedClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`
</script>

<button {type} class={combinedClasses} {onclick} {disabled}>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	/* Base button styles - Dark fantasy aesthetic */
	button {
		position: relative;
		font-family: var(--font-serif);
		font-weight: 600;
		text-align: center;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		overflow: hidden;
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
		cursor: pointer;
	}

	button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			90deg,
			transparent,
			rgba(255, 255, 255, 0.2),
			transparent
		);
		transition: left 0.5s;
	}

	button:not(:disabled):hover::before {
		left: 100%;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Hero variant - Epic golden button for main CTAs */
	.variant-hero {
		min-width: 200px;
		font-size: var(--text-base);
		font-weight: 700;
		padding: var(--spacing-md) var(--spacing-xl);
		border: 3px solid var(--color-arcana-gold-800);
		background: linear-gradient(135deg, var(--color-arcana-gold-600), var(--color-arcana-gold-700));
		color: var(--color-arcana-bg-primary);
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.3),
			0 8px 16px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(201, 152, 74, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	.variant-hero:not(:disabled):hover {
		transform: translateY(-3px);
		border-color: var(--color-arcana-gold-600);
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.5),
			0 12px 24px rgba(0, 0, 0, 0.5),
			0 0 40px rgba(201, 152, 74, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	.variant-hero:not(:disabled):active {
		transform: translateY(-1px);
	}

	/* Primary variant - Golden accent button */
	.variant-primary {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid var(--color-arcana-gold-700);
		background: var(--color-arcana-gold-600);
		color: var(--color-arcana-bg-primary);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.variant-primary:not(:disabled):hover {
		transform: translateY(-2px);
		border-color: var(--color-arcana-gold-600);
		background: var(--color-arcana-gold-500);
		box-shadow:
			0 6px 12px rgba(0, 0, 0, 0.4),
			0 0 20px rgba(201, 152, 74, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	/* Secondary variant - Cyan/magical button */
	.variant-secondary {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid var(--color-arcana-cyan-700);
		background: var(--color-arcana-cyan-600);
		color: var(--color-arcana-text-white);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.3),
			0 0 15px rgba(42, 157, 143, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.variant-secondary:not(:disabled):hover {
		transform: translateY(-2px);
		border-color: var(--color-arcana-cyan-600);
		background: var(--color-arcana-cyan-500);
		box-shadow:
			0 6px 12px rgba(0, 0, 0, 0.4),
			0 0 25px rgba(42, 157, 143, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	/* Danger variant - Fire/warning button */
	.variant-danger {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid var(--color-arcana-orange-700);
		background: linear-gradient(135deg, var(--color-arcana-orange-600), var(--color-arcana-orange-700));
		color: var(--color-arcana-text-white);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.3),
			0 0 15px rgba(255, 107, 53, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.variant-danger:not(:disabled):hover {
		transform: translateY(-2px);
		border-color: var(--color-arcana-orange-600);
		background: linear-gradient(135deg, var(--color-arcana-orange-500), var(--color-arcana-orange-600));
		box-shadow:
			0 6px 12px rgba(0, 0, 0, 0.4),
			0 0 25px rgba(255, 107, 53, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
	}

	/* Outline variant - Bordered ghostly button */
	.variant-outline {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid var(--color-arcana-gold-600);
		background: transparent;
		color: var(--color-arcana-gold-300);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.variant-outline:not(:disabled):hover {
		border-color: var(--color-arcana-gold-500);
		background: rgba(201, 152, 74, 0.1);
		color: var(--color-arcana-gold-200);
		box-shadow:
			0 4px 8px rgba(0, 0, 0, 0.3),
			0 0 15px rgba(201, 152, 74, 0.2);
	}

	/* Ghost variant - Subtle text-only button */
	.variant-ghost {
		padding: var(--spacing-sm) var(--spacing-lg);
		border: 2px solid transparent;
		background: transparent;
		color: var(--color-arcana-text-secondary);
		box-shadow: none;
	}

	.variant-ghost:not(:disabled):hover {
		border-color: var(--color-arcana-border-default);
		background: var(--color-arcana-bg-elevated);
		color: var(--color-arcana-text-gold);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	/* Size modifiers */
	.btn-size-sm {
		padding: var(--spacing-sm) var(--spacing-md) !important;
		font-size: var(--text-sm) !important;
	}

	/* btn-size-md uses default padding from variants */

	.btn-size-lg {
		padding: var(--spacing-md) var(--spacing-xl) !important;
		font-size: var(--text-lg) !important;
	}

	/* Full width modifier */
	.full-width {
		width: 100%;
	}

	@media (max-width: 768px) {
		.variant-hero {
			min-width: 100%;
		}
	}
</style>
