# vicentejorquera.dev — agent notes

Personal portfolio + blog. **Astro 7**, **MDX**, **Tailwind 4**, no React. Deployed on Cloudflare Pages.
i18n: English at `/` (default), Spanish under `/es/`. Content lives in `src/content/{blog,products}/{en,es}/*.mdx`.
Design tokens (olive on warm paper, `.dark` class on `<html>`) are in `src/styles/global.css`; fonts: Fraunces (display), Inter, JetBrains Mono.

```
npm run dev        # http://localhost:4321
npm run build      # static build to dist/ — run it after integrating a diagram
```

## Diagrams (interactive, made with the `diagram-specialist` agent)

Diagrams are produced by the **dgm tools** (diagrams-maker, available as the `dgm_*` MCP tools and the `diagram-author` skill) and
shown with `src/components/Diagram.astro`. The site does **not** depend on dgm at build time: it only reads the exported files.

### Files (per language)

| File | What | Who writes it |
|---|---|---|
| `src/diagrams/<name>.<lang>.diagram.yaml` | **source** — edit this, then re-export | `dgm_write_diagram` |
| `src/diagrams/<name>.<lang>.svg` | **interactive** export (hover/click, animated flow, steps, tooltips) — what `<Diagram>` shows | `dgm_render_diagram` `format=svg`, `save_to` |
| `public/diagrams/<name>.<lang>.png` | static export (social cards, RSS, fallbacks) | `dgm_render_diagram` `format=png`, `save_to`, `scale` 2 |

- `<name>`: kebab-case and specific (`meetpulse-architecture`, not `diagram1`). `<lang>`: `en` or `es`.
- **Both languages**: this is a bilingual site. For a post that exists in `en` and `es`, ask whether to produce both; keep the **same node ids**
  and translate labels, sublabels, notes, steps and captions (`…en…` / `…es…`). If only one language is asked, say the other is pending.
- Export the **SVG as interactive** (do not pass `static=true`).
- Rendering defaults come from `dgm.config.json` → theme **`portfolio`** (`themes/portfolio.theme.yaml`: site colours, light + dark).
  Don't pass `theme`/`mode` unless the user asks. Leave `mode=auto`, `font=mixed`. Aim for ≈ 1.5–3.5 : 1 proportions (the render tool
  reports it) and add `variants: { narrow: {} }` only if the user wants a phone-specific layout (the component shows the single wide SVG,
  scrolling sideways under 640 px and offering a full-screen viewer).
- Official Azure/AWS icons are local only (`.dgm/icons`, `icons-inbox/` are git-ignored here). Never commit them.

### Integrating a diagram into a page — ASK WHERE

After exporting, **do not guess the location silently**. Ask the user, in one short message:

1. **Which file** (e.g. `src/content/blog/en/meetpulse-desktop-how-its-built.mdx`) and **where** — a line number, or "after the heading X",
   or "replace the figure Y". If they give a line, use it.
2. If they have no preference, propose **1–2 concrete spots** (quote the heading/paragraph) and let them choose.
3. If the post exists in the other language, ask for the equivalent spot there (or whether to do it later).

Edit **only after they confirm**, touch nothing else in the file, and keep the prose as is. Existing `<Image>` figures (webp) and Mermaid
blocks are legacy: leave them unless the user asks to replace them.

In MDX (path depth is the same as the existing `astro:assets` imports):

```mdx
import Diagram from '../../../components/Diagram.astro';

<Diagram name="meetpulse-architecture" caption="Figure 1. How the pieces talk to each other." />
```

(`name` has no extension and no language suffix: `<Diagram>` picks `<name>.<lang>.svg` for the page's locale and falls back to `<name>.svg`.
Put the `import` with the other imports at the top, once per file; reuse it for every diagram in that file.)
Optional props: `lang="es"`, `minWidth={520}`, `maxWidth="720px"`. For a static image instead, use
`<img src="/diagrams/<name>.<lang>.png" alt="…" loading="lazy" />` inside a `<figure>`.

### After integrating

1. Run `npm run build`; fix any error (a wrong `name` lists the available diagrams).
2. Tell the user the page URL to check (`npm run dev` → `/blog/<slug>/` or `/es/blog/<slug>/`) and what to look at (hover a node, click to pin,
   the step buttons if the diagram has steps, dark mode, a narrow window).
3. Final summary: files created/changed, the spot used, and the assumptions made.
