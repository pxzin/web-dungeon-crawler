# Tarefa: 012 - Definição de Dados dos Itens Iniciais

**Prioridade:** Alta
**Tipo:** Conteúdo

## Objetivo
Definir as estruturas de dados para itens (equipamentos, consumíveis) e tabelas de loot. Criar um conjunto inicial de itens que servirão como as primeiras recompensas do jogo.

## Requisitos Técnicos

1.  **Estruturas de Dados de Itens:**
    *   Definir tipos/interfaces para os diferentes tipos de itens (ex: `Weapon`, `Armor`, `Potion`) em um local apropriado (ex: `src/lib/game/items/types.ts`).
    *   **Propriedades Comuns:** `id`, `name`, `description`, `iconId`, `value` (preço).
    *   **Propriedades Específicas:**
        *   `Weapon`: `damage`, `type` ('sword', 'axe', etc.).
        *   `Armor`: `defense`, `slot` ('head', 'chest', 'legs', etc.).
        *   `Potion`: `effect` (ex: `{ type: 'heal', amount: 15 }`).

2.  **Estrutura da Tabela de Loot (`LootTable`):**
    *   Definir uma estrutura para tabelas de loot, que possa ser associada a monstros.
    *   **Exemplo:**
        ```typescript
        {
          id: 'goblin_common_loot',
          items: [
            { itemId: 'gold_coins', quantity: [5, 10], chance: 0.8 }, // 80% de chance de dropar entre 5 e 10 moedas
            { itemId: 'healing_potion_weak', quantity: 1, chance: 0.15 }, // 15% de chance
            { itemId: 'short_sword', quantity: 1, chance: 0.05 } // 5% de chance
          ]
        }
        ```

3.  **Arquivos de Conteúdo:**
    *   Criar arquivos para armazenar os dados (ex: `src/lib/content/items.ts`, `src/lib/content/loot-tables.ts`).

4.  **Criação de Conteúdo Inicial:**
    *   **Itens:** Criar definições para um conjunto básico de itens de nível baixo:
        *   `short_sword`, `wooden_shield`, `leather_armor`.
        *   `healing_potion_weak`.
        *   `gold_coins` (item virtual para representar dinheiro).
    *   **Tabelas de Loot:** Criar duas tabelas de loot:
        *   `goblin_common_loot`: Para os goblins normais.
        *   `goblin_king_loot`: Uma tabela com recompensas melhores para o chefe.

## Critérios de Aceitação

*   As estruturas de dados para `Item` e `LootTable` estão definidas.
*   Os arquivos de conteúdo para itens e tabelas de loot foram criados.
*   Um conjunto inicial de itens e as tabelas de loot para os goblins estão definidos.
