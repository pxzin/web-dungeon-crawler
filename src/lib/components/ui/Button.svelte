<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
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

	/* Shine effect on hover for primary buttons */
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
</style>
