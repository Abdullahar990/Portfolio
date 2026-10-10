import type { Metadata } from 'next';
import type { Project } from '@/lib/types';

export const site = {
  name: 'Muhammad Abdullah',
  title: 'Muhammad Abdullah — Full Stack AI Developer',
  description:
    'Muhammad Abdullah is a full stack AI developer in Lahore, building machine learning systems and thoughtful web applications. Explore his work and experience.',
  role: 'Full Stack AI Developer',
  email: 'abdullahar990@gmail.com',
  github: 'https://github.com/Abdullahar990',
  linkedin: 'https://www.linkedin.com/in/muhammadabdullah-cs',
};

function resolveProductionUrl(): URL | undefined {
  const explicitUrl = process.env.SITE_URL?.trim();
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const value = explicitUrl || (vercelHost ? `https://${vercelHost}` : undefined);

  if (!value) {
    if (process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production') {
      throw new Error(
        'Set SITE_URL to the public portfolio origin or enable VERCEL_PROJECT_PRODUCTION_URL before a production deployment.',
      );
    }
    return undefined;
  }

  const url = new URL(value);
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    throw new Error('SITE_URL must be a complete http(s) origin, with no path or credentials.');
  }
  return url;
}

export const productionUrl = resolveProductionUrl();
export const hasProductionUrl = productionUrl !== undefined;
export const isPreview = process.env.VERCEL_ENV === 'preview';
export const metadataBase = productionUrl ?? new URL('http://localhost:3000');
const isLocalHost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(metadataBase.hostname);
export const isIndexable =
  process.env.NODE_ENV === 'production' &&
  hasProductionUrl &&
  !isPreview &&
  !isLocalHost &&
  metadataBase.protocol === 'https:';

export function publicUrl(path: string): string | undefined {
  return productionUrl ? new URL(path, productionUrl).href : undefined;
}

const descriptions: Record<string, string> = {
  guardiansense:
    'Guardian Sense: an on-device accident and fall detection project using smartphone sensors, machine learning and real-time emergency dashboards.',
  'check-inn':
    'Check INN, Chill Out: a responsive Next.js hotel booking interface with guest search, room details and an owner-facing property form.',
  'disease-prediction':
    'Disease Prediction System: a Python and Flask symptom prediction project using a K-Nearest Neighbors classifier, Pandas and Scikit-learn.',
  'spare-parts':
    'Spare Parts Management: a PHP and MySQL inventory project with authentication, supplier records and stock management interfaces.',
};

export function pageMetadata({
  title,
  description,
  path,
  imageSlug,
}: {
  title: string;
  description: string;
  path: string;
  imageSlug: string;
}): Metadata {
  const url = publicUrl(path);
  const image = {
    url: `/social/${imageSlug}`,
    width: 1200,
    height: 630,
    alt:
      imageSlug === 'home'
        ? 'Muhammad Abdullah — Full Stack AI Developer portfolio'
        : `${title} — project case study by Muhammad Abdullah`,
  };
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      title,
      description,
      ...(url ? { url } : {}),
      siteName: site.name,
      type: 'website',
      locale: 'en_US',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export function projectMetadata(project: Project): Metadata {
  return pageMetadata({
    title: `${project.title} — Case Study | ${site.name}`,
    description: descriptions[project.slug] ?? project.summary,
    path: `/projects/${project.slug}`,
    imageSlug: project.slug,
  });
}

const personId = publicUrl('/#person') ?? '#person';
const websiteId = publicUrl('/#website') ?? '#website';

export function homeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        jobTitle: site.role,
        description: site.description,
        ...(productionUrl
          ? { url: publicUrl('/'), image: publicUrl('/abdullah-profile.webp') }
          : {}),
        sameAs: [site.github, site.linkedin],
        email: `mailto:${site.email}`,
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        name: `${site.name} — Portfolio`,
        description: site.description,
        ...(productionUrl ? { url: publicUrl('/') } : {}),
        inLanguage: 'en',
        creator: { '@id': personId },
      },
    ],
  };
}

export function projectStructuredData(project: Project) {
  const path = `/projects/${project.slug}`;
  const url = publicUrl(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': url ? `${url}#project` : '#project',
        name: project.title,
        description: project.summary,
        about: project.category,
        keywords: project.tech.join(', '),
        inLanguage: 'en',
        ...(url ? { url, image: publicUrl(`/social/${project.slug}`) } : {}),
        creator: { '@type': 'Person', '@id': personId, name: site.name },
        isPartOf: { '@type': 'WebSite', '@id': websiteId, name: `${site.name} — Portfolio` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Portfolio',
            item: publicUrl('/') ?? '/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: project.title,
            item: url ?? path,
          },
        ],
      },
    ],
  };
}
