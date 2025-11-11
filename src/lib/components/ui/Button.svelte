<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'hero'
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
		font-family: var(--font-serif);
		font-weight: 700;
		text-align: center;
		user-select: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		min-width: 320px;
		font-size: var(--text-xl);
		overflow: hidden;
		border-radius: var(--radius-xl);
		border: 3px solid var(--color-arcana-gold-800);
		background: linear-gradient(135deg, var(--color-arcana-gold-600), var(--color-arcana-gold-700));
		color: var(--color-arcana-bg-primary);
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.3),
			0 8px 16px rgba(0, 0, 0, 0.4),
			0 0 30px rgba(201, 152, 74, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: all var(--transition-base);
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
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transition: left 0.5s;
	}

	button:not(:disabled):hover {
		transform: translateY(-3px);
		border-color: var(--color-arcana-gold-600);
		box-shadow:
			0 0 0 1px rgba(201, 152, 74, 0.5),
			0 12px 24px rgba(0, 0, 0, 0.5),
			0 0 40px rgba(201, 152, 74, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
	}

	button:not(:disabled):hover::before {
		left: 100%;
	}

	button:not(:disabled):active {
		transform: translateY(-1px);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
		border-color: var(--color-arcana-border-default);
		background: var(--color-arcana-bg-secondary);
		box-shadow: var(--shadow-md);
	}

	@media (max-width: 768px) {
		button {
			min-width: 100%;
		}
	}
</style>
