# Personal Website

Static personal site built with [Astro](https://astro.build), Tailwind, and Markdown. Deploys to Cloudflare Pages.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the built dist/
npx astro check    # type-check .astro files
```

## Editing content

| What | Where |
|---|---|
| Name, email, social links, nav | `src/consts.ts` |
| Projects | `src/data/projects.ts` — one object per project |
| Blog posts | `src/content/blog/*.md` — frontmatter: `title`, `description`, `date`, `tags`, `draft` |
| Resume | `src/data/resume.tex` (Jake Gutierrez LaTeX template) — `/resume` is parsed from it by `src/lib/parseResume.ts`; also replace `public/resume.pdf` |
| Home page intro | `src/pages/index.astro` |
| Site URL (sitemap/RSS/OG) | `site:` in `astro.config.mjs` and `public/robots.txt` |
| Social share image | `public/og-image.png` (1200×630) |

Posts with `draft: true` are excluded from the build.

## Deploy

See [PLAN.md](PLAN.md) for the full setup: Name.com `.dev` domain (cheickamadou.dev) via GitHub Student Pack → Cloudflare Pages (framework preset Astro, build `npm run build`, output `dist`).
