# Tarefa: 023 - Revisão e Balanceamento de Combate

**Prioridade:** Altíssima
**Tipo:** Balanceamento / Sistema

## Objetivo
Revisar e ajustar as fórmulas de combate e introduzir parâmetros de configuração para facilitar o balanceamento geral do jogo, abordando a dificuldade excessiva relatada.

## Problema Atual
O combate está excessivamente difícil, mesmo para classes que escalam corretamente. As fórmulas atuais podem estar desbalanceadas.

## Requisitos Técnicos

1.  **Revisão das Fórmulas de Combate:**
    *   Analisar e ajustar as fórmulas de cálculo de dano, defesa, chance de acerto/esquiva, e qualquer outra fórmula relevante no `CombatEngine` (Tarefa 005).
    *   Garantir que a progressão de poder do jogador e dos monstros seja suave e justa.

2.  **Introdução de Parâmetros de Tuning:**
    *   Criar um arquivo de configuração (ex: `src/lib/game/combat/balance-config.ts`) que contenha variáveis ajustáveis para o balanceamento.
    *   Exemplos de parâmetros:
        *   `playerDamageMultiplier`: Multiplicador global de dano do jogador.
        *   `monsterDamageMultiplier`: Multiplicador global de dano dos monstros.
        *   `playerDefenseMultiplier`: Multiplicador global de defesa do jogador.
        *   `monsterDefenseMultiplier`: Multiplicador global de defesa dos monstros.
        *   `baseHitChance`: Chance base de acerto.
        *   `attributeScalingFactor`: Fator de quanto cada ponto de atributo contribui para o poder.

3.  **Integração com o `CombatEngine`:**
    *   O `CombatEngine` deve utilizar esses parâmetros de tuning em seus cálculos.

## Critérios de Aceitação

*   O combate não é mais excessivamente difícil para um personagem de nível apropriado.
*   As fórmulas de combate são transparentes e ajustáveis via parâmetros de configuração.
*   Alterar os parâmetros de tuning afeta diretamente a dificuldade do combate.
