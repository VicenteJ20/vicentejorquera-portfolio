import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../../consts';
import { getPosts, slugOf } from '../../utils/content';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts('es');
  return rss({
    title: `${SITE.name} â€” Blog (ES)`,
    description: 'Escritura tÃ©cnica sobre arquitectura de software, IA, cloud y prÃ¡ctica de ingenierÃ­a.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/es/blog/${slugOf(post)}/`,
      categories: post.data.tags,
    })),
  });
};
