<script lang="ts">
	import { locale, loadLocaleAsync, setLocale, type Locales } from '$lib/i18n'
	import { PersistenceService } from '$lib/persistence'
	import type { GameSettings } from '$lib/persistence/types'

	interface Props {
		variant?: 'default' | 'minimal'
		class?: string
	}

	let { variant = 'default', class: className = '' }: Props = $props()

	const persistence = new PersistenceService()

	// Language options with labels and flags
	const languageOptions = [
		{ code: 'en' as Locales, label: 'English', flag: '🇺🇸' },
		{ code: 'pt-BR' as Locales, label: 'Português', flag: '🇧🇷' },
	]

	async function changeLanguage(newLocale: Locales) {
		try {
			// Load translations first
			await loadLocaleAsync(newLocale)
			console.log('Translations loaded for:', newLocale)

			// Then update the active locale (this triggers UI updates)
			await setLocale(newLocale)
			console.log('Locale set to:', newLocale)

			// Save to persistence
			const settingsResult = await persistence.getSettings()
			if (settingsResult.success) {
				const settings: GameSettings = {
					...settingsResult.data,
					locale: newLocale,
				}
				await persistence.saveSettings(settings)
				console.log('Settings saved with locale:', newLocale)
			}
		} catch (error) {
			console.error('Error changing language:', error)
		}
	}
</script>

<div class="language-switcher {className}" class:minimal={variant === 'minimal'}>
	{#each languageOptions as lang}
		<button
			class="lang-button"
			class:active={$locale === lang.code}
			onclick={() => changeLanguage(lang.code)}
			title={lang.label}
			type="button"
		>
			{#if variant === 'minimal'}
				<span class="flag">{lang.flag}</span>
			{:else}
				<span class="flag">{lang.flag}</span>
				<span class="label">{lang.label}</span>
			{/if}
		</button>
	{/each}
</div>

<style>
	.language-switcher {
		display: flex;
		gap: 8px;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		padding: 6px;
		border-radius: 8px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
	}

	.language-switcher.minimal {
		background: transparent;
		border: none;
		padding: 4px;
	}

	.lang-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 6px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 13px;
		font-weight: 500;
		font-family: var(--font-sans);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.minimal .lang-button {
		padding: 4px 8px;
		background: rgba(0, 0, 0, 0.4);
	}

	.lang-button:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.3);
		color: white;
		transform: translateY(-1px);
	}

	.lang-button.active {
		background: linear-gradient(135deg, var(--color-arcana-gold-600), var(--color-arcana-gold-500));
		border-color: var(--color-arcana-gold-400);
		color: white;
		box-shadow: 0 0 12px rgba(251, 191, 36, 0.4);
	}

	.lang-button.active:hover {
		transform: translateY(-1px);
	}

	.flag {
		font-size: 18px;
		line-height: 1;
	}

	.label {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.3px;
	}

	.minimal .label {
		display: none;
	}

	@media (max-width: 768px) {
		.language-switcher:not(.minimal) .label {
			display: none;
		}
	}
</style>
