/**
 * I18n Initialization Service
 * Handles loading saved locale from persistence and initializing the i18n system
 */

import { setLocale } from './i18n-svelte'
import { loadLocaleAsync } from './i18n-util.async'
import { PersistenceService } from '$lib/persistence'
import type { Locales } from './i18n-types'
import { baseLocale } from './i18n-util'

let initialized = false

/**
 * Initialize i18n system by loading saved locale from persistence
 * This should be called once on app startup
 */
export async function initI18n(): Promise<void> {
	if (initialized) {
		return
	}

	const persistence = new PersistenceService()

	try {
		// Load settings from persistence
		const settingsResult = await persistence.getSettings()

		let targetLocale: Locales = baseLocale

		if (settingsResult.success && settingsResult.data.locale) {
			targetLocale = settingsResult.data.locale as Locales
		}

		// Load translations BEFORE setting locale
		await loadLocaleAsync(targetLocale)

		// Now set the locale (this will trigger UI updates)
		await setLocale(targetLocale)
	} catch (error) {
		console.error('Failed to initialize i18n:', error)
		// Fallback to base locale on error
		await loadLocaleAsync(baseLocale)
		await setLocale(baseLocale)
	}

	initialized = true
}

/**
 * Reset initialization state (useful for testing)
 */
export function resetI18nInit(): void {
	initialized = false
}
