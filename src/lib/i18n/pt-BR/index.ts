import type { Translation } from '../i18n-types'

const ptBR = {
	"game": {
		"title": "Explorador de Masmorras",
		"characterCreation": {
			"title": "Crie Seu Personagem",
			"characterName": "Nome do Personagem",
			"namePlaceholder": "Digite o nome do seu herói",
			"selectClass": "Selecione Sua Classe",
			"distributePoints": "Distribua os Pontos de Atributo",
			"pointsAvailable": "Pontos Disponíveis",
			"pointsRemaining": "{points} pontos restantes",
			"createCharacter": "Criar Personagem",
			"startAdventure": "Iniciar Aventura",
			"appearancePlaceholder": "Customização de aparência em breve!",
			"classes": {
				"warrior": "Guerreiro",
				"mage": "Mago",
				"rogue": "Ladino",
				"cleric": "Clérigo"
			},
			"classDescriptions": {
				"warrior": "Um lutador corpo-a-corpo forte com alta vida e defesa",
				"mage": "Um poderoso conjurador com ataques mágicos devastadores",
				"rogue": "Um lutador ágil com alta taxa de acerto crítico",
				"cleric": "Um guerreiro sagrado com habilidades de cura e suporte"
			},
			"validation": {
				"nameRequired": "Nome do personagem é obrigatório",
				"nameTooShort": "Nome deve ter pelo menos 3 caracteres",
				"nameTooLong": "Nome deve ter menos de 20 caracteres",
				"classRequired": "Por favor, selecione uma classe",
				"mustSpendAllPoints": "Você deve gastar todos os pontos de atributo"
			}
		},
		"townSquare": {
			"title": "Praça da Cidade",
			"welcome": "Bem-vindo, {name}!",
			"gold": "Ouro",
			"returnToTown": "Voltar à Praça da Cidade",
			"areas": {
				"dungeons": {
					"title": "Masmorras",
					"description": "Explore masmorras perigosas cheias de monstros e tesouros"
				},
				"blacksmith": {
					"title": "Ferreiro",
					"description": "Melhore e repare seus equipamentos"
				},
				"tavern": {
					"title": "Taverna",
					"description": "Descanse, colete informações e aceite missões"
				},
				"market": {
					"title": "Mercado",
					"description": "Compre e venda itens e equipamentos"
				},
				"arena": {
					"title": "Arena",
					"description": "Teste suas habilidades contra outros guerreiros"
				},
				"character": {
					"title": "Personagem",
					"description": "Visualize e gerencie seu personagem"
				}
			},
			"comingSoon": "Em Breve"
		},
		"dungeons": {
			"title": "Masmorras",
			"subtitle": "Escolha sua próxima aventura",
			"level": "Nível",
			"floors": "Andares",
			"enterDungeon": "Entrar na Masmorra",
			"returnToTown": "Voltar à Praça da Cidade"
		},
		"arena": {
			"title": "Arena",
			"description": "A arena está sendo preparada para combate. Em breve você poderá testar suas habilidades contra oponentes dignos!",
			"returnToTown": "Voltar à Praça da Cidade"
		},
		"tavern": {
			"title": "Taverna",
			"description": "A taverna está sendo renovada. Em breve você poderá descansar, coletar informações e aceitar missões!",
			"returnToTown": "Voltar à Praça da Cidade"
		},
		"market": {
			"title": "Mercado",
			"description": "O mercado está montando a loja. Em breve você poderá comprar e vender itens!",
			"returnToTown": "Voltar à Praça da Cidade"
		},
		"blacksmith": {
			"title": "Ferreiro",
			"description": "O ferreiro está forjando novos equipamentos. Em breve você poderá melhorar e reparar seus itens!",
			"returnToTown": "Voltar à Praça da Cidade"
		},
		"dungeon": {
			"floor": "Andar",
			"dungeonMap": "Mapa da Masmorra",
			"rooms": "salas",
			"entrance": "Entrada",
			"exit": "Saída",
			"chest": "Baú",
			"enemy": "Inimigo",
			"exploreDungeon": "Explorar Masmorra",
			"exploreDescription": "Navegue por salas e corredores",
			"explore": "Explorar",
			"nextFloor": "Próximo Andar",
			"descendToFloor": "Descer para o andar {floor}",
			"proceed": "Prosseguir",
			"bossFloor": "Andar do Chefe",
			"faceTheBoss": "Enfrente o chefe da masmorra",
			"faceBoss": "Enfrentar Chefe (Em Breve)",
			"leaveDungeon": "Sair da Masmorra",
			"returnToTownSquare": "Voltar à praça da cidade",
			"exitDungeon": "Sair",
			"congratulations": "Parabéns! Você completou a masmorra!",
			"allRoomsExplored": "Todas as salas exploradas! Prossiga para o próximo andar ou saia.",
			"roomEmpty": "A sala está vazia. Você não encontrou nada de interessante.",
			"errorLoadingPlayer": "Erro: Não foi possível carregar os dados do jogador"
		},
		"combat": {
			"title": "Combate",
			"yourTurn": "Seu Turno",
			"enemyTurn": "Turno do Inimigo",
			"target": "Alvo",
			"selectEnemy": "Selecione um inimigo para atacar",
			"combatLog": "Registro de Combate",
			"actions": {
				"attack": "Atacar",
				"defend": "Defender",
				"skills": "Habilidades (Em Breve)",
				"flee": "Fugir"
			},
			"messages": {
				"fledBattle": "Você fugiu da batalha!",
				"failedToEscape": "Falha ao escapar! O inimigo bloqueia seu caminho!",
				"victory": "Vitória! +{exp} XP, +{gold} Ouro",
				"defeat": "Derrota... Você foi derrotado.",
				"levelUp": "Subiu de Nível! Agora nível {level}!"
			},
			"log": {
				"combatStarted": "Combate iniciado!",
				"attackMissed": "O ataque de {attacker} errou!",
				"attackHit": "{attacker} atacou {target} causando {damage} de dano!",
				"attackCritical": "{attacker} atacou {target} causando {damage} de dano (Crítico!)!",
				"defend": "{actor} assume postura defensiva! Defesa aumentada em {amount}!",
				"fled": "{actor} fugiu da batalha!",
				"couldntEscape": "{actor} não conseguiu escapar!",
				"buffsWornOff": "Os efeitos de {actor} acabaram.",
				"skillNotImplemented": "{actor} tentou usar uma habilidade, mas o sistema de habilidades ainda não está implementado!",
				"itemNotImplemented": "{actor} tentou usar um item, mas o sistema de itens ainda não está implementado!"
			}
		},
		"ui": {
			"health": "Vida",
			"mana": "Mana",
			"stamina": "Stamina",
			"level": "Nível",
			"experience": "Experiência",
			"inventory": "Inventário",
			"equipment": "Equipamento",
			"skills": "Habilidades",
			"stats": "Atributos",
			"settings": "Configurações",
			"newGame": "Novo Jogo",
			"continue": "Continuar",
			"load": "Carregar Jogo",
			"save": "Salvar Jogo",
			"quit": "Sair",
			"loading": "Carregando...",
			"pause": "Pausar",
			"resume": "Retomar"
		},
		"items": {
			"weapon": "Arma",
			"armor": "Armadura",
			"potion": "Poção",
			"consumable": "Consumível",
			"key": "Chave",
			"quest": "Item de Missão",
			"use": "Usar",
			"equip": "Equipar",
			"unequip": "Desequipar",
			"drop": "Descartar",
			"sell": "Vender",
			"buy": "Comprar"
		},
		"stats": {
			"strength": "Força",
			"dexterity": "Destreza",
			"intelligence": "Inteligência",
			"vitality": "Vitalidade",
			"luck": "Sorte",
			"attack": "Ataque",
			"defense": "Defesa",
			"magicAttack": "Ataque Mágico",
			"magicDefense": "Defesa Mágica",
			"speed": "Velocidade",
			"criticalRate": "Taxa Crítica",
			"evasion": "Evasão"
		},
		"messages": {
			"welcome": "Bem-vindo à Masmorra!",
			"gameOver": "Fim de Jogo",
			"gameSaved": "Jogo salvo com sucesso",
			"gameLoaded": "Jogo carregado com sucesso",
			"itemObtained": "Obteve {item}",
			"itemUsed": "Usou {item}",
			"cannotUseHere": "Não pode usar isso aqui",
			"notEnoughGold": "Ouro insuficiente",
			"inventoryFull": "Inventário cheio",
			"confirmQuit": "Tem certeza que deseja sair?",
			"yes": "Sim",
			"no": "Não"
		}
	}
} satisfies Translation

export default ptBR
