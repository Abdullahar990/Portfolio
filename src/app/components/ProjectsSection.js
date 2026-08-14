'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ExternalLink, Github, Layers } from 'lucide-react';
import { projectsData } from '../data/projects';

const GuardianSenseFeatureCard = ({ project }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-surface overflow-hidden ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image */}
        <div className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-auto lg:min-h-[380px] bg-bg">
          <Image
            src={project.image}
            alt="GuardianSense Interface"
            fill
            className="object-cover"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-surface" />
          <div className="absolute top-4 left-4">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-bg/90 text-signal border border-signal/40 backdrop-blur-sm">
              Featured Flagship Case Study
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-xs text-signal">Safety-Critical AI</span>
              <span className="font-mono text-xs text-ink-dim">{project.year}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-ink-dim mb-4">
              {project.subtitle}
            </p>

            <p className="text-sm text-ink-dim leading-relaxed mb-6">
              {project.summary}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-bg border border-surface-border text-center">
                  <span className="font-mono text-base sm:text-lg font-bold text-signal block">
                    {m.value}
                  </span>
                  <span className="font-mono text-xs text-ink-dim">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-bg text-ink-dim border border-surface-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-surface-border">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-signal hover:text-ink transition-colors duration-200"
            >
              <span>View Full Case Study &amp; 3D Sequence</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondaryProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`card-surface p-6 flex flex-col justify-between ${
        inView ? 'animate-fade-slide-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${(index + 1) * 0.1}s` }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-signal">{project.category}</span>
          <span className="font-mono text-xs text-ink-dim">{project.year}</span>
        </div>

        <h3 className="font-display text-lg font-semibold text-ink mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-ink-dim leading-relaxed mb-5">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-2 py-0.5 rounded bg-bg text-ink-dim border border-surface-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-surface-border mt-auto">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-signal hover:text-ink transition-colors duration-200"
        >
          <span>Explore Architecture</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-dim hover:text-signal transition-colors duration-200"
          aria-label={`${project.title} GitHub repository`}
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];
  const secondaryProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 border-t border-surface-border">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className={`mb-12 ${inView ? 'animate-fade-slide-up' : 'opacity-0'}`}>
          <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
            Selected Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3">
            Featured Projects &amp; Systems
          </h2>
          <p className="text-ink-dim text-sm sm:text-base max-w-xl">
            Real-world systems spanning on-device sensor intelligence, full-stack enterprise platforms, and diagnostic data pipelines.
          </p>
        </div>

        {/* GuardianSense Feature */}
        <div className="mb-8">
          <GuardianSenseFeatureCard project={featuredProject} />
        </div>

        {/* Secondary Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondaryProjects.map((project, index) => (
            <SecondaryProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;