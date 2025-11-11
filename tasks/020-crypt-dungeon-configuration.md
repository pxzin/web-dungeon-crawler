# Tarefa: 020 - Configuração da Masmorra (A Cripta dos Inquietos)

**Prioridade:** Média
**Tipo:** Conteúdo

## Objetivo
Configurar a segunda masmorra jogável, "A Cripta dos Inquietos", utilizando os monstros e itens recém-criados.

## Requisitos Funcionais

1.  **Arquivo de Configuração da Masmorra:**
    *   Criar um novo arquivo de configuração em `src/lib/content/dungeons/restless_crypt.ts`.
    *   Definir o objeto de configuração para a nova masmorra.

2.  **Definição dos Parâmetros:**
    *   `id`: `"restless_crypt"`
    *   `name`: `"A Cripta dos Inquietos"`
    *   `description`: `"Corredores empoeirados onde os mortos não descansam. O ar é gélido e pesado com energia necromântica."`
    *   `recommendedLevel`: `{ min: 5, max: 10 }`
    *   `floorCount`: 4
    *   `possibleMonsters`: `['skeleton_warrior', 'wraith', 'zombie_hulk']`
    *   `boss`: `'acolyte_necromancer'`

3.  **Integração com a Praça Central:**
    *   Adicionar a "Cripta dos Inquietos" à lista de masmorras disponíveis na UI da Praça Central, aparecendo abaixo da "Caverna dos Goblins".

## Critérios de Aceitação
*   O arquivo de configuração para a "Cripta dos Inquietos" foi criado.
*   A nova masmorra pode ser selecionada e acessada a partir da Praça Central.
*   Dentro da masmorra, os inimigos e o chefe correspondem aos monstros mortos-vivos definidos.
*   As recompensas obtidas na masmorra estão de acordo com as novas tabelas de loot.
