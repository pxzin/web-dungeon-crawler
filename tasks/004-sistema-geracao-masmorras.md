# Tarefa: 004 - Sistema de Geração Procedural de Masmorras

## Objetivo
Desenvolver o serviço de back-end responsável por gerar a estrutura, conteúdo e layout das masmorras de forma procedural.

## Requisitos Técnicos

1.  **Estruturas de Dados (Configuração):**
    *   Criar modelos de dados (JSON, TS Objects) para definir os "tipos" de masmorra.
    *   Exemplo de configuração:
        ```typescript
        {
          id: 'goblin_caves',
          name: 'Cavernas dos Goblins',
          recommendedLevel: { min: 1, max: 5 },
          floorCount: 3,
          possibleMonsters: ['goblin_scout', 'goblin_shaman'],
          boss: 'goblin_king',
          rewardTable: [...]
        }
        ```

2.  **Algoritmo de Geração de Layout:**
    *   Implementar um algoritmo para gerar o layout de salas de cada andar.
    *   **Sugestão para protótipo:** Um algoritmo de "Random Walk" ou "Drunkard's Walk" é simples e eficaz. Ele começa em um ponto e "caminha" aleatoriamente, esculpindo salas e corredores em um grid.
    *   O algoritmo deve garantir que todas as salas sejam acessíveis a partir da sala inicial.

3.  **Populando as Salas:**
    *   Após gerar o layout, um processo deve popular cada sala com seu conteúdo.
    *   Definir probabilidades para cada tipo de sala (ex: 60% Combate, 20% Tesouro, 20% Vazia).
    *   A última sala do último andar deve ser sempre a `Sala do Chefe`.
    *   A primeira sala do primeiro andar deve ser sempre a entrada.

4.  **Saída do Gerador:**
    *   O serviço de geração deve produzir um objeto de dados completo e serializável que represente a masmorra inteira (todos os andares, salas, seus tipos, conteúdos e conexões).
    *   Este objeto será mantido no servidor enquanto o jogador estiver ativo na masmorra.
    *   A geração deve ser determinística se receber uma "seed" (semente) numérica, facilitando testes e depuração.

## Critérios de Aceitação

*   O sistema consegue gerar um objeto de masmorra completo a partir de um arquivo de configuração.
*   A masmorra gerada tem um caminho claro da entrada até a sala do chefe.
*   As salas são populadas de acordo com as regras e probabilidades definidas.
*   O uso da mesma "seed" produz exatamente a mesma masmorra duas vezes.
*   A estrutura de dados da masmorra gerada é lógica e pronta para ser usada pelo resto do jogo.
