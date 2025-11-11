# i18n System

Type-safe internationalization system using `typesafe-i18n`.

## Available Languages

- 🇺🇸 English (`en`) - Default
- 🇧🇷 Português Brasileiro (`pt-BR`)

## Usage in Svelte Components

```svelte
<script>
	import { LL, locale, setLocale } from '$lib/i18n'
</script>

<!-- Simple text -->
<h1>{$LL.game.title()}</h1>

<!-- With parameters -->
<p>{$LL.game.combat.gainedExperience({ exp: 100 })}</p>
<p>{$LL.game.combat.youDealt({ damage: 50 })}</p>

<!-- UI elements -->
<button>{$LL.game.ui.newGame()}</button>
<button>{$LL.game.ui.continue()}</button>
```

## Switching Languages

```svelte
<script>
	import { setLocale, locale } from '$lib/i18n'
</script>

<!-- Language selector -->
<select bind:value={$locale} on:change={(e) => setLocale(e.target.value)}>
	<option value="en">English</option>
	<option value="pt-BR">Português</option>
</select>

<!-- Or with buttons -->
<button onclick={() => setLocale('en')}>English</button>
<button onclick={() => setLocale('pt-BR')}>Português</button>
```

## Adding New Translations

1. Edit `src/lib/i18n/locales/en.json`
2. The types in `i18n-types.ts` will need to be updated to match
3. Use the new translations in your components

## Adding New Languages

1. Add the locale code to `.typesafe-i18n.json` in the `locales` array
2. Create a new file `src/lib/i18n/locales/{locale}.json` (e.g., `pt-BR.json`)
3. Copy the structure from `en.json` and translate
4. Update `i18n-util.ts` to include the new locale

## Type Safety

All translations are fully type-safe. Your IDE will provide autocomplete and catch typos at compile time.

Example:
```typescript
// ✅ Valid
$LL.game.ui.health()

// ❌ TypeScript error - property doesn't exist
$LL.game.ui.invalidKey()

// ✅ Valid with parameters
$LL.game.combat.gainedExperience({ exp: 100 })

// ❌ TypeScript error - missing required parameter
$LL.game.combat.gainedExperience()
```
