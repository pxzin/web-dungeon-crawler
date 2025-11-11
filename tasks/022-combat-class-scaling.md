# Tarefa: 022 - Refatorar Combate: Ataques Básicos por Classe

**Prioridade:** Altíssima
**Tipo:** Refactoring / Sistema

## Objetivo
Ajustar o sistema de combate para que o ataque básico de cada classe escale com seu atributo principal, garantindo que todas as classes sejam viáveis e balanceadas desde o início do jogo.

## Problema Atual
Atualmente, o ataque básico de todas as classes escala com `Força`, o que penaliza classes como Mago, Ladino e Clérigo, tornando o combate injusto e excessivamente difícil para elas.

## Requisitos Técnicos

1.  **Modificar a Lógica de Ataque Básico:**
    *   Revisar a função ou método responsável pelo cálculo do dano do ataque básico no `CombatEngine` (Tarefa 005).
    *   O cálculo do dano deve agora considerar o atributo principal da classe do personagem:
        *   **Guerreiro:** Dano baseado em `Força`.
        *   **Mago:** Dano baseado em `Inteligência`.
        *   **Ladino:** Dano baseado em `Agilidade`.
        *   **Clérigo:** Dano baseado em `Inteligência` (para ataques mágicos básicos) ou `Força` (para ataques físicos básicos, se houver).

2.  **Definição de Ataques Básicos por Classe:**
    *   Pode ser necessário definir um "ataque básico" específico para cada classe (ex: "Míssil Mágico" para o Mago, "Punhalada Rápida" para o Ladino) que utilize o atributo correto.

## Critérios de Aceitação

*   Um Mago de nível 1 consegue causar dano significativo a um Goblin de nível 1 com seu ataque básico.
*   O dano do ataque básico de cada classe é diretamente influenciado pelo seu atributo principal.
*   Todas as classes têm uma forma eficaz de causar dano básico em combate.
