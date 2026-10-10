import type { projectsData } from '@/data/projects';

export type Project = (typeof projectsData)[number];
export type PipelineStage = Project['stages'][number];

export interface PipelineProps {
  projectSlug?: string;
  stages?: PipelineStage[];
  title?: string;
  subtitle?: string;
}
