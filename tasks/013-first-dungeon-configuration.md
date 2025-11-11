# Tarefa: 013 - Configuração da Primeira Masmorra (Caverna dos Goblins)

**Prioridade:** Alta
**Tipo:** Conteúdo

## Objetivo
Utilizar o sistema de geração de masmorras (Tarefa 004) e os dados recém-criados de monstros e itens (Tarefas 011 e 012) para configurar e implementar a primeira masmorra jogável do jogo.

## Requisitos Funcionais

1.  **Arquivo de Configuração da Masmorra:**
    *   Criar um novo arquivo de configuração de masmorra em `src/lib/content/dungeons/goblin_cave.ts`.
    *   Neste arquivo, definir um objeto de configuração para a "Caverna dos Goblins" que será lido pelo sistema de geração de masmorras.

2.  **Definição dos Parâmetros:**
    *   **Identidade:**
        *   `id`: `"goblin_cave"`
        *   `name`: `"Caverna dos Goblins"`
        *   `description`: `"Uma caverna úmida e escura, infestada de goblins saqueadores."`
    *   **Dificuldade:**
        *   `recommendedLevel`: `{ min: 1, max: 5 }`
    *   **Estrutura:**
        *   `floorCount`: 3
    *   **Conteúdo:**
        *   `possibleMonsters`: `['goblin_scout', 'goblin_brute', 'goblin_shaman']` (IDs dos monstros da Tarefa 011).
        *   `boss`: `'goblin_king'` (ID do chefe).

3.  **Integração com a Praça Central:**
    *   Modificar a UI da Praça Central (Town Square) para que a "Caverna dos Goblins" apareça como uma masmorra selecionável.
    *   Ao ser selecionada, o jogo deve usar o sistema de gerenciamento de estado (Tarefa 003) para iniciar a sessão na masmorra, passando a configuração da "Caverna dos Goblins" para o gerador de masmorras.

## Critérios de Aceitação

*   O arquivo de configuração para a "Caverna dos Goblins" foi criado e está preenchido corretamente.
*   A nova masmorra está listada e pode ser acessada a partir da Praça Central.
*   Ao entrar na masmorra, os monstros encontrados são os goblins definidos na Tarefa 011.
*   Ao derrotar os monstros, o loot recebido corresponde à tabela de loot definida na Tarefa 012.
*   O chefe da masmorra é o "Rei Goblin".
