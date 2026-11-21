# vicentejorquera.dev — Portfolio & Blog

Personal portfolio and technical blog of **Vicente Jorquera** — Software Architect, Architecture & AI consulting.

Built with **Astro 7** + **Tailwind CSS 4**. No CMS, no database: content is Markdown/MDX in this repo, everything renders to static files, and it deploys anywhere that serves static sites (Cloudflare Pages).

- **i18n:** English at `/` (primary) and Español at `/es/` — switch anytime with the header toggle
- **Theme:** dark/light, persisted in `localStorage`, respects `prefers-color-scheme`
- **SEO:** per-page canonical + hreflang (`en` / `es` / `x-default`), Open Graph & Twitter cards, JSON-LD (`Person`, `WebSite`, `BlogPosting`), i18n-aware sitemap, RSS for both languages
- **OG images:** generated at build time as PNGs in `/og/<lang>/<slug>.png` (SVG → PNG via `sharp`) — one per blog post, plus a site-wide default
- **Blog tooling:** table of contents from headings (sticky on desktop, collapsible on mobile), estimated reading time, tags with archive pages, code highlighting (dual Shiki themes), Mermaid diagrams (lazy-loaded), dotted-leader editorial lists

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:4321
npm run build      # static build → dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
├── consts.ts                  ⭐ single source of truth: name, URL, email, socials, CF analytics token
├── content.config.ts          # content collection schemas (blog, products)
├── i18n/ui.ts                 # all UI strings, en + es
├── data/
│   ├── certifications.ts      ⭐ your certifications (add one object per credential)
│   └── experience.ts          ⭐ trajectory timeline (work + education)
├── utils/content.ts           # getPosts/getProducts/readingTime/paths/tagSlug
├── components/                # Header, Footer, cards, TOC, home sections, shared page bodies
├── layouts/                   # BaseLayout (SEO/OG/JSON-LD shell), BlogPostLayout
├── content/
│   ├── blog/{en,es}/*.mdx     # ⭐ your articles — one file per post per language
│   └── products/{en,es}/*.mdx # ⭐ product docs for the /products section
└── pages/
    ├── index.astro            # EN home (root)
    ├── …/                     # EN routes (blog, tags, archive, products, certifications)
    ├── es/                    # ES mirror routes
    ├── og/[...path].png.ts    # build-time OG image generator
    └── rss.xml.ts, es/rss.xml.ts
```

## ⚠️ Replace the placeholders

Everything guess-able is marked with `⚠️`. Before publishing, update:

| File | What |
| --- | --- |
| `src/consts.ts` | `email`, `github`, `linkedin`, `cfAnalyticsToken` |
| `src/data/certifications.ts` | real **years**, `verifyUrl`, `credentialId` (+ badge images into `src/assets/certs/`, imported at the top of the file and referenced as `image: myBadge`) |
| `src/data/experience.ts` | org names, periods, bullet points |
| `src/pages/index.astro` family | hero copy lives in `src/i18n/ui.ts` (`hero.*`) — make the headline yours |
| `src/content/products/en/sample-product.mdx` | sample product, `draft: true` — replace with real ones |

Simple test after edits: `npm run build && npm run preview`.

## Writing a blog post

Create `src/content/blog/<lang>/<slug>.mdx`:

```mdx
---
title: "Why I still reach for boring architecture"
description: "One-line summary used for <meta name=\"description\">, OG cards and RSS. Keep it under 220 chars."
pubDate: 2026-11-20
updatedDate: 2026-12-01        # optional
tags: ["architecture", "ai"]  # free-form, lowercase; /tags/<tag>/ is generated automatically
draft: false                  # true hides it from the build
---

Your markdown here. Everything you'd expect works:
```

**What works out of the box**

- **Headings** `##`/`###` — the table of contents is built from them automatically
- **Code blocks** with syntax highlighting (light/dark aware): ` ```ts `, ` ```bash `, etc.
- **Tables** — use GitHub-style pipe tables (they're styled nicely, horizontal scroll on mobile)
- **Images** — always `<Image />` from `astro:assets`: import the file (`import cover from '../../assets/blog/<slug>/cover.png'`) and use `<Image src={cover} … />` (asset folder: `src/assets/blog/<slug>/`). For captions, wrap it in a `<figure>` + `<figcaption>`. Raw `<img>` tags are intentionally not used in this project — Astro optimizes every image through sharp at build time.
- **Mermaid diagrams** — fenced blocks:

  ````
  ```mermaid
  flowchart LR
      A[Client] --> B[Edge] --> C[(DB)]
  ```
  ````

  Mermaid is lazy-loaded only on pages that contain diagrams and re-renders on theme change. For large/complex diagrams, prefer exporting an SVG (Excalidraw, diagrams.net) and referencing it from the post (asset import + `<Image />`).

- **Reading time** — computed from the word count (~230 wpm)
- **Drafts** — `draft: true` in frontmatter keeps it out of the build entirely

**Languages & translations**

- Posts are per-language: `blog/en/my-post.mdx` and/or `blog/es/mi-post.mdx`
- If both exist **with the same slug**, each page hreflangs the other. English gets an ES fallback link to `/es/blog/` when there's no translation
- RSS feeds: `/rss.xml` (EN) and `/es/rss.xml` (ES)

## Interactive diagrams

Diagrams are made with the `diagram-specialist` agent (diagrams-maker tools) and shown with `src/components/Diagram.astro`:
hover/click highlighting, animated flow, steps, light/dark following the site. The site only reads pre-rendered files, so nothing extra
is installed at build time.

```mdx
import Diagram from '../../../components/Diagram.astro';

<Diagram name="meetpulse-architecture" caption="Figure 1. …" />   {/* src/diagrams/<name>.<lang>.svg */}
```

Files: `src/diagrams/<name>.<lang>.diagram.yaml` (source), `src/diagrams/<name>.<lang>.svg` (interactive export),
`public/diagrams/<name>.<lang>.png` (static). Default theme: `themes/portfolio.theme.yaml` (see `dgm.config.json`).
The full conventions — and how the agent asks where to place a diagram — are in [`AGENTS.md`](AGENTS.md).

## Adding a product

Create `src/content/products/<lang>/<slug>.mdx`:

```mdx
---
name: "my-cli"
tagline: "One-line pitch shown on the card."
description: "2–3 sentences shown on the detail page and in OG/meta tags."
stack: ["Rust", "TypeScript"]
repo: "https://github.com/VicenteJ20/my-cli"
download: "https://github.com/VicenteJ20/my-cli/releases/latest"   # or omit
website: "https://my-cli.dev"                                          # or omit
released: 2026-12-01
---

Long-form docs in Markdown — usage, examples, screenshots.
```

Grid card + detail page (`/products/<slug>/`) are generated automatically. Nothing appears until `draft: false` — the section shows a tasteful "Coming soon" empty state until then.

## Adding a certification

Append one object to `certifications` in `src/data/certifications.ts` (import the badge at the top of that file from `src/assets/certs/`). Otherwise the card renders a typographic monogram. Rebuild — done.

## i18n model

| Route | Language |
| --- | --- |
| `/` | English |
| `/es/` | Español |

UI copy lives in `src/i18n/ui.ts` (`ui.en` / `ui.es`). Pages are tiny wrappers around shared components in `src/components/pages/`. The language toggle always links to the *same page* in the other language (falls back to the blog index for untranslated posts).

## SEO & sharing

Every page emits: canonical URL, hreflang alternates, Open Graph (`og:type=website|article`, `og:locale`, image 1200×630), Twitter card, JSON-LD (`Person` + `WebSite` everywhere, plus `BlogPosting` on posts), and is included in `sitemap-index.xml` with `xhtml:link` alternates. `robots.txt` points at the sitemap. Canonical/OG/hreflang/JSON-LD all derive from `src/consts.ts` — change a value once and the whole site follows.

## Deploying (you handle this part)

1. Push this repo to GitHub
2. Cloudflare Pages → **Create a project** → connect the repo
3. Build command: `npm run build` · Output directory: `dist` · Node: 22+
4. **Custom domain** → point `vicentejorquera.dev` to the Pages project (CNAME per Cloudflare instructions). The existing content at the domain will be replaced wholesale — as planned
5. After the domain is live, paste your **Cloudflare Web Analytics** token into `consts.ts` (`cfAnalyticsToken`) and redeploy. The beacon loads only when the token is set

## License

Code: MIT. Content (articles, texts): © Vicente Jorquera, all rights reserved.
