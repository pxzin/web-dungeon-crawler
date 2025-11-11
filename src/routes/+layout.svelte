<script lang="ts">
	import '../app.css'
	import 'virtual:uno.css'
	import { dev } from '$app/environment'
	import { ToastContainer } from '$lib/components/ui'

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
</script>

<slot />

<ToastContainer />

{#if isDevMode && DebugPanel}
	<svelte:component this={DebugPanel} />
{/if}
