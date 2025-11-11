<script lang="ts">
	import '../app.css'
	import 'virtual:uno.css'
	import { dev } from '$app/environment'
	import { ToastContainer } from '$lib/components/ui'
	import { initI18n } from '$lib/i18n'

	// Only import DebugPanel in development mode
	let DebugPanel: any = null

	// Check if dev mode is enabled via environment variable
	const isDevMode = dev && import.meta.env.VITE_DEV_MODE === 'true'

	// Dynamically import DebugPanel only in dev mode
	if (isDevMode) {
		import('$lib/components/debug/DebugPanel.svelte').then((module) => {
			DebugPanel = module.default
		})
	}

	// Initialize i18n system before app loads - this ensures translations are ready
	let i18nReady = initI18n()
</script>

{#await i18nReady}
	<!-- Show nothing while i18n loads (should be very fast) -->
	<div class="loading-screen" />
{:then}
	<slot />

	<ToastContainer />

	{#if isDevMode && DebugPanel}
		<svelte:component this={DebugPanel} />
	{/if}
{/await}

<style>
	.loading-screen {
		width: 100vw;
		height: 100vh;
		background: var(--color-background);
	}
</style>
