# Tarefa: 024 - Revisão e Balanceamento de Dados de Monstros

**Prioridade:** Altíssima
**Tipo:** Balanceamento / Conteúdo

## Objetivo
Revisar e ajustar os atributos e habilidades de todos os monstros definidos (Goblins e Mortos-vivos da Cripta) para garantir um balanceamento adequado com a dificuldade esperada e a progressão do jogador.

## Problema Atual
Os monstros podem estar com estatísticas desbalanceadas, contribuindo para a dificuldade excessiva do combate.

## Requisitos Técnicos

1.  **Revisão dos Atributos dos Monstros:**
    *   Analisar os atributos (`forca`, `agilidade`, `vitalidade`, `inteligencia`) de todos os monstros em `src/lib/content/monsters.ts`.
    *   Ajustar esses atributos para que correspondam à faixa de nível e ao papel de cada monstro (ex: um "brute" deve ter mais `vitalidade` e `forca`, um "scout" mais `agilidade`).

2.  **Revisão das Habilidades dos Monstros:**
    *   Verificar as habilidades dos monstros e seus efeitos.
    *   Garantir que as habilidades não sejam excessivamente poderosas para o nível do monstro.

3.  **Revisão das Tabelas de Loot:**
    *   Ajustar as tabelas de loot (`src/lib/content/loot-tables.ts`) para garantir que as recompensas sejam apropriadas para a dificuldade e o nível dos monstros.

## Critérios de Aceitação

*   Os monstros da "Caverna dos Goblins" (Nível 1-5) são um desafio justo para um personagem de nível 1-5.
*   Os monstros da "Cripta dos Inquietos" (Nível 5-10) são um desafio justo para um personagem de nível 5-10.
*   A progressão de dificuldade entre os monstros é perceptível e razoável.
