# Tarefa: 006 - Sistema de Durabilidade e Reparo de Itens

## Objetivo
Implementar o sistema de durabilidade para itens equipáveis, incluindo a perda de durabilidade e a funcionalidade de reparo.

## Requisitos Técnicos

1.  **Atributo de Durabilidade:**
    *   Adicionar um novo atributo `durability: { current: number, max: number }` à estrutura de dados de todos os itens equipáveis (armas, armaduras, etc.).

2.  **Lógica de Perda de Durabilidade:**
    *   Implementar a lógica no servidor para reduzir a durabilidade.
    *   **Na Derrota:** Criar uma função que é chamada quando o jogador é derrotado. Essa função deve iterar sobre todos os itens equipados e reduzir a `durability.current` em uma porcentagem fixa (ex: 25% da `durability.max`).
    *   **Em Uso (Futuro):** Para o futuro, pode-se implementar uma pequena chance de perder 1 ponto de durabilidade a cada golpe dado ou recebido. Para o protótipo inicial, a perda na derrota é suficiente.

3.  **Efeito de Durabilidade Zero:**
    *   Modificar as fórmulas de combate e cálculo de stats do personagem.
    *   Se `item.durability.current <= 0`, o item não deve conceder nenhum de seus bônus (stats, efeitos, etc.). Essencialmente, ele se torna um item "quebrado" e inútil até ser reparado.

4.  **Funcionalidade de Reparo:**
    *   Criar um endpoint no servidor ou uma `form action` para a funcionalidade de reparo, que será usada na UI do Ferreiro na Praça Central.
    *   A ação deve receber o ID do item a ser reparado.
    *   **Lógica de Custo:** O custo do reparo deve ser proporcional à durabilidade perdida e ao valor/nível do item. `custo = (durability.max - durability.current) * fator_custo_item`.
    *   Após o pagamento, a `durability.current` do item deve ser restaurada para `durability.max`.

## Critérios de Aceitação

*   Itens equipáveis possuem um atributo de durabilidade.
*   A durabilidade dos itens equipados é reduzida corretamente após uma derrota.
*   Um item com 0 de durabilidade não fornece mais seus atributos ao jogador.
*   O jogador pode pagar para reparar um item no Ferreiro, e a durabilidade é restaurada.
*   Toda a lógica de durabilidade e reparo é controlada pelo servidor.
