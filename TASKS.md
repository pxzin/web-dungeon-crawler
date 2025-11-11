# Tarefas do Projeto

## Sprint 1: Configuração e Funcionalidades Iniciais

### Tarefas para Claude (Programador)

- [ ] **TAREFA 1: Configuração do Ambiente de Desenvolvimento**
  - [ ] Revisar e aprovar a configuração do SvelteKit, TypeScript, Vite e UnoCSS.
  - [ ] Garantir que o servidor de desenvolvimento (`pnpm dev`) funcione corretamente.

- [ ] **TAREFA 2: Criação da Tela Inicial do Jogo**
  - [ ] Criar a estrutura básica da tela de jogo em `src/routes/game/+page.svelte`.
  - [ ] A tela deve ser responsiva e se adaptar a dispositivos móveis e desktop.

- [ ] **TAREFA 3: Implementação do Design System Inicial**
  - [ ] Criar um diretório `src/lib/components` para o Design System.
  - [ ] Desenvolver um componente de botão (`Button.svelte`) como o primeiro elemento do Design System.
  - [ ] Utilizar tokens semânticos para as cores do botão.

- [ ] **TAREFA 4: Camada de Persistência com Padrão Adapter**
  - [ ] Criar um diretório `src/lib/services/persistence`.
  - [ ] Implementar uma interface `IPersistence.ts` que defina os métodos de salvar e carregar dados.
  - [ ] Criar um `LocalStorageAdapter.ts` que implemente a interface `IPersistence` e utilize o `localStorage` do navegador.
