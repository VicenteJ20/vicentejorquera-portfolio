/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  CERTIFICATIONS — the easiest file in the repo to edit.     │
 * │  Add one object per credential. The grid renders itself.    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ⚠️ YEARS below are placeholders — set the real issue years.
 *    Drop badge images into public/certs/ and set `image`,
 *    or leave `image` out to render a typographic badge.
 */
export interface Certification {
  id: string;
  name: string;
  /** Display name of the issuing org */
  issuer: string;
  year: number;
  /** Optional: URL to verify the credential */
  verifyUrl?: string;
  /** Optional: credential ID shown in mono type */
  credentialId?: string;
  /** Optional: path to badge image, e.g. '/certs/gh-300.png' (place in public/certs/) */
  image?: string;
}

export const certifications: Certification[] = [
  {
    id: 'gh-300',
    name: 'GH-300 — GitHub Copilot',
    issuer: 'GitHub',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined, // e.g. 'https://learn.microsoft.com/.../credentials/xxxx'
    credentialId: undefined,
    image: '/certs/github-copilot.svg',
  },
  {
    id: 'aws-ml-foundations',
    name: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: '/imgs/aws-academy-machine-learning-foundations.png',
  },
  {
    id: 'aws-partner',
    name: 'AWS Partner Technical Accredited',
    issuer: 'AWS',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: '/imgs/aws-partner-technical-accredited.png',
  },
  {
    id: 'google-ai-professional',
    name: 'Google AI Professional',
    issuer: 'Google',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: '/imgs/google-ai-professional-certificate.png',
  },
  {
    id: 'inacap-cloud',
    name: 'Arquitectura Cloud',
    issuer: 'INACAP',
    year: 2024, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: '/imgs/inacap-2.webp',
  },
  {
    id: 'inacap-fullstack',
    name: 'Desarrollo FullStack',
    issuer: 'INACAP',
    year: 2024, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: '/imgs/inacap-2.webp',
  },
];
