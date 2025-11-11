# Tarefa: 011 - Definição de Dados dos Monstros Iniciais

**Prioridade:** Alta
**Tipo:** Conteúdo

## Objetivo
Definir a estrutura de dados para os monstros e criar as definições para o primeiro conjunto de inimigos (goblins) que habitarão a masmorra inicial.

## Requisitos Técnicos

1.  **Estrutura de Dados `Monster`:**
    *   Definir um tipo ou interface `Monster` em um arquivo apropriado (ex: `src/lib/game/monsters/types.ts`).
    *   A estrutura deve conter, no mínimo:
        *   `id`: string (identificador único, ex: `"goblin_scout"`)
        *   `name`: string (nome exibido, ex: `"Goblin Batedor"`)
        *   `level`: number
        *   `portraitId`: string (ID do retrato, se aplicável)
        *   `stats`: `{ forca: number, agilidade: number, vitalidade: number, inteligencia: number }`
        *   `abilities`: Array de IDs de habilidades (ex: `['ataque_basico', 'golpe_forte']`)
        *   `lootTableId`: string (ID da tabela de loot a ser usada na derrota)

2.  **Arquivo de Conteúdo dos Monstros:**
    *   Criar um arquivo para armazenar os dados dos monstros (ex: `src/lib/content/monsters.ts`).
    *   Este arquivo exportará um objeto ou `Map` contendo as definições de todos os monstros, usando a `id` como chave.

3.  **Criação dos Goblins:**
    *   Dentro do arquivo de conteúdo, criar as definições para os seguintes monstros:
        *   **`goblin_scout`**: Um inimigo fraco e rápido, comum na masmorra.
        *   **`goblin_brute`**: Um inimigo mais forte e com mais vida.
        *   **`goblin_shaman`**: Um inimigo que pode usar habilidades simples.
        *   **`goblin_king` (Chefe):** O chefe da masmorra, significativamente mais forte.

## Critérios de Aceitação

*   O tipo `Monster` está definido.
*   O arquivo de conteúdo `monsters.ts` existe e está populado com as definições dos 4 tipos de goblins.
*   As definições de monstros incluem todos os campos necessários (stats, level, etc.) para serem usadas pelos sistemas de combate e masmorra.
