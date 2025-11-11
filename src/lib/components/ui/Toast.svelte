<script lang="ts">
	import { Icon } from '$lib/components/ui'
	import { fly } from 'svelte/transition'

	interface Props {
		message: string
		type?: 'info' | 'success' | 'warning' | 'error'
		icon?: string
		duration?: number
		onClose?: () => void
	}

	let { message, type = 'info', icon, duration = 3000, onClose }: Props = $props()

	const typeConfig = {
		info: {
			bgClass: 'bg-arcana-cyan-600',
			borderClass: 'border-arcana-cyan-500',
			icon: 'game-icons-info',
		},
		success: {
			bgClass: 'bg-arcana-green-600',
			borderClass: 'border-arcana-green-500',
			icon: 'game-icons-check-mark',
		},
		warning: {
			bgClass: 'bg-arcana-yellow-600',
			borderClass: 'border-arcana-yellow-500',
			icon: 'game-icons-warning-sign',
		},
		error: {
			bgClass: 'bg-arcana-red-600',
			borderClass: 'border-arcana-red-500',
			icon: 'game-icons-skull-crack',
		},
	}

	const config = typeConfig[type]
	const displayIcon = icon || config.icon

	// Auto-close after duration
	if (duration > 0) {
		setTimeout(() => {
			onClose?.()
		}, duration)
	}
</script>

<div
	class="toast {config.bgClass} {config.borderClass}"
	transition:fly={{ y: -20, duration: 300 }}
	role="alert"
>
	<div class="toast-content">
		<Icon icon={displayIcon} size="md" class="text-white" />
		<span class="toast-message">{message}</span>
	</div>
	{#if onClose}
		<button class="toast-close" onclick={onClose} aria-label="Close">
			<Icon icon="game-icons-cross" size="sm" />
		</button>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-md);
		padding: var(--spacing-md) var(--spacing-lg);
		border-radius: var(--border-radius-md);
		border: 2px solid;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		min-width: 300px;
		max-width: 500px;
		backdrop-filter: blur(8px);
	}

	.toast-content {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
	}

	.toast-message {
		color: white;
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.4;
	}

	.toast-close {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: var(--border-radius-sm);
		padding: var(--spacing-xs);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s ease;
		color: white;
	}

	.toast-close:hover {
		background: rgba(255, 255, 255, 0.3);
	}
</style>
