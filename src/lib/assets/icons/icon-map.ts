/**
 * Icon Spritesheet Mapping
 * Maps icon IDs to their position in the rpg-icons.png spritesheet
 *
 * Grid: 32x32 pixels per icon
 * Layout: 16 columns per row
 * Position: { row: number, col: number } (0-indexed)
 *
 * Icons are listed in the order they appear in the spritesheet
 * Based on the author's official icon list
 */

export interface IconPosition {
	row: number
	col: number
}

export type IconId = keyof typeof iconMap

/**
 * Icon Map - Complete spritesheet (311 icons mapped across 22 rows)
 */
export const iconMap = {
	// ============================================
	// ROW 0 - STATUS EFFECTS (11 icons)
	// ============================================
	'skull_and_bones': { row: 0, col: 0 },
	'poison': { row: 0, col: 1 },
	'sleeping_eye': { row: 0, col: 2 },
	'silenced': { row: 0, col: 3 },
	'cursed': { row: 0, col: 4 },
	'dizzy': { row: 0, col: 5 },
	'charmed': { row: 0, col: 6 },
	'sleeping': { row: 0, col: 7 },
	'paralysis': { row: 0, col: 8 },
	'burned': { row: 0, col: 9 },
	'sweat_drop': { row: 0, col: 10 },

	// ============================================
	// ROW 1 - BODY ICONS (5 icons)
	// ============================================
	'heart': { row: 1, col: 0 },
	'lungs': { row: 1, col: 1 },
	'stomach': { row: 1, col: 2 },
	'brain': { row: 1, col: 3 },
	'strong_arm': { row: 1, col: 4 },

	// ============================================
	// ROW 2 - BUFFS & DEBUFFS (7 icons)
	// ============================================
	'buff_arrow_1': { row: 2, col: 0 },
	'debuff_arrow_1': { row: 2, col: 1 },
	'buff_arrow_2': { row: 2, col: 2 },
	'debuff_arrow_2': { row: 2, col: 3 },
	'buff_arrow_3': { row: 2, col: 4 },
	'debuff_arrow_3': { row: 2, col: 5 },
	'repeat_arrow': { row: 2, col: 6 },

	// ============================================
	// ROW 3 - SPECIAL MOVES (16 icons)
	// ============================================
	'dripping_blade': { row: 3, col: 0 },
	'saber_slash': { row: 3, col: 1 },
	'lightning_attack': { row: 3, col: 2 },
	'headshot': { row: 3, col: 3 },
	'raining_arrows': { row: 3, col: 4 },
	'healing': { row: 3, col: 5 },
	'heal_injury': { row: 3, col: 6 },
	'battle_gear': { row: 3, col: 7 },
	'guard': { row: 3, col: 8 },
	'ring_of_fire': { row: 3, col: 9 },
	'disintegrate': { row: 3, col: 10 },
	'fist_hit': { row: 3, col: 11 },
	'gust_of_air': { row: 3, col: 12 },
	'tremor': { row: 3, col: 13 },
	'psychic_waves': { row: 3, col: 14 },
	'sunrays': { row: 3, col: 15 },

	// ============================================
	// ROW 4 - NON COMBAT ACTIONS (9 icons)
	// ============================================
	'square_speech_bubble': { row: 4, col: 0 },
	'round_speech_bubble': { row: 4, col: 1 },
	'campfire': { row: 4, col: 2 },
	'camping_tent': { row: 4, col: 3 },
	'blacksmith_forging': { row: 4, col: 4 },
	'mining': { row: 4, col: 5 },
	'woodcutting': { row: 4, col: 6 },
	'spellbook': { row: 4, col: 7 },
	'steal': { row: 4, col: 8 },

	// ============================================
	// ROW 5 - WEAPONS: Melee (16 icons)
	// ============================================
	'wooden_waster': { row: 5, col: 0 },
	'longsword': { row: 5, col: 1 },
	'enchanted_sword': { row: 5, col: 2 },
	'katana': { row: 5, col: 3 },
	'gladius': { row: 5, col: 4 },
	'saber': { row: 5, col: 5 },
	'dagger': { row: 5, col: 6 },
	'broad_dagger': { row: 5, col: 7 },
	'sai': { row: 5, col: 8 },
	'crossed_swords': { row: 5, col: 9 },
	'war_axe': { row: 5, col: 10 },
	'battle_axe': { row: 5, col: 11 },
	'flail': { row: 5, col: 12 },
	'spiked_club': { row: 5, col: 13 },
	'whip': { row: 5, col: 14 },
	'fist': { row: 5, col: 15 },

	// ============================================
	// ROW 6 - WEAPONS: Shields & Ranged (12 icons)
	// ============================================
	'buckler_shield': { row: 6, col: 0 },
	'wooden_shield': { row: 6, col: 1 },
	'checkered_shield': { row: 6, col: 2 },
	'bow_and_arrow': { row: 6, col: 3 },
	'crossbow': { row: 6, col: 4 },
	'slingshot': { row: 6, col: 5 },
	'boomerang': { row: 6, col: 6 },
	'wizard_staff': { row: 6, col: 7 },
	'magic_gem_staff_blue': { row: 6, col: 8 },
	'magic_gem_staff_red': { row: 6, col: 9 },
	'magic_gem_staff_green': { row: 6, col: 10 },
	'magic_gem_staff_yellow': { row: 6, col: 11 },

	// ============================================
	// ROW 7 - CLOTHING & ARMOUR (16 icons)
	// ============================================
	'robin_hood_hat': { row: 7, col: 0 },
	'barbute_helm': { row: 7, col: 1 },
	'leather_helm': { row: 7, col: 2 },
	'cross_helm': { row: 7, col: 3 },
	'iron_armour': { row: 7, col: 4 },
	'steel_armour': { row: 7, col: 5 },
	'leather_armour': { row: 7, col: 6 },
	'layered_plate_armour': { row: 7, col: 7 },
	'blue_tunic': { row: 7, col: 8 },
	'green_tunic': { row: 7, col: 9 },
	'trousers': { row: 7, col: 10 },
	'shorts': { row: 7, col: 11 },
	'heart_boxers': { row: 7, col: 12 },
	'dress': { row: 7, col: 13 },
	'cloak': { row: 7, col: 14 },
	'belt': { row: 7, col: 15 },

	// ============================================
	// ROW 8 - ACCESSORIES (10 icons)
	// ============================================
	'leather_gauntlet': { row: 8, col: 0 },
	'metal_gauntlet': { row: 8, col: 1 },
	'leather_boots': { row: 8, col: 2 },
	'steeltoe_boots': { row: 8, col: 3 },
	'ring': { row: 8, col: 4 },
	'diamond_ring': { row: 8, col: 5 },
	'gold_necklace': { row: 8, col: 6 },
	'prayer_beads': { row: 8, col: 7 },
	'tribal_necklace': { row: 8, col: 8 },
	'leather_pouch': { row: 8, col: 9 },

	// ============================================
	// ROW 9 - HEALING ITEMS (16 icons)
	// ============================================
	'potion_red': { row: 9, col: 0 },
	'potion_blue': { row: 9, col: 1 },
	'potion_green': { row: 9, col: 2 },
	'potion_yellow': { row: 9, col: 3 },
	'potion_red_plus1': { row: 9, col: 4 },
	'potion_blue_plus1': { row: 9, col: 5 },
	'potion_green_plus1': { row: 9, col: 6 },
	'potion_yellow_plus1': { row: 9, col: 7 },
	'potion_red_plus2': { row: 9, col: 8 },
	'potion_blue_plus2': { row: 9, col: 9 },
	'potion_green_plus2': { row: 9, col: 10 },
	'potion_yellow_plus2': { row: 9, col: 11 },
	'special_brew_potion_red': { row: 9, col: 12 },
	'special_brew_potion_orange': { row: 9, col: 13 },
	'special_brew_potion_pink': { row: 9, col: 14 },
	'bandage': { row: 9, col: 15 },

	// ============================================
	// ROW 10 - GENERAL ITEMS (16 icons)
	// ============================================
	'knapsack': { row: 10, col: 0 },
	'axe': { row: 10, col: 1 },
	'pickaxe': { row: 10, col: 2 },
	'shovel': { row: 10, col: 3 },
	'hammer': { row: 10, col: 4 },
	'grappling_hook': { row: 10, col: 5 },
	'hookshot': { row: 10, col: 6 },
	'telescope': { row: 10, col: 7 },
	'magnifying_glass': { row: 10, col: 8 },
	'lantern': { row: 10, col: 9 },
	'torch': { row: 10, col: 10 },
	'candle': { row: 10, col: 11 },
	'bomb': { row: 10, col: 12 },
	'rope': { row: 10, col: 13 },
	'bear_trap': { row: 10, col: 14 },
	'hourglass': { row: 10, col: 15 },

	// ============================================
	// ROW 11 - GENERAL ITEMS: Music & Keys (16 icons)
	// ============================================
	'runestone': { row: 11, col: 0 },
	'mirror': { row: 11, col: 1 },
	'shackles': { row: 11, col: 2 },
	'lyre': { row: 11, col: 3 },
	'violin': { row: 11, col: 4 },
	'ocarina': { row: 11, col: 5 },
	'flute': { row: 11, col: 6 },
	'panpipes': { row: 11, col: 7 },
	'hunting_war_horn': { row: 11, col: 8 },
	'brass_key': { row: 11, col: 9 },
	'silver_keyring': { row: 11, col: 10 },
	'treasure_chest': { row: 11, col: 11 },
	'mortar_and_pestle': { row: 11, col: 12 },
	'herb_1': { row: 11, col: 13 },
	'herb_2': { row: 11, col: 14 },
	'herb_3': { row: 11, col: 15 },

	// ============================================
	// ROW 12 - RESOURCES & CURRENCY (16 icons)
	// ============================================
	'mushrooms': { row: 12, col: 0 },
	'flower_bulb': { row: 12, col: 1 },
	'root_tip': { row: 12, col: 2 },
	'plant_pot_seedling': { row: 12, col: 3 },
	'plant_pot_growing': { row: 12, col: 4 },
	'plant_pot_fully_grown': { row: 12, col: 5 },
	'money_purse': { row: 12, col: 6 },
	'crown_coin': { row: 12, col: 7 },
	'bronze_coin_stack': { row: 12, col: 8 },
	'silver_coin_stack': { row: 12, col: 9 },
	'gold_coin_stack': { row: 12, col: 10 },
	'large_gold_coin_stack': { row: 12, col: 11 },
	'receive_money': { row: 12, col: 12 },
	'pay_money': { row: 12, col: 13 },
	'gems': { row: 12, col: 14 },
	'rupee': { row: 12, col: 15 },

	// ============================================
	// ROW 13 - BOOKS & DOCUMENTS (16 icons)
	// ============================================
	'book_blue': { row: 13, col: 0 },
	'book_red': { row: 13, col: 1 },
	'book_green': { row: 13, col: 2 },
	'book_yellow': { row: 13, col: 3 },
	'book_brown': { row: 13, col: 4 },
	'book_leather': { row: 13, col: 5 },
	'book_rare': { row: 13, col: 6 },
	'book_epic': { row: 13, col: 7 },
	'open_book': { row: 13, col: 8 },
	'letter': { row: 13, col: 9 },
	'tied_scroll': { row: 13, col: 10 },
	'open_scroll': { row: 13, col: 11 },
	'old_map': { row: 13, col: 12 },
	'dice': { row: 13, col: 13 },
	'card': { row: 13, col: 14 },
	'bottle_of_wine': { row: 13, col: 15 },

	// ============================================
	// ROW 14 - FOOD: Fruits & Vegetables (16 icons)
	// ============================================
	'apple': { row: 14, col: 0 },
	'banana': { row: 14, col: 1 },
	'pear': { row: 14, col: 2 },
	'lemon': { row: 14, col: 3 },
	'strawberry': { row: 14, col: 4 },
	'grapes': { row: 14, col: 5 },
	'carrot': { row: 14, col: 6 },
	'sweetcorn': { row: 14, col: 7 },
	'garlic': { row: 14, col: 8 },
	'tomato': { row: 14, col: 9 },
	'eggplant': { row: 14, col: 10 },
	'red_chili': { row: 14, col: 11 },
	'mushroom': { row: 14, col: 12 },
	'loaf_of_bread': { row: 14, col: 13 },
	'baguette': { row: 14, col: 14 },
	'whole_chicken': { row: 14, col: 15 },

	// ============================================
	// ROW 15 - FOOD: Meat & Provisions (16 icons)
	// ============================================
	'chicken_leg': { row: 15, col: 0 },
	'sirloin_steak': { row: 15, col: 1 },
	'ham': { row: 15, col: 2 },
	'morsel': { row: 15, col: 3 },
	'cooked_fish': { row: 15, col: 4 },
	'eggs': { row: 15, col: 5 },
	'big_egg': { row: 15, col: 6 },
	'cheese': { row: 15, col: 7 },
	'milk': { row: 15, col: 8 },
	'honey': { row: 15, col: 9 },
	'salt': { row: 15, col: 10 },
	'spices': { row: 15, col: 11 },
	'candy': { row: 15, col: 12 },
	'cake': { row: 15, col: 13 },
	'drink': { row: 15, col: 14 },

	// ============================================
	// ROW 16 - FISHING ITEMS (15 icons)
	// ============================================
	'fishing_rod': { row: 16, col: 0 },
	'fishing_hook': { row: 16, col: 1 },
	'worm_bait': { row: 16, col: 2 },
	'lake_trout': { row: 16, col: 3 },
	'brown_trout': { row: 16, col: 4 },
	'eel': { row: 16, col: 5 },
	'tropical_fish': { row: 16, col: 6 },
	'clownfish': { row: 16, col: 7 },
	'jellyfish': { row: 16, col: 8 },
	'octopus': { row: 16, col: 9 },
	'turtle': { row: 16, col: 10 },
	'fish_bone': { row: 16, col: 11 },
	'old_boot': { row: 16, col: 12 },
	'fossil': { row: 16, col: 13 },
	'sunken_chest': { row: 16, col: 14 },

	// ============================================
	// ROW 17 - RESOURCES (11 icons)
	// ============================================
	'wood': { row: 17, col: 0 },
	'stone': { row: 17, col: 1 },
	'ore': { row: 17, col: 2 },
	'gold': { row: 17, col: 3 },
	'gems_resource': { row: 17, col: 4 },
	'cotton': { row: 17, col: 5 },
	'yarn': { row: 17, col: 6 },
	'cloth': { row: 17, col: 7 },
	'pelts': { row: 17, col: 8 },
	'monster_claw': { row: 17, col: 9 },
	'feathers': { row: 17, col: 10 },

	// ============================================
	// ROW 18 - ORBS (6 icons)
	// ============================================
	'orb_red': { row: 18, col: 0 },
	'orb_blue': { row: 18, col: 1 },
	'orb_green': { row: 18, col: 2 },
	'orb_yellow': { row: 18, col: 3 },
	'orb_purple': { row: 18, col: 4 },
	'orb_black': { row: 18, col: 5 },

	// ============================================
	// ROW 19 - FLASKS & CAULDRONS (12 icons)
	// ============================================
	'empty_flask_1': { row: 19, col: 0 },
	'empty_flask_2': { row: 19, col: 1 },
	'empty_flask_3': { row: 19, col: 2 },
	'empty_flask_4': { row: 19, col: 3 },
	'red_liquid_flask': { row: 19, col: 4 },
	'blue_liquid_flask': { row: 19, col: 5 },
	'green_liquid_flask': { row: 19, col: 6 },
	'yellow_liquid_flask': { row: 19, col: 7 },
	'cauldron_on_fire': { row: 19, col: 8 },
	'cauldron': { row: 19, col: 9 },
	'horse': { row: 19, col: 10 },
	'wooden_beam': { row: 19, col: 11 },

	// ============================================
	// ROW 20 - POWDERS (12 icons)
	// ============================================
	'wicker_basket': { row: 20, col: 0 },
	'brown_powder': { row: 20, col: 1 },
	'black_powder': { row: 20, col: 2 },
	'light_brown_powder': { row: 20, col: 3 },
	'orange_powder': { row: 20, col: 4 },
	'red_powder': { row: 20, col: 5 },
	'blue_powder': { row: 20, col: 6 },
	'green_powder': { row: 20, col: 7 },
	'yellow_powder': { row: 20, col: 8 },
	'dark_green_powder': { row: 20, col: 9 },
	'off_white_powder': { row: 20, col: 10 },
	'grey_powder': { row: 20, col: 11 },

	// ============================================
	// ROW 21 - MAGIC & WEATHER (14 icons)
	// ============================================
	'hand_casting_magic': { row: 21, col: 0 },
	'magic_scroll_green': { row: 21, col: 1 },
	'magic_scroll_red': { row: 21, col: 2 },
	'magic_scroll_orange': { row: 21, col: 3 },
	'magic_scroll_blue': { row: 21, col: 4 },
	'magic_scroll_purple': { row: 21, col: 5 },
	'magic_scroll_brown': { row: 21, col: 6 },
	'sunrise': { row: 21, col: 7 },
	'sun': { row: 21, col: 8 },
	'sunset': { row: 21, col: 9 },
	'moon': { row: 21, col: 10 },
	'snowflake': { row: 21, col: 11 },
	'hot_temperature': { row: 21, col: 12 },
	'cold_temperature': { row: 21, col: 13 },
} as const

/**
 * Get icon position by ID
 */
export function getIconPosition(iconId: IconId): IconPosition {
	return iconMap[iconId]
}

/**
 * Check if icon ID exists in the map
 */
export function isValidIconId(iconId: string): iconId is IconId {
	return iconId in iconMap
}

/**
 * Get all available icon IDs
 */
export function getAllIconIds(): IconId[] {
	return Object.keys(iconMap) as IconId[]
}
