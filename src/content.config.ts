/**
 * Content collections — schema-validated with Zod.
 * Posts and product docs live as Markdown/MDX files and are loaded
 * with Astro's glob loader (no database, no CMS).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Tags are free-form strings; keep lowercase (e.g. architecture, ai, cloud) */
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string().max(140),
    description: z.string().max(260),
    stack: z.array(z.string()).default([]),
    /** Public repo — where people browse the code */
    repo: z.string().url().optional(),
    /** Direct link to a downloadable binary / release */
    download: z.string().url().optional(),
    /** Link to docs, demo or landing page, if any */
    website: z.string().url().optional(),
    released: z.coerce.date(),
    draft: z.boolean().default(false),
    /** Monogram tile background — start of the gradient (HEX). Defaults to the site tile. */
    tileFrom: z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use a HEX color, e.g. #1d2b3a').optional(),
    /** Monogram tile background — end of the gradient (HEX). Defaults to tileFrom (solid). */
    tileTo: z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use a HEX color, e.g. #0d151d').optional(),
    /** Monogram letter color (HEX). Defaults to the site tile ink. */
    tileInk: z.string().regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use a HEX color, e.g. #e8f0e4').optional(),
    /** Word shown in the tile instead of the initial (e.g. "MeetPulse"). */
    tileText: z.string().max(40).optional(),
  }),
});

export const collections = { blog, products };
