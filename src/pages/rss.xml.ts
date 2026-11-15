import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../consts';
import { getPosts, slugOf } from '../utils/content';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts('en');
  return rss({
    title: `${SITE.name} — Blog`,
    description: 'Technical writing on software architecture, AI, cloud and engineering practice.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${slugOf(post)}/`,
      categories: post.data.tags,
    })),
  });
};
