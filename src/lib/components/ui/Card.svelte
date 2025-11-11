<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		variant?: 'default' | 'elevated' | 'gold'
		size?: 'sm' | 'md' | 'lg'
		class?: string
		children?: Snippet
		header?: Snippet
		footer?: Snippet
	}

	let {
		variant = 'default',
		size = 'md',
		class: className = '',
		children,
		header,
		footer,
	}: Props = $props()

	const variantClasses = {
		default: 'arcana-card',
		elevated: 'arcana-card-elevated',
		gold: 'arcana-card-gold',
	}

	const sizeClasses = {
		sm: 'arcana-card-sm',
		md: '',
		lg: 'arcana-card-lg',
	}

	const combinedClasses = `${variantClasses[variant]} ${sizeClasses[size]} ${className}`
</script>

<div class={combinedClasses}>
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
	}
</style>
