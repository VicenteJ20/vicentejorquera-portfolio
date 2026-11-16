/**
 * Shared helpers for content collections, paths and locale plumbing.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, type Lang } from '../consts';

export type BlogPost = CollectionEntry<'blog'>;
export type Product = CollectionEntry<'products'>;

/** Sorted (newest first), non-draft posts for one language. */
export async function getPosts(lang: Lang): Promise<BlogPost[]> {
  const all = await getCollection('blog', ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

/** Published products for one language, newest release first. */
export async function getProducts(lang: Lang): Promise<Product[]> {
  const all = await getCollection('products', ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft);
  return all.sort((a, b) => b.data.released.getTime() - a.data.released.getTime());
}

/**
 * Inline CSS custom-property overrides for a product's monogram tile.
 * Returns undefined when the product defines no tile colors (site defaults apply).
 */
export function tileStyle(data: { tileFrom?: string; tileTo?: string; tileInk?: string }): string | undefined {
  const parts: string[] = [];
  if (data.tileFrom) parts.push(`--tile-from:${data.tileFrom}`);
  // With only tileFrom set, render a solid tile (from == to)
  if (data.tileTo ?? data.tileFrom) parts.push(`--tile-to:${data.tileTo ?? data.tileFrom}`);
  if (data.tileInk) parts.push(`--tile-ink:${data.tileInk}`);
  return parts.length ? parts.join(';') : undefined;
}

/** 'en/my-post' -> 'my-post' */
export function slugOf(entry: { id: string }): string {
  return entry.id.replace(/^(en|es)\//, '');
}

/** Rough reading time from the raw markdown body (≈230 wpm). */
export function readingTime(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 230));
}

export function formatDate(date: Date, lang: Lang): string {
  // Date-only frontmatter ('2026-11-10') parses as UTC midnight — render in UTC
  // so negative timezones don't show the previous day.
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-CL' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Slugify a tag: 'System Design' -> 'system-design' */
export function tagSlug(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip combining diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** All tags used by a language's published posts, with counts. */
export function collectTags(posts: BlogPost[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const key = tagSlug(tag);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return counts;
}

/**
 * Localized path helpers. English lives at the root (/blog/),
 * Spanish under /es/ (/es/blog/).
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/es/' : `/es${clean}`;
}

/**
 * Given a current pathname, compute both language variants.
 * Used for hreflang alternates and the header language switch.
 */
export function alternatePaths(pathname: string): { en: string; es: string } {
  let clean = pathname;
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  if (clean === '/es') clean = '';
  else if (clean.startsWith('/es/')) clean = clean.slice(3); // '' (root) or '/blog'
  // `clean` is now '' (root) or '/blog' (English path, no trailing slash)
  const en = clean === '' || clean === '/' ? '/' : `${clean}/`;
  const es = clean === '' || clean === '/' ? '/es/' : `/es${clean}/`;
  return { en, es };
}

/** Absolute URL for a path, used in canonical/OG/hreflang tags. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
