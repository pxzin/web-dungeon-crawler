# Tarefa: 019 - Definição de Dados dos Itens (Cripta)

**Prioridade:** Média
**Tipo:** Conteúdo

## Objetivo
Criar um novo conjunto de itens e tabelas de loot temáticos para a masmorra "A Cripta dos Inquietos", oferecendo recompensas adequadas para o desafio.

## Requisitos Técnicos

1.  **Adicionar aos Arquivos de Conteúdo:**
    *   Novos itens devem ser adicionados a `src/lib/content/items.ts`.
    *   Novas tabelas de loot devem ser adicionadas a `src/lib/content/loot-tables.ts`.

2.  **Criação de Itens Temáticos:**
    *   Criar definições para itens que podem ser encontrados na cripta:
        *   **`silver_mace`**: Uma maça de prata (arma de esmagamento) que causa dano extra contra mortos-vivos.
        *   **`ectoplasm_vial`**: Um material de criação raro, derrubado por fantasmas.
        *   **`purification_salts`**: Um consumível que remove um efeito negativo do jogador.
        *   **`acolyte_hood`**: Um capacete (armadura leve) que concede um pequeno bônus de inteligência, derrubado pelo chefe.

3.  **Criação de Tabelas de Loot:**
    *   Criar as tabelas de loot para os novos monstros:
        *   **`crypt_common_loot`**: Tabela para os monstros normais da cripta, com chance de derrubar `purification_salts` e materiais básicos.
        *   **`necromancer_acolyte_loot`**: Tabela de loot para o chefe, com chance garantida de derrubar o `acolyte_hood` e outros itens de maior valor.

## Critérios de Aceitação
*   Os novos itens temáticos da cripta estão definidos no arquivo de conteúdo.
*   As novas tabelas de loot para os monstros da cripta estão criadas e balanceadas.
