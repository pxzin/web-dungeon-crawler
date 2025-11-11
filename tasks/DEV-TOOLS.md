# Tarefa Prioritária: Ferramentas de Desenvolvedor (Debug Panel)

**Prioridade:** ALTA / CONTÍNUA

## Objetivo
Criar um painel de depuração (Debug Panel) acessível no jogo, que permita inspecionar em tempo real o estado da aplicação, os dados de persistência e outras informações vitais. Esta ferramenta é **exclusiva para o ambiente de desenvolvimento**.

## Requisitos Técnicos

1.  **Ativação:**
    *   O painel só deve ser montado e visível se uma variável de ambiente estiver ativa (ex: `VITE_DEV_MODE=true` no arquivo `.env`).
    *   O código do painel não deve ser incluído no build de produção.

2.  **Funcionalidades do Painel:**
    *   O painel deve ser um componente de UI flutuante ou fixo em um canto da tela, que não interfira com o jogo principal.
    *   Deve conter, no mínimo, as seguintes seções:
        *   **Inspetor de Estado do Jogador:** Exibir o estado de atividade atual do jogador no servidor (ex: `IDLE`, `IN_DUNGEON`, `IN_COMBAT`).
        *   **Inspetor de Persistência:** Mostrar o conteúdo bruto dos dados do jogador salvos no `LocalStorage`. Deve ter um botão para forçar a releitura dos dados.
        *   **Inspetor de Personagem:** Exibir em tempo real os atributos, status (HP, Mana), inventário e outras informações relevantes do personagem.
        *   **(Opcional, mas recomendado) Ações Rápidas:** Botões para executar ações de depuração comuns, como "Adicionar 1000 Ouro", "Restaurar HP/Mana", "Limpar LocalStorage".

## Instrução Contínua para o Programador

**Esta é uma tarefa viva e contínua.**

O programador, **Claude**, é responsável por **manter esta ferramenta de depuração sempre atualizada**. A cada novo sistema ou funcionalidade implementada, as informações relevantes devem ser expostas neste painel.

*   Ao criar o sistema de combate, o estado da luta deve aparecer aqui.
*   Ao adicionar buffs, eles devem ser visíveis aqui.
*   Ao criar a dívida com o curandeiro, ela deve ser mostrada aqui.

Manter esta ferramenta funcional e atualizada é crucial para a agilidade e a qualidade do desenvolvimento.
