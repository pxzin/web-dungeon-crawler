# Tarefa: 020 - Implementação da Masmorra (A Cripta dos Inquietos)

**Prioridade:** Altíssima
**Tipo:** Feature / Conteúdo

## Objetivo
Implementar a primeira experiência de masmorra totalmente jogável, utilizando a "Cripta dos Inquietos" como conteúdo. Isso inclui a criação das interfaces de exploração e combate.

## Requisitos - Parte 1: Configuração de Dados (Pré-requisito)
*   Garantir que as tarefas de criação de monstros (018) e itens (019) da Cripta estejam concluídas.
*   Criar o arquivo de configuração da masmorra em `src/lib/content/dungeons/restless_crypt.ts` com todos os parâmetros necessários (ID, nome, monstros, chefe, etc.).

## Requisitos - Parte 2: UI de Exploração da Masmorra
1.  **Tela da Masmorra:**
    *   Criar a rota e o componente principal para a visualização da masmorra (ex: `/game/dungeon/[id]`).
2.  **Renderização do Mapa:**
    *   A UI deve renderizar o mapa da masmorra gerado pelo sistema (Tarefa 004), exibindo pisos, paredes, etc.
    *   Um ícone ou token deve representar a posição atual do jogador no mapa.
3.  **Movimentação e Interação:**
    *   Implementar a lógica para o jogador se mover de uma sala para outra.
    *   Ao entrar em uma sala com um baú de tesouro, o jogador deve poder abri-lo e coletar o loot.
4.  **Névoa de Guerra (Fog of War):**
    *   O mapa deve começar totalmente escuro, exceto pela sala inicial.
    *   As salas e corredores devem ser revelados à medida que o jogador os explora.

## Requisitos - Parte 3: UI de Combate
1.  **Transição para Combate:**
    *   Ao entrar em uma sala contendo monstros, o estado do jogo deve mudar para `IN_COMBAT` e a UI de combate deve ser renderizada.
2.  **Layout da Tela de Combate:**
    *   Exibir os sprites de combate do jogador e dos inimigos.
    *   Mostrar barras de HP/Recursos para todos os participantes.
    *   Exibir um menu com as ações de combate do jogador (Atacar, Habilidades, Itens, Defender, Fugir).
3.  **Fluxo de Combate Interativo:**
    *   O jogador deve poder selecionar um alvo e uma ação.
    *   A UI deve exibir o feedback das ações (dano causado, cura, etc.) e um log de combate.
    *   Após a vitória, uma tela de recompensas deve ser exibida.
    *   Após a derrota, o jogador deve ser redirecionado para a Praça Central.

## Critérios de Aceitação
*   O jogador pode entrar na "Cripta dos Inquietos" a partir da Praça Central.
*   O jogador pode explorar o mapa da masmorra, movendo-se entre as salas.
*   A névoa de guerra funciona, revelando o mapa progressivamente.
*   Entrar em uma sala com inimigos **inicia o combate corretamente**.
*   A interface de combate é funcional, permitindo um ciclo de batalha completo.
*   O jogador retorna à exploração após a vitória ou à cidade após a derrota.
*   **A masmorra é uma experiência jogável do início ao fim.**
