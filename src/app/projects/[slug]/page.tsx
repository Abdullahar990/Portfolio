import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import ArchitectureFlow from '@/components/projects/ArchitectureFlow';
import ProjectCover from '@/components/projects/ProjectCover';
import JsonLd from '@/components/ui/JsonLd';
import { projectMetadata, projectStructuredData } from '@/lib/site';

type ProjectPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projectsData.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((project) => project.slug === slug);
  if (!project) notFound();
  return projectMetadata(project);
}
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((project) => project.slug === slug);
  if (!project) notFound();
  const nextProject = projectsData[(projectsData.indexOf(project) + 1) % projectsData.length];
  return (
    <main id="home" className="case-page case-editorial">
      <JsonLd data={projectStructuredData(project)} />
      <a className="skip-link" href="#project-overview">
        Skip to project overview
      </a>
      <div className="shell">
        <nav className="case-topbar" aria-label="Case study navigation">
          <Link href="/#projects">
            <ArrowLeft size={15} aria-hidden="true" /> Selected work
          </Link>
          <Link className="case-wordmark" href="/" aria-label="ma. — Muhammad Abdullah home">
            ma<span>.</span>
          </Link>
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            {project.sourceLabel} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
        <header className="case-intro">
          <div className="case-intro-copy">
            <p className="eyebrow">
              {project.year} / {project.category}
            </p>
            <h1>
              {project.title}
              <span>.</span>
            </h1>
            <p className="case-intro-summary">{project.summary}</p>
            <a className="text-link" href="#project-overview">
              Explore the case study <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <ProjectCover project={project} />
        </header>
        <dl className="case-facts">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
        <section id="project-overview" className="case-overview" aria-labelledby="overview-title">
          <aside>
            <p className="eyebrow">01 / Overview</p>
            <nav aria-label="On this page">
              <a href="#architecture-sequence">
                System architecture <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href="#implementation">
                Implementation <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href="#stack">
                Technology stack <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </nav>
          </aside>
          <div>
            <h2 id="overview-title">{project.overviewTitle}</h2>
            <p>{project.overview}</p>
          </div>
        </section>
      </div>
      <div id="architecture-sequence" className="case-architecture-band">
        <ArchitectureFlow projectSlug={project.slug} stages={project.stages} />
      </div>
      <div className="shell">
        <section
          id="implementation"
          className="case-implementation"
          aria-labelledby="implementation-title"
        >
          <div className="case-section-heading">
            <p className="eyebrow">03 / Implementation</p>
            <h2 id="implementation-title">The decisions behind the system.</h2>
          </div>
          <div className="case-decisions">
            {project.architectureDetails.map((detail, index) => (
              <article key={detail.title}>
                <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
                <h3>{detail.title}</h3>
                <p>{detail.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="case-scope" aria-labelledby="scope-title">
          <div>
            <p className="eyebrow">04 / Scope & next iteration</p>
            <h2 id="scope-title">What it demonstrates. What comes next.</h2>
          </div>
          <div className="case-scope-copy">
            <p>{project.scope}</p>
            <p>
              <strong>Next iteration:</strong> {project.nextIteration}
            </p>
          </div>
        </section>
        <section id="stack" className="case-stack" aria-labelledby="stack-title">
          <div>
            <p className="eyebrow">05 / Built with</p>
            <h2 id="stack-title">The tools for the job.</h2>
          </div>
          <div>
            <ul className="case-stack-list">
              {project.tech.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <a
              className="text-link"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the repository <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>
        <Link className="case-next" href={`/projects/${nextProject.slug}`}>
          <div>
            <p className="eyebrow">Up next / {nextProject.category}</p>
            <h2>{nextProject.title}</h2>
            <p>{nextProject.subtitle}</p>
          </div>
          <ArrowUpRight size={42} strokeWidth={1} aria-hidden="true" />
        </Link>
        <footer className="case-footer">
          <Link href="/#projects">
            <ArrowLeft size={15} aria-hidden="true" /> All selected work
          </Link>
          <span>Muhammad Abdullah / {project.year}</span>
          <a href="mailto:abdullahar990@gmail.com">
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </footer>
      </div>
    </main>
  );
}
