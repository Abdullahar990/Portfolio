import {
  ArrowRight,
  Activity,
  Search,
  BrainCircuit,
  Package,
  CircleCheck,
  Database,
} from 'lucide-react';
import type { Project } from '@/lib/types';

const covers = {
  guardiansense: {
    Icon: Activity,
    label: 'EDGE INTELLIGENCE',
    heading: 'Sense. Understand. Respond.',
    input: 'Motion signals',
    process: 'On-device inference',
    output: 'Response portals',
    detail: 'Accelerometer + gyroscope → ONNX → response portals',
  },
  'check-inn': {
    Icon: Search,
    label: 'BOOKING EXPERIENCE',
    heading: 'Explore a stay. Shape the experience.',
    input: 'Discover',
    process: 'Room & form views',
    output: 'Property form',
    detail: 'A connected experience for guests and property owners',
  },
  'disease-prediction': {
    Icon: BrainCircuit,
    label: 'CLASSIFICATION PIPELINE',
    heading: 'From symptoms to signals.',
    input: 'Selected symptoms',
    process: 'KNN · 10 neighbors',
    output: 'Predicted label',
    detail: 'Selected symptoms → KNN classifier → predicted label',
  },
  'spare-parts': {
    Icon: Package,
    label: 'INVENTORY OPERATIONS',
    heading: 'Every part. Accounted for.',
    input: 'Login interface',
    process: 'Products & suppliers',
    output: 'Dashboard counts',
    detail: 'PHP pages → MySQL records → inventory dashboard',
  },
};

export default function ProjectCover({ project }: { project: Project }) {
  const cover = covers[project.slug as keyof typeof covers];
  const Icon = cover.Icon;
  return (
    <figure
      className={`project-cover cover-${project.slug}`}
      aria-label={`${project.title} conceptual system illustration`}
    >
      <div className="project-cover-top">
        <span>{cover.label}</span>
        <span>FIG. 01</span>
      </div>
      <div className="project-cover-symbol">
        <Icon size={52} strokeWidth={1} aria-hidden="true" />
      </div>
      <p className="project-cover-heading">{cover.heading}</p>
      <div className="project-cover-flow">
        <div>
          <span>01 / INPUT</span>
          <strong>{cover.input}</strong>
        </div>
        <ArrowRight size={18} aria-hidden="true" />
        <div>
          <span>02 / PROCESS</span>
          <Database size={25} strokeWidth={1.3} aria-hidden="true" />
          <strong>{cover.process}</strong>
        </div>
        <ArrowRight size={18} aria-hidden="true" />
        <div>
          <span>03 / OUTPUT</span>
          <CircleCheck size={25} strokeWidth={1.3} aria-hidden="true" />
          <strong>{cover.output}</strong>
        </div>
      </div>
      <figcaption>
        {cover.detail}
        <span>Conceptual system diagram</span>
      </figcaption>
    </figure>
  );
}
