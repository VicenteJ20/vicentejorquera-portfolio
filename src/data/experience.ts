/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  EXPERIENCE & EDUCATION — timeline content.                 │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ⚠️ PLACEHOLDERS: periods, employer names and bullet points are
 *    draft suggestions based on what I know. Rewrite freely —
 *    the layout adapts to any number of entries.
 */

export interface ExperienceItem {
  role: { en: string; es: string };
  org: string;
  period: { en: string; es: string };
  bullets: { en: string[]; es: string[] };
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    role: { en: 'Software Architect — Architecture & AI Consulting', es: 'Arquitecto de Software — Consultoría de Arquitectura e IA' },
    org: 'Architecture & AI Consulting', // ⚠️ placeholder: real org name
    period: { en: '2024 — Present', es: '2024 — Presente' }, // ⚠️ placeholder
    current: true,
    bullets: {
      en: [
        'Design end-to-end architectures for cloud and AI workloads, from discovery to production hardening.',
        'Guide client teams on architecture decision records, platform standards and AI adoption.', // ⚠️ placeholder
        'Bridge strategy and implementation: proof-of-concepts that graduate into supported platforms.', // ⚠️ placeholder
      ],
      es: [
        'Diseño arquitecturas end-to-end para cargas cloud e IA, del descubrimiento al hardening en producción.',
        'Acompaño a equipos clientes en ADRs, estándares de plataforma y adopción de IA.', // ⚠️ placeholder
        'Puente entre estrategia e implementación: POCs que gradúan a plataformas soportadas.', // ⚠️ placeholder
      ],
    },
  },
  {
    role: { en: 'Software Engineer', es: 'Desarrollador de Software' },
    org: 'Previous roles', // ⚠️ placeholder
    period: { en: '2022 — 2024', es: '2022 — 2024' }, // ⚠️ placeholder
    bullets: {
      en: [
        'Full-stack delivery across web platforms: APIs, data modeling, CI/CD and cloud infrastructure.', // ⚠️ placeholder
      ],
      es: [
        'Entrega full-stack en plataformas web: APIs, modelado de datos, CI/CD e infraestructura cloud.', // ⚠️ placeholder
      ],
    },
  },
];

export interface EducationItem {
  degree: { en: string; es: string };
  school: string;
  detail?: { en: string; es: string };
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
