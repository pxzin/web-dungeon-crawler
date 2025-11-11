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
		class="arcana-input {hasError ? 'arcana-input-error' : ''}"
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
