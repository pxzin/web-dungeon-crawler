# Tarefa: 029 - Pivô Tecnológico: Migração Completa da UI para Phaser 2D

**Prioridade:** Altíssima (Bloqueador para todas as tarefas de UI)
**Tipo:** Arquitetura / Refatoração Massiva

## Objetivo
Migrar toda a interface de usuário do jogo, incluindo menus, telas de gerenciamento e elementos de HUD, para serem renderizados exclusivamente dentro de um canvas Phaser 2D. Esta decisão visa resolver problemas persistentes de interface com HTML/CSS e unificar a renderização gráfica do jogo.

## Impacto e Escopo

Esta tarefa representa uma mudança arquitetural **muito significativa** e terá impacto direto em todas as telas e componentes de UI existentes e planejados.

1.  **Phaser como Renderizador Primário:**
    *   O Phaser 2D será estabelecido como o único motor de renderização para **todos** os elementos visuais do jogo, desde o menu principal até as telas de inventário e combate.
    *   O SvelteKit passará a atuar como um "host" para o canvas do Phaser, gerenciando o carregamento do jogo, rotas (que agora apontarão para diferentes estados/cenas do Phaser) e a persistência de dados.

2.  **Reimplementação de Telas e Componentes de UI:**
    *   Todas as telas e componentes de UI existentes (Criação de Personagem, Praça Central, Language Switcher, Portrait Component) e as pendentes (Inventário, Ferreiro, Taverna, Mercado, Masmorra) precisarão ser **reimplementados do zero** usando as ferramentas de UI do Phaser (textos, sprites, botões baseados em imagens, etc.).
    *   O Design System "Arcana" (cores, tipografia, estilo) deve ser adaptado e recriado dentro do contexto do Phaser.

3.  **Implicações de Assets:**
    *   Todos os assets de UI (botões, painéis, backgrounds, fontes) precisarão ser assets de imagem/sprite para o Phaser, em vez de serem estilizados via CSS.

## Desafios e Considerações

*   **Complexidade de UI Dinâmica:** Implementar formulários, inputs de texto e layouts responsivos complexos em Phaser pode ser mais desafiador do que com HTML/CSS.
*   **Acessibilidade:** A UI do Phaser não é nativamente acessível como HTML, o que pode exigir soluções personalizadas se a acessibilidade for um requisito futuro.
*   **Ferramentas de Depuração:** As ferramentas de depuração de UI serão diferentes das do navegador para HTML/CSS.

## Critérios de Aceitação

*   Todas as telas do jogo são renderizadas dentro de um único canvas do Phaser.
*   A experiência de usuário é consistente e fluida, sem os problemas de HTML/CSS.
*   A funcionalidade de todas as telas existentes e reimplementadas é mantida.
*   O Design System Arcana é replicado com sucesso dentro do ambiente Phaser.
*   **Todas as tarefas de UI pendentes serão reavaliadas e adaptadas para a nova arquitetura.**
