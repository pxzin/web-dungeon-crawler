# Tarefa: 021 - Refatoração da Exploração de Masmorra com Phaser e UX

**Prioridade:** Altíssima
**Tipo:** Refactoring / Feature

## Objetivo
Substituir a atual renderização de masmorra (baseada em ASCII/HTML) por um sistema gráfico utilizando a biblioteca **Phaser 2D**. Simultaneamente, redesenhar a interface de usuário (UI/UX) da exploração para eliminar a necessidade de rolagem e criar uma experiência de jogo mais fluida e integrada.

## Problemas a Resolver
1.  **Visual:** A arte atual é um placeholder e precisa ser substituída por gráficos adequados.
2.  **UX - Header:** O cabeçalho da página é muito grande, ocupando um espaço valioso da tela.
3.  **UX - Ações:** Os botões de ação estão no rodapé, forçando o jogador a rolar a página para jogar, o que é uma experiência ruim.

## Requisitos Técnicos

1.  **Integração do Phaser 2D:**
    *   Adicionar a biblioteca Phaser 2D ao projeto.
    *   Criar um componente Svelte (`DungeonCanvas.svelte`) que irá conter e gerenciar a instância do jogo Phaser.
    *   A lógica do Phaser deve receber os dados da masmorra gerada (do sistema da Tarefa 004) e desenhar o mapa utilizando um **tileset gráfico**.
    *   O sprite do jogador deve ser renderizado no canvas e sua movimentação deve ser controlada pelo Phaser.

2.  **Redesenho da UI de Exploração:**
    *   **Layout "Single-Screen":** A nova tela não deve ter rolagem vertical. Todas as informações e ações essenciais devem estar visíveis ao mesmo tempo.
    *   **Cabeçalho Compacto:** Substituir o cabeçalho atual por uma barra de informações mais fina e específica para a masmorra (ex: nome da masmorra, andar atual, etc.).
    *   **Painel de Ações Fixo:** Mover todos os botões de ação (movimentação, procurar, abrir baú) para um painel de UI fixo, posicionado em um local acessível (ex: na lateral ou no rodapé, mas fixo na janela de visualização).

## Dependências
*   Esta tarefa requer os **assets de tileset** de masmorra definidos no arquivo `ASSETS.md`. Inicialmente, pode-se usar um tileset de placeholder, mas o objetivo é usar os definitivos.

## Critérios de Aceitação
*   A renderização da masmorra é feita inteiramente dentro de um canvas do Phaser 2D.
*   A UI da masmorra não exige mais rolagem.
*   O cabeçalho foi substituído por uma versão compacta.
*   Os botões de ação estão em um painel fixo e sempre acessível.
*   A experiência de explorar a masmorra é visivelmente mais fluida e profissional.
