/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  CERTIFICATIONS — the easiest file in the repo to edit.     │
 * │  Add one object per credential. The grid renders itself.    │
 * └─────────────────────────────────────────────────────────────┘
 *
 * ⚠️ YEARS below are placeholders — set the real issue years.
 *    Badge images live in src/assets/ (optimized by Astro at build).
 *    To use your own: drop the file in src/assets/certs/ and import it here.
 */
import type { ImageMetadata } from 'astro';
import gh300 from '../assets/certs/github-copilot.svg';
import googleAi from '../assets/imgs/google-ai-professional-certificate.png';
import awsMlFoundations from '../assets/imgs/aws-academy-machine-learning-foundations.png';
import awsPartner from '../assets/imgs/aws-partner-technical-accredited.png';
import inacap from '../assets/imgs/inacap-2.webp';

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
  /** Optional: badge image (import from src/assets). Omit to render a typographic monogram. */
  image?: ImageMetadata;
}

export const certifications: Certification[] = [
  {
    id: 'gh-300',
    name: 'GH-300 — GitHub Copilot',
    issuer: 'GitHub',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined, // e.g. 'https://learn.microsoft.com/.../credentials/xxxx'
    credentialId: undefined,
    image: gh300,
  },
  {
    id: 'aws-ml-foundations',
    name: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: awsMlFoundations,
  },
  {
    id: 'aws-partner',
    name: 'AWS Partner Technical Accredited',
    issuer: 'AWS',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: awsPartner,
  },
  {
    id: 'google-ai-professional',
    name: 'Google AI Professional',
    issuer: 'Google',
    year: 2025, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: googleAi,
  },
  {
    id: 'inacap-cloud',
    name: 'Arquitectura Cloud',
    issuer: 'INACAP',
    year: 2024, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: inacap,
  },
  {
    id: 'inacap-fullstack',
    name: 'Desarrollo FullStack',
    issuer: 'INACAP',
    year: 2024, // ⚠️ placeholder
    verifyUrl: undefined,
    credentialId: undefined,
    image: inacap,
  },
];
