<script lang="ts">
	import { onMount } from 'svelte'
	import { LocalStorageAdapter, createPersistenceService } from '$lib/persistence'
	import { playerStore } from '$lib/stores/playerStore.svelte'
	import type { GameState, GameSettings } from '$lib/persistence'
	import { Portrait } from '$lib/components/ui'

	const persistence = createPersistenceService(new LocalStorageAdapter())

	// Panel state
	let isOpen = $state(false)
	let isMinimized = $state(false)
	let activeTab = $state<'player' | 'persistence' | 'character' | 'actions'>('character')

	// Data state (non-player data)
	let gameState = $state<GameState | null>(null)
	let settings = $state<GameSettings | null>(null)
	let storageSize = $state<number | null>(null)
	let rawLocalStorage = $state<Record<string, string>>({})

	// Auto-refresh interval
	let refreshInterval: number | null = null

	onMount(() => {
		persistence.init().then(() => {
			playerStore.init() // Initialize player store
			refreshData()
		})

		// Auto-refresh every 2 seconds
		refreshInterval = window.setInterval(refreshData, 2000)

		// Toggle with Ctrl+D or Cmd+D
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
				e.preventDefault()
				isOpen = !isOpen
			}
		}
		window.addEventListener('keydown', handleKeyDown)

		// Cleanup function
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			if (refreshInterval) {
				clearInterval(refreshInterval)
			}
		}
	})

	async function refreshData() {
		// Reload player data from store
		await playerStore.reload()

		const stateResult = await persistence.getGameState()
		if (stateResult.success) {
			gameState = stateResult.data
		}

		const settingsResult = await persistence.getSettings()
		if (settingsResult.success) {
			settings = settingsResult.data
		}

		const sizeResult = await persistence.getStorageSize()
		if (sizeResult.success) {
			storageSize = sizeResult.data
		}

		// Get raw localStorage
		const raw: Record<string, string> = {}
		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i)
			if (key?.startsWith('dungeon_crawler_')) {
				const value = localStorage.getItem(key)
				if (value) raw[key] = value
			}
		}
		rawLocalStorage = raw
	}

	// Quick actions using playerStore
	async function addGold() {
		await playerStore.addGold(1000)
	}

	async function restoreResources() {
		await playerStore.restoreResources()
	}

	async function clearAllData() {
		if (confirm('Are you sure you want to clear ALL game data? This cannot be undone!')) {
			await playerStore.clear()
			await refreshData()
		}
	}

	async function exportData() {
		const result = await persistence.exportData()
		if (result.success) {
			const blob = new Blob([result.data], { type: 'application/json' })
			const url = URL.createObjectURL(blob)
			const a = document.createElement('a')
			a.href = url
			a.download = `dungeon_crawler_save_${Date.now()}.json`
			a.click()
			URL.revokeObjectURL(url)
		}
	}

	function formatBytes(bytes: number | null): string {
		if (bytes === null) return 'Unknown'
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
	}
</script>

{#if isOpen}
	<div class="debug-panel" class:minimized={isMinimized}>
		<!-- Header -->
		<div class="panel-header">
			<h3>🛠️ Debug Panel</h3>
			<div class="header-actions">
				<button class="btn-icon" onclick={() => (isMinimized = !isMinimized)} title="Toggle minimize">
					{isMinimized ? '▲' : '▼'}
				</button>
				<button class="btn-icon" onclick={refreshData} title="Refresh data">
					🔄
				</button>
				<button class="btn-icon" onclick={() => (isOpen = false)} title="Close (Ctrl+D)">
					✕
				</button>
			</div>
		</div>

		{#if !isMinimized}
			<!-- Tabs -->
			<div class="tabs">
				<button
					class="tab"
					class:active={activeTab === 'character'}
					onclick={() => (activeTab = 'character')}
				>
					Character
				</button>
				<button
					class="tab"
					class:active={activeTab === 'persistence'}
					onclick={() => (activeTab = 'persistence')}
				>
					Storage
				</button>
				<button
					class="tab"
					class:active={activeTab === 'actions'}
					onclick={() => (activeTab = 'actions')}
				>
					Actions
				</button>
			</div>

			<!-- Content -->
			<div class="panel-content">
				{#if activeTab === 'character'}
					<div class="section">
						<h4>Player Portrait</h4>
						{#if playerStore.player}
							<div class="portrait-container">
								<Portrait
									character={{
										id: playerStore.player.id,
										name: playerStore.player.name,
										portraitId: playerStore.player.portraitId,
										class: 'Warrior',
										classIcon: 'game-icons-sword-brandish',
										level: playerStore.player.stats.level,
										experience: playerStore.player.stats.experience,
										experienceToNextLevel: playerStore.player.stats.experienceToNextLevel,
										health: playerStore.player.resources.health,
										maxHealth: playerStore.player.resources.maxHealth,
										mana: playerStore.player.resources.mana,
										maxMana: playerStore.player.resources.maxMana,
										strength: playerStore.player.stats.strength,
										dexterity: playerStore.player.stats.dexterity,
										intelligence: playerStore.player.stats.intelligence,
										vitality: playerStore.player.stats.vitality,
										luck: playerStore.player.stats.luck,
										statusEffects: [
											{
												id: 'defense_buff',
												icon: 'game-icons-shield',
												name: 'Defesa',
												description: '+5 armadura',
												duration: 3,
												type: 'buff'
											}
										]
									}}
									size="small"
								/>
							</div>
						{:else}
							<p class="no-data">No player data</p>
						{/if}
					</div>

					<div class="section">
						<h4>Player Info</h4>
						{#if playerStore.player}
							<div class="info-grid">
								<div class="info-row">
									<span class="label">Name:</span>
									<span class="value">{playerStore.player.name}</span>
								</div>
								<div class="info-row">
									<span class="label">Level:</span>
									<span class="value">{playerStore.player.stats.level}</span>
								</div>
								<div class="info-row">
									<span class="label">Gold:</span>
									<span class="value">{playerStore.player.gold}</span>
								</div>
								<div class="info-row">
									<span class="label">HP:</span>
									<span class="value">{playerStore.player.resources.health} / {playerStore.player.resources.maxHealth}</span>
								</div>
								<div class="info-row">
									<span class="label">Mana:</span>
									<span class="value">{playerStore.player.resources.mana} / {playerStore.player.resources.maxMana}</span>
								</div>
								<div class="info-row">
									<span class="label">Stamina:</span>
									<span class="value">{playerStore.player.resources.stamina} / {playerStore.player.resources.maxStamina}</span>
								</div>
							</div>

							<h4>Attributes</h4>
							<div class="info-grid">
								<div class="info-row">
									<span class="label">Strength:</span>
									<span class="value">{playerStore.player.stats.strength}</span>
								</div>
								<div class="info-row">
									<span class="label">Dexterity:</span>
									<span class="value">{playerStore.player.stats.dexterity}</span>
								</div>
								<div class="info-row">
									<span class="label">Intelligence:</span>
									<span class="value">{playerStore.player.stats.intelligence}</span>
								</div>
								<div class="info-row">
									<span class="label">Vitality:</span>
									<span class="value">{playerStore.player.stats.vitality}</span>
								</div>
							</div>

							<h4>Combat Stats</h4>
							<div class="info-grid">
								<div class="info-row">
									<span class="label">Attack:</span>
									<span class="value">{playerStore.player.stats.attack}</span>
								</div>
								<div class="info-row">
									<span class="label">Defense:</span>
									<span class="value">{playerStore.player.stats.defense}</span>
								</div>
								<div class="info-row">
									<span class="label">Magic Attack:</span>
									<span class="value">{playerStore.player.stats.magicAttack}</span>
								</div>
								<div class="info-row">
									<span class="label">Magic Defense:</span>
									<span class="value">{playerStore.player.stats.magicDefense}</span>
								</div>
								<div class="info-row">
									<span class="label">Speed:</span>
									<span class="value">{playerStore.player.stats.speed}</span>
								</div>
								<div class="info-row">
									<span class="label">Crit Rate:</span>
									<span class="value">{playerStore.player.stats.criticalRate}%</span>
								</div>
							</div>
						{:else}
							<p class="no-data">No player data</p>
						{/if}
					</div>

					{#if gameState}
						<div class="section">
							<h4>Game State</h4>
							<div class="info-grid">
								<div class="info-row">
									<span class="label">Location:</span>
									<span class="value">{gameState.currentLocation}</span>
								</div>
								<div class="info-row">
									<span class="label">Playtime:</span>
									<span class="value">{Math.floor(gameState.playtime / 60)}m</span>
								</div>
								<div class="info-row">
									<span class="label">Discovered:</span>
									<span class="value">{gameState.discoveredLocations.length} locations</span>
								</div>
								<div class="info-row">
									<span class="label">Quests:</span>
									<span class="value">{gameState.completedQuests.length} completed</span>
								</div>
							</div>
						</div>
					{/if}
				{:else if activeTab === 'persistence'}
					<div class="section">
						<h4>Storage Info</h4>
						<div class="info-grid">
							<div class="info-row">
								<span class="label">Total Size:</span>
								<span class="value">{formatBytes(storageSize)}</span>
							</div>
							<div class="info-row">
								<span class="label">Locale:</span>
								<span class="value">{settings?.locale || 'en'}</span>
							</div>
						</div>
					</div>

					<div class="section">
						<h4>Raw LocalStorage</h4>
						<div class="raw-storage">
							{#each Object.entries(rawLocalStorage) as [key, value]}
								<details class="storage-item">
									<summary>{key.replace('dungeon_crawler_', '')}</summary>
									<pre>{JSON.stringify(JSON.parse(value), null, 2)}</pre>
								</details>
							{/each}
						</div>
					</div>
				{:else if activeTab === 'actions'}
					<div class="section">
						<h4>Quick Actions</h4>
						<div class="actions-grid">
							<button class="action-btn" onclick={addGold}>
								💰 Add 1000 Gold
							</button>
							<button class="action-btn" onclick={restoreResources}>
								❤️ Restore HP/Mana/Stamina
							</button>
							<button class="action-btn" onclick={exportData}>
								💾 Export Save Data
							</button>
							<button class="action-btn danger" onclick={clearAllData}>
								🗑️ Clear All Data
							</button>
						</div>
					</div>

					<div class="section">
						<h4>Navigation</h4>
						<div class="actions-grid">
							<button class="action-btn" onclick={() => window.location.href = '/playground'}>
								🎨 Component Playground
							</button>
							<button class="action-btn" onclick={() => window.location.href = '/playground/icon-mapper'}>
								🗺️ Icon Sprite Mapper
							</button>
							<button class="action-btn" onclick={() => window.location.href = '/game/town-square'}>
								🏰 Back to Game
							</button>
						</div>
					</div>

					<div class="section">
						<h4>Keyboard Shortcuts</h4>
						<div class="info-grid">
							<div class="info-row">
								<span class="label">Toggle Panel:</span>
								<span class="value">Ctrl+D / Cmd+D</span>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<!-- Toggle Button (when closed) -->
	<button class="toggle-btn" onclick={() => (isOpen = true)} title="Open Debug Panel (Ctrl+D)">
		🛠️
	</button>
{/if}

<style>
	.debug-panel {
		position: fixed;
		top: 10px;
		right: 10px;
		width: 400px;
		max-height: 90vh;
		background: rgba(0, 0, 0, 0.95);
		border: 2px solid #00ff00;
		border-radius: 8px;
		color: #00ff00;
		font-family: 'Courier New', monospace;
		font-size: 12px;
		z-index: 9999;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
	}

	.debug-panel.minimized {
		height: auto;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: rgba(0, 255, 0, 0.1);
		border-bottom: 1px solid #00ff00;
		cursor: move;
	}

	.panel-header h3 {
		margin: 0;
		font-size: 14px;
		font-weight: bold;
	}

	.header-actions {
		display: flex;
		gap: 4px;
	}

	.btn-icon {
		background: none;
		border: 1px solid #00ff00;
		color: #00ff00;
		width: 24px;
		height: 24px;
		border-radius: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		transition: all 0.2s;
	}

	.btn-icon:hover {
		background: rgba(0, 255, 0, 0.2);
	}

	.tabs {
		display: flex;
		border-bottom: 1px solid #00ff00;
	}

	.tab {
		flex: 1;
		padding: 8px;
		background: none;
		border: none;
		color: #00ff00;
		cursor: pointer;
		font-family: 'Courier New', monospace;
		font-size: 11px;
		transition: background 0.2s;
		border-right: 1px solid #00ff00;
	}

	.tab:last-child {
		border-right: none;
	}

	.tab:hover {
		background: rgba(0, 255, 0, 0.1);
	}

	.tab.active {
		background: rgba(0, 255, 0, 0.2);
		font-weight: bold;
	}

	.panel-content {
		flex: 1;
		overflow-y: auto;
		padding: 12px;
	}

	.section {
		margin-bottom: 16px;
	}

	.section h4 {
		margin: 0 0 8px 0;
		font-size: 13px;
		color: #00ffff;
		border-bottom: 1px solid #00ff00;
		padding-bottom: 4px;
	}

	.info-grid {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		padding: 2px 0;
	}

	.label {
		color: #888;
	}

	.value {
		color: #00ff00;
		font-weight: bold;
	}

	.no-data {
		color: #666;
		font-style: italic;
	}

	.raw-storage {
		max-height: 300px;
		overflow-y: auto;
	}

	.storage-item {
		margin-bottom: 8px;
		border: 1px solid #00ff00;
		border-radius: 4px;
	}

	.storage-item summary {
		padding: 4px 8px;
		cursor: pointer;
		background: rgba(0, 255, 0, 0.1);
		user-select: none;
	}

	.storage-item summary:hover {
		background: rgba(0, 255, 0, 0.2);
	}

	.storage-item pre {
		margin: 0;
		padding: 8px;
		font-size: 10px;
		overflow-x: auto;
		background: rgba(0, 0, 0, 0.5);
	}

	.actions-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.action-btn {
		padding: 8px;
		background: rgba(0, 255, 0, 0.1);
		border: 1px solid #00ff00;
		color: #00ff00;
		border-radius: 4px;
		cursor: pointer;
		font-family: 'Courier New', monospace;
		font-size: 11px;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background: rgba(0, 255, 0, 0.2);
		transform: translateY(-1px);
	}

	.action-btn.danger {
		border-color: #ff0000;
		color: #ff0000;
		background: rgba(255, 0, 0, 0.1);
	}

	.action-btn.danger:hover {
		background: rgba(255, 0, 0, 0.2);
	}

	.toggle-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		background: rgba(0, 0, 0, 0.9);
		border: 2px solid #00ff00;
		border-radius: 50%;
		color: #00ff00;
		font-size: 24px;
		cursor: pointer;
		z-index: 9998;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s;
		box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
	}

	.toggle-btn:hover {
		transform: scale(1.1);
		box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
	}

	.portrait-container {
		display: flex;
		justify-content: center;
		margin: 8px 0;
	}

	/* Scrollbar styling */
	.panel-content::-webkit-scrollbar,
	.raw-storage::-webkit-scrollbar {
		width: 8px;
	}

	.panel-content::-webkit-scrollbar-track,
	.raw-storage::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.5);
	}

	.panel-content::-webkit-scrollbar-thumb,
	.raw-storage::-webkit-scrollbar-thumb {
		background: #00ff00;
		border-radius: 4px;
	}

	@media (max-width: 640px) {
		.debug-panel {
			width: calc(100% - 20px);
			max-height: 70vh;
		}

		.actions-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
