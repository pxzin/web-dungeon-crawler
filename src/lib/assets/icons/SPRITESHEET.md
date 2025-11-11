# RPG Icons Spritesheet

## Arquivo Necessário

Este sistema espera um arquivo de spritesheet localizado em:

```
src/lib/assets/icons/rpg-icons.png
```

## Especificações do Spritesheet

- **Formato:** PNG com transparência
- **Grid:** 32x32 pixels por ícone
- **Layout:** 16 colunas × N linhas
- **Dimensões:** 512px de largura × (32 × número de linhas)px de altura
- **Exemplo:** Para 10 linhas = 512px × 320px

## Como Obter/Criar

### Opção 1: Usar Assets Existentes
Se você já tem um spritesheet de ícones RPG, coloque-o nesta pasta como `rpg-icons.png`.

### Opção 2: Criar do Zero
1. Use um editor de pixel art (Aseprite, Pixelorama, Piskel)
2. Crie um canvas de 512×320px (ou maior)
3. Desenhe ícones em um grid de 32×32px
4. Exporte como PNG com transparência

### Opção 3: Assets Gratuitos
Procure por "RPG icon spritesheet 32x32" em sites como:
- OpenGameArt.org
- Itch.io (free assets)
- Kenney.nl (CC0 license)

## Mapeamento Atual

O arquivo `icon-map.ts` atualmente mapeia as primeiras **5 linhas** (80 ícones):

- **Row 0:** Hearts & Health (16 ícones)
- **Row 1:** Mana & Magic (16 ícones)
- **Row 2:** Swords (16 ícones)
- **Row 3:** Axes & Hammers (16 ícones)
- **Row 4:** Shields & Armor (16 ícones)

## Placeholder Temporário

Enquanto você não tiver o spritesheet real, o componente `SpriteIcon` mostrará um warning no console mas não causará erros. Você pode:

1. Usar o componente `Icon` (Iconify) como alternativa temporária
2. Criar um spritesheet placeholder simples
3. Comentar o uso de `SpriteIcon` até ter os assets

## Exemplo de Layout Visual

```
[0,0] [0,1] [0,2] [0,3] [0,4] ... [0,15]
[1,0] [1,1] [1,2] [1,3] [1,4] ... [1,15]
[2,0] [2,1] [2,2] [2,3] [2,4] ... [2,15]
...
```

Cada célula = 32×32 pixels

## Validação

Para verificar se o spritesheet está correto:

1. Abra-o em um editor de imagens
2. Ative a grade (grid) de 32×32px
3. Verifique se os ícones estão alinhados corretamente
4. Confirme que as dimensões são múltiplos de 32px

## Próximos Passos

Após adicionar o spritesheet real:

1. Teste o componente em alguma página:
   ```svelte
   <SpriteIcon iconId="sword_gold" size={48} />
   ```

2. Verifique no navegador se o ícone aparece corretamente

3. Se necessário, ajuste o mapeamento em `icon-map.ts`

4. Continue mapeando mais linhas conforme necessário
