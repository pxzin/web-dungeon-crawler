#!/bin/bash

# Este script renomeia em lote os arquivos de retratos do formato
# "rpg-character (X).png" para "portrait_XXX.png".

# O diretório onde os arquivos de retratos estão localizados.
PORTRAIT_DIR="src/lib/assets/portraits"

# Verifica se o diretório existe.
if [ ! -d "$PORTRAIT_DIR" ]; then
  echo "Erro: Diretório $PORTRAIT_DIR não encontrado."
  exit 1
fi

# Navega para o diretório para facilitar os comandos.
cd "$PORTRAIT_DIR"

echo "Iniciando a renomeação de arquivos em $PORTRAIT_DIR..."

# Loop para encontrar todos os arquivos que correspondem ao padrão.
for file in rpg-character\ \(*\).png; do
  # Garante que o loop não execute em um padrão vazio se não houver arquivos.
  [ -e "$file" ] || continue

  # Extrai o número de dentro dos parênteses usando 'sed'.
  num=$(echo "$file" | sed -n 's/rpg-character (//;s/).png//p')
  
  # Formata o número com preenchimento de três zeros à esquerda (ex: 1 -> 001).
  new_name=$(printf "portrait_%03d.png" "$num")
  
  # Renomeia o arquivo e imprime a ação na tela.
  echo "Renomeando: '$file'  ->  '$new_name'"
  mv "$file" "$new_name"
done

echo "Renomeação concluída com sucesso."
