import { ImageResponse } from 'next/og';
import SocialCard from '@/components/seo/SocialCard';
import { projectsData } from '@/data/projects';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'home' }, ...projectsData.map(({ slug }) => ({ slug }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((project) => project.slug === slug);
  if (slug !== 'home' && !project) return new Response('Not found', { status: 404 });
  return new ImageResponse(<SocialCard project={project} />, { width: 1200, height: 630 });
}
