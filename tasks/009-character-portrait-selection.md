# Tarefa: 009 - Seleção de Retrato do Personagem

**Prioridade:** Alta
**Tipo:** Feature

## Objetivo
Aprimorar a criação de personagem adicionando uma etapa de seleção de retrato (avatar). Criar um componente `Portrait.svelte` reutilizável para exibir o retrato do jogador de forma consistente em todas as telas do jogo.

## Requisitos Funcionais

1.  **Modificar a Tela de Criação de Personagem:**
    *   Adicionar uma nova seção à tela de criação de personagem (`/character-creation`) para a seleção de retratos.
    *   A interface deve exibir de forma navegável todos os retratos disponíveis no diretório `src/lib/assets/portraits/`.
    *   A ID do retrato selecionado (ex: `portrait_001.png`) deve ser salva junto com os outros dados do personagem no sistema de persistência.

2.  **Componente Reutilizável `Portrait.svelte`:**
    *   Desenvolver um novo componente em `src/lib/components/ui/Portrait.svelte`.
    *   O componente deve aceitar propriedades para customização, como `portraitId` (para saber qual imagem carregar) e `size` (ex: 'small', 'medium', 'large').
    *   Ele será o componente padrão para exibir avatares em todo o jogo.

3.  **Refatoração das Telas Existentes:**
    *   Atualizar a tela da **Praça Central (Town Square)** para usar o novo componente `<Portrait />` para exibir o avatar do jogador.
    *   Atualizar o **Painel de Depuração (Debug Panel)** para também utilizar o componente `<Portrait />`.
    *   Qualquer outra tela que exiba a imagem do personagem deve ser refatorada para usar este componente.

## Instrução para o Programador

**Atenção:** Antes de iniciar o desenvolvimento da interface de seleção de retratos, **solicite ao usuário (pxzin) um layout ou exemplo visual** de como ele imagina essa tela. Isso garantirá que a implementação visual esteja alinhada com a expectativa.

## Critérios de Aceitação

*   O jogador pode escolher um retrato durante a criação do personagem.
*   O ID do retrato escolhido é salvo corretamente.
*   O componente `Portrait.svelte` existe e é utilizado para exibir o avatar do jogador na Praça Central e em outras UIs.
*   O programador confirmou que recebeu e entendeu o layout de referência do usuário.
