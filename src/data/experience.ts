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
 *   logo:    string      — OPTIONAL image in public/, e.g. '/imgs/brand.webp'
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

export interface ExperienceItem {
  role: { en: string; es: string };
  org: string;
  logo?: string;
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
    logo: '/imgs/inovabiz-logo.webp',
    period: { en: '2024 — Present', es: '2024 — Presente' }, // ⚠️ placeholder
    current: true,
    bullets: {
      en: [
        // ⚠️ placeholder — describe your current work
        'Design end-to-end architectures for cloud and AI workloads, from discovery to production hardening.',
        'Guide client teams on ADRs, platform standards and AI adoption.',
        'Turn strategy into reference implementations, PoCs and supported platforms.',
      ],
      es: [
        // ⚠️ placeholder — describe tu trabajo actual
        'Diseño arquitecturas end-to-end para cargas cloud e IA, del descubrimiento al hardening en producción.',
        'Acompaño a equipos en ADRs, estándares de plataforma y adopción de IA.',
        'Convierto estrategia en implementaciones de referencia, PoCs y plataformas soportadas.',
      ],
    },
  },
  {
    // ── PREVIOUS ROLE ──────────────────────────────────────────
    role: { en: 'Full-stack Developer', es: 'Desarrollador Full-stack' }, // ⚠️ placeholder role
    org: 'Tibox',
    logo: '/imgs/tibox-logo.webp',
    period: { en: '2022 — 2024', es: '2022 — 2024' }, // ⚠️ placeholder
    bullets: {
      en: [
        // ⚠️ placeholder — describe your previous work
        'Built and shipped full-stack features: APIs, data modeling and web UIs.',
        'CI/CD pipelines and cloud deployments for client projects.',
      ],
      es: [
        // ⚠️ placeholder — describe tu trabajo anterior
        'Construí y publiqué funcionalidades full-stack: APIs, modelado de datos y UIs web.',
        'Pipelines CI/CD y despliegues cloud para proyectos de clientes.',
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
    degree: { en: 'Computer Engineering (B.Eng. equivalent)', es: 'Ingeniería en Informática' },
    school: 'INACAP',
  },
  {
    degree: { en: 'Programming Analyst — Technical Degree', es: 'Analista Programador — Título Técnico' },
    school: 'INACAP',
  },
];
