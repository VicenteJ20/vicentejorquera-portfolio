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

### Files — `src/diagrams/<project>/<lang>/{editables,assets}/`

```
src/diagrams/
└─ meetpulse-desktop/            ← <project>: one folder per post/product/topic (kebab-case; reuse it for its next diagrams)
   ├─ en/
   │  ├─ editables/solution-flow.diagram.yaml     source — edit this, then re-export
   │  └─ assets/solution-flow.svg                 interactive export (what <Diagram> shows)
   │             solution-flow.narrow.svg         phone export (vertical)
   └─ es/  …same structure…
```

| File | What | Who writes it |
|---|---|---|
| `editables/<diagram>.diagram.yaml` | **source** | `dgm_write_diagram` |
| `assets/<diagram>.svg` | **interactive** export (hover/click, animated flow, steps, tooltips) | `dgm_render_diagram` `format=svg`, `save_to` |
| `assets/<diagram>.narrow.svg` | **phone** export (vertical layout, `variants.narrow`) — `<Diagram>` swaps it in under 640 px | same, plus `variant=narrow` |
| `assets/<diagram>.png`, `assets/<diagram>.static.svg` | **only if the user asks** (static, no animation) | `dgm_render_diagram` `format=png` (`scale` 2) / `svg` `static=true` |

- `<diagram>`: kebab-case and specific (`solution-flow`, not `diagram1`). Embed with `name="<project>/<diagram>"`. Language = folder (`en`, `es`), never in the file name.
- **The animated (interactive) SVG is the product.** Do not generate PNGs or static SVGs by default; **ask once** "¿Quieres además PNG y/o SVG estático?" and only
  create them (into `assets/`) on a yes. Preview PNGs you render to look at belong in the scratchpad/temp, not in the repo.
- **Both languages**: this is a bilingual site. For a post that exists in `en` and `es`, ask whether to produce both; keep the **same node ids**
  and translate labels, sublabels, notes, steps and captions. If only one language is asked, say the other is pending.
- Export the **SVG as interactive** (do not pass `static=true`).
- **Always make the phone version too.** Add `variants.narrow` to the yaml (`nodes.<id>.stackWith: null` to un-stack, shorter labels, `hide`),
  render it with `variant=narrow`, look at the PNG (scratch) and iterate until the canvas is **≤ 520 px wide** (the tool says `phone view` and warns),
  then save it as `<diagram>.narrow.svg`. Same node ids and step order as the wide one, in both languages. `<Diagram>` shows it
  automatically under 640 px (no props needed); the wide one stays for tablets/desktop.
- **Flow animation**: scenarios (`steps`) can light up box by box. The order is derived from the arrows; override with `steps[].sequence` only when needed.
  Speed is the page's choice: `<Diagram stagger={1.5} />` (seconds per box; default 0 = no effect), `hold` = seconds a finished scenario stays (default 1.5).
- Rendering defaults come from `dgm.config.json` → theme **`portfolio`** (`themes/portfolio.theme.yaml`: site colours, light + dark).
  Don't pass `theme`/`mode` unless the user asks. Leave `mode=auto`, `font=mixed`. Aim for ≈ 1.5–3.5 : 1 proportions (the render tool
  reports it).
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

<Diagram name="meetpulse-desktop/solution-flow" stagger={1.5} caption="Figure 1. How the pieces talk to each other." />
```

(`name` is `<project>/<diagram>`, no extension and no language: `<Diagram>` reads `src/diagrams/<project>/<lang>/assets/<diagram>.svg` for the page's locale, falls back to `en`.
Put the `import` with the other imports at the top, once per file; reuse it for every diagram in that file.)
UI (owned by `Diagram.astro`, don't restyle the SVG): a round expand button in the card's corner; one scrollable pill row with play/pause + one button per
step (generated from the diagram's `steps`) and the step text — pinned on top on phones; the full-screen viewer has its own zoom group (− % +, the % toggles fit/100%)
and close. Diagrams with `steps` get real buttons (overview + one per step) and **autoplay** (cycles every 5 s once on screen; pauses on hover/focus
or when the reader picks a step; off with `prefers-reduced-motion`). Optional props: `lang="es"`, `minWidth={520}`, `maxWidth="720px"`,
`autoplay={false}`, `interval={8}` (seconds per step). For a static image instead, use
`<img src="/diagrams/<name>.<lang>.png" alt="…" loading="lazy" />` inside a `<figure>`.

### After integrating

1. Run `npm run build`; fix any error (a wrong `name` lists the available diagrams).
2. Tell the user the page URL to check (`npm run dev` → `/blog/<slug>/` or `/es/blog/<slug>/`) and what to look at (hover a node, click to pin,
   the step buttons if the diagram has steps, dark mode, a narrow window).
3. Final summary: files created/changed, the spot used, and the assumptions made.
