/**
 * Open Graph images, generated at build time into static PNGs.
 *   /og/default.png            — site-wide card
 *   /og/en/<slug>.png          — per blog post
 *   /og/es/<slug>.png          — por artículo
 *   /og/products/<slug>.png    — per product (shared by both languages)
 * Design: dark editorial card, amber accent, Fraunces-ish serif fallback, profile-photo avatar.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { fileURLToPath } from 'node:url';
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
  // Products: one card per slug (name and stack are shared across languages)
  const products = await getCollection('products', ({ data }) => !data.draft);
  const seen = new Set<string>();
  for (const product of products) {
    const slug = slugOf(product);
    if (seen.has(slug)) continue;
    seen.add(slug);
    paths.push({
      params: { path: `products/${slug}` },
      props: {
        kicker: 'PRODUCT',
        title: product.data.name,
        tags: product.data.stack,
      },
    });
  }
  return paths;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Host shown in the footer of every card (e.g. "vicentejorquera.dev") */
const siteHost = new URL(SITE.url).host;

/** Profile photo (same one as the header/favicon), masked to a circle */
const AVATAR_SIZE = 44;
const AVATAR_TOP = 552;
const avatarPath = fileURLToPath(new URL('../../../public/1788373851761.webp', import.meta.url));
const circleMask = Buffer.from(
  `<svg width="${AVATAR_SIZE}" height="${AVATAR_SIZE}"><circle cx="${AVATAR_SIZE / 2}" cy="${AVATAR_SIZE / 2}" r="${AVATAR_SIZE / 2}" fill="#fff"/></svg>`
);
const avatar = await sharp(avatarPath)
  .resize(AVATAR_SIZE, AVATAR_SIZE)
  .composite([{ input: circleMask, blend: 'dest-in' }])
  .png()
  .toBuffer();

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
    <radialGradient id="glow" cx="0.8" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#b3c16b" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#b3c16b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accentBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#b3c16b"/>
      <stop offset="1" stop-color="#b3c16b" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#131416"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="3" fill="url(#accentBar)"/>

  <!-- Kicker row -->
  <rect x="72" y="88" width="14" height="14" fill="#b3c16b"/>
  <text x="98" y="100" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="4" fill="#b3c16b">${esc(kicker)}</text>

  <!-- Title -->
  ${titleSvg}

  <!-- Tags -->
  <text x="72" y="${Math.min(tagsY, 480)}" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="21" letter-spacing="1" fill="#b3c16b" fill-opacity="0.9">${esc(tagsLine)}</text>

  <!-- Footer row — avatar is composited from the site's photo afterwards -->
  <line x1="72" y1="540" x2="1128" y2="540" stroke="rgba(233,231,222,0.14)" stroke-width="1"/>
  <text x="130" y="581" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="1" fill="#a3a199">VICENTE JORQUERA</text>
  <text x="1128" y="581" text-anchor="end" font-family="'Courier New', 'DejaVu Sans Mono', monospace" font-size="19" letter-spacing="1" fill="#a3a199">${esc(siteHost)}</text>
</svg>`;

  const png = await sharp(Buffer.from(svg))
    .composite([{ input: avatar, left: 72, top: AVATAR_TOP }])
    .png()
    .toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      // Cards regenerate at the same URL on rebuild — revalidate daily,
      // don't pin an immutable year-long cache on a stable URL
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
