# Tarefa: 025 - Ajustes na Exploração: Encontros Garantidos e Busca Contínua

**Prioridade:** Altíssima
**Tipo:** Feature / Gameplay

## Objetivo
Modificar a lógica de exploração da masmorra para garantir que o jogador sempre encontre monstros em salas de combate e permitir a busca contínua por mais encontros mesmo após a exploração inicial.

## Problemas a Resolver
*   Salas vazias sem monstros tornam a exploração monótona.
*   Falta de opção para continuar "grindando" por monstros após limpar as salas iniciais.

## Requisitos Técnicos

1.  **Garantir Encontros em Salas de Combate:**
    *   Revisar a lógica de populamento de salas do gerador de masmorras (Tarefa 004) ou a lógica de entrada em sala (Tarefa 020).
    *   Todas as salas designadas como "Sala de Combate" devem iniciar um encontro com monstros ao serem acessadas pela primeira vez.
    *   Salas "vazias" que não são de tesouro ou chefe devem ser convertidas em salas de combate.

2.  **Funcionalidade de "Procurar por Monstros":**
    *   Após o jogador ter explorado todas as salas de combate e derrotado os monstros iniciais, adicionar uma opção na UI de exploração (Tarefa 021) para "Procurar por Monstros".
    *   Ao ativar esta opção, o jogo deve gerar um novo encontro com monstros em uma sala já visitada ou em uma área designada para respawn.
    *   Esta ação pode ter um custo (ex: tempo, energia do personagem) ou um limite de uso por masmorra.

## Critérios de Aceitação

*   O jogador sempre encontra monstros ao entrar em uma sala de combate.
*   Não há mais salas "vazias" que não sejam de tesouro ou chefe.
*   Após limpar a masmorra, o jogador pode ativar uma opção para continuar encontrando monstros.
*   A exploração se torna mais dinâmica e recompensadora.
