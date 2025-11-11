# Tarefa: 028 - Sistema de Avaliação de Equipamento (Equipment Rating - ER)

**Prioridade:** Alta
**Tipo:** Sistema / Feature

## Objetivo
Implementar um sistema de "Equipment Rating" (ER) que atribui uma pontuação de poder a cada item equipado e calcula a soma total para o personagem. Este ER servirá como um indicador de poder do jogador e, futuramente, como requisito para acessar certos desafios.

## Requisitos Técnicos

1.  **Cálculo do ER Individual do Item:**
    *   Desenvolver uma função (ex: `calculateItemER(item: Item)`) que determine a pontuação de um item individual.
    *   Esta função deve considerar:
        *   **Atributos:** A magnitude dos bônus de atributos que o item concede (ex: +5 Força contribui mais que +1 Força).
        *   **Tipo de Item:** Armas e armaduras podem ter um peso base maior que acessórios.
        *   **Qualidade/Raridade:** Itens de maior raridade (se implementado) devem ter um ER base maior.
        *   **Durabilidade:** Itens com durabilidade zero (quebrados) devem contribuir com 0 ER. Itens danificados podem contribuir com um ER reduzido.
    *   Esta lógica deve ser integrada ao sistema de itens (Tarefas 006 e 012).

2.  **Cálculo do ER Total do Personagem:**
    *   Implementar uma função (ex: `calculateTotalER(character: Character)`) que some o ER de todos os itens atualmente equipados pelo personagem.
    *   Esta função deve ser parte do sistema de personagem ou de um novo serviço de equipamento.

3.  **Exibição do ER:**
    *   O ER total do personagem deve ser exibido na **Tela de Inventário e Equipamentos** (Tarefa 014).
    *   O ER individual de cada item pode ser exibido em seu tooltip ou painel de detalhes.
    *   (Opcional) O ER total também pode ser exibido no **Painel de Depuração** (DEV-TOOLS).

## Futuras Aplicações (Nota)
Este sistema será fundamental para implementar desafios que exigem um ER mínimo, guiando o jogador na progressão.

## Critérios de Aceitação

*   Cada item equipado tem um ER individual calculado de forma lógica.
*   O personagem tem um ER total que é a soma dos ERs dos itens equipados.
*   O ER total é exibido na UI da tela de inventário/equipamento.
*   A lógica de cálculo do ER é configurável e pode ser ajustada para balanceamento.
