<script lang="ts">
	import { toastStore } from '$lib/stores/toast.svelte'
	import Toast from './Toast.svelte'

	let toasts = $derived(toastStore.toasts)
</script>

<div class="toast-container">
	{#each toasts as toast (toast.id)}
		<Toast
			message={toast.message}
			type={toast.type}
			icon={toast.icon}
			duration={0}
			onClose={() => toastStore.remove(toast.id)}
		/>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: var(--spacing-xl);
		right: var(--spacing-xl);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		pointer-events: none;
	}

	.toast-container :global(.toast) {
		pointer-events: auto;
	}

	@media (max-width: 768px) {
		.toast-container {
			top: var(--spacing-md);
			right: var(--spacing-md);
			left: var(--spacing-md);
		}

		.toast-container :global(.toast) {
			min-width: unset;
			width: 100%;
		}
	}
</style>
