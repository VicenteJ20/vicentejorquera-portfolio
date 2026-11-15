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
    /** Free-form tags; keep lowercase (e.g. architecture, ai, cloud) */
    tags: z.array(z.string()).default([]),
    /** Optional cover image — put the file in public/blog/<slug>/ and reference '/blog/<slug>/cover.png' */
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
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
  }),
});

export const collections = { blog, products };
