<script lang="ts" generics="T">
	import { Icon } from '$lib/components/ui'

	interface Props {
		items: T[]
		itemsPerPage?: number
		class?: string
		children: (item: T, index: number) => any
	}

	let { items, itemsPerPage = 5, class: className = '', children }: Props = $props()

	// Pagination state
	let currentPage = $state(0)
	let totalPages = $derived(Math.ceil(items.length / itemsPerPage))
	let currentItems = $derived(() => {
		const start = currentPage * itemsPerPage
		const end = start + itemsPerPage
		return items.slice(start, end)
	})

	// Navigation functions
	function nextPage() {
		if (currentPage < totalPages - 1) {
			currentPage++
		}
	}

	function previousPage() {
		if (currentPage > 0) {
			currentPage--
		}
	}

	function goToPage(page: number) {
		if (page >= 0 && page < totalPages) {
			currentPage = page
		}
	}

	// Computed states
	let canGoNext = $derived(currentPage < totalPages - 1)
	let canGoPrev = $derived(currentPage > 0)
</script>

<div class="carousel {className}">
	<!-- Items Container -->
	<div class="carousel-items">
		{#each currentItems() as item, index}
			{@render children(item, currentPage * itemsPerPage + index)}
		{/each}
	</div>

	<!-- Navigation Controls -->
	{#if totalPages > 1}
		<div class="carousel-controls">
			<!-- Previous Button -->
			<button
				type="button"
				class="carousel-btn carousel-btn-prev"
				disabled={!canGoPrev}
				onclick={previousPage}
				aria-label="Previous page"
			>
				<Icon icon="lucide-chevron-left" size="md" />
			</button>

			<!-- Page Indicators -->
			<div class="carousel-indicators">
				{#each Array(totalPages) as _, pageIndex}
					<button
						type="button"
						class="indicator {currentPage === pageIndex ? 'indicator-active' : ''}"
						onclick={() => goToPage(pageIndex)}
						aria-label="Go to page {pageIndex + 1}"
					></button>
				{/each}
			</div>

			<!-- Next Button -->
			<button
				type="button"
				class="carousel-btn carousel-btn-next"
				disabled={!canGoNext}
				onclick={nextPage}
				aria-label="Next page"
			>
				<Icon icon="lucide-chevron-right" size="md" />
			</button>
		</div>

		<!-- Page Counter -->
		<div class="carousel-counter">
			<span class="counter-current">{currentPage + 1}</span>
			<span class="counter-separator">/</span>
			<span class="counter-total">{totalPages}</span>
		</div>
	{/if}
</div>

<style>
	.carousel {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.carousel-items {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: var(--spacing-md);
		padding: var(--spacing-md);
	}

	.carousel-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-md);
	}

	.carousel-btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-arcana-bg-elevated);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-lg);
		color: var(--color-arcana-text-primary);
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: var(--shadow-sm);
	}

	.carousel-btn:hover:not(:disabled) {
		background: var(--color-arcana-gold-600);
		border-color: var(--color-arcana-gold-500);
		transform: scale(1.05);
		box-shadow: var(--shadow-md), var(--glow-gold);
	}

	.carousel-btn:active:not(:disabled) {
		transform: scale(0.95);
	}

	.carousel-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
		border-color: var(--color-arcana-border-muted);
	}

	.carousel-indicators {
		display: flex;
		gap: var(--spacing-sm);
		align-items: center;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid var(--color-arcana-border-default);
		background: transparent;
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 0;
	}

	.indicator:hover {
		border-color: var(--color-arcana-gold-500);
		transform: scale(1.2);
	}

	.indicator-active {
		background: var(--color-arcana-gold-500);
		border-color: var(--color-arcana-gold-500);
		box-shadow: var(--glow-gold);
	}

	.carousel-counter {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-xs);
		font-family: var(--font-serif);
		font-size: var(--text-lg);
		color: var(--color-arcana-text-secondary);
	}

	.counter-current {
		color: var(--color-arcana-gold-400);
		font-weight: 700;
		font-size: var(--text-xl);
	}

	.counter-separator {
		color: var(--color-arcana-text-muted);
	}

	.counter-total {
		color: var(--color-arcana-text-secondary);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.carousel-items {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
			gap: var(--spacing-sm);
		}

		.carousel-btn {
			width: 40px;
			height: 40px;
		}

		.carousel-controls {
			gap: var(--spacing-md);
		}
	}
</style>
