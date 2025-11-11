# Tarefa: 002 - Tela da Praça Central

## Objetivo
Criar a interface de usuário (UI) para a "Praça Central", o hub principal do jogo. Esta tela servirá como o ponto de partida para todas as atividades do jogador.

## Requisitos Funcionais

1.  **Layout Principal:**
    *   Desenvolver um layout visualmente atraente que organize as diferentes áreas de interação da praça.
    *   O design deve ser intuitivo e evocar a atmosfera de um centro de cidade de fantasia.

2.  **Áreas Interativas (Placeholders):**
    *   Implementar botões, ícones ou seções clicáveis para cada uma das funções do hub. Para esta tarefa inicial, eles podem ser placeholders visuais sem funcionalidade completa.
    *   As áreas necessárias são:
        *   **Masmorras:** Para o jogador iniciar uma expedição.
        *   **Ferreiro:** Onde itens serão fabricados e reparados no futuro.
        *   **Taverna:** Ponto para obter quests.
        *   **Mercado:** Para compra e venda de itens.
        *   **Arena:** Futuro local para PvP e desafios.
        *   **Personagem/Inventário:** Para inspecionar o personagem, atributos e itens.

3.  **Exibição de Informações do Jogador:**
    *   Uma pequena área na UI deve exibir informações básicas do personagem carregado do `LocalStorage` (ex: Nome, Nível, Classe).

## Requisitos de Design

*   **Apelo Visual:** Conforme definido no GDD, esta tela precisa de um alto apelo visual. A arte e o layout são prioridades. Considerar um layout isométrico ou uma ilustração de fundo com áreas interativas sobrepostas.
*   **Atmosfera:** O design deve ser coeso com o gênero de fantasia do jogo.

## Requisitos Técnicos

*   **Framework:** SvelteKit
*   **Linguagem:** TypeScript
*   **Estilização:** UnoCSS
*   **Rota:** A tela deve ser a rota principal do jogo após a criação do personagem, possivelmente em `/game/hub` ou `/game/square`.

## Critérios de Aceitação

*   A tela da Praça Central é carregada após a criação do personagem.
*   As informações básicas do personagem são exibidas corretamente.
*   Todas as áreas interativas (Masmorras, Ferreiro, etc.) estão presentes como placeholders visuais no layout.
*   O layout geral é esteticamente agradável e bem organizado.
