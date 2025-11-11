# Game Design Document: Web Dungeon Crawler

## 1. Visão Geral

**Título Provisório:** Web Dungeon Crawler
**Gênero:** RPG de Aventura em Masmorras
**Plataforma:** Web (Desktop e Mobile)
**Público-Alvo:** Jogadores casuais e fãs de RPG.

## 2. Conceito do Jogo

Um jogo de RPG de aventura em que os jogadores exploram masmorras geradas proceduralmente, combatem monstros, coletam tesouros e aprimoram seus personagens. O jogo será acessível através de um navegador web e terá uma interface intuitiva e responsiva.

## 3. Pilares de Design

*   **Exploração:** Incentivar a curiosidade dos jogadores com masmorras cheias de segredos e desafios.
*   **Progressão:** Oferecer um sistema de progressão de personagem claro e recompensador.
*   **Acessibilidade:** Garantir que o jogo seja fácil de aprender e jogar, mas com profundidade para manter os jogadores engajados.

## 4. Narrativa

*   **Campanha Principal:** A ser definido. O foco inicial será na exploração de masmorras e progressão do personagem, sem uma campanha principal.

## 5. Funcionalidades Principais

*   **Criação de Personagem:** O jogador criará e controlará um personagem principal.
    *   **Companions:** Será possível recrutar companions (aliados) autônomos que acompanharão o jogador nas masmorras.
    *   **Classes:** As classes serão baseadas no universo de Dungeons & Dragons. Exemplos iniciais incluem:
        *   Guerreiro
        *   Mago
        *   Ladino
        *   Clérigo
    *   **Atributos e Aparência:** Os jogadores poderão personalizar a aparência de seu personagem principal e distribuir pontos nos seguintes atributos:
        *   **Força:** Influencia o dano de ataques físicos.
        *   **Agilidade:** Afeta a velocidade de ataque e a capacidade de esquiva.
        *   **Vitalidade:** Determina os pontos de vida totais.
        *   **Inteligência:** Influencia a potência de magias e habilidades especiais.
*   **Geração Procedural de Masmorras:** As masmorras são o conteúdo principal do jogo, geradas proceduralmente para garantir rejogabilidade.
    *   **Acesso e Dificuldade:**
        *   Haverá uma lista de masmorras disponíveis, cada uma com um tema, uma faixa de nível recomendada e uma lista de possíveis recompensas.
        *   Não haverá bloqueio de acesso por nível, mas masmorras de nível muito alto serão extremamente difíceis para jogadores de nível baixo.
        *   **Masннямras para Iniciantes:** Existirão masmorras introdutórias onde a derrota não acarreta nenhuma penalidade, permitindo que os jogadores aprendam e se recuperem sem risco.
    *   **Estrutura da Masmorra:**
        *   Cada masmorra consistirá em múltiplos andares (ex: 3 a 5 andares).
        *   Cada andar será um grid de salas interconectadas, com a disposição gerada proceduralmente.
    *   **Tipos de Sala:**
        *   **Sala de Combate:** Contém um grupo de monstros.
        *   **Sala de Tesouro:** Contém um baú com itens ou dinheiro.
        *   **Sala Vazia:** Pode conter elementos de lore ou servir como um conector.
        *   **Sala do Chefe (Boss Room):** A última sala do último andar, contendo o chefe da masmorra.
    *   **Objetivo:** O objetivo de cada masmorra é navegar pelos andares e derrotar o chefe final para obter as melhores recompensas.
    *   **Roteiro de Masmorras (Conteúdo Futuro):**
        *   **Nível 1-5:** Caverna dos Goblins (Plano inicial)
        *   **Nível 5-10:** A Cripta dos Inquietos (Mortos-vivos)
        *   **Nível 10-15:** Bosque Sussurrante (Feras e criaturas da floresta)
        *   **Nível 15-20:** Templo Submerso (Criaturas aquáticas)
        *   **Nível 20-25:** A Mina Abandonada (Construtos e golens)
        *   **Nível 25-30:** O Coração Vulcânico (Elementais de fogo)
        *   **Nível 30-35:** Pântano do Veneno (Criaturas peçonhentas)
        *   **Nível 35-40:** A Torre do Mago Louco (Autômatos mágicos)
        *   **Nível 40-45:** O Abismo Sombrio (Seres extraplanares)
*   **Combate por Turnos:** O combate é uma parte central da exploração, ocorrendo em um modo de turnos estratégico.
    *   **Início do Combate:** Começa quando o jogador entra em uma sala de combate.
    *   **Ordem de Turno (Iniciativa):** A ordem das ações é determinada pela `Agilidade` de cada participante.
    *   **Ações do Jogador:** Em seu turno, o jogador pode escolher uma das seguintes ações:
        *   **Atacar:** Ataque físico padrão baseado em `Força`.
        *   **Habilidade/Magia:** Usar uma habilidade de classe que consome recursos (mana/energia).
        *   **Item:** Usar um consumível do inventário.
        *   **Defender:** Pular o turno para reduzir o dano recebido.
        *   **Fugir:** Tentar escapar do combate (chance de sucesso baseada em `Agilidade`).
    *   **IA Inimiga:** No protótipo, os monstros usarão uma IA simples para atacar o jogador.
    *   **Fim do Combate:**
        *   **Vitória:** Todos os inimigos derrotados. Concede XP, dinheiro e chance de itens.
        *   **Derrota:** HP do jogador chega a 0. O jogador é resgatado e acorda na Praça Central com as seguintes penalidades:
            *   **Perda de Durabilidade:** Itens equipados sofrem uma perda significativa de durabilidade.
            *   **Dívida com o Curandeiro:** Uma "conta" pelos serviços de ressurreição é gerada e deve ser paga.
*   **Sistema de Inventário:** Os jogadores poderão coletar e gerenciar itens em um inventário.
*   **Durabilidade e Reparo de Itens:**
    *   Equipamentos possuem um status de durabilidade.
    *   A durabilidade diminui com o uso e drasticamente com a derrota.
    *   Itens com 0 de durabilidade se tornam ineficazes até serem reparados no Ferreiro, mediante um custo.
*   **Sistema de Habilidades:** Os personagens terão uma árvore de habilidades para desbloquear novas perícias.
*   **Praça Central (Hub do Jogador):** Um hub central com apelo visual onde os jogadores poderão:
    *   Pegar quests.
    *   Inspecionar seu personagem.
    *   Fabricar e reparar itens.
    *   Partir para masmorras.
    *   Comprar e vender itens.
    *   Acessar conteúdo futuro (campanha, PvP, desafios).

## 6. Direção de Arte e Som

*   **Estilo Visual:** A ser definido.
*   **Música e Efeitos Sonoros:** A ser definido.

## 8. Profissões

O jogador poderá escolher uma profissão para gerar renda e obter habilidades passivas.

### Profissões Iniciais
1.  **Ferreiro (Blacksmith):** Cria e repara armas e armaduras.
    *   **Atributo Principal:** Força.
    *   **Habilidade Passiva:** "Mãos Calejadas" (bônus de defesa física).
2.  **Coureiro (Leatherworker):** Cria armaduras leves e itens de couro.
    *   **Atributo Principal:** Agilidade.
    *   **Habilidade Passiva:** "Flexibilidade" (bônus de esquiva).
3.  **Alquimista (Alchemist):** Cria poções, elixires e venenos.
    *   **Atributo Principal:** Inteligência.
    *   **Habilidade Passiva:** "Resistência Adquirida" (bônus de resistência a veneno).
4.  **Encantador (Enchanter):** Adiciona bônus mágicos a equipamentos.
    *   **Atributo Principal:** Inteligência.
    *   **Habilidade Passiva:** "Afinidade Arcana" (regeneração de mana).
5.  **Coletor (Gatherer):** Extrai recursos das masmorras.
    *   **Atributo Principal:** Agilidade.
    *   **Habilidade Passiva:** "Olho de Águia" (chance de achar mais recursos).

### Profissões Futuras
*   Joalheiro (Jeweler)
*   Escriba (Scribe)
*   Cozinheiro (Cook)
*   Pescador (Fisherman)
*   Ladrão (Thief)

## 9. Tecnologia

*   **Engine:** SvelteKit
*   **Linguagem:** TypeScript
*   **Estilização:** UnoCSS
*   **Persistência:** LocalStorage (inicialmente), com possibilidade de migração para um banco de dados.
