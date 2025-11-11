# Tarefa: 001 - Tela de Criação de Personagem

**Prioridade:** Alta
**Tipo:** Feature
**Status:** Pendente (Reimplementar em Phaser)

## Objetivo
Desenvolver a interface de usuário (UI) e a lógica para a tela de criação de personagem, permitindo que o jogador configure seu personagem principal antes de iniciar o jogo. **Esta tela será reimplementada usando Phaser 2D.**

## Requisitos Funcionais

1.  **Seleção de Classe:**
    *   O jogador deve poder escolher uma das classes iniciais definidas no GDD:
        *   Guerreiro
        *   Mago
        *   Ladino
        *   Clérigo
    *   A seleção de uma classe pode pré-popular os atributos com valores base.

2.  **Distribuição de Atributos:**
    *   O jogador terá um número fixo de pontos para distribuir entre os quatro atributos principais:
        *   **Força**
        *   **Agilidade**
        *   **Vitalidade**
        *   **Inteligência**
    *   Deve haver botões de "+" e "-" para alocar e desalocar pontos.
    *   O total de pontos disponíveis deve ser claramente visível.

3.  **Nome do Personagem:**
    *   Um campo de texto para o jogador inserir o nome do personagem.

4.  **Aparência (Placeholder):**
    *   A personalização de aparência será implementada no futuro. Por enquanto, exibir uma imagem de placeholder ou um texto indicando isso.

5.  **Confirmação:**
    *   Um botão "Criar Personagem" ou "Iniciar Aventura".
    *   Ao clicar, os dados do personagem (nome, classe, atributos) devem ser salvos. Conforme o GDD, a persistência inicial será no `LocalStorage`.
    *   Após a criação, o jogador deve ser redirecionado para a tela da "Praça Central".

## Requisitos Técnicos

*   **Framework:** Phaser 2D (para a UI)
*   **Linguagem:** TypeScript
*   **Rota:** A tela deve ser uma rota acessível em `/character-creation` (ou similar), que carregará a cena Phaser correspondente.

## Critérios de Aceitação

*   O jogador consegue selecionar uma classe.
*   O jogador consegue distribuir os pontos de atributo.
*   O jogador consegue definir um nome para o personagem.
*   Ao confirmar, o personagem é salvo no LocalStorage e o jogo navega para a Praça Central.
*   A interface é funcional e visualmente consistente com o Design System Arcana no Phaser.
