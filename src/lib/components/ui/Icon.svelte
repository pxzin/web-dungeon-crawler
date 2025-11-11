<script lang="ts">
	/**
	 * Icon component using UnoCSS preset-icons with Iconify
	 * Supports fantasy-themed icon collections:
	 * - game-icons: RPG and fantasy icons
	 * - mdi: Material Design Icons (general purpose)
	 * - lucide: Modern icon set
	 */

	interface Props {
		icon: string
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
		color?: string
		class?: string
	}

	let {
		icon,
		size = 'md',
		color,
		class: className = '',
	}: Props = $props()

	const sizeClasses = {
		xs: 'text-base',    // 16px
		sm: 'text-lg',      // 18px
		md: 'text-xl',      // 20px
		lg: 'text-2xl',     // 24px
		xl: 'text-3xl',     // 30px
		'2xl': 'text-4xl',  // 36px
	}

	const colorClass = color ? `text-${color}` : ''
	const iconClass = `i-${icon}`
	const combinedClasses = `${iconClass} ${sizeClasses[size]} ${colorClass} ${className}`
</script>

<i class={combinedClasses} aria-hidden="true"></i>

<style>
	i {
		display: inline-block;
		vertical-align: middle;
		flex-shrink: 0;
	}
</style>
