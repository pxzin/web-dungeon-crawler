<script lang="ts">
	import { SpriteIcon, Button, Input, Card } from '$lib/components/ui'
	import { getAllIconIds, type IconId } from '$lib/assets/icons/icon-map'

	interface IconMapping {
		iconId: IconId
		customName: string
		position: { row: number; col: number }
	}

	// Initialize icon mappings (5 rows × 16 columns = 80 icons)
	const iconMappings = $state<IconMapping[]>(
		getAllIconIds().map((iconId) => {
			// Extract row and col from iconId (e.g., "icon_2_5" -> row 2, col 5)
			const match = iconId.match(/^(?:icon_)?(\d+)_(\d+)$/)
			const row = match ? parseInt(match[1]) : 0
			const col = match ? parseInt(match[2]) : 0

			// Handle special cases (skull_crossbones, heart_organ)
			let specialRow = 0
			let specialCol = 0
			if (iconId === 'skull_crossbones') {
				specialRow = 0
				specialCol = 0
			} else if (iconId === 'heart_organ') {
				specialRow = 1
				specialCol = 0
			}

			return {
				iconId,
				customName: iconId === 'skull_crossbones' || iconId === 'heart_organ' ? iconId : '',
				position: match ? { row, col } : { row: specialRow, col: specialCol },
			}
		})
	)

	// Sort by position (row, then col)
	iconMappings.sort((a, b) => {
		if (a.position.row !== b.position.row) {
			return a.position.row - b.position.row
		}
		return a.position.col - b.position.col
	})

	function generateJSON() {
		// Filter out empty names (these represent empty spaces)
		const namedIcons = iconMappings.filter((mapping) => mapping.customName.trim() !== '')

		// Build the iconMap object
		const iconMap: Record<string, { row: number; col: number }> = {}
		namedIcons.forEach((mapping) => {
			iconMap[mapping.customName] = mapping.position
		})

		// Create the full output with proper formatting
		const output = {
			iconMap,
			metadata: {
				totalIcons: iconMappings.length,
				namedIcons: namedIcons.length,
				emptySpaces: iconMappings.length - namedIcons.length,
				gridSize: '16 columns × 5 rows',
				iconSize: '32×32 pixels',
			},
		}

		// Convert to JSON and copy to clipboard
		const jsonOutput = JSON.stringify(output, null, 2)
		navigator.clipboard.writeText(jsonOutput)
		alert(`✅ JSON copied to clipboard!\n\n${namedIcons.length} named icons, ${iconMappings.length - namedIcons.length} empty spaces.`)
	}

	function exportTypeScriptCode() {
		// Filter out empty names
		const namedIcons = iconMappings.filter((mapping) => mapping.customName.trim() !== '')

		// Build the TypeScript code
		let tsCode = `export const iconMap = {\n`
		namedIcons.forEach((mapping) => {
			tsCode += `\t'${mapping.customName}': { row: ${mapping.position.row}, col: ${mapping.position.col} },\n`
		})
		tsCode += `} as const`

		// Copy to clipboard
		navigator.clipboard.writeText(tsCode)
		alert(
			`✅ TypeScript code copied to clipboard!\n\n${namedIcons.length} named icons ready to paste into icon-map.ts`
		)
	}

	function clearAllNames() {
		if (confirm('Clear all custom names? This cannot be undone.')) {
			iconMappings.forEach((mapping) => {
				// Keep special named icons
				if (mapping.iconId !== 'skull_crossbones' && mapping.iconId !== 'heart_organ') {
					mapping.customName = ''
				}
			})
		}
	}

	function autoNumberUnnamed() {
		iconMappings.forEach((mapping) => {
			if (mapping.customName.trim() === '') {
				mapping.customName = `icon_${mapping.position.row}_${mapping.position.col}`
			}
		})
	}
</script>

<div class="icon-mapper">
	<div class="container">
		<!-- Header -->
		<div class="header">
			<h1 class="arcana-heading-lg">🎨 Icon Sprite Mapper</h1>
			<p class="arcana-text text-arcana-text-secondary">
				Name each icon in your spritesheet. Empty names will be treated as blank spaces.
			</p>
		</div>

		<!-- Actions -->
		<Card variant="elevated" class="actions-card">
			<div class="actions">
				<div class="action-group">
					<Button variant="hero" onclick={generateJSON}>
						📋 Copy JSON to Clipboard
					</Button>
					<Button variant="primary" onclick={exportTypeScriptCode}>
						💾 Export TypeScript Code
					</Button>
				</div>
				<div class="action-group">
					<Button variant="outline" onclick={autoNumberUnnamed}>
						🔢 Auto-Number Unnamed
					</Button>
					<Button variant="danger" onclick={clearAllNames}>
						🗑️ Clear All Names
					</Button>
				</div>
			</div>
			<div class="stats">
				<span class="stat">
					<strong>{iconMappings.filter((m) => m.customName.trim() !== '').length}</strong> named
				</span>
				<span class="stat">
					<strong>{iconMappings.filter((m) => m.customName.trim() === '').length}</strong> empty
				</span>
				<span class="stat">
					<strong>{iconMappings.length}</strong> total
				</span>
			</div>
		</Card>

		<!-- Icon Grid -->
		<div class="icon-grid">
			{#each iconMappings as mapping, index (mapping.iconId)}
				<Card variant="default" class="icon-card">
					<div class="icon-preview">
						<SpriteIcon iconId={mapping.iconId} size={48} />
					</div>
					<div class="icon-info">
						<span class="position-label">
							({mapping.position.row}, {mapping.position.col})
						</span>
						<Input
							bind:value={mapping.customName}
							placeholder="Empty space"
							class="icon-name-input"
						/>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</div>

<style>
	.icon-mapper {
		min-height: 100vh;
		padding: var(--spacing-2xl) var(--spacing-lg);
		background: var(--color-arcana-bg-default);
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
	}

	.header {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
	}

	.header p {
		margin-top: var(--spacing-md);
	}

	.actions-card {
		margin-bottom: var(--spacing-2xl);
		padding: var(--spacing-xl);
	}

	.actions {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-lg);
	}

	.action-group {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		justify-content: center;
	}

	.stats {
		display: flex;
		gap: var(--spacing-xl);
		justify-content: center;
		padding-top: var(--spacing-lg);
		border-top: 1px solid var(--color-arcana-border-default);
		color: var(--color-arcana-text-secondary);
		font-size: var(--text-sm);
	}

	.stat strong {
		color: var(--color-arcana-gold-400);
		font-size: var(--text-lg);
		margin-right: var(--spacing-xs);
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-lg);
	}

	.icon-card {
		padding: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		transition: all var(--transition-base);
	}

	.icon-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--glow-gold);
	}

	.icon-preview {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md);
		background: var(--color-arcana-bg-elevated);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-md);
		min-height: 80px;
	}

	.icon-info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.position-label {
		font-size: var(--text-xs);
		color: var(--color-arcana-text-muted);
		text-align: center;
		font-family: var(--font-mono);
	}

	:global(.icon-name-input) {
		text-align: center;
		font-size: var(--text-sm);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.icon-mapper {
			padding: var(--spacing-xl) var(--spacing-md);
		}

		.action-group {
			flex-direction: column;
			width: 100%;
		}

		.icon-grid {
			grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
			gap: var(--spacing-md);
		}
	}
</style>
