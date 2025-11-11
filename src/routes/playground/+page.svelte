<script lang="ts">
	import { Button, Card, Input, Modal, Icon, SpriteIcon, Portrait, Carousel } from '$lib/components/ui'
	import { goto } from '$app/navigation'
	import { getAllIconIds, type IconId } from '$lib/assets/icons/icon-map'

	// Component states
	let inputValue = $state('')
	let inputWithError = $state('')
	let inputError = $state('This field is required')
	let isModalOpen = $state(false)
	let selectedPortrait = $state('portrait_001')

	// Sample data
	const buttonVariants: Array<'hero' | 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'> = [
		'hero',
		'primary',
		'secondary',
		'danger',
		'outline',
		'ghost',
	]
	const buttonSizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg']
	const cardVariants: Array<'default' | 'elevated' | 'gold'> = ['default', 'elevated', 'gold']
	const iconSizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'> = [
		'xs',
		'sm',
		'md',
		'lg',
		'xl',
		'2xl',
	]

	// SpriteIcon examples
	const spriteIconSizes = [24, 32, 48, 64]
	const sampleSpriteIcons: IconId[] = [
		'longsword',
		'wooden_shield',
		'heart',
		'healing',
		'campfire',
		'wizard_staff',
		'poison',
		'crossed_swords',
	]
	const allSpriteIcons = getAllIconIds()

	// Portrait examples
	const availablePortraits = Array.from({ length: 100 }, (_, i) => {
		const num = String(i + 1).padStart(3, '0')
		return `portrait_${num}`
	})

	const portraitSizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large']
</script>

<div class="playground">
	<div class="playground-header">
		<div class="container">
			<h1 class="arcana-heading-lg">🎨 Component Playground</h1>
			<p class="arcana-text-muted subtitle">Arcana Design System Components</p>
			<div class="header-actions">
				<Button variant="outline" onclick={() => goto('/game/town-square')}>
					← Back to Game
				</Button>
			</div>
		</div>
	</div>

	<div class="playground-content">
		<div class="container">
			<!-- Button Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Button Component</h2>
				<p class="arcana-text-muted">Flexible button component with multiple variants and sizes</p>

				<div class="demo-section">
					<h3 class="demo-title">Variants</h3>
					<div class="button-grid">
						{#each buttonVariants as variant}
							<Button {variant} onclick={() => alert(`${variant} clicked!`)}>
								{variant.charAt(0).toUpperCase() + variant.slice(1)}
							</Button>
						{/each}
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Sizes</h3>
					<div class="button-grid">
						{#each buttonSizes as size}
							<Button variant="primary" {size}>Size: {size}</Button>
						{/each}
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">States</h3>
					<div class="button-grid">
						<Button variant="primary">Normal</Button>
						<Button variant="primary" disabled>Disabled</Button>
						<Button variant="primary" fullWidth>Full Width</Button>
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<Button variant="primary" size="md" onclick={() => alert('Clicked!')}>
  Click Me
</Button>`}</code></pre>
				</div>
			</section>

			<!-- Card Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Card Component</h2>
				<p class="arcana-text-muted">Container component for panels and content sections</p>

				<div class="demo-section">
					<h3 class="demo-title">Variants</h3>
					<div class="card-grid">
						{#each cardVariants as variant}
							<Card {variant}>
								{#snippet header()}
									<h4 class="arcana-heading-sm">{variant} Card</h4>
								{/snippet}

								<p class="arcana-text">
									This is a {variant} card with some content inside. Cards are perfect for organizing
									information.
								</p>

								{#snippet footer()}
									<Button variant="outline" size="sm">Action</Button>
								{/snippet}
							</Card>
						{/each}
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<Card variant="elevated">
  {#snippet header()}
    <h4>Card Title</h4>
  {/snippet}

  <p>Card content</p>

  {#snippet footer()}
    <Button>Action</Button>
  {/snippet}
</Card>`}</code></pre>
				</div>
			</section>

			<!-- Input Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Input Component</h2>
				<p class="arcana-text-muted">Text input with label, error, and hint support</p>

				<div class="demo-section">
					<h3 class="demo-title">Input States</h3>
					<div class="input-grid">
						<Input
							bind:value={inputValue}
							label="Character Name"
							placeholder="Enter your name"
							hint="3-20 characters"
						/>

						<Input
							bind:value={inputWithError}
							label="Email (with error)"
							placeholder="email@example.com"
							error={inputError}
						/>

						<Input
							type="password"
							label="Password"
							placeholder="Enter password"
							required
							disabled
						/>
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Default Style</h3>
					<p class="arcana-text-muted mb-4">All inputs now use the hero/arcana dark fantasy style</p>
					<div class="max-w-md mx-auto">
						<Input
							placeholder="Enter your hero name"
						/>
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<Input
  bind:value={name}
  label="Character Name"
  placeholder="Enter name"
  required
  hint="3-20 characters"
/>`}</code></pre>
				</div>
			</section>

			<!-- Modal Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Modal Component</h2>
				<p class="arcana-text-muted">Dialog component with backdrop and animations</p>

				<div class="demo-section">
					<h3 class="demo-title">Modal Example</h3>
					<Button variant="primary" onclick={() => (isModalOpen = true)}>Open Modal</Button>

					<Modal bind:isOpen={isModalOpen} title="Example Modal" size="md">
						<p class="arcana-text">
							This is a modal dialog with a backdrop and animations. You can close it by clicking
							the X button, clicking outside, or pressing Escape.
						</p>

						<p class="arcana-text mt-4">
							Modals are perfect for confirmations, forms, or displaying important information.
						</p>

						{#snippet footer()}
							<Button variant="outline" onclick={() => (isModalOpen = false)}>Cancel</Button>
							<Button variant="primary" onclick={() => (isModalOpen = false)}>Confirm</Button>
						{/snippet}
					</Modal>
				</div>

				<div class="code-block">
					<pre><code>{`<Modal bind:isOpen={isOpen} title="Confirm Action">
  <p>Are you sure?</p>

  {#snippet footer()}
    <Button variant="outline" onclick={() => isOpen = false}>Cancel</Button>
    <Button variant="primary" onclick={() => isOpen = false}>Confirm</Button>
  {/snippet}
</Modal>`}</code></pre>
				</div>
			</section>

			<!-- Icon Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Icon Component</h2>
				<p class="arcana-text-muted">
					Icon component using Iconify with 4000+ fantasy RPG icons
				</p>

				<div class="demo-section">
					<h3 class="demo-title">Icon Sizes</h3>
					<div class="icon-row">
						{#each iconSizes as size}
							<div class="icon-demo">
								<Icon icon="game-icons-sword-brandish" {size} />
								<span class="icon-label">{size}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Fantasy RPG Icons</h3>
					<div class="icon-grid">
						<div class="icon-card">
							<Icon icon="game-icons-sword-brandish" size="2xl" />
							<span>Warrior</span>
						</div>
						<div class="icon-card">
							<Icon icon="game-icons-crystal-wand" size="2xl" class="text-arcana-cyan-400" />
							<span>Mage</span>
						</div>
						<div class="icon-card">
							<Icon icon="game-icons-hood" size="2xl" />
							<span>Rogue</span>
						</div>
						<div class="icon-card">
							<Icon icon="game-icons-prayer-beads" size="2xl" class="text-arcana-gold-400" />
							<span>Cleric</span>
						</div>
						<div class="icon-card">
							<Icon icon="game-icons-health-normal" size="2xl" class="text-arcana-orange-500" />
							<span>Health</span>
						</div>
						<div class="icon-card">
							<Icon icon="lucide-shield" size="2xl" class="text-arcana-cyan-500" />
							<span>Defense</span>
						</div>
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<Icon icon="game-icons-sword-brandish" size="xl" />
<Icon icon="mdi-heart" size="lg" class="text-arcana-orange-500" />`}</code></pre>
				</div>
			</section>

			<!-- SpriteIcon Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">SpriteIcon Component</h2>
				<p class="arcana-text-muted">
					Optimized icon system using local spritesheet (32×32 grid, single HTTP request)
				</p>

				<div class="demo-section">
					<h3 class="demo-title">Size Variants</h3>
					<div class="icon-row">
						{#each spriteIconSizes as size}
							<div class="icon-demo">
								<SpriteIcon iconId="sword_gold" {size} />
								<span class="icon-label">{size}px</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Sample Icons</h3>
					<div class="icon-grid">
						{#each sampleSpriteIcons as iconId}
							<div class="icon-card">
								<SpriteIcon {iconId} size={48} />
								<span class="text-xs">{iconId}</span>
							</div>
						{/each}
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">All Available Icons ({allSpriteIcons.length})</h3>
					<p class="arcana-text-muted text-sm mb-4">
						First 5 rows mapped (Hearts, Mana, Swords, Axes, Shields)
					</p>
					<div class="sprite-icons-all">
						{#each allSpriteIcons as iconId}
							<div class="sprite-icon-item" title={iconId}>
								<SpriteIcon {iconId} size={32} />
							</div>
						{/each}
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<SpriteIcon iconId="sword_gold" size={48} />
<SpriteIcon iconId="heart_red" size={32} alt="Health" />`}</code></pre>
				</div>

				<div class="info-box">
					<h4 class="arcana-text-gold font-semibold mb-2">🎮 Performance Benefits</h4>
					<ul class="arcana-text-muted text-sm space-y-1">
						<li>✅ Single HTTP request for all icons</li>
						<li>✅ CSS-based rendering (no JS overhead)</li>
						<li>✅ Type-safe icon IDs with autocomplete</li>
						<li>✅ Pixel-perfect scaling for retro aesthetics</li>
					</ul>
				</div>
			</section>

			<!-- Portrait Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Portrait Component</h2>
				<p class="arcana-text-muted">
					Character portrait display with player stats and multiple variants
				</p>

				<div class="demo-section">
					<h3 class="demo-title">Portrait Display</h3>
					<div class="portrait-variants-grid">
						<Portrait
							portraitId="portrait_010"
							playerName="Arinacheskii"
							playerClass="Warrior"
							classIcon="game-icons-sword-brandish"
							classDescription="A mighty warrior skilled in melee combat and heavy armor"
							level={15}
							experience={750}
							maxExperience={1000}
							health={2345}
							maxHealth={3000}
							mana={1200}
							maxMana={1500}
							size="medium"
							strength={{ value: 18, modifier: 5 }}
							dexterity={{ value: 12, modifier: 1 }}
							intelligence={{ value: 8, modifier: -1 }}
							vitality={{ value: 16, modifier: 3 }}
							luck={{ value: 10, modifier: 0 }}
							statusEffects={[
								{
									icon: 'guard',
									name: 'Defesa Aumentada',
									description: '+5 de armadura',
									duration: 3,
									type: 'buff'
								},
								{
									icon: 'strong_arm',
									name: 'Força',
									description: '+3 de dano de ataque',
									duration: 5,
									type: 'buff'
								},
								{
									icon: 'poison',
									name: 'Envenenado',
									description: '-2 HP por turno',
									duration: 2,
									type: 'debuff'
								},
								{
									icon: 'healing',
									name: 'Regeneração',
									description: '+3 HP por turno',
									type: 'buff'
								},
								{
									icon: 'sunrays',
									name: 'Bênção',
									description: '+10% de dano',
									duration: 10,
									type: 'buff'
								}
							]}
						/>
					</div>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Different Sizes</h3>
					<div class="portrait-sizes-grid">
						{#each portraitSizes as size}
							<div>
								<h4 class="text-sm text-arcana-text-secondary mb-4">{size}</h4>
								<Portrait
									portraitId="portrait_025"
									playerName="Shadow Thief"
									playerClass="Rogue"
									classIcon="game-icons-hood"
									classDescription="Master of stealth and precision strikes"
									level={8}
									experience={320}
									maxExperience={500}
									health={850}
									maxHealth={1200}
									mana={450}
									maxMana={600}
									{size}
									strength={{ value: 10, modifier: 0 }}
									dexterity={{ value: 18, modifier: 4 }}
									intelligence={{ value: 14, modifier: 2 }}
									vitality={{ value: 11, modifier: 0 }}
									luck={{ value: 15, modifier: 2 }}
									statusEffects={[
										{
											icon: 'steal',
											name: 'Furtividade',
											description: '+50% chance de evasão',
											duration: 4,
											type: 'buff'
										}
									]}
								/>
							</div>
						{/each}
					</div>
				</div>

				<div class="code-block">
					<pre><code>{`<Portrait
  portraitId="portrait_001"
  playerName="Hero"
  playerClass="Warrior"
  classIcon="game-icons-sword-brandish"
  level={10}
  experience={450}
  maxExperience={1000}
  health={100}
  maxHealth={150}
  mana={50}
  maxMana={80}
  size="medium"
/>`}</code></pre>
				</div>
			</section>

			<!-- Carousel Component -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Carousel Component</h2>
				<p class="arcana-text-muted">
					Paginated carousel for displaying collections with navigation
				</p>

				<div class="demo-section">
					<h3 class="demo-title">Portrait Selection Carousel</h3>
					<p class="arcana-text-muted mb-4">
						Selected: <span class="text-arcana-gold-400 font-semibold">{selectedPortrait}</span>
					</p>

					<Carousel items={availablePortraits} itemsPerPage={10}>
						{#snippet children(portraitId: string, index: number)}
							<button
								type="button"
								class="carousel-portrait {selectedPortrait === portraitId ? 'carousel-portrait-selected' : ''}"
								onclick={() => selectedPortrait = portraitId}
							>
								<img
									src="/src/lib/assets/portraits/{portraitId}.png"
									alt="Portrait {index + 1}"
									class="carousel-portrait-img"
								/>
							</button>
						{/snippet}
					</Carousel>
				</div>

				<div class="demo-section">
					<h3 class="demo-title">Icon Carousel</h3>
					<Carousel items={sampleSpriteIcons} itemsPerPage={5}>
						{#snippet children(iconId: IconId)}
							<div class="icon-card">
								<SpriteIcon {iconId} size={48} />
								<span class="text-xs">{iconId}</span>
							</div>
						{/snippet}
					</Carousel>
				</div>

				<div class="code-block">
					<pre><code>{`<Carousel items={portraits} itemsPerPage={10}>
  {#snippet children(portrait, index)}
    <img src={portrait.url} alt="Portrait {index}" />
  {/snippet}
</Carousel>`}</code></pre>
				</div>
			</section>

			<!-- Color Palette -->
			<section class="component-section">
				<h2 class="arcana-heading-md">Color Palette</h2>
				<p class="arcana-text-muted">Arcana dark fantasy theme colors</p>

				<div class="demo-section">
					<h3 class="demo-title">Primary Colors</h3>
					<div class="color-grid">
						<div class="color-card">
							<div class="color-swatch" style="background: var(--color-arcana-gold-600)"></div>
							<span>Gold 600</span>
							<code>#c9984a</code>
						</div>
						<div class="color-card">
							<div class="color-swatch" style="background: var(--color-arcana-cyan-600)"></div>
							<span>Cyan 600</span>
							<code>#2a9d8f</code>
						</div>
						<div class="color-card">
							<div class="color-swatch" style="background: var(--color-arcana-magenta-600)"></div>
							<span>Magenta 600</span>
							<code>#d946ef</code>
						</div>
						<div class="color-card">
							<div class="color-swatch" style="background: var(--color-arcana-orange-600)"></div>
							<span>Orange 600</span>
							<code>#ff6b35</code>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.playground {
		min-height: 100vh;
		background: var(--color-arcana-bg-primary);
	}

	.playground-header {
		background: var(--color-arcana-bg-elevated);
		border-bottom: 2px solid var(--color-arcana-border-gold);
		padding: var(--spacing-2xl) var(--spacing-md);
		box-shadow: var(--shadow-xl);
	}

	.playground-header .container {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.subtitle {
		font-size: var(--text-lg);
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-xl);
	}

	.header-actions {
		display: flex;
		justify-content: center;
		gap: var(--spacing-md);
	}

	.playground-content {
		padding: var(--spacing-3xl) var(--spacing-md);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.component-section {
		margin-bottom: var(--spacing-4xl);
		padding: var(--spacing-2xl);
		background: var(--color-arcana-bg-secondary);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-2xl);
		box-shadow: var(--shadow-xl);
	}

	.component-section > h2 {
		margin-bottom: var(--spacing-sm);
	}

	.component-section > p {
		margin-bottom: var(--spacing-xl);
	}

	.demo-section {
		margin-bottom: var(--spacing-2xl);
	}

	.demo-title {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-arcana-text-gold);
		margin-bottom: var(--spacing-lg);
		padding-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--color-arcana-border-default);
	}

	.button-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-md);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-lg);
	}

	.input-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-xl);
	}

	.icon-row {
		display: flex;
		align-items: flex-end;
		gap: var(--spacing-xl);
		flex-wrap: wrap;
	}

	.icon-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.icon-label {
		font-size: var(--text-xs);
		color: var(--color-arcana-text-muted);
		text-transform: uppercase;
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: var(--spacing-lg);
	}

	.icon-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background: var(--color-arcana-bg-primary);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
		transition: all var(--transition-base);
	}

	.icon-card:hover {
		border-color: var(--color-arcana-gold-600);
		box-shadow: var(--glow-gold);
	}

	.icon-card span {
		font-size: var(--text-sm);
		color: var(--color-arcana-text-secondary);
	}

	.sprite-icons-all {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
		gap: var(--spacing-md);
		max-height: 400px;
		overflow-y: auto;
		padding: var(--spacing-lg);
		background: var(--color-arcana-bg-primary);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
	}

	.sprite-icon-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-sm);
		background: var(--color-arcana-bg-elevated);
		border: 1px solid var(--color-arcana-border-default);
		border-radius: var(--radius-md);
		transition: all var(--transition-base);
		cursor: help;
	}

	.sprite-icon-item:hover {
		border-color: var(--color-arcana-gold-600);
		box-shadow: var(--glow-gold);
		transform: scale(1.1);
	}

	.info-box {
		margin-top: var(--spacing-lg);
		padding: var(--spacing-lg);
		background: var(--color-arcana-bg-elevated);
		border-left: 4px solid var(--color-arcana-cyan-500);
		border-radius: var(--radius-md);
	}

	.info-box h4 {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-arcana-cyan-400);
		margin-bottom: var(--spacing-sm);
	}

	.info-box ul {
		margin: 0;
		padding-left: var(--spacing-lg);
		color: var(--color-arcana-text-secondary);
	}

	.info-box li {
		margin-bottom: var(--spacing-xs);
	}

	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--spacing-lg);
	}

	.color-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--color-arcana-bg-primary);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
	}

	.color-swatch {
		width: 100%;
		height: 80px;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-arcana-border-default);
	}

	.color-card span {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-arcana-text-secondary);
	}

	.color-card code {
		font-size: var(--text-xs);
		color: var(--color-arcana-text-muted);
		font-family: var(--font-mono);
	}

	.code-block {
		margin-top: var(--spacing-xl);
		padding: var(--spacing-lg);
		background: var(--color-arcana-bg-primary);
		border: 1px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
		overflow-x: auto;
	}

	.code-block pre {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-arcana-gold-300);
		line-height: 1.6;
	}

	.code-block code {
		font-family: var(--font-mono);
	}

	.mt-4 {
		margin-top: var(--spacing-lg);
	}

	.mb-4 {
		margin-bottom: var(--spacing-lg);
	}

	/* Portrait Component Styles */
	.portrait-variants-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-2xl);
		justify-items: center;
	}

	.portrait-sizes-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-2xl);
		justify-content: center;
	}

	/* Carousel Portrait Styles */
	.carousel-portrait {
		position: relative;
		border: 3px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
		overflow: hidden;
		cursor: pointer;
		transition: all var(--transition-fast);
		background: var(--color-arcana-bg-primary);
		padding: 0;
		aspect-ratio: 1;
	}

	.carousel-portrait:hover {
		border-color: var(--color-arcana-gold-500);
		transform: scale(1.05);
		box-shadow: var(--shadow-md);
	}

	.carousel-portrait-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.carousel-portrait-selected {
		border-color: var(--color-arcana-gold-500);
		border-width: 4px;
		box-shadow: var(--shadow-lg), var(--glow-gold);
		transform: scale(1.05);
	}

	.carousel-portrait-selected::after {
		content: '✓';
		position: absolute;
		top: 4px;
		right: 4px;
		background: var(--color-arcana-gold-500);
		color: var(--color-arcana-bg-primary);
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: var(--text-lg);
		box-shadow: var(--shadow-md);
	}

	@media (max-width: 768px) {
		.playground-header {
			padding: var(--spacing-xl) var(--spacing-md);
		}

		.playground-content {
			padding: var(--spacing-xl) var(--spacing-sm);
		}

		.component-section {
			padding: var(--spacing-lg);
		}

		.card-grid,
		.input-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
