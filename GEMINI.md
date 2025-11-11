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
