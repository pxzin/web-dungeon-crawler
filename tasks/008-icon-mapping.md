# Tarefa: 008 - Mapeamento de Ícones do Spritesheet

**Prioridade:** Média
**Tipo:** Feature / System

## Objetivo
Criar um sistema para exibir ícones individuais a partir do spritesheet `rpg-icons.png`. Isso permitirá o uso eficiente dos ícones em toda a UI do jogo sem carregar centenas de arquivos de imagem separados.

## Arquivo de Referência
- `src/lib/assets/icons/rpg-icons.png` (Spritesheet com ícones de 32x32 pixels)

## Requisitos Técnicos

1.  **Criação do Mapa de Ícones:**
    *   Criar um arquivo de definição, por exemplo, `src/lib/assets/icons/icon-map.ts`.
    *   Neste arquivo, criar um objeto (map) que associa um ID de ícone único (string, ex: `"sword_golden"`) à sua posição no grid do spritesheet. A posição pode ser representada por `{ row: number, col: number }`.
    *   **Exemplo de Mapeamento:**
        ```typescript
        export const iconMap = {
          'heart_red': { row: 1, col: 0 },
          'sword_simple': { row: 4, col: 1 },
          'shield_wood': { row: 4, col: 16 },
          // ... etc
        };
        ```

2.  **Componente `Icon.svelte`:**
    *   Desenvolver um componente Svelte reutilizável (`src/lib/components/ui/Icon.svelte`).
    *   O componente deve aceitar uma prop `iconId: string`.
    *   Ele deve renderizar um elemento (`<span>` ou `<div>`) com as seguintes propriedades de estilo:
        *   `width`: 32px
        *   `height`: 32px
        *   `background-image`: `url($lib/assets/icons/rpg-icons.png)`
        *   `background-position`: Calculado dinamicamente com base no `iconId` e no mapa de ícones. A fórmula será `x = -icon.col * 32` e `y = -icon.row * 32`.
        *   `background-repeat`: `no-repeat`

3.  **Mapeamento Inicial:**
    *   Como uma prova de conceito, o programador deve mapear as **primeiras 5 linhas** de ícones no arquivo `icon-map.ts` para validar o sistema. O mapeamento completo pode ser feito progressivamente.

## Critérios de Aceitação

*   O arquivo `icon-map.ts` existe e contém o mapeamento para pelo menos as 5 primeiras linhas do spritesheet.
*   O componente `Icon.svelte` foi criado.
*   Usar `<Icon iconId="heart_red" />` em qualquer lugar da aplicação renderiza corretamente o ícone de coração do spritesheet.
*   O sistema é performático e utiliza a técnica de CSS spritesheet.
