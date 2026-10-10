import { projectsData } from '@/data/projects';

export const getPipelineBySlug = (slug: string) => {
  const project = projectsData.find((p) => p.slug === slug);
  return project ? project.stages : projectsData[0].stages;
};

export const allProjectsPipelines = projectsData.reduce<
  Record<string, (typeof projectsData)[number]['stages']>
>((acc, p) => {
  acc[p.slug] = p.stages;
  return acc;
}, {});
