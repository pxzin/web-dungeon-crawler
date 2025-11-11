# Tarefa: 014 - Tela de Inventário e Equipamentos

**Prioridade:** Alta
**Tipo:** Feature

## Objetivo
Desenvolver a interface de usuário (UI) onde os jogadores podem gerenciar seu inventário de itens e equipar/desequipar equipamentos em seu personagem.

## Requisitos Funcionais

1.  **Layout da Tela:**
    *   A tela deve ser dividida em três seções principais: Equipamentos, Inventário e Estatísticas do Personagem.
    *   O local para esta tela provavelmente será a rota já existente `/game/character`.

2.  **Seção de Equipamentos ("Paper Doll"):**
    *   Exibir visualmente os slots de equipamento do personagem (ex: Cabeça, Peito, Pernas, Mão Principal, Mão Secundária, Anel, Amuleto).
    *   Mostrar o ícone do item atualmente equipado em cada slot.
    *   Permitir que o jogador clique (ou arraste) um item para desequipá-lo, movendo-o para o inventário.

3.  **Seção de Inventário:**
    *   Exibir todos os itens que o jogador possui em uma grade.
    *   Para itens empilháveis (como poções), exibir a quantidade.
    *   Permitir que o jogador equipe um item, movendo-o para o slot correspondente.
    *   Permitir que o jogador use um item consumível (ex: poção de cura).
    *   Implementar uma forma de descartar/destruir itens do inventário.

4.  **Seção de Estatísticas:**
    *   Exibir os atributos primários (Força, Agilidade, etc.) e os status de combate derivados (Ataque, Defesa, HP, etc.).
    *   **Crucial:** As estatísticas devem ser atualizadas em tempo real sempre que um item for equipado ou desequipado.

5.  **Detalhes do Item:**
    *   Ao passar o mouse ou clicar em qualquer item (no inventário ou equipado), uma janela de tooltip ou um painel de detalhes deve aparecer, mostrando:
        *   Nome e descrição do item.
        *   Atributos e bônus que ele concede.
        *   Durabilidade atual e máxima.
        *   Valor em ouro.

## Critérios de Aceitação

*   O jogador pode navegar para a tela de inventário a partir da Praça Central.
*   A tela exibe corretamente os itens equipados e os itens no inventário.
*   É possível equipar um item do inventário e desequipar um item em uso.
*   As estatísticas do personagem são atualizadas dinamicamente ao trocar de equipamento.
*   É possível ver os detalhes de qualquer item.
