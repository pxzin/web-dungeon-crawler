# Tarefa: 017 - Tela do Mercado (Market)

**Prioridade:** Média
**Tipo:** Feature

## Objetivo
Implementar a interface e a funcionalidade do Mercado, permitindo que os jogadores comprem itens de um vendedor e vendam os itens de seu inventário.

## Requisitos Funcionais

1.  **Layout do Mercado:**
    *   A tela deve apresentar um NPC vendedor e duas seções principais, alternáveis por abas: "Comprar" e "Vender".

2.  **Aba "Comprar":**
    *   Exibir uma lista de itens que o NPC tem à venda.
    *   O inventário do vendedor deve ser definido em um arquivo de conteúdo (ex: `src/lib/content/vendors/market.ts`).
    *   O jogador deve poder comprar um item, o que deduzirá o ouro e adicionará o item ao seu inventário.

3.  **Aba "Vender":**
    *   Exibir o inventário do jogador.
    *   Permitir que o jogador venda seus itens. O preço de venda será uma fração do valor base do item (ex: 25% do valor).
    *   Ao vender, o item é removido do inventário do jogador e o ouro é adicionado.

4.  **Interação e Feedback:**
    *   Clicar em um item (em qualquer aba) deve mostrar seus detalhes (stats, descrição).
    *   O total de ouro do jogador deve ser exibido e atualizado em tempo real.
    *   O jogador não pode comprar itens se não tiver ouro suficiente.

## Critérios de Aceitação
*   O jogador pode acessar o Mercado a partir da Praça Central.
*   A aba "Comprar" exibe corretamente os itens do vendedor e a compra funciona.
*   A aba "Vender" exibe corretamente o inventário do jogador e a venda funciona.
*   As transações de ouro e itens são refletidas corretamente no estado do jogador.
