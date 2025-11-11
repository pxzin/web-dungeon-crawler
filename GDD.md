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
*   **Geração Procedural de Masmorras:** Cada masmorra será única, oferecendo uma nova experiência a cada partida.
*   **Combate por Turnos:** O combate será estratégico e baseado em turnos.
*   **Sistema de Inventário:** Os jogadores poderão coletar e gerenciar itens em um inventário.
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
