# CLAUDE MEMORY - Desenvolvimento Técnico

## Programador: Claude

### 💻 Função Principal

- **Papel**: Desenvolvedor e programador principal
- **Responsabilidades**:
  - Implementação de código
  - Arquitetura técnica
  - Debugging e otimização
  - Integração de sistemas
  - Testes unitários
  - Refatoração

---

## 🔧 Decisões Técnicas

### DIRETRIZ CRÍTICA: PIVÔ TECNOLÓGICO PARA PHASER 2D

-   **Toda a Interface de Usuário (UI) do jogo será implementada exclusivamente em Phaser 2D.**
-   Isso significa que todas as telas, menus, HUDs e componentes de UI, tanto os já implementados em HTML/CSS quanto os futuros, deverão ser desenvolvidos dentro do ambiente Phaser.
-   O SvelteKit passará a ser o "host" para o canvas do Phaser, gerenciando o carregamento do jogo e a navegação entre as "cenas" do Phaser.
-   A componentização (conforme diretriz anterior) deve ser aplicada dentro do Phaser, criando componentes de UI reutilizáveis específicos para o framework.

### Arquitetura (A Definir)

```
Aguardando definições do Agente Organizador
```

### 📝 Padrões de Código

- **Estilo**: A definir (ESLint, Prettier)
- **Nomenclatura**: camelCase para variáveis, PascalCase para classes
- **Comentários**: JSDoc para funções públicas
- **Estrutura**: Modular com separação de responsabilidades

---

## 📋 Metodologia de Desenvolvimento

### Princípios

- **Clean Code**: Código limpo e legível
- **SOLID**: Aplicar princípios quando aplicável
- **DRY**: Don't Repeat Yourself
- **YAGNI**: You Aren't Gonna Need It
- **Testing**: Testes para funcionalidades críticas

### Diretrizes de Implementação

- **Componentização e Reutilização (CRÍTICO):** É de **EXTREMA IMPORTÂNCIA** que todas as partes do código que possam ser reutilizadas sejam componentizadas. Isso inclui, mas não se limita a, elementos de UI, lógica de jogo comum, e utilitários. A repetição de código gera problemas de manutenção e escalabilidade.
    -   **Documentação no Playground:** Cada componente reutilizável deve ser documentado no "playground" (ex: exemplos de uso no README do componente, ou em um Storybook/Playground dedicado) para facilitar sua descoberta e uso por outros desenvolvedores.
- **Design System**: Todos os componentes de UI devem ser criados como parte de um Design System coeso e reutilizável.
- **Tokens Semânticos**: Utilizar tokens semânticos para cores, tipografia, espaçamento e outros elementos de design, permitindo a fácil troca de temas.
- **Mobile-First e Desktop**: O design e a implementação devem sempre considerar a experiência em dispositivos móveis e desktop.
- **Design Patterns**: Aplicar design patterns sempre que apropriado. Por exemplo, usar o padrão Adapter para a camada de persistência, permitindo uma fácil migração de `localStorage` para um banco de dados mais robusto no futuro.
- **Melhores Práticas**: Seguir rigorosamente as melhores práticas de desenvolvimento de software, incluindo os princípios de Programação Orientada a Objetos (POO).

### Fluxo de Desenvolvimento

1.  Receber especificações do Agente.
2.  Planejar arquitetura técnica.
3.  Implementar funcionalidades incrementalmente.
4.  Testar e debugar.
5.  Documentar código.
6.  **Processo de Revisão e Entrega (CRÍTICO):**
    *   **NÃO FAZER COMMITS:** O programador **NÃO DEVE** fazer commits diretamente. Todas as alterações devem ser mantidas em staging.
    *   **Solicitar Revisão:** Quando o programador considerar que uma tarefa (ou parte dela) está concluída e pronta para revisão, ele deve solicitar uma revisão ao Agente Organizador.
    *   **Conteúdo da Solicitação de Revisão:** A solicitação deve incluir:
        *   Um **resumo claro** do que foi implementado.
        *   **Instruções detalhadas** sobre como testar as mudanças.
        *   A confirmação de que o código está em staging, aguardando o commit do Agente.
7.  Reportar progresso ao Agente.

---

## 🐛 Debug e Testes

### Estratégia de Testes

- **Unitários**: Para lógica de negócio
- **Integração**: Para sistemas complexos
- **E2E**: Para fluxos principais
- **Performance**: Para otimizações

### Ferramentas de Debug

- Browser DevTools
- Console logging estratégico
- Performance profiling
- Memory leak detection

---

## 📚 Conhecimento Técnico

### Tecnologias Web para Jogos

- **Canvas API**: Renderização 2D nativa
- **WebGL**: Renderização acelerada por hardware
- **Web Audio API**: Sistema de som
- **GamepadAPI**: Suporte a controles
- **WebSockets**: Para multiplayer futuro

---

## 📝 Notas de Implementação

### Performance

- Usar object pooling para entidades
- Implementar culling para elementos fora da tela
- Otimizar loops e cálculos pesados
- Considerar web workers para processamento

### Compatibilidade

- Suporte para navegadores modernos
- Considerar mobile (touch controls)
- Responsive design
- Fallbacks para recursos não suportados

---

## 💬 Comunicação com Agente Organizador

**Próxima necessidade**: Receber especificações detalhadas do GDD e definições tecnológicas do Agente para iniciar implementação técnica.