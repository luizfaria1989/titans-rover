---
title: Como a documentação é organizada
description: Onde fica cada coisa e as regras que valem para todas as páginas.
sidebar:
  order: 1
---

## Áreas

Cada área do projeto tem uma pasta dentro de `src/content/docs/` e aparece como um grupo no menu lateral:

| Pasta | Grupo no menu |
| --- | --- |
| `visao-computacional/` | Visão Computacional |
| `guias/` | Como contribuir |

Para criar uma área nova (por exemplo, `eletronica/`), crie a pasta e peça para alguém adicionar o grupo em `astro.config.mjs`.

## Um documento = uma página

Cada estudo, relatório ou decisão vira **um arquivo `.md`** dentro da pasta da sua área. O índice à direita da página (ou o menu "Nesta página", no celular) é gerado a partir dos títulos `##` e `###`.

As imagens de um documento ficam na subpasta `imagens/` da área, com o nome do documento no início (ex.: `imagens/estudo-yolo-figura-1.png`).

## Regras que valem para todas as páginas

1. **Toda página termina com a tabela "Histórico de versões"**. Veja o modelo em [Como escrever páginas](../como-escrever/#histórico-de-versões).
2. **Campos ainda não preenchidos** ficam destacados em vermelho com `<mark>[texto]</mark>`.
3. **Cada edição relevante gera uma linha nova** na tabela de versões. Não apague as linhas antigas.

## Histórico de versões

| Versão | Descrição | Data da edição | Editor |
| --- | --- | --- | --- |
| 1.0 | Criação da página com a organização das áreas e as regras gerais. | 04/11/2026 | Luiz |
