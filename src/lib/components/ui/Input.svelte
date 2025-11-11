<script lang="ts">
	interface Props {
		type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
		value?: string | number
		placeholder?: string
		disabled?: boolean
		required?: boolean
		min?: number
		max?: number
		minlength?: number
		maxlength?: number
		pattern?: string
		autocomplete?: HTMLInputElement['autocomplete']
		name?: string
		id?: string
		class?: string
		label?: string
		error?: string
		hint?: string
		variant?: 'default' | 'hero'
		oninput?: (e: Event) => void
		onchange?: (e: Event) => void
		onfocus?: (e: FocusEvent) => void
		onblur?: (e: FocusEvent) => void
	}

	let {
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		required = false,
		min,
		max,
		minlength,
		maxlength,
		pattern,
		autocomplete,
		name,
		id,
		class: className = '',
		label,
		error,
		hint,
		variant = 'default',
		oninput,
		onchange,
		onfocus,
		onblur,
	}: Props = $props()

	const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`
	const hasError = $derived(!!error)
</script>

<div class="arcana-input-wrapper {className}">
	{#if label}
		<label for={inputId} class="arcana-input-label">
			{label}
			{#if required}
				<span class="text-arcana-orange-500">*</span>
			{/if}
		</label>
	{/if}

	<input
		{id}
		{type}
		{name}
		{placeholder}
		{disabled}
		{required}
		{min}
		{max}
		{minlength}
		{maxlength}
		{pattern}
		{autocomplete}
		bind:value
		class="arcana-input {variant === 'hero' ? 'arcana-input-hero' : ''} {hasError ? 'arcana-input-error' : ''}"
		{oninput}
		{onchange}
		{onfocus}
		{onblur}
	/>

	{#if error}
		<p class="arcana-input-error-message">{error}</p>
	{:else if hint}
		<p class="arcana-input-hint">{hint}</p>
	{/if}
</div>

<style>
	.arcana-input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.arcana-input-label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-arcana-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Hero variant - Enhanced styling for important inputs (like character name) */
	.arcana-input-hero {
		text-align: center;
		font-size: var(--text-xl) !important;
		font-family: var(--font-serif) !important;
		font-weight: 600 !important;
		padding: var(--spacing-lg) var(--spacing-xl) !important;
		border: 3px solid var(--color-arcana-gold-700) !important;
		background: var(--color-arcana-bg-primary) !important;
		box-shadow:
			inset 0 2px 8px rgba(0, 0, 0, 0.3),
			0 0 0 1px rgba(201, 152, 74, 0.2),
			var(--shadow-lg) !important;
		transition: all var(--transition-base) !important;
	}

	.arcana-input-hero:focus {
		border-color: var(--color-arcana-gold-500) !important;
		box-shadow:
			inset 0 2px 8px rgba(0, 0, 0, 0.3),
			0 0 0 3px rgba(201, 152, 74, 0.3),
			0 0 20px rgba(201, 152, 74, 0.4),
			var(--shadow-xl) !important;
		transform: translateY(-2px);
	}

	.arcana-input-hero::placeholder {
		color: var(--color-arcana-text-muted) !important;
		opacity: 0.6;
	}

	.arcana-input-error {
		border-color: var(--color-arcana-orange-600) !important;
		box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.1) !important;
	}

	.arcana-input-error-message {
		font-size: var(--text-sm);
		color: var(--color-arcana-orange-500);
		margin-top: calc(var(--spacing-xs) * -1);
	}

	.arcana-input-hint {
		font-size: var(--text-sm);
		color: var(--color-arcana-text-muted);
		margin-top: calc(var(--spacing-xs) * -1);
	}

	input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
