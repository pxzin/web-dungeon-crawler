<script lang="ts">
	import { onMount } from 'svelte'

	interface Props {
		/**
		 * Target element to render the portal into
		 * Defaults to document.body
		 */
		target?: HTMLElement
	}

	let { target, children }: Props = $props()

	let portalElement: HTMLDivElement | undefined = $state()
	let targetElement: HTMLElement | undefined = $state()

	onMount(() => {
		targetElement = target || document.body
		return () => {
			// Cleanup on unmount
			if (portalElement && targetElement?.contains(portalElement)) {
				targetElement.removeChild(portalElement)
			}
		}
	})

	$effect(() => {
		if (!targetElement) return

		// Create portal container if it doesn't exist
		if (!portalElement) {
			portalElement = document.createElement('div')
			portalElement.style.position = 'absolute'
			portalElement.style.top = '0'
			portalElement.style.left = '0'
			portalElement.style.zIndex = '10000'
			portalElement.style.pointerEvents = 'none'
		}

		// Append to target if not already appended
		if (!targetElement.contains(portalElement)) {
			targetElement.appendChild(portalElement)
		}
	})
</script>

{#if portalElement}
	{@render children?.()}
{/if}
