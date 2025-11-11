<script lang="ts">
	import { getIconPosition, isValidIconId, type IconId } from '$lib/assets/icons/icon-map'
	import spritesheetUrl from '$lib/assets/icons/rpg-icons.png'

	interface Props {
		iconId: IconId | string
		size?: number
		class?: string
		alt?: string
	}

	let { iconId, size = 32, class: className = '', alt = '' }: Props = $props()

	// Validate icon ID and get position
	const position = $derived(() => {
		if (!isValidIconId(iconId)) {
			console.warn(`SpriteIcon: Invalid icon ID "${iconId}"`)
			return { row: 0, col: 0 }
		}
		return getIconPosition(iconId)
	})

	// Calculate scale factor if size is different from 32px
	const scale = $derived(size / 32)

	// Calculate background position based on icon grid position (scaled)
	const backgroundPosition = $derived(() => {
		const pos = position()
		const x = -pos.col * size
		const y = -pos.row * size
		return `${x}px ${y}px`
	})

	// Calculate background size (scale entire spritesheet)
	const backgroundSize = $derived(() => {
		// Spritesheet is assumed to be a grid, we need to scale the entire sheet
		// This calculation assumes a 16-column layout (common for 512px wide spritesheet)
		const sheetWidth = 512 // Adjust based on actual spritesheet width
		return `${sheetWidth * scale}px auto`
	})
</script>

<span
	class="sprite-icon {className}"
	style:width="{size}px"
	style:height="{size}px"
	style:background-image="url({spritesheetUrl})"
	style:background-position={backgroundPosition()}
	style:background-size={backgroundSize()}
	role="img"
	aria-label={alt || iconId}
	title={alt || iconId}
></span>

<style>
	.sprite-icon {
		display: inline-block;
		background-repeat: no-repeat;
		image-rendering: pixelated; /* Maintains crisp pixel art */
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
		flex-shrink: 0;
		vertical-align: middle;
	}
</style>
