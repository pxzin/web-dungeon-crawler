# Tarefa: 026 - Ajustes no Combate: Ataque Básico Automático

**Prioridade:** Altíssima
**Tipo:** Feature / UX

## Objetivo
Implementar uma opção de ataque básico automático no sistema de combate para reduzir a microgestão e tornar o combate mais fluido, especialmente em encontros mais simples.

## Problemas a Resolver
*   Combate repetitivo exige muitos cliques para ataques básicos.
*   Falta de fluidez em encontros menos estratégicos.

## Requisitos Técnicos

1.  **Botão "Ataque Automático":**
    *   Adicionar um botão "Ataque Automático" na UI de combate (Tarefa 020).
    *   O botão deve ter um estado (ativado/desativado).

2.  **Lógica de Ataque Automático:**
    *   Quando o "Ataque Automático" estiver ativado, o personagem do jogador deve automaticamente executar seu ataque básico (já ajustado pela Tarefa 022) no alvo selecionado a cada turno.
    *   O ataque automático deve continuar até que:
        *   O jogador desative a opção.
        *   O alvo atual seja derrotado (neste caso, a lógica de seleção automática de alvo da Tarefa 027 deve entrar em ação).
        *   O jogador selecione outra ação (ex: usar uma habilidade, item), o que deve pausar o ataque automático.

3.  **Feedback Visual:**
    *   O botão "Ataque Automático" deve indicar claramente seu estado (ativado/desativado).

## Critérios de Aceitação

*   O jogador pode ativar e desativar o ataque automático durante o combate.
*   Com o ataque automático ativado, o personagem ataca o alvo selecionado a cada turno sem intervenção do jogador.
*   O ataque automático é interrompido se o jogador realizar outra ação ou se o alvo for derrotado.
