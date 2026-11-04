# Documentação do Projeto

Site de documentação feito com [Starlight](https://starlight.astro.build) (Astro).
Todo o conteúdo é escrito em **Markdown**, em `src/content/docs/`.

## Para quem escreve (sem programar)

Edite ou crie arquivos `.md` em `src/content/docs/guias/`. Veja o guia
"Como escrever páginas" dentro do próprio site.

## Para quem desenvolve

Requer Node.js 22.23.4 ou superior.

```bash
npm install        # instala as dependências (uma vez)
npm run dev        # servidor local em http://localhost:4321
npm run build      # gera o site final em ./dist
```

## Publicar no GitHub Pages

1. Em `astro.config.mjs`, `site` e `base` apontam para `luizfaria1989.github.io/titans-rover`. Ao migrar para a organização, troque o usuário pelo nome da organização.
2. No GitHub: **Settings → Pages → Source: GitHub Actions**.
3. Em **Settings → Environments → github-pages → Deployment branches**,
   permita a branch `docs` (por padrão só a branch principal pode publicar).
4. A cada push na branch `docs`, o workflow `.github/workflows/deploy.yml`
   publica o site automaticamente.

> A documentação fica **só na branch `docs`**. O código do projeto fica na `main`.
