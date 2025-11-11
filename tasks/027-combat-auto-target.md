# Tarefa: 027 - Ajustes no Combate: Seleção Automática de Alvo

**Prioridade:** Altíssima
**Tipo:** Feature / UX

## Objetivo
Implementar uma lógica inteligente para a seleção automática de alvo no combate, reduzindo a necessidade de intervenção manual do jogador e melhorando a fluidez da experiência.

## Problemas a Resolver
*   O jogador precisa selecionar um alvo manualmente a cada combate.
*   A seleção de alvo pode ser tediosa em combates com múltiplos inimigos.

## Requisitos Técnicos

1.  **Seleção de Alvo Padrão:**
    *   Sempre que um combate iniciar, um monstro deve ser automaticamente selecionado como alvo padrão.
    *   A regra para a seleção inicial deve ser: **selecionar o monstro com a menor quantidade de HP atual (o mais fraco)**.

2.  **Re-seleção Automática de Alvo:**
    *   Se o monstro atualmente selecionado for derrotado, a lógica deve automaticamente re-selecionar o próximo monstro mais fraco restante.
    *   Se não houver mais monstros, o combate deve terminar.

3.  **Seleção Manual de Alvo:**
    *   O jogador deve sempre ter a opção de mudar o alvo manualmente, clicando em outro monstro na UI de combate (Tarefa 020).
    *   A seleção manual deve sobrescrever a seleção automática até que o alvo manual seja derrotado ou o jogador reative a seleção automática.

## Critérios de Aceitação

*   Ao iniciar um combate, um monstro é automaticamente selecionado como alvo.
*   O alvo inicial é o monstro mais fraco.
*   Quando um alvo é derrotado, o próximo monstro mais fraco é automaticamente selecionado.
*   O jogador pode mudar o alvo manualmente a qualquer momento.
