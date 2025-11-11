# Tarefa: 003 - Sistema de Gerenciamento de Estado do Jogador

## Objetivo
Implementar um sistema robusto no lado do servidor para gerenciar o estado de atividade do jogador. O sistema deve prevenir que o jogador execute ações conflitantes simultaneamente (ex: estar em uma masmorra e em uma loja ao mesmo tempo, usando abas diferentes do navegador).

## Requisitos Técnicos

1.  **Definição do Estado do Jogador:**
    *   Criar um enum ou tipo `PlayerActivityState` no lado do servidor.
    *   Estados sugeridos: `IDLE` (na Praça Central), `IN_DUNGEON`, `IN_COMBAT`, `SHOPPING`, `CRAFTING`.

2.  **Serviço de Gerenciamento de Estado:**
    *   Desenvolver um `PlayerStateService` (ou similar) no lado do servidor (`src/lib/server/`).
    *   Este serviço será o "single source of truth" (fonte única da verdade) para o estado do jogador.
    *   Para o protótipo, ele pode usar um `Map` em memória para associar o ID da sessão do jogador ao seu `PlayerActivityState`. Ex: `Map<UserSessionID, PlayerActivityState>`.

3.  **Validação de Rota com `load` do SvelteKit:**
    *   Para cada rota que representa uma atividade exclusiva (ex: `/dungeon`, `/shop`, `/craft`), utilizar a função `load` em `+page.server.ts`.
    *   Dentro da função `load`, o servidor deve:
        a. Obter o ID da sessão do jogador.
        b. Chamar o `PlayerStateService` para verificar se o jogador pode transicionar para o novo estado (ex: de `IDLE` para `IN_DUNGEON`).
        c. **Se a transição for válida:** O serviço atualiza o estado do jogador e a função `load` permite que a página seja carregada.
        d. **Se a transição for inválida (jogador já está ocupado):** A função `load` deve usar a função `redirect` do SvelteKit para enviar o jogador de volta para a rota que corresponde ao seu estado atual (ex: se o estado é `IN_DUNGE-ON`, redirecionar para `/dungeon`).

4.  **Atualização de Estado:**
    *   É crucial implementar a lógica para redefinir o estado do jogador para `IDLE` quando ele conclui uma atividade (ex: sai da masmorra, fecha a loja). Isso geralmente será feito através de uma ação de formulário (`form action`) ou um endpoint de API que o cliente chama.

## Exemplo de Fluxo (Navegando para `/dungeon`):

1.  O jogador, com estado `IDLE`, clica no portal para a masmorra na Praça Central.
2.  O navegador tenta navegar para `/dungeon`.
3.  A função `load` em `src/routes/dungeon/+page.server.ts` é executada no servidor.
4.  A função `load` chama `PlayerStateService.requestStateChange(session.id, 'IN_DUNGEON')`.
5.  O serviço verifica que o estado atual é `IDLE`, permite a mudança, atualiza o estado para `IN_DUNGEON` e retorna sucesso.
6.  A página `/dungeon` é renderizada.
7.  Se o jogador abrir uma nova aba e for para `/shop`, a função `load` de `/shop` fará uma requisição similar. O serviço verá que o estado é `IN_DUNGEON`, negará a transição, e a função `load` redirecionará o usuário para `/dungeon`.

## Critérios de Aceitação

*   O estado de atividade de cada jogador é rastreado no servidor.
*   Um jogador não consegue acessar duas rotas de atividade exclusiva ao mesmo tempo.
*   O redirecionamento para a atividade atual funciona corretamente.
*   O estado do jogador é resetado para `IDLE` após a conclusão de uma atividade.
