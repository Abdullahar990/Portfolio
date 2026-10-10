import type { MetadataRoute } from 'next';
import { projectsData } from '@/data/projects';
import { isIndexable, publicUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  return ['/', ...projectsData.map((project) => `/projects/${project.slug}`)].map((path) => ({
    url: publicUrl(path)!,
  }));
}
