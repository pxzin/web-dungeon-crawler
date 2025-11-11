# Tarefa: 007 - Componente de Troca de Idioma (Language Switcher)

**Prioridade:** Média
**Tipo:** Feature

## Objetivo
Desenvolver um componente de UI que permita ao usuário alternar dinamicamente entre os idiomas suportados pelo sistema de i18n (Inglês e Português do Brasil).

## Requisitos Funcionais

1.  **Componente de UI:**
    *   Criar um componente Svelte reutilizável (`LanguageSwitcher.svelte`).
    *   O componente deve apresentar as opções de idioma de forma clara (ex: botões com "EN" e "PT-BR", ou ícones de bandeiras).

2.  **Integração com o Sistema de i18n:**
    *   O componente deve utilizar o serviço de i18n já existente (localizado em `src/lib/i18n/`) para alterar o idioma ativo da aplicação.
    *   A troca de idioma deve ser instantânea, sem a necessidade de recarregar a página.

3.  **Posicionamento na UI:**
    *   Para a implementação inicial, o componente `LanguageSwitcher` deve ser adicionado em um local acessível na tela da **Praça Central (Town Square)**. Uma boa sugestão é no canto da tela ou dentro de um futuro menu de "Opções".

4.  **Persistência:**
    *   A escolha de idioma do usuário deve ser salva utilizando o sistema de persistência para que seja lembrada em sessões futuras.

## Critérios de Aceitação

*   Um componente de UI para troca de idioma está visível na tela da Praça Central.
*   Clicar em uma opção de idioma altera todo o texto da interface para o idioma selecionado.
*   A preferência de idioma do usuário é mantida após recarregar a página.
*   O componente utiliza a arquitetura do sistema de i18n já implementado.
