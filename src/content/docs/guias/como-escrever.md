---
title: Como escrever páginas
description: Guia rápido de Markdown para a equipe.
sidebar:
  order: 2
---

Toda página começa com um bloco no topo (entre `---`) com o **título** e uma **descrição**:

```md
---
title: Título da página
description: Uma frase explicando a página.
---
```

## Formatação básica

- **Negrito** com `**texto**`
- *Itálico* com `*texto*`
- `Código` com `` `texto` ``
- Links: `[texto](https://exemplo.com)`
- Listas com `-` ou numeradas com `1.`
- Títulos de seção com `##` e subseções com `###`

## Avisos

Use blocos destacados para chamar atenção. O texto entre colchetes vira o título do bloco (é opcional):

```md
:::note[Resumo]
Esta é uma nota.
:::
```

:::note
Esta é uma nota (`:::note`).
:::

:::tip
Esta é uma dica (`:::tip`).
:::

:::caution
Esta é uma atenção (`:::caution`).
:::

## Tabelas

```md
| Item | Descrição |
| ---- | --------- |
| A    | Primeiro  |
| B    | Segundo   |
```

Para quebrar a linha dentro de uma célula, use `<br>`.

## Campos a preencher

Quando um dado ainda não existe, escreva entre `<mark>` e `</mark>`. Ele aparece destacado em vermelho:

```md
Computador embarcado: <mark>[ex.: Jetson Orin Nano]</mark>
```

Resultado: Computador embarcado: <mark>[ex.: Jetson Orin Nano]</mark>

## Imagens

Coloque a imagem na pasta `imagens/` da área e use um caminho que começa com `./`:

```md
![Descrição da imagem](./imagens/nome-da-imagem.png)
```

## Fórmulas

Fórmulas usam a notação do LaTeX. Entre `$` no meio do texto, ou entre `$$` em um bloco separado:

```md
A precisão é $\frac{TP}{TP + FP}$.

$$
\text{IoU} = \frac{|A \cap B|}{|A \cup B|}
$$
```

Resultado: a precisão é $\frac{TP}{TP + FP}$.

## Histórico de versões

**Toda página termina com esta seção.** Copie o bloco abaixo para o final de uma página nova:

```md
## Histórico de versões

| Versão | Descrição | Data da edição | Editor |
| --- | --- | --- | --- |
| 1.0 | Criação da página. | DD/MM/AAAA | Seu nome |
```

A cada edição relevante, **acrescente uma linha** no final da tabela (não apague as anteriores):

- **Versão:** correção pequena sobe o número depois do ponto (1.0 → 1.1); mudança grande de conteúdo sobe o número antes do ponto (1.1 → 2.0).
- **Descrição:** o que mudou, em uma frase.
- **Data da edição:** no formato DD/MM/AAAA.
- **Editor:** quem fez a edição.

## Criando uma nova página

1. Crie um arquivo `.md` na pasta da área (ex.: `src/content/docs/visao-computacional/`).
2. Preencha o `title` e a `description` no topo.
3. Escreva o conteúdo.
4. Termine com a tabela de **Histórico de versões**.
5. Salve. A página entra automaticamente no menu da área.

## Histórico de versões

| Versão | Descrição | Data da edição | Editor |
| --- | --- | --- | --- |
| 1.0 | Criação do guia de Markdown. | 04/11/2026 | Luiz |
| 1.1 | Inclusão de campos a preencher, imagens, fórmulas e do modelo de histórico de versões. | 04/11/2026 | Luiz |
