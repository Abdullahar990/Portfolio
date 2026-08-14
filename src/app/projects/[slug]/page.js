import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsData } from '../../data/projects';
import PipelineSequence from '../../components/sequences/PipelineSequence';
import { ArrowLeft, Github, ExternalLink, Activity, CheckCircle, Clock, Shield } from 'lucide-react';

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
    title: `${project.title} — Case Study | Muhammad Abdullah`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isGuardianSense = project.slug === 'guardiansense';

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-md border-b border-surface-border py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-ink-dim hover:text-signal transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </Link>

          <span className="font-mono text-xs text-signal uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-16 pb-12 px-6">
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

          {/* Quick Metrics Banner */}
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

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface border border-signal/40 text-signal hover:bg-surface-hover hover:border-signal text-sm font-medium transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Flagship Sequence Section */}
      {isGuardianSense ? (
        <section className="w-full">
          <PipelineSequence
            projectSlug={project.slug}
            stages={project.stages}
            mode="scroll"
            title={project.title}
            subtitle="Scroll to scrub continuous on-device inference pipeline"
          />
        </section>
      ) : (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <PipelineSequence
              projectSlug={project.slug}
              stages={project.stages}
              mode="click"
              title={project.title}
              subtitle="Interactive Architecture Pipeline"
            />
          </div>
        </section>
      )}

      {/* Case Study Deep Dive */}
      <section className="py-20 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Executive Overview */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              System Overview
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
              Problem &amp; Engineering Solution
            </h2>
            <p className="text-ink-dim text-base sm:text-lg leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Architecture Pillars */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              Technical Implementation
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-6">
              Core Architecture Highlights
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {project.architectureDetails.map((detail, idx) => (
                <div key={detail.title} className="card-surface p-6">
                  <span className="font-mono text-xs text-signal block mb-2">
                    0{idx + 1} &bull; CORE PILLAR
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

          {/* Technology Stack Grid */}
          <div>
            <span className="font-mono text-xs text-signal tracking-widest uppercase block mb-2">
              Technologies &amp; Libraries
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-4">
              Production Stack
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
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-12 px-6 border-t border-surface-border">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-signal hover:text-ink transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio Home</span>
          </Link>
          <span className="font-mono text-xs text-ink-dim">
            &copy; 2026 Muhammad Abdullah
          </span>
        </div>
      </footer>
    </div>
  );
}
