<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'hero'
		size?: 'sm' | 'md' | 'lg'
		disabled?: boolean
		fullWidth?: boolean
		type?: 'button' | 'submit' | 'reset'
		onclick?: (e: MouseEvent) => void
		class?: string
		children?: Snippet
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		fullWidth = false,
		type = 'button',
		onclick,
		class: className = '',
		children,
	}: Props = $props()

	const variantClasses = {
		primary: 'arcana-btn-primary',
		secondary: 'arcana-btn-secondary',
		danger: 'arcana-btn-danger',
		outline: 'arcana-btn-outline',
		ghost: 'arcana-btn-ghost',
		hero: 'arcana-btn-hero',
	}

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg',
	}

	const baseClasses = 'arcana-btn'
	const widthClass = fullWidth ? 'w-full' : ''
	const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

	const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`
</script>

<button {type} class={combinedClasses} {onclick} {disabled}>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	button {
		position: relative;
		font-family: var(--font-sans);
		font-weight: 600;
		text-align: center;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	button:disabled {
		pointer-events: none;
	}

	/* Shine effect on hover for buttons */
	button:not(:disabled):hover::before {
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
		animation: shine 0.6s;
	}

	@keyframes shine {
		to {
			left: 100%;
		}
	}

	/* Hero variant - Enhanced styling for primary CTAs */
	:global(.arcana-btn-hero) {
		min-width: 320px;
		font-size: var(--text-xl) !important;
		font-weight: 700 !important;
		padding: var(--spacing-lg) var(--spacing-2xl) !important;
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

	:global(.arcana-btn-hero::before) {
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

	:global(.arcana-btn-hero:not(:disabled):hover) {
		transform: translateY(-3px) !important;
		border-color: var(--color-arcana-gold-600) !important;
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.5),
			0 12px 24px rgba(0, 0, 0, 0.5),
			0 0 40px rgba(201, 152, 74, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
	}

	:global(.arcana-btn-hero:not(:disabled):hover::before) {
		left: 100%;
	}

	:global(.arcana-btn-hero:not(:disabled):active) {
		transform: translateY(-1px) !important;
	}

	:global(.arcana-btn-hero:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
		border-color: var(--color-arcana-border-default) !important;
		background: var(--color-arcana-bg-secondary) !important;
		box-shadow: var(--shadow-md) !important;
	}

	@media (max-width: 768px) {
		:global(.arcana-btn-hero) {
			min-width: 100%;
		}
	}
</style>
