/**
 * UI strings for both languages. Content (posts, products) is NOT here —
 * this file holds chrome/UI copy only.
 */
import type { Lang } from '../consts';

export const ui = {
  en: {
    nav: { blog: 'Blog', products: 'Products', certifications: 'Certifications' },
    common: {
      skipToContent: 'Skip to content',
      home: 'Home',
      allPosts: 'All posts',
      readingTime: 'min read',
      updated: 'Updated',
      published: 'Published',
      tags: 'Tags',
      backToBlog: '← All posts',
      prevPost: '← Previous',
      nextPost: 'Next →',
      verify: 'Verify credential',
      viewRepo: 'View repo',
      download: 'Download',
      visitSite: 'Visit site',
      soon: 'soon',
      subscribe: 'Subscribe via',
      rss: 'RSS',
    },
    hero: {
      role: 'Software Architect',
      practice: 'Architecture & AI Consulting',
      linkedinLabel: 'LinkedIn',
      bio: "I'm a software architect on an Architecture & AI consulting team. I design cloud architectures and take AI from prototype to production — and I write about what actually works.",
      focusTitle: 'Focus areas:',
      // ⚠️ Edit to match what you actually do
      focusAreas: [
        'AI/ML solutions and MLOps automation',
        'Cloud migration & application modernization',
        'Software architecture, ADRs and platform standards',
        'Full-stack delivery — APIs, data and CI/CD',
        'Client PoCs: architecture → production',
      ],
      blogLabel: 'Read the blog',
      helloLabel: 'Say hello',
      location: 'Based in Chile',
      availability: 'Open to interesting conversations',
    },
    home: {
      latestKicker: '// 01 — writing',
      latestTitle: 'Latest from the blog',
      viewAll: 'All articles',
      productsKicker: '// 02 — products',
      productsTitle: 'Things I’ve built',
      productsEmptyTitle: 'Coming soon.',
      productsEmptyBody:
        'I ship small tools as public, downloadable products. They will appear here as they are released.',
      productsEmptyCta: 'Meanwhile, my code lives on GitHub',
      experienceKicker: '// 03 — trajectory',
      experienceTitle: 'Where I’ve been',
      certsKicker: '// 04 — certifications',
      certsTitle: 'Credentials',
      certsViewAll: 'View all certifications',
    },
    blog: {
      kicker: '// writing',
      title: 'The Blog',
      subtitle: 'Notes on software architecture, AI, cloud and the craft of building. Long-form, no fluff.',
      emptyTitle: 'No articles yet.',
      emptyBody: 'First post is being written. Subscribe via RSS to know when it lands.',
      filterByTag: 'Filter by tag',
      archive: 'Archive',
      archiveKicker: '// archive',
      archiveTitle: 'All articles, chronologically',
      tagsTitle: 'Tags',
      tagsKicker: '// tags',
      taggedWith: 'Tagged',
      postsTagged: 'posts tagged',
    },
    certifications: {
      kicker: '// credentials',
      title: 'Certifications',
      subtitle: 'Verified credentials, growing over time. Click through to verify each one.',
      footerNote: 'Working toward the next one.',
    },
    products: {
      kicker: '// products',
      title: 'Products',
      subtitle: 'Public, downloadable things I’ve designed and built. No accounts, no tracking.',
      emptyTitle: 'Nothing released yet — but it’s coming.',
      emptyBody: 'A few tools are in flight. When each one ships, it will land here with a repo and a public download.',
      stack: 'Built with',
      released: 'Released',
      detailBack: '← All products',
      noDocs: 'No documentation yet — the README in the repo is the source of truth.',
    },
    footer: {
      navigate: 'Navigate',
      connect: 'Connect',
      colophon: 'Built with Astro & Tailwind CSS. Markdown-first, no CMS.',
      madeIn: 'Made in Chile',
      copyright: 'All rights reserved.',
    },
    meta: {
      homeDescription:
        'Vicente Jorquera — Software Architect in Architecture & AI consulting. Writing about system architecture, applied AI, cloud platforms and engineering practice.',
      blogDescription:
        'Technical writing on software architecture, AI, cloud platforms and engineering practice by Vicente Jorquera.',
      certificationsDescription: 'Professional certifications of Vicente Jorquera — GitHub, Google and INACAP.',
      productsDescription: 'Public, downloadable open-source products and tools by Vicente Jorquera.',
      archiveDescription: 'Complete archive of articles by Vicente Jorquera.',
      tagsDescription: 'Browse articles by tag — architecture, ai, cloud, fullstack and more.',
    },
    post: {
      shareOnX: 'Share on X',
      shareOnLinkedIn: 'Share on LinkedIn',
      thanks: 'Thanks for reading.',
      authorBio: 'Software Architect. I write about architecture, AI and cloud. Usually in public.',
      toc: 'On this page',
    },
  },

  es: {
    nav: { blog: 'Blog', products: 'Productos', certifications: 'Certificaciones' },
    common: {
      skipToContent: 'Saltar al contenido',
      home: 'Inicio',
      allPosts: 'Todos los artículos',
      readingTime: 'min de lectura',
      updated: 'Actualizado',
      published: 'Publicado',
      tags: 'Etiquetas',
      backToBlog: '← Todos los artículos',
      prevPost: '← Anterior',
      nextPost: 'Siguiente →',
      verify: 'Verificar credencial',
      viewRepo: 'Ver repositorio',
      download: 'Descargar',
      visitSite: 'Visitar el sitio',
      soon: 'pronto',
      subscribe: 'Suscríbete vía',
      rss: 'RSS',
    },
    hero: {
      role: 'Arquitecto de Software',
      practice: 'Consultoría de Arquitectura e IA',
      linkedinLabel: 'LinkedIn',
      bio: 'Soy arquitecto de software en un equipo de consultoría de Arquitectura e IA. Diseño arquitecturas cloud y llevo la IA de prototipo a producción — y escribo sobre lo que realmente funciona.',
      focusTitle: 'Áreas de foco:',
      // ⚠️ Edítalas para que reflejen tu día a día real
      focusAreas: [
        'Soluciones AI/ML y automatización de MLOps',
        'Migración cloud y modernización de aplicaciones',
        'Arquitectura de software, ADRs y estándares de plataforma',
        'Entrega full-stack — APIs, datos y CI/CD',
        'PoCs para clientes: de la arquitectura a producción',
      ],
      blogLabel: 'Leer el blog',
      helloLabel: 'Conversemos',
      location: 'Basado en Chile',
      availability: 'Abierto a conversaciones interesantes',
    },
    home: {
      latestKicker: '// 01 — escritura',
      latestTitle: 'Lo último del blog',
      viewAll: 'Todos los artículos',
      productsKicker: '// 02 — productos',
      productsTitle: 'Cosas que he construido',
      productsEmptyTitle: 'Próximamente.',
      productsEmptyBody:
        'Publico herramientas pequeñas como productos públicos y descargables. Aparecerán aquí a medida que se liberen.',
      productsEmptyCta: 'Mientras tanto, mi código vive en GitHub',
      experienceKicker: '// 03 — trayectoria',
      experienceTitle: 'Por dónde he pasado',
      certsKicker: '// 04 — certificaciones',
      certsTitle: 'Credenciales',
      certsViewAll: 'Ver todas las certificaciones',
    },
    blog: {
      kicker: '// escritura',
      title: 'El Blog',
      subtitle: 'Notas sobre arquitectura de software, IA, cloud y el oficio de construir. Ensayo largo, cero relleno.',
      emptyTitle: 'Aún no hay artículos.',
      emptyBody: 'El primer artículo está en camino. Suscríbete vía RSS para enterarte.',
      filterByTag: 'Filtrar por etiqueta',
      archive: 'Archivo',
      archiveKicker: '// archivo',
      archiveTitle: 'Todos los artículos, en orden cronológico',
      tagsTitle: 'Etiquetas',
      tagsKicker: '// etiquetas',
      taggedWith: 'Etiquetados como',
      postsTagged: 'artículos con la etiqueta',
    },
    certifications: {
      kicker: '// credenciales',
      title: 'Certificaciones',
      subtitle: 'Credenciales verificables, creciendo en el tiempo. Haz clic para verificar cada una.',
      footerNote: 'En camino a la siguiente.',
    },
    products: {
      kicker: '// productos',
      title: 'Productos',
      subtitle: 'Cosas públicas y descargables que he diseñado y construido. Sin cuentas, sin tracking.',
      emptyTitle: 'Aún no hay nada liberado — pero viene.',
      emptyBody: 'Tengo varias herramientas en vuelo. Cuando cada una se libere, aparecerá aquí con repositorio y descarga pública.',
      stack: 'Construido con',
      released: 'Publicado',
      detailBack: '← Todos los productos',
      noDocs: 'Aún no hay documentación — el README del repo es la fuente de verdad.',
    },
    footer: {
      navigate: 'Navegar',
      connect: 'Conectar',
      colophon: 'Construido con Astro y Tailwind CSS. Markdown primero, sin CMS.',
      madeIn: 'Hecho en Chile',
      copyright: 'Todos los derechos reservados.',
    },
    meta: {
      homeDescription:
        'Vicente Jorquera — Arquitecto de Software en consultoría de Arquitectura e IA. Escribo sobre arquitectura de sistemas, IA aplicada, cloud y práctica de ingeniería.',
      blogDescription:
        'Escritura técnica sobre arquitectura de software, IA, plataformas cloud y práctica de ingeniería por Vicente Jorquera.',
      certificationsDescription: 'Certificaciones profesionales de Vicente Jorquera — GitHub, Google e INACAP.',
      productsDescription: 'Productos y herramientas open source de Vicente Jorquera, públicos y descargables.',
      archiveDescription: 'Archivo completo de artículos de Vicente Jorquera.',
      tagsDescription: 'Explora los artículos por etiqueta — arquitectura, ia, cloud, fullstack y más.',
    },
    post: {
      shareOnX: 'Compartir en X',
      shareOnLinkedIn: 'Compartir en LinkedIn',
      thanks: 'Gracias por leer.',
      authorBio: 'Arquitecto de Software. Escribo sobre arquitectura, IA y cloud. Casi siempre en público.',
      toc: 'En esta página',
    },
  },
} as const;

/** Type-safe accessor for a given language */
export function useTranslations(lang: Lang) {
  return (key: string): string => {
    const parts = key.split('.');
    let node: unknown = ui[lang];
    for (const part of parts) {
      node = (node as Record<string, unknown> | undefined)?.[part];
    }
    return typeof node === 'string' ? node : key;
  };
}

/** Nested access when you want the object, not a key lookup */
export function t(lang: Lang) {
  return ui[lang];
}
