import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '../../data/projects';
import PipelineSequence from '../../components/sequences/PipelineSequence';
import { ArrowLeft, Github, ExternalLink, Activity, CheckCircle, Code2, Layers } from 'lucide-react';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} — Technical Case Study | Muhammad Abdullah`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Minimal Project-Specific Header */}
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-surface-border py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-ink-dim hover:text-signal transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-ink-dim">
            <a href="#overview" className="hover:text-signal transition-colors duration-200">
              Overview
            </a>
            <a href="#architecture-sequence" className="hover:text-signal transition-colors duration-200">
              Architecture
            </a>
            <a href="#stack" className="hover:text-signal transition-colors duration-200">
              Stack
            </a>
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-signal hover:text-ink transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Hero Overview */}
      <section id="overview" className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs text-signal uppercase">{project.category}</span>
            <span className="text-ink-dim text-xs">&bull;</span>
            <span className="font-mono text-xs text-ink-dim">{project.year}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-ink-dim leading-relaxed max-w-2xl mb-8">
            {project.subtitle}
          </p>

          {/* Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="p-4 rounded-xl bg-surface border border-surface-border">
                <span className="font-mono text-lg sm:text-xl font-bold text-signal block mb-1">
                  {m.value}
                </span>
                <span className="font-mono text-xs text-ink-dim">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Project Interface Hero Image */}
          <div className="relative w-full h-56 sm:h-80 lg:h-96 rounded-xl overflow-hidden border border-surface-border mt-8">
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              quality={85}
            />
          </div>
        </div>
      </section>

      {/* Pinned Scroll-Scrubbed 3D Sequence */}
      <section id="architecture-sequence" className="w-full">
        <PipelineSequence
          projectSlug={project.slug}
          stages={project.stages}
          title={project.title}
          subtitle={`Scroll to scrub through ${project.title}'s operational pipeline`}
        />
      </section>

      {/* Case Study Deep Dive */}
      <section id="stack" className="py-20 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Executive Overview */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              System Context
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
              Overview &amp; Implementation
            </h2>
            <p className="text-ink-dim text-base sm:text-lg leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Architecture Pillars */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              Technical Breakdown
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
              Engineering Architecture
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {project.architectureDetails.map((detail, idx) => (
                <div key={detail.title} className="card-surface p-6">
                  <span className="font-mono text-xs text-signal block mb-2">
                    0{idx + 1} &bull; CORE COMPONENT
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-dim leading-relaxed">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              Verified Stack
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
              Technologies &amp; Libraries
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg bg-surface text-ink border border-surface-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Action */}
          <div className="pt-6 border-t border-surface-border flex items-center justify-between flex-wrap gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-signal/40 text-signal hover:bg-surface-hover hover:border-signal text-sm font-medium transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-ink-dim hover:text-signal transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Portfolio Home</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs font-mono text-ink-dim">
          <span>&copy; 2026 Muhammad Abdullah</span>
          <Link href="/" className="text-signal hover:underline">
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
