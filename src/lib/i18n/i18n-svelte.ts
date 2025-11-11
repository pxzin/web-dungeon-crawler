import type { Readable } from 'svelte/store'
import { derived, writable } from 'svelte/store'
import type { Locales, TranslationFunctions } from './i18n-types'
import { baseLocale, isLocale, loadLocale } from './i18n-util'
import { initFormatters } from './formatters'
import enTranslations from './locales/en.json'
import ptBRTranslations from './locales/pt-BR.json'

const translationsStore = writable<Record<Locales, any>>({
	en: enTranslations,
	'pt-BR': ptBRTranslations,
})

export const locale = writable<Locales>(baseLocale)

export const locales = derived(translationsStore, ($translations) => Object.keys($translations) as Locales[])

const createTranslationFunctions = (
	translations: any,
	_locale: Locales
): TranslationFunctions => {
	// formatters will be used in the future for date/number formatting
	// @ts-expect-error - formatters will be used later
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const _formatters = initFormatters

	const t = (key: string, params?: Record<string, any>): string => {
		const keys = key.split('.')
		let value = translations

		for (const k of keys) {
			value = value?.[k]
		}

		if (!value) return key

		if (params && typeof value === 'string') {
			return Object.entries(params).reduce(
				(acc, [key, val]) => acc.replace(`{${key}}`, String(val)),
				value
			)
		}

		return value
	}

	const createNestedProxy = (path: string[] = []): any => {
		return new Proxy(() => {}, {
			get: (_target, prop: string) => {
				return createNestedProxy([...path, prop])
			},
			apply: (_target, _thisArg, args) => {
				const key = path.join('.')
				return t(key, args[0])
			},
		})
	}

	return createNestedProxy() as TranslationFunctions
}

export const LL: Readable<TranslationFunctions> = derived(
	[locale, translationsStore],
	([$locale, $translations]) => {
		return createTranslationFunctions($translations[$locale], $locale)
	}
)

export const setLocale = async (newLocale: Locales): Promise<void> => {
	if (!isLocale(newLocale)) {
		console.error(`Invalid locale: ${newLocale}`)
		return
	}

	locale.set(newLocale)
}

export const loadLocaleAsync = async (newLocale: Locales): Promise<void> => {
	if (!isLocale(newLocale)) {
		console.error(`Invalid locale: ${newLocale}`)
		return
	}

	try {
		await loadLocale(newLocale)
		locale.set(newLocale)
	} catch (error) {
		console.error(`Failed to load locale ${newLocale}:`, error)
	}
}
