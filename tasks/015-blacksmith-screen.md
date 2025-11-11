# Tarefa: 015 - Tela do Ferreiro (Blacksmith)

**Prioridade:** Média
**Tipo:** Feature

## Objetivo
Implementar a interface e a funcionalidade do Ferreiro, onde os jogadores podem reparar a durabilidade de seus equipamentos.

## Requisitos Funcionais

1.  **Interface de Reparo:**
    *   A tela deve exibir uma lista de todos os itens do jogador (equipados e no inventário) que não estão com a durabilidade máxima.
    *   Para cada item, exibir seu ícone, nome, durabilidade atual/máxima e o custo para repará-lo.
    *   O custo deve ser calculado pela lógica já implementada no sistema de durabilidade (Tarefa 006).

2.  **Ações do Jogador:**
    *   Um botão "Reparar" para cada item individualmente.
    *   Um botão "Reparar Tudo" que repara todos os itens danificados de uma só vez, somando os custos.
    *   Ao confirmar um reparo, o ouro do jogador deve ser deduzido e a durabilidade do(s) item(ns) restaurada.

3.  **Feedback Visual:**
    *   Itens devem ser removidos da lista de reparo assim que forem consertados.
    *   O total de ouro do jogador deve ser atualizado na UI.

## Nota
A funcionalidade de *criação* de itens (crafting) será adicionada aqui no futuro. O foco desta tarefa é exclusivamente no **reparo**.

## Critérios de Aceitação
*   O jogador pode acessar o Ferreiro a partir da Praça Central.
*   A lista de itens danificados e os custos de reparo são exibidos corretamente.
*   As funções "Reparar" e "Reparar Tudo" funcionam, deduzem o ouro e restauram a durabilidade.
