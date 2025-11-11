# Tarefa: 030 - Revisão e Ajuste do Backlog Pós-Pivô Phaser

**Prioridade:** Altíssima
**Tipo:** Gerenciamento de Projeto / Refatoração de Backlog

## Objetivo
Revisar e ajustar todas as tarefas existentes no backlog, tanto concluídas quanto pendentes, para refletir a nova arquitetura de UI baseada em Phaser 2D. Esta tarefa garantirá que o `INDEX.md` e os arquivos de tarefas individuais estejam alinhados com a decisão de migrar toda a UI para o Phaser.

## Requisitos

1.  **Reavaliar Tarefas de UI Concluídas:**
    *   Identificar todas as tarefas de UI que foram marcadas como ✅ Concluídas (ex: 001, 002, 007, 009, 010).
    *   Alterar o status dessas tarefas para `⏳ Pendente (Reimplementar em Phaser)`.
    *   Atualizar as descrições dessas tarefas no `INDEX.md` e nos arquivos `.md` individuais para indicar claramente que a implementação original em HTML/CSS será substituída por uma versão em Phaser.

2.  **Ajustar Tarefas de UI Pendentes:**
    *   Identificar todas as tarefas de UI que estão `⏳ Pendente` (ex: 014, 015, 016, 017, 020, 025, 026, 027).
    *   Atualizar as descrições dessas tarefas no `INDEX.md` e nos arquivos `.md` individuais para especificar que a implementação da UI será feita em Phaser.

3.  **Verificar Tarefas de Sistema/Conteúdo:**
    *   Confirmar que as tarefas de sistema e conteúdo (ex: 003, 004, 005, 006, 008, 011, 012, 013, 018, 019, 022, 023, 024, 028) não precisam de alterações fundamentais em sua lógica de back-end, mas que seus pontos de integração com a UI serão via Phaser.

4.  **Atualizar Prioridades e Dependências:**
    *   Ajustar prioridades e dependências conforme necessário. A Tarefa 029 (Pivô Tecnológico Phaser) será o principal bloqueador para todas as reimplementações de UI.

## Critérios de Aceitação

*   O arquivo `tasks/INDEX.md` reflete com precisão o novo escopo de trabalho pós-migração para Phaser.
*   Todas as tarefas de UI estão claramente marcadas para reimplementação em Phaser.
*   O backlog está organizado e pronto para o programador iniciar a Tarefa 029, sabendo o que virá em seguida.
