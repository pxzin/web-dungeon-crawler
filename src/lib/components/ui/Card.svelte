<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'default' | 'elevated' | 'gold' | 'interactive'
		size?: 'sm' | 'md' | 'lg'
		class?: string
		children?: Snippet
		header?: Snippet
		footer?: Snippet
		onclick?: (event: MouseEvent) => void
	}

	let {
		variant = 'default',
		size = 'md',
		class: className = '',
		children,
		header,
		footer,
		onclick,
	}: Props = $props()

	const variantClasses = {
		default: 'arcana-card',
		elevated: 'arcana-card-elevated',
		gold: 'arcana-card-gold',
		interactive: 'arcana-card-interactive',
	}

	const sizeClasses = {
		sm: 'arcana-card-sm',
		md: '',
		lg: 'arcana-card-lg',
	}

	const combinedClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`
</script>

<div class={combinedClasses} onclick={onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : undefined}>
	{#if header}
		<div class="card-header">
			{@render header()}
		</div>
	{/if}

	<div class="card-body">
		{#if children}
			{@render children()}
		{/if}
	</div>

	{#if footer}
		<div class="card-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	/* Base card styles */
	:global(.arcana-card),
	:global(.arcana-card-elevated),
	:global(.arcana-card-gold) {
		display: flex;
		flex-direction: column;
		background: var(--color-arcana-bg-secondary);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-xl);
		padding: var(--spacing-xl);
		border: 1px solid var(--color-arcana-border-default);
		backdrop-filter: blur(8px);
	}

	/* Elevated variant - More prominent with stronger border */
	:global(.arcana-card-elevated) {
		background: var(--color-arcana-bg-elevated);
		box-shadow: var(--shadow-2xl);
		border-color: var(--color-arcana-border-glow);
	}

	/* Gold variant - Premium card with golden border */
	:global(.arcana-card-gold) {
		border: 2px solid var(--color-arcana-gold-600);
		box-shadow:
			var(--shadow-xl),
			0 0 20px rgba(201, 152, 74, 0.2);
	}

	/* Interactive variant - Clickable with hover effects */
	:global(.arcana-card-interactive) {
		cursor: pointer;
		transition: all 0.2s ease;
	}

	:global(.arcana-card-interactive:hover) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-2xl);
		border-color: var(--color-arcana-border-glow);
	}

	:global(.arcana-card-interactive:active) {
		transform: translateY(0);
	}

	/* Size variants */
	:global(.arcana-card-sm) {
		padding: var(--spacing-md);
	}

	:global(.arcana-card-lg) {
		padding: var(--spacing-2xl);
	}

	.card-header {
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid var(--color-arcana-border-default);
	}

	.card-body {
		flex: 1;
	}

	.card-footer {
		margin-top: var(--spacing-lg);
		padding-top: var(--spacing-md);
		border-top: 1px solid var(--color-arcana-border-default);
		display: flex;
		gap: var(--spacing-md);
		justify-content: flex-end;
	}
</style>
