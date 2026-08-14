import { projectsData } from '../../data/projects';

export const getPipelineBySlug = (slug) => {
  const project = projectsData.find((p) => p.slug === slug);
  return project ? project.stages : projectsData[0].stages;
};

export const allProjectsPipelines = projectsData.reduce((acc, p) => {
  acc[p.slug] = p.stages;
  return acc;
}, {});
