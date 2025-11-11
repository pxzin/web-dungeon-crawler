import type { BaseTranslation } from '../i18n-types'

const en = {
	"game": {
		"title": "Dungeon Crawler",
		"characterCreation": {
			"title": "Create Your Character",
			"characterName": "Character Name",
			"namePlaceholder": "Enter your hero's name",
			"selectClass": "Select Your Class",
			"distributePoints": "Distribute Attribute Points",
			"pointsAvailable": "Points Available",
			"pointsRemaining": "{points} points remaining",
			"createCharacter": "Create Character",
			"startAdventure": "Start Adventure",
			"appearancePlaceholder": "Appearance customization coming soon!",
			"classes": {
				"warrior": "Warrior",
				"mage": "Mage",
				"rogue": "Rogue",
				"cleric": "Cleric"
			},
			"classDescriptions": {
				"warrior": "A strong melee fighter with high health and defense",
				"mage": "A powerful spellcaster with devastating magic attacks",
				"rogue": "An agile fighter with high critical hit rate",
				"cleric": "A holy warrior with healing and support abilities"
			},
			"validation": {
				"nameRequired": "Character name is required",
				"nameTooShort": "Name must be at least 3 characters",
				"nameTooLong": "Name must be less than 20 characters",
				"classRequired": "Please select a class",
				"mustSpendAllPoints": "You must spend all attribute points"
			}
		},
		"townSquare": {
			"title": "Town Square",
			"welcome": "Welcome, {name}!",
			"gold": "Gold",
			"returnToTown": "Return to Town Square",
			"areas": {
				"dungeons": {
					"title": "Dungeons",
					"description": "Explore dangerous dungeons filled with monsters and treasures"
				},
				"blacksmith": {
					"title": "Blacksmith",
					"description": "Upgrade and repair your equipment"
				},
				"tavern": {
					"title": "Tavern",
					"description": "Rest, gather information, and accept quests"
				},
				"market": {
					"title": "Market",
					"description": "Buy and sell items and equipment"
				},
				"arena": {
					"title": "Arena",
					"description": "Test your skills against other warriors"
				},
				"character": {
					"title": "Character",
					"description": "View and manage your character"
				}
			},
			"comingSoon": "Coming Soon"
		},
		"dungeons": {
			"title": "Dungeons",
			"subtitle": "Choose your next adventure",
			"level": "Level",
			"floors": "Floors",
			"enterDungeon": "Enter Dungeon",
			"returnToTown": "Return to Town Square"
		},
		"arena": {
			"title": "Arena",
			"description": "The arena is being prepared for combat. Soon you'll be able to test your skills against worthy opponents!",
			"returnToTown": "Return to Town Square"
		},
		"tavern": {
			"title": "Tavern",
			"description": "The tavern is being renovated. Soon you'll be able to rest, gather information, and accept quests!",
			"returnToTown": "Return to Town Square"
		},
		"market": {
			"title": "Market",
			"description": "The market is setting up shop. Soon you'll be able to buy and sell items!",
			"returnToTown": "Return to Town Square"
		},
		"blacksmith": {
			"title": "Blacksmith",
			"description": "The blacksmith is forging new equipment. Soon you'll be able to upgrade and repair your gear!",
			"returnToTown": "Return to Town Square"
		},
		"dungeon": {
			"floor": "Floor",
			"dungeonMap": "Dungeon Map",
			"rooms": "rooms",
			"entrance": "Entrance",
			"exit": "Exit",
			"chest": "Chest",
			"enemy": "Enemy",
			"exploreDungeon": "Explore Dungeon",
			"exploreDescription": "Navigate through rooms and corridors",
			"explore": "Explore",
			"nextFloor": "Next Floor",
			"descendToFloor": "Descend to floor {floor}",
			"proceed": "Proceed",
			"bossFloor": "Boss Floor",
			"faceTheBoss": "Face the dungeon boss",
			"faceBoss": "Face Boss (Coming Soon)",
			"leaveDungeon": "Leave Dungeon",
			"returnToTownSquare": "Return to town square",
			"exitDungeon": "Exit",
			"congratulations": "Congratulations! You have completed the dungeon!",
			"allRoomsExplored": "All rooms explored! Proceed to next floor or exit.",
			"roomEmpty": "The room is empty. You found nothing of interest.",
			"errorLoadingPlayer": "Error: Could not load player data"
		},
		"combat": {
			"title": "Combat",
			"yourTurn": "Your Turn",
			"enemyTurn": "Enemy Turn",
			"target": "Target",
			"selectEnemy": "Select an enemy to attack",
			"combatLog": "Combat Log",
			"actions": {
				"attack": "Attack",
				"defend": "Defend",
				"skills": "Skills (Soon)",
				"flee": "Flee"
			},
			"messages": {
				"fledBattle": "You fled from battle!",
				"failedToEscape": "Failed to escape! The enemy blocks your path!",
				"victory": "Victory! +{exp} XP, +{gold} Gold",
				"defeat": "Defeat... You have been defeated.",
				"levelUp": "Level Up! Now level {level}!"
			},
			"log": {
				"combatStarted": "Combat started!",
				"attackMissed": "{attacker}'s attack missed!",
				"attackHit": "{attacker} attacked {target} for {damage} damage!",
				"attackCritical": "{attacker} attacked {target} for {damage} damage (Critical!)!",
				"defend": "{actor} takes a defensive stance! Defense increased by {amount}!",
				"fled": "{actor} fled from battle!",
				"couldntEscape": "{actor} couldn't escape!",
				"buffsWornOff": "{actor}'s buffs/debuffs have worn off.",
				"skillNotImplemented": "{actor} tried to use a skill, but skill system is not implemented yet!",
				"itemNotImplemented": "{actor} tried to use an item, but item system is not implemented yet!"
			}
		},
		"ui": {
			"health": "Health",
			"mana": "Mana",
			"stamina": "Stamina",
			"level": "Level",
			"experience": "Experience",
			"inventory": "Inventory",
			"equipment": "Equipment",
			"skills": "Skills",
			"stats": "Stats",
			"settings": "Settings",
			"newGame": "New Game",
			"continue": "Continue",
			"load": "Load Game",
			"save": "Save Game",
			"quit": "Quit",
			"loading": "Loading...",
			"pause": "Pause",
			"resume": "Resume"
		},
		"items": {
			"weapon": "Weapon",
			"armor": "Armor",
			"potion": "Potion",
			"consumable": "Consumable",
			"key": "Key",
			"quest": "Quest Item",
			"use": "Use",
			"equip": "Equip",
			"unequip": "Unequip",
			"drop": "Drop",
			"sell": "Sell",
			"buy": "Buy"
		},
		"stats": {
			"strength": "Strength",
			"dexterity": "Dexterity",
			"intelligence": "Intelligence",
			"vitality": "Vitality",
			"luck": "Luck",
			"attack": "Attack",
			"defense": "Defense",
			"magicAttack": "Magic Attack",
			"magicDefense": "Magic Defense",
			"speed": "Speed",
			"criticalRate": "Critical Rate",
			"evasion": "Evasion"
		},
		"messages": {
			"welcome": "Welcome to the Dungeon!",
			"gameOver": "Game Over",
			"gameSaved": "Game saved successfully",
			"gameLoaded": "Game loaded successfully",
			"itemObtained": "Obtained {item}",
			"itemUsed": "Used {item}",
			"cannotUseHere": "Cannot use that here",
			"notEnoughGold": "Not enough gold",
			"inventoryFull": "Inventory is full",
			"confirmQuit": "Are you sure you want to quit?",
			"yes": "Yes",
			"no": "No"
		}
	}
} satisfies BaseTranslation

export default en
