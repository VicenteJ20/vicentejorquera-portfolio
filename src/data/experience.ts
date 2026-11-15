/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  EXPERIENCE & EDUCATION — the work timeline.                │
 * │  EDIT THIS FILE to update the timeline on the home page.    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * HOW TO EDIT
 * -----------
 * Each work entry is an object in `experience[]`. The home page renders
 * them in order, most recent first — so keep the list ordered.
 *
 *   role:    { en, es } — job title, both languages
 *   org:     string      — company name (shown in mono caps)
 *   logo:    ImageMetadata — OPTIONAL, imported from src/assets/ (see imports at top)
 *                          (keep square-ish artwork; it renders in a small chip)
 *   period:  { en, es }  — date range, both languages
 *   bullets: { en, es }  — 1–3 short bullets each language
 *   current: true        — marks the highlighted "current" role (accent dot)
 *
 * Education entries live in `education[]` at the bottom — same shape,
 * minus logo/period (rendered as simpler rows).
 *
 * ⚠️ Everything below marked PLACEHOLDER is example copy — rewrite with
 *    your real history and dates.
 */

import type { ImageMetadata } from 'astro';
import inovabiz from '../assets/imgs/inovabiz-logo.webp';
import code from '../assets/imgs/code.png';
import tibox from '../assets/imgs/tibox-logo.webp';

export interface ExperienceItem {
  role: { en: string; es: string };
  org: string;
  /** Imported image from src/assets — e.g. `import myLogo from '../assets/imgs/my-logo.webp'` */
  logo?: ImageMetadata;
  period: { en: string; es: string };
  bullets: { en: string[]; es: string[] };
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    // ── CURRENT ROLE ───────────────────────────────────────────
    role: {
      en: 'Software Architect — Architecture & AI Consulting',
      es: 'Arquitecto de Software — Consultoría de Arquitectura e IA',
    },
    org: 'Inovabiz',
    logo: inovabiz,
    period: { en: '2024 — Present', es: '2024 — Presente' },
    current: true,
    bullets: {
      en: [
        'Design end-to-end architectures for cloud and AI workloads, from discovery to production hardening.',
        'Guide client teams on ADRs, platform standards and AI adoption.',
        'Turn strategy into reference implementations, PoCs and supported platforms.',
      ],
      es: [
        'Diseño arquitecturas end-to-end para cargas cloud e IA, del descubrimiento al hardening en producción.',
        'Acompaño a equipos en ADRs, estándares de plataforma y adopción de IA.',
        'Convierto estrategia en implementaciones de referencia, PoCs y plataformas soportadas.',
      ],
    },
  },
  {
    // ── PREVIOUS ROLE ──────────────────────────────────────────
    role: { en: 'Software Engineer', es: 'Ingeniero de Software SS' },
    org: 'Inovabiz',
    logo: inovabiz,
    period: { en: '2024 — 2024', es: '2024 — 2024' },
    bullets: {
      en: [
        'Built and shipped full-stack features: APIs, data modeling and web UIs.',
        'CI/CD pipelines and cloud deployments for client projects.',
      ],
      es: [
        'Construí y publiqué funcionalidades full-stack: APIs, modelado de datos y UIs web.',
        'Pipelines CI/CD y despliegues cloud para proyectos de clientes.',
      ],
    },
  },
  {
    // ── PREVIOUS ROLE ──────────────────────────────────────────
    role: { en: 'Developer Freelance', es: 'Desarrollador Freelance' },
    org: 'Freelance',
    logo: code,
    period: { en: '2023-2024', es: '2023 — 2024' },
    bullets: {
      en: [
        'Built and shipped full-stack features: APIs, data modeling and web UIs.',
        'Full product design and development.',
        'Landing page design and development for local companies',
        'CI/CD pipelines and cloud deployments for client projects.',
      ],
      es: [
        'Construí y publiqué funcionalidades full-stack: APIs, modelado de datos y UIs web.',
        'Diseño de producto y desarrollo end to end.',
        'Diseño y desarrollo de páginas de presentación de producto para empresas locales',
        'Pipelines CI/CD y despliegues cloud para proyectos de clientes.',
      ],
    },
  },
  {
    // ── PREVIOUS ROLE ──────────────────────────────────────────
    role: { en: 'Full-stack Developer Junior', es: 'Desarrollador Full-stack Junior' },
    org: 'Tibox',
    logo: tibox,
    period: { en: '2023-2023', es: '2023 — 2023' },
    bullets: {
      en: [
        'Built and shipped full-stack features: APIs, data modeling and web UIs.',
        'CI/CD pipelines and cloud deployments for client projects.',
        'Dot NET Development mantaining the company ticket system'
      ],
      es: [
        'Construí y publiqué funcionalidades full-stack: APIs, modelado de datos y UIs web.',
        'Pipelines CI/CD y despliegues cloud para proyectos de clientes.',
        'Desarrollo .NET manteniendo el sistema de tickets de la empresa.'
      ],
    },
  },
];

// Education — simpler rows, no logos needed
export interface EducationItem {
  degree: { en: string; es: string };
  school: string;
}

export const education: EducationItem[] = [
  {
    degree: { en: 'Education - Computer Engineering (B.Eng. equivalent)', es: 'Educación - Ingeniería en Informática' },
    school: 'INACAP',
  },
  {
    degree: { en: 'Education - Programming Analyst — Technical Degree', es: 'Educación - Analista Programador — Título Técnico' },
    school: 'INACAP',
  },
];
