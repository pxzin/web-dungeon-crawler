# Tarefa Urgente: Criação do Design System

**Prioridade:** URGENTE

## Objetivo
Desenvolver um Design System inicial e coeso, baseado na inspiração visual do estudo de UI "Arcana". Este sistema será a fundação para toda a interface do jogo, garantindo consistência e agilidade no desenvolvimento de novas telas.

## Referência Visual Principal

O programador deve usar o seguinte arquivo Figma como a principal fonte de inspiração para a estética, cores, fontes e estilo dos componentes:

**Link do Figma:** [Arcana - UI Study](https://www.figma.com/design/hVFAvBZNkpeeiSFG5tje5h/Arcana---UI-Study--Community-?node-id=0-1&p=f&t=UcpUZFqUdi7bfXDM-0)

## Requisitos Técnicos

1.  **Configuração no `uno.config.ts`:**
    *   **Paleta de Cores:** Analisar o Figma e definir as cores primárias, secundárias, de fundo, de destaque (accent) e neutras no tema do UnoCSS. O esperado é um tema escuro (dark mode) com cores vibrantes e "mágicas" para os detalhes.
    *   **Fontes (Typography):** Definir as fontes, tamanhos e pesos para títulos, corpo de texto e outros elementos, conforme o estilo apresentado no Figma.

2.  **Criação de Componentes Svelte Reutilizáveis:**
    *   Criar uma pasta `src/lib/components/ui` (ou similar) para abrigar os componentes do Design System.
    *   Implementar os seguintes componentes base, capturando o estilo "Arcana":
        *   `Button.svelte`: Com variantes para ações primárias, secundárias e de texto. Deve incluir os estilos de borda, brilho e hover vistos no Figma.
        *   `Card.svelte`: Um componente de contêiner genérico que sirva de base para painéis, inventário, etc.
        *   `Input.svelte`: Campos de texto estilizados.
        *   `Modal.svelte`: Uma janela modal base para diálogos e pop-ups.

3.  **Iconografia:**
    *   Pesquisar e escolher uma biblioteca de ícones (ex: `iconify`) que se alinhe com a estética de fantasia e misticismo do design.

## Instruções para o Programador

*   O objetivo não é uma cópia exata, mas **capturar a essência e a atmosfera** do design "Arcana".
*   Todos os componentes devem ser flexíveis e reutilizáveis, usando `props` para controlar suas variantes e conteúdo.
*   Toda a UI futura do projeto **deve** ser construída utilizando este Design System.

## Critérios de Aceitação
*   As cores e fontes do Design System estão configuradas no `uno.config.ts`.
*   Os componentes Svelte base (`Button`, `Card`, `Input`, `Modal`) foram criados e refletem a estética da referência.
*   As novas telas (Criação de Personagem, Praça Central) devem ser refatoradas para utilizar os componentes do novo Design System.
