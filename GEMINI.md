# AGENT MEMORY - Organização do Projeto
## Agente: Copilot (Organizador)

### 📋 Função Principal
- **Papel**: Organizador e coordenador do projeto
- **Responsabilidades**: 
  - Estruturação do projeto
  - Definição de arquitetura
  - Documentação
  - Planejamento de tarefas
  - Controle de qualidade
  - Coordenação com Claude.AI (programador)

---

## 🏗️ Estrutura de Desenvolvimento
- **Organizador**: Copilot (este agente)
- **Programador**: Claude
- **Metodologia**: Desenvolvimento ágil com documentação contínua

---

## 📝 Decisões Organizacionais

### Histórico do Projeto e Pivô Tecnológico

-   **Fase 1 (HTML/CSS/SvelteKit UI):** O projeto iniciou com a UI sendo desenvolvida em SvelteKit utilizando HTML/CSS e UnoCSS. Diversas funcionalidades foram implementadas nesta fase.
-   **Pivô Tecnológico (Phaser 2D UI):** Devido a problemas de interface e UX com HTML/CSS, foi tomada a decisão de migrar **toda a interface de usuário** para ser renderizada exclusivamente dentro de um canvas Phaser 2D. O SvelteKit passará a atuar como um "host" para o jogo Phaser.

### Funcionalidades Implementadas (HTML/CSS - Necessitam Reimplementação em Phaser)

As seguintes funcionalidades foram concluídas na fase HTML/CSS e agora precisarão ser reimplementadas no Phaser:

*   **Ferramentas de Desenvolvimento (Debug Panel):** Painel de depuração com inspetores de personagem, persistência e ações rápidas.
*   **Tela de Criação de Personagem:** Seleção de classe, distribuição de atributos, nome, seleção de retrato.
*   **Hub da Praça Central:** Layout completo com info do jogador, retrato, cards de áreas interativas, navegação.
*   **Sistema de Persistência:** Camada flexível para salvar/carregar dados (LocalStorage).
*   **Sistema de i18n:** Suporte a múltiplos idiomas (EN/PT-BR).
*   **Design System Arcana:** Paleta de cores, tipografia, componentes UI (botões, cards, inputs, modais, ícones, retratos).
*   **Componente de Troca de Idioma (Language Switcher):** Componente UI para alternar idiomas.
*   **Mapeamento de Ícones (Spritesheet):** Sistema para exibir ícones individuais de um spritesheet.
*   **Seleção de Retrato do Personagem:** UI para escolher retratos e componente `Portrait`.
*   **Refatoração do Componente Portrait:** Para aceitar o objeto `Character` completo.

### Funcionalidades Pendentes (Serão Implementadas Diretamente em Phaser)

As seguintes funcionalidades serão implementadas diretamente na nova arquitetura Phaser:

*   **Definição de Dados de Monstros Iniciais (Goblins):** Estrutura e dados para os primeiros inimigos.
*   **Definição de Dados de Itens Iniciais:** Estrutura e dados para itens e tabelas de loot.
*   **Configuração da Primeira Masmorra (Caverna dos Goblins):** Configuração da masmorra usando os dados acima.
*   **Tela de Inventário e Equipamentos:** UI para gerenciar itens e equipamentos.
*   **Tela do Ferreiro:** UI para reparo de itens.
*   **Tela da Taverna:** UI para missões (placeholder).
*   **Tela do Mercado:** UI para compra e venda de itens.
*   **Definição de Dados de Monstros (Cripta):** Monstros para a segunda masmorra.
*   **Definição de Dados de Itens (Cripta):** Itens e loot para a segunda masmorra.
*   **Implementação da Masmorra (Cripta dos Inquietos):** Experiência jogável completa da segunda masmorra (exploração e combate UI).
*   **Ajustes de Exploração:** Encontros garantidos e busca contínua.
*   **Ajustes de Combate:** Ataque básico automático e seleção automática de alvo.
*   **Sistema de Avaliação de Equipamento (ER):** Cálculo e exibição do poder dos equipamentos.
*   **Refatorar Combate: Ataques Básicos por Classe:** Ajuste de escalonamento de dano.
*   **Revisão e Balanceamento de Combate:** Ajuste de fórmulas e parâmetros.
*   **Revisão e Balanceamento de Dados de Monstros:** Ajuste de stats de monstros.

### Estrutura de Arquivos (Proposta Inicial)
```
/
├── docs/                    # Documentação
│   ├── GDD.md              # Game Design Document
│   ├── GEMINI.md     # Memória do Agente Organizador
│   └── CLAUDE.md    # Memória do Claude Programador
├── src/                    # Código fonte
├── assets/                 # Recursos do jogo
├── tests/                  # Testes
└── config/                # Configurações
```

### 🔧 Tecnologias
- **Linguagem**: TypeScript
- **Gerenciador de Pacotes**: pnpm
- **Framework UI**: Phaser 2D (novo)
- **Host da Aplicação**: SvelteKit (mantido)

---

## 📋 Metodologia de Trabalho

### Fluxo de Trabalho
1. **Agente** define requisitos e estrutura
2. **Claude** implementa funcionalidades
3. **Agente** revisa e sugere melhorias
4. **Claude** refina implementação
5. Ciclo se repete até conclusão

### Comunicação
- Usar arquivos de memória para manter contexto
- Documentar todas as decisões importantes
- Revisar progresso regularmente

---
