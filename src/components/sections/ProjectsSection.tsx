import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projectsData } from '@/data/projects';
import SectionHeading from '@/components/ui/SectionHeading';

export default function ProjectsSection() {
  const featured = projectsData.find((project) => project.featured) ?? projectsData[0];
  const other = projectsData.filter((project) => project.slug !== featured.slug);
  return (
    <section id="projects" className="section shell">
      <SectionHeading number="01" label="Selected work" title="Ideas, put to work.">
        <p>
          A selection of systems I’ve built — from sensing an impact to making a booking. Each one
          solves a different kind of problem.
        </p>
      </SectionHeading>
      <article className="featured-project">
        <div className="featured-project-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Featured case study / {featured.year}
          </p>
          <h3>
            <Link href={`/projects/${featured.slug}`}>
              {featured.title}
              <ArrowUpRight size={32} aria-hidden="true" />
            </Link>
          </h3>
          <p className="project-subtitle">Intelligence that responds when it matters.</p>
          <p className="project-description">
            Smartphone sensors and on-device machine learning connected to three response portals. A
            complete path from detecting unusual motion to sharing an incident.
          </p>
          <dl className="project-metrics">
            {featured.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <div className="project-bottom">
            <span className="project-stack">Flutter · ONNX · Python · Next.js</span>
            <Link className="text-link" href={`/projects/${featured.slug}`}>
              Read the case study <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Link className="featured-project-image" href={`/projects/${featured.slug}`}>
          <div className="project-image-header">
            <span>Guardian Sense</span>
            <span>Mobile + machine learning ↗</span>
          </div>
          <Image
            src={featured.image}
            alt="An ambulance representing Guardian Sense’s emergency response system"
            fill
            sizes="(max-width: 800px) 100vw, 48vw"
            className="project-image"
            loading="eager"
            quality={85}
          />
          <span className="image-caption">FROM SENSOR DATA TO REAL-TIME RESPONSE</span>
        </Link>
      </article>
      <div className="project-list">
        {other.map((project, index) => (
          <article key={project.slug} className="project-row">
            <span className="project-index eyebrow">0{index + 2}</span>
            <Link
              href={`/projects/${project.slug}`}
              className={`project-thumbnail project-thumbnail-${index}`}
              aria-label={`View ${project.title}`}
            >
              <Image
                src={project.image}
                alt={`${project.title} project illustration`}
                fill
                sizes="(max-width: 600px) 100vw, 220px"
                className="project-image"
                quality={85}
              />
            </Link>
            <div className="project-row-copy">
              <p className="eyebrow">{project.category}</p>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.summary}</p>
              <span className="project-stack">{project.tech.slice(0, 4).join(' · ')}</span>
            </div>
            <Link
              className="project-open"
              href={`/projects/${project.slug}`}
              aria-label={`Read ${project.title} case study`}
            >
              <ArrowUpRight size={26} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
