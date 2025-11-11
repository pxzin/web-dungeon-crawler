# Tarefa: 005 - Sistema de Combate por Turnos

## Objetivo
Implementar a lógica de servidor e as estruturas de dados para o sistema de combate por turnos.

## Requisitos Técnicos

1.  **Máquina de Estados de Combate (Combat State Machine):**
    *   Gerenciar o fluxo do combate no servidor.
    *   Estados: `STARTING` (calcula iniciativa), `PLAYER_TURN`, `ENEMY_TURN`, `ENDED` (processa vitória/derrota).

2.  **Cálculo de Iniciativa e Fila de Turnos:**
    *   No início do combate, criar uma função que calcula a iniciativa de todas as unidades (jogador, companions, monstros) com base na `Agilidade`.
    *   Montar uma fila de turnos ordenada do maior para o menor valor de iniciativa.

3.  **Processador de Ações (Action Handler):**
    *   Criar um sistema central no servidor para processar as ações (`Atacar`, `Habilidade`, `Item`, etc.).
    *   Este sistema recebe a ação do cliente (ex: `playerAction: { type: 'ATTACK', target: 'enemy_id_1' }`), valida, executa a lógica e aplica as mudanças no estado do combate.

4.  **Definição de Fórmulas de Combate:**
    *   Implementar as fórmulas matemáticas que governam o combate. Manter simples para o protótipo.
    *   **Dano Físico:** `dano = (atacante.forca * mod_arma) - defensor.defesa`
    *   **Chance de Acerto/Esquiva:** `chance = 75 + (atacante.agilidade - defensor.agilidade)` (limitado entre 5% e 95%).
    *   **Dano de Habilidade:** `dano = (atacante.inteligencia * mod_habilidade)`

5.  **Fluxo de Dados Cliente-Servidor:**
    *   O estado completo do combate (HP de todos, mana, fila de turnos, etc.) reside no servidor.
    *   **Cliente:** A UI apenas renderiza o estado recebido e envia as ações do jogador para o servidor (via `form actions` do SvelteKit, por exemplo).
    *   **Servidor:** Recebe a ação, processa o turno do jogador E todos os turnos subsequentes dos monstros, e envia de volta para o cliente o estado atualizado do combate. Isso garante que o servidor seja a única fonte da verdade.

## Critérios de Aceitação

*   Um combate é iniciado com sucesso.
*   A ordem de turno é calculada corretamente.
*   O jogador pode executar uma ação válida em seu turno.
*   Os monstros executam suas ações nos turnos deles.
*   O combate termina corretamente em vitória (com recompensas) ou derrota (com penalidades).
*   Toda a lógica de regras do combate é executada exclusivamente no servidor.
