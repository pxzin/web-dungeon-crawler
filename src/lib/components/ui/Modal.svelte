<script lang="ts">
	import type { Snippet } from 'svelte'
	import { onMount } from 'svelte'

	interface Props {
		isOpen?: boolean
		onClose?: () => void
		title?: string
		size?: 'sm' | 'md' | 'lg' | 'xl'
		closeOnBackdrop?: boolean
		closeOnEscape?: boolean
		showCloseButton?: boolean
		class?: string
		children?: Snippet
		header?: Snippet
		footer?: Snippet
	}

	let {
		isOpen = $bindable(false),
		onClose,
		title,
		size = 'md',
		closeOnBackdrop = true,
		closeOnEscape = true,
		showCloseButton = true,
		class: className = '',
		children,
		header,
		footer,
	}: Props = $props()

	const sizeClasses = {
		sm: 'max-w-md',
		md: 'max-w-2xl',
		lg: 'max-w-4xl',
		xl: 'max-w-6xl',
	}

	function handleClose() {
		isOpen = false
		onClose?.()
	}

	function handleBackdropClick() {
		if (closeOnBackdrop) {
			handleClose()
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (closeOnEscape && e.key === 'Escape' && isOpen) {
			handleClose()
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown)
		return () => {
			window.removeEventListener('keydown', handleKeydown)
		}
	})

	// Prevent body scroll when modal is open
	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
	})
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="arcana-modal-backdrop" onclick={handleBackdropClick} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="arcana-modal {sizeClasses[size]} {className}"
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			{#if header || title || showCloseButton}
				<div class="arcana-modal-header">
					<div class="arcana-modal-title-wrapper">
						{#if header}
							{@render header()}
						{:else if title}
							<h3 class="arcana-modal-title">{title}</h3>
						{/if}
					</div>
					{#if showCloseButton}
						<button class="arcana-modal-close" onclick={handleClose} aria-label="Close modal">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						</button>
					{/if}
				</div>
			{/if}

			<div class="arcana-modal-body">
				{#if children}
					{@render children()}
				{/if}
			</div>

			{#if footer}
				<div class="arcana-modal-footer">
					{@render footer()}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.arcana-modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: var(--color-arcana-bg-overlay);
		backdrop-filter: blur(8px);
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-lg);
		animation: fadeIn 0.2s ease-out;
	}

	.arcana-modal {
		background-color: var(--color-arcana-bg-elevated);
		border: 2px solid var(--color-arcana-border-gold);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-2xl), var(--glow-gold);
		width: 100%;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.3s ease-out;
	}

	.arcana-modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-lg);
		border-bottom: 1px solid var(--color-arcana-border-default);
	}

	.arcana-modal-title-wrapper {
		flex: 1;
	}

	.arcana-modal-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		margin: 0;
	}

	.arcana-modal-close {
		background: none;
		border: none;
		color: var(--color-arcana-text-muted);
		cursor: pointer;
		padding: var(--spacing-sm);
		border-radius: var(--radius-md);
		transition: all var(--transition-fast);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.arcana-modal-close:hover {
		background-color: var(--color-arcana-bg-primary);
		color: var(--color-arcana-text-primary);
	}

	.arcana-modal-body {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-lg);
	}

	.arcana-modal-footer {
		padding: var(--spacing-lg);
		border-top: 1px solid var(--color-arcana-border-default);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--spacing-md);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
