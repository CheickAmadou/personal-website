# Personal Website — Astro + Cloudflare Pages + free Name.com .dev domain

## Context

This folder is empty — greenfield build. Goal: a personal site (About, Projects, Blog, Resume) on a custom domain at **$0 for year one and ~$15/yr after** (domain renewal only; hosting stays free).

Local tooling confirmed: Node v24.18.1, npm 11.16.0, git 2.45.1. `gh` CLI is not installed — repo creation goes through the GitHub web UI.

Decisions:
- **Stack:** Astro (static, near-zero JS, first-class Markdown for the blog)
- **Domain:** Name.com free `.dev` for 1 year via GitHub Student Pack — **cheickamadou.dev** (registered)
- **Hosting:** Cloudflare Pages (free DNS + auto HTTPS + unlimited bandwidth + PR previews). GitHub Pages stays as a fallback since the repo will be public.
- **Content:** Home/About, Projects, Blog, Resume

---

## Step 1 — Claim the domain (first, since DNS takes up to 24h)

1. Confirm Student Pack is active: https://education.github.com/pack
2. Go to https://nc.me/landing/github and sign in with GitHub.
3. Register **one** `.me` domain, e.g. `cheickamadou.me` or a short variant. Included free for the year: WHOIS privacy and an SSL cert (the SSL is redundant — Cloudflare issues its own).
4. In Namecheap → Domain List → Manage → **turn off auto-renew**, or at least note that renewal is ~$4.88/yr + ICANN fee. Set a reminder ~11 months out.

## Step 2 — Scaffold the Astro project

```bash
npm create astro@latest -- --template minimal --typescript strict .
```

```bash
npx astro add mdx sitemap tailwind
```

```bash
npm run dev
```

## Step 3 — Site structure

Astro 5 conventions (content-collection config lives at `src/content.config.ts` using the `glob()` loader):

```
src/
  layouts/BaseLayout.astro      # <head>, meta/OG tags, nav, footer
  components/                   # Nav, ProjectCard, PostCard, SocialLinks
  pages/
    index.astro                 # Home / About
    projects.astro              # renders from src/data/projects.ts
    resume.astro                # HTML resume + link to /resume.pdf
    blog/index.astro            # post list, newest first
    blog/[...slug].astro        # one post
    rss.xml.js                  # @astrojs/rss feed
  content/blog/*.md             # one Markdown file per post
  data/projects.ts              # typed array: title, description, tags, repoUrl, liveUrl
  content.config.ts             # blog schema: title, date, description, tags, draft
public/
  resume.pdf, favicon.svg, og-image.png
astro.config.mjs                # set `site:` to https://yourdomain.me — needed for sitemap + RSS
```

- Projects are data, not markup — adding one is one object in `projects.ts`.
- Blog frontmatter is zod-validated, so a typo fails the build instead of rendering broken.
- `BaseLayout.astro` owns all SEO: title, description, canonical, OG/Twitter tags via props.
- Seed with one real post and 2–3 real projects so layouts are tested against real content.

## Step 4 — Push to GitHub

1. `git init`; `.gitignore` with `node_modules/`, `dist/`, `.astro/`, `.env`.
2. Create a **public** repo `personal-website` at https://github.com/new.
3. Add remote, commit, push `main`.

## Step 5 — Deploy on Cloudflare Pages

1. Free account at https://dash.cloudflare.com
2. Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Framework preset **Astro**, build command `npm run build`, output dir `dist`. No adapter — fully static.
4. Deploy → live at `*.pages.dev`. Pushes to `main` redeploy; PRs get preview URLs.

## Step 6 — Connect the domain

1. Cloudflare → Add a site → enter the `.me` domain → **Free** plan. Cloudflare shows two nameservers.
2. Namecheap → Domain List → Manage → Nameservers → **Custom DNS** → paste Cloudflare's two nameservers → save.
3. Cloudflare Pages → project → Custom domains → add `yourdomain.me` and `www.yourdomain.me`. DNS records and TLS cert are created automatically.
4. Add a redirect rule so `www` → apex (or the reverse) is canonical.
5. Set `site:` in `astro.config.mjs` to the final URL and push.

Propagation: 1–24h. Until the cert is issued, `https://` may error — expected.

## Step 7 — Polish

- `public/resume.pdf` + HTML resume page
- Real favicon + 1200×630 `og-image.png` so shared links render a card
- Cloudflare Web Analytics (free, cookieless, no consent banner)
- Optional GitHub Action: `astro check` + `astro build` on PRs

---

## Verification

1. **Local:** `npm run dev` → hit `/`, `/projects`, `/blog`, a post, `/resume`, `/rss.xml`.
2. **Build:** `npm run build && npm run preview` — serves real `dist/` output.
3. **Deployed:** check `*.pages.dev`, then the custom domain after DNS resolves.
4. **DNS/TLS:** `nslookup yourdomain.me` returns Cloudflare IPs; `https://` loads clean; `http://` redirects.
5. **Lighthouse:** expect 95+ across the board.
6. **Content loop:** push a throwaway post, confirm it's live within ~2 min, then delete it.

## Cost

| Item | Year 1 | After |
|---|---|---|
| Domain (Namecheap `.me` via Student Pack) | $0 | ~$5/yr |
| Cloudflare Pages hosting + DNS + SSL | $0 | $0 |
| GitHub repo | $0 | $0 |
