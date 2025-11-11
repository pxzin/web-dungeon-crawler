<script lang="ts">
	import { Icon } from '$lib/components/ui'

	interface Props {
		icon: string
		iconColor?: string
		title: string
		description: string
		available?: boolean
		onclick?: () => void
		class?: string
	}

	let {
		icon,
		iconColor = 'text-arcana-gold-400',
		title,
		description,
		available = false,
		onclick,
		class: className = '',
	}: Props = $props()
</script>

<button
	type="button"
	class="area-card {available ? 'area-card-available' : 'area-card-locked'} {className}"
	{onclick}
	disabled={!available}
>
	<!-- Icon Circle -->
	<div class="area-icon">
		<Icon {icon} size="3xl" class={iconColor} />
		{#if !available}
			<div class="lock-overlay">
				<Icon icon="lucide-lock" size="lg" class="text-arcana-text-primary" />
			</div>
		{/if}
	</div>

	<!-- Title -->
	<h3 class="area-title">{title}</h3>

	<!-- Description -->
	<p class="area-description">{description}</p>

	<!-- Status Badge -->
	{#if !available}
		<div class="status-badge locked">
			<span>Coming Soon</span>
		</div>
	{/if}
</button>

<style>
	.area-card {
		position: relative;
		background: var(--color-arcana-bg-elevated);
		border: 2px solid var(--color-arcana-border-default);
		border-radius: var(--radius-2xl);
		padding: var(--spacing-2xl);
		cursor: pointer;
		transition: all var(--transition-base);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		overflow: hidden;
		width: 100%;
	}

	.area-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(201, 152, 74, 0.05), transparent);
		opacity: 0;
		transition: opacity var(--transition-base);
	}

	/* Available areas */
	.area-card-available:hover {
		transform: translateY(-8px) scale(1.02);
		border-color: var(--color-arcana-gold-600);
		box-shadow:
			var(--shadow-2xl),
			0 0 40px rgba(201, 152, 74, 0.3),
			inset 0 0 20px rgba(201, 152, 74, 0.1);
	}

	.area-card-available:hover::before {
		opacity: 1;
	}

	.area-card-available:active {
		transform: translateY(-4px) scale(1);
	}

	/* Locked areas */
	.area-card-locked {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.area-card-locked:hover {
		transform: none;
	}

	/* Icon Circle */
	.area-icon {
		position: relative;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-arcana-bg-primary);
		border-radius: var(--radius-full);
		border: 3px solid var(--color-arcana-border-gold);
		box-shadow: var(--shadow-lg), inset 0 2px 8px rgba(0, 0, 0, 0.3);
		transition: all var(--transition-base);
		overflow: hidden;
	}

	.area-icon::after {
		content: '';
		position: absolute;
		inset: -50%;
		background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		transform: translateX(-100%) rotate(45deg);
		transition: transform 0.6s;
	}

	.area-card-available:hover .area-icon {
		transform: scale(1.1) rotate(5deg);
		border-color: var(--color-arcana-gold-500);
		box-shadow:
			var(--shadow-xl),
			0 0 30px rgba(201, 152, 74, 0.5),
			inset 0 2px 12px rgba(0, 0, 0, 0.4);
	}

	.area-card-available:hover .area-icon::after {
		transform: translateX(100%) rotate(45deg);
	}

	/* Lock Overlay */
	.lock-overlay {
		position: absolute;
		inset: 0;
		background: rgba(26, 29, 46, 0.8);
		backdrop-filter: blur(2px);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
	}

	/* Title */
	.area-title {
		font-family: var(--font-serif);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-arcana-gold-300);
		margin: 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	/* Description */
	.area-description {
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-arcana-text-secondary);
		margin: 0;
	}

	/* Status Badge */
	.status-badge {
		position: absolute;
		top: var(--spacing-sm);
		right: var(--spacing-sm);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-lg);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: var(--shadow-md);
	}

	.status-badge.locked {
		background: var(--color-arcana-border-default);
		color: var(--color-arcana-text-muted);
		border: 1px solid var(--color-arcana-border-default);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.area-card {
			padding: var(--spacing-xl);
		}

		.area-icon {
			width: 80px;
			height: 80px;
		}

		.area-title {
			font-size: var(--text-xl);
		}
	}
</style>
