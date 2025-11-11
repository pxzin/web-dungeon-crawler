# Tarefa: 010 - Refatorar Componente de Retrato

**Prioridade:** Baixa
**Tipo:** Refactoring / Melhoria Técnica

## Objetivo
Refatorar o componente `Portrait.svelte` para que ele aceite o objeto de personagem completo (`Character`) como propriedade, em vez de receber múltiplos atributos separados (como `portraitId`). Isso irá simplificar sua utilização, melhorar o encapsulamento e facilitar futuras expansões.

## Justificativa Técnica
Atualmente, o design da tarefa 009 implica em um uso como `<Portrait portraitId={...} />`. Ao passar o objeto `character` inteiro, o componente `Portrait` se torna responsável por extrair a informação que precisa (`character.portraitId`). Isso torna o código mais limpo e robusto. Além disso, se no futuro quisermos que o componente exiba um indicador de status ou o nível do personagem sobre o retrato, ele já terá acesso a todo o objeto `character`.

## Requisitos Técnicos

1.  **Alterar as Propriedades do Componente:**
    *   Modificar o componente `src/lib/components/ui/Portrait.svelte`.
    *   A propriedade principal deve ser alterada de `export let portraitId: string;` para `export let character: Character;` (assumindo a existência de um tipo `Character` definido no sistema).
    *   A lógica interna do componente deve ser ajustada para acessar `character.portraitId` para determinar qual imagem exibir.

2.  **Atualizar o Uso do Componente:**
    *   Encontrar todas as instâncias onde o componente `<Portrait />` é utilizado no código.
    *   Atualizar essas instâncias para passar o objeto de personagem completo. Exemplo: `<Portrait {character} />`.
    *   Isso impactará principalmente a **Praça Central** e o **Painel de Depuração**.

## Critérios de Aceitação

*   O componente `Portrait.svelte` agora aceita a propriedade `character` do tipo `Character`.
*   Todas as utilizações do componente no projeto foram atualizadas para a nova API.
*   Os retratos dos personagens continuam sendo exibidos corretamente em todas as partes da UI.
