// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Envolve cada tabela em <div class="tabela">: a tabela ocupa a largura toda
// e, em telas pequenas, rola para o lado sem quebrar a página.
function rehypeTabelas() {
  const envolver = (node) => {
    if (!node.children) return;
    node.children = node.children.map((filho) => {
      if (filho.type === 'element' && filho.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['tabela'] },
          children: [filho],
        };
      }
      envolver(filho);
      return filho;
    });
  };
  return (tree) => envolver(tree);
}

// Endereço do site no GitHub Pages: https://luizfaria1989.github.io/titans-rover/
// Ao migrar o repositório para a organização, troque "luizfaria1989" pelo nome
// da organização em "site" (e "base", se o nome do repositório mudar).
export default defineConfig({
  site: 'https://luizfaria1989.github.io',
  base: '/titans-rover',
  // Durante o desenvolvimento (npm run dev), pede ao navegador para não guardar
  // cópias das páginas e estilos. Evita o cache teimoso do Safari (Mac e iPhone).
  // Não afeta o site publicado no GitHub Pages.
  vite: {
    plugins: [
      {
        name: 'sem-cache-no-dev',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            res.setHeader('Cache-Control', 'no-store');
            next();
          });
        },
      },
    ],
  },
  // Fórmulas matemáticas em Markdown: $x^2$ (no texto) e $$ ... $$ (em bloco)
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeTabelas],
  },
  integrations: [
    starlight({
      title: 'Equipe Titans · Rover',
      description: 'Documentação do rover da Equipe Titans, escrita em Markdown.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Português', lang: 'pt-BR' },
      },
      customCss: ['katex/dist/katex.min.css', './src/styles/custom.css'],
      components: { Footer: './src/components/Footer.astro' },
      // Cada grupo do menu lateral corresponde a uma pasta em src/content/docs/.
      // Para criar uma área nova, crie a pasta e adicione um bloco aqui.
      sidebar: [
        {
          label: 'Visão Computacional',
          items: [{ autogenerate: { directory: 'visao-computacional' } }],
        },
        {
          label: 'Eletrônica',
          items: [{ autogenerate: { directory: 'eletronica' } }],
        },
        {
          label: 'Software',
          items: [{ autogenerate: { directory: 'software' } }],
        },
        {
          label: 'Controle e Automação',
          items: [{ autogenerate: { directory: 'controle-e-automacao' } }],
        },
        {
          label: 'Mecânica',
          items: [{ autogenerate: { directory: 'mecanica' } }],
        },
        {
          label: 'Energia',
          items: [{ autogenerate: { directory: 'energia' } }],
        },
        { slug: 'ferramentas' },
        {
          label: 'Como contribuir',
          items: [{ autogenerate: { directory: 'guias' } }],
        },
      ],
    }),
  ],
});
