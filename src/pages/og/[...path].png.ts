/**
 * Open Graph images, generated at build time into static PNGs.
 *   /og/default.png            — site-wide card
 *   /og/en/<slug>.png          — per blog post
 *   /og/es/<slug>.png          — por artículo
 * Design: dark editorial card, blueprint grid, amber accent, Fraunces-ish serif fallback.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';
import { SITE } from '../../consts';
import { slugOf } from '../../utils/content';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const paths = [
    {
      params: { path: 'default' },
      props: { kicker: 'PORTFOLIO & BLOG', title: 'Software Architecture · Architecture & AI Consulting', tags: ['architecture', 'ai', 'cloud'] },
    },
  ];
  for (const post of posts) {
    const lang = post.id.split('/')[0] as 'en' | 'es';
    paths.push({
      params: { path: `${lang}/${slugOf(post)}` },
      props: {
        kicker: lang === 'es' ? 'BLOG — ES' : 'BLOG — EN',
        title: post.data.title,
        tags: post.data.tags,
      },
    });
  }
  return paths;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Greedy word wrap for the SVG text */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars || current === '') {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current) lines.push(current);
  // Truncate overflow with an ellipsis
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
  }
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { kicker, title, tags } = props as { kicker: string; title: string; tags: string[] };

  const titleSize = title.length > 95 ? 44 : title.length > 55 ? 52 : 60;
  const titleLines = wrap(title, titleSize > 50 ? 30 : 38, 4);
  const titleY0 = 205;
  const titleStep = titleSize + 14;

  const titleSvg = titleLines
    .map((line, i) => `<text x="72" y="${titleY0 + i * titleStep}" font-family="Georgia, 'DejaVu Serif', serif" font-weight="700" font-size="${titleSize}" fill="#ece9e0">${esc(line)}</text>`)
    .join('\n  ');

  const tagsLine = tags.slice(0, 4).map((t) => `#${t}`).join('  ·  ');
  const tagsY = titleY0 + titleLines.length * titleStep + 28;

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="46" height="46" patternUnits="userSpaceOnUse">
      <path d="M 46 0 H 0 V 46" fill="none" stroke="rgba(233,231,222,0.06)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.8" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#e3a857" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#e3a857" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e3a857"/>
      <stop offset="1" stop-color="#e3a857" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#101014"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="3" fill="url(#accentBar)"/>

  <!-- Kicker row -->
  <rect x="72" y="88" width="14" height="14" fill="#e3a857"/>
  <text x="98" y="100" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="4" fill="#e3a857">${esc(kicker)}</text>

  <!-- Title -->
  ${titleSvg}

  <!-- Tags -->
  <text x="72" y="${Math.min(tagsY, 480)}" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="21" letter-spacing="1" fill="#e3a857" fill-opacity="0.9">${esc(tagsLine)}</text>

  <!-- Footer row -->
  <line x1="72" y1="540" x2="1128" y2="540" stroke="rgba(233,231,222,0.14)" stroke-width="1"/>
  <rect x="72" y="558" width="34" height="34" rx="8" fill="#e3a857"/>
  <text x="89" y="582" font-family="Georgia, 'DejaVu Serif', serif" font-weight="700" font-size="21" fill="#231503" text-anchor="middle">V</text>
  <text x="126" y="581" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="1" fill="#a3a199">VICENTE JORQUERA</text>
  <text x="1128" y="581" text-anchor="end" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="1" fill="#a3a199">vicentejorquera.dev</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
